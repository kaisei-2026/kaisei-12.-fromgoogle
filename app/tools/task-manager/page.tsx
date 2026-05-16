"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TaskManagerPage() {
  return (
    // 🌟 h-screenを維持しつつ、上部に80pxの絶対的な余白を作る
    <div className="h-screen w-full flex flex-col bg-white pt-[80px]">
      {/* ツール内の戻るバー */}
      <div className="p-3 px-6 border-b border-zinc-200 flex items-center bg-[#f8f8f8] justify-between">
        <Link href="/tools" className="flex items-center text-sm font-bold text-zinc-600 hover:text-zinc-900 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> ツール一覧に戻る
        </Link>
        <span className="text-[10px] font-black text-zinc-400 tracking-[0.2em]">KAISEI TASK MANAGER</span>
      </div>
      
      {/* ツール本体 */}
      <iframe
        src="/kaisei-google/apps/task-manager.html"
        className="flex-1 border-none w-full h-full"
        title="Kaisei Task Manager"
        allow="identity-credential-get"
      />
    </div>
  );
}
