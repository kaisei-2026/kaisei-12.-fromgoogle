"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools" },
  { name: "Blog", path: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex gap-2 p-1.5 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="relative px-6 py-2 text-sm font-medium transition-colors outline-none"
          >
            <span className={`relative z-10 ${isActive(item.path) ? "text-white" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"}`}>
              {item.name}
            </span>
            {isActive(item.path) && (
              <motion.div
                layoutId="active-nav-pill"
                className="absolute inset-0 bg-zinc-900 dark:bg-white rounded-full -z-0"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
