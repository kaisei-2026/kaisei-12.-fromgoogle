"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* 背景の光の玉 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center relative z-10"
      >
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white">
          CRAFTING <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            DIGITAL
          </span>
        </h1>
        <p className="mt-8 text-xl text-zinc-400 max-w-2xl mx-auto font-medium tracking-wide uppercase">
          圧倒的なパフォーマンス × 機能美
        </p>
        <div className="mt-12 h-[1px] w-24 bg-gradient-to-r from-transparent via-zinc-500 to-transparent mx-auto" />
      </motion.div>
    </div>
  );
}
