"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckSquare } from "lucide-react";

export default function Home() {
  const [lang, setLang] = useState<"jp" | "en">("jp");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLang((localStorage.getItem("app_lang") as "jp" | "en") || "jp");
  }, []);

  if (!mounted) return null;

  // ニュースは最新の重要なものに絞る
  const newsItems = [
    { date: "2026.05.15", title: "AIとの協働を加速する新ツール群を公開", tag: "UPDATE", link: "/tools" },
    { date: "2026.05.01", title: "PythonエディタがJupyter形式（.ipy）に完全対応", tag: "FEATURE", link: "/tools/python-editor" },
  ];

  return (
    <div className="bg-[#ffffff] text-zinc-900 font-serif selection:bg-zinc-900 selection:text-white pt-16">
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[85vh] flex flex-col justify-end px-8 md:px-20 pb-20 overflow-hidden bg-zinc-900">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/kaisei-google/bg-school.png')" }}
        >
          <div className="absolute inset-0 bg-black/40" /> 
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="relative z-10 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter font-sans">KAISEI TOOLS</h2>
          <h1 className="text-[18vw] md:text-[16rem] font-bold tracking-tighter leading-[0.8]">KAISEI</h1>
        </motion.div>
      </section>

      {/* SECTION 2: INSIGHTS (ここがメインの記事へのリンク) */}
      <section className="py-40 px-8 md:px-20 max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-20">
        <div className="lg:col-span-5">
          <h3 className="text-7xl font-bold tracking-tighter mb-4 text-zinc-900 leading-none">AIの使いかた</h3>
          <p className="text-zinc-400 font-medium text-sm mb-12 font-sans tracking-widest uppercase">Expert Insights</p>
          
          <Link href="/blog/coding-agent" className="group block relative overflow-hidden bg-[#0a0a0a] text-white p-12 rounded-[3.5rem] transition-all hover:shadow-2xl">
            <time className="text-zinc-500 font-mono text-sm mb-6 block">2026.05.15</time>
            <h4 className="text-3xl md:text-4xl font-bold leading-tight mb-10 group-hover:text-emerald-400 transition-colors">
              あなたの可能性を広げる<br />AI活用の3つの新常識
            </h4>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold tracking-[0.2em] opacity-60">READ ARTICLE</span>
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* SECTION 3: NEWS (右側に配置) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h3 className="text-4xl font-bold mb-10 font-sans border-b border-zinc-100 pb-6">News</h3>
          <div className="space-y-4">
            {newsItems.map((item, i) => (
              <Link href={item.link} key={i} className="group flex items-center justify-between p-6 rounded-3xl hover:bg-zinc-50 transition-all">
                <div className="flex gap-10 items-center">
                  <span className="font-mono text-zinc-400 font-bold">{item.date.slice(5)}</span>
                  <h4 className="text-lg md:text-xl font-bold text-zinc-800">{item.title}</h4>
                </div>
                <ArrowUpRight size={20} className="text-zinc-300 group-hover:text-zinc-900 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 px-8 text-center bg-zinc-50 border-t border-zinc-100">
        <p className="text-zinc-400 text-[10px] tracking-[0.4em] font-bold uppercase font-sans">© 2026 KAISEI HUB.</p>
      </footer>
    </div>
  );
}
