"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { PenTool, Terminal, Layout } from "lucide-react";

export default function ToolsPage() {
  return (
    <div className="min-h-screen pt-40 pb-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-6xl font-black text-zinc-950 tracking-tighter uppercase italic mb-16">Tools.</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Forenote */}
        <Link href="/tools/forenote" className="group">
          <motion.div whileHover={{ y: -5 }} className="h-[350px] bg-white border-2 border-zinc-950 p-10 flex flex-col justify-between hover:shadow-[12px_12px_0px_#000] transition-all">
            <PenTool size={40} className="text-zinc-950" />
            <div>
              <h2 className="text-4xl font-black text-zinc-950">FORENOTE PRO</h2>
              <p className="text-zinc-500 font-bold mt-2 uppercase tracking-widest">Handwriting / Master V24</p>
            </div>
          </motion.div>
        </Link>

        {/* Code Runner */}
        <Link href="/tools/code-runner" className="group">
          <motion.div whileHover={{ y: -5 }} className="h-[350px] bg-[#f4f4f5] border-2 border-zinc-950 p-10 flex flex-col justify-between hover:shadow-[12px_12px_0px_#000] transition-all">
            <Terminal size={40} className="text-zinc-950" />
            <div>
              <h2 className="text-4xl font-black text-zinc-950">SUBLIME RUNNER</h2>
              <p className="text-zinc-500 font-bold mt-2 uppercase tracking-widest">Code Editor / Debugger</p>
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
