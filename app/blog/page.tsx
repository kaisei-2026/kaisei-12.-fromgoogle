import { getPostData, getSortedPostsData } from "@/lib/blog";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

// 静的パス生成
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const postData = getPostData(slug);

  return (
    // 🌟 外側のdiv：ここで画面全体の背景色を塗ります (w-full を指定)
    <div className="min-h-screen w-full bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      
      {/* 🌟 内側のdiv：ここで中身の幅を制限して真ん中に寄せます (mx-auto) */}
      <div className="max-w-3xl mx-auto pt-32 pb-24 px-6 font-sans">
        
        <Link href="/blog" className="inline-flex items-center text-xs font-bold text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-16 transition-colors uppercase tracking-widest">
          <ArrowLeft size={16} className="mr-2" /> Back to Insights
        </Link>
        
        <article>
          <div className="mb-16">
            <time className="text-emerald-600 dark:text-emerald-400 font-mono text-sm tracking-widest mb-6 block font-bold transition-colors">
              {postData.date}
            </time>
            <h1 className="text-4xl md:text-5xl font-black text-zinc-950 dark:text-white leading-[1.3] tracking-tight transition-colors">
              {postData.title}
            </h1>
          </div>
          
          {/* 記事本文：ダークモード対応 */}
          <div className="prose prose-lg prose-zinc dark:prose-invert max-w-none 
            transition-colors duration-300
            prose-headings:font-black prose-headings:tracking-tight prose-headings:text-zinc-900 dark:prose-headings:text-white prose-headings:mt-12
            prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:font-medium
            prose-strong:text-zinc-900 dark:prose-strong:text-white prose-strong:bg-emerald-50 dark:prose-strong:bg-emerald-950/30 prose-strong:px-1
            prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-zinc-50 dark:prose-blockquote:bg-zinc-900/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-zinc-800 dark:prose-blockquote:text-zinc-200 prose-blockquote:font-bold
            prose-a:text-emerald-600 dark:prose-a:text-emerald-400 hover:prose-a:text-emerald-500">
            <ReactMarkdown>{postData.content}</ReactMarkdown>
          </div>
        </article>

        <footer className="mt-32 pt-12 border-t border-zinc-100 dark:border-zinc-800">
           <p className="text-center text-zinc-400 dark:text-zinc-600 text-xs tracking-widest uppercase font-bold font-sans">
              © 2026 KAISEI HUB.
           </p>
        </footer>
      </div>
    </div>
  );
}
