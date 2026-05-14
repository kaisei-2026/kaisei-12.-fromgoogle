"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Trash2, Terminal, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CodeRunner() {
  const [code, setCode] = useState(`// JSを入力して Run Code を押してね\nconsole.log("Hello, World!");\nconsole.warn("これは警告ログです");\nconsole.error("これはエラーログです");\n\nconst test = [1, 2, 3];\nconsole.log("配列の表示:", test);`);
  const [logs, setLogs] = useState<{ type: string; content: string }[]>([]);

  const runCode = () => {
    setLogs([]); 
    const handleMessage = (event: MessageEvent) => {
      if (['log', 'error', 'warn'].includes(event.data.type)) {
        setLogs(prev => [...prev, { type: event.data.type, content: event.data.content }]);
      }
    };
    window.addEventListener("message", handleMessage);

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const workerCode = `
      const customConsole = {
        log: (...args) => window.parent.postMessage({ type: 'log', content: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*'),
        error: (...args) => window.parent.postMessage({ type: 'error', content: args.map(String).join(' ') }, '*'),
        warn: (...args) => window.parent.postMessage({ type: 'warn', content: args.map(String).join(' ') }, '*')
      };
      try {
        const console = customConsole;
        ${code}
      } catch (err) {
        console.error(err.message);
      }
    `;

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(`<script>${workerCode}<\/script>`);
      doc.close();
    }

    setTimeout(() => {
      document.body.removeChild(iframe);
      window.removeEventListener("message", handleMessage);
    }, 100);
  };

  return (
    <div className="min-h-screen pt-32 px-6 pb-10 max-w-6xl mx-auto flex flex-col h-screen">
      <div className="flex justify-between items-center mb-6">
        <Link href="/tools" className="flex items-center text-sm text-zinc-500 hover:text-white transition-colors uppercase font-bold tracking-widest">
          <ArrowLeft size={16} className="mr-2" /> Back to Hub
        </Link>
        <div className="flex gap-4">
          <button onClick={() => setLogs([])} className="p-3 text-zinc-500 hover:text-red-400 transition-colors">
            <Trash2 size={20} />
          </button>
          <button onClick={runCode} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-black shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all flex items-center">
            <Play size={18} className="mr-2" /> RUN CODE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-hidden mb-10">
        <div className="rounded-3xl border border-white/10 bg-zinc-900/50 flex flex-col overflow-hidden">
          <div className="bg-white/5 px-6 py-2 border-b border-white/5 text-[10px] font-mono tracking-widest text-zinc-500">EDITOR.JS</div>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} className="flex-1 p-6 bg-transparent font-mono text-blue-300 outline-none resize-none" spellCheck={false} />
        </div>
        <div className="rounded-3xl border border-white/10 bg-black flex flex-col overflow-hidden shadow-inner">
          <div className="bg-zinc-900/80 px-6 py-2 border-b border-white/5 text-[10px] font-mono tracking-widest text-emerald-500 flex items-center">
            <Terminal size={12} className="mr-2" /> CONSOLE_OUTPUT
          </div>
          <div className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-2">
            {logs.map((log, i) => (
              <div key={i} className={`flex gap-3 ${log.type === 'error' ? 'text-red-400' : log.type === 'warn' ? 'text-yellow-400' : 'text-emerald-400'}`}>
                <span className="text-zinc-800">{i+1}</span>
                <span>{log.type === 'error' ? '✘' : log.type === 'warn' ? '⚠' : '›'} {log.content}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
