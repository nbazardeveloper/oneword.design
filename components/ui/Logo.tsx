import React from "react";
export const Logo = ({ className = "h-8" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 160 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Символ {0} (Slash Zero) — Electric Citrus */}
      <g>
        <ellipse 
          cx="15" cy="20" rx="12" ry="15" 
          stroke="#94EC0E" 
          strokeWidth="2.5" 
        />
        <line 
          x1="7" y1="28" x2="23" y2="12" 
          stroke="#94EC0E" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />
      </g>
      
      {/* Текст neword — Midnight Ink */}
      <text
        x="35"
        y="28"
        fill="currentColor" /* Позволяет менять цвет через родителя */
        className="font-sans font-medium text-[24px] tracking-tight"
        style={{ fontVariantLigatures: 'none' }}
      >
        neword
      </text>
    </svg>
  );
};