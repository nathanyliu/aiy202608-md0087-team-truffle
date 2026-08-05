'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Leaf,
  Sun,
  Moon,
  Dumbbell,
  Brain,
  Heart,
  Activity,
  Camera,
  ChevronRight,
  Sparkles,
  Plus,
  X,
  Search,
  UtensilsCrossed,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// 食物数据库
interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FoodCategory {
  name: string;
  emoji: string;
  foods: FoodItem[];
}

const foodDatabase: FoodCategory[] = [
  {
    name: '主食谷物',
    emoji: '🌾',
    foods: [
      { id: 'grain-1', name: '糙米饭', calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
      { id: 'grain-2', name: '燕麦', calories: 150, protein: 5, carbs: 27, fat: 2.5 },
      { id: 'grain-3', name: '全麦面包', calories: 247, protein: 13, carbs: 41, fat: 3.4 },
      { id: 'grain-4', name: '红薯', calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
      { id: 'grain-5', name: '玉米', calories: 96, protein: 3.2, carbs: 19, fat: 1.2 },
      { id: 'grain-6', name: '小米粥', calories: 46, protein: 1.1, carbs: 9, fat: 0.3 },
      { id: 'grain-7', name: '荞麦面', calories: 137, protein: 5, carbs: 24, fat: 2.4 },
      { id: 'grain-8', name: '藜麦', calories: 120, protein: 4.4, carbs: 21, fat: 1.9 },
    ],
  },
  {
    name: '蔬菜',
    emoji: '🥬',
    foods: [
      { id: 'veg-1', name: '西兰花', calories: 34, protein: 2.8, carbs: 4.3, fat: 0.4 },
      { id: 'veg-2', name: '菠菜', calories: 23, protein: 2.9, carbs: 1.3, fat: 0.4 },
      { id: 'veg-3', name: '番茄', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
      { id: 'veg-4', name: '黄瓜', calories: 15, protein: 0.7, carbs: 2.9, fat: 0.1 },
      { id: 'veg-5', name: '胡萝卜', calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2 },
      { id: 'veg-6', name: '山药', calories: 57, protein: 1.9, carbs: 12.4, fat: 0.2 },
      { id: 'veg-7', name: '冬瓜', calories: 12, protein: 0.4, carbs: 2.6, fat: 0.1 },
      { id: 'veg-8', name: '南瓜', calories: 26, protein: 1, carbs: 5.3, fat: 0.3 },
      { id: 'veg-9', name: '芹菜', calories: 16, protein: 0.7, carbs: 3.4, fat: 0.1 },
      { id: 'veg-10', name: '生菜', calories: 14, protein: 1.4, carbs: 1.3, fat: 0.2 },
    ],
  },
  {
    name: '水果',
    emoji: '🍎',
    foods: [
      { id: 'fruit-1', name: '苹果', calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
      { id: 'fruit-2', name: '香蕉', calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
      { id: 'fruit-3', name: '蓝莓', calories: 57, protein: 0.7, carbs: 14, fat: 0.3 },
      { id: 'fruit-4', name: '猕猴桃', calories: 61, protein: 1.1, carbs: 15, fat: 0.5 },
      { id: 'fruit-5', name: '樱桃', calories: 63, protein: 1.1, carbs: 16, fat: 0.2 },
      { id: 'fruit-6', name: '橙子', calories: 47, protein: 0.9, carbs: 12, fat: 0.1 },
      { id: 'fruit-7', name: '葡萄', calories: 69, protein: 0.7, carbs: 18, fat: 0.2 },
      { id: 'fruit-8', name: '草莓', calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3 },
    ],
  },
  {
    name: '肉禽蛋',
    emoji: '🥩',
    foods: [
      { id: 'meat-1', name: '鸡胸肉', calories: 133, protein: 31, carbs: 0, fat: 1.2 },
      { id: 'meat-2', name: '鸡蛋(煮)', calories: 144, protein: 13.3, carbs: 1.5, fat: 9.5 },
      { id: 'meat-3', name: '牛腱肉', calories: 106, protein: 20, carbs: 0.5, fat: 2.3 },
      { id: 'meat-4', name: '猪里脊', calories: 155, protein: 20, carbs: 1.5, fat: 7.9 },
      { id: 'meat-5', name: '鸭肉', calories: 240, protein: 15.5, carbs: 0.2, fat: 19.7 },
      { id: 'meat-6', name: '三文鱼', calories: 139, protein: 21, carbs: 0, fat: 6.3 },
      { id: 'meat-7', name: '鲈鱼', calories: 97, protein: 18.6, carbs: 0.9, fat: 2 },
      { id: 'meat-8', name: '虾', calories: 87, protein: 18.6, carbs: 0.8, fat: 0.8 },
    ],
  },
  {
    name: '豆制品',
    emoji: '🫘',
    foods: [
      { id: 'bean-1', name: '豆腐(北)', calories: 81, protein: 8.1, carbs: 4.2, fat: 3.7 },
      { id: 'bean-2', name: '豆腐(嫩)', calories: 57, protein: 6.2, carbs: 2.6, fat: 2.1 },
      { id: 'bean-3', name: '豆浆(无糖)', calories: 14, protein: 1.8, carbs: 0.5, fat: 0.7 },
      { id: 'bean-4', name: '腐竹', calories: 457, protein: 44.6, carbs: 22.3, fat: 21.7 },
      { id: 'bean-5', name: '毛豆', calories: 131, protein: 13.1, carbs: 10.5, fat: 5 },
      { id: 'bean-6', name: '红豆', calories: 324, protein: 20.2, carbs: 63.4, fat: 0.6 },
    ],
  },
  {
    name: '奶制品',
    emoji: '🥛',
    foods: [
      { id: 'dairy-1', name: '纯牛奶', calories: 65, protein: 3.3, carbs: 4.9, fat: 3.6 },
      { id: 'dairy-2', name: '酸奶(无糖)', calories: 59, protein: 4.3, carbs: 5.5, fat: 2.7 },
      { id: 'dairy-3', name: '奶酪', calories: 328, protein: 20, carbs: 3.5, fat: 27 },
      { id: 'dairy-4', name: '脱脂牛奶', calories: 33, protein: 3.4, carbs: 5, fat: 0.1 },
    ],
  },
  {
    name: '坚果种子',
    emoji: '🥜',
    foods: [
      { id: 'nut-1', name: '核桃', calories: 627, protein: 15, carbs: 14, fat: 60 },
      { id: 'nut-2', name: '杏仁', calories: 578, protein: 21, carbs: 22, fat: 50 },
      { id: 'nut-3', name: '腰果', calories: 553, protein: 18, carbs: 30, fat: 44 },
      { id: 'nut-4', name: '花生', calories: 567, protein: 26, carbs: 16, fat: 49 },
      { id: 'nut-5', name: '芝麻', calories: 573, protein: 19, carbs: 23, fat: 50 },
      { id: 'nut-6', name: '南瓜子', calories: 559, protein: 30, carbs: 11, fat: 49 },
    ],
  },
  {
    name: '菌菇类',
    emoji: '🍄',
    foods: [
      { id: 'mush-1', name: '香菇', calories: 26, protein: 2.2, carbs: 5.2, fat: 0.3 },
      { id: 'mush-2', name: '金针菇', calories: 26, protein: 2.4, carbs: 6, fat: 0.4 },
      { id: 'mush-3', name: '木耳', calories: 21, protein: 1.5, carbs: 5, fat: 0.2 },
      { id: 'mush-4', name: '杏鲍菇', calories: 35, protein: 3.1, carbs: 7.3, fat: 0.1 },
    ],
  },
];

interface CustomFood {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// 节气信息
function getSeasonInfo() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  let season = '春';
  let solarTerm = '立春';
  let solarTermDay = 0;
  let daysToNext = 0;
  let nextTerm = '雨水';

  if (month >= 4 && month <= 6) {
    season = '夏';
    solarTerm = '大暑';
    solarTermDay = 14;
    daysToNext = 3;
    nextTerm = '立秋';
  } else if (month >= 7 && month <= 9) {
    season = '秋';
    solarTerm = '白露';
    solarTermDay = 5;
    daysToNext = 10;
    nextTerm = '秋分';
  } else if (month >= 10 || month <= 2) {
    season = '冬';
    solarTerm = '大雪';
    solarTermDay = 7;
    daysToNext = 8;
    nextTerm = '冬至';
  } else {
    season = '春';
    solarTerm = '春分';
    solarTermDay = 10;
    daysToNext = 5;
    nextTerm = '清明';
  }

  return {
    time: `${hours}:${minutes}`,
    date: `${month}/${day}`,
    weekDay: weekDays[now.getDay()],
    season,
    solarTerm,
    solarTermDay,
    daysToNext,
    nextTerm,
  };
}

// 滑块组件
function SliderField({
  label,
  value,
  onChange,
  min = 0,
  max = 10,
  icon: Icon,
  leftLabel,
  rightLabel,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  icon: React.ComponentType<{ className?: string }>;
  leftLabel?: string;
  rightLabel?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <span className="text-sm font-semibold text-primary">{value}/{max}</span>
      </div>
      <div className="flex items-center gap-3">
        {leftLabel && <span className="text-xs text-muted-foreground whitespace-nowrap">{leftLabel}</span>}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 rounded-full appearance-none bg-muted cursor-pointer slider-warm accent-primary"
        />
        {rightLabel && <span className="text-xs text-muted-foreground whitespace-nowrap">{rightLabel}</span>}
      </div>
    </div>
  );
}

// 选择按钮组
function SelectGroup({
  label,
  options,
  value,
  onChange,
  icon: Icon,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm transition-all duration-200 border',
              value === opt
                ? 'bg-primary/10 border-primary/30 text-primary font-medium'
                : 'bg-background border-border text-muted-foreground hover:border-primary/20 hover:text-foreground'
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const info = getSeasonInfo();

  // 基础健康档案
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('男');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('保持健康');
  const [trainFreq, setTrainFreq] = useState('初学者');
  const [allergies, setAllergies] = useState('');

  // 今日健康反馈
  const [sleepHours, setSleepHours] = useState(7);
  const [sleepQuality, setSleepQuality] = useState(3);
  const [energy, setEnergy] = useState(6);
  const [muscleSoreness, setMuscleSoreness] = useState('无');
  const [digestion, setDigestion] = useState('良好');
  const [mood, setMood] = useState('一般');
  const [todayTrain, setTodayTrain] = useState('休息日');
  const [notes, setNotes] = useState('');
  const [tongueImage, setTongueImage] = useState<string | null>(null);

  // 饮食偏好
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [customFoods, setCustomFoods] = useState<CustomFood[]>([]);
  const [activeCategory, setActiveCategory] = useState('主食谷物');
  const [foodSearch, setFoodSearch] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [newCustomFood, setNewCustomFood] = useState({ name: '', calories: '', protein: '', carbs: '', fat: '' });

  const isProfileComplete = age && gender && height && weight;

  const toggleFood = (foodId: string) => {
    setSelectedFoods(prev =>
      prev.includes(foodId) ? prev.filter(id => id !== foodId) : [...prev, foodId]
    );
  };

  const addCustomFood = () => {
    if (!newCustomFood.name || !newCustomFood.calories) return;
    const food: CustomFood = {
      id: `custom-${Date.now()}`,
      name: newCustomFood.name,
      calories: Number(newCustomFood.calories) || 0,
      protein: Number(newCustomFood.protein) || 0,
      carbs: Number(newCustomFood.carbs) || 0,
      fat: Number(newCustomFood.fat) || 0,
    };
    setCustomFoods(prev => [...prev, food]);
    setNewCustomFood({ name: '', calories: '', protein: '', carbs: '', fat: '' });
    setShowCustomForm(false);
  };

  const removeCustomFood = (id: string) => {
    setCustomFoods(prev => prev.filter(f => f.id !== id));
  };

  const currentCategory = foodDatabase.find(c => c.name === activeCategory);
  const filteredFoods = currentCategory?.foods.filter(f =>
    f.name.includes(foodSearch)
  ) || [];

  const allSelectedFoods: (FoodItem | CustomFood)[] = [
    ...foodDatabase.flatMap(c => c.foods).filter(f => selectedFoods.includes(f.id)),
    ...customFoods,
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTongueImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 space-y-6">
      {/* 时令信息条 */}
      <div className="card-warm p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <Leaf className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h1 className="font-serif-cn text-xl font-bold text-foreground">
              优基食养小厨房
            </h1>
            <p className="text-xs text-muted-foreground">每天一张会思考的餐单</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">
            {info.time} {info.date} · {info.weekDay}
          </span>
          <span className="badge-season">
            <Sun className="h-3.5 w-3.5" />
            {info.season} · {info.solarTerm}第{info.solarTermDay}天 · 距{info.nextTerm} {info.daysToNext}天
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：基础健康档案 */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-warm p-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="h-5 w-5 text-accent" />
              <h2 className="font-serif-cn text-base font-bold">基础健康档案</h2>
            </div>

            {/* 年龄 */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">年龄</label>
              <input
                type="number"
                placeholder="请输入年龄"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input-warm"
              />
            </div>

            {/* 性别 */}
            <SelectGroup
              label="性别"
              options={['男', '女']}
              value={gender}
              onChange={setGender}
              icon={Heart}
            />

            {/* 身高 */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">身高 (cm)</label>
              <input
                type="number"
                placeholder="请输入身高"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="input-warm"
              />
            </div>

            {/* 体重 */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">体重 (kg)</label>
              <input
                type="number"
                placeholder="请输入体重"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="input-warm"
              />
            </div>

            {/* 健身目标 */}
            <SelectGroup
              label="健身目标"
              options={['增肌', '减脂', '塑形', '保持健康']}
              value={fitnessGoal}
              onChange={setFitnessGoal}
              icon={Activity}
            />

            {/* 训练频率 */}
            <SelectGroup
              label="训练频率"
              options={['不运动', '初学者', '规律训练', '高强度']}
              value={trainFreq}
              onChange={setTrainFreq}
              icon={Dumbbell}
            />

            {/* 过敏/忌口 */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                过敏 / 忌口（可选）
              </label>
              <input
                type="text"
                placeholder="如：海鲜、乳糖不耐..."
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="input-warm"
              />
            </div>
          </div>
        </div>

        {/* 右侧：今日健康反馈 + 舌像 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-warm p-5 space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="font-serif-cn text-base font-bold">今日健康反馈</h2>
            </div>

            {/* 睡眠 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SliderField
                label="睡眠时长 (小时)"
                value={sleepHours}
                onChange={setSleepHours}
                min={0}
                max={12}
                icon={Moon}
                leftLabel="0h"
                rightLabel="12h"
              />
              <SliderField
                label="睡眠质量"
                value={sleepQuality}
                onChange={setSleepQuality}
                min={1}
                max={5}
                icon={Moon}
                leftLabel="1分"
                rightLabel="5分"
              />
            </div>

            {/* 精力值 */}
            <SliderField
              label="精力值"
              value={energy}
              onChange={setEnergy}
              min={0}
              max={10}
              icon={Sun}
              leftLabel="疲惫"
              rightLabel="充沛"
            />

            {/* 肌肉酸痛 */}
            <SelectGroup
              label="肌肉酸痛"
              options={['无', '轻微', '明显', '严重']}
              value={muscleSoreness}
              onChange={setMuscleSoreness}
              icon={Dumbbell}
            />

            {/* 消化状态 */}
            <SelectGroup
              label="消化状态"
              options={['良好', '一般', '胀气', '便秘', '腹泻']}
              value={digestion}
              onChange={setDigestion}
              icon={Activity}
            />

            {/* 情绪 */}
            <SelectGroup
              label="情绪"
              options={['非常好', '一般', '低落', '焦虑']}
              value={mood}
              onChange={setMood}
              icon={Brain}
            />

            {/* 今日训练 */}
            <SelectGroup
              label="今日训练"
              options={['休息日', '力量训练', '有氧', '高强度间歇']}
              value={todayTrain}
              onChange={setTodayTrain}
              icon={Dumbbell}
            />

            {/* 备注 */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">备注（可选）</label>
              <textarea
                placeholder="记录今天的特殊状况..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="input-warm resize-none"
              />
            </div>
          </div>

          {/* 舌像上传 */}
          <div className="card-warm p-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Camera className="h-5 w-5 text-accent" />
              <div>
                <h2 className="font-serif-cn text-base font-bold">今日舌像</h2>
                <p className="text-xs text-muted-foreground">
                  辅助判断湿热/体寒/气血，影响今日推荐
                </p>
              </div>
            </div>

            {tongueImage ? (
              <div className="relative group">
                <img
                  src={tongueImage}
                  alt="舌像照片"
                  className="w-full h-48 object-cover rounded-xl border border-border"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                  <label className="px-4 py-2 bg-white/90 rounded-lg text-sm font-medium text-foreground cursor-pointer hover:bg-white transition-colors">
                    重新上传
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-200">
                <Camera className="h-8 w-8 text-muted-foreground/50 mb-2" />
                <span className="text-sm text-muted-foreground">
                  上传今日舌面照片
                </span>
                <span className="text-xs text-muted-foreground/60 mt-1">
                  自然光、舌体自然伸出、对焦于舌头
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* 饮食偏好记录 */}
      <div className="card-warm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-primary" />
            <h2 className="font-serif-cn text-lg font-semibold text-foreground">饮食偏好记录</h2>
            <span className="text-xs text-muted-foreground">（可选 · 帮助AI更精准推荐）</span>
          </div>
          {allSelectedFoods.length > 0 && (
            <span className="text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              已选 {allSelectedFoods.length} 种食物
            </span>
          )}
        </div>

        {/* 分类标签 */}
        <div className="flex flex-wrap gap-2">
          {foodDatabase.map(cat => (
            <button
              key={cat.name}
              onClick={() => { setActiveCategory(cat.name); setFoodSearch(''); }}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                activeCategory === cat.name
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              )}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
          <button
            onClick={() => setShowCustomForm(!showCustomForm)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-all border border-dashed',
              showCustomForm
                ? 'border-accent text-accent bg-accent/10'
                : 'border-border text-muted-foreground hover:border-accent hover:text-accent'
            )}
          >
            <Plus className="h-3 w-3 inline mr-1" />
            自定义食物
          </button>
        </div>

        {/* 自定义食物表单 */}
        {showCustomForm && (
          <div className="bg-secondary/50 rounded-xl p-4 space-y-3 border border-dashed border-accent/30">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">添加自定义食物</span>
              <button onClick={() => setShowCustomForm(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs text-muted-foreground mb-1 block">食物名称 *</label>
                <input
                  type="text"
                  value={newCustomFood.name}
                  onChange={e => setNewCustomFood(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="如：牛油果"
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">热量 (kcal/100g)</label>
                <input
                  type="number"
                  value={newCustomFood.calories}
                  onChange={e => setNewCustomFood(prev => ({ ...prev, calories: e.target.value }))}
                  placeholder="0"
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">蛋白质 (g)</label>
                <input
                  type="number"
                  value={newCustomFood.protein}
                  onChange={e => setNewCustomFood(prev => ({ ...prev, protein: e.target.value }))}
                  placeholder="0"
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">碳水 (g)</label>
                <input
                  type="number"
                  value={newCustomFood.carbs}
                  onChange={e => setNewCustomFood(prev => ({ ...prev, carbs: e.target.value }))}
                  placeholder="0"
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">脂肪 (g)</label>
                <input
                  type="number"
                  value={newCustomFood.fat}
                  onChange={e => setNewCustomFood(prev => ({ ...prev, fat: e.target.value }))}
                  placeholder="0"
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
            <button
              onClick={addCustomFood}
              disabled={!newCustomFood.name || !newCustomFood.calories}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              添加食物
            </button>
          </div>
        )}

        {/* 搜索框 */}
        {!showCustomForm && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={foodSearch}
              onChange={e => setFoodSearch(e.target.value)}
              placeholder={`在${activeCategory}中搜索...`}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        )}

        {/* 食物网格 */}
        {!showCustomForm && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-2">
            {filteredFoods.map(food => {
              const isSelected = selectedFoods.includes(food.id);
              return (
                <button
                  key={food.id}
                  onClick={() => toggleFood(food.id)}
                  className={cn(
                    'p-2.5 rounded-xl text-xs text-center transition-all border',
                    isSelected
                      ? 'bg-primary/10 border-primary text-primary font-medium'
                      : 'bg-background border-border hover:border-primary/50 hover:bg-primary/5'
                  )}
                >
                  <div className="font-medium truncate">{food.name}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    {food.calories}kcal
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* 已选食物展示 */}
        {allSelectedFoods.length > 0 && (
          <div className="pt-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-2">已选择的食物：</p>
            <div className="flex flex-wrap gap-2">
              {allSelectedFoods.map(food => (
                <span
                  key={food.id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs"
                >
                  {food.name}
                  <button
                    onClick={() => {
                      if (food.id.startsWith('custom-')) {
                        removeCustomFood(food.id);
                      } else {
                        toggleFood(food.id);
                      }
                    }}
                    className="hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 生成营养方案按钮 */}
      <div className="card-warm p-5">
        {isProfileComplete ? (
          <button
            onClick={() => {
              localStorage.setItem('mealPlanGenerated', 'true');
              router.push('/meal');
            }}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            生成营养方案
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <div className="text-center py-2">
            <p className="text-sm text-muted-foreground">
              请填完左侧基础健康档案中的必填项
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
