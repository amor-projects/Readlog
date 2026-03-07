import fs from 'fs/promises';
import path from 'path';

const IMAGE_API = 'https://covers.openlibrary.org';

async function getImage(type = 'b', value) {
  const fileName = `${value}-M.jpg`;
  const subDir = (type ==='author' ||type === 'a') ? 'a' : 'b';
  const publicDir = path.join(import.meta.dirname, '..', 'public');
  const destination = path.join(publicDir, fileName);
  const publicURL = `/images/${fileName}`;

  try {
    await fs.access(destination);
    return {url: publicURL};
  } catch {
    try {
      const imageURL = `${IMAGE_API}/${subDir}/id/${fileName}?default=false`;
      const resp = await fetch(imageURL);
      if (!resp.ok) {
        throw new Error(`External API Failed ${resp.status}`);
      }
      const arrayBuffer = await resp.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await fs.writeFile(destination, buffer);
      return {url: publicURL};
    } catch (error) {
      return { failed: true, message: error.message,}
    }
  }
}

export default getImage;