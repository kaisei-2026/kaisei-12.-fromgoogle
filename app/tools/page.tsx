"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { PenTool, Code, Cpu } from "lucide-react";

export default function ToolsPage() {
  return (
    <div className="min-h-screen pt-40 pb-20 px-6 max-w-6xl mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl font-black text-white italic tracking-tighter">TOOLS</h1>
        <div className="h-1 w-20 bg-blue-500 mt-2" />
      </div>

// ... 前のコード ...

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Forenote Pro（既存） */}
        <Link href="/tools/forenote" className="md:col-span-2 md:row-span-1 group">
           {/* ...省略（既存のカード内容）... */}
        </Link>

        {/* 🌟 新しいツール：Code Runner */}
        <Link href="/tools/code-runner" className="group">
          <motion.div 
            whileHover={{ y: -8 }}
            className="h-full relative overflow-hidden rounded-[2rem] bg-zinc-900/50 border border-white/10 p-8 backdrop-blur-xl transition-all hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)]"
          >
            <div className="bg-emerald-600 text-white p-3 rounded-xl w-fit mb-4">
              <Terminal size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Code Runner</h3>
            <p className="text-zinc-500 text-sm">
              ブラウザ上でJavaScriptを実行。ログをリアルタイム表示するカスタムコンソール。
            </p>
          </motion.div>
        </Link>
        
// ... 以下省略 ...

        {/* Coming Soon Cards */}
        {[
          { icon: <Code />, title: "JSON Formatter" },
          { icon: <Cpu />, title: "Regex Tester" }
        ].map((item, i) => (
          <div key={i} className="rounded-[2rem] bg-zinc-900/30 border border-white/5 p-8 backdrop-blur-sm flex flex-col justify-between hover:bg-zinc-900/50 transition-all">
            <div className="text-zinc-500">{item.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-zinc-600 text-sm font-mono mt-1">STATUS: PENDING...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


