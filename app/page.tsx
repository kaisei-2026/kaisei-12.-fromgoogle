"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  const [lang, setLang] = useState<"jp" | "en">("jp");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLang((localStorage.getItem("app_lang") as "jp" | "en") || "jp");
  }, []);

  if (!mounted) return null;

  const newsItems = [
    { date: "2026.05.15", title: "次世代IDE「Elite Pro」正式リリース", tag: "UPDATE", link: "/tools/code-editor" },
    { date: "2026.05.01", title: "PythonエディタがJupyterノートブック形式（.ipy）を完全サポート", tag: "FEATURE", link: "/tools/python-editor" },
    { date: "2026.04.25", title: "学校プロジェクト：課題管理アプリの運用を開始", tag: "PROJECT", link: "/tools/python-editor" },
    { date: "2026.04.14", title: "ポートフォリオサイトのデザインを一新しました", tag: "INFO", link: "/blog" },
    { date: "2026.04.01", title: "開発ブログ「Insights」を開設", tag: "BLOG", link: "/blog" },
  ];

  return (
    <div className="bg-[#ffffff] text-zinc-900 font-serif selection:bg-zinc-900 selection:text-white">
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex flex-col justify-end px-8 md:px-20 pb-20 overflow-hidden bg-zinc-800">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/kaisei-google/bg-school.png')" }}
        >
          <div className="absolute inset-0 bg-black/40" /> 
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="relative z-10 text-white">
          <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight drop-shadow-lg opacity-80 font-sans">
            {lang === "jp" ? "唯一無二の、感動を。" : "The only one, the emotion."}
          </h2>
          <h1 className="text-[18vw] md:text-[16rem] font-bold tracking-tighter leading-[0.8] drop-shadow-2xl">
            KAISEI
          </h1>
        </motion.div>
      </section>

      {/* SECTION 2: NEWS (5件に更新) */}
      <section className="py-40 px-8 md:px-20 max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/4">
            <h3 className="text-7xl font-bold tracking-tighter mb-4 text-zinc-900">News</h3>
            <p className="text-zinc-400 font-medium text-sm mb-12 font-sans">( お知らせ )</p>
            <Link href="/blog" className="group inline-flex items-center gap-6 bg-zinc-900 text-white px-10 py-4 rounded-full text-xs font-bold tracking-widest hover:bg-zinc-700 transition-all font-sans">
              ALL NEWS <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          <div className="lg:w-3/4 space-y-6">
            {newsItems.map((news, i) => (
              <Link href={news.link} key={i} className="group block bg-white border border-zinc-100 p-8 md:p-12 rounded-[3.5rem] flex items-center justify-between hover:shadow-2xl hover:border-zinc-200 transition-all duration-500">
                <div className="flex gap-10 md:gap-20 items-center">
                  <div className="font-mono text-zinc-400">
                    <span className="block text-[11px] opacity-60">2026.</span>
                    <span className="text-3xl text-zinc-900 font-bold tracking-tighter">{news.date.slice(5)}</span>
                  </div>
                  <div>
                    <span className="inline-block px-4 py-1.5 rounded-lg bg-zinc-100 text-[10px] font-black text-zinc-500 mb-4 tracking-widest uppercase font-sans">{news.tag}</span>
                    <h4 className="text-xl md:text-3xl font-bold text-zinc-900 tracking-tight leading-tight">{news.title}</h4>
                  </div>
                </div>
                <ArrowUpRight size={32} className="text-zinc-200 group-hover:text-zinc-900 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 hidden md:block" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: TECH BLOG */}
      <section className="py-40 px-8 md:px-20 bg-[#0a0a0a] text-white rounded-t-[5rem]">
        <div className="max-w-[1600px] mx-auto">
          <h3 className="text-7xl font-bold italic tracking-tighter mb-24">Tech Blog</h3>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { title: "コーディングエージェントと協働する未来", date: "2026.05.01", desc: "AIと人間がどのようにコードを書いていくべきか。最新のAI技術と開発フローの統合について考察します。", slug: "coding-agent" },
              { title: "ブラウザ上で動くPython実行エンジンの仕組み", date: "2026.04.21", desc: "Pyodideを活用し、サーバーレスでPythonを実行するフロントエンド技術。IDE開発の裏側を解説。", slug: "python-engine" },
            ].map((post, i) => (
              <Link href={`/blog/${post.slug}`} key={i} className="group bg-zinc-900/40 border border-zinc-800 rounded-[3.5rem] p-12 hover:border-zinc-500 transition-all flex flex-col justify-between h-[500px]">
                <div>
                  <time className="font-mono text-zinc-500 text-sm mb-8 block tracking-[0.2em]">{post.date}</time>
                  <h4 className="text-3xl md:text-5xl font-bold mb-10 group-hover:text-blue-400 transition-colors leading-tight">{post.title}</h4>
                  <p className="text-zinc-500 text-lg leading-relaxed line-clamp-3 font-sans opacity-80">{post.desc}</p>
                </div>
                <div className="flex justify-end">
                  <div className="w-20 h-20 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <ArrowUpRight size={28} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
