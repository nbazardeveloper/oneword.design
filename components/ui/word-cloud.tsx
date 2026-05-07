"use client";

import { useState } from "react";
import { Text } from "@visx/text";
import { scaleLog } from "@visx/scale";
import { Wordcloud } from "@visx/wordcloud";

interface ExampleProps {
  width: number;
  height: number;
  showControls?: boolean;
}

export interface WordData {
  text: string;
  value: number;
}

const keywordList = [
  "Web-Design",
  "Web-Development",
  "SEO-Optimization",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind-CSS",
  "UI/UX-Design",
  "Digital-Architecture",
  "E-commerce",
  "Solutions",
  "Custom-Websites",
  "Performance-Results",
  "ROI-Driven",
  "High-Conversion-Pages",
  "Bespoke-Design",
  "Responsive-Layouts",
  "Modern-Web-Tech",
  "Search-Engine-Strategy",
  "Analytics",
  "Growth-Marketing",
  "Conversion-Rate",
  "Custom-Development",
  "Branding",
  "Web-Architecture",
  "User-Experience",
  "Interface-Design",
  "Scalable-Websites",
  "Digital-Marketing",
  "Lead-Generation",
  "Business-Growth",
  "Technical-SEO",
  "Landing-Pages",
  "Shopify-Development",
  "Web-Apps",
  "Digital-Transformation",
  "Page-Speed-Optimization",
  "Mobile-First-Design",
  "SaaS-Development",
  "Marketing-Automation",
  "Interactive-Design",
  "Performance-Marketing",
  "Client-Acquisition",
  "Digital-Strategy",
  "High-Performance",
  "Visual-Identity",
  "Web-Maintenance",
  "API-Integration",
  "Cloud-Hosting",
  "React-Framework",
  "Vite-Tooling",
  "Front-end-Architecture",
  "Back-end-Solutions",
  "Full-stack",
  "Design-Systems",
  "Minimalist-Design",
  "Neo-Bauhaus",
  "Quiet-Luxury",
  "Intentional-Minimalism",
  "Business-Focus",
  "Conversion-Optimization",
  "Content-Strategy",
  "Data-Driven-Design",
  "Professional-Web-Presence",
  "USA-Market-Entry",
  "Local-SEO-Chicago",
  "Small-Business-Solutions",
  "Enterprise-Software-Development",
  "Startup-Growth-Partner",
  "Organic-Traffic-Growth",
  "Google-Ads-Management",
  "PPC-Strategy",
  "E-commerce-Scalability",
  "User-Retention-Design",
  "Brand-Authority",
  "Lead-Capture-Systems",
  "Sales-Funnel-Optimization",
  "B2B-Web-Solutions",
  "B2C-E-commerce",
  "Customer-Journey-Mapping",
  "ADA-Compliance-Web",
  "Web-Accessibility",
  "High-Ticket-Sales",
  "Digital-Product-Design",
  "Revenue-Focused-Design",
  "Cloud-Native-Apps",
  "Headless-CMS",
  "Contentful-Integration",
  "Strapi-Expert",
  "Next-Auth-Security",
] as const;

const words: WordData[] = keywordList.map((text, index) => ({
  text,
  value: [14, 12, 10, 9, 8, 7, 6][index % 7],
}));

const colors = ["#143059", "#2F6B9A", "#82a6c2", "#ffffff", "#f0ede5"];
const accentColor = "#cff547";

function getRotationDegree() {
  const rand = Math.random();
  const degree = rand > 0.5 ? 60 : -60;
  return rand * degree;
}

const fontScale = scaleLog({
  domain: [Math.min(...words.map((word) => word.value)), Math.max(...words.map((word) => word.value))],
  range: [12, 88],
});

const fontSizeSetter = (datum: WordData) => fontScale(datum.value);
const fixedValueGenerator = () => 0.5;

type SpiralType = "archimedean" | "rectangular";

export function WordcloudChart({ width, height, showControls }: ExampleProps) {
  const [spiralType, setSpiralType] = useState<SpiralType>("archimedean");
  const [withRotation, setWithRotation] = useState(false);

  return (
    <div className="wordcloud">
      <Wordcloud
        words={words}
        width={width}
        height={height}
        fontSize={fontSizeSetter}
        font="Impact"
        padding={2}
        spiral={spiralType}
        rotate={withRotation ? getRotationDegree : () => 0}
        random={fixedValueGenerator}
      >
        {(cloudWords) =>
          cloudWords.map((word, index) => (
            <Text
              key={word.text}
              fill={index % 5 === 0 ? accentColor : colors[index % colors.length]}
              textAnchor="middle"
              transform={`translate(${word.x}, ${word.y}) rotate(${word.rotate})`}
              fontSize={word.size}
              fontFamily={word.font}
            >
              {word.text}
            </Text>
          ))
        }
      </Wordcloud>

      {showControls && (
        <div className="wordcloud__controls">
          <label className="wordcloud__toggle">
            <span className="wordcloud__toggle-label">With rotation</span>
            <input
              className="wordcloud__toggle-input"
              type="checkbox"
              checked={withRotation}
              onChange={() => setWithRotation((prev) => !prev)}
            />
            <span className="wordcloud__toggle-switch" aria-hidden="true">
              <span className="wordcloud__toggle-knob" />
            </span>
          </label>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .wordcloud {
              display: flex;
              flex-direction: column;
              user-select: none;
              align-items: center;
              width: 100%;
            }
            .wordcloud svg {
              margin: 1rem 0;
              cursor: pointer;
              max-width: 100%;
              height: auto;
            }
            .wordcloud__controls {
              display: flex;
              justify-content: center;
              margin-top: 10px;
            }
            .wordcloud label {
              display: inline-flex;
              align-items: center;
              font-size: 14px;
              margin-right: 8px;
              color: var(--color-text-on-dark);
            }
            .wordcloud__toggle {
              gap: 0.875rem;
              margin-right: 0;
              padding: 0.75rem 1rem;
              border: 1px solid rgba(255, 255, 255, 0.12);
              border-radius: 999px;
              background: rgba(255, 255, 255, 0.04);
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
              cursor: pointer;
              transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
            }
            .wordcloud__toggle:hover {
              border-color: rgba(207, 245, 71, 0.32);
              background: rgba(255, 255, 255, 0.06);
            }
            .wordcloud__toggle-label {
              font-size: 0.95rem;
              font-weight: 600;
              letter-spacing: 0.01em;
            }
            .wordcloud__toggle-input {
              position: absolute;
              opacity: 0;
              pointer-events: none;
            }
            .wordcloud__toggle-switch {
              position: relative;
              display: inline-flex;
              align-items: center;
              width: 3.25rem;
              height: 1.9rem;
              padding: 0.2rem;
              border-radius: 999px;
              background: rgba(255, 255, 255, 0.12);
              transition: background-color 0.2s ease, box-shadow 0.2s ease;
            }
            .wordcloud__toggle-knob {
              width: 1.5rem;
              height: 1.5rem;
              border-radius: 999px;
              background: #ffffff;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.22);
              transition: transform 0.2s ease, background-color 0.2s ease;
            }
            .wordcloud__toggle-input:checked + .wordcloud__toggle-switch {
              background: rgba(207, 245, 71, 0.3);
              box-shadow: inset 0 0 0 1px rgba(207, 245, 71, 0.35);
            }
            .wordcloud__toggle-input:checked + .wordcloud__toggle-switch .wordcloud__toggle-knob {
              transform: translateX(1.35rem);
              background: var(--color-brand-acid);
            }
            .wordcloud__toggle-input:focus-visible + .wordcloud__toggle-switch {
              outline: 2px solid rgba(207, 245, 71, 0.55);
              outline-offset: 3px;
            }
            .wordcloud select,
            .wordcloud input {
              margin-left: 0.5rem;
            }
          `,
        }}
      />
    </div>
  );
}

export default WordcloudChart;