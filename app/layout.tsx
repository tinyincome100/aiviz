import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 가시성 감사 | 강남 피부과·성형외과 AI 노출 분석",
  description:
    "ChatGPT·Perplexity에서 강남 피부과 867개 중 61개(7%)만 추천됩니다. 귀원은 어느 쪽인가요? 무료 현황 리포트를 신청하세요.",
  openGraph: {
    title: "AI 가시성 감사 — 귀원은 AI에서 보이나요?",
    description: "강남·서초 867개 병원 AI 노출 분석. 무료 1페이지 리포트 신청.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <script src="https://pmftracker-worker.factorygo-dev.workers.dev/ga4.js" />
      </head>
      <body className="min-h-full" style={{ background: "var(--bg)", color: "var(--text)" }}>
        {children}
      </body>
    </html>
  );
}
