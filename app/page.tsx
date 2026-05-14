"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Activity, Brain, Code2 } from "lucide-react";

export default function Home() {
  const bgImg = "https://ichiritsukoukou.jp/wordpress/wp-content/uploads/2021/03/%E9%AB%98%E6%A0%A1%E7%B4%B9%E4%BB%8B_%E9%96%8B%E6%88%90top.jpg";

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center pt-16 px-6">
        <div 
          className="absolute inset-4 rounded-[2.5rem] overflow-hidden bg-cover bg-center shadow-2xl"
          style={{ backgroundImage: `url(${bgImg})` }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-brightness-90" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center max-w-4xl"
        >
          <div className="bg-white/20 backdrop-blur-2xl p-10 md:p-16 rounded-[3rem] border border-white/30 shadow-2xl">
            <span className="text-white text-xs font-black tracking-[0.5em] uppercase mb-4 block">KAISEI Tools</span>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8">
              KAISEI<br />ENGINEERING
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto">
              KAISEIのためのツールページ<br />
              すべてを統合するクリエイティブハブ。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/tools" className="bg-white text-zinc-950 px-8 py-4 rounded-full font-black flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">
                GET STARTED <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3 PILLARS SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Activity className="text-blue-500" />, title: "TRACK & FIELD", desc: "陸上部。" },
            { icon: <Code2 className="text-emerald-500" />, title: "AI & TECHNOLOGY", desc: "機械学習とAI技術。プログラミング多数を活用。" },
            { icon: <Code2 className="text-emerald-500" />, title: "TOOLS FOR CHROMEBOOK", desc: "Chromebook環境で使える最大限を実現します。" }
          ].map((item, i) => (
            <div key={i} className="p-10 bg-white border border-zinc-200 rounded-[2rem] hover:shadow-xl transition-all group">
              <div className="mb-6 p-4 bg-zinc-50 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tighter">{item.title}</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
