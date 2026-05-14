"use client";
import React from "react";

export default function PythonHubPage() {
  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="h-16 shrink-0 bg-white" />
      <iframe
        src="/kaisei-google/apps/python-hub.html"
        className="flex-1 w-full border-none"
        title="Elite Python Hub"
      />
    </div>
  );
}
