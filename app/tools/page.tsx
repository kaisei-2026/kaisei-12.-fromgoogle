"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Trash2, Terminal, ArrowLeft, FileCode, Folder, ChevronRight, ChevronDown, Plus, X } from "lucide-react";
import Link from "next/link";

// 仮想ファイルシステム
type FileItem = { id: string; name: string; content: string; type: 'file' };
type FolderItem = { id: string; name: string; type: 'folder'; children: (FileItem | FolderItem)[] };

export default function SublimeRunner() {
  const [files, setFiles] = useState<(FileItem | FolderItem)[]>([
    {
      id: 'root',
      name: 'Project',
      type: 'folder',
      children: [
        { id: '1', name: 'main.js', type: 'file', content: 'console.log("Sublime Runner Ready.");\n\nconst greet = (name) => {\n  console.log("Hello, " + name + "!");\n};\n\ngreet("Chromebook User");' },
        { id: '2', name: 'utils.js', type: 'file', content: 'console.log("Utils loaded.");' },
      ]
    }
  ]);
  
  const [activeFileId, setActiveFileId] = useState('1');
  const [logs, setLogs] = useState<{ type: string; content: string }[]>([]);

  // 現在開いているファイルを探す
  const findFile = (items: any[], id: string): FileItem | null => {
    for (const item of items) {
      if (item.id === id && item.type === 'file') return item;
      if (item.type === 'folder') {
        const found = findFile(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const activeFile = useMemo(() => findFile(files, activeFileId), [files, activeFileId]);

  // ファイルの内容を更新
  const updateContent = (newContent: string) => {
    const update = (items: any[]): any[] => items.map(item => {
      if (item.id === activeFileId) return { ...item, content: newContent };
      if (item.type === 'folder') return { ...item, children: update(item.children) };
      return item;
    });
    setFiles(update(files));
  };

  const runCode = () => {
    if (!activeFile) return;
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
    <div className="h-screen pt-20 flex flex-col bg-white">
      {/* ツールバー */}
      <div className="h-14 border-b border-zinc-200 flex items-center justify-between px-6 bg-zinc-50/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/tools" className="p-2 hover:bg-zinc-200 rounded-lg transition-colors"><ArrowLeft size={18} /></Link>
          <h1 className="text-sm font-bold tracking-widest text-zinc-400 uppercase">Sublime Runner</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setLogs([])} className="p-2 text-zinc-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
          <button onClick={runCode} className="flex items-center gap-2 bg-zinc-900 text-white px-5 py-1.5 rounded-md text-sm font-bold hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
            <Play size={14} /> RUN
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* サイドバー（フォルダツリー） */}
        <div className="w-64 border-r border-zinc-200 bg-zinc-50 flex flex-col">
          <div className="p-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest flex justify-between items-center">
            FOLDERS <Plus size={12} className="cursor-pointer" />
          </div>
          <div className="flex-1 overflow-y-auto px-2">
            {files.map(item => (
              <div key={item.id}>
                <div className="flex items-center gap-2 p-2 text-zinc-600 hover:bg-zinc-200 rounded cursor-default text-sm">
                  <ChevronDown size={14} /> <Folder size={16} className="text-blue-500" /> {item.name}
                </div>
                {item.type === 'folder' && item.children.map(file => (
                  <div 
                    key={file.id} 
                    onClick={() => setActiveFileId(file.id)}
                    className={`flex items-center gap-2 ml-6 p-2 rounded cursor-pointer text-sm transition-colors ${activeFileId === file.id ? 'bg-white text-blue-600 shadow-sm border border-zinc-200' : 'text-zinc-500 hover:bg-zinc-200'}`}
                  >
                    <FileCode size={14} /> {file.name}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* メインエディタエリア */}
        <div className="flex-1 flex flex-col bg-white">
          {/* タブバー */}
          <div className="h-10 bg-zinc-100/50 border-b border-zinc-200 flex items-center">
            {activeFile && (
              <div className="h-full px-4 flex items-center gap-2 bg-white border-r border-zinc-200 text-xs text-blue-600 font-medium">
                {activeFile.name} <X size={12} className="text-zinc-400 cursor-pointer hover:text-red-500" />
              </div>
            )}
          </div>
          <textarea
            value={activeFile?.content || ''}
            onChange={(e) => updateContent(e.target.value)}
            className="flex-1 p-8 font-mono text-sm outline-none bg-white text-zinc-700 leading-relaxed"
            spellCheck={false}
            placeholder="Select a file to start coding..."
          />
        </div>

        {/* コンソール（右側） */}
        <div className="w-80 border-l border-zinc-200 bg-zinc-50 flex flex-col">
          <div className="p-4 border-b border-zinc-200 text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <Terminal size={14} /> CONSOLE
          </div>
          <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] space-y-3 bg-white/50">
            {logs.length === 0 && <div className="text-zinc-300 italic">No output...</div>}
            {logs.map((log, i) => (
              <div key={i} className={`p-2 rounded border ${log.type === 'error' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-zinc-100 border-zinc-200 text-zinc-600'}`}>
                <span className="opacity-40 mr-2">{i + 1}</span> {log.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
