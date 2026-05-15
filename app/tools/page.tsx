"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
// 🌟 ImageIconを追加インポートしています
import { PenTool, Terminal, Monitor, CheckSquare, Info, X, Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";

// ツールのデータ定義
const toolsData = {
  jp: [
    {
      id: "python-editor",
      title: "PYTHON エディタ",
      desc: "データ分析・ローカルファイル対応",
      icon: <Terminal size={32} />,
      color: "bg-zinc-950",
      textColor: "text-white",
      iconColor: "text-[#28a745]",
      link: "/tools/python-editor",
      guide: "【Pythonエディタの使い方】\n1. 「実行」ボタンでコードを動かせます。\n2. .ipynb拡張子を使えばJupyterモード（自動画面クリア）になります。\n3. 「フォルダを開く」でChromebook内の実際のファイルを直接編集・保存（Ctrl+S）できます。"
    },
    {
      id: "code-editor",
      title: "WEB エディタ",
      desc: "HTML/CSS/JS リアルタイムプレビュー",
      icon: <Monitor size={32} />,
      color: "bg-blue-600",
      textColor: "text-white",
      iconColor: "text-white",
      link: "/tools/code-editor",
      guide: "【Webエディタの使い方】\n1. 左側のエディタでコードを書くと、LIVEプレビューに反映されます。\n2. HTML/CSS/JSファイルを切り替えて開発できます。\n3. 「LIVE」ボタンを押すと、別ウィンドウで全画面プレビューが開きます。"
    },
    {
      id: "task-manager",
      title: "TASK MANAGER",
      desc: "開成生の課題管理・カレンダー",
      icon: <CheckSquare size={32} />,
      color: "bg-white",
      textColor: "text-zinc-950",
      iconColor: "text-blue-600",
      link: "/tools/task-manager",
      guide: "【課題管理の使い方】\n1. カレンダーの日付をクリックして課題を登録します。\n2. 「全◯回」を設定すると、毎週や数日おきの課題を一括登録できます。\n3. 登録した課題を長押しして別の日にドラッグ移動できます。"
    },
    {
      id: "forenote",
      title: "FORENOTE PRO",
      desc: "無限のキャンバスと高度な手書き機能",
      icon: <PenTool size={32} />,
      color: "bg-zinc-100",
      textColor: "text-zinc-950",
      iconColor: "text-zinc-950",
      link: "/tools/forenote",
      guide: "【Forenote Proの使い方】\n1. 画面上のツールからペンや図形を選んで手書きできます。\n2. なげなわツールで書いたものを選択・移動・変形できます。\n3. データは自動的にブラウザに保存され、次回起動時も続きから描けます。"
    }, // 🌟 ←ここにカンマが必要でした！
    {
      id: "image-upscaler",
      title: "IMAGE UPSCALER",
      desc: "高画質化・4Kアップスケール",
      icon: <ImageIcon size={32} />,
      color: "bg-emerald-500",
      textColor: "text-white",
      iconColor: "text-white",
      link: "/tools/image-upscaler",
      guide: "【画像高画質化ツールの使い方】\n1. 画像をドラッグ＆ドロップで読み込みます。\n2. 2倍や4倍を選択すると、内部で最高精度の補間計算が行われます。\n3. シャープネス（くっきり感）や彩度を調整し、保存ボタンでダウンロードできます。"
    }
  ],
  en: [
    {
      id: "python-editor",
      title: "PYTHON IDE",
      desc: "Data Analysis / Local Files",
      icon: <Terminal size={32} />,
      color: "bg-zinc-950",
      textColor: "text-white",
      iconColor: "text-[#28a745]",
      link: "/tools/python-editor",
      guide: "How to use Python IDE:\n1. Click 'RUN' to execute code.\n2. Use .ipynb extension for Jupyter mode.\n3. Open Folder to edit and save (Ctrl+S) local files directly."
    },
    {
      id: "code-editor",
      title: "WEB IDE",
      desc: "HTML/CSS/JS Live Preview",
      icon: <Monitor size={32} />,
      color: "bg-blue-600",
      textColor: "text-white",
      iconColor: "text-white",
      link: "/tools/code-editor",
      guide: "How to use Web IDE:\n1. Codes reflect instantly in preview.\n2. Support HTML, CSS, and JS files.\n3. Click 'LIVE' to open preview in a new window."
    },
    {
      id: "task-manager",
      title: "TASK MANAGER",
      desc: "Calendar-based Task Tracking",
      icon: <CheckSquare size={32} />,
      color: "bg-white",
      textColor: "text-zinc-950",
      iconColor: "text-blue-600",
      link: "/tools/task-manager",
      guide: "How to use Task Manager:\n1. Click calendar days to add tasks.\n2. Use 'Repeat' to add multiple occurrences at once.\n3. Drag and drop tasks to change dates."
    },
    {
      id: "forenote",
      title: "FORENOTE PRO",
      desc: "Infinite Canvas & Handwriting",
      icon: <PenTool size={32} />,
      color: "bg-zinc-100",
      textColor: "text-zinc-950",
      iconColor: "text-zinc-950",
      link: "/tools/forenote",
      guide: "How to use Forenote Pro:\n1. Write freely using pen and shapes.\n2. Use Lasso tool to move or resize objects.\n3. Everything is auto-saved to your browser."
    }, // 🌟 ←ここもです！
    {
      id: "image-upscaler",
      title: "IMAGE UPSCALER",
      desc: "Enhance & 4K Upscaling",
      icon: <ImageIcon size={32} />,
      color: "bg-emerald-500",
      textColor: "text-white",
      iconColor: "text-white",
      link: "/tools/image-upscaler",
      guide: "How to use Image Upscaler:\n1. Drag and drop an image.\n2. Select 2x or 4x scale. High-quality interpolation will be applied.\n3. Adjust sharpness and download."
    }
  ]
};

export default function ToolsPage() {
  const [lang, setLang] = useState<"jp" | "en">("jp");
  const [mounted, setMounted] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setLang((localStorage.getItem("app_lang") as "jp" | "en") || "jp");
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 max-w-6xl mx-auto bg-white font-sans">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-5xl font-black text-zinc-950 tracking-tighter uppercase">
          {lang === "jp" ? "ツール." : "Tools."}
        </h1>
        <p className="mt-2 text-zinc-500 font-bold tracking-widest text-sm">
          {lang === "jp" ? "ブラウザで完結するプロフェッショナル開発環境" : "Professional environments directly in your browser."}
        </p>
        <div className="h-1.5 w-20 bg-blue-600 mt-6" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {toolsData[lang].map((tool) => (
          <div key={tool.id} className="relative group">
            {/* ツールへのリンク */}
            <Link href={tool.link} className="block outline-none">
              <motion.div 
                whileHover={{ y: -5 }} 
                className={`h-[280px] ${tool.color} ${tool.textColor} p-10 flex flex-col justify-between rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all border border-zinc-100 hover:shadow-2xl`}
              >
                <div className={tool.iconColor}>{tool.icon}</div>
                <div>
                  <h2 className="text-3xl font-black uppercase leading-tight mb-2">{tool.title}</h2>
                  <p className="opacity-60 font-bold text-sm tracking-wide">{tool.desc}</p>
                </div>
              </motion.div>
            </Link>

            {/* 使い方ボタン */}
            <button 
              onClick={() => setSelectedGuide(tool.guide)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-current hover:bg-white hover:text-black transition-all z-20 shadow-lg"
              title="使い方を見る"
            >
              <Info size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* 使い方ポップアップ (Modal) */}
      <AnimatePresence>
        {selectedGuide && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGuide(null)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white text-zinc-950 p-8 md:p-12 rounded-[3rem] shadow-2xl max-w-lg w-full border border-zinc-200"
            >
              <button 
                onClick={() => setSelectedGuide(null)}
                className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <Info className="text-blue-600" />
                {lang === "jp" ? "使い方ガイド" : "How to Use"}
              </h3>
              <div className="text-zinc-600 leading-relaxed whitespace-pre-wrap font-medium">
                {selectedGuide}
              </div>
              <button 
                onClick={() => setSelectedGuide(null)}
                className="mt-8 w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-colors"
              >
                {lang === "jp" ? "わかった！" : "Got it"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-20 text-center text-zinc-400">
        <p className="text-[10px] tracking-[0.4em] font-bold uppercase">© 2026 KAISEI HUB.</p>
      </footer>
    </div>
  );
}
