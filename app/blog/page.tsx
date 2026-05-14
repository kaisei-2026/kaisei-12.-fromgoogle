import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-5xl font-black text-white italic tracking-tighter mb-20 uppercase">Digital Garden</h1>
      <div className="grid gap-12">
        {posts.map(({ slug, date, title }) => (
          <Link href={`/blog/${slug}`} key={slug} className="group">
            <article className="relative pl-8 border-l-2 border-zinc-800 group-hover:border-blue-500 transition-all">
              <time className="text-xs font-mono text-blue-500 mb-2 block tracking-widest">{date}</time>
              <h2 className="text-3xl font-bold text-zinc-200 group-hover:text-white transition-colors leading-tight">{title}</h2>
              <div className="mt-4 text-zinc-500 group-hover:text-zinc-400 transition-colors text-sm font-bold uppercase tracking-widest">Read More +</div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
