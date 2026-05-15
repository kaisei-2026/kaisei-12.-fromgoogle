"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [lang, setLang] = useState<"jp" | "en">("jp");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLang((localStorage.getItem("app_lang") as "jp" | "en") || "jp");
  }, []);

  if (!mounted) return null;

  return (
    // ページ全体。背景色は真っ白ではなく、画像に合わせた極薄いグレー
    <div className="relative min-h-screen bg-[#fafafa] overflow-hidden flex flex-col justify-center font-serif">
      
      {/* 
        🌟 背景画像エリア 🌟
        画像を配置したい場合は、プロジェクトの public フォルダに 
        「bg-image.png」という名前で画像を入れ、
        下の backgroundImage のコメントアウト（//）を外してください。
      */}
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-multiply"
        style={{
          // backgroundImage: "url('/kaisei-12.-fromgoogle/bg-image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // 画像がない時用のグラデーション
          background: "radial-gradient(circle at 80% 80%, #e5e7eb 0%, transparent 50%)"
        }}
      />

      {/* メインコンテンツ */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 pt-20">
        
        {/* 巨大なタイポグラフィ（画像のようなセリフ体） */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          // フォントを明朝体風にし、行間を極限まで詰める
          className="leading-[0.85] text-[#1a1a1a]"
        >
          <h1 className="text-[20vw] md:text-[14rem] tracking-tighter">
            Kaisei
          </h1>
          <h1 className="text-[20vw] md:text-[14rem] tracking-tighter ml-[10vw] md:ml-[15rem]">
            Hub
          </h1>
          {/* 小さなルビ（ふりがな）のような装飾 */}
          <p className="absolute top-[50%] right-[10%] md:right-[20%] text-sm md:text-lg tracking-widest text-zinc-500">
            カイセイハブ
          </p>
        </motion.div>

        {/* 下部のテキストエリア（画像のような左右分割レイアウト） */}
        <div className="mt-20 md:mt-32 flex flex-col md:flex-row justify-between items-end gap-10">
          
          {/* 左下：英語のサブテキスト */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-zinc-500 italic text-xs md:text-sm tracking-widest"
          >
            Build the world work with Digital Tools.
          </motion.div>

          {/* 右下：メインのキャッチコピー */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="md:w-1/2 max-w-lg"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#222] leading-snug mb-6 tracking-tight">
              {lang === "jp" ? (
                <>AIとツールが<br />協働する世界をつくる</>
              ) : (
                <>Creating a world where<br />AI and tools collaborate</>
              )}
            </h2>
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed tracking-wider">
              {lang === "jp" ? (
                <>
                  わたしたちは、<br />
                  ブラウザ上で完結するあらゆる業務のハブとなり、<br />
                  人間とツールがシームレスに協働することが<br />
                  当たり前になる世界を目指しています。
                </>
              ) : (
                <>
                  We aim for a world where seamless collaboration between humans and tools becomes the norm, acting as a hub for all tasks completed within the browser.
                </>
              )}
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
