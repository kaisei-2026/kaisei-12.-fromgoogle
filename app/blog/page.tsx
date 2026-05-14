import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <div className="min-h-screen pt-32 pb-12 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight mb-12">Digital Garden</h1>
      <div className="space-y-8">
        {posts.map(({ slug, date, title }) => (
          <Link href={`/blog/${slug}`} key={slug} className="group block">
            <article className="border-b border-zinc-800 pb-8 transition-colors group-hover:border-zinc-600">
              <time className="text-sm text-zinc-500 mb-2 block">{date}</time>
              <h2 className="text-2xl font-semibold text-zinc-200 group-hover:text-blue-400 transition-colors">
                {title}
              </h2>
            </article>
          </Link>
        ))}
        {posts.length === 0 && <p className="text-zinc-500">No posts yet. Add .md files to /content folder.</p>}
      </div>
    </div>
  );
}
