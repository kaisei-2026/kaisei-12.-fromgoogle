"use client";

import React, { useState, useEffect } from "react";
import { Play, Trash2, Terminal, ArrowLeft, FileCode, Folder, ChevronDown, X, LayoutPanelBottom } from "lucide-react";
import Link from "next/link";

// 1. ファイルデータの型定義
type FileItem = { id: string; name: string; content: string };

export default function SublimeRunner() {
  // 2. ブラウザのみで実行するためのマウント状態管理
  const [mounted, setMounted] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([
    { id: '1', name: 'main.js', content: 'console.log("Sublime Runner Ready.");\n\nconst greet = (name) => {\n  console.log("Hello, " + name + "!");\n};\n\ngreet("Developer");' },
    { id: '2', name: 'test.js', content: 'console.log("Debug started...");' },
  ]);
  const [activeFileId, setActiveFileId] = useState('1');
  const [logs, setLogs] = useState<{ type: string; content: string }[]>([]);
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);

  // マウント完了時に実行
  useEffect(() => {
    setMounted(true);
  }, []);

  // 現在のファイルを取得
  const activeFile = files.find(f => f.id === activeFileId) || files[0];

  // コードの更新
  const updateContent = (val: string) => {
    setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, content: val } : f));
  };

  // 3. コードの実行処理（iframeを使用）
  const runCode = () => {
    if (typeof window === 'undefined') return;
    setIsConsoleOpen(true);
    setLogs([]);

    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type && ['log', 'error', 'warn'].includes(e.data.type)) {
        setLogs(prev => [...prev, { type: e.data.type, content: String(e.data.content) }]);
      }
    };

    window.addEventListener("message", handleMessage);

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow?.document;
    
    if (doc) {
      doc.open();
      doc.write(`
        <script>
          const customConsole = {
            log: (...args) => window.parent.postMessage({ type: 'log', content: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*'),
            error: (...args) => window.parent.postMessage({ type: 'error', content: args.map(String).join(' ') }, '*'),
            warn: (...args) => window.parent.postMessage({ type: 'warn', content: args.map(String).join(' ') }, '*')
          };
          try {
            const console = customConsole;
            ${activeFile.content}
          } catch (err) {
            window.parent.postMessage({ type: 'error', content: err.message }, '*');
          }
        <\/script>
      `);
      doc.close();
    }
    
    setTimeout(() => {
      document.body.removeChild(iframe);
      window.removeEventListener("message", handleMessage);
    }, 300);
  };

  // 4. マウントされるまで何も表示しない（エラー防止の最重要ポイント）
  if (!mounted) return null;

  return (
    <div className="h-screen flex flex-col bg-white text-black font-sans selection:bg-blue-100">
      {/* ツールバー */}
      <div className="h-10 border-b border-zinc-200 flex items-center justify-between px-3 bg-[#f3f3f3]">
        <div className="flex items-center gap-3">
          <Link href="/tools" className="hover:bg-zinc-200 p-1 rounded transition-colors text-zinc-500">
            <ArrowLeft size={16} />
          </Link>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Sublime Text v1.0</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsConsoleOpen(!isConsoleOpen)} className={`p-1 rounded ${isConsoleOpen ? 'text-blue-600 bg-blue-50' : 'text-zinc-400 hover:bg-zinc-200'}`}>
            <LayoutPanelBottom size={16} />
          </button>
          <div className="w-[1px] h-3 bg-zinc-300 mx-1" />
          <button onClick={runCode} className="flex items-center gap-1.5 bg-[#444] text-white px-3 py-1 rounded text-[10px] font-bold hover:bg-black transition-all active:scale-95 shadow-sm">
            <Play size={10} fill="currentColor" /> RUN
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* サイドバー */}
        <div className="w-48 border-r border-zinc-200 bg-[#f8f8f8] flex flex-col select-none">
          <div className="p-2 text-[9px] font-bold text-zinc-400 uppercase tracking-widest flex justify-between items-center">
            Folders
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="flex items-center gap-2 px-2 py-1 text-black text-xs font-bold">
              <ChevronDown size={12} /> <Folder size={12} className="text-zinc-400" /> project
            </div>
            {files.map(file => (
              <div 
                key={file.id} 
                onClick={() => setActiveFileId(file.id)}
                className={`flex items-center gap-2 ml-6 px-2 py-1 cursor-pointer text-xs transition-colors ${activeFileId === file.id ? 'bg-[#e4e4e4] text-black font-bold' : 'text-zinc-500 hover:bg-[#ececec]'}`}
              >
                <FileCode size={12} /> {file.name}
              </div>
            ))}
          </div>
        </div>

        {/* メインエディタエリア */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
          <div className="h-8 bg-[#e0e0e0] flex items-center border-b border-zinc-200">
            <div className="h-full px-3 flex items-center gap-2 bg-white border-t-2 border-t-blue-500 text-[10px] text-black font-bold">
              {activeFile.name} <X size={10} className="text-zinc-400" />
            </div>
          </div>
          
          <div className="flex-1 relative overflow-hidden">
            <textarea
              value={activeFile.content}
              onChange={(e) => updateContent(e.target.value)}
              className="absolute inset-0 w-full h-full p-4 font-mono text-[13px] outline-none text-black leading-relaxed resize-none bg-white"
              spellCheck={false}
              placeholder="Code here..."
            />
          </div>

          {/* コンソール */}
          {isConsoleOpen && (
            <div className="border-t-2 border-zinc-200 h-40 bg-white flex flex-col shrink-0">
              <div className="h-7 bg-[#f3f3f3] border-b border-zinc-200 px-3 flex items-center justify-between shadow-sm">
                <span className="text-[9px] font-bold text-zinc-500 tracking-widest flex items-center gap-1.5 uppercase">
                  <Terminal size={10} /> Console Output
                </span>
                <button onClick={() => setLogs([])} className="text-zinc-400 hover:text-black">
                  <Trash2 size={12} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3 font-mono text-[11px] bg-white text-black space-y-1">
                {logs.length === 0 && <div className="text-zinc-300 italic">No output...</div>}
                {logs.map((log, i) => (
                  <div key={i} className={`flex gap-3 ${log.type === 'error' ? 'text-red-600 font-bold' : log.type === 'warn' ? 'text-yellow-600' : 'text-black'}`}>
                    <span className="opacity-20 w-4 text-right select-none">{i + 1}</span>
                    <span className="whitespace-pre-wrap">{log.content}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
