"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PenTool, Terminal, Monitor, CheckSquare, Info, X, Image as ImageIcon, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

// ツールのデータ定義
const toolsData = {
  jp: [
    {
      id: "python-editor",
      title: "Python エディタ",
      subtitle: "PYTHON IDE",
      desc: "データ分析やローカルファイル操作に完全対応したPython実行環境。",
      icon: <Terminal size={24} strokeWidth={1.5} />,
      glow: "from-emerald-400/20 to-transparent",
      textGlow: "group-hover:text-emerald-500",
      link: "/tools/python-editor",
      guide: "【Pythonエディタの使い方】\n1. 「実行」ボタンでコードを動かせます。\n2. .ipynb拡張子を使えばJupyterモード（自動画面クリア）になります。\n3. 「フォルダを開く」でChromebook内の実際のファイルを直接編集・保存（Ctrl+S）できます。"
    },
    {
      id: "code-editor",
      title: "Web エディタ",
      subtitle: "WEB EDITOR",
      desc: "HTML / CSS / JS のリアルタイムプレビューを搭載した開発ツール。",
      icon: <Monitor size={24} strokeWidth={1.5} />,
      glow: "from-blue-400/20 to-transparent",
      textGlow: "group-hover:text-blue-500",
      link: "/tools/code-editor",
      guide: "【Webエディタの使い方】\n1. 左側のエディタでコードを書くと、LIVEプレビューに即座に反映されます。\n2. 複数のファイルを切り替えて開発できます。\n3. 「LIVE」ボタンを押すと、別ウィンドウで全画面プレビューが開きます。"
    },
    {
      id: "task-manager",
      title: "課題管理カレンダー",
      subtitle: "TASK MANAGER",
      desc: "開成の膨大な課題を、カレンダー上で戦略的かつ直感的に管理する。",
      icon: <CheckSquare size={24} strokeWidth={1.5} />,
      glow: "from-indigo-400/20 to-transparent",
      textGlow: "group-hover:text-indigo-500",
      link: "/tools/task-manager",
      guide: "【課題管理の使い方】\n1. カレンダーの日付をクリックして課題を登録します。\n2. 「全◯回」を設定すると、毎週や数日おきの課題を一括登録できます。\n3. 登録した課題を長押しして別の日にドラッグ＆ドロップで移動できます。"
    },
    {
      id: "forenote",
      title: "高機能手書きノート",
      subtitle: "FORENOTE PRO",
      desc: "無限のキャンバスと高度な手書き機能を備えたプロフェッショナルノート。",
      icon: <PenTool size={24} strokeWidth={1.5} />,
      glow: "from-zinc-400/20 to-transparent",
      textGlow: "group-hover:text-zinc-700",
      link: "/tools/forenote",
      guide: "【Forenote Proの使い方】\n1. 画面上のツールからペンや図形を選んで手書きできます。\n2. なげなわツールで書いたものを選択・移動・変形できます。\n3. データは自動的にブラウザに保存され、次回起動時も続きから描けます。"
    },
    {
      id: "image-upscaler",
      title: "画像高画質化ツール",
      subtitle: "IMAGE UPSCALER",
      desc: "ブラウザの限界を引き出し、画像を4K解像度へアップスケールする。",
      icon: <ImageIcon size={24} strokeWidth={1.5} />,
      glow: "from-teal-400/20 to-transparent",
      textGlow: "group-hover:text-teal-500",
      link: "/tools/image-upscaler",
      guide: "【画像高画質化ツールの使い方】\n1. 画像をドラッグ＆ドロップで読み込みます。\n2. 2倍や4倍を選択すると、内部で最高精度の補間計算が行われます。\n3. シャープネス（くっきり感）や彩度を調整し、保存ボタンでダウンロードできます。"
    }
  ],
  en: [
    {
      id: "python-editor",
      title: "Python IDE",
      subtitle: "Python Editor",
      desc: "Python execution environment with full support for data analysis and local files.",
      icon: <Terminal size={24} strokeWidth={1.5} />,
      glow: "from-emerald-400/20 to-transparent",
      textGlow: "group-hover:text-emerald-500",
      link: "/tools/python-editor",
      guide: "How to use Python IDE:\n1. Click 'RUN' to execute code.\n2. Use .ipynb extension for Jupyter mode.\n3. Open Folder to edit and save local files directly."
    },
    {
      id: "code-editor",
      title: "Web Editor",
      subtitle: "HTML / CSS / JS",
      desc: "Development tool featuring real-time preview of HTML, CSS, and JavaScript.",
      icon: <Monitor size={24} strokeWidth={1.5} />,
      glow: "from-blue-400/20 to-transparent",
      textGlow: "group-hover:text-blue-500",
      link: "/tools/code-editor",
      guide: "How to use Web Editor:\n1. Codes reflect instantly in preview.\n2. Switch between multiple files easily.\n3. Click 'LIVE' to open full-screen preview."
    },
    {
      id: "task-manager",
      title: "Task Manager",
      subtitle: "Calendar & Tasks",
      desc: "Manage massive workloads strategically and intuitively on a calendar.",
      icon: <CheckSquare size={24} strokeWidth={1.5} />,
      glow: "from-indigo-400/20 to-transparent",
      textGlow: "group-hover:text-indigo-500",
      link: "/tools/task-manager",
      guide: "How to use Task Manager:\n1. Click dates to add tasks.\n2. Use 'Repeat' for recurring assignments.\n3. Drag & drop tasks to reschedule."
    },
    {
      id: "forenote",
      title: "Forenote Pro",
      subtitle: "Digital Notebook",
      desc: "Professional notebook with infinite canvas and advanced handwriting tools.",
      icon: <PenTool size={24} strokeWidth={1.5} />,
      glow: "from-zinc-400/20 to-transparent",
      textGlow: "group-hover:text-zinc-700",
      link: "/tools/forenote",
      guide: "How to use Forenote Pro:\n1. Write freely with various tools.\n2. Use Lasso to move or resize.\n3. Everything auto-saves to your browser."
    },
    {
      id: "image-upscaler",
      title: "Image Upscaler",
      subtitle: "AI-style Enhance",
      desc: "Pushing browser limits to upscale images to 4K resolution.",
      icon: <ImageIcon size={24} strokeWidth={1.5} />,
      glow: "from-teal-400/20 to-transparent",
      textGlow: "group-hover:text-teal-500",
      link: "/tools/image-upscaler",
      guide: "How to use Upscaler:\n1. Drag & drop an image.\n2. Select scale (e.g., 2x or 4x).\n3. Adjust sharpness and download."
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
    // 🌟 修正ポイント１：ここが「画面全体の背景」になります。端から端まで色を塗ります。
    <div className="min-h-screen w-full bg-[#fafafa] dark:bg-[#0a0a0a] transition-colors duration-300 font-sans">
      
      {/* 🌟 修正ポイント２：ここで「中身」だけを真ん中に寄せ、幅を最大1200pxに制限します。 */}
      <div className="pt-40 pb-24 px-6 max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="mb-24 text-center">
          <h1 className="text-6xl md:text-8xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase mb-4 transition-colors">
            Tools.
          </h1>
          <p className="text-zinc-400 dark:text-zinc-500 font-bold tracking-[0.2em] text-xs md:text-sm uppercase transition-colors">
            {lang === "jp" ? "ブラウザで完結するプロフェッショナル環境" : "Professional environments in your browser"}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {toolsData[lang].map((tool) => (
            <div key={tool.id} className="relative group">
              
              <Link href={tool.link} className="block outline-none h-full">
                <div className="relative h-[260px] bg-white dark:bg-[#111] border border-zinc-200/80 dark:border-zinc-800/80 rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_rgba(255,255,255,0.02)] hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-500 z-10">
                  
                  {/* 背景の発光エフェクト */}
                  <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${tool.glow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                  {/* アイコン */}
                  <div className="flex justify-between items-start z-10 relative">
                    <div className={`w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 transition-colors duration-300 ${tool.textGlow}`}>
                      {tool.icon}
                    </div>
                  </div>

                  {/* テキスト */}
                  <div className="z-10 relative">
                    <p className="text-[10px] font-black tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-2 uppercase transition-colors">{tool.subtitle}</p>
                    <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-2 transition-colors">{tool.title}</h2>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2 transition-colors">{tool.desc}</p>
                  </div>
                  
                  {/* ホバー矢印 */}
                  <div className="absolute bottom-8 right-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-white">
                    <ArrowUpRight size={24} strokeWidth={2} />
                  </div>
                </div>
              </Link>

              {/* 使い方ボタン */}
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedGuide(tool.guide); }}
                className="absolute top-8 right-8 w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all z-20 shadow-sm"
                title="使い方"
              >
                <Info size={16} />
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
                className="absolute inset-0 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-md"
              />
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-lg w-full border border-zinc-200 dark:border-zinc-800 transition-colors"
              >
                <button 
                  onClick={() => setSelectedGuide(null)}
                  className="absolute top-6 right-6 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                >
                  <X size={20} />
                </button>
                <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white transition-colors">
                    <Info size={16} />
                  </div>
                  {lang === "jp" ? "使い方ガイド" : "Quick Guide"}
                </h3>
                <div className="text-zinc-600 dark:text-zinc-400 leading-loose text-sm font-medium whitespace-pre-wrap transition-colors">
                  {selectedGuide}
                </div>
                <button 
                  onClick={() => setSelectedGuide(null)}
                  className="mt-10 w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg"
                >
                  {lang === "jp" ? "理解しました" : "Got it"}
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
