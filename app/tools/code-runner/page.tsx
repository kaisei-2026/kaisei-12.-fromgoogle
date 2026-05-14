"use client";

import React, { useState, useEffect } from "react";
import { Play, Trash2, Terminal, ArrowLeft, FileCode, Folder, ChevronDown, X, LayoutPanelBottom } from "lucide-react";
import Link from "next/link";

export default function SublimeRunner() {
  const [mounted, setMounted] = useState(false);
  const [files, setFiles] = useState([
    { id: '1', name: 'main.js', content: 'console.log("Sublime Runner Ready.");\nconst a = 10;\nconst b = 20;\nconsole.log("Sum is:", a + b);\n\nconsole.log("School Chromebook Environment Debug OK.");' },
    { id: '2', name: 'test.js', content: 'console.warn("Warning test...");\nconsole.error("Error test...");' },
  ]);
  const [activeFileId, setActiveFileId] = useState('1');
  const [logs, setLogs] = useState<{ type: string; content: string }[]>([]);
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);

  // 初回読み込み（マウント）チェック
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const activeFile = files.find(f => f.id === activeFileId) || files[0];

  const updateContent = (val: string) => {
    setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, content: val } : f));
  };

  const runCode = () => {
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
          window.onerror = (m) => customConsole.error(m);
          try {
            const console = customConsole;
            ${activeFile.content}
          } catch (err) {
            customConsole.error(err.message);
          }
        <\/script>
      `);
      doc.close();
    }
    
    setTimeout(() => {
      document.body.removeChild(iframe);
      window.removeEventListener("message", handleMessage);
    }, 500);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', color: '#000000', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      
      {/* ツールバー (Sublime風グレー) */}
      <div style={{ height: '40px', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', backgroundColor: '#e8e8e8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Link href="/tools" style={{ color: '#555', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={18} />
          </Link>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#888', letterSpacing: '0.1em' }}>SUBLIME RUNNER V1</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => setIsConsoleOpen(!isConsoleOpen)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: isConsoleOpen ? '#0066ff' : '#999' }}
          >
            <LayoutPanelBottom size={20} />
          </button>
          <div style={{ width: '1px', height: '15px', backgroundColor: '#ccc' }}></div>
          <button 
            onClick={runCode} 
            style={{ backgroundColor: '#444', color: '#fff', border: 'none', padding: '4px 15px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            ▶ RUN
          </button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* サイドバー (Sublime風サイドメニュー) */}
        <div style={{ width: '200px', borderRight: '1px solid #ddd', backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column', userSelect: 'none' }}>
          <div style={{ padding: '10px', fontSize: '10px', fontWeight: 'bold', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Folders</div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', fontSize: '12px', fontWeight: 'bold', color: '#333' }}>
              <ChevronDown size={14} /> <Folder size={14} color="#999" /> project
            </div>
            {files.map(file => (
              <div 
                key={file.id} 
                onClick={() => setActiveFileId(file.id)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px 6px 30px', cursor: 'pointer', fontSize: '12px',
                  backgroundColor: activeFileId === file.id ? '#ddd' : 'transparent',
                  color: activeFileId === file.id ? '#000' : '#666',
                  fontWeight: activeFileId === file.id ? 'bold' : 'normal'
                }}
              >
                <FileCode size={14} /> {file.name}
              </div>
            ))}
          </div>
        </div>

        {/* メインエディタエリア */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fff', overflow: 'hidden' }}>
          
          {/* タブ */}
          <div style={{ height: '32px', backgroundColor: '#dadada', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc' }}>
            <div style={{ height: '100%', padding: '0 15px', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fff', borderRight: '1px solid #ccc', borderTop: '2px solid #0066ff', fontSize: '11px', fontWeight: 'bold', color: '#333' }}>
              {activeFile.name} <X size={10} color="#999" />
            </div>
          </div>
          
          {/* テキストエディタ */}
          <div style={{ flex: 1, position: 'relative' }}>
            <textarea
              value={activeFile.content}
              onChange={(e) => updateContent(e.target.value)}
              spellCheck={false}
              style={{ 
                position: 'absolute', inset: 0, width: '100%', height: '100%', padding: '20px', border: 'none', outline: 'none',
                fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6', color: '#000', backgroundColor: '#fff', resize: 'none'
              }}
            />
          </div>

          {/* コンソールエリア (開閉式) */}
          {isConsoleOpen && (
            <div style={{ height: '180px', borderTop: '2px solid #ccc', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '28px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ddd', padding: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#888', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Terminal size={12} /> CONSOLE OUTPUT
                </div>
                <button onClick={() => setLogs([])} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#999' }}>
                  <Trash2 size={14} />
                </button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '10px', fontFamily: 'monospace', fontSize: '12px', color: '#000', spaceY: '4px' }}>
                {logs.length === 0 && <div style={{ color: '#ccc', fontStyle: 'italic' }}>No output yet...</div>}
                {logs.map((log, i) => (
                  <div key={i} style={{ marginBottom: '4px', color: log.type === 'error' ? '#d00' : log.type === 'warn' ? '#860' : '#000', borderBottom: '1px solid #f0f0f0', paddingBottom: '2px' }}>
                    <span style={{ color: '#ccc', marginRight: '10px', userSelect: 'none' }}>{i + 1}</span>
                    <span style={{ fontWeight: log.type !== 'log' ? 'bold' : 'normal' }}>
                      {log.type === 'error' ? '✖ ' : log.type === 'warn' ? '⚠ ' : '› '}
                      {log.content}
                    </span>
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
