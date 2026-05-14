"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">
          Crafting Digital<br />Experiences.
        </h1>
        <p className="mt-6 text-xl text-zinc-400 max-w-2xl mx-auto font-light">
          圧倒的なパフォーマンスと、無駄を削ぎ落とした機能美。
          <br className="hidden md:block" />
          ツールボックスであり、実験場であり、思考の記録。
        </p>
      </motion.div>
    </div>
  );
}
