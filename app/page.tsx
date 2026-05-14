"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-white">
      {/* 背景の柔らかな光 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[140px] pointer-events-none opacity-50" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10"
      >
        <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter text-zinc-900 leading-none">
          CRAFT<br />
          <span className="text-blue-600">SPACE.</span>
        </h1>
        <p className="mt-10 text-lg text-zinc-500 max-w-2xl mx-auto font-bold tracking-[0.2em] uppercase">
          Engineering Hub / Tools / Garden
        </p>
      </motion.div>
    </div>
  );
}
