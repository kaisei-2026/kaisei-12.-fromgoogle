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

  // 指定された項目を除外したリスト
  const newsItems = [
    { date: "2026.05.15", title: "次世代IDE「Elite Pro」正式リリース", tag: "UPDATE", link: "/tools/code-editor" },
    { date: "2026.05.01", title: "PythonエディタがJupyterノートブック形式（.ipy）を完全サポート", tag: "FEATURE", link: "/tools/python-editor" },
    { date: "2026.04.14", title: "ポートフォリオサイトのデザインを一新しました", tag: "INFO", link: "/blog" },
  ];

  return (
    <div className="bg-[#ffffff] text-zinc-900 font-serif selection:bg-zinc-900 selection:text-white pt-16">
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[80vh] flex flex-col justify-end px-8 md:px-20 pb-20 overflow-hidden bg-zinc-900">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/kaisei-google/bg-school.png')" }}
        >
          <div className="absolute inset-0 bg-black/40" /> 
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="relative z-10 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter font-sans">KAISEI TOOLS</h2>
          <h1 className="text-[18vw] md:text-[16rem] font-bold tracking-tighter leading-[0.8] drop-shadow-2xl">KAISEI</h1>
        </motion.div>
      </section>

      {/* SECTION 2: NEW TOOL (Task Manager) */}
      <section className="py-32 px-8 md:px-20 bg-blue-600 text-white rounded-b-[4rem]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="md:w-1/2">
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-xs font-bold mb-6 tracking-widest uppercase font-sans">Focus Tool</span>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 italic">Task Manager</h3>
            <p className="text-xl md:text-2xl leading-relaxed mb-10 opacity-90 font-sans">
              {lang === "jp" ? "開成の膨大な課題を、戦略的に管理する。" : "Manage Kaisei's massive workload strategically."}
            </p>
            <Link href="/tools/task-manager" className="inline-flex items-center gap-4 bg-white text-blue-600 px-10 py-4 rounded-full font-bold hover:bg-zinc-100 transition-all font-sans text-sm">
              カレンダーを開く <ArrowUpRight size={20}/>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
             <div className="w-64 h-64 bg-white/10 rounded-[3rem] backdrop-blur-3xl flex items-center justify-center border border-white/20 shadow-2xl">
                <CheckSquare size={100} className="text-white opacity-80" />
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: INSIGHTS & NEWS */}
      <section className="py-40 px-8 md:px-20 max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/4">
            <h3 className="text-7xl font-bold tracking-tighter mb-4 text-zinc-900">Insights</h3>
            <p className="text-zinc-400 font-medium text-sm mb-12 font-sans">( お知らせと更新履歴 )</p>
          </div>

          <div className="lg:w-3/4 space-y-6">
            {newsItems.map((item, i) => (
              <Link href={item.link} key={i} className="group block bg-white border border-zinc-100 p-8 md:p-12 rounded-[3rem] flex items-center justify-between hover:shadow-2xl transition-all">
                <div className="flex gap-10 md:gap-16 items-center">
                  <div className="font-mono text-zinc-400 text-xl font-bold">{item.date.slice(5)}</div>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-md bg-zinc-100 text-[9px] font-black text-zinc-500 mb-2 uppercase tracking-widest font-sans">{item.tag}</span>
                    <h4 className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight">{item.title}</h4>
                  </div>
                </div>
                <ArrowUpRight size={32} className="text-zinc-200 group-hover:text-zinc-900 transition-all" />
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
