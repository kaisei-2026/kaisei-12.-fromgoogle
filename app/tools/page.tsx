"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { PenTool, Terminal, Layout } from "lucide-react";

export default function ToolsPage() {
  return (
    <div className="min-h-screen pt-40 pb-20 px-6 max-w-6xl mx-auto bg-white">
      <div className="mb-20">
        <h1 className="text-6xl font-black text-zinc-950 tracking-tighter uppercase italic">Tools.</h1>
        <div className="h-2 w-20 bg-blue-600 mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* カード1: Forenote Pro */}
        <Link href="/tools/forenote" className="group block outline-none">
          <motion.div 
            whileHover={{ y: -10 }} 
            className="h-[350px] bg-white border-2 border-zinc-950 p-10 flex flex-col justify-between hover:shadow-[12px_12px_0px_#000] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <PenTool size={48} className="text-zinc-950" />
            <div>
              <h2 className="text-4xl font-black text-zinc-950 uppercase leading-none">FORENOTE PRO</h2>
              <p className="text-zinc-500 font-bold mt-4 uppercase tracking-[0.2em] text-sm italic">Master V24 / Handwriting</p>
            </div>
          </motion.div>
        </Link>

        {/* カード2: Live Editor (新しく追加) */}
        <Link href="/tools/code-editor" className="group block outline-none">
          <motion.div 
            whileHover={{ y: -10 }} 
            className="h-[350px] bg-white border-2 border-zinc-950 p-10 flex flex-col justify-between hover:shadow-[12px_12px_0px_#3b82f6] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <Terminal size={48} className="text-blue-600" />
            <div>
              <h2 className="text-4xl font-black text-zinc-950 uppercase leading-none">LIVE EDITOR</h2>
              <p className="text-zinc-500 font-bold mt-4 uppercase tracking-[0.2em] text-sm italic">VS Code Style / Preview</p>
            </div>
          </motion.div>
        </Link>
{/* Pythonエディタのカード */}
<Link href="/tools/python-editor" className="group block outline-none">
  <motion.div whileHover={{ y: -10 }} className="h-[350px] bg-white border-2 border-zinc-950 p-10 flex flex-col justify-between hover:shadow-[12px_12px_0px_#28a745] transition-all">
    <i className="fab fa-python text-5xl text-[#28a745]"></i>
    <div>
      <h2 className="text-4xl font-black text-zinc-950 uppercase">Python IDE</h2>
      <p className="text-zinc-500 font-bold mt-4 uppercase text-sm italic">Local Access / Terminal Output</p>
    </div>
  </motion.div>
</Link>
        
      </div>
    </div>
  );
}
