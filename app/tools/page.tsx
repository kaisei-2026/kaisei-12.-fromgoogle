"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { PenTool, Terminal, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

const text = {
  jp: { title: "ツール", desc: "ブラウザで完結するプロフェッショナル開発環境", py: "Python エディタ", pyDesc: "データ分析・ローカルファイル対応", web: "Web エディタ", webDesc: "HTML/CSS/JS リアルタイムプレビュー", fn: "Forenote Pro", fnDesc: "無限のキャンバスと高度な手書き機能" },
  en: { title: "Tools", desc: "Professional dev environments directly in your browser.", py: "Python IDE", pyDesc: "Data Analysis / Local Files", web: "Web IDE", webDesc: "HTML/CSS/JS Live Preview", fn: "Forenote Pro", fnDesc: "Infinite Canvas & Handwriting" }
};

export default function ToolsPage() {
  const [lang, setLang] = useState<"jp" | "en">("jp");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLang((localStorage.getItem("app_lang") as "jp" | "en") || "jp");
  }, []);

  if (!mounted) return null;
  const t = text[lang];

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 max-w-6xl mx-auto bg-white">
      <div className="mb-20">
        <h1 className="text-6xl font-black text-zinc-950 tracking-tighter uppercase italic">{t.title}.</h1>
        <p className="mt-4 text-zinc-500 font-bold tracking-widest">{t.desc}</p>
        <div className="h-2 w-20 bg-blue-600 mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Python エディタ */}
        <Link href="/tools/python-editor" className="group block outline-none lg:col-span-2">
          <motion.div whileHover={{ y: -5 }} className="h-[300px] bg-zinc-950 p-10 flex flex-col justify-between rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] group-hover:shadow-[0_10px_40px_rgba(40,167,69,0.3)] transition-all border border-zinc-800">
            <Terminal size={40} className="text-[#28a745]" />
            <div>
              <h2 className="text-4xl font-black text-white uppercase">{t.py}</h2>
              <p className="text-zinc-400 font-bold mt-2 uppercase tracking-[0.1em] text-sm">{t.pyDesc}</p>
            </div>
          </motion.div>
        </Link>

        {/* Web エディタ */}
        <Link href="/tools/code-editor" className="group block outline-none">
          <motion.div whileHover={{ y: -5 }} className="h-[300px] bg-blue-600 p-10 flex flex-col justify-between rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] group-hover:shadow-[0_10px_40px_rgba(0,120,212,0.4)] transition-all border border-blue-500">
            <Monitor size={40} className="text-white" />
            <div>
              <h2 className="text-4xl font-black text-white uppercase">{t.web}</h2>
              <p className="text-blue-200 font-bold mt-2 uppercase tracking-[0.1em] text-sm">{t.webDesc}</p>
            </div>
          </motion.div>
        </Link>

        {/* Forenote */}
        <Link href="/tools/forenote" className="group block outline-none lg:col-span-3">
          <motion.div whileHover={{ y: -5 }} className="h-[200px] bg-white border-2 border-zinc-200 p-10 flex flex-col justify-between rounded-3xl hover:border-zinc-950 transition-all">
            <PenTool size={40} className="text-zinc-950" />
            <div>
              <h2 className="text-3xl font-black text-zinc-950 uppercase">{t.fn}</h2>
              <p className="text-zinc-500 font-bold mt-2 uppercase tracking-[0.1em] text-sm">{t.fnDesc}</p>
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
