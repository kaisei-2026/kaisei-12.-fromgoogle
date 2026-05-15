import { getPostData, getSortedPostsData } from "@/lib/blog";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

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
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-3xl mx-auto bg-white font-sans">
      <Link href="/blog" className="inline-flex items-center text-xs font-bold text-zinc-400 hover:text-zinc-900 mb-16 transition-colors uppercase tracking-widest">
        <ArrowLeft size={16} className="mr-2" /> Back to Insights
      </Link>
      
      <article>
        <div className="mb-16">
          <time className="text-emerald-600 font-mono text-sm tracking-widest mb-6 block font-bold">{postData.date}</time>
          <h1 className="text-4xl md:text-5xl font-black text-zinc-950 leading-[1.3] tracking-tight">{postData.title}</h1>
        </div>
        
        {/* Markdownの超絶カスタマイズスタイル */}
        <div className="prose prose-lg prose-zinc max-w-none 
          prose-headings:font-black prose-headings:tracking-tight prose-headings:text-zinc-900 prose-headings:mt-12
          prose-p:text-zinc-700 prose-p:leading-relaxed prose-p:font-medium
          prose-strong:text-zinc-900 prose-strong:bg-emerald-50 prose-strong:px-1
          prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-zinc-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-zinc-800 prose-blockquote:font-bold
          prose-a:text-emerald-600 hover:prose-a:text-emerald-500">
          <ReactMarkdown>{postData.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
