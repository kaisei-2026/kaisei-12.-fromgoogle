"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CodeEditorPage() {
  const [lang, setLang] = useState<"jp" | "en">("jp");

  useEffect(() => {
    setLang((localStorage.getItem("app_lang") as "jp" | "en") || "jp");
  }, []);

  return (
    <div className="h-screen w-full flex flex-col bg-white dark:bg-[#0a0a0a] pt-[64px] transition-colors duration-300">
      {/* 統一された戻るバー */}
      <div className="p-3 px-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center bg-zinc-50 dark:bg-zinc-900/50 justify-between transition-colors">
        <Link href="/tools" className="flex items-center text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
          <ArrowLeft size={16} className="mr-2" /> 
          {lang === "jp" ? "ツール一覧に戻る" : "Back to Tools"}
        </Link>
        <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 tracking-[0.2em] uppercase">Web Editor Pro</span>
      </div>
      
      <iframe
        src="/kaisei-google/apps/code-editor.html"
        className="flex-1 border-none w-full h-full"
        title="Elite Code Editor"
      />
    </div>
  );
}
