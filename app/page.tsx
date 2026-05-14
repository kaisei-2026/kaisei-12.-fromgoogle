"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Cpu, Globe, Zap, Code2, Database, Layout } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 selection:bg-blue-100">
      
      {/* 1. HERO SECTION: 視覚的インパクト */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6 border-b border-zinc-100">
        {/* 背景のドットグリッド（エンジニア感） */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <span className="text-xs font-black tracking-[0.4em] uppercase text-blue-600 mb-6 block">
            Innovation & Engineering
          </span>
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.85] mb-8">
            CRAFT<br />THE<br />CORE.
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 font-medium max-w-xl mx-auto leading-relaxed">
            圧倒的なパフォーマンスと、無駄を削ぎ落とした美学。<br />
            あなたの思考を加速させる、次世代のクリエイティブ・ハブ。
          </p>
          
          <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link href="/tools" className="group bg-zinc-950 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-blue-600 transition-all active:scale-95 shadow-2xl">
              LAUNCH TOOLS <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-4 text-xs font-bold text-zinc-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> SYSTEM ONLINE</span>
              <span className="w-1 h-1 bg-zinc-300 rounded-full" />
              <span>SAPPORO, JAPAN</span>
            </div>
          </div>
        </motion.div>

        {/* スクロールを促すインジケーター */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-300"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-300 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* 2. STATS/IDENTITY: 自己紹介セクション */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-8">
              PHILOSOPHY.
            </h2>
            <p className="text-xl text-zinc-600 leading-relaxed font-medium">
              私たちは、ツールが単なる「道具」ではなく、思考の「拡張」であるべきだと信じています。
              高速なレスポンス、直感的なUI、そして堅牢な設計。
              Chromebookという制約の中でさえ、最高峰の開発体験を。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Performance", val: "100", icon: <Zap /> },
              { label: "Tools", val: "03+", icon: <Layout /> },
              { label: "Stack", val: "Next.js", icon: <Cpu /> },
              { label: "Deployment", val: "Actions", icon: <Globe /> }
            ].map((stat, i) => (
              <div key={i} className="p-8 border border-zinc-100 bg-zinc-50/50 rounded-3xl">
                <div className="text-blue-600 mb-4">{stat.icon}</div>
                <div className="text-2xl font-black">{stat.val}</div>
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED TOOLS: 主要ツールの紹介 */}
      <section className="py-32 bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-20">
            <div>
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter">PROJECTS.</h2>
              <p className="text-zinc-400 mt-4 font-bold uppercase tracking-widest text-sm">主力ツールのラインナップ</p>
            </div>
            <Link href="/tools" className="hidden md:block text-blue-400 font-bold hover:underline">VIEW ALL TOOLS →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Forenote */}
            <div className="group relative bg-zinc-900 rounded-[3rem] p-12 overflow-hidden transition-all hover:bg-blue-900/20 border border-zinc-800">
              <Database className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 group-hover:text-blue-500/10 transition-colors" />
              <h3 className="text-3xl font-black mb-4">FORENOTE PRO</h3>
              <p className="text-zinc-400 text-lg mb-8 max-w-sm">手書きの自由さと、デジタル保存の利便性を融合。あなたの思考を無限のキャンバスに。</p>
              <Link href="/tools/forenote" className="inline-flex items-center font-bold text-sm bg-white text-black px-6 py-3 rounded-full group-hover:bg-blue-500 group-hover:text-white transition-all">TRY NOW</Link>
            </div>

            {/* Elite IDE */}
            <div className="group relative bg-zinc-900 rounded-[3rem] p-12 overflow-hidden transition-all hover:bg-emerald-900/20 border border-zinc-800">
              <Code2 className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 group-hover:text-emerald-500/10 transition-colors" />
              <h3 className="text-3xl font-black mb-4">ELITE IDE</h3>
              <p className="text-zinc-400 text-lg mb-8 max-w-sm">Chromebookで動く本格的な開発環境。ライブプレビューとフォルダ管理を搭載。</p>
              <Link href="/tools/code-editor" className="inline-flex items-center font-bold text-sm bg-white text-black px-6 py-3 rounded-full group-hover:bg-emerald-500 group-hover:text-white transition-all">TRY NOW</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER / CONTACT */}
      <footer className="py-20 border-t border-zinc-100 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <div className="text-2xl font-black tracking-tighter mb-2">ELITE HUB.</div>
            <p className="text-sm text-zinc-400 font-bold tracking-widest uppercase">© 2026 KAISEI ENGINEERING</p>
          </div>
          <div className="flex gap-10 text-sm font-black text-zinc-400 uppercase tracking-tighter">
            <Link href="/" className="hover:text-zinc-950">Home</Link>
            <Link href="/tools" className="hover:text-zinc-950">Tools</Link>
            <Link href="/blog" className="hover:text-zinc-950">Blog</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
