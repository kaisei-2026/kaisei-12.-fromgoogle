import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";

export default function BlogPage() {
  const posts = getSortedPostsData();

  // カテゴリー判定用（ファイル名に athletic, ai, dev が含まれていると仮定）
  const getCatColor = (title: string) => {
    if (title.toLowerCase().includes("陸上")) return "text-blue-600 bg-blue-50";
    if (title.toLowerCase().includes("ai")) return "text-purple-600 bg-purple-50";
    return "text-emerald-600 bg-emerald-50";
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="mb-16">
        <h1 className="text-6xl font-[1000] text-zinc-950 tracking-tighter italic">GARDEN.</h1>
        <p className="text-zinc-400 font-bold mt-2 uppercase tracking-widest text-xs">Athletics / AI / Programming</p>
      </div>

      <div className="space-y-12">
        {posts.map(({ slug, date, title }) => (
          <Link href={`/blog/${slug}`} key={slug} className="group block">
            <article className="relative">
              <div className="flex items-center gap-4 mb-3">
                <time className="font-mono text-xs text-zinc-400">{date}</time>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase ${getCatColor(title)}`}>
                  Category
                </span>
              </div>
              <h2 className="text-3xl font-black text-zinc-900 group-hover:text-blue-600 transition-colors leading-tight">
                {title}
              </h2>
              <p className="mt-4 text-zinc-500 font-medium group-hover:text-zinc-800 transition-colors">
                続きを読む ➝
              </p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
