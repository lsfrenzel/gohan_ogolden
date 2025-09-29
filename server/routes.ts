import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import { insertMediaSchema } from "@shared/schema";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|webm/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only images and videos are allowed"));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files
  app.use("/uploads", express.static("uploads"));

  // Get all timeline data grouped by year
  app.get("/api/timeline", async (req, res) => {
    try {
      const allMedia = await storage.getAllMedia();
      const years = await storage.getYears();
      
      const timeline = await Promise.all(
        years.map(async (year) => ({
          year,
          media: await storage.getMediaByYear(year),
        }))
      );
      
      res.json(timeline);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch timeline" });
    }
  });

  // Get media for a specific year
  app.get("/api/media/:year", async (req, res) => {
    try {
      const year = parseInt(req.params.year);
      const media = await storage.getMediaByYear(year);
      res.json(media);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch media" });
    }
  });

  // Upload media
  app.post("/api/upload", upload.array("files"), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      const year = parseInt(req.body.year);

      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      if (!year) {
        return res.status(400).json({ error: "Year is required" });
      }

      const uploadedMedia = await Promise.all(
        files.map(async (file) => {
          const type = file.mimetype.startsWith("image/") ? "image" : "video";
          const mediaData = {
            year,
            filename: file.filename,
            type,
          };

          return await storage.createMedia(mediaData);
        })
      );

      res.json({ 
        success: true, 
        media: uploadedMedia,
        count: uploadedMedia.length 
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to upload files" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
