import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
    console.error('Timeline error:', error);
    res.status(500).json({ error: 'Failed to fetch timeline' });
  }
}
