import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchSubs(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'Accept-Language': 'en-US,en;q=0.9' // force english to get "subscribers" and M/K formats
      }
    }, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        let match = data.match(/"subscriberCountText":\{.*?"simpleText":"(.*?)"\}/);
        if (match && match[1]) {
           let val = match[1].replace(/ subscribers/i, '');
           return resolve(val);
        }
        resolve(null);
      });
    }).on('error', reject);
  });
}

async function main() {
  const appTsxPath = path.join(__dirname, 'src', 'App.tsx');
  const appTsx = fs.readFileSync(appTsxPath, 'utf8');

  const bloggersMatch = appTsx.match(/const BLOGGERS: BloggerItem\[\] = \[([\s\S]*?)\];/);
  if (!bloggersMatch) {
    console.log('Could not find BLOGGERS array');
    return;
  }

  const lines = bloggersMatch[1].split('\n').filter(l => l.trim() !== '');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const linkMatch = line.match(/link:\s*"([^"]+)"/);
    const nameMatch = line.match(/name:\s*"([^"]+)"/);
    
    if (linkMatch && nameMatch) {
      const link = linkMatch[1];
      const name = nameMatch[1];
      if (link.includes('youtube')) {
         const subs = await fetchSubs(link);
         if (subs) {
           // subs is like "2.34M", "500K"
           // replace followers: "..." with followers: "subs"
           lines[i] = line.replace(/followers:\s*"[^"]+"/, `followers: "${subs}"`);
           console.log(`Fetched ${name}: ${subs}`);
         } else {
           console.log(`Failed to fetch for ${name}`);
         }
      }
    }
  }

  const newArrayStr = `const BLOGGERS: BloggerItem[] = [\n${lines.join('\n')}\n];`;
  console.log('\n--- NEW ARRAY ---');
  console.log(newArrayStr);
  
  // Actually update the file!
  const newAppTsx = appTsx.replace(/const BLOGGERS: BloggerItem\[\] = \[([\s\S]*?)\];/, newArrayStr);
  fs.writeFileSync(appTsxPath, newAppTsx);
  console.log('App.tsx updated!');
}

main().catch(console.error);
