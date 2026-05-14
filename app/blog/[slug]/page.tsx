import { getPostData, getSortedPostsData } from "@/lib/blog";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

// 🌟 この関数を追加することで、ビルド時のエラーを解決します！
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  // params を await して取得します（Next.jsの仕様変更対応）
  const { slug } = await (params as any);
  const postData = getPostData(slug);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-3xl mx-auto text-zinc-50">
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
