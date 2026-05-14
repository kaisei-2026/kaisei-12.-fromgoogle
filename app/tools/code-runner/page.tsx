"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
      {/* サイトに戻るための最小限のバー */}
      <div style={{ padding: '10px 20px', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center' }}>
        <Link href="/tools" style={{ display: 'flex', alignItems: 'center', color: '#666', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }} /> サイトに戻る
        </Link>
      </div>

      {/* 本体はiframeで読み込む（これが一番確実！） */}
      <iframe
        src="/kaisei-12.-fromgoogle/apps/code-runner.html"
        style={{ flex: 1, border: 'none', width: '100%' }}
        title="Code Runner"
      />
    </div>
  );
}
