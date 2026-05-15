"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CodeEditorPage() {
  return (
    <div className="h-screen flex flex-col bg-white pt-[64px]">
      <div className="p-3 px-6 border-b border-zinc-200 flex items-center bg-[#f8f8f8] justify-between">
        <Link href="/tools" className="flex items-center text-xs font-bold text-zinc-600 hover:text-zinc-900 transition-colors">
          <ArrowLeft size={14} className="mr-2" /> EXIT IDE
        </Link>
        <span className="text-[10px] font-black text-zinc-400 tracking-[0.2em]">WEB EDITOR PRO</span>
      </div>
      <iframe
        src="/kaisei-google/apps/code-editor.html"
        className="flex-1 border-none w-full"
        title="Elite Code Editor"
      />
    </div>
  );
}
