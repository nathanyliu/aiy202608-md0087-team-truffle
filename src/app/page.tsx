'use client';

import { useState } from 'react';
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
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const isProfileComplete = age && gender && height && weight;

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

          {/* 生成餐单按钮 */}
          <div className="card-warm p-5">
            {isProfileComplete ? (
              <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4" />
                生成今日食养方案
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
      </div>
    </div>
  );
}
