"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { PenTool, Calculator, Image as ImageIcon } from "lucide-react";

export default function ToolsPage() {
  return (
    <div className="min-h-screen pt-32 pb-12 px-6 max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Tools</h1>
        <p className="text-gray-500 mt-2">ブラウザで完結するプロフェッショナル・ユーティリティ</p>
      </motion.div>

      {/* Bento UI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* メインツール：Forenote Pro */}
        <Link href="/tools/forenote" className="md:col-span-2 md:row-span-2 group">
          <motion.div 
            whileHover={{ scale: 0.99 }}
            className="h-full relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-8 transition-shadow hover:shadow-xl dark:from-gray-900 dark:to-gray-800 dark:border-gray-700"
          >
            <div className="absolute top-6 right-6 bg-blue-600 text-white p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
              <PenTool size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Forenote Pro</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-sm">
              Supreme Master V24. 無限のキャンバス、高度な幾何学計算、ローカル保存を備えた究極の手書きノートアプリ。
            </p>
            {/* 装飾用のモックUI画像などを置くと更にかっこいい */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          </motion.div>
        </Link>

        {/* サブツール群（将来追加用） */}
        <div className="rounded-3xl bg-white border border-gray-200 p-6 flex flex-col justify-between dark:bg-black dark:border-gray-800">
          <Calculator className="text-gray-400" size={24} />
          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 dark:text-white">Unit Converter</h3>
            <p className="text-sm text-gray-500">Coming soon...</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-gray-200 p-6 flex flex-col justify-between dark:bg-black dark:border-gray-800">
          <ImageIcon className="text-gray-400" size={24} />
          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 dark:text-white">Image Compressor</h3>
            <p className="text-sm text-gray-500">Coming soon...</p>
          </div>
        </div>

      </div>
    </div>
  );
}
