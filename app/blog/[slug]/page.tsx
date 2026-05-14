import { getPostData } from "@/lib/blog";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const postData = getPostData(params.slug);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-3xl mx-auto">
      <Link href="/blog" className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Back to Blog
      </Link>
      <article>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{postData.title}</h1>
        <time className="text-zinc-500 block mb-12">{postData.date}</time>
        <div className="prose prose-invert prose-blue max-w-none">
          <ReactMarkdown>{postData.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
