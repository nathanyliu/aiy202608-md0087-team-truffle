'use client';

import { useState } from 'react';
import { MapPin, Search, Leaf, Star, Navigation, ChevronRight, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FoodPlace {
  id: number;
  name: string;
  location: string;
  specialty: string;
  rating: number;
  distance: string;
  tags: string[];
  season: string;
  emoji: string;
}

const regions = ['全部', '华东', '华南', '华北', '西南', '西北', '东北', '华中'];

const places: FoodPlace[] = [
  {
    id: 1,
    name: '宁夏中宁枸杞基地',
    location: '宁夏中卫市中宁县',
    specialty: '枸杞',
    rating: 4.9,
    distance: '1200km',
    tags: ['道地药材', 'GAP认证', '源头直供'],
    season: '6-10月',
    emoji: '🫐',
  },
  {
    id: 2,
    name: '河南焦作铁棍山药',
    location: '河南省焦作市温县',
    specialty: '山药',
    rating: 4.8,
    distance: '800km',
    tags: ['地理标志', '垆土种植', '药食同源'],
    season: '10-12月',
    emoji: '🥔',
  },
  {
    id: 3,
    name: '云南文山三七庄园',
    location: '云南省文山壮族苗族自治州',
    specialty: '三七',
    rating: 4.7,
    distance: '2100km',
    tags: ['道地药材', '有机种植', '三年以上'],
    season: '全年',
    emoji: '🌿',
  },
  {
    id: 4,
    name: '福建福鼎白茶核心产区',
    location: '福建省宁德市福鼎市',
    specialty: '白茶',
    rating: 4.9,
    distance: '1000km',
    tags: ['核心产区', '传统工艺', '高山茶园'],
    season: '3-5月',
    emoji: '🍵',
  },
  {
    id: 5,
    name: '青海柴达木黑枸杞',
    location: '青海省海西蒙古族藏族自治州',
    specialty: '黑枸杞',
    rating: 4.8,
    distance: '1800km',
    tags: ['野生采集', '花青素之王', '高原纯净'],
    season: '7-9月',
    emoji: '🫐',
  },
  {
    id: 6,
    name: '云南罗平生姜基地',
    location: '云南省曲靖市罗平县',
    specialty: '小黄姜',
    rating: 4.6,
    distance: '1900km',
    tags: ['有机种植', '姜辣素高', '驱寒良品'],
    season: '10-12月',
    emoji: '🫚',
  },
  {
    id: 7,
    name: '山东东阿阿胶原产地',
    location: '山东省聊城市东阿县',
    specialty: '阿胶',
    rating: 4.8,
    distance: '600km',
    tags: ['千年传承', '驴皮熬制', '补血圣品'],
    season: '全年',
    emoji: '🏭',
  },
  {
    id: 8,
    name: '新疆若羌红枣庄园',
    location: '新疆巴音郭楞蒙古自治州若羌县',
    specialty: '红枣',
    rating: 4.7,
    distance: '2800km',
    tags: ['灰枣之王', '日照充足', '自然晾干'],
    season: '10-11月',
    emoji: '🫘',
  },
];

export default function MapPage() {
  const [activeRegion, setActiveRegion] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<FoodPlace | null>(null);

  const filtered = places.filter((p) => {
    const matchSearch =
      !searchQuery ||
      p.name.includes(searchQuery) ||
      p.specialty.includes(searchQuery) ||
      p.location.includes(searchQuery);
    return matchSearch;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 space-y-6">
      {/* 页面标题 */}
      <div className="card-warm p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-serif-cn text-xl font-bold">食养地图</h1>
            <p className="text-xs text-muted-foreground">寻味中国，道地食材产地溯源</p>
          </div>
        </div>

        {/* 搜索 */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索产地、食材、省份..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-warm pl-9"
          />
        </div>

        {/* 区域筛选 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Compass className="h-4 w-4 text-muted-foreground shrink-0" />
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-200 border',
                activeRegion === region
                  ? 'bg-primary/10 border-primary/30 text-primary font-medium'
                  : 'bg-background border-border text-muted-foreground hover:border-primary/20'
              )}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* 地图可视化区域 */}
      <div className="card-warm p-6">
        <div className="relative h-64 sm:h-80 bg-muted/30 rounded-xl flex items-center justify-center overflow-hidden">
          {/* 简化的中国地图示意 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full max-w-md">
              {/* 地图上的点 */}
              {places.map((place, i) => {
                const positions = [
                  { top: '30%', left: '25%' },
                  { top: '45%', left: '55%' },
                  { top: '60%', left: '35%' },
                  { top: '55%', left: '70%' },
                  { top: '25%', left: '30%' },
                  { top: '65%', left: '40%' },
                  { top: '40%', left: '60%' },
                  { top: '35%', left: '20%' },
                ];
                const pos = positions[i % positions.length];
                return (
                  <button
                    key={place.id}
                    onClick={() => setSelectedPlace(place)}
                    className={cn(
                      'absolute flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:scale-125',
                      selectedPlace?.id === place.id
                        ? 'bg-primary text-primary-foreground shadow-lg scale-125 z-10'
                        : 'bg-primary/20 text-primary hover:bg-primary/30'
                    )}
                    style={{ top: pos.top, left: pos.left }}
                    title={place.name}
                  >
                    <span className="text-sm">{place.emoji}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <p className="absolute bottom-3 right-3 text-xs text-muted-foreground/50">
            点击标记查看详情
          </p>
        </div>
      </div>

      {/* 产地列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((place) => (
          <button
            key={place.id}
            onClick={() => setSelectedPlace(place)}
            className={cn(
              'card-warm p-4 text-left transition-all duration-200',
              selectedPlace?.id === place.id && 'ring-2 ring-primary/30 border-primary/30'
            )}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50 shrink-0">
                <span className="text-2xl">{place.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-medium text-foreground truncate">{place.name}</h3>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3" />
                  {place.location}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-chart-3 text-chart-3" />
                    <span className="text-xs">{place.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">当季: {place.season}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {place.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-1.5 py-0.5 rounded bg-primary/6 text-primary/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">暂无符合条件的产地</p>
        </div>
      )}
    </div>
  );
}
