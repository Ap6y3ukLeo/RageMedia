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
        // Handle redirects
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

async function fetchMetaImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        const match = data.match(/<meta property="og:image" content="(.*?)">/);
        if (match && match[1]) {
          resolve(match[1]);
        } else {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  const appTsxPath = path.join(__dirname, 'src', 'App.tsx');
  const appTsx = fs.readFileSync(appTsxPath, 'utf8');

  // Extract BLOGGERS
  const bloggersMatch = appTsx.match(/const BLOGGERS: BloggerItem\[\] = \[([\s\S]*?)\];/);
  if (!bloggersMatch) {
    console.log('Could not find BLOGGERS array');
    return;
  }

  // Very naive extraction, let's use regex to find { name: "...", link: "..." }
  const regex = /{.*?name:\s*"([^"]+)"(?:.|\n)*?link:\s*"([^"]+)"/g;
  let match;
  const bloggers = [];
  while ((match = regex.exec(bloggersMatch[1])) !== null) {
    bloggers.push({ name: match[1], link: match[2] });
  }

  const newAvatars = {};
  
  for (const blogger of bloggers) {
    const avatarName = blogger.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'av_' + Math.random().toString(36).substring(7);
    const destPath = path.join(__dirname, 'public', 'images', `${avatarName}_logo.jpg`);
    
    // Check if we already have it in BLOGGER_AVATARS
    if (appTsx.includes(`"${blogger.name}": "/images/`)) {
      console.log(`Skipping ${blogger.name}, already mapped.`);
      continue;
    }

    if (fs.existsSync(destPath)) {
      console.log(`Found existing file for ${blogger.name}: ${destPath}`);
      newAvatars[blogger.name] = `/images/${avatarName}_logo.jpg`;
      continue;
    }

    console.log(`Fetching for ${blogger.name} -> ${blogger.link}`);
    try {
      const imgUrl = await fetchMetaImage(blogger.link);
      if (imgUrl) {
        await downloadImage(imgUrl, destPath);
        console.log(`Downloaded ${imgUrl} to ${destPath}`);
        newAvatars[blogger.name] = `/images/${avatarName}_logo.jpg`;
      } else {
        console.log(`No og:image found for ${blogger.name}`);
      }
    } catch (e) {
      console.error(`Error for ${blogger.name}: ${e.message}`);
    }
    
    // Slight delay to not hammer YouTube
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n--- New Avatar Mappings ---');
  for (const [name, img] of Object.entries(newAvatars)) {
    console.log(`  "${name}": "${img}",`);
  }
}

main().catch(console.error);
