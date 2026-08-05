'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  Heart,
  MessageSquare,
  Clock,
  Flame,
  ChefHat,
  Star,
  Plus,
  X,
  Check,
  Sparkles,
  Apple,
  Search,
  Filter,
  Upload,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecipeIngredient {
  name: string;
  amount: string;
}

interface NutritionInfo {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
}

interface CommunityRecipe {
  id: number;
  author: string;
  avatar: string;
  time: string;
  title: string;
  desc: string;
  emoji: string;
  cookTime: string;
  difficulty: string;
  servings: string;
  ingredients: RecipeIngredient[];
  nutrition: NutritionInfo;
  tags: string[];
  likes: number;
  comments: number;
  isLiked: boolean;
  steps: string[];
  fitReasons: string[];
  isUserCreated?: boolean;
}

const defaultRecipes: CommunityRecipe[] = [
  {
    id: 1,
    author: '食养达人小林',
    avatar: '🧑‍🍳',
    time: '2小时前',
    title: '冬瓜薏米老鸭汤',
    desc: '大暑祛湿必备，汤色清亮，鸭肉软烂，全家都爱喝',
    emoji: '🍲',
    cookTime: '2.5小时',
    difficulty: '中等',
    servings: '3-4人份',
    ingredients: [
      { name: '老鸭', amount: '半只(约500g)' },
      { name: '冬瓜', amount: '300g' },
      { name: '薏米', amount: '50g' },
      { name: '生姜', amount: '3片' },
      { name: '料酒', amount: '1勺' },
      { name: '盐', amount: '适量' },
    ],
    nutrition: { calories: '320kcal', protein: '28g', carbs: '12g', fat: '18g', fiber: '3g' },
    tags: ['祛湿', '消暑', '大暑推荐'],
    likes: 234,
    comments: 45,
    isLiked: false,
    steps: [
      '薏米提前浸泡2小时，老鸭斩块冷水下锅焯水去血沫',
      '砂锅加清水，放入鸭块、姜片、料酒，大火烧开转小火炖1.5小时',
      '加入薏米继续炖30分钟',
      '最后加入冬瓜块再煮20分钟，加盐调味即可',
    ],
    fitReasons: ['大暑时节祛湿消暑', '鸭肉性凉适合夏季', '薏米利水渗湿'],
  },
  {
    id: 2,
    author: '中医营养师王老师',
    avatar: '👨‍⚕️',
    time: '4小时前',
    title: '山药莲子养胃粥',
    desc: '健脾养胃的温和粥品，适合脾胃虚弱的人群日常调理',
    emoji: '🥣',
    cookTime: '45分钟',
    difficulty: '简单',
    servings: '2人份',
    ingredients: [
      { name: '山药', amount: '100g' },
      { name: '莲子', amount: '30g' },
      { name: '粳米', amount: '80g' },
      { name: '枸杞', amount: '10g' },
      { name: '清水', amount: '800ml' },
    ],
    nutrition: { calories: '220kcal', protein: '6g', carbs: '45g', fat: '1g', fiber: '4g' },
    tags: ['健脾', '养胃', '早餐'],
    likes: 189,
    comments: 32,
    isLiked: false,
    steps: [
      '莲子提前浸泡1小时，山药去皮切小块',
      '粳米洗净，与莲子一起入锅加水',
      '大火烧开后转小火煮30分钟',
      '加入山药块继续煮15分钟至软糯',
      '最后撒入枸杞，焖5分钟即可',
    ],
    fitReasons: ['山药健脾益胃', '莲子养心安神', '适合脾胃虚弱者'],
  },
  {
    id: 3,
    author: '健身餐达人阿力',
    avatar: '💪',
    time: '6小时前',
    title: '鸡胸肉藜麦沙拉',
    desc: '高蛋白低脂，健身增肌必备，饱腹感强',
    emoji: '🥗',
    cookTime: '25分钟',
    difficulty: '简单',
    servings: '1人份',
    ingredients: [
      { name: '鸡胸肉', amount: '150g' },
      { name: '藜麦', amount: '50g' },
      { name: '西兰花', amount: '80g' },
      { name: '小番茄', amount: '5颗' },
      { name: '橄榄油', amount: '1勺' },
      { name: '黑胡椒', amount: '适量' },
    ],
    nutrition: { calories: '380kcal', protein: '35g', carbs: '28g', fat: '12g', fiber: '6g' },
    tags: ['高蛋白', '增肌', '低脂'],
    likes: 312,
    comments: 56,
    isLiked: false,
    steps: [
      '藜麦洗净，加水煮15分钟至透明圈出现，沥干备用',
      '鸡胸肉用黑胡椒腌制10分钟，煎至两面金黄熟透',
      '西兰花焯水2分钟，小番茄对半切开',
      '将所有食材摆盘，淋上橄榄油，撒少许盐即可',
    ],
    fitReasons: ['高蛋白支持肌肉修复', '藜麦完全蛋白', '低脂适合减脂期'],
  },
  {
    id: 4,
    author: '养生博主小雅',
    avatar: '🌸',
    time: '8小时前',
    title: '红枣桂圆补血茶',
    desc: '女性养生必备，气血双补，面色红润',
    emoji: '🍵',
    cookTime: '30分钟',
    difficulty: '简单',
    servings: '2人份',
    ingredients: [
      { name: '红枣', amount: '8颗' },
      { name: '桂圆', amount: '15g' },
      { name: '枸杞', amount: '10g' },
      { name: '红糖', amount: '20g' },
      { name: '清水', amount: '600ml' },
    ],
    nutrition: { calories: '150kcal', protein: '2g', carbs: '35g', fat: '0g', fiber: '2g' },
    tags: ['补血', '养颜', '女性'],
    likes: 456,
    comments: 78,
    isLiked: false,
    steps: [
      '红枣去核，桂圆洗净',
      '锅中加水，放入红枣和桂圆',
      '大火烧开后转小火煮20分钟',
      '加入枸杞和红糖，再煮5分钟即可',
    ],
    fitReasons: ['红枣补中益气', '桂圆养血安神', '适合气血不足者'],
  },
  {
    id: 5,
    author: '甜品师小陈',
    avatar: '👩‍🍳',
    time: '1天前',
    title: '银耳莲子百合羹',
    desc: '滋阴润肺的 classic 甜品，口感软糯，适合全家',
    emoji: '🍮',
    cookTime: '1.5小时',
    difficulty: '中等',
    servings: '3-4人份',
    ingredients: [
      { name: '银耳', amount: '1朵(约30g)' },
      { name: '莲子', amount: '30g' },
      { name: '百合', amount: '20g' },
      { name: '红枣', amount: '6颗' },
      { name: '冰糖', amount: '30g' },
    ],
    nutrition: { calories: '180kcal', protein: '4g', carbs: '40g', fat: '1g', fiber: '3g' },
    tags: ['滋阴', '润肺', '甜品'],
    likes: 421,
    comments: 67,
    isLiked: false,
    steps: [
      '银耳提前泡发2小时，撕成小朵',
      '莲子、百合分别浸泡30分钟',
      '银耳入锅加水，大火烧开转小火煮1小时至出胶',
      '加入莲子、百合、红枣继续煮20分钟',
      '最后加入冰糖搅拌融化即可',
    ],
    fitReasons: ['银耳滋阴润燥', '适合秋季前调理', '温和甜品不伤脾胃'],
  },
  {
    id: 6,
    author: '家常美食张姐',
    avatar: '👩‍🍳',
    time: '2天前',
    title: '姜枣茶',
    desc: '冬吃萝卜夏吃姜，大暑喝一杯暖胃驱寒的姜枣茶',
    emoji: '🫚',
    cookTime: '20分钟',
    difficulty: '简单',
    servings: '2人份',
    ingredients: [
      { name: '老姜', amount: '30g' },
      { name: '红枣', amount: '8颗' },
      { name: '红糖', amount: '20g' },
      { name: '清水', amount: '600ml' },
    ],
    nutrition: { calories: '95kcal', protein: '1g', carbs: '22g', fat: '0g', fiber: '1g' },
    tags: ['驱寒', '暖胃', '夏日饮品'],
    likes: 198,
    comments: 28,
    isLiked: false,
    steps: [
      '老姜洗净切片，红枣去核',
      '锅中加水，放入姜片和红枣',
      '大火烧开后转小火煮15分钟',
      '加入红糖搅拌至融化，关火即可',
    ],
    fitReasons: ['夏季空调房驱寒', '温中散寒暖脾胃', '早起空腹饮用最佳'],
  },
];

const topics = ['祛湿', '健脾', '高蛋白', '低脂', '滋阴', '驱寒', '明目', '消暑'];

interface NewRecipeForm {
  title: string;
  desc: string;
  emoji: string;
  cookTime: string;
  difficulty: string;
  servings: string;
  ingredients: string;
  steps: string;
  effects: string;
  tags: string;
}

export default function CirclePage() {
  const [recipes, setRecipes] = useState<CommunityRecipe[]>(defaultRecipes);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<CommunityRecipe | null>(null);
  const [addedRecipes, setAddedRecipes] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [likedRecipes, setLikedRecipes] = useState<number[]>([]);
  const [newRecipe, setNewRecipe] = useState<NewRecipeForm>({
    title: '',
    desc: '',
    emoji: '🍲',
    cookTime: '',
    difficulty: '简单',
    servings: '1人份',
    ingredients: '',
    steps: '',
    effects: '',
    tags: '',
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('recipeFavorites');
    const savedLikes = localStorage.getItem('recipeLikes');
    const savedUserRecipes = localStorage.getItem('userRecipes');

    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedLikes) setLikedRecipes(JSON.parse(savedLikes));
    if (savedUserRecipes) {
      const userRecipes = JSON.parse(savedUserRecipes);
      setRecipes([...defaultRecipes, ...userRecipes]);
    }
  }, []);

  const toggleLike = (id: number) => {
    setLikedRecipes((prev) => {
      const newLikes = prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id];
      localStorage.setItem('recipeLikes', JSON.stringify(newLikes));
      return newLikes;
    });
    // Update likes count in recipes
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, likes: likedRecipes.includes(id) ? r.likes - 1 : r.likes + 1 }
          : r
      )
    );
  };

  const addToMealPlan = (id: number) => {
    setAddedRecipes((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id];
      localStorage.setItem('recipeFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const handleUploadRecipe = () => {
    if (!newRecipe.title || !newRecipe.ingredients || !newRecipe.steps) {
      alert('请填写食谱名称、原料和做法');
      return;
    }

    const ingredientList = newRecipe.ingredients
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => {
        const parts = line.split(/[,，:：]/);
        return {
          name: parts[0]?.trim() || '',
          amount: parts[1]?.trim() || '适量',
        };
      });

    const stepList = newRecipe.steps
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => line.replace(/^\d+[.、)\]]\s*/, '').trim());

    const tagList = newRecipe.tags
      .split(/[,，、]/)
      .filter((t) => t.trim())
      .map((t) => t.trim());

    const effectList = newRecipe.effects
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => line.replace(/^[-•·]\s*/, '').trim());

    const userRecipe: CommunityRecipe = {
      id: Date.now(),
      author: '我',
      avatar: '😊',
      time: '刚刚',
      title: newRecipe.title,
      desc: newRecipe.desc || '我的自制食谱',
      emoji: newRecipe.emoji || '🍲',
      cookTime: newRecipe.cookTime || '未知',
      difficulty: newRecipe.difficulty,
      servings: newRecipe.servings,
      ingredients: ingredientList,
      nutrition: { calories: '--', protein: '--', carbs: '--', fat: '--', fiber: '--' },
      tags: tagList.length > 0 ? tagList : ['自制'],
      likes: 0,
      comments: 0,
      isLiked: false,
      steps: stepList,
      fitReasons: effectList.length > 0 ? effectList : ['自制食谱'],
      isUserCreated: true,
    };

    const updatedRecipes = [...recipes, userRecipe];
    setRecipes(updatedRecipes);

    // Save user recipes to localStorage
    const userRecipes = updatedRecipes.filter((r) => r.isUserCreated);
    localStorage.setItem('userRecipes', JSON.stringify(userRecipes));

    // Reset form and close modal
    setNewRecipe({
      title: '',
      desc: '',
      emoji: '🍲',
      cookTime: '',
      difficulty: '简单',
      servings: '1人份',
      ingredients: '',
      steps: '',
      effects: '',
      tags: '',
    });
    setShowUpload(false);
  };

  const filtered = recipes.filter((r) => {
    if (showFavorites && !favorites.includes(r.id)) return false;
    const matchTopic = !activeTopic || r.tags.some((t) => t.includes(activeTopic));
    const matchSearch =
      !searchQuery ||
      r.title.includes(searchQuery) ||
      r.desc.includes(searchQuery) ||
      r.tags.some((t) => t.includes(searchQuery));
    return matchTopic && matchSearch;
  });

  const emojiOptions = ['🍲', '🥗', '🥣', '🍵', '🍮', '🥘', '🍜', '🥙', '🍱', '🫕'];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-6 space-y-6">
      {/* 页面标题 */}
      <div className="card-warm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-serif-cn text-xl font-bold">食方社区</h1>
              <p className="text-xs text-muted-foreground">分享自制食谱，让 AI 融入你的专属食养方案</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* 发布食谱按钮 */}
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-primary text-primary-foreground hover:opacity-90 transition-all"
            >
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">发布食谱</span>
            </button>
            {/* 收藏夹切换 */}
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 border',
                showFavorites
                  ? 'bg-rose-50 text-rose-600 border-rose-200'
                  : 'bg-background text-muted-foreground hover:text-rose-500 border-border'
              )}
            >
              <Heart className={cn('h-4 w-4', showFavorites && 'fill-current')} />
              <span className="hidden sm:inline">收藏夹</span>
              {favorites.length > 0 && (
                <span className="text-xs bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded-full">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 搜索 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索食谱、功效、食材..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-warm pl-9"
          />
        </div>
      </div>

      {/* 话题标签 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => setActiveTopic(activeTopic === topic ? null : topic)}
            className={cn(
              'px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all duration-200 border',
              activeTopic === topic
                ? 'bg-primary/10 border-primary/30 text-primary font-medium'
                : 'bg-background border-border text-muted-foreground hover:border-primary/20'
            )}
          >
            #{topic}
          </button>
        ))}
      </div>

      {/* 已加入食方的提示 */}
      {addedRecipes.length > 0 && (
        <div className="card-warm p-3 flex items-center gap-2 bg-primary/5 border-primary/15">
          <Sparkles className="h-4 w-4 text-primary shrink-0" />
          <p className="text-xs text-foreground/80">
            已选 <span className="font-semibold text-primary">{addedRecipes.length}</span> 道食谱，
            AI 将把这些食谱融入你的今日食方，结合你的体质和需求个性化调整
          </p>
        </div>
      )}

      {/* 收藏夹标题 */}
      {showFavorites && (
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-rose-500 fill-current" />
          <span className="text-sm font-medium text-foreground">我的收藏</span>
          <span className="text-xs text-muted-foreground">({favorites.length} 道食谱)</span>
        </div>
      )}

      {/* 食谱卡片列表 */}
      {filtered.length === 0 ? (
        <div className="card-warm p-8 text-center">
          <Heart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            {showFavorites ? '还没有收藏的食谱，去浏览社区收藏喜欢的吧' : '没有找到匹配的食谱'}
          </p>
        </div>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((recipe) => (
          <div key={recipe.id} className="card-warm overflow-hidden group">
            {/* 食谱头部 */}
            <button
              onClick={() => setSelectedRecipe(recipe)}
              className="w-full text-left p-4 pb-3"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted/40 shrink-0 text-3xl">
                  {recipe.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground line-clamp-1">{recipe.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{recipe.desc}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />{recipe.cookTime}
                    </span>
                    <span>{recipe.difficulty}</span>
                    <span className="flex items-center gap-0.5">
                      <Flame className="h-3 w-3" />{recipe.nutrition.calories}
                    </span>
                  </div>
                </div>
              </div>
            </button>

            {/* 标签和操作 */}
            <div className="px-4 pb-3 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {recipe.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-1.5 py-0.5 rounded bg-primary/6 text-primary/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => toggleFavorite(recipe.id)}
                  className={cn(
                    'flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-all duration-200',
                    favorites.includes(recipe.id)
                      ? 'text-rose-500'
                      : 'text-muted-foreground hover:text-rose-400'
                  )}
                  title={favorites.includes(recipe.id) ? '取消收藏' : '收藏'}
                >
                  <Heart className={cn('h-3.5 w-3.5', favorites.includes(recipe.id) && 'fill-current')} />
                </button>
                <button
                  onClick={() => addToMealPlan(recipe.id)}
                  className={cn(
                    'flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200',
                    addedRecipes.includes(recipe.id)
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground'
                  )}
                >
                  {addedRecipes.includes(recipe.id) ? (
                    <>
                      <Check className="h-3 w-3" />已加入
                    </>
                  ) : (
                    <>
                      <Plus className="h-3 w-3" />加入食方
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 作者和互动 */}
            <div className="px-4 pb-3 pt-1 border-t border-border/30 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-sm">{recipe.avatar}</span>
                <span className="text-xs text-muted-foreground">{recipe.author}</span>
                <span className="text-xs text-muted-foreground/50">· {recipe.time}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <button
                  onClick={() => toggleLike(recipe.id)}
                  className={cn(
                    'flex items-center gap-0.5 transition-colors',
                    likedRecipes.includes(recipe.id) ? 'text-destructive' : 'hover:text-destructive'
                  )}
                >
                  <Heart className={cn('h-3 w-3', likedRecipes.includes(recipe.id) && 'fill-current')} />
                  {recipe.likes}
                </button>
                <span className="flex items-center gap-0.5">
                  <MessageSquare className="h-3 w-3" />
                  {recipe.comments}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* 发布食谱弹窗 */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowUpload(false)}
          />
          <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-card rounded-t-2xl sm:rounded-2xl border border-border shadow-xl">
            {/* 弹窗头部 */}
            <div className="sticky top-0 bg-card/95 backdrop-blur-sm z-10 p-4 border-b border-border/40 flex items-center justify-between">
              <h2 className="font-serif-cn text-base font-bold flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                发布我的食谱
              </h2>
              <button
                onClick={() => setShowUpload(false)}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* 食谱名称 */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">食谱名称 *</label>
                <input
                  type="text"
                  value={newRecipe.title}
                  onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
                  placeholder="例如：红枣枸杞银耳羹"
                  className="input-warm"
                />
              </div>

              {/* 简介 */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">简介</label>
                <input
                  type="text"
                  value={newRecipe.desc}
                  onChange={(e) => setNewRecipe({ ...newRecipe, desc: e.target.value })}
                  placeholder="一句话描述这道食谱"
                  className="input-warm"
                />
              </div>

              {/* Emoji 选择 */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">选择图标</label>
                <div className="flex flex-wrap gap-2">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setNewRecipe({ ...newRecipe, emoji })}
                      className={cn(
                        'w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all',
                        newRecipe.emoji === emoji
                          ? 'bg-primary/10 border-2 border-primary'
                          : 'bg-muted/50 border border-transparent hover:border-primary/30'
                      )}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* 烹饪信息 */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">烹饪时间</label>
                  <input
                    type="text"
                    value={newRecipe.cookTime}
                    onChange={(e) => setNewRecipe({ ...newRecipe, cookTime: e.target.value })}
                    placeholder="30分钟"
                    className="input-warm text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">难度</label>
                  <select
                    value={newRecipe.difficulty}
                    onChange={(e) => setNewRecipe({ ...newRecipe, difficulty: e.target.value })}
                    className="input-warm text-xs"
                  >
                    <option>简单</option>
                    <option>中等</option>
                    <option>困难</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">份量</label>
                  <input
                    type="text"
                    value={newRecipe.servings}
                    onChange={(e) => setNewRecipe({ ...newRecipe, servings: e.target.value })}
                    placeholder="2人份"
                    className="input-warm text-xs"
                  />
                </div>
              </div>

              {/* 原料 */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">原料清单 *</label>
                <textarea
                  value={newRecipe.ingredients}
                  onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
                  placeholder={"每行一个，格式：食材名, 用量\n例如：\n红枣, 8颗\n枸杞, 10g\n冰糖, 适量"}
                  className="input-warm min-h-[100px] text-xs"
                  rows={4}
                />
              </div>

              {/* 做法 */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">做法步骤 *</label>
                <textarea
                  value={newRecipe.steps}
                  onChange={(e) => setNewRecipe({ ...newRecipe, steps: e.target.value })}
                  placeholder={"每行一个步骤\n例如：\n红枣去核，枸杞洗净\n锅中加水，放入红枣大火烧开\n转小火煮20分钟，加入枸杞和冰糖"}
                  className="input-warm min-h-[100px] text-xs"
                  rows={4}
                />
              </div>

              {/* 功效/效果 */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">功效/效果</label>
                <textarea
                  value={newRecipe.effects}
                  onChange={(e) => setNewRecipe({ ...newRecipe, effects: e.target.value })}
                  placeholder={"这道食谱的功效，每行一条\n例如：\n补气养血\n美容养颜\n适合体虚者"}
                  className="input-warm min-h-[80px] text-xs"
                  rows={3}
                />
              </div>

              {/* 标签 */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">标签</label>
                <input
                  type="text"
                  value={newRecipe.tags}
                  onChange={(e) => setNewRecipe({ ...newRecipe, tags: e.target.value })}
                  placeholder="用逗号分隔，如：祛湿, 健脾, 早餐"
                  className="input-warm"
                />
              </div>

              {/* 提交按钮 */}
              <button
                onClick={handleUploadRecipe}
                className="w-full py-3 rounded-xl font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Check className="h-4 w-4" />
                发布食谱
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 食谱详情弹窗 */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedRecipe(null)}
          />
          <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-card rounded-t-2xl sm:rounded-2xl border border-border shadow-xl">
            {/* 弹窗头部 */}
            <div className="sticky top-0 bg-card/95 backdrop-blur-sm z-10 p-4 border-b border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedRecipe.emoji}</span>
                <div>
                  <h2 className="font-serif-cn text-base font-bold">{selectedRecipe.title}</h2>
                  <p className="text-xs text-muted-foreground">{selectedRecipe.desc}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <div className="p-4 space-y-5">
              {/* 基本信息 */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{selectedRecipe.cookTime}</span>
                <span>{selectedRecipe.difficulty}</span>
                <span>{selectedRecipe.servings}</span>
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-chart-3" />4.8</span>
              </div>

              {/* 为什么适合你 */}
              <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 space-y-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">功效/效果</span>
                </div>
                <ul className="space-y-1">
                  {selectedRecipe.fitReasons.map((reason, i) => (
                    <li key={i} className="text-xs text-foreground/80 flex items-start gap-1.5">
                      <span className="text-primary mt-0.5">·</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 原料清单 */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <Apple className="h-4 w-4 text-accent" />
                  原料清单
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedRecipe.ingredients.map((ing) => (
                    <div
                      key={ing.name}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/30 text-xs"
                    >
                      <span className="text-foreground">{ing.name}</span>
                      <span className="text-muted-foreground">{ing.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 营养成分 */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-accent" />
                  营养成分
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { label: '热量', value: selectedRecipe.nutrition.calories, color: 'text-accent' },
                    { label: '蛋白质', value: selectedRecipe.nutrition.protein, color: 'text-primary' },
                    { label: '碳水', value: selectedRecipe.nutrition.carbs, color: 'text-chart-4' },
                    { label: '脂肪', value: selectedRecipe.nutrition.fat, color: 'text-chart-5' },
                    { label: '纤维', value: selectedRecipe.nutrition.fiber, color: 'text-chart-3' },
                  ].map((item) => (
                    <div key={item.label} className="text-center p-2 rounded-lg bg-muted/20">
                      <p className={cn('text-sm font-bold', item.color)}>{item.value}</p>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  数据参考《中国食物成分表》及 USDA FoodData Central
                </p>
              </div>

              {/* 做法步骤 */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <ChefHat className="h-4 w-4 text-accent" />
                  做法步骤
                </h3>
                <ol className="space-y-2">
                  {selectedRecipe.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-foreground/80 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* 点赞和加入食方 */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleLike(selectedRecipe.id)}
                  className={cn(
                    'flex-1 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all border',
                    likedRecipes.includes(selectedRecipe.id)
                      ? 'bg-destructive/10 text-destructive border-destructive/20'
                      : 'bg-muted text-muted-foreground hover:text-destructive border-border'
                  )}
                >
                  <Heart className={cn('h-4 w-4', likedRecipes.includes(selectedRecipe.id) && 'fill-current')} />
                  {likedRecipes.includes(selectedRecipe.id) ? '已点赞' : '点赞'} ({selectedRecipe.likes})
                </button>
                <button
                  onClick={() => {
                    addToMealPlan(selectedRecipe.id);
                    setSelectedRecipe(null);
                  }}
                  className={cn(
                    'flex-1 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all',
                    addedRecipes.includes(selectedRecipe.id)
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'bg-primary text-primary-foreground hover:opacity-90'
                  )}
                >
                  {addedRecipes.includes(selectedRecipe.id) ? (
                    <>
                      <Check className="h-4 w-4" />
                      已加入今日食方
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      加入今日食方
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
