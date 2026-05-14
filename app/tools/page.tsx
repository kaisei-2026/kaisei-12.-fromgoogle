"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { PenTool, Terminal, Code, Cpu } from "lucide-react";

export default function ToolsPage() {
  return (
    <div className="min-h-screen pt-40 pb-20 px-6 max-w-6xl mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase">Tools</h1>
        <div className="h-1 w-20 bg-blue-500 mt-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Forenote Pro (メイン) */}
        <Link href="/tools/forenote" className="md:col-span-2 group">
          <motion.div 
            whileHover={{ y: -8 }}
            className="h-full relative overflow-hidden rounded-[2rem] bg-zinc-900/50 border border-white/10 p-10 backdrop-blur-xl transition-all hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]"
          >
            <div className="bg-blue-600 text-white p-4 rounded-2xl w-fit mb-6 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              <PenTool size={32} />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Forenote Pro</h2>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
              Supreme Master V24. 無限のキャンバスと高度な計算機能を備えた究極の手書きノート。
            </p>
          </motion.div>
        </Link>

        {/* Code Runner (ログ表示ツール) */}
        <Link href="/tools/code-runner" className="group">
          <motion.div 
            whileHover={{ y: -8 }}
            className="h-full relative overflow-hidden rounded-[2rem] bg-zinc-900/50 border border-white/10 p-8 backdrop-blur-xl transition-all hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)]"
          >
            <div className="bg-emerald-600 text-white p-3 rounded-xl w-fit mb-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Terminal size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Code Runner</h3>
            <p className="text-zinc-500 text-sm italic">
              JavaScript実行 & ログ表示。
              検証ツールが使えない環境のための開発支援。
            </p>
          </motion.div>
        </Link>

        {/* Coming Soon */}
        <div className="rounded-[2rem] bg-zinc-900/30 border border-white/5 p-8 flex flex-col justify-between opacity-50">
          <Code className="text-zinc-600" />
          <h3 className="text-xl font-bold text-zinc-500">Coming Soon</h3>
        </div>
        <div className="rounded-[2rem] bg-zinc-900/30 border border-white/5 p-8 flex flex-col justify-between opacity-50">
          <Cpu className="text-zinc-600" />
          <h3 className="text-xl font-bold text-zinc-500">Coming Soon</h3>
        </div>
      </div>
    </div>
  );
}
