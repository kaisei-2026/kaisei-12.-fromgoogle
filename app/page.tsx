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
    <div className="bg-[#fcfcfc] text-zinc-900 font-serif">
      
      {/* SECTION 1: HERO (画像のような巨大タイポグラフィ) */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03] select-none pointer-events-none">
          <h1 className="text-[30vw] font-black leading-none whitespace-nowrap">KAISEI HUB</h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
            {lang === "jp" ? "唯一無二の、感動を。" : "The only one, the emotion."}
          </h2>
          <h1 className="text-[15vw] md:text-[12rem] font-black tracking-tighter leading-[0.8] mb-12">
            KAISEI<br />HUB
          </h1>
        </motion.div>
      </section>

      {/* SECTION 2: SERVICES (三角形の図解風) */}
      <section className="py-32 px-8 md:px-16 bg-[#1a1a1a] text-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h3 className="text-5xl font-bold mb-10 italic">Services</h3>
            <p className="text-2xl md:text-4xl font-bold leading-tight mb-8">
              {lang === "jp" ? "ツールを活用して、個人・チームの問題解決を支援します。" : "Leveraging tools to solve problems for individuals and teams."}
            </p>
            <p className="text-zinc-400 max-w-md tracking-wider">
              {lang === "jp" ? "わたしたちは、デジタルツールの活用があたりまえになる世界を目指しています。" : "We aim for a world where digital tools are used naturally."}
            </p>
          </div>
          
          {/* 三角形のデザイン装飾 */}
          <div className="relative flex justify-center py-20">
            <div className="w-80 h-80 border border-zinc-700 rotate-45 relative flex items-center justify-center">
              <div className="absolute inset-0 border border-blue-500 scale-75 opacity-50" />
              <div className="text-center -rotate-45">
                <span className="block text-sm text-zinc-500 mb-2">(01)</span>
                <span className="text-4xl font-bold tracking-tighter">AI<br/>Agent</span>
              </div>
            </div>
            {/* 装飾テキスト */}
            <div className="absolute top-0 right-0 text-[8px] font-mono text-zinc-500 tracking-[0.5em] rotate-90">KAISEI SYSTEM V2.4</div>
          </div>
        </div>
      </section>

      {/* SECTION 3: NEWS (画像3枚目のリスト形式) */}
      <section className="py-32 px-8 md:px-16 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row gap-20">
          <div className="md:w-1/3">
            <h3 className="text-6xl font-black tracking-tighter mb-4">News</h3>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">( お知らせ )</p>
            <Link href="/blog" className="mt-12 inline-flex items-center gap-4 bg-zinc-900 text-white px-10 py-4 rounded-full text-sm font-bold hover:bg-zinc-700 transition-all">
              {lang === "jp" ? "お知らせ一覧" : "All News"} <ArrowUpRight size={16}/>
            </Link>
          </div>

          <div className="md:w-2/3 space-y-4">
            {[
              { date: "2026.05.15", title: "新しいIDE「Elite Pro」を公開しました", tag: "Update" },
              { date: "2026.05.01", title: "PythonエディタがJupyter形式に対応", tag: "Feature" },
              { date: "2026.04.14", title: "ポートフォリオサイトをリニューアル", tag: "Info" },
            ].map((news, i) => (
              <div key={i} className="group bg-white border border-zinc-100 p-8 rounded-[2rem] flex items-center justify-between hover:shadow-2xl transition-all cursor-pointer">
                <div className="flex gap-12 items-center">
                  <div className="font-mono text-zinc-400">
                    <span className="block text-xs">2026.</span>
                    <span className="text-xl text-zinc-900 font-bold">{news.date.split('.')[1]}.{news.date.split('.')[2]}</span>
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-md bg-zinc-100 text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-widest">{news.tag}</span>
                    <h4 className="text-lg font-bold group-hover:text-blue-600 transition-colors">{news.title}</h4>
                  </div>
                </div>
                <ArrowUpRight className="text-zinc-300 group-hover:text-zinc-900 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: TECH BLOG (画像4枚目のカード形式) */}
      <section className="py-32 px-8 md:px-16 bg-[#111] text-white">
        <div className="max-w-[1400px] mx-auto">
          <h3 className="text-7xl font-black italic tracking-tighter mb-20 leading-none">Tech Blog</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "コーディングエージェントと協働する未来", date: "2026.05.01", desc: "AIと人間がどのようにコードを書いていくべきか..." },
              { title: "ブラウザ上で動くPython実行エンジンの仕組み", date: "2026.04.21", desc: "Pyodideを活用したクライアントサイド実行の裏側" },
            ].map((blog, i) => (
              <div key={i} className="group relative bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-10 overflow-hidden hover:border-zinc-600 transition-all">
                {/* 装飾の球体 (画像のような) */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all" />
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <time className="font-mono text-zinc-500 text-sm mb-4 block tracking-widest">{blog.date}</time>
                    <h4 className="text-3xl font-bold mb-6 group-hover:text-blue-400 transition-colors">{blog.title}</h4>
                    <p className="text-zinc-500 leading-relaxed max-w-md">{blog.desc}</p>
                  </div>
                  <div className="mt-12 flex justify-end">
                    <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
