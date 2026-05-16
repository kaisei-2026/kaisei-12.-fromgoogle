import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content');

export function getSortedPostsData() {
  if (!fs.existsSync(postsDirectory)) return [];
  
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter(fileName => {
      // 🌟 .mdファイル以外や、中身が空の「幽霊ファイル」を完全に無視する
      return fileName.endsWith('.md') && fileName.length > 3 && fileName !== 'undefined.md';
    })
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      
      return { 
        slug, 
        title: matterResult.data.title || "No Title",
        date: matterResult.data.date || "2026-01-01"
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostData(slug: string) {
  // 🌟 slugが変な場合はエラーを出さずにダミーを返す
  if (!slug || slug === 'undefined') {
    return { slug: 'error', title: 'Not Found', date: '', content: '' };
  }
  
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return { slug, title: 'Not Found', date: '', content: '' };
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  return { slug, content: matterResult.content, ...matterResult.data };
}
