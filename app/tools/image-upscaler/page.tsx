"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ImageUpscalerPage() {
  return (
    <div className="h-screen flex flex-col bg-white pt-[64px]">
      <div className="p-3 px-6 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
        <Link href="/tools" className="flex items-center text-xs font-bold text-zinc-600 hover:text-zinc-900 transition-colors">
          <ArrowLeft size={14} className="mr-2" /> ツール一覧に戻る
        </Link>
        <span className="text-[10px] font-black text-zinc-400 tracking-[0.2em]">IMAGE UPSCALER</span>
      </div>
      <iframe
        src="/kaisei-google/apps/image-upscaler.html"
        className="flex-1 border-none w-full"
        title="Image Upscaler"
      />
    </div>
  );
}
