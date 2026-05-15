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

  return (
    <div className="bg-[#fcfcfc] text-zinc-900 font-serif selection:bg-zinc-900 selection:text-white">
      
{/* SECTION 1: KAISEI HERO (学校の画像を背景に) */}
// ... (前略)
      {/* SECTION 1: KAISEI HERO */}
      <section className="relative min-h-screen flex flex-col justify-end px-8 md:px-20 pb-20 overflow-hidden bg-zinc-800">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            // 🌟 以下の書き方に修正してください
            backgroundImage: "url('/kaisei-google/bg-school.png')", 
          }}
        >
          <div className="absolute inset-0 bg-black/40" /> 
        </div>
// ... (後略)

        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.5 }} 
          className="relative z-10 text-white"
        >
          <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight drop-shadow-lg opacity-80">
            {lang === "jp" ? "KAISEI-TOOLS" : "KAISEI-TOOLS"}
          </h2>
          <h1 className="text-[20vw] md:text-[18rem] font-bold tracking-tighter leading-[0.8] drop-shadow-2xl">
            KAISEI
          </h1>
        </motion.div>
      </section>

      {/* SECTION 2: NEWS (ニュースを追加) */}
      <section className="py-40 px-8 md:px-20 max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/4">
            <h3 className="text-7xl font-bold tracking-tighter mb-4">News</h3>
            <p className="text-zinc-400 font-medium text-sm mb-12">( お知らせ )</p>
            <Link href="/blog" className="bg-zinc-900 text-white px-10 py-4 rounded-full text-xs font-bold tracking-widest hover:bg-zinc-700 transition-all flex items-center w-fit gap-4">
              ALL NEWS <ArrowUpRight size={16}/>
            </Link>
          </div>

          <div className="lg:w-3/4 space-y-6">
            {[
              { date: "2026.05.15", title: "次世代IDE「Elite Pro」正式リリース", tag: "UPDATE" },
              { date: "2026.05.01", title: "PythonエディタがJupyterノートブック形式（.ipy）を完全サポート", tag: "FEATURE" },
              { date: "2026.04.25", title: "学校プロジェクト：課題管理アプリの運用を開始", tag: "PROJECT" },
              { date: "2026.04.14", title: "ポートフォリオサイトのデザインを一新しました", tag: "INFO" },
              { date: "2026.04.01", title: "開発ブログ「Insights」を開設", tag: "BLOG" },
            ].map((news, i) => (
              <div key={i} className="group bg-white border border-zinc-100 p-8 md:p-10 rounded-[2.5rem] flex items-center justify-between hover:shadow-2xl transition-all cursor-pointer">
                <div className="flex gap-10 md:gap-16 items-center">
                  <div className="font-mono text-zinc-400">
                    <span className="block text-[10px]">2026.</span>
                    <span className="text-2xl text-zinc-900 font-bold">{news.date.split('.')[1]}.{news.date.split('.')[2]}</span>
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-md bg-zinc-100 text-[9px] font-bold text-zinc-500 mb-2 uppercase tracking-widest">{news.tag}</span>
                    <h4 className="text-lg md:text-xl font-bold">{news.title}</h4>
                  </div>
                </div>
                <ArrowUpRight className="text-zinc-200 group-hover:text-zinc-900 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: TECH BLOG (指定の2記事を追加) */}
      <section className="py-40 px-8 md:px-20 bg-[#0a0a0a] text-white rounded-t-[4rem]">
        <div className="max-w-[1600px] mx-auto">
          <h3 className="text-7xl font-bold italic tracking-tighter mb-24">Tech Blog</h3>
          
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { 
                title: "コーディングエージェントと協働する未来", 
                date: "2026.05.01", 
                desc: "AIと人間がどのようにコードを書いていくべきか。最新のAI技術と開発フローの統合について考察します。",
                slug: "coding-agent"
              },
              { 
                title: "ブラウザ上で動くPython実行エンジンの仕組み", 
                date: "2026.04.21", 
                desc: "Pyodideを活用し、サーバーレスでPythonを実行するフロントエンド技術。IDE開発の裏側を解説。",
                slug: "python-engine" 
              },
            ].map((post, i) => (
              <Link href={`/blog/${post.slug}`} key={i} className="group bg-zinc-900/40 border border-zinc-800 rounded-[3rem] p-12 hover:border-zinc-500 transition-all flex flex-col justify-between h-[450px]">
                <div>
                  <time className="font-mono text-zinc-500 text-sm mb-6 block tracking-widest">{post.date}</time>
                  <h4 className="text-3xl md:text-4xl font-bold mb-8 group-hover:text-blue-400 transition-colors">{post.title}</h4>
                  <p className="text-zinc-500 text-lg leading-relaxed line-clamp-3">{post.desc}</p>
                </div>
                <div className="flex justify-end">
                  <div className="w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight size={24} />
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
