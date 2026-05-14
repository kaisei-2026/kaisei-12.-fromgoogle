"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Activity, Brain, Code2, User } from "lucide-react";

export default function Home() {
  const bgImg = "https://ichiritsukoukou.jp/wordpress/wp-content/uploads/2021/03/%E9%AB%98%E6%A0%A1%E7%B4%B9%E4%BB%8B_%E9%96%8B%E6%88%90top.jpg";

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* 1. HERO SECTION: 札幌開成の写真を背景にしたメイン画面 */}
      <section className="relative h-[90vh] flex items-center justify-center pt-16 px-6">
        <div 
          className="absolute inset-4 rounded-[2.5rem] overflow-hidden bg-cover bg-center shadow-2xl"
          style={{ backgroundImage: `url(${bgImg})` }}
        >
          {/* 画像を見やすくするための暗めのオーバーレイ */}
          <div className="absolute inset-0 bg-black/30 backdrop-brightness-90" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center max-w-4xl"
        >
          {/* グラスモーフィズム（すりガラス）のメインカード */}
          <div className="bg-white/20 backdrop-blur-2xl p-10 md:p-16 rounded-[3rem] border border-white/30 shadow-2xl">
            <span className="text-white text-xs font-black tracking-[0.5em] uppercase mb-4 block">KAISEI Tools</span>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8">
              KAISEI<br />ENGINEERING
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
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

      {/* 2. PROFILE LABEL: 下のセクションへの導入 */}
      <div className="mt-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-[2px] w-8 bg-blue-600"></div>
          <span className="text-blue-600 font-black tracking-widest text-sm uppercase">About Me</span>
        </div>
        <h2 className="text-5xl font-[1000] text-zinc-950 tracking-tighter italic">開発者プロフィール.</h2>
      </div>

      {/* 3. 3 PILLARS SECTION: 陸上・AI・開発環境の紹介 */}
      <section className="py-12 pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Activity className="text-blue-500" />, 
              title: "TRACK & FIELD", 
              desc: "陸上部。100m/200m。" 
            },
            { 
              icon: <Brain className="text-purple-500" />, 
              title: "AI & TECHNOLOGY", 
              desc: "機械学習とAI技術。" 
            },
            { 
              icon: <Code2 className="text-emerald-500" />, 
              title: "TOOLS FOR CHROMEBOOK", 
              desc: "Chromebook環境で使える最大限を実現。(NPO法人プログラマー)" 
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="p-10 bg-white border border-zinc-200 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all group"
            >
              <div className="mb-6 p-4 bg-zinc-50 rounded-2xl w-fit group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tighter">{item.title}</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
