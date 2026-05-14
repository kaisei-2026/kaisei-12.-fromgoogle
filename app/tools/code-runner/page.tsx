"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

// --- ブラウザ専用コンポーネントとして定義 ---
const SublimeEditor = () => {
  const [activeFileId, setActiveFileId] = useState('1');
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);
  const [logs, setLogs] = useState<{ type: string; content: string }[]>([]);
  const [files, setFiles] = useState([
    { id: '1', name: 'main.js', content: 'console.log("SYSTEM: Sublime Engine Started.");\n\nconst greet = () => {\n  console.log("HELLO FROM CHROMEBOOK!");\n};\n\ngreet();' },
    { id: '2', name: 'utils.js', content: 'console.warn("This is a warning message.");\nconsole.error("This is an error message.");' },
  ]);

  const activeFile = files.find(f => f.id === activeFileId) || files[0];

  const runCode = () => {
    setIsConsoleOpen(true);
    setLogs([]);
    const handleMessage = (e: MessageEvent) => {
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
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', color: '#000', fontFamily: 'monospace' }}>
      {/* ツールバー (Sublime Dark) */}
      <div style={{ height: '40px', backgroundColor: '#252525', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 15px', color: '#fff' }}>
        <div style={{ fontSize: '11px', fontWeight: 'bold' }}>SUBLIME TEXT - {activeFile.name}</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setIsConsoleOpen(!isConsoleOpen)} style={{ background: 'none', border: 'none', color: isConsoleOpen ? '#579dff' : '#666', cursor: 'pointer' }}>CONSOLE</button>
          <button onClick={runCode} style={{ backgroundColor: '#0078d4', color: '#fff', border: 'none', padding: '2px 15px', borderRadius: '3px', fontSize: '10px', cursor: 'pointer' }}>RUN</button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* サイドバー */}
        <div style={{ width: '200px', backgroundColor: '#1e1e1e', color: '#888', padding: '10px 0' }}>
          <div style={{ padding: '5px 15px', fontSize: '10px', fontWeight: 'bold', color: '#555' }}>FOLDERS</div>
          {files.map(f => (
            <div key={f.id} onClick={() => setActiveFileId(f.id)} style={{ padding: '8px 20px', cursor: 'pointer', fontSize: '13px', backgroundColor: activeFileId === f.id ? '#333' : 'transparent', color: activeFileId === f.id ? '#fff' : '#888' }}>
              {f.name}
            </div>
          ))}
        </div>

        {/* エディタ本体 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
          <textarea
            value={activeFile.content}
            onChange={(e) => setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, content: e.target.value } : f))}
            spellCheck={false}
            style={{ flex: 1, padding: '20px', fontSize: '16px', border: 'none', outline: 'none', color: '#000', backgroundColor: '#fff', resize: 'none', fontWeight: 'bold' }}
          />

          {/* コンソール */}
          {isConsoleOpen && (
            <div style={{ height: '200px', borderTop: '2px solid #ddd', display: 'flex', flexDirection: 'column' }}>
              <div style={{ backgroundColor: '#f0f0f0', padding: '5px 15px', fontSize: '10px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
                <span>OUTPUT CONSOLE</span>
                <button onClick={() => setLogs([])} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>CLEAR</button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '10px', backgroundColor: '#fff', color: '#000' }}>
                {logs.map((log, i) => (
                  <div key={i} style={{ padding: '3px 0', borderBottom: '1px solid #f9f9f9', color: log.type === 'error' ? 'red' : log.type === 'warn' ? '#b8860b' : '#000', fontWeight: 'bold' }}>
                    <span style={{ color: '#ccc', marginRight: '10px' }}>{i + 1}</span> {log.content}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- ここが最重要：サーバーでの書き出しを完全に禁止する設定 ---
const NoSSRWrapper = dynamic(() => Promise.resolve(SublimeEditor), {
  ssr: false, // サーバーサイドレンダリングをOFF
  loading: () => <div style={{ backgroundColor: '#fff', minHeight: '100vh', padding: '20px', color: '#000' }}>Loading Editor...</div>
});

export default function Page() {
  return <NoSSRWrapper />;
}
