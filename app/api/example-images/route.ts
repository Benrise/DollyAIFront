import fs from 'fs';
import path from 'path';

export async function GET(): Promise<Response> {
  const directoryPath = path.join(process.cwd(), 'public/images/examples');

  try {
    const files = await fs.promises.readdir(directoryPath);

    const images = files.filter((file) => file.match(/\.(jpg|jpeg|png|gif)$/));

    return new Response(JSON.stringify(images), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error reading directory:', error);
    return new Response('Error reading directory');
  }
}
