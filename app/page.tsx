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

  const content = {
    jp: {
      insightsTitle: "AIの使いかた",
      insightsSub: "Expert Insights",
      articleTitle: "あなたの可能性を広げる\nAI活用の3つの新常識",
      readBtn: "記事を読む",
      newsTitle: "News",
      newsItems: [
        { date: "2026.05.15", title: "AIとの協働を加速する新ツール群を公開", tag: "UPDATE", link: "/tools" },
        { date: "2026.05.01", title: "PythonエディタがJupyter形式（.ipy）に完全対応", tag: "FEATURE", link: "/tools/python-editor" },
      ]
    },
    en: {
      insightsTitle: "How to use AI",
      insightsSub: "Expert Insights",
      articleTitle: "3 New Paradigms of AI\nto Expand Your Potential",
      readBtn: "Read Article",
      newsTitle: "News",
      newsItems: [
        { date: "2026.05.15", title: "Released new tools to accelerate AI collaboration", tag: "UPDATE", link: "/tools" },
        { date: "2026.05.01", title: "Python Editor now supports Jupyter format (.ipy)", tag: "FEATURE", link: "/tools/python-editor" },
      ]
    }
  };

  const t = content[lang];

  return (
    // 🌟 ダークモード時の背景と文字色を指定 (dark:bg-[#0a0a0a] dark:text-zinc-100)
    <div className="bg-[#ffffff] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 font-serif selection:bg-zinc-900 dark:selection:bg-white selection:text-white dark:selection:text-zinc-900 pt-16 transition-colors duration-300">
      
      <section className="relative min-h-[70vh] md:min-h-[85vh] flex flex-col justify-end px-6 md:px-20 pb-12 md:pb-20 overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/kaisei-google/bg-school.png')" }}>
          <div className="absolute inset-0 bg-black/40" /> 
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="relative z-10 text-white">
          {/* 🌟 常に学校名を表示 */}
          <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 tracking-tighter font-sans opacity-90 drop-shadow-md text-zinc-100 uppercase">
            Sapporo Kaisei Secondary School
          </h2>
          <h1 className="text-[22vw] md:text-[16rem] font-bold tracking-tighter leading-[0.8] drop-shadow-2xl">
            KAISEI
          </h1>
        </motion.div>
      </section>

      <section className="py-20 md:py-40 px-6 md:px-20 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
        <div className="lg:col-span-5">
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">{t.insightsTitle}</h3>
          <p className="text-zinc-400 text-xs mb-8 md:mb-12 font-sans tracking-widest uppercase">{t.insightsSub}</p>
          
          <Link href="/blog/coding-agent" className="group block bg-[#0a0a0a] dark:bg-zinc-900 text-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] hover:shadow-2xl dark:border dark:border-zinc-800 transition-all">
            <time className="text-zinc-500 font-mono text-xs mb-4 block">2026.05.15</time>
            <h4 className="text-2xl md:text-4xl font-bold leading-tight mb-8 group-hover:text-emerald-400 transition-colors whitespace-pre-line">
              {t.articleTitle}
            </h4>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold tracking-[0.2em] opacity-60 uppercase font-sans">{t.readBtn}</span>
              <ArrowUpRight size={20} />
            </div>
          </Link>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-6 font-sans border-b border-zinc-100 dark:border-zinc-800 pb-4">{t.newsTitle}</h3>
          <div className="space-y-2">
            {t.newsItems.map((item, i) => (
              <Link href={item.link} key={i} className="group flex items-center justify-between p-4 md:p-6 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800">
                <div className="flex gap-6 md:gap-10 items-center">
                  <span className="font-mono text-zinc-400 dark:text-zinc-500 text-sm font-bold">{item.date.slice(5)}</span>
                  <h4 className="text-sm md:text-lg font-bold text-zinc-800 dark:text-zinc-200 line-clamp-1">{item.title}</h4>
                </div>
                <ArrowUpRight size={18} className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-white" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 md:py-20 px-8 text-center bg-zinc-50 dark:bg-[#111] border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
        <p className="text-zinc-400 text-[9px] tracking-[0.4em] font-bold uppercase font-sans">© 2026 KAISEI HUB.</p>
      </footer>
    </div>
  );
}
