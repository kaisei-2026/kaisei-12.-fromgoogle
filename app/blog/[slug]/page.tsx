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

export default function PostPage({ params }: { params: { slug: string } }) {
  // awaitを使わず直接参照する形に変更
  const postData = getPostData(params.slug);

  return (
    <div className="min-h-screen pt-40 pb-24 px-6 max-w-3xl mx-auto bg-white text-zinc-950">
      <Link href="/blog" className="inline-flex items-center text-xs font-bold text-zinc-500 hover:text-zinc-950 mb-12 transition-colors uppercase tracking-widest">
        <ArrowLeft size={14} className="mr-2" /> Back to Garden
      </Link>
      <article>
        <time className="text-blue-600 font-mono text-xs tracking-widest mb-4 block">{postData.date}</time>
        <h1 className="text-5xl md:text-7xl font-black text-zinc-950 mb-16 leading-tight tracking-tighter uppercase italic">{postData.title}</h1>
        <div className="prose prose-zinc max-w-none prose-headings:text-zinc-950 prose-p:text-zinc-800">
          <ReactMarkdown>{postData.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
