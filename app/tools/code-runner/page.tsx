"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Trash2, Terminal, ArrowLeft, FileCode, Folder, ChevronDown, Plus, X, LayoutPanelBottom } from "lucide-react";
import Link from "next/link";

type FileItem = { id: string; name: string; content: string; type: 'file' };

export default function SublimeRunner() {
  // ビルドエラー防止のためのマウントチェック
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [files, setFiles] = useState<FileItem[]>([
    { id: '1', name: 'main.js', type: 'file', content: 'console.log("Sublime Runner Ready.");\n\nconst greet = (name) => {\n  console.log("Hello, " + name + "!");\n};\n\ngreet("Developer");' },
    { id: '2', name: 'script.js', type: 'file', content: 'console.log("Another file active.");' },
  ]);
  
  const [activeFileId, setActiveFileId] = useState('1');
  const [logs, setLogs] = useState<{ type: string; content: string }[]>([]);
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);

  const activeFile = useMemo(() => files.find(f => f.id === activeFileId), [files, activeFileId]);

  const updateContent = (newContent: string) => {
    setFiles(files.map(f => f.id === activeFileId ? { ...f, content: newContent } : f));
  };

  const runCode = () => {
    if (typeof window === 'undefined' || !activeFile) return;
    if (!isConsoleOpen) setIsConsoleOpen(true);
    setLogs([]);

    const handleMessage = (e: MessageEvent) => {
      if (e.data && ['log', 'error', 'warn'].includes(e.data.type)) {
        setLogs(prev => [...prev, { type: e.data.type, content: e.data.content }]);
      }
    };

    window.addEventListener("message", handleMessage);

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(`<script>
        const console = {
          log: (...args) => window.parent.postMessage({ type: 'log', content: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*'),
          error: (...args) => window.parent.postMessage({ type: 'error', content: args.map(String).join(' ') }, '*'),
          warn: (...args) => window.parent.postMessage({ type: 'warn', content: args.map(String).join(' ') }, '*')
        };
        try { 
          ${activeFile.content} 
        } catch (err) { 
          console.error(err.message); 
        }
      <\/script>`);
      doc.close();
    }
    
    setTimeout(() => { 
      document.body.removeChild(iframe); 
      window.removeEventListener("message", handleMessage); 
    }, 200);
  };

  // ビルド時は何も表示しない（ブラウザのみで描画）
  if (!mounted) return <div className="bg-white min-h-screen" />;

  return (
    <div className="h-screen flex flex-col bg-white text-zinc-950 font-sans selection:bg-blue-100">
      {/* ツールバー */}
      <div className="h-12 border-b border-zinc-200 flex items-center justify-between px-4 bg-[#f3f3f3]">
        <div className="flex items-center gap-4">
          <Link href="/tools" className="hover:bg-zinc-200 p-1 rounded transition-colors text-zinc-600"><ArrowLeft size={18} /></Link>
          <span className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase">Sublime Editor / JS Runner</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsConsoleOpen(!isConsoleOpen)} 
            className={`p-1.5 rounded transition-colors ${isConsoleOpen ? 'text-blue-600 bg-blue-50' : 'text-zinc-500 hover:bg-zinc-200'}`}
          >
            <LayoutPanelBottom size={18} />
          </button>
          <div className="w-[1px] h-4 bg-zinc-300 mx-1" />
          <button onClick={runCode} className="flex items-center gap-2 bg-[#444] text-white px-4 py-1 rounded text-xs font-bold hover:bg-zinc-900 transition-all active:scale-95 shadow-sm">
            <Play size={10} fill="currentColor" /> RUN
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* サイドバー */}
        <div className="w-52 border-r border-zinc-200 bg-[#f8f8f8] flex flex-col select-none">
          <div className="p-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex justify-between items-center">
            Folders <Plus size={12} className="cursor-pointer" />
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="flex items-center gap-2 px-3 py-1 text-zinc-900 text-sm font-bold">
              <ChevronDown size={14} /> <Folder size={14} className="text-zinc-400" /> project_v1
            </div>
            {files.map(file => (
              <div 
                key={file.id} 
                onClick={() => setActiveFileId(file.id)}
                className={`flex items-center gap-2 ml-7 px-3 py-1.5 cursor-pointer text-sm transition-colors ${activeFileId === file.id ? 'bg-[#e4e4e4] text-black font-bold' : 'text-zinc-600 hover:bg-[#ececec]'}`}
              >
                <FileCode size={14} /> {file.name}
              </div>
            ))}
          </div>
        </div>

        {/* メインエリア */}
        <div className="flex-1 flex flex-col relative bg-white">
          {/* タブバー */}
          <div className="h-9 bg-[#e0e0e0] flex items-center">
            {activeFile && (
              <div className="h-full px-4 flex items-center gap-3 bg-white border-t-2 border-t-blue-500 text-[11px] text-black font-bold relative">
                {activeFile.name} <X size={10} className="text-zinc-400 hover:text-red-500 cursor-pointer" />
              </div>
            )}
          </div>
          
          {/* エディタ */}
          <div className="flex-1 relative">
            <textarea
              value={activeFile?.content || ''}
              onChange={(e) => updateContent(e.target.value)}
              className="absolute inset-0 w-full h-full p-6 font-mono text-[14px] outline-none text-black leading-relaxed resize-none bg-white"
              spellCheck={false}
              autoFocus
            />
          </div>

          {/* 開閉式コンソール */}
          <AnimatePresence>
            {isConsoleOpen && (
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: 180 }}
                exit={{ height: 0 }}
                className="border-t-2 border-zinc-300 bg-white flex flex-col overflow-hidden"
              >
                <div className="h-8 bg-[#f3f3f3] border-b border-zinc-200 px-4 flex items-center justify-between">
                  <span className="text-[10px] font-black text-zinc-500 tracking-[0.1em] flex items-center gap-2">
                    <Terminal size={12} /> CONSOLE
                  </span>
                  <button onClick={() => setLogs([])} className="text-zinc-400 hover:text-black">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 font-mono text-[12px] bg-white text-black space-y-1">
                  {logs.length === 0 && <div className="text-zinc-300 italic">No output...</div>}
                  {logs.map((log, i) => (
                    <div key={i} className={`flex gap-3 ${log.type === 'error' ? 'text-red-600 font-bold' : log.type === 'warn' ? 'text-yellow-600' : 'text-black'}`}>
                      <span className="opacity-20 w-4 text-right">{i + 1}</span>
                      <span className="whitespace-pre-wrap">{log.type === 'error' ? '✘' : log.type === 'warn' ? '⚠' : '›'} {log.content}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
