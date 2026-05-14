"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Maximize2 } from "lucide-react";

export default function ForenotePage() {
  const toggleFullscreen = () => {
    const iframe = document.getElementById("forenote-iframe");
    iframe?.requestFullscreen().catch(err => console.log(err));
  };

  return (
    <div className="min-h-screen pt-32 px-4 pb-4 flex flex-col h-screen">
      <div className="flex justify-between items-center mb-4 max-w-7xl mx-auto w-full">
        <Link href="/tools" className="flex items-center text-sm font-bold text-zinc-500 hover:text-white transition-colors">
          <ArrowLeft size={16} className="mr-2" /> EXIT TO HUB
        </Link>
        <button onClick={toggleFullscreen} className="text-blue-500 hover:text-blue-400 transition-colors">
          <Maximize2 size={20} />
        </button>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 w-full max-w-7xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-white">
        <iframe
          id="forenote-iframe"
          src="/kaisei-12.-fromgoogle/apps/forenote.html"
          className="w-full h-full border-none"
          title="Forenote Pro"
          allow="fullscreen"
        />
      </motion.div>
    </div>
  );
}
