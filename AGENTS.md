# AGENTS.md - 优基食养小厨房

## 项目概览

「优基食养小厨房」是一个基于时令节气与个人体质的智能食养健康管理应用，主打"每天一张会思考的餐单"。

## 技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI**: shadcn/ui (Radix UI)
- **Styling**: Tailwind CSS 4
- **Icons**: lucide-react

## 目录结构

```
src/
├── app/
│   ├── layout.tsx          # 根布局（含导航）
│   ├── page.tsx            # 首页（健康档案 + 今日反馈 + 舌像上传）
│   ├── globals.css         # 全局样式 + 食养主题 tokens
│   ├── meal/page.tsx       # 今日食方（每日餐单 + 营养分析 + 补充推荐）
│   ├── history/page.tsx    # 影响因子（健康趋势追踪）
│   ├── map/page.tsx        # 食养地图（产地溯源）
│   └── circle/page.tsx     # 食方社区（用户分享食谱 + 加入今日食方）
├── components/
│   ├── site-header.tsx     # 全局导航头
│   └── ui/                 # shadcn/ui 组件库
└── lib/
    └── utils.ts            # 通用工具函数
```

## 设计规范

- 设计风格：草本温润、时令食养、东方养生美学
- 主色：草本绿 `oklch(0.55 0.12 145)`
- 辅色：陶土橙 `oklch(0.65 0.15 55)`
- 点缀色：琥珀金 `oklch(0.75 0.13 85)`
- 标题字体：Noto Serif SC（衬线体）
- 详见 `DESIGN.md`

## 开发命令

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务器
pnpm lint         # ESLint 检查
pnpm ts-check     # TypeScript 类型检查
```

## 注意事项

- 所有页面目前使用客户端组件（'use client'），数据为模拟数据
- 如需持久化数据，需接入后端 API 和数据库
- 节气信息基于当前日期动态计算
- 图片上传使用 FileReader 本地预览，未接入存储服务
