'use client';

import { useState } from 'react';
import {
  UtensilsCrossed,
  Sun,
  Moon,
  Coffee,
  Flame,
  Leaf,
  Droplets,
  Apple,
  ChevronDown,
  ChevronUp,
  Clock,
  ChefHat,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MealItem {
  name: string;
  amount: string;
  calories: string;
  tags: string[];
}

interface MealSlot {
  type: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  meals: MealItem[];
  totalCalories: string;
  tip: string;
}

const mealPlan: MealSlot[] = [
  {
    type: '早餐',
    time: '07:00 - 08:00',
    icon: Sun,
    meals: [
      { name: '红枣小米粥', amount: '1碗 (250ml)', calories: '180kcal', tags: ['健脾', '养胃'] },
      { name: '水煮鸡蛋', amount: '1个', calories: '75kcal', tags: ['蛋白质'] },
      { name: '凉拌黄瓜', amount: '1小碟', calories: '30kcal', tags: ['清热', '利水'] },
    ],
    totalCalories: '285kcal',
    tip: '晨起先饮一杯温水，助脾胃苏醒',
  },
  {
    type: '午餐',
    time: '11:30 - 12:30',
    icon: ChefHat,
    meals: [
      { name: '山药排骨汤', amount: '1碗 (300ml)', calories: '320kcal', tags: ['补气', '强筋'] },
      { name: '清蒸鲈鱼', amount: '150g', calories: '180kcal', tags: ['高蛋白', '低脂'] },
      { name: '蒜蓉西兰花', amount: '200g', calories: '85kcal', tags: ['抗氧化', '膳食纤维'] },
      { name: '糙米饭', amount: '1碗 (150g)', calories: '170kcal', tags: ['粗粮', 'B族维生素'] },
    ],
    totalCalories: '755kcal',
    tip: '午餐宜饱，细嚼慢咽助消化',
  },
  {
    type: '下午茶',
    time: '15:00 - 15:30',
    icon: Coffee,
    meals: [
      { name: '枸杞菊花茶', amount: '1杯 (200ml)', calories: '15kcal', tags: ['明目', '清肝'] },
      { name: '原味坚果', amount: '一小把 (20g)', calories: '120kcal', tags: ['好脂肪', '维生素E'] },
    ],
    totalCalories: '135kcal',
    tip: '午后小憩15分钟，恢复精力',
  },
  {
    type: '晚餐',
    time: '18:00 - 19:00',
    icon: Moon,
    meals: [
      { name: '番茄豆腐汤', amount: '1碗 (250ml)', calories: '120kcal', tags: ['清热', '补钙'] },
      { name: '白灼虾', amount: '100g', calories: '90kcal', tags: ['高蛋白', '锌'] },
      { name: '清炒时蔬', amount: '200g', calories: '60kcal', tags: ['膳食纤维', '维生素'] },
    ],
    totalCalories: '270kcal',
    tip: '晚餐宜清淡，七分饱即可',
  },
];

const nutritionSummary = {
  totalCalories: '1445kcal',
  protein: '72g',
  carbs: '185g',
  fat: '42g',
  fiber: '28g',
};

export default function MealPage() {
  const [expandedSlot, setExpandedSlot] = useState<number | null>(0);

  const toggleSlot = (index: number) => {
    setExpandedSlot(expandedSlot === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-6 space-y-6">
      {/* 页面标题 */}
      <div className="card-warm p-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <UtensilsCrossed className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-serif-cn text-xl font-bold">今日食方</h1>
              <p className="text-xs text-muted-foreground">基于你的体质与节气定制</p>
            </div>
          </div>
          <div className="badge-season">
            <Flame className="h-3.5 w-3.5" />
            大暑 · 清热祛湿
          </div>
        </div>
      </div>

      {/* 营养总览 */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: '总热量', value: nutritionSummary.totalCalories, icon: Flame, color: 'text-accent' },
          { label: '蛋白质', value: nutritionSummary.protein, icon: Apple, color: 'text-primary' },
          { label: '碳水', value: nutritionSummary.carbs, icon: Leaf, color: 'text-chart-4' },
          { label: '脂肪', value: nutritionSummary.fat, icon: Droplets, color: 'text-chart-5' },
          { label: '膳食纤维', value: nutritionSummary.fiber, icon: Star, color: 'text-chart-3' },
        ].map((item) => (
          <div key={item.label} className="card-warm p-3 text-center">
            <item.icon className={cn('h-4 w-4 mx-auto mb-1', item.color)} />
            <p className="text-lg font-bold text-foreground">{item.value}</p>
            <p className="text-xs text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>

      {/* 餐食详情 */}
      <div className="space-y-3">
        {mealPlan.map((slot, index) => {
          const isExpanded = expandedSlot === index;
          const Icon = slot.icon;
          return (
            <div key={slot.type} className="card-warm overflow-hidden">
              <button
                onClick={() => toggleSlot(index)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/8">
                    <Icon className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{slot.type}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {slot.time}
                      <span className="mx-1">·</span>
                      <span>{slot.totalCalories}</span>
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 border-t border-border/40 pt-3">
                  {slot.meals.map((meal) => (
                    <div
                      key={meal.name}
                      className="flex items-center justify-between py-2 border-b border-border/20 last:border-0"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{meal.name}</span>
                          <span className="text-xs text-muted-foreground">{meal.amount}</span>
                        </div>
                        <div className="flex gap-1.5 mt-1">
                          {meal.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-1.5 py-0.5 rounded bg-primary/6 text-primary/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground ml-3">{meal.calories}</span>
                    </div>
                  ))}
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/5 border border-accent/10">
                    <Leaf className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <p className="text-xs text-foreground/80">{slot.tip}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
