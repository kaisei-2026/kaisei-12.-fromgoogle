"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Trash2, Terminal, ArrowLeft, FileCode, Folder, ChevronDown, Plus, X, LayoutPanelBottom } from "lucide-react";
import Link from "next/link";

type FileItem = { id: string; name: string; content: string; type: 'file' };

export default function SublimeRunner() {
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
    if (!activeFile) return;
    if (!isConsoleOpen) setIsConsoleOpen(true);
    setLogs([]);
    const handleMessage = (e: MessageEvent) => {
      if (['log', 'error', 'warn'].includes(e.data.type)) {
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
        try { ${activeFile.content} } catch (err) { console.error(err.message); }
      <\/script>`);
      doc.close();
    }
    setTimeout(() => { document.body.removeChild(iframe); window.removeEventListener("message", handleMessage); }, 100);
  };

  return (
    <div className="h-screen flex flex-col bg-white text-zinc-950 font-sans">
      {/* ツールバー */}
      <div className="h-12 border-b border-zinc-200 flex items-center justify-between px-4 bg-zinc-50">
        <div className="flex items-center gap-4">
          <Link href="/tools" className="hover:bg-zinc-200 p-1 rounded transition-colors"><ArrowLeft size={18} /></Link>
          <span className="text-[11px] font-black tracking-[0.2em] text-zinc-400 uppercase">Sublime Editor v1</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsConsoleOpen(!isConsoleOpen)} 
            className={`p-2 rounded transition-colors ${isConsoleOpen ? 'text-blue-600 bg-blue-50' : 'text-zinc-400 hover:bg-zinc-200'}`}
            title="Toggle Console"
          >
            <LayoutPanelBottom size={18} />
          </button>
          <div className="w-[1px] h-4 bg-zinc-300 mx-1" />
          <button onClick={runCode} className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-1 rounded text-xs font-bold hover:bg-zinc-700 transition-all active:scale-95 shadow-md">
            <Play size={12} fill="currentColor" /> RUN
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* サイドバー */}
        <div className="w-56 border-r border-zinc-200 bg-[#f8f8f8] flex flex-col select-none">
          <div className="p-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex justify-between items-center">
            Folders <Plus size={12} />
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="flex items-center gap-2 px-3 py-1 text-zinc-800 text-sm font-medium">
              <ChevronDown size={14} /> <Folder size={14} className="text-zinc-400" /> project
            </div>
            {files.map(file => (
              <div 
                key={file.id} 
                onClick={() => setActiveFileId(file.id)}
                className={`flex items-center gap-2 ml-7 px-3 py-1.5 cursor-pointer text-sm transition-colors ${activeFileId === file.id ? 'bg-zinc-200 text-zinc-950 font-semibold' : 'text-zinc-500 hover:bg-zinc-100'}`}
              >
                <FileCode size={14} /> {file.name}
              </div>
            ))}
          </div>
        </div>

        {/* エディタとコンソールの縦並びエリア */}
        <div className="flex-1 flex flex-col relative">
          {/* タブ */}
          <div className="h-9 bg-[#ebebeb] flex items-center border-b border-zinc-200">
            {activeFile && (
              <div className="h-full px-4 flex items-center gap-3 bg-white border-r border-zinc-200 text-[11px] text-zinc-800 font-medium relative top-[1px]">
                {activeFile.name} <X size={10} className="text-zinc-400 hover:text-red-500" />
              </div>
            )}
          </div>
          
          {/* コード入力 */}
          <div className="flex-1 relative bg-white">
            <textarea
              value={activeFile?.content || ''}
              onChange={(e) => updateContent(e.target.value)}
              className="absolute inset-0 w-full h-full p-6 font-mono text-[13px] outline-none text-zinc-900 leading-relaxed resize-none"
              spellCheck={false}
            />
          </div>

          {/* コンソール (切り替え可能) */}
          <AnimatePresence>
            {isConsoleOpen && (
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: 200 }}
                exit={{ height: 0 }}
                className="border-t border-zinc-300 bg-white flex flex-col overflow-hidden"
              >
                <div className="h-8 bg-zinc-50 border-b border-zinc-200 px-4 flex items-center justify-between shadow-sm">
                  <span className="text-[10px] font-bold text-zinc-500 tracking-widest flex items-center gap-2">
                    <Terminal size={12} /> CONSOLE OUTPUT
                  </span>
                  <button onClick={() => setLogs([])} className="text-zinc-400 hover:text-zinc-800 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 font-mono text-[12px] bg-white text-zinc-800 space-y-1">
                  {logs.length === 0 && <div className="text-zinc-300 italic">No output...</div>}
                  {logs.map((log, i) => (
                    <div key={i} className={`flex gap-3 ${log.type === 'error' ? 'text-red-600 font-bold' : log.type === 'warn' ? 'text-yellow-600' : 'text-zinc-600'}`}>
                      <span className="opacity-30 w-4 inline-block text-right">{i + 1}</span>
                      <span>{log.type === 'error' ? '✖' : log.type === 'warn' ? '⚠' : '›'} {log.content}</span>
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
