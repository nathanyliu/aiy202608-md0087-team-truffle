'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  Sparkles,
  Heart,
  Activity,
  Brain,
  Shield,
  TrendingUp,
  Cherry,
  CupSoda,
  BookOpen,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecipeStep {
  step: number;
  desc: string;
}

interface MealItem {
  name: string;
  amount: string;
  calories: string;
  tags: string[];
  recipe?: {
    ingredients: { name: string; amount: string }[];
    steps: RecipeStep[];
    tips?: string;
  };
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
      {
        name: '红枣小米粥',
        amount: '1碗 (250ml)',
        calories: '180kcal',
        tags: ['健脾', '养胃'],
        recipe: {
          ingredients: [
            { name: '小米', amount: '80g' },
            { name: '红枣', amount: '5颗' },
            { name: '清水', amount: '500ml' },
            { name: '冰糖', amount: '适量（可选）' },
          ],
          steps: [
            { step: 1, desc: '小米淘洗干净，红枣洗净去核' },
            { step: 2, desc: '锅中加水烧开，放入小米大火煮沸' },
            { step: 3, desc: '转小火慢煮20分钟，加入红枣继续煮10分钟' },
            { step: 4, desc: '粥变得浓稠即可，喜甜可加少许冰糖' },
          ],
          tips: '小米提前浸泡30分钟可缩短煮制时间，粥更绵密',
        },
      },
      {
        name: '水煮鸡蛋',
        amount: '1个',
        calories: '75kcal',
        tags: ['蛋白质'],
        recipe: {
          ingredients: [
            { name: '鸡蛋', amount: '1个' },
            { name: '清水', amount: '适量' },
          ],
          steps: [
            { step: 1, desc: '鸡蛋洗净，放入锅中加冷水没过鸡蛋' },
            { step: 2, desc: '大火煮开后转中小火煮8分钟' },
            { step: 3, desc: '关火后放入冷水中浸泡2分钟，便于剥壳' },
          ],
          tips: '溏心蛋煮6分钟，全熟蛋煮8-10分钟',
        },
      },
      {
        name: '凉拌黄瓜',
        amount: '1小碟',
        calories: '30kcal',
        tags: ['清热', '利水'],
        recipe: {
          ingredients: [
            { name: '黄瓜', amount: '1根' },
            { name: '蒜末', amount: '2瓣' },
            { name: '生抽', amount: '1勺' },
            { name: '香醋', amount: '1勺' },
            { name: '香油', amount: '少许' },
          ],
          steps: [
            { step: 1, desc: '黄瓜洗净，拍碎后切成小段' },
            { step: 2, desc: '蒜切末，与生抽、香醋、香油调成酱汁' },
            { step: 3, desc: '将酱汁淋在黄瓜上，拌匀即可' },
          ],
          tips: '拍黄瓜比切黄瓜更入味，冷藏后口感更佳',
        },
      },
    ],
    totalCalories: '285kcal',
    tip: '晨起先饮一杯温水，助脾胃苏醒',
  },
  {
    type: '午餐',
    time: '11:30 - 12:30',
    icon: ChefHat,
    meals: [
      {
        name: '山药排骨汤',
        amount: '1碗 (300ml)',
        calories: '320kcal',
        tags: ['补气', '强筋'],
        recipe: {
          ingredients: [
            { name: '排骨', amount: '300g' },
            { name: '山药', amount: '200g' },
            { name: '姜片', amount: '3片' },
            { name: '枸杞', amount: '10粒' },
            { name: '盐', amount: '适量' },
          ],
          steps: [
            { step: 1, desc: '排骨冷水下锅焯水，撇去浮沫后捞出洗净' },
            { step: 2, desc: '山药去皮切滚刀块，泡水防氧化' },
            { step: 3, desc: '砂锅加清水，放入排骨、姜片大火烧开' },
            { step: 4, desc: '转小火炖40分钟，加入山药继续炖20分钟' },
            { step: 5, desc: '出锅前加入枸杞，加盐调味即可' },
          ],
          tips: '山药后放可保持口感，过早加入易煮烂',
        },
      },
      {
        name: '清蒸鲈鱼',
        amount: '150g',
        calories: '180kcal',
        tags: ['高蛋白', '低脂'],
        recipe: {
          ingredients: [
            { name: '鲈鱼', amount: '1条（约400g）' },
            { name: '葱丝', amount: '适量' },
            { name: '姜丝', amount: '适量' },
            { name: '蒸鱼豉油', amount: '2勺' },
            { name: '料酒', amount: '1勺' },
          ],
          steps: [
            { step: 1, desc: '鲈鱼处理干净，两面划几刀，抹上料酒和少许盐腌10分钟' },
            { step: 2, desc: '鱼身下垫姜片，水开后上锅大火蒸8分钟' },
            { step: 3, desc: '蒸好后倒掉盘中汤汁，铺上葱丝姜丝' },
            { step: 4, desc: '淋上蒸鱼豉油，浇上热油激香即可' },
          ],
          tips: '蒸鱼时间不宜过长，8分钟刚好保持鱼肉嫩滑',
        },
      },
      {
        name: '蒜蓉西兰花',
        amount: '200g',
        calories: '85kcal',
        tags: ['抗氧化', '膳食纤维'],
        recipe: {
          ingredients: [
            { name: '西兰花', amount: '200g' },
            { name: '蒜末', amount: '3瓣' },
            { name: '盐', amount: '适量' },
            { name: '食用油', amount: '1勺' },
          ],
          steps: [
            { step: 1, desc: '西兰花切小朵，淡盐水浸泡10分钟后洗净' },
            { step: 2, desc: '锅中烧水，加少许盐，西兰花焯水1分钟捞出' },
            { step: 3, desc: '热锅凉油，爆香蒜末' },
            { step: 4, desc: '放入西兰花快速翻炒，加盐调味即可出锅' },
          ],
          tips: '焯水可去除草酸，保持翠绿色泽',
        },
      },
      {
        name: '糙米饭',
        amount: '1碗 (150g)',
        calories: '170kcal',
        tags: ['粗粮', 'B族维生素'],
        recipe: {
          ingredients: [
            { name: '糙米', amount: '100g' },
            { name: '清水', amount: '200ml' },
          ],
          steps: [
            { step: 1, desc: '糙米提前浸泡2小时（或冷藏浸泡过夜）' },
            { step: 2, desc: '将泡好的糙米放入电饭煲，加水' },
            { step: 3, desc: '选择糙米模式或煮饭模式，煮好后焖10分钟' },
          ],
          tips: '糙米提前浸泡可缩短煮制时间，口感更软糯',
        },
      },
    ],
    totalCalories: '755kcal',
    tip: '午餐宜饱，细嚼慢咽助消化',
  },
  {
    type: '下午茶',
    time: '15:00 - 15:30',
    icon: Coffee,
    meals: [
      {
        name: '枸杞菊花茶',
        amount: '1杯 (200ml)',
        calories: '15kcal',
        tags: ['明目', '清肝'],
        recipe: {
          ingredients: [
            { name: '菊花', amount: '5朵' },
            { name: '枸杞', amount: '10粒' },
            { name: '沸水', amount: '200ml' },
          ],
          steps: [
            { step: 1, desc: '菊花、枸杞用清水冲洗一遍' },
            { step: 2, desc: '放入杯中，冲入沸水' },
            { step: 3, desc: '盖上杯盖焖5分钟即可饮用' },
          ],
          tips: '可反复冲泡2-3次，味淡后更换新材料',
        },
      },
      {
        name: '原味坚果',
        amount: '一小把 (20g)',
        calories: '120kcal',
        tags: ['好脂肪', '维生素E'],
        recipe: {
          ingredients: [
            { name: '核桃', amount: '2颗' },
            { name: '杏仁', amount: '5粒' },
            { name: '腰果', amount: '3粒' },
          ],
          steps: [
            { step: 1, desc: '坚果去壳，混合均匀' },
            { step: 2, desc: '可直接食用，建议细嚼慢咽' },
          ],
          tips: '选择原味无盐坚果，每日摄入量控制在20-30g',
        },
      },
    ],
    totalCalories: '135kcal',
    tip: '午后小憩15分钟，恢复精力',
  },
  {
    type: '晚餐',
    time: '18:00 - 19:00',
    icon: Moon,
    meals: [
      {
        name: '番茄豆腐汤',
        amount: '1碗 (250ml)',
        calories: '120kcal',
        tags: ['清热', '补钙'],
        recipe: {
          ingredients: [
            { name: '番茄', amount: '1个' },
            { name: '嫩豆腐', amount: '150g' },
            { name: '葱花', amount: '适量' },
            { name: '盐', amount: '适量' },
            { name: '香油', amount: '少许' },
          ],
          steps: [
            { step: 1, desc: '番茄洗净切块，豆腐切小块' },
            { step: 2, desc: '锅中加少许油，放入番茄炒出汁' },
            { step: 3, desc: '加入适量清水烧开，放入豆腐' },
            { step: 4, desc: '小火煮5分钟，加盐调味，撒葱花淋香油即可' },
          ],
          tips: '番茄先炒可释放更多番茄红素',
        },
      },
      {
        name: '白灼虾',
        amount: '100g',
        calories: '90kcal',
        tags: ['高蛋白', '锌'],
        recipe: {
          ingredients: [
            { name: '鲜虾', amount: '150g' },
            { name: '姜片', amount: '2片' },
            { name: '葱段', amount: '2根' },
            { name: '料酒', amount: '1勺' },
            { name: '蘸料', amount: '生抽+姜末' },
          ],
          steps: [
            { step: 1, desc: '鲜虾剪去虾须，挑去虾线' },
            { step: 2, desc: '锅中加水，放入姜片、葱段、料酒烧开' },
            { step: 3, desc: '放入虾，煮至变红卷曲（约2分钟）捞出' },
            { step: 4, desc: '调蘸料：生抽+姜末，蘸食即可' },
          ],
          tips: '虾不宜煮太久，变红即熟，保持鲜嫩口感',
        },
      },
      {
        name: '清炒时蔬',
        amount: '200g',
        calories: '60kcal',
        tags: ['膳食纤维', '维生素'],
        recipe: {
          ingredients: [
            { name: '时令蔬菜', amount: '200g（如菜心、油麦菜）' },
            { name: '蒜末', amount: '2瓣' },
            { name: '盐', amount: '适量' },
            { name: '食用油', amount: '1勺' },
          ],
          steps: [
            { step: 1, desc: '蔬菜洗净，切段沥干水分' },
            { step: 2, desc: '热锅凉油，爆香蒜末' },
            { step: 3, desc: '放入蔬菜大火快速翻炒' },
            { step: 4, desc: '加盐调味，炒至断生即可出锅' },
          ],
          tips: '大火快炒可保留更多维生素和脆嫩口感',
        },
      },
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

// 补充推荐
const supplements = {
  nuts: [
    { name: '核桃', amount: '2-3颗', benefit: '补肾健脑', emoji: '🥜' },
    { name: '杏仁', amount: '10颗', benefit: '润肺止咳', emoji: '🌰' },
    { name: '腰果', amount: '8颗', benefit: '健脾益气', emoji: '🥜' },
  ],
  fruits: [
    { name: '蓝莓', amount: '50g', benefit: '抗氧化·明目', emoji: '🫐' },
    { name: '猕猴桃', amount: '1个', benefit: '维C之王·清热', emoji: '🥝' },
    { name: '樱桃', amount: '10颗', benefit: '补铁·养颜', emoji: '🍒' },
  ],
  drinks: [
    { name: '红枣桂圆茶', amount: '1杯', benefit: '补血安神', emoji: '🍵' },
    { name: '绿豆汤', amount: '1碗', benefit: '清热解暑', emoji: '🥤' },
    { name: '酸梅汤', amount: '1杯', benefit: '生津止渴', emoji: '🧃' },
  ],
};

// 个性化分析数据
const personalAnalysis = [
  {
    icon: Heart,
    title: '体质匹配',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    items: [
      '当前大暑时节，湿热交蒸，你的消化反馈显示脾胃运化偏弱',
      '今日食谱以健脾祛湿为主线，山药、薏米、茯苓等食材针对性调理',
      '午餐清蒸鲈鱼提供优质蛋白，低脂不增加脾胃负担',
    ],
  },
  {
    icon: Activity,
    title: '运动协同',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    items: [
      '今日训练安排为休息日，热量摄入适度下调至1445kcal',
      '蛋白质分配均匀，每餐15-25g，利于肌肉维持与修复',
      '晚餐减少碳水比例，搭配白灼虾补充锌元素促进恢复',
    ],
  },
  {
    icon: Brain,
    title: '情绪与睡眠',
    color: 'text-chart-4',
    bgColor: 'bg-chart-4/10',
    items: [
      '近期睡眠质量波动，晚餐加入莲子安神食材辅助改善',
      '下午补充坚果中的镁元素有助于缓解焦虑情绪',
      '枸杞菊花茶清肝明目，缓解午后精力下降',
    ],
  },
  {
    icon: Shield,
    title: '节气防护',
    color: 'text-chart-3',
    bgColor: 'bg-chart-3/10',
    items: [
      '大暑第14天，距立秋仅3天，需防秋前最后一波暑湿',
      '全天食谱避免寒凉，以温平性食材为主保护阳气',
      '姜枣茶建议晨起饮用，借姜之温散驱空调房寒湿',
    ],
  },
];

export default function MealPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<{ name: string; recipe: NonNullable<MealItem['recipe']> } | null>(null);

  useEffect(() => {
    const generated = localStorage.getItem('mealPlanGenerated');
    if (!generated) {
      router.replace('/');
    } else {
      setIsReady(true);
    }
  }, [router]);

  const [expandedSlot, setExpandedSlot] = useState<number | null>(0);
  const [expandedAnalysis, setExpandedAnalysis] = useState<number | null>(0);

  const toggleSlot = (index: number) => {
    setExpandedSlot(expandedSlot === index ? null : index);
  };

  if (!isReady) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 flex flex-col items-center justify-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center animate-pulse">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">请先在首页填写健康档案并生成营养方案</p>
      </div>
    );
  }

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
              <p className="text-xs text-muted-foreground">基于你的体质与健康数据个性化生成</p>
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

      {/* 数据来源说明 */}
      <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-border/30">
        <BookOpen className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
        <div className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground/70">数据来源：</span>
          营养成分数据参考
          <span className="text-foreground/70 font-medium">《中国食物成分表》第6版</span>
          （中国疾病预防控制中心营养与健康所编著）及
          <span className="text-foreground/70 font-medium"> USDA FoodData Central</span>
          （美国农业部食物数据中心）。热量需求基于中国营养学会《中国居民膳食营养素参考摄入量（DRIs）》计算。
        </div>
      </div>

      {/* 个性化营养分析 */}
      <div className="card-warm p-5 space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="font-serif-cn text-base font-bold">营养分析</h2>
            <p className="text-xs text-muted-foreground">基于你的健康档案与今日状态生成</p>
          </div>
        </div>

        <div className="space-y-3">
          {personalAnalysis.map((analysis, index) => {
            const Icon = analysis.icon;
            const isExpanded = expandedAnalysis === index;
            return (
              <div
                key={analysis.title}
                className={cn(
                  'rounded-xl border transition-all duration-200',
                  isExpanded ? 'border-border/60 bg-muted/20' : 'border-border/30'
                )}
              >
                <button
                  onClick={() => setExpandedAnalysis(isExpanded ? null : index)}
                  className="w-full p-3 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2">
                    <div className={cn('flex h-7 w-7 items-center justify-center rounded-lg', analysis.bgColor)}>
                      <Icon className={cn('h-3.5 w-3.5', analysis.color)} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{analysis.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-3 pb-3 space-y-1.5">
                    {analysis.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                        <Sparkles className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
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
                      className={`flex items-center justify-between py-2 border-b border-border/20 last:border-0 ${meal.recipe ? 'cursor-pointer hover:bg-accent/5 rounded-lg px-2 -mx-2 transition-colors' : ''}`}
                      onClick={() => meal.recipe && setSelectedRecipe({ name: meal.name, recipe: meal.recipe })}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{meal.name}</span>
                          <span className="text-xs text-muted-foreground">{meal.amount}</span>
                          {meal.recipe && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary/70">查看食谱</span>
                          )}
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

      {/* 补充推荐：坚果 · 水果 · 饮品 */}
      <div className="card-warm p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-chart-3" />
          <h2 className="font-serif-cn text-base font-bold">每日补充推荐</h2>
        </div>

        {/* 坚果 */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <span className="text-base">🥜</span> 坚果 · 每日一把
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {supplements.nuts.map((item) => (
              <div key={item.name} className="p-2.5 rounded-lg bg-muted/20 text-center">
                <span className="text-xl">{item.emoji}</span>
                <p className="text-xs font-medium text-foreground mt-1">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.amount}</p>
                <p className="text-xs text-primary/70 mt-0.5">{item.benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 水果 */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <Cherry className="h-4 w-4 text-chart-5" /> 时令水果
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {supplements.fruits.map((item) => (
              <div key={item.name} className="p-2.5 rounded-lg bg-muted/20 text-center">
                <span className="text-xl">{item.emoji}</span>
                <p className="text-xs font-medium text-foreground mt-1">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.amount}</p>
                <p className="text-xs text-primary/70 mt-0.5">{item.benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 饮品 */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <CupSoda className="h-4 w-4 text-chart-4" /> 养生饮品
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {supplements.drinks.map((item) => (
              <div key={item.name} className="p-2.5 rounded-lg bg-muted/20 text-center">
                <span className="text-xl">{item.emoji}</span>
                <p className="text-xs font-medium text-foreground mt-1">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.amount}</p>
                <p className="text-xs text-primary/70 mt-0.5">{item.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 食谱详情弹窗 */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedRecipe(null)}>
          <div
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 头部 */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-border bg-card/95 backdrop-blur-sm rounded-t-2xl">
              <div>
                <h3 className="text-lg font-semibold text-foreground font-serif">{selectedRecipe.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">详细食谱</p>
              </div>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="p-2 rounded-full hover:bg-accent/10 transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* 原料清单 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-primary/10">
                    <Leaf className="h-4 w-4 text-primary" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">原料清单</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedRecipe.recipe.ingredients.map((ing, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-accent/5 border border-border/30">
                      <span className="text-sm text-foreground">{ing.name}</span>
                      <span className="text-xs text-muted-foreground">{ing.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 做法步骤 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-accent/10">
                    <ChefHat className="h-4 w-4 text-accent" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">做法步骤</h4>
                </div>
                <div className="space-y-3">
                  {selectedRecipe.recipe.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">{step.step}</span>
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed pt-0.5">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 小贴士 */}
              {selectedRecipe.recipe.tips && (
                <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">💡</span>
                    <h4 className="text-xs font-semibold text-foreground">小贴士</h4>
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed">{selectedRecipe.recipe.tips}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
