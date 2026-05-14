"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/70 backdrop-blur-xl border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-[900] tracking-tighter text-zinc-950">
          KAISEI<span className="text-blue-600">.</span>HUB
        </Link>
        
        <div className="flex gap-1 p-1 bg-zinc-100 rounded-full">
          {navItems.map((item) => {
            const active = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
            return (
              <Link key={item.path} href={item.path} className="relative px-5 py-1.5 text-sm font-bold transition-all">
                <span className={`relative z-10 ${active ? "text-white" : "text-zinc-500 hover:text-zinc-800"}`}>
                  {item.name}
                </span>
                {active && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-zinc-900 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
