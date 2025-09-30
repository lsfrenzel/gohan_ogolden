import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import { insertMediaSchema } from "@shared/schema";

// Resolve uploads directory to absolute path to ensure consistency across environments
const uploadsDir = path.join(process.cwd(), "uploads");
const isDevelopment = process.env.NODE_ENV !== "production";

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  if (isDevelopment) {
    console.log(`[INIT] Created uploads directory: ${uploadsDir}`);
  }
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
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
      cb(new Error("Apenas imagens e vídeos são permitidos (jpeg, jpg, png, gif, mp4, mov, avi, webm)"));
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files using absolute path
  app.use("/uploads", express.static(uploadsDir));

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

  // Upload media with Multer error handling
  app.post("/api/upload", (req, res, next) => {
    upload.array("files")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        console.error("[UPLOAD] Multer error:", err.message);
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({ 
            error: "Arquivo muito grande. Tamanho máximo: 50MB" 
          });
        }
        return res.status(400).json({ 
          error: `Erro no upload: ${err.message}` 
        });
      } else if (err) {
        console.error("[UPLOAD] Upload error:", err.message);
        return res.status(400).json({ 
          error: err.message || "Erro ao processar arquivos" 
        });
      }
      next();
    });
  }, async (req, res) => {
    if (isDevelopment) {
      console.log("[UPLOAD] Request received");
      console.log("[UPLOAD] Body year:", req.body.year);
      console.log("[UPLOAD] Files count:", req.files ? (req.files as any).length : 0);
    }
    
    try {
      const files = req.files as Express.Multer.File[];
      const year = parseInt(req.body.year);

      if (!files || files.length === 0) {
        if (isDevelopment) console.error("[UPLOAD] Error: No files uploaded");
        return res.status(400).json({ error: "Nenhum arquivo foi enviado" });
      }

      if (!year || isNaN(year)) {
        if (isDevelopment) console.error("[UPLOAD] Error: Invalid year:", req.body.year);
        return res.status(400).json({ error: "Ano é obrigatório" });
      }

      if (isDevelopment) {
        console.log(`[UPLOAD] Processing ${files.length} file(s) for year ${year}`);
      }

      const uploadedMedia = await Promise.all(
        files.map(async (file) => {
          const type = file.mimetype.startsWith("image/") ? "image" : "video";
          const mediaData = {
            year,
            filename: file.filename,
            url: `/uploads/${file.filename}`,
            type,
          };

          if (isDevelopment) {
            console.log(`[UPLOAD] Saving to database: ${file.filename}`);
          }
          
          const result = await storage.createMedia(mediaData);
          return result;
        })
      );

      if (isDevelopment) {
        console.log(`[UPLOAD] Success! Uploaded ${uploadedMedia.length} file(s) for year ${year}`);
      }
      
      res.json({ 
        success: true, 
        media: uploadedMedia,
        count: uploadedMedia.length 
      });
    } catch (error) {
      console.error("[UPLOAD] Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      res.status(500).json({ 
        error: "Falha ao salvar no banco de dados", 
        details: isDevelopment ? errorMessage : undefined
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
