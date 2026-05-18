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
      heroSub: "Next-Gen Productivity Ecosystem",
      insightsTitle: "AIの使いかた",
      articleTitle: "あなたの可能性を広げる\nAI活用の3つの新常識",
      newsItems: [
        { date: "2026.05.15", title: "プロフェッショナルIDE「ZENITH」公開", tag: "RELEASE", link: "/tools" },
        { date: "2026.05.01", title: "クラウド同期システムのセキュリティを強化", tag: "SECURITY", link: "/tools" },
      ]
    },
    en: {
      heroSub: "Next-Gen Productivity Ecosystem",
      insightsTitle: "AI Insights",
      articleTitle: "3 New Paradigms of AI\nto Expand Your Potential",
      newsItems: [
        { date: "2026.05.15", title: "Professional IDE 'ZENITH' Released", tag: "RELEASE", link: "/tools" },
        { date: "2026.05.01", title: "Enhanced Security for Cloud Sync System", tag: "SECURITY", link: "/tools" },
      ]
    }
  };

  const t = content[lang];

  return (
    <div className="bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 font-serif transition-colors duration-300">
      
      {/* SECTION 1: HERO (フリー画像を使用) */}
      <section className="relative h-screen flex flex-col justify-end px-6 md:px-20 pb-16 md:pb-24 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] hover:scale-105"
          style={{ 
            // 🌟 著作権フリーのテック系建築画像
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')", 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" /> 
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="relative z-10 text-white">
          <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 tracking-[0.3em] font-sans text-blue-400 uppercase">
            {t.heroSub}
          </h2>
          <h1 className="text-[20vw] md:text-[14rem] font-black tracking-tighter leading-[0.8] drop-shadow-2xl">
            NEXUS
          </h1>
        </motion.div>
      </section>

      {/* SECTION 2: INSIGHTS & NEWS */}
      <section className="py-20 md:py-40 px-6 md:px-20 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 font-sans">
        <div className="lg:col-span-5">
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 italic">{t.insightsTitle}</h3>
          <p className="text-zinc-400 text-xs mb-8 md:mb-12 tracking-widest uppercase">Expert Intelligence</p>
          <Link href="/blog/coding-agent" className="group block bg-[#0a0a0a] dark:bg-zinc-900 text-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] hover:shadow-2xl transition-all border border-zinc-800">
            <time className="text-zinc-500 font-mono text-xs mb-4 block">2026.05.15</time>
            <h4 className="text-2xl md:text-4xl font-bold leading-tight mb-8 group-hover:text-blue-400 transition-colors whitespace-pre-line font-serif italic">
              {t.articleTitle}
            </h4>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold tracking-[0.2em] opacity-60 uppercase">Explore Insight</span>
              <ArrowUpRight size={20} />
            </div>
          </Link>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">Latest Updates</h3>
          <div className="space-y-2">
            {t.newsItems.map((item, i) => (
              <Link href={item.link} key={i} className="group flex items-center justify-between p-4 md:p-6 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">
                <div className="flex gap-6 md:gap-10 items-center">
                  <span className="font-mono text-zinc-400 dark:text-zinc-500 text-sm font-bold">{item.date.slice(5)}</span>
                  <h4 className="text-sm md:text-lg font-bold text-zinc-800 dark:text-zinc-200">{item.title}</h4>
                </div>
                <ArrowUpRight size={18} className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-white" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 md:py-20 px-8 text-center bg-zinc-50 dark:bg-[#050505] border-t border-zinc-100 dark:border-zinc-800">
        <p className="text-zinc-400 text-[9px] tracking-[0.5em] font-bold uppercase">© 2026 NEXUS HUB. POWERED BY CLOUD ENGINE.</p>
      </footer>
    </div>
  );
}
