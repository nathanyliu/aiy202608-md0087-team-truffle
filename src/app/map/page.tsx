'use client';

import { useState } from 'react';
import { MapPin, Search, Navigation, Star, Phone, Shield, Leaf, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Restaurant {
  id: number;
  name: string;
  address: string;
  phone: string;
  type: '素食' | '沙拉';
  rating: number;
  tags: string[];
  verified: boolean;
  lat: number;
  lng: number;
  emoji: string;
}

const districts = ['全部', '福田区', '南山区', '罗湖区', '宝安区', '龙华区', '龙岗区'];

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: '青蔬素食·福田店',
    address: '深圳市福田区益田路卓越世纪中心B1层',
    phone: '0755-8288xxxx',
    type: '素食',
    rating: 4.8,
    tags: ['有机食材', '无五辛', '药膳养生'],
    verified: true,
    lat: 22.5331,
    lng: 114.0595,
    emoji: '🥬',
  },
  {
    id: 2,
    name: 'Green Salad 绿沙轻食',
    address: '深圳市南山区科技园南区深南大道9966号',
    phone: '0755-8632xxxx',
    type: '沙拉',
    rating: 4.7,
    tags: ['低卡', '高蛋白', '进口蔬菜'],
    verified: true,
    lat: 22.5362,
    lng: 113.9454,
    emoji: '🥗',
  },
  {
    id: 3,
    name: '素心阁·素食餐厅',
    address: '深圳市罗湖区东门南路3009号金城大厦2楼',
    phone: '0755-2518xxxx',
    type: '素食',
    rating: 4.9,
    tags: ['佛教素食', '自助素餐', '养生汤品'],
    verified: true,
    lat: 22.5483,
    lng: 114.1212,
    emoji: '🍃',
  },
  {
    id: 4,
    name: 'Bowl 沙拉碗·南山店',
    address: '深圳市南山区海德三道海岸城东区B座1层',
    phone: '0755-8635xxxx',
    type: '沙拉',
    rating: 4.6,
    tags: ['超级食物', '定制沙拉', '冷压果汁'],
    verified: true,
    lat: 22.5175,
    lng: 113.9386,
    emoji: '🥑',
  },
  {
    id: 5,
    name: '一叶一世界·藏茶素食',
    address: '深圳市福田区车公庙泰然九路海松大厦B座1层',
    phone: '0755-8343xxxx',
    type: '素食',
    rating: 4.8,
    tags: ['禅意空间', '藏茶', '创意素食'],
    verified: true,
    lat: 22.5389,
    lng: 114.0234,
    emoji: '🌿',
  },
  {
    id: 6,
    name: '超级碗 Superbowl·宝安店',
    address: '深圳市宝安区新安街道海旺社区海滨广场B1层',
    phone: '0755-2778xxxx',
    type: '沙拉',
    rating: 4.5,
    tags: ['谷物碗', '植物蛋白', '无麸质可选'],
    verified: true,
    lat: 22.5554,
    lng: 113.8832,
    emoji: '🥙',
  },
  {
    id: 7,
    name: '静莲斋·素食馆',
    address: '深圳市龙华区民治街道星河COCO City 3楼',
    phone: '0755-2812xxxx',
    type: '素食',
    rating: 4.7,
    tags: ['家常素菜', '素火锅', '菌菇汤'],
    verified: true,
    lat: 22.6253,
    lng: 114.0356,
    emoji: '🪷',
  },
  {
    id: 8,
    name: 'Fresh 鲜沙拉·龙岗店',
    address: '深圳市龙岗区龙城街道万科广场4楼L4-018',
    phone: '0755-8932xxxx',
    type: '沙拉',
    rating: 4.6,
    tags: ['当日现做', '有机蔬菜', '低碳水'],
    verified: true,
    lat: 22.7201,
    lng: 114.2468,
    emoji: '🥬',
  },
  {
    id: 9,
    name: '慈心素食·罗湖店',
    address: '深圳市罗湖区红荔路园岭新村商铺102号',
    phone: '0755-2587xxxx',
    type: '素食',
    rating: 4.8,
    tags: ['老字号', '素包子', '养生粥'],
    verified: true,
    lat: 22.5568,
    lng: 114.1089,
    emoji: '🌱',
  },
  {
    id: 10,
    name: '沙拉日记 Salad Diary',
    address: '深圳市南山区蛇口海上世界文化艺术中心1层',
    phone: '0755-8629xxxx',
    type: '沙拉',
    rating: 4.7,
    tags: ['海景餐厅', '地中海风', '鲜榨果汁'],
    verified: true,
    lat: 22.4856,
    lng: 113.9234,
    emoji: '🥗',
  },
];

function openInMap(name: string, address: string) {
  const query = encodeURIComponent(`${name} ${address}`);
  // 尝试打开设备默认地图应用
  // iOS: maps://  Apple Maps
  // Android: geo:  或 intent:
  // 通用: 高德地图 URI
  const amapUrl = `https://uri.amap.com/search?keyword=${query}&city=深圳`;
  const appleUrl = `maps://maps.apple.com/?q=${query}`;
  const geoUrl = `geo:0,0?q=${query}`;

  // 检测平台
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) {
    // iOS: 尝试 Apple Maps
    window.open(appleUrl, '_blank');
  } else if (/android/.test(ua)) {
    // Android: 使用 geo URI
    window.open(geoUrl, '_blank');
  } else {
    // 桌面端: 使用高德地图网页版
    window.open(amapUrl, '_blank');
  }
}

export default function MapPage() {
  const [activeDistrict, setActiveDistrict] = useState('全部');
  const [activeType, setActiveType] = useState<'全部' | '素食' | '沙拉'>('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = restaurants.filter((r) => {
    const matchDistrict =
      activeDistrict === '全部' || r.address.includes(activeDistrict.replace('区', ''));
    const matchType = activeType === '全部' || r.type === activeType;
    const matchSearch =
      !searchQuery ||
      r.name.includes(searchQuery) ||
      r.address.includes(searchQuery) ||
      r.tags.some((t) => t.includes(searchQuery));
    return matchDistrict && matchType && matchSearch;
  });

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-6 space-y-6">
      {/* 页面标题 */}
      <div className="card-warm p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-serif-cn text-xl font-bold">食养地图</h1>
            <p className="text-xs text-muted-foreground">深圳 · 认证素食沙拉餐厅导航</p>
          </div>
        </div>

        {/* 认证说明 */}
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-primary/5 border border-primary/10 mb-4">
          <Shield className="h-4 w-4 text-primary shrink-0" />
          <p className="text-xs text-foreground/80">
            所有餐厅均经过卫生资质认证，定期审核，确保食品安全与环境整洁
          </p>
        </div>

        {/* 搜索 */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索餐厅名称、地址、标签..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-warm pl-9"
          />
        </div>

        {/* 类型筛选 */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-muted-foreground shrink-0">类型:</span>
          {(['全部', '素食', '沙拉'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm transition-all duration-200 border',
                activeType === type
                  ? 'bg-primary/10 border-primary/30 text-primary font-medium'
                  : 'bg-background border-border text-muted-foreground hover:border-primary/20'
              )}
            >
              {type === '素食' ? '🌱 素食' : type === '沙拉' ? '🥗 沙拉' : '全部'}
            </button>
          ))}
        </div>

        {/* 区域筛选 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs text-muted-foreground shrink-0">区域:</span>
          {districts.map((district) => (
            <button
              key={district}
              onClick={() => setActiveDistrict(district)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-200 border',
                activeDistrict === district
                  ? 'bg-primary/10 border-primary/30 text-primary font-medium'
                  : 'bg-background border-border text-muted-foreground hover:border-primary/20'
              )}
            >
              {district}
            </button>
          ))}
        </div>
      </div>

      {/* 餐厅列表 */}
      <div className="space-y-3">
        {filtered.map((restaurant) => (
          <div key={restaurant.id} className="card-warm p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/40 shrink-0 text-2xl">
                  {restaurant.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-foreground truncate">
                      {restaurant.name}
                    </h3>
                    <span
                      className={cn(
                        'text-xs px-1.5 py-0.5 rounded-full',
                        restaurant.type === '素食'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-chart-4/10 text-chart-4'
                      )}
                    >
                      {restaurant.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span className="truncate">{restaurant.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                    <Phone className="h-3 w-3 shrink-0" />
                    <span>{restaurant.phone}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-0.5 shrink-0 ml-2">
                <Star className="h-4 w-4 fill-chart-3 text-chart-3" />
                <span className="text-sm font-medium">{restaurant.rating}</span>
              </div>
            </div>

            {/* 标签 */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {restaurant.verified && (
                <span className="flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded bg-primary/8 text-primary">
                  <Shield className="h-3 w-3" />
                  卫生认证
                </span>
              )}
              {restaurant.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 导航按钮 */}
            <button
              onClick={() => openInMap(restaurant.name, restaurant.address)}
              className="w-full py-2.5 rounded-lg bg-primary/10 hover:bg-primary/15 text-primary text-sm font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Navigation className="h-4 w-4" />
              导航到此餐厅
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">暂无符合条件的餐厅</p>
        </div>
      )}
    </div>
  );
}
