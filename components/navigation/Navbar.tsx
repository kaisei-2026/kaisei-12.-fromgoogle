"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react"; // 🌟 SunとMoonを追加

export default function Navbar() {
  const [lang, setLang] = useState<"jp" | "en">("jp");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("app_lang") as "jp" | "en";
    if (savedLang) setLang(savedLang);

    // 🌟 ダークモードの初期設定（前回選んだものを記憶）
    const savedTheme = localStorage.getItem("app_theme") as "light" | "dark";
    // PCの設定がダークなら最初からダークにする
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = savedTheme || (prefersDark ? "dark" : "light");
    
    setTheme(currentTheme);
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleLang = () => {
    const newLang = lang === "jp" ? "en" : "jp";
    localStorage.setItem("app_lang", newLang);
    window.location.reload();
  };

  // 🌟 ダークモード切り替え処理
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("app_theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className="fixed top-0 w-full z-[9999] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800 px-6 py-4 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter text-zinc-900 dark:text-white flex items-center gap-2">
          <div className="w-6 h-6 bg-zinc-900 dark:bg-white rounded-sm rotate-45" />
          KAISEI.HUB
        </Link>

        {/* デスクトップメニュー */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] text-zinc-500 dark:text-zinc-400 uppercase font-sans">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Home</Link>
          <Link href="/tools" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Tools</Link>
          <Link href="/blog" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Insights</Link>
          
          <div className="flex items-center gap-4 border-l pl-8 border-zinc-200 dark:border-zinc-700">
            <button onClick={toggleLang} className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              {lang === "jp" ? "ENGLISH" : "JAPANESE"}
            </button>
            {/* 🌟 ダークモード切り替えボタン */}
            <button onClick={toggleTheme} className="hover:text-zinc-900 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
        </div>

        {/* スマホ用ボタン */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="text-zinc-600 dark:text-zinc-300 p-2">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="text-zinc-900 dark:text-white p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* スマホメニュー */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-6 font-bold text-zinc-800 dark:text-zinc-200 shadow-xl">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/tools" onClick={() => setIsOpen(false)}>Tools</Link>
          <Link href="/blog" onClick={() => setIsOpen(false)}>Insights</Link>
          <button onClick={toggleLang} className="text-left text-blue-600 dark:text-blue-400">
            {lang === "jp" ? "Switch to English" : "日本語に切り替え"}
          </button>
        </div>
      )}
    </nav>
  );
}
