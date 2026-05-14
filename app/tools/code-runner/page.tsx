"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Trash2, Terminal, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CodeRunner() {
  const [code, setCode] = useState(`// JavaScriptを入力して実行してください\nconst message = "Hello, Chromebook!";\nconsole.log(message);\n\nfor(let i=1; i<=3; i++) {\n  console.log("Count:", i);\n}`);
  const [logs, setLogs] = useState<{ type: string; content: string }[]>([]);
  const [editorHeight, setEditorHeight] = useState(300);

  // コンソール出力を乗っ取る関数
  const runCode = () => {
    setLogs([]); // ログをクリア
    
    const customLogs: { type: string; content: string }[] = [];
    
    // iframe内で安全に実行するための仕組み
    const workerCode = `
      const logs = [];
      const customConsole = {
        log: (...args) => {
          window.parent.postMessage({ type: 'log', content: args.map(String).join(' ') }, '*');
        },
        error: (...args) => {
          window.parent.postMessage({ type: 'error', content: args.map(String).join(' ') }, '*');
        },
        warn: (...args) => {
          window.parent.postMessage({ type: 'warn', content: args.map(String).join(' ') }, '*');
        }
      };
      
      try {
        const console = customConsole;
        ${code}
      } catch (err) {
        console.error(err.message);
      }
    `;

    // 実行用の一時的なiframeを作成
    const script = document.createElement("script");
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'log' || event.data.type === 'error' || event.data.type === 'warn') {
        setLogs(prev => [...prev, { type: event.data.type, content: event.data.content }]);
      }
    };

    window.addEventListener("message", handleMessage);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(`<script>${workerCode}<\/script>`);
      doc.close();
    }

    // 実行が終わったら後片付け
    setTimeout(() => {
      document.body.removeChild(iframe);
      window.removeEventListener("message", handleMessage);
    }, 100);
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-6 bg-[#030303] text-zinc-100 flex flex-col max-w-6xl mx-auto">
      {/* ヘッダー */}
      <div className="flex justify-between items-center mb-6">
        <Link href="/tools" className="flex items-center text-sm text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Tools
        </Link>
        <div className="flex gap-4">
          <button 
            onClick={() => setLogs([])}
            className="flex items-center px-4 py-2 text-sm font-bold text-zinc-400 hover:text-white transition-all"
          >
            <Trash2 size={16} className="mr-2" /> Clear Logs
          </button>
          <button 
            onClick={runCode}
            className="flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
          >
            <Play size={16} className="mr-2" /> Run Code
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 h-[70vh]">
        {/* エディタエリア */}
        <div className="flex flex-col rounded-3xl border border-white/10 bg-zinc-900/50 overflow-hidden shadow-2xl">
          <div className="px-6 py-3 border-b border-white/5 bg-white/5 flex items-center">
            <div className="flex gap-1.5 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">script.js</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-6 bg-transparent font-mono text-sm resize-none focus:outline-none text-blue-300"
            spellCheck={false}
          />
        </div>

        {/* コンソール（ログ）エリア */}
        <div className="flex flex-col rounded-3xl border border-white/10 bg-black overflow-hidden shadow-2xl">
          <div className="px-6 py-3 border-b border-white/5 bg-zinc-900/50 flex items-center justify-between">
            <span className="flex items-center text-xs font-mono text-blue-400 uppercase tracking-widest">
              <Terminal size={14} className="mr-2" /> Output Console
            </span>
            <span className="text-[10px] text-zinc-600 font-mono">STDOUT</span>
          </div>
          <div className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-2">
            {logs.length === 0 && (
              <span className="text-zinc-700 italic">No output yet. Run your code to see logs...</span>
            )}
            {logs.map((log, i) => (
              <div key={i} className={`flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300`}>
                <span className="text-zinc-700 select-none">{i + 1}</span>
                <span className={
                  log.type === 'error' ? 'text-red-400' : 
                  log.type === 'warn' ? 'text-yellow-400' : 'text-zinc-300'
                }>
                  {log.type === 'error' ? '✖ ' : log.type === 'warn' ? '⚠ ' : '> '}
                  {log.content}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
