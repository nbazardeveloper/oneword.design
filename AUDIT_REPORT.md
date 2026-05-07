# Аудит проекта — Отчёт о соответствии правилам
**Дата:** 07.05.2026  
**Проект:** `nextjs-seo-project` (oneword.design)  
**Next.js:** 16.2.4 · **React:** 19.2.4 · **TypeScript:** ^5 · **Tailwind CSS:** ^4

---

## Итоговая оценка

| Раздел правил | Статус | Нарушений |
|---|---|---|
| 1. Технический стек | ⚠️ Частично | 1 критическое |
| 2. Скорость и производительность | ⚠️ Частично | 2 замечания |
| 3. SEO-оптимизация | ⚠️ Частично | 1 критическое |
| 4. Стандарты кода | ⚠️ Частично | 2 нарушения |
| 5. Дизайн и эстетика | ✅ Соответствует | — |
| 6. Управление скриптами | ✅ Соответствует | — |

**Общий счёт: ~78/100** — проект хорошо спроектирован, но есть несколько нарушений, требующих исправления.

---

## Раздел 1 — Технический стек

### ✅ Соответствует

- **Next.js App Router** — используется корректно (`app/layout.tsx`, `app/page.tsx`, `app/about/page.tsx`).
- **TypeScript strict** — `tsconfig.json` содержит `"strict": true`. Тип `any` нигде не обнаружен.
- **Tailwind CSS** — подключён через `@tailwindcss/postcss`, конфигурация в `tailwind.config.ts`.

### ❌ Критическое нарушение

**`app/page.tsx` помечен как `"use client"`**

Правило гласит: *"React Server Components (RSC) по умолчанию. `'use client'` — только для интерактивных элементов."*

Главная страница целиком является Client Component, что лишает её преимуществ SSR: HTML не рендерится на сервере, JavaScript-бандл страницы попадает в клиент полностью, теряется возможность стриминга.

**Почему так получилось:** Компоненты `JsonLd` и `buildFaqSchema` импортируются напрямую в page.tsx, хотя они не требуют клиентского окружения.

**Как исправить:**
```tsx
// app/page.tsx — убрать "use client"
import { JsonLd, buildFaqSchema } from "@/schemas/jsonld";
import Hero from "@/components/sections/Hero";
// ...
// dynamic() с "use client" внутри дочерних компонентов работает корректно
```
`"use client"` в дочерних компонентах (`Faq`, `HowIWork`, `CtaBanner`) автоматически создаёт границы клиентского рендеринга — page.tsx сам должен оставаться серверным.

---

## Раздел 2 — Скорость и производительность

### ✅ Соответствует

- **`next/dynamic`** — корректно применён для `Faq` и `CtaBanner`.
- **LCP-изображение** — `<Image priority>` используется в `Hero.tsx` для портрета разработчика.
- **`next/image`** — настроены форматы `avif/webp`, `deviceSizes`, `minimumCacheTTL`.
- **Bundle Analyzer** — `@next/bundle-analyzer` установлен и подключён в `next.config.js`.
- **`optimizePackageImports`** — `["lucide-react"]` указан в `experimental`.

### ⚠️ Замечание 1 — Отсутствует `Suspense`

Правило требует: *"Implement Suspense for loading independent data blocks."*  
В проекте нет ни одного использования `<Suspense>`. При наличии `next/dynamic` без `loading` fallback пользователь видит пустоту до загрузки компонентов.

**Рекомендация:**
```tsx
import { Suspense } from "react";
const Faq = dynamic(() => import("@/components/sections/Faq"));

<Suspense fallback={<div className="section animate-pulse bg-neutral-100" />}>
  <Faq items={FAQ_ITEMS} />
</Suspense>
```

### ⚠️ Замечание 2 — Нативный `<img>` в `zoom-parallax.tsx`

`components/ui/zoom-parallax.tsx` использует `<img src={...}>` вместо `next/image`. Это обходит оптимизацию: нет автоматической конвертации в WebP/AVIF, нет `srcSet`, нет lazy loading от Next.js.

**Исправление:**
```tsx
import Image from "next/image";
// <img src={src} ...> → <Image src={src} fill alt={alt} className="object-cover" />
```

---

## Раздел 3 — SEO-оптимизация

### ✅ Соответствует

- **Metadata API** — централизованная фабрика `generateMetadata()` в `lib/metadata.ts` с полным набором: `title`, `description`, `canonical`, `openGraph`, `twitter`, `robots`, `verification`.
- **JSON-LD** — реализованы схемы: `Organization`, `WebSite`, `FAQPage`, `LocalBusiness`, `BreadcrumbList`. Внедрение через типобезопасный компонент `<JsonLd>`.
- **`next/font/google`** — `Inter` и `Plus_Jakarta_Sans` с `subsets: ["latin"]`, `display: "swap"`, `preload: true`. Шрифты самохостятся.
- **HTML5-семантика** — `<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>` используются корректно.
- **`robots.ts` и `sitemap.ts`** — оба реализованы через App Router Metadata API.

### ❌ Критическое нарушение — `/pricing` не имеет metadata

`app/pricing/page.tsx` содержит только:
```tsx
import Services from "@/components/sections/Services";
export default function PricingPage() {
  return <Services />;
}
```

Правило: *"Обязательное определение объекта Metadata для каждой страницы."*

Страница с ценами — одна из самых важных для конверсии и SEO. Google проиндексирует её без title/description, что критично для ранжирования.

**Исправление:**
```tsx
import type { Metadata } from "next";
import { generateMetadata as gen } from "@/lib/metadata";

export const metadata: Metadata = gen({
  title: "Pricing — Web Development Packages",
  description: "Transparent pricing for web development. Starter from $800, Growth from $1,500, Full-Service from $2,500. No hidden fees.",
  slug: "/pricing",
  keywords: ["web design pricing", "website cost", "web development packages"],
});
```

### ℹ️ Информация — Избыточный `preconnect`

`app/layout.tsx` содержит `<link rel="preconnect" href="https://fonts.googleapis.com">`, но `next/font` уже самохостит шрифты и не делает запросы к Google Fonts в runtime. Этот тег бесполезен и создаёт лишнее DNS-соединение.

---

## Раздел 4 — Стандарты кода

### ✅ Соответствует

- **Типизация** — все компоненты имеют `interface` или `type` для пропсов (`HeroProps`, `FaqProps`, `ZoomParallaxProps`, `ScrollRevealProps` и др.).
- **Нет `any`** — проверка по всей кодовой базе не выявила ни одного использования `: any`.
- **Иконки** — `lucide-react` установлен и используется корректно.
- **Tree-shaking** — импорты из библиотек точечные, нет `import * from`.
- **Архитектура** — чёткое разделение: `components/layout`, `components/sections`, `components/ui`, `lib/`, `types/`, `utils/`, `hooks/`, `schemas/`.

### ❌ Нарушение — `.js` файл в TypeScript-проекте

`components/sections/rename.js` — это JavaScript-файл в проекте со строгим TypeScript. Судя по названию, это вспомогательный скрипт для переименования файлов, который не должен находиться в папке `components/`.

**Действие:** удалить файл или перенести в корень как `scripts/rename.js` (если нужен) и добавить в `.gitignore`.

### ❌ Нарушение — Структура папок (отсутствует `src/`)

Правило указывает: `src/app`, `src/components`, `src/lib`, `src/types`.  
Проект использует корневую структуру без `src/`. Это не ломает функциональность, но нарушает задокументированный стандарт.

**Примечание:** Переход на `src/` в существующем Next.js проекте требует обновления `tsconfig.json` путей и рефакторинга всех `@/` алиасов — оцените целесообразность.

### ⚠️ Замечание — Дублирование пакета Lenis

`package.json` содержит оба пакета:
```json
"@studio-freight/lenis": "^1.0.42",  // устаревший
"lenis": "^1.3.23"                    // актуальный
```
`LenisProvider.tsx` импортирует из `"lenis"` (актуального). Старый пакет `@studio-freight/lenis` нигде не используется и раздувает `node_modules`.

**Исправление:** удалить `@studio-freight/lenis` из зависимостей.

---

## Раздел 5 — Дизайн и эстетика

### ✅ Полностью соответствует

- **Система токенов** — `tailwind.config.ts` содержит расширенную палитру (`brand`, `neutral`, `accent`), типографическую шкалу (от `2xs` до `9xl`), систему отступов, тени, анимации.
- **Кислотный цвет** — `--color-brand-acid: #cff547` определён в `globals.css` и стратегически применяется для CTA, акцентов, бордеров (Hero, Header, Services).
- **Функциональный минимализм** — дизайн поддерживает чёткость, калиброванные отступы, последовательные сетки.
- **Safe Area** — реализована поддержка `env(safe-area-inset-top)` для iPhone Dynamic Island.
- **`prefers-reduced-motion`** — `ScrollReveal.tsx` корректно проверяет и отключает анимации.

---

## Раздел 6 — Управление скриптами

### ✅ Полностью соответствует

| Скрипт | Стратегия | Правило |
|---|---|---|
| Google Tag Manager | `afterInteractive` | ✅ Аналитика |
| Google Analytics 4 | `lazyOnload` | ✅ Некритичный |
| Meta Pixel | `lazyOnload` | ✅ Некритичный |

Все скрипты условны (проверяются `SITE_CONFIG.gtmId`, `gaId`, `pixelId`) и не грузятся без конфигурации.

---

## Сводная таблица нарушений

| # | Приоритет | Файл | Проблема | Правило |
|---|---|---|---|---|
| 1 | 🔴 Критично | `app/page.tsx` | `"use client"` на уровне страницы | Правило 1 — RSC |
| 2 | 🔴 Критично | `app/pricing/page.tsx` | Нет экспорта `metadata` | Правило 3 — Metadata API |
| 3 | 🟡 Умеренно | Весь проект | Нет `<Suspense>` для dynamic imports | Правило 2 — Streaming |
| 4 | 🟡 Умеренно | `components/ui/zoom-parallax.tsx` | Нативный `<img>` вместо `next/image` | Правило 2 — Performance |
| 5 | 🟡 Умеренно | `components/sections/rename.js` | `.js` файл в TypeScript-проекте | Правило 4 — Coding Standards |
| 6 | 🟡 Умеренно | Структура проекта | Нет `src/` папки | Правило 4 — Folder Structure |
| 7 | 🟢 Низко | `package.json` | Дубль пакета `@studio-freight/lenis` | Правило 4 — Bundle |
| 8 | 🟢 Низко | `app/layout.tsx` | Лишний `<link preconnect>` к Google Fonts | Правило 3 — Font |

---

## Что сделано отлично

Проект демонстрирует высокий уровень внимания к качеству:

- Централизованный SEO через `lib/metadata.ts` с валидацией длин title/description в dev-режиме
- Полный набор JSON-LD схем (5 типов) с типобезопасным API
- Web Vitals мониторинг с автоматической отправкой в GA4
- Security headers в `next.config.js` (X-Frame-Options, CSP, Referrer-Policy)
- Блокировка AI-краулеров в `robots.ts`
- WCAG-совместимые ARIA-атрибуты, `role`, `aria-label` во всех компонентах
- `prefers-reduced-motion` в анимациях
- Safe Area поддержка для iOS
- Строгая TypeScript типизация без единого `any`
