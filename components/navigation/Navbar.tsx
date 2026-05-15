"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const [lang, setLang] = useState<"jp" | "en">("jp");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("app_lang") as "jp" | "en";
    if (savedLang) setLang(savedLang);
    
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLang = () => {
    const newLang = lang === "jp" ? "en" : "jp";
    setLang(newLang);
    localStorage.setItem("app_lang", newLang);
    window.location.reload();
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-8 md:px-16 py-6 flex justify-between items-center ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-zinc-200" : "bg-transparent"}`}>
      {/* Logo */}
      <Link href="/" className="text-2xl font-black tracking-tighter text-zinc-900 flex items-center gap-2">
        <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-white rotate-45" />
        </div>
        KAISEI.HUB
      </Link>

      {/* Nav Items */}
      <div className="hidden md:flex items-center gap-12 text-sm font-bold tracking-widest text-zinc-500 uppercase">
        <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
        <Link href="/tools" className="hover:text-zinc-900 transition-colors">Tools</Link>
        <Link href="/blog" className="hover:text-zinc-900 transition-colors">Insights</Link>
        <button onClick={toggleLang} className="hover:text-zinc-900 transition-colors">{lang === "jp" ? "EN" : "JP"}</button>
        <Link href="/tools" className="bg-zinc-900 text-white px-8 py-3 rounded-full hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200">
          {lang === "jp" ? "はじめる" : "Get Started"}
        </Link>
      </div>
    </nav>
  );
}
