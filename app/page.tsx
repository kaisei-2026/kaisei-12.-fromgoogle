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
    { date: "2026.05.01", title: "PythonエディタがJupyter形式（.ipy）を完全サポート", tag: "FEATURE", link: "/tools/python-editor" },
    { date: "2026.04.14", title: "ポートフォリオサイトのデザインを一新しました", tag: "INFO", link: "/blog" },
  ];

  return (
    <div className="bg-white text-zinc-900 font-serif selection:bg-zinc-900 selection:text-white">
      
      {/* SECTION 1: HERO (🌟 ヘッダーの裏まで画像を広げる) */}
      <section className="relative h-screen flex flex-col justify-end px-6 md:px-20 pb-16 md:pb-24 overflow-hidden">
        {/* 背景画像（絶対配置で画面全体に） */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/kaisei-google/bg-school.png')" }}
        >
          {/* 画像に少しだけ暗いグラデーションをかけて、下の文字を際立たせる */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" /> 
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="relative z-10 text-white">
          <h2 className="text-xl md:text-4xl font-bold mb-2 md:mb-4 tracking-tighter font-sans opacity-90 uppercase drop-shadow-md text-zinc-100">
            KAISEI TOOLS
          </h2>
          <h1 className="text-[22vw] md:text-[16rem] font-bold tracking-tighter leading-[0.8] drop-shadow-2xl">
            KAISEI
          </h1>
        </motion.div>
      </section>

      {/* SECTION 2: INSIGHTS & NEWS */}
      <section className="py-20 md:py-40 px-6 md:px-20 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
        <div className="lg:col-span-5">
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">AIの使いかた</h3>
          <p className="text-zinc-400 text-xs mb-8 md:mb-12 font-sans tracking-widest uppercase">Expert Insights</p>
          <Link href="/blog/coding-agent" className="group block bg-[#0a0a0a] text-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] hover:shadow-2xl transition-all">
            <time className="text-zinc-500 font-mono text-xs mb-4 block">2026.05.15</time>
            <h4 className="text-2xl md:text-4xl font-bold leading-tight mb-8 group-hover:text-emerald-400 transition-colors">
              あなたの可能性を広げる<br />AI活用の3つの新常識
            </h4>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold tracking-[0.2em] opacity-60 uppercase font-sans">Read Article</span>
              <ArrowUpRight size={20} />
            </div>
          </Link>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-6 font-sans border-b border-zinc-100 pb-4">News</h3>
          <div className="space-y-2">
            {newsItems.map((item, i) => (
              <Link href={item.link} key={i} className="group flex items-center justify-between p-4 md:p-6 rounded-2xl hover:bg-zinc-50 transition-all border border-transparent hover:border-zinc-100">
                <div className="flex gap-6 md:gap-10 items-center">
                  <span className="font-mono text-zinc-400 text-sm font-bold">{item.date.slice(5)}</span>
                  <h4 className="text-sm md:text-lg font-bold text-zinc-800 line-clamp-1">{item.title}</h4>
                </div>
                <ArrowUpRight size={18} className="text-zinc-300 group-hover:text-zinc-900" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 md:py-20 px-8 text-center bg-zinc-50 border-t border-zinc-100">
        <p className="text-zinc-400 text-[9px] tracking-[0.4em] font-bold uppercase font-sans">© 2026 KAISEI HUB.</p>
      </footer>
    </div>
  );
}
