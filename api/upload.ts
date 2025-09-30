import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';
import { storage } from '../server/storage';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseMultipartForm(req: VercelRequest): Promise<{
  files: Array<{ name: string; data: Buffer; type: string }>;
  year: number;
}> {
  return new Promise(async (resolve, reject) => {
    const { default: busboy } = await import('busboy');
    const bb = busboy({ headers: req.headers });
    const files: Array<{ name: string; data: Buffer; type: string }> = [];
    let year: number | undefined;

    bb.on('file', (name: string, file: any, info: any) => {
      const { filename, mimeType } = info;
      const chunks: Buffer[] = [];
      
      file.on('data', (data: Buffer) => {
        chunks.push(data);
      });
      
      file.on('end', () => {
        files.push({
          name: filename,
          data: Buffer.concat(chunks),
          type: mimeType,
        });
      });
    });

    bb.on('field', (name: string, val: string) => {
      if (name === 'year') {
        year = parseInt(val);
      }
    });

    bb.on('finish', () => {
      if (!year) {
        reject(new Error('Year is required'));
      } else {
        resolve({ files, year });
      }
    });

    bb.on('error', reject);
    req.pipe(bb);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { files, year } = await parseMultipartForm(req);

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|webm/;
    
    const uploadedMedia = await Promise.all(
      files.map(async (file) => {
        const ext = file.name.split('.').pop()?.toLowerCase() || '';
        
        if (!allowedTypes.test(ext) && !allowedTypes.test(file.type)) {
          throw new Error(`Invalid file type: ${file.name}`);
        }

        const blob = await put(file.name, file.data, {
          access: 'public',
          addRandomSuffix: true,
        });

        const type = file.type.startsWith('image/') ? 'image' : 'video';
        const mediaData = {
          year,
          filename: file.name,
          url: blob.url,
          type,
        };

        return await storage.createMedia(mediaData);
      })
    );

    res.json({
      success: true,
      media: uploadedMedia,
      count: uploadedMedia.length,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to upload files' 
    });
  }
}
