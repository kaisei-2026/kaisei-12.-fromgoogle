"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [lang, setLang] = useState<"jp" | "en">("jp");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("app_lang") as "jp" | "en";
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleLang = () => {
    const newLang = lang === "jp" ? "en" : "jp";
    localStorage.setItem("app_lang", newLang);
    window.location.reload();
  };

  return (
    // 🌟 bg-white/80 + backdrop-blur-md で「すりガラス」のような高級感を出す
    <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-zinc-200/50 px-6 py-4">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter text-zinc-900 flex items-center gap-2">
          <div className="w-6 h-6 bg-zinc-900 rounded-sm rotate-45" />
          KAISEI.HUB
        </Link>

        {/* デスクトップメニュー */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase font-sans">
          <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
          <Link href="/tools" className="hover:text-zinc-900 transition-colors">Tools</Link>
          <Link href="/blog" className="hover:text-zinc-900 transition-colors">Insights</Link>
          <button onClick={toggleLang} className="hover:text-zinc-900 transition-colors border-l pl-8 border-zinc-200">
            {lang === "jp" ? "ENGLISH" : "JAPANESE"}
          </button>
        </div>

        {/* スマホ用ボタン */}
        <button className="md:hidden p-2 text-zinc-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* スマホメニュー（ここも半透明） */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg border-b border-zinc-200 p-6 flex flex-col gap-6 font-bold text-zinc-800 shadow-xl">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/tools" onClick={() => setIsOpen(false)}>Tools</Link>
          <Link href="/blog" onClick={() => setIsOpen(false)}>Insights</Link>
          <button onClick={toggleLang} className="text-left text-blue-600">
            {lang === "jp" ? "Switch to English" : "日本語に切り替え"}
          </button>
        </div>
      )}
    </nav>
  );
}
