import { type Media, type InsertMedia, media } from "@shared/schema";
import { randomUUID } from "crypto";
import { getDb } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  createMedia(media: InsertMedia): Promise<Media>;
  getMediaByYear(year: number): Promise<Media[]>;
  getAllMedia(): Promise<Media[]>;
  getYears(): Promise<number[]>;
  getMediaById(id: string): Promise<Media | null>;
  deleteMedia(id: string): Promise<void>;
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

  async getMediaById(id: string): Promise<Media | null> {
    return this.media.get(id) || null;
  }

  async deleteMedia(id: string): Promise<void> {
    this.media.delete(id);
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

  async getMediaById(id: string): Promise<Media | null> {
    const db = getDb();
    const result = await db
      .select()
      .from(media)
      .where(eq(media.id, id))
      .limit(1);
    
    return result[0] || null;
  }

  async deleteMedia(id: string): Promise<void> {
    const db = getDb();
    await db.delete(media).where(eq(media.id, id));
  }
}

// Use database if DATABASE_URL is available (supports both Neon and standard PostgreSQL like Railway)
// Use in-memory storage only when DATABASE_URL is not set
const useDatabase = !!process.env.DATABASE_URL;

if (useDatabase) {
  console.log('[STORAGE] Using DBStorage (persistent database)');
} else {
  console.log('[STORAGE] Using MemStorage (in-memory, resets on restart)');
}

export const storage = useDatabase ? new DBStorage() : new MemStorage();
