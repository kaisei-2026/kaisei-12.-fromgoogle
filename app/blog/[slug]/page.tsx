import { getPostData, getSortedPostsData } from "@/lib/blog";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  // 🌟 slugが空のものは除外してロボットに伝える
  return posts
    .filter(post => post.slug && post.slug !== 'undefined')
    .map((post) => ({
      slug: post.slug,
    }));
}

export default async function PostPage({ params }: any) {
  // 🌟 params を安全に取得
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  
  if (!slug || slug === 'undefined') return null;
  
  const postData: any = getPostData(slug);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#0a0a0a] transition-colors duration-300 font-sans">
      <div className="max-w-3xl mx-auto pt-32 pb-24 px-6">
        <Link href="/blog" className="inline-flex items-center text-xs font-bold text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-16 transition-colors uppercase tracking-widest">
          <ArrowLeft size={16} className="mr-2" /> Back to Insights
        </Link>
        <article>
          <div className="mb-16">
            <time className="text-emerald-600 dark:text-emerald-400 font-mono text-sm tracking-widest mb-6 block font-bold transition-colors">{postData.date}</time>
            <h1 className="text-4xl md:text-5xl font-black text-zinc-950 dark:text-white leading-[1.3] tracking-tight transition-colors">{postData.title}</h1>
          </div>
          <div className="prose prose-lg prose-zinc dark:prose-invert max-w-none 
            prose-headings:font-black prose-headings:tracking-tight prose-headings:text-zinc-900 dark:prose-headings:text-white prose-headings:mt-12
            prose-strong:text-zinc-900 dark:prose-strong:text-white prose-strong:bg-emerald-50 dark:prose-strong:bg-emerald-950/30 prose-strong:px-1">
            <ReactMarkdown>{postData.content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
