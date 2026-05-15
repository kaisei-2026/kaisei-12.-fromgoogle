"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Terminal, BookOpen, Clock } from "lucide-react";

export default function Home() {
  const [lang, setLang] = useState<"jp" | "en">("jp");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLang((localStorage.getItem("app_lang") as "jp" | "en") || "jp");
  }, []);

  if (!mounted) return null;

  const newsItems = [
    { date: "2026.05.15", title: "課題管理ツールにドラッグ＆ドロップ機能を追加しました", tag: "UPDATE", link: "/tools/task-manager" },
    { date: "2026.05.01", title: "PythonエディタがJupyter形式（.ipy）に完全対応", tag: "FEATURE", link: "/tools/python-editor" },
    { date: "2026.04.14", title: "KAISEI.HUB ポートフォリオを正式公開", tag: "INFO", link: "/blog" },
  ];

  return (
    <div className="bg-[#ffffff] text-zinc-900 font-serif selection:bg-zinc-900 selection:text-white pt-[64px]">
      
      {/* ヒーローセクション（デバイスに合わせて高さを調整） */}
      <section className="relative min-h-[70vh] md:min-h-screen flex flex-col justify-end px-6 md:px-20 pb-20 overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/kaisei-google/bg-school.png')" }}>
          <div className="absolute inset-0 bg-black/40" /> 
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="relative z-10 text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tighter font-sans opacity-90">KAISEI TOOLS</h2>
          <h1 className="text-[18vw] md:text-[16rem] font-bold tracking-tighter leading-[0.8] drop-shadow-2xl">KAISEI</h1>
        </motion.div>
      </section>

      {/* コンテンツエリア：News & Blog を分離 */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-20 py-20 grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* 左側：NEWS セクション */}
        <section className="lg:col-span-5">
          <div className="flex items-center gap-4 mb-12">
            <Clock className="text-blue-600" size={32} />
            <h3 className="text-5xl font-bold tracking-tighter">News</h3>
          </div>
          <div className="space-y-4">
            {newsItems.map((item, i) => (
              <Link href={item.link} key={i} className="group block bg-zinc-50 border border-zinc-100 p-6 md:p-8 rounded-[2.5rem] hover:shadow-xl hover:bg-white transition-all">
                <div className="font-mono text-zinc-400 text-sm mb-2">{item.date}</div>
                <span className="inline-block px-3 py-1 rounded-md bg-white text-[9px] font-black text-blue-600 mb-3 border border-blue-100 uppercase tracking-widest">{item.tag}</span>
                <h4 className="text-lg md:text-xl font-bold text-zinc-900 group-hover:text-blue-600 transition-colors leading-snug">{item.title}</h4>
              </Link>
            ))}
          </div>
        </section>

        {/* 右側：TECH BLOG セクション */}
        <section className="lg:col-span-7">
          <div className="flex items-center gap-4 mb-12">
            <BookOpen className="text-emerald-600" size={32} />
            <h3 className="text-5xl font-bold tracking-tighter">Insights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Python実行エンジンの仕組み", date: "2026.04.21", slug: "python-engine", color: "hover:border-emerald-500" },
              { title: "コーディングとAIの共創", date: "2026.05.01", slug: "coding-agent", color: "hover:border-blue-500" }
            ].map((post, i) => (
              <Link href={`/blog/${post.slug}`} key={i} className={`group bg-[#0a0a0a] text-white p-10 rounded-[3rem] border border-zinc-800 flex flex-col justify-between h-[350px] transition-all ${post.color}`}>
                <div>
                  <time className="font-mono text-zinc-500 text-xs mb-4 block">{post.date}</time>
                  <h4 className="text-2xl font-bold group-hover:text-zinc-100 leading-tight">{post.title}</h4>
                </div>
                <div className="flex justify-end">
                  <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <footer className="py-20 px-8 text-center bg-zinc-50 border-t border-zinc-100">
        <p className="text-zinc-400 text-[10px] tracking-[0.4em] font-bold uppercase font-sans">© 2026 KAISEI HUB.</p>
      </footer>
    </div>
  );
}
