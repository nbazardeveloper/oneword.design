"use client";

import { useState, useMemo } from "react";

interface WordData {
  text: string;
  value: number;
}

interface WordcloudChartProps {
  width?: number;
  height?: number;
  showControls?: boolean;
}

const keywordList: WordData[] = [
  { text: "Web-Design",                value: 14 },
  { text: "Web-Development",           value: 12 },
  { text: "SEO-Optimization",          value: 10 },
  { text: "React",                     value: 9  },
  { text: "Next.js",                   value: 9  },
  { text: "TypeScript",                value: 8  },
  { text: "Tailwind-CSS",              value: 7  },
  { text: "UI/UX-Design",              value: 7  },
  { text: "Digital-Architecture",      value: 6  },
  { text: "E-commerce",                value: 8  },
  { text: "Custom-Websites",           value: 7  },
  { text: "Performance-Results",       value: 7  },
  { text: "ROI-Driven",                value: 6  },
  { text: "High-Conversion-Pages",     value: 7  },
  { text: "Bespoke-Design",            value: 6  },
  { text: "Responsive-Layouts",        value: 6  },
  { text: "Modern-Web-Tech",           value: 6  },
  { text: "Search-Engine-Strategy",    value: 7  },
  { text: "Analytics",                 value: 6  },
  { text: "Growth-Marketing",          value: 6  },
  { text: "Conversion-Rate",           value: 7  },
  { text: "Branding",                  value: 6  },
  { text: "User-Experience",           value: 8  },
  { text: "Interface-Design",          value: 7  },
  { text: "Scalable-Websites",         value: 6  },
  { text: "Lead-Generation",           value: 7  },
  { text: "Business-Growth",           value: 7  },
  { text: "Technical-SEO",             value: 8  },
  { text: "Landing-Pages",             value: 6  },
  { text: "Mobile-First-Design",       value: 7  },
  { text: "Full-stack",                value: 8  },
  { text: "Design-Systems",            value: 6  },
  { text: "Minimalist-Design",         value: 6  },
  { text: "Conversion-Optimization",   value: 7  },
  { text: "Organic-Traffic-Growth",    value: 7  },
  { text: "Brand-Authority",           value: 6  },
  { text: "B2B-Web-Solutions",         value: 6  },
  { text: "Web-Accessibility",         value: 6  },
  { text: "Revenue-Focused-Design",    value: 7  },
  { text: "Headless-CMS",              value: 6  },
  { text: "Page-Speed-Optimization",   value: 7  },
  { text: "Digital-Strategy",          value: 6  },
];

// All colors must pass 4.5:1 contrast on hero-surface (#162531)
// #2F6B9A (2.8:1 ✗) → #82c4e8 (8.4:1 ✓)
// #143059 (1.2:1 ✗) → #a8d5ed (9.8:1 ✓)
const COLORS = ["#82c4e8", "#82a6c2", "#ffffff", "#f0ede5", "#a8d5ed"];
const ACCENT = "#cff547";
const ROTATIONS = [0, -30, 30, -15, 15, -45, 45, 0, -20, 20];

function valueToSize(value: number, min: number, max: number): number {
  const t = (value - min) / (max - min);
  return Math.round(13 + t * 59);
}

export function WordcloudChart({ showControls }: WordcloudChartProps) {
  const [withRotation, setWithRotation] = useState(false);

  const min = useMemo(() => Math.min(...keywordList.map((w) => w.value)), []);
  const max = useMemo(() => Math.max(...keywordList.map((w) => w.value)), []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", userSelect: "none" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px 16px",
          padding: "2rem",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {keywordList.map((word, i) => {
          const size = valueToSize(word.value, min, max);
          const color = i % 7 === 0 ? ACCENT : COLORS[i % COLORS.length];
          const rotation = withRotation ? ROTATIONS[i % ROTATIONS.length] : 0;
          return (
            <span
              key={word.text}
              style={{
                fontSize: `${size}px`,
                color,
                fontFamily: "Impact, Arial Black, sans-serif",
                display: "inline-block",
                lineHeight: 1.1,
                cursor: "default",
                transform: rotation ? `rotate(${rotation}deg)` : undefined,
                transition: "transform 0.3s ease",
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>

      {showControls && (
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.875rem",
            marginTop: "1rem",
            padding: "0.75rem 1rem",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.04)",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "#fff" }}>
            With rotation
          </span>
          <input
            type="checkbox"
            checked={withRotation}
            onChange={() => setWithRotation((p) => !p)}
            style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
          />
          <span
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              width: "3.25rem",
              height: "1.9rem",
              padding: "0.2rem",
              borderRadius: "999px",
              background: withRotation ? "rgba(207,245,71,0.3)" : "rgba(255,255,255,0.12)",
              transition: "background 0.2s ease",
            }}
          >
            <span
              style={{
                width: "1.5rem",
                height: "1.5rem",
                borderRadius: "999px",
                background: withRotation ? "#cff547" : "#ffffff",
                transform: withRotation ? "translateX(1.35rem)" : undefined,
                transition: "transform 0.2s ease, background 0.2s ease",
              }}
            />
          </span>
        </label>
      )}
    </div>
  );
}

export default WordcloudChart;
