"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Trash2, Terminal, ArrowLeft, FileCode, Folder, 
  ChevronDown, X, LayoutPanelBottom, Plus, Search, Settings 
} from "lucide-react";

// --- エラー回避のための極低層コンポーネント ---
export default function SublimeRunner() {
  const [mounted, setMounted] = useState(false);
  const [activeFileId, setActiveFileId] = useState('1');
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);
  const [logs, setLogs] = useState<{ type: string; content: string }[]>([]);
  
  // 仮想ファイルシステム
  const [files, setFiles] = useState([
    { id: '1', name: 'main.js', content: 'console.log("System Status: OK");\n\nfunction start() {\n  const user = "Chromebook Developer";\n  console.log("Welcome, " + user);\n}\n\nstart();' },
    { id: '2', name: 'debug.js', content: 'console.warn("Testing high-contrast console...");\nconsole.error("Critical error simulation.");' },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // クライアントサイドでのみ描画することを強制
  if (!mounted) return null;

  const activeFile = files.find(f => f.id === activeFileId) || files[0];

  const runCode = () => {
    setIsConsoleOpen(true);
    setLogs([]);
    const handleMessage = (e: any) => {
      if (e.data && e.data.type) {
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
      doc.write(`<script>
        const console = {
          log: (...args) => window.parent.postMessage({ type: 'log', content: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*'),
          error: (...args) => window.parent.postMessage({ type: 'error', content: args.map(String).join(' ') }, '*'),
          warn: (...args) => window.parent.postMessage({ type: 'warn', content: args.map(String).join(' ') }, '*')
        };
        window.onerror = (m) => console.error(m);
        try { ${activeFile.content} } catch (err) { console.error(err.message); }
      <\/script>`);
      doc.close();
    }
    setTimeout(() => {
      document.body.removeChild(iframe);
      window.removeEventListener("message", handleMessage);
    }, 400);
  };

  return (
    <div style={{
      height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column',
      backgroundColor: '#ffffff', color: '#000000', fontFamily: 'ui-monospace, monospace',
      overflow: 'hidden', position: 'fixed', inset: 0
    }}>
      
      {/* 1. Header (Sublime Slate) */}
      <div style={{
        height: '45px', backgroundColor: '#212121', display: 'flex', 
        alignItems: 'center', justifyContent: 'space-between', padding: '0 15px', color: '#ccc'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link href="/tools" style={{ color: '#aaa', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={18} />
          </Link>
          <div style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.1em' }}>SUBLIME TEXT - [PROJECT]</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={() => setIsConsoleOpen(!isConsoleOpen)} style={{ background: 'none', border: 'none', color: isConsoleOpen ? '#579dff' : '#666', cursor: 'pointer' }}>
            <LayoutPanelBottom size={20} />
          </button>
          <div style={{ width: '1px', height: '20px', backgroundColor: '#333' }} />
          <button onClick={runCode} style={{
            backgroundColor: '#0078d4', color: 'white', border: 'none', padding: '5px 20px',
            borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
          }}>▶ RUN CODE</button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* 2. Activity Bar (Narrow Dark) */}
        <div style={{ width: '50px', backgroundColor: '#181818', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px 0', gap: '25px' }}>
          <FileCode size={24} color="#579dff" />
          <Search size={24} color="#555" />
          <Plus size={24} color="#555" />
          <div style={{ flex: 1 }} />
          <Settings size={24} color="#555" />
        </div>

        {/* 3. Sidebar (Dark Grey) */}
        <div style={{ width: '220px', backgroundColor: '#1e1e1e', color: '#999', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '15px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', justifyContent: 'space-between' }}>
            Explorer <ChevronDown size={14} />
          </div>
          <div style={{ padding: '5px 15px', fontSize: '13px', color: '#eee', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Folder size={14} color="#579dff" /> project_src
          </div>
          {files.map(file => (
            <div 
              key={file.id} 
              onClick={() => setActiveFileId(file.id)}
              style={{
                padding: '8px 15px 8px 35px', fontSize: '13px', cursor: 'pointer',
                backgroundColor: activeFileId === file.id ? '#333' : 'transparent',
                color: activeFileId === file.id ? '#fff' : '#888',
                borderLeft: activeFileId === file.id ? '2px solid #579dff' : 'none'
              }}
            >
              {file.name}
            </div>
          ))}
        </div>

        {/* 4. Main Editor & Console Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
          
          {/* Tabs */}
          <div style={{ height: '35px', backgroundColor: '#252525', display: 'flex' }}>
            <div style={{
              height: '100%', padding: '0 20px', backgroundColor: '#fff', borderRight: '1px solid #ddd',
              display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', fontWeight: 'bold', color: '#333'
            }}>
              {activeFile.name} <X size={12} />
            </div>
            <div style={{ flex: 1, backgroundColor: '#252525' }} />
          </div>

          {/* Code Editor */}
          <div style={{ flex: 1, position: 'relative', padding: '0', backgroundColor: '#fff' }}>
            <textarea
              value={activeFile.content}
              onChange={(e) => {
                const val = e.target.value;
                setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, content: val } : f));
              }}
              spellCheck={false}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%', padding: '25px',
                border: 'none', outline: 'none', fontSize: '15px', lineHeight: '1.6',
                fontFamily: '"Fira Code", monospace', color: '#000', backgroundColor: '#fff',
                resize: 'none'
              }}
            />
          </div>

          {/* 5. Console (High Contrast) */}
          {isConsoleOpen && (
            <div style={{
              height: '220px', borderTop: '4px solid #ddd', backgroundColor: '#fff',
              display: 'flex', flexDirection: 'column', boxShadow: '0 -10px 30px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                height: '35px', backgroundColor: '#f8f8f8', borderBottom: '1px solid #ddd',
                padding: '0 15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 'black', color: '#000', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Terminal size={14} /> CONSOLE OUTPUT
                </div>
                <button onClick={() => setLogs([])} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#999' }}>
                  <Trash2 size={16} />
                </button>
              </div>
              <div style={{
                flex: 1, overflowY: 'auto', padding: '15px', fontFamily: 'monospace',
                fontSize: '13px', lineHeight: '1.5', color: '#000', backgroundColor: '#fff'
              }}>
                {logs.length === 0 && <div style={{ color: '#ddd' }}>// Waiting for execution...</div>}
                {logs.map((log, i) => (
                  <div key={i} style={{
                    marginBottom: '6px', padding: '4px 8px', borderRadius: '4px',
                    backgroundColor: log.type === 'error' ? '#fff0f0' : log.type === 'warn' ? '#fff9e6' : '#f4f4f4',
                    borderLeft: `4px solid ${log.type === 'error' ? '#ff4d4d' : log.type === 'warn' ? '#ffcc00' : '#333'}`,
                    color: '#000', fontWeight: 'bold'
                  }}>
                    <span style={{ opacity: 0.3, marginRight: '10px' }}>{i + 1}</span>
                    {log.content}
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
