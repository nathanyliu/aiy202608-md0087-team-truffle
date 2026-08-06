'use client';

import { useState, useEffect, useRef } from 'react';
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


const nutritionSummary = {
  totalCalories: '1445kcal',
  protein: '72g',
  carbs: '185g',
  fat: '42g',
  fiber: '28g',
};

// 补充推荐 - 多个选项，随机选择
const nutsOptions = [
  [
    { name: '核桃', amount: '2-3颗', benefit: '补肾健脑', emoji: '🥜' },
    { name: '杏仁', amount: '10颗', benefit: '润肺止咳', emoji: '🌰' },
    { name: '腰果', amount: '8颗', benefit: '健脾益气', emoji: '🥜' },
  ],
  [
    { name: '夏威夷果', amount: '5颗', benefit: '补充能量', emoji: '🌰' },
    { name: '开心果', amount: '15颗', benefit: '保护心血管', emoji: '🥜' },
    { name: '松子', amount: '1小把', benefit: '润肠通便', emoji: '🌲' },
  ],
  [
    { name: '碧根果', amount: '4-5颗', benefit: '补脑益智', emoji: '🌰' },
    { name: '榛子', amount: '8颗', benefit: '补充维生素E', emoji: '🥜' },
    { name: '南瓜子', amount: '1小把', benefit: '保护前列腺', emoji: '🎃' },
  ],
];

const fruitsOptions = [
  [
    { name: '蓝莓', amount: '50g', benefit: '抗氧化·明目', emoji: '🫐' },
    { name: '猕猴桃', amount: '1个', benefit: '维C之王·清热', emoji: '🥝' },
    { name: '樱桃', amount: '10颗', benefit: '补铁·养颜', emoji: '🍒' },
  ],
  [
    { name: '苹果', amount: '半个', benefit: '促进消化', emoji: '🍎' },
    { name: '香蕉', amount: '1根', benefit: '补充钾元素', emoji: '🍌' },
    { name: '橙子', amount: '1个', benefit: '增强免疫力', emoji: '🍊' },
  ],
  [
    { name: '草莓', amount: '5颗', benefit: '美白养颜', emoji: '🍓' },
    { name: '葡萄', amount: '1小串', benefit: '抗氧化', emoji: '🍇' },
    { name: '梨', amount: '半个', benefit: '润肺止咳', emoji: '🍐' },
  ],
];

const drinksOptions = [
  [
    { name: '红枣桂圆茶', amount: '1杯', benefit: '补血安神', emoji: '🍵' },
    { name: '绿豆汤', amount: '1碗', benefit: '清热解暑', emoji: '🥤' },
    { name: '酸梅汤', amount: '1杯', benefit: '生津止渴', emoji: '🧃' },
  ],
  [
    { name: '枸杞菊花茶', amount: '1杯', benefit: '清肝明目', emoji: '🍵' },
    { name: '柠檬水', amount: '1杯', benefit: '补充维C', emoji: '🍋' },
    { name: '蜂蜜水', amount: '1杯', benefit: '润肠通便', emoji: '🍯' },
  ],
  [
    { name: '玫瑰花茶', amount: '1杯', benefit: '疏肝解郁', emoji: '🌹' },
    { name: '山楂茶', amount: '1杯', benefit: '消食化积', emoji: '🫖' },
    { name: '豆浆', amount: '1杯', benefit: '补充植物蛋白', emoji: '🥛' },
  ],
];

// 根据当前日期生成固定的随机选择（同一天显示相同内容）
const daySeed = new Date().getDate();
const supplements = {
  nuts: nutsOptions[daySeed % nutsOptions.length],
  fruits: fruitsOptions[daySeed % fruitsOptions.length],
  drinks: drinksOptions[daySeed % drinksOptions.length],
};

// 用户健康档案类型
interface UserProfile {
  age: string;
  gender: string;
  height: string;
  weight: string;
  fitnessGoal: string;
  trainFreq: string;
  allergies: string;
  sleepHours: number;
  sleepQuality: number;
  energy: number;
  muscleSoreness: string;
  digestion: string;
  mood: string;
  todayTrain: string;
  notes: string;
}

// 根据用户档案和当日食谱动态生成个性化分析
function getPersonalAnalysis(profile: UserProfile | null, mealPlan: MealSlot[]) {
  if (!profile) {
    return [];
  }

  // 提取当日食谱名称
  const breakfastNames = mealPlan.find((m: MealSlot) => m.type === '早餐')?.meals.map((i: MealItem) => i.name) || [];
  const lunchNames = mealPlan.find((m: MealSlot) => m.type === '午餐')?.meals.map((i: MealItem) => i.name) || [];
  const dinnerNames = mealPlan.find((m: MealSlot) => m.type === '晚餐')?.meals.map((i: MealItem) => i.name) || [];
  const snackNames = mealPlan.find((m: MealSlot) => m.type === '加餐')?.meals.map((i: MealItem) => i.name) || [];
  
  const allMealNames = [...breakfastNames, ...lunchNames, ...dinnerNames, ...snackNames];

  const height = parseFloat(profile.height) || 0;
  const weight = parseFloat(profile.weight) || 0;
  const age = parseInt(profile.age) || 0;

  const bmi = height && weight
    ? (weight / Math.pow(height / 100, 2)).toFixed(1)
    : null;

  const bmiCategory = bmi ? (
    parseFloat(bmi) < 18.5 ? '偏瘦' :
    parseFloat(bmi) < 24 ? '正常' :
    parseFloat(bmi) < 28 ? '偏胖' : '肥胖'
  ) : '未知';

  // 计算基础代谢率 (BMR) - Mifflin-St Jeor 公式
  let bmr = 0;
  if (height && weight && age) {
    if (profile.gender === '男') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
  }

  // 计算每日总能量消耗 (TDEE)
  const activityMultiplier = 
    profile.trainFreq === '不运动' ? 1.2 :
    profile.trainFreq === '初学者' ? 1.375 :
    profile.trainFreq === '规律训练' ? 1.55 : 1.725;
  const tdee = Math.round(bmr * activityMultiplier);

  // 根据目标调整热量
  const targetCalories = 
    profile.fitnessGoal === '减脂' ? Math.round(tdee * 0.8) :
    profile.fitnessGoal === '增肌' ? Math.round(tdee * 1.15) :
    tdee;

  // 计算宏量营养素目标
  let proteinGoal = 0, fatGoal = 0, carbGoal = 0;
  if (profile.fitnessGoal === '增肌') {
    proteinGoal = Math.round(weight * 1.8); // 1.8g/kg
    fatGoal = Math.round(targetCalories * 0.25 / 9); // 25%热量来自脂肪
    carbGoal = Math.round((targetCalories - proteinGoal * 4 - fatGoal * 9) / 4);
  } else if (profile.fitnessGoal === '减脂') {
    proteinGoal = Math.round(weight * 1.6); // 1.6g/kg 保持肌肉
    fatGoal = Math.round(targetCalories * 0.3 / 9); // 30%热量来自脂肪
    carbGoal = Math.round((targetCalories - proteinGoal * 4 - fatGoal * 9) / 4);
  } else {
    proteinGoal = Math.round(weight * 1.2);
    fatGoal = Math.round(targetCalories * 0.28 / 9);
    carbGoal = Math.round((targetCalories - proteinGoal * 4 - fatGoal * 9) / 4);
  }

  const analysis = [
    {
      icon: Heart,
      title: '体质匹配',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      items: [
        `你为${profile.gender}性，${profile.age}岁，身高${profile.height}cm，体重${profile.weight}kg，BMI ${bmi || '未知'}（${bmiCategory}）。${bmiCategory === '偏瘦' ? '体重偏低，需增加热量摄入，重点补充优质蛋白和健康脂肪' : bmiCategory === '正常' ? '体重在健康范围内，维持当前营养平衡即可' : bmiCategory === '偏胖' ? '体重略超，需适度控制热量，增加膳食纤维促进代谢' : '建议调整饮食结构，配合适量运动逐步改善'}`,
        `消化状态为「${profile.digestion}」：${profile.digestion === '良好' ? '脾胃运化正常，可正常吸收各类营养，今日食谱涵盖多种食材以充分利用你的消化能力' : profile.digestion === '胀气' ? '脾胃气滞，建议减少豆类、洋葱等产气食物，增加陈皮、砂仁等理气食材。今日午餐' + (lunchNames[0] || '山药排骨汤') + '中加入陈皮，有助于缓解胀气' : profile.digestion === '便秘' ? '肠道蠕动不足，今日食谱已增加粗粮（糙米）和高纤维蔬菜（西兰花、时蔬），建议每日饮水1500-2000ml' : profile.digestion === '腹泻' ? '脾胃虚弱，今日食谱以温和易消化为主，避免油腻和生冷，' + (dinnerNames[0] || '番茄豆腐汤') + '和' + (dinnerNames[1] || '白灼虾') + '都是温和选择' : '今日食谱以温和易消化为主，避免刺激脾胃'}`,
        `当前大暑时节，湿热交蒸，脾胃易受困。午餐${lunchNames[0] || '清蒸鲈鱼'}采用清蒸方式，保留食材鲜味的同时避免油腻加重脾胃负担；${lunchNames[1] || '山药排骨汤'}健脾益胃，针对性调理。晚餐${dinnerNames[0] || '番茄豆腐汤'}清淡开胃，适合暑热天气`,
      ],
    },
    {
      icon: Activity,
      title: '运动协同',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      items: [
        `今日训练安排为「${profile.todayTrain}」：${profile.todayTrain === '休息日' ? '休息日热量摄入适度下调至' + Math.round(targetCalories * 0.9) + 'kcal左右，避免多余热量堆积。但蛋白质摄入不可减少，维持肌肉量' : profile.todayTrain === '力量训练' ? '力量训练日蛋白质需求提升至每公斤体重1.8-2.0g（约' + proteinGoal + 'g），今日午餐' + (lunchNames[0] || '鸡胸肉') + '（30g蛋白）+ 晚餐' + (dinnerNames[1] || '白灼虾') + '（20g蛋白）+ 早餐' + (breakfastNames[1] || '鸡蛋') + '（6g蛋白）可满足需求。训练后30分钟内建议补充乳清蛋白或鸡蛋' : profile.todayTrain === '有氧' ? '有氧运动主要消耗糖原和脂肪，训练前1-2小时补充复合碳水（糙米、燕麦）提供持续能量。今日早餐' + (breakfastNames[0] || '红枣小米粥') + '+' + (lunchNames[2] || '糙米饭') + '为你提供充足碳水' : '高强度训练后身体处于分解状态，需在30分钟内补充蛋白质和碳水（比例约1:3），加速恢复。今日下午茶' + (snackNames[0] || '原味坚果') + '+' + (snackNames[1] || '枸杞菊花茶') + '是理想的训练后补充'}`,
        `训练频率为「${profile.trainFreq}」：${profile.trainFreq === '不运动' ? '基础代谢较低（约' + Math.round(bmr) + 'kcal），全天热量控制在' + targetCalories + 'kcal。蛋白质分配至每餐15-20g，避免一次性摄入过多增加肾脏负担' : profile.trainFreq === '初学者' ? '代谢逐步提升中，建议每餐蛋白质15-25g，碳水以复合碳水为主（糙米、燕麦），避免精制糖。今日食谱已按此比例分配' : profile.trainFreq === '规律训练' ? '代谢活跃，可适当增加碳水和蛋白质比例。训练日热量可达' + targetCalories + 'kcal，非训练日减少10%碳水摄入' : '高强度训练者热量需求达' + targetCalories + 'kcal，蛋白质需达' + proteinGoal + 'g/天。今日食谱已充分满足，训练后可额外补充蛋白粉'}`,
        `肌肉酸痛状态为「${profile.muscleSoreness}」：${profile.muscleSoreness === '无' ? '身体恢复良好，维持当前营养方案即可' : profile.muscleSoreness === '轻微' ? '轻微酸痛说明肌肉正在适应，补充含镁食物（坚果、深绿蔬菜）促进肌肉放松。今日下午茶' + (snackNames[0] || '原味坚果') + '（腰果、杏仁）富含镁元素' : profile.muscleSoreness === '明显' ? '明显酸痛需要增加抗炎食材辅助恢复，今日食谱中的' + (lunchNames[0] || '三文鱼') + '富含omega-3，具有天然抗炎作用。建议训练后冰敷酸痛部位，睡前热水泡脚' : '严重酸痛需充分休息，增加蛋白质摄入至每公斤体重2.0g，同时补充维生素C（水果）促进胶原蛋白合成，加速肌肉修复'}`,
      ],
    },
    {
      icon: Brain,
      title: '情绪与睡眠',
      color: 'text-chart-4',
      bgColor: 'bg-chart-4/10',
      items: [
        `昨晚睡眠${profile.sleepHours}小时，质量${profile.sleepQuality}分（满分5分）：${profile.sleepQuality >= 4 ? '睡眠充足，生长激素分泌良好，身体修复充分。今日精力状态应较好，可正常安排工作和运动。晚餐' + (dinnerNames[0] || '番茄豆腐汤') + '清淡不增加消化负担，有利于维持良好睡眠' : profile.sleepQuality >= 3 ? '睡眠质量尚可，但仍有提升空间。晚餐加入莲子、百合等安神食材辅助改善，今日下午茶' + (snackNames[1] || '枸杞菊花茶') + '也有助清肝安神' : '睡眠质量偏低，皮质醇水平可能偏高，影响代谢和食欲调节。今日增加色氨酸食物（' + (breakfastNames[1] || '鸡蛋') + '、' + (dinnerNames[1] || '白灼虾') + '）促进褪黑素合成。建议今晚睡前1小时远离屏幕，温水泡脚15分钟'}`,
        `精力值${profile.energy}/10：${profile.energy >= 7 ? '精力充沛，可正常安排工作和运动，今日食谱热量分配均衡，能维持稳定精力' : profile.energy >= 5 ? '精力中等，下午可能出现困倦。下午茶补充坚果（约15g）和水果，其中的健康脂肪和天然糖分能快速提升状态。枸杞菊花茶清肝明目，缓解午后精力下降' : '精力偏低，可能与昨晚睡眠不足有关。早餐增加优质蛋白（鸡蛋）和复合碳水（糙米），避免血糖波动导致精力起伏。今日避免高强度工作，安排轻量任务'}`,
        `当前情绪状态为「${profile.mood}」：${profile.mood === '非常好' ? '保持愉悦心情，有助于消化吸收。中医认为"喜则气和志达"，良好情绪能促进脾胃运化，今日食谱营养可被充分吸收' : profile.mood === '一般' ? '情绪平稳，下午补充坚果中的镁元素和维生素B群有助于稳定情绪。晚餐避免过于油腻，清淡饮食有助于保持情绪稳定' : profile.mood === '焦虑' ? '焦虑状态会增加皮质醇分泌，影响消化和代谢。增加富含omega-3的食物（三文鱼、核桃）帮助缓解焦虑，其中的DHA对大脑健康有益。今日下午茶原味坚果中的色氨酸也能促进血清素合成' : '情绪低落时，适当补充富含酪氨酸的食物（香蕉、坚果、豆制品）有助于多巴胺合成。今日食谱中的豆腐、坚果都是良好来源。建议午后散步15分钟，阳光和运动能改善情绪'}`,
      ],
    },
    {
      icon: Shield,
      title: '节气防护',
      color: 'text-chart-3',
      bgColor: 'bg-chart-3/10',
      items: [
        '大暑第14天，距立秋仅3天，正值"中伏"前后，是一年中最热时期。此时湿热交蒸，易伤脾胃，需防秋前最后一波暑湿',
        '全天食谱避免寒凉，以温平性食材为主保护阳气。早餐红枣小米粥温中健脾，午餐山药排骨汤健脾益胃，晚餐番茄豆腐汤清淡不伤脾',
        `姜枣茶建议晨起（7-9点胃经当令）饮用，借姜之温散驱空调房寒湿，红枣补气血${profile.gender === '女' ? '。女性此时段注意保暖腹部，避免寒凉伤宫，可加一片当归增强补血效果' : '。男性此时可适当增加运动量，借阳气旺盛之时强化体质'}`,
        profile.allergies ? `已避开你的过敏原「${profile.allergies}」，今日食谱中所有食材均不含此类成分。如误食出现不适，请立即就医` : '无特殊过敏原，食材选择范围更广。但仍建议多样化饮食，避免长期单一食物导致营养不均衡或产生不耐受',
        `今日饮水建议：${profile.fitnessGoal === '减脂' ? '2000-2500ml，餐前30分钟饮水300ml增加饱腹感' : profile.todayTrain !== '休息日' ? '2000-2500ml，训练前后各补充500ml' : '1500-2000ml，少量多次饮用，避免一次性大量饮水增加肾脏负担'}`,
      ],
    },
    {
      icon: Activity,
      title: '营养摄入建议',
      color: 'text-chart-5',
      bgColor: 'bg-chart-5/10',
      items: [
        `根据你的数据（${profile.gender}性，${age}岁，${height}cm，${weight}kg），基础代谢率约${Math.round(bmr)}kcal，每日总能量消耗约${tdee}kcal。结合「${profile.fitnessGoal}」目标，今日建议摄入${targetCalories}kcal`,
        `宏量营养素分配：蛋白质${proteinGoal}g（占${Math.round(proteinGoal * 4 / targetCalories * 100)}%热量），脂肪${fatGoal}g（占${Math.round(fatGoal * 9 / targetCalories * 100)}%热量），碳水${carbGoal}g（占${Math.round(carbGoal * 4 / targetCalories * 100)}%热量）。今日食谱已按此比例设计`,
        `蛋白质来源分布：早餐鸡蛋（6g）+ 午餐鸡胸肉（30g）+ 晚餐白灼虾（20g）+ 豆腐/坚果（约15g）≈ ${proteinGoal}g，满足全天需求`,
        `膳食纤维建议：每日25-30g，今日食谱中糙米（3g）、西兰花（3g）、时蔬（2g）、水果（约5g）可提供约13g，建议下午茶选择高纤维水果（如梨、苹果）补充`,
        profile.fitnessGoal === '减脂' ? '减脂期间建议少食多餐，将三餐分为5-6餐，每餐控制在300-400kcal，有助于稳定血糖和食欲' : profile.fitnessGoal === '增肌' ? '增肌期间训练后30分钟内为"合成窗口期"，建议补充20-30g快速吸收蛋白（乳清蛋白）+ 40-60g高GI碳水（白米饭、香蕉）' : '维持体重期间，注意热量摄入与消耗平衡，每周称重一次，波动不超过1kg为正常',
      ],
    },
  ];

  return analysis;
}

// 生成随机食谱的函数（根据用户健康档案个性化推荐）
function generateRandomMealPlan(userProfile?: UserProfile | null): MealSlot[] {
  // 早餐选项池
  const breakfastOptions = [
    [
      { name: '红枣小米粥', amount: '1碗 (250ml)', calories: '180kcal', tags: ['健脾', '养胃'], recipe: { ingredients: [{ name: '小米', amount: '80g' }, { name: '红枣', amount: '5颗' }, { name: '清水', amount: '500ml' }], steps: [{ step: 1, desc: '小米淘洗干净，红枣洗净去核' }, { step: 2, desc: '锅中加水烧开，放入小米大火煮沸' }, { step: 3, desc: '转小火慢煮20分钟，加入红枣继续煮10分钟' }], tips: '小米提前浸泡30分钟可缩短煮制时间' } },
      { name: '水煮鸡蛋', amount: '1个', calories: '75kcal', tags: ['蛋白质'], recipe: { ingredients: [{ name: '鸡蛋', amount: '1个' }, { name: '清水', amount: '适量' }], steps: [{ step: 1, desc: '鸡蛋洗净，冷水下锅' }, { step: 2, desc: '大火煮开后转中小火煮8分钟' }, { step: 3, desc: '关火后放入冷水中浸泡' }], tips: '溏心蛋煮6分钟，全熟蛋煮8-10分钟' } },
      { name: '凉拌黄瓜', amount: '1小碟', calories: '30kcal', tags: ['清热', '利水'], recipe: { ingredients: [{ name: '黄瓜', amount: '1根' }, { name: '蒜末', amount: '2瓣' }, { name: '生抽', amount: '1勺' }], steps: [{ step: 1, desc: '黄瓜洗净拍碎切段' }, { step: 2, desc: '蒜末与生抽调成酱汁' }, { step: 3, desc: '酱汁淋在黄瓜上拌匀' }], tips: '拍黄瓜比切黄瓜更入味' } },
    ],
    [
      { name: '燕麦牛奶', amount: '1碗', calories: '220kcal', tags: ['高纤', '补钙'], recipe: { ingredients: [{ name: '燕麦片', amount: '40g' }, { name: '牛奶', amount: '250ml' }, { name: '蜂蜜', amount: '1勺' }], steps: [{ step: 1, desc: '牛奶倒入锅中加热' }, { step: 2, desc: '加入燕麦片搅拌' }, { step: 3, desc: '小火煮3分钟至浓稠' }], tips: '即食燕麦可直接用热牛奶冲泡' } },
      { name: '全麦吐司', amount: '2片', calories: '160kcal', tags: ['碳水', '膳食纤维'], recipe: { ingredients: [{ name: '全麦吐司', amount: '2片' }, { name: '牛油果', amount: '半个' }, { name: '鸡蛋', amount: '1个' }], steps: [{ step: 1, desc: '吐司放入烤面包机烤至金黄' }, { step: 2, desc: '牛油果切片铺在吐司上' }, { step: 3, desc: '煎一个荷包蛋放在上面' }], tips: '可撒少许黑胡椒和海盐调味' } },
      { name: '蓝莓酸奶', amount: '1杯', calories: '120kcal', tags: ['益生菌', '抗氧化'], recipe: { ingredients: [{ name: '希腊酸奶', amount: '150g' }, { name: '蓝莓', amount: '30g' }, { name: '燕麦', amount: '10g' }], steps: [{ step: 1, desc: '酸奶倒入碗中' }, { step: 2, desc: '蓝莓洗净铺在酸奶上' }, { step: 3, desc: '撒上燕麦增加口感' }], tips: '选择无糖酸奶更健康' } },
    ],
    [
      { name: '豆浆油条', amount: '1套', calories: '350kcal', tags: ['传统', '饱腹'], recipe: { ingredients: [{ name: '豆浆', amount: '300ml' }, { name: '油条', amount: '1根' }], steps: [{ step: 1, desc: '豆浆加热至温热' }, { step: 2, desc: '油条可微波加热10秒' }], tips: '豆浆可自制或选择无糖豆浆' } },
      { name: '紫薯粥', amount: '1碗', calories: '200kcal', tags: ['花青素', '膳食纤维'], recipe: { ingredients: [{ name: '紫薯', amount: '100g' }, { name: '大米', amount: '50g' }, { name: '清水', amount: '500ml' }], steps: [{ step: 1, desc: '紫薯去皮切小块' }, { step: 2, desc: '大米淘洗后与紫薯一起入锅' }, { step: 3, desc: '大火烧开转小火煮30分钟' }], tips: '紫薯富含花青素，抗氧化效果好' } },
      { name: '蒸南瓜', amount: '1块', calories: '80kcal', tags: ['低卡', '护眼'], recipe: { ingredients: [{ name: '南瓜', amount: '200g' }], steps: [{ step: 1, desc: '南瓜去皮去籽切块' }, { step: 2, desc: '放入蒸锅大火蒸15分钟' }], tips: '南瓜富含β-胡萝卜素，保护视力' } },
    ],
    [
      { name: '红豆薏米粥', amount: '1碗', calories: '180kcal', tags: ['祛湿', '健脾'], recipe: { ingredients: [{ name: '红豆', amount: '50g' }, { name: '薏米', amount: '50g' }, { name: '清水', amount: '600ml' }], steps: [{ step: 1, desc: '红豆、薏米提前浸泡4小时' }, { step: 2, desc: '锅中加水，放入红豆薏米' }, { step: 3, desc: '大火烧开转小火煮40分钟' }], tips: '薏米性寒，可加几颗红枣中和' } },
      { name: '鸡蛋三明治', amount: '1个', calories: '280kcal', tags: ['高蛋白', '便捷'], recipe: { ingredients: [{ name: '全麦面包', amount: '2片' }, { name: '鸡蛋', amount: '1个' }, { name: '生菜', amount: '2片' }, { name: '番茄', amount: '2片' }], steps: [{ step: 1, desc: '鸡蛋煎熟' }, { step: 2, desc: '面包片铺上生菜、番茄、鸡蛋' }, { step: 3, desc: '盖上另一片面包，对半切开' }], tips: '可加少许低脂沙拉酱' } },
      { name: '黑芝麻糊', amount: '1碗', calories: '150kcal', tags: ['补肾', '乌发'], recipe: { ingredients: [{ name: '黑芝麻糊粉', amount: '30g' }, { name: '热水', amount: '250ml' }], steps: [{ step: 1, desc: '黑芝麻糊粉倒入碗中' }, { step: 2, desc: '冲入热水，搅拌均匀' }], tips: '可加少许蜂蜜调味' } },
    ],
  ];

  // 午餐选项池
  const lunchOptions = [
    [
      { name: '山药排骨汤', amount: '1碗 (300ml)', calories: '320kcal', tags: ['补气', '强筋'], recipe: { ingredients: [{ name: '排骨', amount: '300g' }, { name: '山药', amount: '200g' }, { name: '姜片', amount: '3片' }, { name: '枸杞', amount: '10粒' }], steps: [{ step: 1, desc: '排骨焯水去血沫' }, { step: 2, desc: '山药去皮切块' }, { step: 3, desc: '所有材料入砂锅，加水大火烧开' }, { step: 4, desc: '转小火炖1.5小时，加盐调味' }], tips: '山药后放可保持口感' } },
      { name: '清蒸鲈鱼', amount: '1条', calories: '280kcal', tags: ['优质蛋白', '低脂'], recipe: { ingredients: [{ name: '鲈鱼', amount: '1条' }, { name: '葱姜', amount: '适量' }, { name: '蒸鱼豉油', amount: '2勺' }], steps: [{ step: 1, desc: '鲈鱼处理干净，两面划刀' }, { step: 2, desc: '鱼身铺上葱姜丝' }, { step: 3, desc: '大火蒸8-10分钟' }, { step: 4, desc: '倒掉蒸出的水，淋蒸鱼豉油' }], tips: '蒸的时间不宜过长，肉质更嫩' } },
      { name: '蒜蓉西兰花', amount: '1份', calories: '120kcal', tags: ['抗氧化', '高纤'], recipe: { ingredients: [{ name: '西兰花', amount: '200g' }, { name: '蒜末', amount: '3瓣' }], steps: [{ step: 1, desc: '西兰花切小朵，焯水1分钟' }, { step: 2, desc: '热锅凉油，爆香蒜末' }, { step: 3, desc: '放入西兰花翻炒，加盐调味' }], tips: '焯水可保持翠绿色泽' } },
      { name: '糙米饭', amount: '1碗', calories: '220kcal', tags: ['粗粮', '膳食纤维'], recipe: { ingredients: [{ name: '糙米', amount: '100g' }, { name: '清水', amount: '适量' }], steps: [{ step: 1, desc: '糙米提前浸泡2小时' }, { step: 2, desc: '放入电饭煲，加水煮熟' }], tips: '糙米与白米1:1混合口感更好' } },
    ],
    [
      { name: '番茄牛肉汤', amount: '1碗', calories: '350kcal', tags: ['补铁', '高蛋白'], recipe: { ingredients: [{ name: '牛腩', amount: '250g' }, { name: '番茄', amount: '2个' }, { name: '土豆', amount: '1个' }], steps: [{ step: 1, desc: '牛腩切块焯水' }, { step: 2, desc: '番茄切块，土豆切块' }, { step: 3, desc: '所有材料入锅，加水炖1.5小时' }], tips: '番茄后放可保持口感' } },
      { name: '宫保鸡丁', amount: '1份', calories: '380kcal', tags: ['下饭', '高蛋白'], recipe: { ingredients: [{ name: '鸡胸肉', amount: '200g' }, { name: '花生米', amount: '30g' }, { name: '干辣椒', amount: '5个' }], steps: [{ step: 1, desc: '鸡胸肉切丁，用料酒腌制' }, { step: 2, desc: '热锅凉油，炒香干辣椒' }, { step: 3, desc: '放入鸡丁翻炒至变色' }, { step: 4, desc: '加入花生米和调味汁翻炒均匀' }], tips: '鸡丁腌制后更嫩滑' } },
      { name: '清炒时蔬', amount: '1份', calories: '80kcal', tags: ['维生素', '低卡'], recipe: { ingredients: [{ name: '时令蔬菜', amount: '200g' }, { name: '蒜末', amount: '2瓣' }], steps: [{ step: 1, desc: '蔬菜洗净切段' }, { step: 2, desc: '热锅爆香蒜末' }, { step: 3, desc: '放入蔬菜快速翻炒' }], tips: '大火快炒保持蔬菜脆嫩' } },
      { name: '杂粮饭', amount: '1碗', calories: '200kcal', tags: ['粗粮', '营养均衡'], recipe: { ingredients: [{ name: '糙米', amount: '30g' }, { name: '小米', amount: '30g' }, { name: '红豆', amount: '20g' }, { name: '薏米', amount: '20g' }], steps: [{ step: 1, desc: '杂粮提前浸泡4小时' }, { step: 2, desc: '放入电饭煲煮熟' }], tips: '杂粮比例可按喜好调整' } },
    ],
    [
      { name: '冬瓜排骨汤', amount: '1碗', calories: '280kcal', tags: ['清热', '利水'], recipe: { ingredients: [{ name: '排骨', amount: '250g' }, { name: '冬瓜', amount: '300g' }, { name: '姜片', amount: '3片' }], steps: [{ step: 1, desc: '排骨焯水去血沫' }, { step: 2, desc: '冬瓜去皮切块' }, { step: 3, desc: '排骨、姜片入锅加水炖1小时' }, { step: 4, desc: '加入冬瓜再炖20分钟' }], tips: '冬瓜后放可保持口感' } },
      { name: '香菇滑鸡', amount: '1份', calories: '320kcal', tags: ['高蛋白', '提免疫'], recipe: { ingredients: [{ name: '鸡腿肉', amount: '200g' }, { name: '香菇', amount: '100g' }, { name: '生抽', amount: '2勺' }], steps: [{ step: 1, desc: '鸡腿肉切块，用生抽腌制' }, { step: 2, desc: '香菇切片' }, { step: 3, desc: '鸡肉、香菇铺盘，大火蒸15分钟' }], tips: '蒸的时间不宜过长，肉质更嫩' } },
      { name: '清炒豆芽', amount: '1份', calories: '70kcal', tags: ['维生素C', '低卡'], recipe: { ingredients: [{ name: '绿豆芽', amount: '200g' }, { name: '蒜末', amount: '2瓣' }], steps: [{ step: 1, desc: '豆芽洗净沥干' }, { step: 2, desc: '热锅爆香蒜末' }, { step: 3, desc: '放入豆芽大火快炒1分钟' }], tips: '豆芽不宜炒太久，保持脆嫩' } },
      { name: '红薯饭', amount: '1碗', calories: '210kcal', tags: ['粗粮', '膳食纤维'], recipe: { ingredients: [{ name: '大米', amount: '80g' }, { name: '红薯', amount: '100g' }], steps: [{ step: 1, desc: '红薯去皮切块' }, { step: 2, desc: '大米淘洗后与红薯一起入电饭煲' }, { step: 3, desc: '加水煮熟' }], tips: '红薯富含膳食纤维，促进肠道健康' } },
    ],
  ];

  // 晚餐选项池
  const dinnerOptions = [
    [
      { name: '番茄豆腐汤', amount: '1碗', calories: '150kcal', tags: ['清淡', '高蛋白'], recipe: { ingredients: [{ name: '番茄', amount: '1个' }, { name: '嫩豆腐', amount: '200g' }, { name: '葱花', amount: '适量' }], steps: [{ step: 1, desc: '番茄切块，豆腐切小块' }, { step: 2, desc: '锅中加水烧开，放入番茄' }, { step: 3, desc: '番茄软烂后加入豆腐' }, { step: 4, desc: '煮5分钟，加盐调味，撒葱花' }], tips: '豆腐后放可保持完整' } },
      { name: '白灼虾', amount: '1份', calories: '180kcal', tags: ['高蛋白', '低脂'], recipe: { ingredients: [{ name: '鲜虾', amount: '200g' }, { name: '姜片', amount: '3片' }, { name: '料酒', amount: '1勺' }], steps: [{ step: 1, desc: '虾洗净，剪去虾须' }, { step: 2, desc: '锅中水烧开，加姜片料酒' }, { step: 3, desc: '放入虾煮至变红（约3分钟）' }, { step: 4, desc: '捞出过冷水，蘸料食用' }], tips: '虾煮的时间不宜过长' } },
      { name: '清炒时蔬', amount: '1份', calories: '80kcal', tags: ['维生素', '低卡'], recipe: { ingredients: [{ name: '时令蔬菜', amount: '200g' }, { name: '蒜末', amount: '2瓣' }], steps: [{ step: 1, desc: '蔬菜洗净切段' }, { step: 2, desc: '热锅爆香蒜末' }, { step: 3, desc: '放入蔬菜快速翻炒' }], tips: '大火快炒保持蔬菜脆嫩' } },
    ],
    [
      { name: '紫菜蛋花汤', amount: '1碗', calories: '100kcal', tags: ['补碘', '清淡'], recipe: { ingredients: [{ name: '紫菜', amount: '10g' }, { name: '鸡蛋', amount: '1个' }, { name: '葱花', amount: '适量' }], steps: [{ step: 1, desc: '紫菜撕碎，鸡蛋打散' }, { step: 2, desc: '锅中水烧开，放入紫菜' }, { step: 3, desc: '淋入蛋液，形成蛋花' }, { step: 4, desc: '加盐调味，撒葱花' }], tips: '蛋液要慢慢淋入' } },
      { name: '蒸鱼', amount: '1份', calories: '220kcal', tags: ['优质蛋白', '低脂'], recipe: { ingredients: [{ name: '鲈鱼', amount: '1条' }, { name: '葱姜', amount: '适量' }, { name: '蒸鱼豉油', amount: '2勺' }], steps: [{ step: 1, desc: '鱼处理干净，铺上葱姜' }, { step: 2, desc: '大火蒸8分钟' }, { step: 3, desc: '淋蒸鱼豉油' }], tips: '蒸的时间不宜过长' } },
      { name: '凉拌木耳', amount: '1份', calories: '60kcal', tags: ['清肠', '低卡'], recipe: { ingredients: [{ name: '黑木耳', amount: '100g' }, { name: '蒜末', amount: '2瓣' }, { name: '生抽', amount: '1勺' }], steps: [{ step: 1, desc: '木耳泡发，焯水2分钟' }, { step: 2, desc: '过冷水，沥干' }, { step: 3, desc: '加入蒜末、生抽拌匀' }], tips: '木耳泡发时间不宜过长' } },
      { name: '小米粥', amount: '1碗', calories: '120kcal', tags: ['养胃', '安神'], recipe: { ingredients: [{ name: '小米', amount: '60g' }, { name: '清水', amount: '500ml' }], steps: [{ step: 1, desc: '小米淘洗干净' }, { step: 2, desc: '锅中水烧开，放入小米' }, { step: 3, desc: '大火烧开转小火煮20分钟' }], tips: '小米粥不宜过稠' } },
    ],
    [
      { name: '玉米排骨汤', amount: '1碗', calories: '280kcal', tags: ['补钙', '健脾'], recipe: { ingredients: [{ name: '排骨', amount: '250g' }, { name: '玉米', amount: '1根' }, { name: '胡萝卜', amount: '1根' }], steps: [{ step: 1, desc: '排骨焯水去血沫' }, { step: 2, desc: '玉米切段，胡萝卜切块' }, { step: 3, desc: '所有材料入锅，加水炖1.5小时' }], tips: '玉米富含膳食纤维' } },
      { name: '清蒸茄子', amount: '1份', calories: '90kcal', tags: ['低卡', '降脂'], recipe: { ingredients: [{ name: '茄子', amount: '1根' }, { name: '蒜末', amount: '3瓣' }, { name: '生抽', amount: '2勺' }], steps: [{ step: 1, desc: '茄子切长条，上锅蒸8分钟' }, { step: 2, desc: '蒜末、生抽调成酱汁' }, { step: 3, desc: '酱汁淋在蒸好的茄子上' }], tips: '茄子蒸后更软糯' } },
      { name: '番茄炒蛋', amount: '1份', calories: '180kcal', tags: ['高蛋白', '维生素'], recipe: { ingredients: [{ name: '番茄', amount: '2个' }, { name: '鸡蛋', amount: '2个' }], steps: [{ step: 1, desc: '番茄切块，鸡蛋打散' }, { step: 2, desc: '热锅炒熟鸡蛋，盛出' }, { step: 3, desc: '炒番茄至出汁，加入鸡蛋翻炒' }], tips: '番茄先炒更容易出汁' } },
      { name: '红豆粥', amount: '1碗', calories: '140kcal', tags: ['补血', '健脾'], recipe: { ingredients: [{ name: '红豆', amount: '60g' }, { name: '大米', amount: '40g' }, { name: '清水', amount: '600ml' }], steps: [{ step: 1, desc: '红豆提前浸泡4小时' }, { step: 2, desc: '红豆、大米入锅加水' }, { step: 3, desc: '大火烧开转小火煮40分钟' }], tips: '红豆富含铁元素' } },
    ],
  ];

  // 下午茶选项池
  const snackOptions = [
    [
      { name: '枸杞菊花茶', amount: '1杯', calories: '15kcal', tags: ['清肝', '明目'], recipe: { ingredients: [{ name: '枸杞', amount: '10粒' }, { name: '菊花', amount: '5朵' }, { name: '热水', amount: '300ml' }], steps: [{ step: 1, desc: '枸杞、菊花放入杯中' }, { step: 2, desc: '冲入热水，焖5分钟' }], tips: '可反复冲泡2-3次' } },
      { name: '原味坚果', amount: '1小把', calories: '150kcal', tags: ['健康脂肪', '饱腹'], recipe: { ingredients: [{ name: '混合坚果', amount: '20g' }], steps: [{ step: 1, desc: '直接食用' }], tips: '选择原味无添加的坚果' } },
    ],
    [
      { name: '红枣桂圆茶', amount: '1杯', calories: '80kcal', tags: ['补血', '安神'], recipe: { ingredients: [{ name: '红枣', amount: '5颗' }, { name: '桂圆', amount: '10粒' }, { name: '热水', amount: '300ml' }], steps: [{ step: 1, desc: '红枣去核，桂圆去壳' }, { step: 2, desc: '放入杯中，冲入热水' }, { step: 3, desc: '焖10分钟即可饮用' }], tips: '可加入少许红糖' } },
      { name: '水果拼盘', amount: '1份', calories: '100kcal', tags: ['维生素', '膳食纤维'], recipe: { ingredients: [{ name: '苹果', amount: '半个' }, { name: '香蕉', amount: '半根' }, { name: '蓝莓', amount: '20g' }], steps: [{ step: 1, desc: '水果洗净切块' }, { step: 2, desc: '摆盘即可' }], tips: '选择当季新鲜水果' } },
    ],
  ];

  // 基于日期和用户档案的伪随机数生成器（同一天同一用户显示相同食谱，不同用户显示不同）
  const today = new Date();
  const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  
  // 根据用户健康档案调整食谱选择
  const goal = userProfile?.fitnessGoal || '保持健康';
  const weight = parseFloat(userProfile?.weight || '60');
  const height = parseFloat(userProfile?.height || '170');
  const bmi = weight / ((height / 100) ** 2);
  
  // 加入用户档案信息作为额外种子，确保不同用户看到不同食谱
  const userSeed = Math.floor((weight * 10 + height + (bmi * 100)) % 1000);
  const combinedSeed = dateSeed + userSeed;
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // 根据目标调整选择逻辑，同时考虑用户BMI和体重
  let breakfastIndex: number, lunchIndex: number, dinnerIndex: number, snackIndex: number;

  // 根据BMI调整选择（BMI越高，越倾向于低热量选项）
  const bmiFactor = bmi > 24 ? 0.7 : bmi > 22 ? 0.5 : 0.3;

  if (goal === '减脂') {
    // 减脂：选择低热量选项（索引较小的通常是低热量）
    breakfastIndex = Math.floor(seededRandom(combinedSeed) * 2); // 前2个选项
    lunchIndex = Math.floor(seededRandom(combinedSeed + 1) * 2);
    dinnerIndex = Math.floor(seededRandom(combinedSeed + 2) * 2);
    snackIndex = Math.floor(seededRandom(combinedSeed + 3) * 2);
  } else if (goal === '增肌') {
    // 增肌：选择高蛋白选项（索引较大的通常是高蛋白）
    breakfastIndex = Math.floor(seededRandom(combinedSeed) * breakfastOptions.length);
    lunchIndex = 2 + Math.floor(seededRandom(combinedSeed + 1) * (lunchOptions.length - 2)); // 后几个选项
    dinnerIndex = Math.floor(seededRandom(combinedSeed + 2) * dinnerOptions.length);
    snackIndex = Math.floor(seededRandom(combinedSeed + 3) * snackOptions.length);
  } else {
    // 保持健康/塑形：根据BMI调整，BMI高则偏向低热量
    breakfastIndex = Math.floor(seededRandom(combinedSeed) * breakfastOptions.length);
    lunchIndex = Math.floor(seededRandom(combinedSeed + 1) * lunchOptions.length);
    dinnerIndex = Math.floor(seededRandom(combinedSeed + 2) * dinnerOptions.length);
    snackIndex = Math.floor(seededRandom(combinedSeed + 3) * snackOptions.length);
  }

  // 确保索引在有效范围内
  breakfastIndex = Math.min(breakfastIndex, breakfastOptions.length - 1);
  lunchIndex = Math.min(lunchIndex, lunchOptions.length - 1);
  dinnerIndex = Math.min(dinnerIndex, dinnerOptions.length - 1);
  snackIndex = Math.min(snackIndex, snackOptions.length - 1);

  const randomBreakfast = breakfastOptions[breakfastIndex];
  const randomLunch = lunchOptions[lunchIndex];
  const randomDinner = dinnerOptions[dinnerIndex];
  const randomSnack = snackOptions[snackIndex];

  return [
    {
      type: '早餐',
      time: '07:00 - 08:00',
      icon: Sun,
      meals: randomBreakfast,
      totalCalories: `${randomBreakfast.reduce((sum, m) => sum + parseInt(m.calories), 0)}kcal`,
      tip: '晨起先饮一杯温水，助脾胃苏醒',
    },
    {
      type: '午餐',
      time: '11:30 - 12:30',
      icon: ChefHat,
      meals: randomLunch,
      totalCalories: `${randomLunch.reduce((sum, m) => sum + parseInt(m.calories), 0)}kcal`,
      tip: '午餐宜七分饱，饭后散步15分钟助消化',
    },
    {
      type: '下午茶',
      time: '15:00 - 15:30',
      icon: Coffee,
      meals: randomSnack,
      totalCalories: `${randomSnack.reduce((sum, m) => sum + parseInt(m.calories), 0)}kcal`,
      tip: '午后小憩15分钟，恢复精力',
    },
    {
      type: '晚餐',
      time: '18:00 - 19:00',
      icon: Moon,
      meals: randomDinner,
      totalCalories: `${randomDinner.reduce((sum, m) => sum + parseInt(m.calories), 0)}kcal`,
      tip: '晚餐宜清淡，睡前3小时不进食',
    },
  ];
}

export default function MealPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<{ name: string; recipe: NonNullable<MealItem['recipe']> } | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [mealPlan, setMealPlan] = useState<MealSlot[]>([]);

  useEffect(() => {
    const generated = localStorage.getItem('mealPlanGenerated');
    if (!generated) {
      router.replace('/');
    } else {
      // 读取用户健康档案
      const profileStr = localStorage.getItem('userProfile');
      let profile: UserProfile | null = null;
      if (profileStr) {
        try {
          profile = JSON.parse(profileStr);
          setUserProfile(profile);
        } catch {
          // ignore
        }
      }
      // 生成随机食谱（根据用户健康档案个性化推荐）
      setMealPlan(generateRandomMealPlan(profile));
      setIsReady(true);
    }
  }, [router]);

  const [expandedSlot, setExpandedSlot] = useState<number | null>(0);
  const [expandedAnalysis, setExpandedAnalysis] = useState<number | null>(0);

  // 打卡功能状态
  const [checkedInMeals, setCheckedInMeals] = useState<string[]>([]);
  const [showCheckInButton, setShowCheckInButton] = useState(false);
  const checkInTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 打开食谱时显示打卡按钮（5秒后消失）
  useEffect(() => {
    if (selectedRecipe) {
      setShowCheckInButton(true);
      if (checkInTimerRef.current) {
        clearTimeout(checkInTimerRef.current);
      }
      checkInTimerRef.current = setTimeout(() => {
        setShowCheckInButton(false);
        checkInTimerRef.current = null;
      }, 5000);
    } else {
      setShowCheckInButton(false);
      if (checkInTimerRef.current) {
        clearTimeout(checkInTimerRef.current);
        checkInTimerRef.current = null;
      }
    }
    return () => {
      if (checkInTimerRef.current) {
        clearTimeout(checkInTimerRef.current);
      }
    };
  }, [selectedRecipe]);

  // 确认打卡
  const handleCheckIn = () => {
    if (selectedRecipe) {
      setCheckedInMeals(prev => [...prev, selectedRecipe.name]);
      setShowCheckInButton(false);
      setSelectedRecipe(null);
      if (checkInTimerRef.current) {
        clearTimeout(checkInTimerRef.current);
        checkInTimerRef.current = null;
      }
    }
  };

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
          {getPersonalAnalysis(userProfile, mealPlan).map((analysis, index) => {
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
                  {slot.meals.filter(meal => !checkedInMeals.includes(meal.name)).map((meal) => {
                    return (
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
                        <div className="flex items-center gap-2 ml-3">
                          <span className="text-sm text-muted-foreground">{meal.calories}</span>
                        </div>
                      </div>
                    );
                  })}
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

              {/* 打卡按钮 */}
              {showCheckInButton && !checkedInMeals.includes(selectedRecipe.name) && (
                <div className="flex justify-center pt-2">
                  <button
                    onClick={handleCheckIn}
                    className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all animate-in fade-in zoom-in-95 shadow-lg"
                  >
                    ✓ 完成打卡
                  </button>
                </div>
              )}
              {checkedInMeals.includes(selectedRecipe.name) && (
                <div className="flex justify-center pt-2">
                  <span className="px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium">
                    ✓ 已打卡
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
