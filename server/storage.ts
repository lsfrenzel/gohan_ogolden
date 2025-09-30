import { type Media, type InsertMedia, media } from "@shared/schema";
import { randomUUID } from "crypto";
import { getDb } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  createMedia(media: InsertMedia): Promise<Media>;
  getMediaByYear(year: number): Promise<Media[]>;
  getAllMedia(): Promise<Media[]>;
  getYears(): Promise<number[]>;
}

export class MemStorage implements IStorage {
  private media: Map<string, Media>;

  constructor() {
    this.media = new Map();
  }

  async createMedia(insertMedia: InsertMedia): Promise<Media> {
    const id = randomUUID();
    const media: Media = { 
      ...insertMedia, 
      id,
      uploadedAt: new Date().toISOString()
    };
    this.media.set(id, media);
    return media;
  }

  async getMediaByYear(year: number): Promise<Media[]> {
    return Array.from(this.media.values())
      .filter(m => m.year === year)
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
  }

  async getAllMedia(): Promise<Media[]> {
    return Array.from(this.media.values())
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
  }

  async getYears(): Promise<number[]> {
    const years = new Set(Array.from(this.media.values()).map(m => m.year));
    return Array.from(years).sort((a, b) => b - a);
  }
}

export class DBStorage implements IStorage {
  async createMedia(insertMedia: InsertMedia): Promise<Media> {
    const db = getDb();
    const newMedia: Media = {
      id: randomUUID(),
      ...insertMedia,
      uploadedAt: new Date().toISOString(),
    };

    await db.insert(media).values(newMedia);
    return newMedia;
  }

  async getMediaByYear(year: number): Promise<Media[]> {
    const db = getDb();
    const result = await db
      .select()
      .from(media)
      .where(eq(media.year, year))
      .orderBy(desc(media.uploadedAt));
    
    return result;
  }

  async getAllMedia(): Promise<Media[]> {
    const db = getDb();
    const result = await db
      .select()
      .from(media)
      .orderBy(desc(media.uploadedAt));
    
    return result;
  }

  async getYears(): Promise<number[]> {
    const db = getDb();
    const result = await db
      .selectDistinct({ year: media.year })
      .from(media)
      .orderBy(desc(media.year));
    
    return result.map((r: { year: number }) => r.year);
  }
}

const isDevelopment = process.env.NODE_ENV === "development";
const useDatabase = process.env.DATABASE_URL && !isDevelopment;

export const storage = useDatabase ? new DBStorage() : new MemStorage();
