"use client";
import React from "react";

export default function ForenotePage() {
  // 🌟 URLを新しいリポジトリ名に修正
  const iframeSrc = "/kaisei-google/apps/forenote.html";

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* ヘッダー(64px)分の隙間を作る */}
      <div className="h-16 shrink-0" /> 

      {/* 本体：画面いっぱいに広げる */}
      <div className="flex-1 w-full overflow-hidden">
        <iframe
          src={iframeSrc}
          className="w-full h-full border-none"
          title="Forenote Pro"
        />
      </div>
    </div>
  );
}
