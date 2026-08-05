import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: '优基食养小厨房',
  description: '每天一张会思考的餐单 — 基于时令节气与个人体质的智能食养方案',
  keywords: ['食养', '食疗', '养生', '节气', '健康饮食', '中医食疗'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-background text-foreground antialiased min-h-screen">
        <SiteHeader />
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </body>
    </html>
  );
}
