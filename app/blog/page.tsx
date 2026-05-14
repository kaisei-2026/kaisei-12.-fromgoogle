import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 max-w-4xl mx-auto">
      <div className="mb-20">
        <h1 className="text-6xl font-black text-zinc-950 tracking-tighter uppercase italic">Digital Garden</h1>
        <div className="h-1.5 w-20 bg-zinc-950 mt-4" />
      </div>
      
      <div className="grid gap-16">
        {posts.map(({ slug, date, title }) => (
          <Link href={`/blog/${slug}`} key={slug} className="group block">
            <article className="border-l-4 border-zinc-100 pl-8 group-hover:border-zinc-950 transition-all">
              <time className="text-xs font-bold text-blue-600 mb-3 block tracking-widest">{date}</time>
              <h2 className="text-4xl font-black text-zinc-900 group-hover:text-blue-600 transition-colors leading-tight">
                {title}
              </h2>
              <p className="mt-4 text-zinc-500 font-medium">Click to read full article —</p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
