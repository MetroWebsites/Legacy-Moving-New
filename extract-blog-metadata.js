import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, 'src/pages/blog');

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.astro'));

const metadata = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
  const slug = file.replace('.astro', '');
  
  // Extract title from BaseLayout
  const titleMatch = content.match(/title="([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : '';
  
  // Extract description
  const descMatch = content.match(/description="([^"]+)"/);
  const excerpt = descMatch ? descMatch[1] : '';
  
  // Extract date from the content (look for date pattern with various separators)
  const dateMatch = content.match(/(\w+\s+\d+,\s+202[0-9])\s*[·•]/);
  const dateStr = dateMatch ? dateMatch[1] : null;
  
  // Extract read time
  const readMatch = content.match(/(\d+)\s*min\s*read/);
  const readTime = readMatch ? `${readMatch[1]} min read` : '10 min read';
  
  if (dateStr) {
    const date = new Date(dateStr);
    metadata.push({
      slug,
      title,
      excerpt,
      publishDate: date.toISOString().split('T')[0],
      readTime,
      source: 'page'
    });
  }
});

// Sort by date
metadata.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

// Output as JSON
console.log(JSON.stringify(metadata, null, 2));
