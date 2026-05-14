"use client";
import React from "react";

export default function ForenotePage() {
  return (
    // h-screen(画面の高さ) から 64px(ヘッダーの高さ) を引いたぴったりサイズにする
    <div className="flex flex-col h-screen bg-white">
      {/* ヘッダー分の高さを確保するスペーサー */}
      <div className="h-16 shrink-0" /> 

      {/* 本体：余白を一切なくして全画面に広げる */}
      <div className="flex-1 w-full overflow-hidden">
        <iframe
          id="forenote-iframe"
          src="/kaisei-12.-fromgoogle/apps/forenote.html"
          className="w-full h-full border-none"
          title="Forenote Pro"
        />
      </div>
    </div>
  );
}
