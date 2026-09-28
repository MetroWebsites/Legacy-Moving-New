import { getCollection } from 'astro:content';

const posts = await getCollection('blog');
const post = posts.find(p => p.slug === 'hardest-neighborhoods-denver-to-move-into');

console.log('=== FIRST 500 CHARS OF post.body ===');
console.log(post.body.substring(0, 500));
console.log('');

const tldrMatch = post.body.match(/##\s*TL;DR\s*\n\s*\n([\s\S]*?)\n\s*\n---/i);
console.log('=== REGEX MATCH ===');
console.log('Match found:', !!tldrMatch);
if (tldrMatch) {
  console.log('Captured:', tldrMatch[1].substring(0, 100));
  
  const cleaned = post.body.replace(/##\s*TL;DR\s*\n\s*\n[\s\S]*?\n\s*\n---\s*\n\s*\n/i, '');
  console.log('');
  console.log('=== AFTER REMOVAL (first 300) ===');
  console.log(cleaned.substring(0, 300));
}
