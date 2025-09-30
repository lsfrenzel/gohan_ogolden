import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { year } = req.query;
    const yearNum = parseInt(year as string);
    
    if (isNaN(yearNum)) {
      return res.status(400).json({ error: 'Invalid year parameter' });
    }
    
    const media = await storage.getMediaByYear(yearNum);
    res.json(media);
  } catch (error) {
    console.error('Media fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
}
