"use client";
import React from "react";

export default function CodeEditorPage() {
  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e]">
      {/* ヘッダー分の高さを確保するスペーサー */}
      <div className="h-16 shrink-0" />

      {/* エディタ本体を画面いっぱいに広げる */}
      <div className="flex-1 w-full overflow-hidden">
        <iframe
          src="/kaisei-12.-fromgoogle/apps/code-editor.html"
          className="w-full h-full border-none"
          title="Elite Code Editor"
        />
      </div>
    </div>
  );
}
