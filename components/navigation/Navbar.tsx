"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = {
  jp: [{ name: "ホーム", path: "/" }, { name: "ツール", path: "/tools" }, { name: "ブログ", path: "/blog" }],
  en: [{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }, { name: "Blog", path: "/blog" }]
};

export default function Navbar() {
  const pathname = usePathname();
  const [lang, setLang] = useState<"jp" | "en">("jp");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("app_lang") as "jp" | "en";
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleLang = () => {
    const newLang = lang === "jp" ? "en" : "jp";
    setLang(newLang);
    localStorage.setItem("app_lang", newLang);
    window.dispatchEvent(new Event('storage')); // エディタ等に言語変更を知らせる
    window.location.reload(); // サイト全体に反映させるためリロード
  };

  const isActive = (path: string) => path === "/" ? pathname === "/" : pathname.startsWith(path);

  if (!mounted) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
      <nav className="flex gap-2 p-1.5 bg-[#18181b]/80 backdrop-blur-md border border-[#333] rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        {navItems[lang].map((item) => (
          <Link key={item.path} href={item.path} className="relative px-6 py-2 text-sm font-bold transition-colors outline-none">
            <span className={`relative z-10 ${isActive(item.path) ? "text-white" : "text-zinc-500 hover:text-white"}`}>
              {item.name}
            </span>
            {isActive(item.path) && (
              <motion.div layoutId="nav-pill" className="absolute inset-0 bg-[#333] rounded-full -z-0" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
            )}
          </Link>
        ))}
      </nav>
      {/* 言語切り替えボタン */}
      <button onClick={toggleLang} className="bg-[#18181b]/80 backdrop-blur-md border border-[#333] text-white px-4 py-2 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:bg-[#333] transition-colors">
        {lang === "jp" ? "JP" : "EN"}
      </button>
    </div>
  );
}
