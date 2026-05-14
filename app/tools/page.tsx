"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { PenTool, Code, Cpu } from "lucide-react";

export default function ToolsPage() {
  return (
    <div className="min-h-screen pt-32 pb-12 px-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold tracking-tight">Tools</h1>
        <p className="text-zinc-400 mt-2">ブラウザで完結するプロフェッショナル・ユーティリティ</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Link href="/tools/forenote" className="md:col-span-2 md:row-span-2 group block outline-none">
          <motion.div 
            whileHover={{ scale: 0.99 }}
            whileTap={{ scale: 0.97 }}
            className="h-full relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 p-8 transition-colors hover:border-zinc-600"
          >
            <div className="absolute top-6 right-6 bg-blue-600 text-white p-3 rounded-2xl shadow-lg group-hover:rotate-12 transition-transform">
              <PenTool size={24} />
            </div>
            <h2 className="text-3xl font-bold mt-4">Forenote Pro</h2>
            <p className="text-zinc-400 mt-2 max-w-sm">
              Supreme Master V24. 無限のキャンバス、高度な幾何学計算、ローカル保存を備えた究極の手書きノートアプリ。
            </p>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          </motion.div>
        </Link>

        <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between">
          <Code className="text-zinc-500" size={24} />
          <div className="mt-8">
            <h3 className="font-semibold">JSON Formatter</h3>
            <p className="text-sm text-zinc-500">Coming soon</p>
          </div>
        </div>

        <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between">
          <Cpu className="text-zinc-500" size={24} />
          <div className="mt-8">
            <h3 className="font-semibold">Regex Tester</h3>
            <p className="text-sm text-zinc-500">Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
