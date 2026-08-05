'use client';

import { useState, useEffect } from 'react';
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

interface HistoryEntry {
  date: string;
  sleep: number;
  energy: number;
  digestion: number;
  mood: number;
  weight: number;
}

// Generate history data based on user profile
function generateHistoryData(profile: UserProfile | null): HistoryEntry[] {
  if (!profile) return [];

  const baseWeight = parseFloat(profile.weight) || 65;
  const baseSleep = parseFloat(profile.sleepHours) || 7;
  const baseEnergy = parseInt(profile.energyLevel) || 6;
  const baseDigestion = profile.digestion === '良好' ? 4 : profile.digestion === '一般' ? 3 : 2;
  const baseMood = profile.mood === '非常好' ? 4 : profile.mood === '一般' ? 3 : 2;

  const today = new Date();
  const data: HistoryEntry[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;

    // Add some realistic variation
    const variation = () => (Math.random() - 0.5) * 2;

    data.push({
      date: dateStr,
      sleep: Math.max(4, Math.min(10, baseSleep + variation())),
      energy: Math.max(1, Math.min(10, Math.round(baseEnergy + variation() * 2))),
      digestion: Math.max(1, Math.min(5, Math.round(baseDigestion + variation()))),
      mood: Math.max(1, Math.min(5, Math.round(baseMood + variation()))),
      weight: parseFloat((baseWeight + variation() * 0.5 - (i * 0.05)).toFixed(1)),
    });
  }

  return data;
}

// Generate factors based on user profile
function generateFactors(profile: UserProfile | null, historyData: HistoryEntry[]) {
  if (!profile || historyData.length === 0) return [];

  const avgSleep = (historyData.reduce((sum, d) => sum + d.sleep, 0) / historyData.length).toFixed(1);
  const avgEnergy = (historyData.reduce((sum, d) => sum + d.energy, 0) / historyData.length).toFixed(1);
  const avgDigestion = (historyData.reduce((sum, d) => sum + d.digestion, 0) / historyData.length).toFixed(1);
  const avgMood = (historyData.reduce((sum, d) => sum + d.mood, 0) / historyData.length).toFixed(1);

  const sleepTrend = historyData[historyData.length - 1].sleep > historyData[0].sleep ? 'up' : 
                     historyData[historyData.length - 1].sleep < historyData[0].sleep ? 'down' : 'stable';
  const energyTrend = historyData[historyData.length - 1].energy > historyData[0].energy ? 'up' : 
                      historyData[historyData.length - 1].energy < historyData[0].energy ? 'down' : 'stable';
  const digestionTrend = historyData[historyData.length - 1].digestion > historyData[0].digestion ? 'up' : 
                         historyData[historyData.length - 1].digestion < historyData[0].digestion ? 'down' : 'stable';
  const moodTrend = historyData[historyData.length - 1].mood > historyData[0].mood ? 'up' : 
                    historyData[historyData.length - 1].mood < historyData[0].mood ? 'down' : 'stable';

  const getSleepSuggestion = () => {
    const hours = parseFloat(avgSleep);
    if (hours < 6) return '睡眠不足，建议23:00前入睡，可尝试睡前泡脚或冥想';
    if (hours < 7) return '睡眠略短，可尝试午间小憩20分钟补充精力';
    if (hours > 9) return '睡眠过长，可能影响气血运行，建议适当早起';
    return '睡眠时长良好，继续保持规律作息';
  };

  const getEnergySuggestion = () => {
    const energy = parseFloat(avgEnergy);
    if (energy < 5) return '精力偏低，建议增加优质蛋白摄入，适当补充B族维生素';
    if (energy < 7) return '精力尚可，午后易疲倦可饮用红枣桂圆茶提神';
    return '精力充沛，说明当前饮食与作息搭配合理';
  };

  const getDigestionSuggestion = () => {
    if (profile.digestion === '胀气') return '易胀气，建议减少产气食物（豆类、碳酸饮料），增加健脾理气食材如陈皮、砂仁';
    if (profile.digestion === '便秘') return '有便秘倾向，建议增加膳食纤维摄入，多饮水，可食用火龙果、蜂蜜水';
    if (profile.digestion === '腹泻') return '消化偏弱，建议避免生冷寒凉，多食温性食材如山药、生姜';
    return '消化状态良好，继续保持饮食规律';
  };

  const getMoodSuggestion = () => {
    if (profile.mood === '低落' || profile.mood === '焦虑') return '情绪波动时，建议增加富含色氨酸的食物（香蕉、牛奶、坚果），适当户外运动';
    if (profile.mood === '一般') return '情绪平稳，可尝试玫瑰花茶疏肝解郁';
    return '情绪状态良好，保持心情愉悦有助于气血调和';
  };

  return [
    {
      category: '睡眠',
      icon: Moon,
      trend: sleepTrend as 'up' | 'down' | 'stable',
      avg: `${avgSleep}h`,
      change: sleepTrend === 'up' ? '+0.3h' : sleepTrend === 'down' ? '-0.2h' : '持平',
      detail: `基于你填写的睡眠时长${profile.sleepHours}小时、睡眠质量${profile.sleepQuality}分，结合本周趋势分析`,
      suggestion: getSleepSuggestion(),
      color: 'text-chart-3',
      bgColor: 'bg-chart-3/10',
    },
    {
      category: '精力',
      icon: Activity,
      trend: energyTrend as 'up' | 'down' | 'stable',
      avg: `${avgEnergy}/10`,
      change: energyTrend === 'up' ? '+1' : energyTrend === 'down' ? '-1' : '持平',
      detail: `基于你填写的精力值${profile.energyLevel}/10，结合训练频率"${profile.trainingFreq}"分析`,
      suggestion: getEnergySuggestion(),
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      category: '消化',
      icon: Droplets,
      trend: digestionTrend as 'up' | 'down' | 'stable',
      avg: `${avgDigestion}/5`,
      change: digestionTrend === 'up' ? '+0.5' : digestionTrend === 'down' ? '-0.5' : '持平',
      detail: `基于你选择的消化状态"${profile.digestion}"，结合饮食偏好分析`,
      suggestion: getDigestionSuggestion(),
      color: 'text-chart-5',
      bgColor: 'bg-chart-5/10',
    },
    {
      category: '情绪',
      icon: Brain,
      trend: moodTrend as 'up' | 'down' | 'stable',
      avg: `${avgMood}/5`,
      change: moodTrend === 'up' ? '+0.5' : moodTrend === 'down' ? '-0.5' : '持平',
      detail: `基于你选择的情绪"${profile.mood}"，结合睡眠质量综合分析`,
      suggestion: getMoodSuggestion(),
      color: 'text-chart-4',
      bgColor: 'bg-chart-4/10',
    },
  ];
}

// Generate insights based on user profile
function generateInsights(profile: UserProfile | null) {
  if (!profile) return [];

  const insights = [];

  // BMI calculation
  const height = parseFloat(profile.height) / 100;
  const weight = parseFloat(profile.weight);
  if (height && weight) {
    const bmi = weight / (height * height);
    if (bmi < 18.5) {
      insights.push({
        title: '体重偏轻',
        desc: `BMI ${bmi.toFixed(1)}，低于正常范围。建议增加优质蛋白和碳水摄入，配合力量训练增肌`,
        severity: 'medium' as const,
      });
    } else if (bmi >= 24 && bmi < 28) {
      insights.push({
        title: '体重略超',
        desc: `BMI ${bmi.toFixed(1)}，处于超重范围。建议控制总热量，增加有氧运动，选择低GI食物`,
        severity: 'medium' as const,
      });
    } else if (bmi >= 28) {
      insights.push({
        title: '需要减重',
        desc: `BMI ${bmi.toFixed(1)}，建议调整饮食结构，减少精制碳水和油脂，增加蔬菜摄入`,
        severity: 'high' as const,
      });
    } else {
      insights.push({
        title: '体重正常',
        desc: `BMI ${bmi.toFixed(1)}，处于健康范围，继续保持当前饮食与运动习惯`,
        severity: 'low' as const,
      });
    }
  }

  // Training frequency insight
  if (profile.trainingFreq === '不运动') {
    insights.push({
      title: '缺乏运动',
      desc: '久坐不动会影响气血运行和代谢，建议每日步行6000步以上，或进行轻度拉伸',
      severity: 'medium' as const,
    });
  } else if (profile.trainingFreq === '高强度') {
    insights.push({
      title: '训练强度较高',
      desc: '高强度训练后需增加蛋白质和碳水补充，注意补充水分和电解质',
      severity: 'low' as const,
    });
  }

  // Sleep quality insight
  const sleepQuality = parseInt(profile.sleepQuality);
  if (sleepQuality <= 2) {
    insights.push({
      title: '睡眠质量待改善',
      desc: '睡眠质量偏低，建议睡前1小时避免使用电子设备，可尝试泡脚、冥想助眠',
      severity: 'high' as const,
    });
  } else if (sleepQuality >= 4) {
    insights.push({
      title: '睡眠质量良好',
      desc: '睡眠质量优秀，说明作息规律，继续保持',
      severity: 'low' as const,
    });
  }

  // Allergy insight
  if (profile.allergies && profile.allergies.trim()) {
    insights.push({
      title: '过敏原已记录',
      desc: `已标记过敏原"${profile.allergies}"，系统会在食谱推荐中自动避开相关食材`,
      severity: 'low' as const,
    });
  }

  return insights;
}

export default function HistoryPage() {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [historyData, setHistoryData] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    // Read user profile from localStorage
    const stored = localStorage.getItem('userProfile');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfile(parsed);
        setHistoryData(generateHistoryData(parsed));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  const factors = generateFactors(profile, historyData);
  const insights = generateInsights(profile);

  const maxWeight = historyData.length > 0 ? Math.max(...historyData.map((d) => d.weight)) : 70;
  const minWeight = historyData.length > 0 ? Math.min(...historyData.map((d) => d.weight)) : 60;

  if (!profile) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
        <div className="card-warm p-8 text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
          <h2 className="font-serif-cn text-lg font-bold">暂无数据</h2>
          <p className="text-sm text-muted-foreground">
            请先在首页填写健康档案并生成营养方案后，再查看影响因子分析
          </p>
        </div>
      </div>
    );
  }

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
            <p className="text-xs text-muted-foreground">基于你的健康档案追踪趋势与食养效果</p>
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

      {/* 用户档案摘要 */}
      <div className="card-warm p-4">
        <h3 className="text-sm font-medium text-foreground mb-3">你的健康档案</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2 rounded-lg bg-muted/50">
            <span className="text-muted-foreground">年龄</span>
            <p className="font-medium">{profile.age}岁</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50">
            <span className="text-muted-foreground">性别</span>
            <p className="font-medium">{profile.gender}</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50">
            <span className="text-muted-foreground">身高/体重</span>
            <p className="font-medium">{profile.height}cm / {profile.weight}kg</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50">
            <span className="text-muted-foreground">目标</span>
            <p className="font-medium">{profile.fitnessGoal}</p>
          </div>
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
          {insights.length > 0 ? (
            insights.map((insight) => (
              <div
                key={insight.title}
                className={cn(
                  'flex items-start gap-3 p-3 rounded-xl border',
                  insight.severity === 'high'
                    ? 'bg-destructive/5 border-destructive/20'
                    : insight.severity === 'medium'
                    ? 'bg-accent/5 border-accent/20'
                    : 'bg-primary/5 border-primary/20'
                )}
              >
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                    insight.severity === 'high'
                      ? 'bg-destructive/10'
                      : insight.severity === 'medium'
                      ? 'bg-accent/10'
                      : 'bg-primary/10'
                  )}
                >
                  {insight.severity === 'high' ? (
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  ) : (
                    <Activity className={cn('h-4 w-4', insight.severity === 'medium' ? 'text-accent' : 'text-primary')} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{insight.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{insight.desc}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">暂无洞察数据</p>
          )}
        </div>
      </div>
    </div>
  );
}
