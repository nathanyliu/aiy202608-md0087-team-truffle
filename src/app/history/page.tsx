'use client';

import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Activity,
  Moon,
  Brain,
  Droplets,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// 模拟历史数据
const historyData = [
  { date: '08/01', sleep: 7, energy: 6, digestion: 4, mood: 3, weight: 68.5 },
  { date: '08/02', sleep: 6, energy: 5, digestion: 3, mood: 3, weight: 68.3 },
  { date: '08/03', sleep: 8, energy: 7, digestion: 5, mood: 4, weight: 68.1 },
  { date: '08/04', sleep: 7, energy: 8, digestion: 4, mood: 4, weight: 68.0 },
  { date: '08/05', sleep: 6, energy: 6, digestion: 3, mood: 2, weight: 68.2 },
  { date: '08/06', sleep: 8, energy: 7, digestion: 5, mood: 4, weight: 67.8 },
  { date: '08/07', sleep: 7, energy: 6, digestion: 4, mood: 3, weight: 67.9 },
];

const factors = [
  {
    category: '睡眠',
    icon: Moon,
    trend: 'up' as const,
    avg: '7.1h',
    change: '+0.3h',
    detail: '本周睡眠质量提升，深度睡眠占比增加',
    suggestion: '继续保持23:00前入睡，可尝试睡前冥想',
    color: 'text-chart-3',
    bgColor: 'bg-chart-3/10',
  },
  {
    category: '精力',
    icon: Activity,
    trend: 'stable' as const,
    avg: '6.4/10',
    change: '持平',
    detail: '午后精力波动较大，与午餐碳水摄入相关',
    suggestion: '午餐减少精制碳水，增加优质蛋白',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    category: '消化',
    icon: Droplets,
    trend: 'down' as const,
    avg: '3.9/5',
    change: '-0.5',
    detail: '周三出现胀气，可能与生冷食物摄入有关',
    suggestion: '大暑时节忌寒凉，建议多食温性食材如生姜、山药',
    color: 'text-chart-5',
    bgColor: 'bg-chart-5/10',
  },
  {
    category: '情绪',
    icon: Brain,
    trend: 'stable' as const,
    avg: '3.3/5',
    change: '+0.1',
    detail: '整体情绪平稳，周末略有低落',
    suggestion: '适当增加户外活动，晒太阳促进血清素分泌',
    color: 'text-chart-4',
    bgColor: 'bg-chart-4/10',
  },
];

const insights = [
  {
    title: '湿热体质倾向',
    desc: '近期舌象偏红、苔腻，结合大暑节气湿热特征，建议增加薏米、赤小豆等祛湿食材',
    severity: 'medium',
  },
  {
    title: '蛋白质摄入不足',
    desc: '本周蛋白质摄入低于目标值15%，建议每餐增加一份优质蛋白（鱼/蛋/豆腐）',
    severity: 'high',
  },
  {
    title: '作息规律改善',
    desc: '本周入睡时间提前至23:00前，生物钟趋于稳定，继续保持',
    severity: 'low',
  },
];

export default function HistoryPage() {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const maxWeight = Math.max(...historyData.map((d) => d.weight));
  const minWeight = Math.min(...historyData.map((d) => d.weight));

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 space-y-6">
      {/* 页面标题 */}
      <div className="card-warm p-5 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-serif-cn text-xl font-bold">影响因子</h1>
            <p className="text-xs text-muted-foreground">追踪你的健康趋势与食养效果</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedWeek(Math.max(0, selectedWeek - 1))}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
          <span className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            本周
          </span>
          <button
            onClick={() => setSelectedWeek(selectedWeek + 1)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* 体重趋势图 */}
      <div className="card-warm p-5">
        <h3 className="text-sm font-medium text-foreground mb-4">体重趋势 (kg)</h3>
        <div className="flex items-end justify-between gap-2 h-32">
          {historyData.map((d, i) => {
            const range = maxWeight - minWeight || 1;
            const height = ((d.weight - minWeight) / range) * 80 + 20;
            return (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground">{d.weight}</span>
                <div
                  className={cn(
                    'w-full max-w-[40px] rounded-t-md transition-all duration-500',
                    i === historyData.length - 1 ? 'bg-primary' : 'bg-primary/30'
                  )}
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-muted-foreground">{d.date}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 因子卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {factors.map((factor) => {
          const Icon = factor.icon;
          const TrendIcon =
            factor.trend === 'up' ? TrendingUp : factor.trend === 'down' ? TrendingDown : Minus;
          return (
            <div key={factor.category} className="card-warm p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg', factor.bgColor)}>
                    <Icon className={cn('h-4 w-4', factor.color)} />
                  </div>
                  <span className="font-medium text-foreground">{factor.category}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendIcon className={cn('h-3.5 w-3.5', factor.color)} />
                  <span className={cn('text-xs font-medium', factor.color)}>{factor.change}</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">{factor.avg}</span>
                <span className="text-xs text-muted-foreground">本周均值</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{factor.detail}</p>
              <div className="flex items-start gap-1.5 p-2 rounded-lg bg-primary/5">
                <span className="text-xs text-primary/80 leading-relaxed">💡 {factor.suggestion}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 智能洞察 */}
      <div className="card-warm p-5 space-y-4">
        <h3 className="font-serif-cn text-base font-bold flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          本周智能洞察
        </h3>
        <div className="space-y-3">
          {insights.map((insight) => (
            <div
              key={insight.title}
              className={cn(
                'flex items-start gap-3 p-3 rounded-lg border',
                insight.severity === 'high'
                  ? 'border-destructive/20 bg-destructive/5'
                  : insight.severity === 'medium'
                  ? 'border-accent/20 bg-accent/5'
                  : 'border-primary/20 bg-primary/5'
              )}
            >
              <div
                className={cn(
                  'h-2 w-2 rounded-full mt-1.5 shrink-0',
                  insight.severity === 'high'
                    ? 'bg-destructive'
                    : insight.severity === 'medium'
                    ? 'bg-accent'
                    : 'bg-primary'
                )}
              />
              <div>
                <h4 className="text-sm font-medium text-foreground">{insight.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{insight.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
