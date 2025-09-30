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
    // Check if BLOB_READ_WRITE_TOKEN is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('BLOB_READ_WRITE_TOKEN not configured');
      return res.status(500).json({ 
        error: 'Vercel Blob não configurado. Configure BLOB_READ_WRITE_TOKEN nas variáveis de ambiente.' 
      });
    }

    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL not configured');
      return res.status(500).json({ 
        error: 'Banco de dados não configurado. Configure DATABASE_URL nas variáveis de ambiente.' 
      });
    }

    const { files, year } = await parseMultipartForm(req);

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
    }

    console.log(`Uploading ${files.length} file(s) for year ${year}`);

    const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|webm/;
    
    const uploadedMedia = await Promise.all(
      files.map(async (file) => {
        try {
          const ext = file.name.split('.').pop()?.toLowerCase() || '';
          
          if (!allowedTypes.test(ext) && !allowedTypes.test(file.type)) {
            throw new Error(`Tipo de arquivo inválido: ${file.name}`);
          }

          console.log(`Uploading ${file.name} to Vercel Blob...`);
          const blob = await put(file.name, file.data, {
            access: 'public',
            addRandomSuffix: true,
          });
          console.log(`Blob uploaded: ${blob.url}`);

          const type = file.type.startsWith('image/') ? 'image' : 'video';
          const mediaData = {
            year,
            filename: file.name,
            url: blob.url,
            type,
          };

          console.log(`Saving media metadata to database...`);
          const savedMedia = await storage.createMedia(mediaData);
          console.log(`Media saved with id: ${savedMedia.id}`);
          
          return savedMedia;
        } catch (fileError) {
          console.error(`Error processing file ${file.name}:`, fileError);
          throw fileError;
        }
      })
    );

    console.log(`Successfully uploaded ${uploadedMedia.length} file(s)`);
    res.json({
      success: true,
      media: uploadedMedia,
      count: uploadedMedia.length,
    });
  } catch (error) {
    console.error('Upload error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Falha ao fazer upload dos arquivos';
    res.status(500).json({ 
      error: errorMessage
    });
  }
}
