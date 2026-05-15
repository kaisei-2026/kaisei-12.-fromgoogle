"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [lang, setLang] = useState<"jp" | "en">("jp");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setLang((localStorage.getItem("app_lang") as "jp" | "en") || "jp");
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLang = () => {
    const newLang = lang === "jp" ? "en" : "jp";
    localStorage.setItem("app_lang", newLang);
    window.location.reload();
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-6 flex justify-between items-center ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <Link href="/" className="text-xl font-black tracking-tighter text-zinc-900 flex items-center gap-2">
        <div className="w-6 h-6 bg-zinc-900 rounded-sm rotate-45" />
        KAISEI.HUB
      </Link>

      <div className="flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
        <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
        <Link href="/tools" className="hover:text-zinc-900 transition-colors">Tools</Link>
        <Link href="/blog" className="hover:text-zinc-900 transition-colors">Blog</Link>
        <button onClick={toggleLang} className="hover:text-zinc-900 transition-colors border-l pl-8 border-zinc-200">
          {lang === "jp" ? "ENGLISH" : "JAPANESE"}
        </button>
      </div>
    </nav>
  );
}
