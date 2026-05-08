"use client";

import { useReportWebVitals } from "next/web-vitals";
import { handleWebVitals } from "@/utils/webVitals";

/**
 * WebVitalsProvider — App Router-compatible web vitals reporting.
 *
 * useReportWebVitals is the correct hook for App Router.
 * The legacy `export function reportWebVitals` from next/app
 * is Pages Router only and may generate console warnings in App Router.
 */
export default function WebVitalsProvider() {
  useReportWebVitals((metric) => {
    handleWebVitals(metric);
  });

  return null;
}
