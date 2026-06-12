import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        downloadImage(response.headers.location, dest).then(resolve).catch(reject);
      } else {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function fetchAvatarUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        // Try to find og:image
        let match = data.match(/<meta property="og:image" content="(.*?)"/);
        if (match && match[1]) return resolve(match[1]);
        
        // Try to find image_src
        match = data.match(/<link rel="image_src" href="(.*?)"/);
        if (match && match[1]) return resolve(match[1]);

        // Try to find any yt3.ggpht.com or googleusercontent URL that looks like an avatar
        match = data.match(/(https:\/\/(?:yt3\.ggpht\.com|yt3\.googleusercontent\.com)\/(?:ytc\/)?[a-zA-Z0-9_-]+(?:=[^"\\]+)?)/);
        if (match && match[1]) return resolve(match[1]);

        resolve(null);
      });
    }).on('error', reject);
  });
}

async function main() {
  const missing = [
    { name: 'KtoWho', link: 'https://www.youtube.com/@ktowho' },
    { name: 'Myles На Русском', link: 'https://www.youtube.com/@mylesmcrussian' },
    { name: 'Soilinf', link: 'https://www.youtube.com/@soilinf' }
  ];

  for (const blogger of missing) {
    const avatarName = blogger.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'av_' + Math.random().toString(36).substring(7);
    const destPath = path.join(__dirname, 'public', 'images', `${avatarName}_logo.jpg`);
    
    console.log(`Fetching for ${blogger.name} -> ${blogger.link}`);
    try {
      const imgUrl = await fetchAvatarUrl(blogger.link);
      if (imgUrl) {
        let cleanUrl = imgUrl.split('"')[0].split('\\')[0];
        // Ensure high quality if possible
        if (!cleanUrl.includes('=')) {
           cleanUrl += '=s900-c-k-c0x00ffffff-no-rj';
        }
        await downloadImage(cleanUrl, destPath);
        console.log(`Downloaded ${cleanUrl} to /images/${avatarName}_logo.jpg`);
      } else {
        console.log(`No avatar image found in HTML for ${blogger.name}`);
      }
    } catch (e) {
      console.error(`Error for ${blogger.name}: ${e.message}`);
    }
  }
}

main().catch(console.error);
