import { type Media, type InsertMedia } from "@shared/schema";
import { randomUUID } from "crypto";

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

export const storage = new MemStorage();
