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
    <div className="bg-[#ffffff] text-zinc-900 font-serif selection:bg-zinc-900 selection:text-white">
      
      {/* SECTION 1: KAISEI HERO */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.04] select-none pointer-events-none flex items-center justify-center">
          <h1 className="text-[35vw] font-black leading-none whitespace-nowrap tracking-tighter">KAISEI</h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-medium mb-6 tracking-tight text-zinc-800">
            {lang === "jp" ? "唯一無二の、感動を。" : "The only one, the emotion."}
          </h2>
          <h1 className="text-[12vw] md:text-[10rem] font-bold tracking-tighter leading-[0.9] text-zinc-900">
            SENSE<br />TRUST
          </h1>
        </motion.div>
      </section>

      {/* SECTION 2: NEWS (画像1枚目の再現) */}
      <section className="py-40 px-8 md:px-20 max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/4">
            <h3 className="text-7xl font-bold tracking-tighter mb-4 text-zinc-900">News</h3>
            <p className="text-zinc-400 font-medium text-sm mb-12">( お知らせ )</p>
            <Link href="/blog" className="group inline-flex items-center gap-6 bg-zinc-900 text-white px-10 py-4 rounded-full text-xs font-bold tracking-widest hover:bg-zinc-700 transition-all">
              ALL NEWS <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          <div className="lg:w-3/4 space-y-6">
            {[
              { date: "2026.05.15", title: "新しいIDE「Elite Pro」を公開しました", tag: "UPDATE", link: "/tools/code-editor" },
              { date: "2026.05.01", title: "PythonエディタがJupyter形式に対応", tag: "FEATURE", link: "/tools/python-editor" },
              { date: "2026.04.14", title: "ポートフォリオサイトを大幅リニューアル", tag: "INFO", link: "/blog/hello-world" },
            ].map((news, i) => (
              <Link href={news.link} key={i} className="group block bg-white border border-zinc-100 p-10 rounded-[2.5rem] flex items-center justify-between hover:shadow-xl hover:border-zinc-200 transition-all">
                <div className="flex gap-16 items-center">
                  <div className="font-mono text-zinc-400">
                    <span className="block text-[10px] mb-1">2026.</span>
                    <span className="text-2xl text-zinc-900 font-bold">{news.date.split('.')[1]}.{news.date.split('.')[2]}</span>
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-md bg-zinc-100 text-[9px] font-bold text-zinc-500 mb-3 tracking-widest uppercase">{news.tag}</span>
                    <h4 className="text-xl md:text-2xl font-bold text-zinc-800 leading-tight">{news.title}</h4>
                  </div>
                </div>
                <ArrowUpRight size={24} className="text-zinc-200 group-hover:text-zinc-900 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: TECH BLOG (画像2枚目の再現) */}
      <section className="py-40 px-8 md:px-20 bg-[#0a0a0a] text-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-end mb-24">
            <div>
              <h3 className="text-8xl font-bold italic tracking-tighter leading-none mb-4">Tech Blog</h3>
              <p className="text-zinc-500 font-medium text-sm">( 技術ブログ )</p>
            </div>
            <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors text-sm font-bold tracking-widest border-b border-zinc-800 pb-2">
              VIEW ALL POSTS
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { 
                title: "コーディングエージェントと協働する未来", 
                date: "2026.05.01", 
                desc: "AIと人間がどのようにコードを書いていくべきか。最新のAI技術と開発フローの統合について考察します。",
                slug: "hello-world" // content/hello-world.mdへリンク
              },
              { 
                title: "ブラウザ上で動くPython実行エンジンの仕組み", 
                date: "2026.04.21", 
                desc: "Pyodideを活用し、サーバーレスでPythonを実行するフロントエンド技術。IDE開発の裏側を解説。",
                slug: "hello-world" 
              },
            ].map((post, i) => (
              <Link href={`/blog/${post.slug}`} key={i} className="group relative bg-zinc-900/40 border border-zinc-800/50 rounded-[3rem] p-12 overflow-hidden hover:border-zinc-500/50 transition-all flex flex-col justify-between h-[450px]">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-zinc-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div>
                  <time className="font-mono text-zinc-500 text-sm mb-6 block tracking-[0.2em]">{post.date}</time>
                  <h4 className="text-3xl md:text-4xl font-bold mb-8 group-hover:text-zinc-100 transition-colors leading-[1.2]">{post.title}</h4>
                  <p className="text-zinc-500 text-lg leading-relaxed line-clamp-3">{post.desc}</p>
                </div>

                <div className="flex justify-end">
                  <div className="w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-8 text-center bg-[#0a0a0a] border-t border-zinc-900">
        <p className="text-zinc-600 text-[10px] tracking-[0.4em] font-bold uppercase">© 2026 KAISEI HUB. ALL RIGHTS RESERVED.</p>
      </footer>

    </div>
  );
}
