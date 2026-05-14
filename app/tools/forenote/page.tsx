"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Maximize2 } from "lucide-react";

export default function ForenotePage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // iframeを全画面にする処理
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
    <div className="min-h-screen bg-gray-50 dark:bg-black pt-24 px-4 pb-4 flex flex-col h-screen">
      
      {/* ツールバー（サイトに戻るボタンなど） */}
      <div className="flex justify-between items-center mb-4 max-w-7xl mx-auto w-full">
        <Link href="/tools" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          ツール一覧に戻る
        </Link>
        <button 
          onClick={toggleFullscreen}
          className="flex items-center text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
        >
          <Maximize2 size={16} className="mr-2" />
          全画面で集中する
        </button>
      </div>

      {/* ノートアプリ本体（iframe） */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 w-full max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-white"
      >
        <iframe
          id="forenote-iframe"
          src="/apps/forenote.html" /* publicフォルダ内のHTMLを読み込む */
          className="w-full h-full border-none bg-white"
          title="Forenote Pro"
          allow="fullscreen"
        />
      </motion.div>
    </div>
  );
}
