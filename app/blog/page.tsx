import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto bg-white font-sans">
      <Link href="/" className="inline-flex items-center text-xs font-bold text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-widest mb-16">
        <ArrowLeft size={16} className="mr-2" /> Back to Home
      </Link>

      <div className="mb-20">
        <h1 className="text-6xl md:text-8xl font-black text-zinc-950 tracking-tighter uppercase italic">Insights.</h1>
        <p className="mt-4 text-zinc-500 font-bold tracking-widest text-sm">技術と開発の記録</p>
        <div className="h-2 w-20 bg-emerald-500 mt-6" />
      </div>

      <div className="space-y-10">
        {posts.map(({ slug, date, title }) => (
          <Link href={`/blog/${slug}`} key={slug} className="group block border-t border-zinc-200 pt-10 hover:bg-zinc-50 transition-colors -mx-6 px-6 rounded-3xl">
            <time className="text-xs font-mono text-emerald-600 mb-3 block tracking-widest font-bold">{date}</time>
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 group-hover:text-emerald-600 transition-colors leading-tight mb-6">
              {title}
            </h2>
            <div className="flex items-center text-zinc-400 group-hover:text-zinc-900 transition-colors text-xs font-bold uppercase tracking-widest pb-10">
              Read Article &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
