import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";

// 🌟 ここから "use client" を消しました！
export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto bg-white dark:bg-[#0a0a0a] font-sans transition-colors duration-300">
      <Link href="/" className="inline-flex items-center text-xs font-bold text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors uppercase tracking-widest mb-16">
        <ArrowLeft size={16} className="mr-2" /> 
        Back to Home
      </Link>

      <div className="mb-20">
        <h1 className="text-6xl md:text-8xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic transition-colors">
          Insights.
        </h1>
        <p className="mt-4 text-zinc-500 dark:text-zinc-400 font-bold tracking-widest text-sm transition-colors uppercase">
          Technical & Development Records
        </p>
        <div className="h-2 w-20 bg-emerald-500 mt-6" />
      </div>

      <div className="space-y-10">
        {posts.map(({ slug, date, title }) => (
          <Link href={`/blog/${slug}`} key={slug} className="group block border-t border-zinc-200 dark:border-zinc-800 pt-10 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors -mx-6 px-6 rounded-3xl">
            <time className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-3 block tracking-widest font-bold">{date}</time>
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight mb-6">
              {title}
            </h2>
            <div className="flex items-center text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors text-xs font-bold uppercase tracking-widest pb-10">
              Read Article &rarr;
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="text-zinc-500 dark:text-zinc-400">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
