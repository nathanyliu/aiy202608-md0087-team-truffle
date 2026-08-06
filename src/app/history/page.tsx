'use client';

import { useState, useEffect } from 'react';
import {
  Calendar,
  Activity,
  Moon,
  Brain,
  Droplets,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserProfile {
  age: string;
  gender: string;
  height: string;
  weight: string;
  fitnessGoal: string;
  trainingFreq: string;
  allergies: string;
  sleepHours: string;
  sleepQuality: string;
  energyLevel: string;
  muscleSoreness: string;
  digestion: string;
  mood: string;
  todayTraining: string;
  notes: string;
}

interface TodayData {
  date: string;
  sleep: number;
  energy: number;
  digestion: number;
  mood: number;
  weight: number;
}

// Get today's data from user profile
function getTodayData(profile: UserProfile | null): TodayData | null {
  if (!profile) return null;

  const today = new Date();
  const dateStr = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;

  const digestionMap: Record<string, number> = { '良好': 4, '一般': 3, '胀气': 2, '便秘': 2, '腹泻': 1 };
  const moodMap: Record<string, number> = { '非常好': 4, '一般': 3, '低落': 2, '焦虑': 1 };

  return {
    date: dateStr,
    sleep: parseFloat(profile.sleepHours) || 0,
    energy: parseInt(profile.energyLevel) || 0,
    digestion: digestionMap[profile.digestion] || 3,
    mood: moodMap[profile.mood] || 3,
    weight: parseFloat(profile.weight) || 0,
  };
}

// Generate factors based on today's data
function generateFactors(profile: UserProfile | null, todayData: TodayData | null) {
  if (!profile || !todayData) return [];

  const factors = [];

  // Sleep factor
  const sleepHours = todayData.sleep;
  let sleepTrend: 'up' | 'down' | 'stable' = 'stable';
  let sleepSuggestion = '';
  
  if (sleepHours < 6) {
    sleepTrend = 'down';
    sleepSuggestion = '睡眠不足，建议23:00前入睡，可尝试睡前泡脚或冥想';
  } else if (sleepHours >= 7 && sleepHours <= 9) {
    sleepTrend = 'up';
    sleepSuggestion = '睡眠时长理想，继续保持规律作息';
  } else {
    sleepTrend = 'stable';
    sleepSuggestion = '睡眠时长适中，注意保持规律';
  }

  factors.push({
    icon: Moon,
    label: '睡眠',
    value: `${sleepHours}小时`,
    trend: sleepTrend,
    suggestion: sleepSuggestion,
  });

  // Energy factor
  const energy = todayData.energy;
  let energyTrend: 'up' | 'down' | 'stable' = 'stable';
  let energySuggestion = '';

  if (energy <= 3) {
    energyTrend = 'down';
    energySuggestion = '精力偏低，建议增加优质蛋白和复合碳水摄入';
  } else if (energy >= 7) {
    energyTrend = 'up';
    energySuggestion = '精力充沛，代谢状态良好';
  } else {
    energyTrend = 'stable';
    energySuggestion = '精力中等，可通过适量运动提升';
  }

  factors.push({
    icon: Activity,
    label: '精力',
    value: `${energy}/10`,
    trend: energyTrend,
    suggestion: energySuggestion,
  });

  // Digestion factor
  const digestion = todayData.digestion;
  let digestionTrend: 'up' | 'down' | 'stable' = 'stable';
  let digestionSuggestion = '';

  if (digestion <= 2) {
    digestionTrend = 'down';
    digestionSuggestion = '消化功能偏弱，建议少食多餐，避免生冷油腻';
  } else if (digestion >= 4) {
    digestionTrend = 'up';
    digestionSuggestion = '消化状态良好，肠胃功能正常';
  } else {
    digestionTrend = 'stable';
    digestionSuggestion = '消化一般，可适量增加膳食纤维';
  }

  factors.push({
    icon: Droplets,
    label: '消化',
    value: digestion >= 4 ? '良好' : digestion >= 3 ? '一般' : '偏弱',
    trend: digestionTrend,
    suggestion: digestionSuggestion,
  });

  // Mood factor
  const mood = todayData.mood;
  let moodTrend: 'up' | 'down' | 'stable' = 'stable';
  let moodSuggestion = '';

  if (mood <= 2) {
    moodTrend = 'down';
    moodSuggestion = '情绪偏低，可尝试舒缓运动或冥想放松';
  } else if (mood >= 4) {
    moodTrend = 'up';
    moodSuggestion = '情绪良好，身心状态佳';
  } else {
    moodTrend = 'stable';
    moodSuggestion = '情绪平稳，保持积极心态';
  }

  factors.push({
    icon: Brain,
    label: '情绪',
    value: mood >= 4 ? '良好' : mood >= 3 ? '平稳' : '偏低',
    trend: moodTrend,
    suggestion: moodSuggestion,
  });

  return factors;
}

export default function HistoryPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [todayData, setTodayData] = useState<TodayData | null>(null);
  const [factors, setFactors] = useState<ReturnType<typeof generateFactors>>([]);

  useEffect(() => {
    const stored = localStorage.getItem('userProfile');
    if (stored) {
      const parsed = JSON.parse(stored);
      setProfile(parsed);
      const data = getTodayData(parsed);
      setTodayData(data);
      setFactors(generateFactors(parsed, data));
    }
  }, []);

  const hasData = todayData !== null && todayData.sleep > 0;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-6">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Calendar className="h-4 w-4" />
            <span className="text-xs font-medium">今日记录</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            影响因子
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            追踪影响健康的关键因素
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        {!hasData ? (
          // No data state
          <div className="bg-card rounded-2xl p-8 text-center border border-border/50">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
              今日暂无数据
            </h3>
            <p className="text-sm text-muted-foreground">
              请先在首页填写健康档案和今日反馈
            </p>
          </div>
        ) : (
          <>
            {/* Today's Summary */}
            <div className="bg-card rounded-2xl p-5 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-lg font-semibold text-foreground">
                  今日数据
                </h2>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                  {todayData?.date}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/30 rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">睡眠</div>
                  <div className="text-xl font-bold text-foreground">{todayData?.sleep}h</div>
                </div>
                <div className="bg-secondary/30 rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">精力</div>
                  <div className="text-xl font-bold text-foreground">{todayData?.energy}/10</div>
                </div>
                <div className="bg-secondary/30 rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">体重</div>
                  <div className="text-xl font-bold text-foreground">{todayData?.weight}kg</div>
                </div>
                <div className="bg-secondary/30 rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">消化</div>
                  <div className="text-xl font-bold text-foreground">
                    {todayData?.digestion && todayData.digestion >= 4 ? '良好' : todayData?.digestion && todayData.digestion >= 3 ? '一般' : '偏弱'}
                  </div>
                </div>
              </div>
            </div>

            {/* Factor Cards */}
            <div className="space-y-4">
              {factors.map((factor, index) => {
                const Icon = factor.icon;
                return (
                  <div
                    key={index}
                    className="bg-card rounded-2xl p-5 border border-border/50"
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                        factor.trend === 'up' ? 'bg-green-100 text-green-600' :
                        factor.trend === 'down' ? 'bg-red-100 text-red-600' :
                        'bg-secondary text-muted-foreground'
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{factor.label}</span>
                          <span className="text-sm font-bold text-foreground">{factor.value}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {factor.suggestion}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note */}
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 leading-relaxed">
                  本页面仅显示今日已提交的数据。其他日期未提交数据时显示为空白。持续记录可帮助AI更精准地为您定制食养方案。
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
