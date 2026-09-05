"use client";

import React from "react";

export function WashiTape({ color = "rose", angle = -2, className = "" }) {
  const colorMap = {
    rose: "bg-[#E8B4B8]/80 border-t border-b border-[#D8A4A8]/40",
    sage: "bg-[#B8C4B8]/80 border-t border-b border-[#A8B4A8]/40",
    mustard: "bg-[#E2C275]/80 border-t border-b border-[#D2B265]/40",
    sky: "bg-[#A8C0D6]/80 border-t border-b border-[#98B0C6]/40",
  };

  return (
    <div
      className={`h-4 w-20 shadow-sm backdrop-blur-[1px] select-none pointer-events-none z-10 ${colorMap[color] || colorMap.rose} ${className}`}
      style={{
        transform: `rotate(${angle}deg)`,
        clipPath: "polygon(0% 0%, 96% 2%, 100% 98%, 4% 100%)",
      }}
    />
  );
}
