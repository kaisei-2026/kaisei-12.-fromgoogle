"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CodeEditorPage() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
      {/* ナビゲーションバー */}
      <div style={{ padding: '8px 20px', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', backgroundColor: '#f8f8f8' }}>
        <Link href="/tools" style={{ display: 'flex', alignItems: 'center', color: '#333', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }} /> ツール一覧に戻る
        </Link>
      </div>

      {/* エディタ本体をiframeで全画面表示 */}
      <iframe
        src="/kaisei-12.-fromgoogle/apps/code-editor.html"
        style={{ flex: 1, border: 'none', width: '100%' }}
        title="Elite Code Editor"
      />
    </div>
  );
}
