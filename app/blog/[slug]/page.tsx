import { getPostData, getSortedPostsData } from "@/lib/blog";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = await (params as any);
  const postData = getPostData(slug);

  return (
    <div className="min-h-screen pt-40 pb-24 px-6 max-w-3xl mx-auto">
      <Link href="/blog" className="inline-flex items-center text-xs font-bold text-zinc-500 hover:text-white mb-12 transition-colors uppercase tracking-widest">
        <ArrowLeft size={14} className="mr-2" /> Back to Garden
      </Link>
      <article>
        <time className="text-blue-500 font-mono text-xs tracking-widest mb-4 block">{postData.date}</time>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-16 leading-tight tracking-tighter uppercase italic">{postData.title}</h1>
        <div className="prose prose-invert prose-blue max-w-none prose-headings:italic prose-headings:tracking-tighter">
          <ReactMarkdown>{postData.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
