"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Maximize2, Minimize2 } from "lucide-react";

export default function ForenotePage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const iframe = document.getElementById("forenote-iframe");
    if (!document.fullscreenElement) {
      iframe?.requestFullscreen().catch(err => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-4 flex flex-col h-screen">
      <div className="flex justify-between items-center mb-4 max-w-[1240px] mx-auto w-full">
        <Link href="/tools" className="flex items-center text-sm font-medium text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Tools
        </Link>
        <button 
          onClick={toggleFullscreen}
          className="flex items-center text-sm font-medium text-blue-400 bg-blue-950/30 px-4 py-2 rounded-full hover:bg-blue-900/50 transition-colors"
        >
          {isFullscreen ? <Minimize2 size={16} className="mr-2"/> : <Maximize2 size={16} className="mr-2"/>}
          Fullscreen
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 w-full max-w-[1240px] mx-auto rounded-2xl overflow-hidden border border-zinc-800 bg-white"
      >
        <iframe
          id="forenote-iframe"
          /* 変更前: src="/apps/forenote.html" */
          /* 変更後 ↓ リポジトリ名を頭につけます */
          src="/kaisei-12.-fromgoogle/apps/forenote.html"
          className="w-full h-full border-none bg-white"
          title="Forenote Pro"
          allow="fullscreen"
        />
      </motion.div>
    </div>
  );
}
