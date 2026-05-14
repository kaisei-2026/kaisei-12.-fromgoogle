"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { PenTool, Terminal, Plus } from "lucide-react";

export default function ToolsPage() {
  return (
    <div className="min-h-screen pt-40 pb-20 px-6 max-w-6xl mx-auto">
      <div className="mb-20">
        <h1 className="text-6xl font-black text-zinc-900 tracking-tighter uppercase">Tools.</h1>
        <div className="h-2 w-20 bg-blue-600 mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Forenote */}
        <Link href="/tools/forenote" className="group">
          <motion.div whileHover={{ y: -10 }} className="h-[400px] bg-white border-2 border-zinc-900 p-10 flex flex-col justify-between shadow-[10px_10px_0px_#18181b] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
            <PenTool size={48} className="text-zinc-900" />
            <div>
              <h2 className="text-4xl font-black text-zinc-900">FORENOTE PRO</h2>
              <p className="text-zinc-500 font-bold mt-2 uppercase tracking-widest text-sm">Analog Power / Digital Speed</p>
            </div>
          </motion.div>
        </Link>

        {/* Code Runner */}
        <Link href="/tools/code-runner" className="group">
          <motion.div whileHover={{ y: -10 }} className="h-[400px] bg-blue-600 border-2 border-zinc-900 p-10 flex flex-col justify-between shadow-[10px_10px_0px_#18181b] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none text-white">
            <Terminal size={48} />
            <div>
              <h2 className="text-4xl font-black">SUBLIME RUNNER</h2>
              <p className="text-blue-200 font-bold mt-2 uppercase tracking-widest text-sm">Virtual File System / Debug Console</p>
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
