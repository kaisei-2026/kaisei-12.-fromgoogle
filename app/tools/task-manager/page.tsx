"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TaskManagerPage() {
  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="p-4 border-b border-zinc-200 flex items-center bg-[#f8f9fa]">
        <Link href="/tools" className="flex items-center text-sm font-bold text-zinc-600 hover:text-zinc-900 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> ツール一覧に戻る
        </Link>
      </div>
      <iframe
        src="/kaisei-google/apps/task-manager.html"
        className="flex-1 border-none w-full"
        title="Kaisei Task Manager"
      />
    </div>
  );
}
