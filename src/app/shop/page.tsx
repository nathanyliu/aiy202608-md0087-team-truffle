'use client';

import { useState } from 'react';
import { ShoppingBag, Search, Star, ShoppingCart, Leaf, Filter, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  originalPrice?: number;
  rating: number;
  sales: number;
  tags: string[];
  category: string;
  image: string;
  isOrganic?: boolean;
}

const categories = ['全部', '药食同源', '有机杂粮', '养生茶饮', '滋补干货', '时令鲜食'];

const products: Product[] = [
  {
    id: 1,
    name: '宁夏枸杞王',
    desc: '中宁头茬大果，颗粒饱满，甘甜不涩',
    price: 68,
    originalPrice: 88,
    rating: 4.9,
    sales: 2341,
    tags: ['明目', '补肾', '抗氧化'],
    category: '药食同源',
    image: '🫐',
    isOrganic: true,
  },
  {
    id: 2,
    name: '云南文山三七粉',
    desc: '20头超细粉，活血散瘀，增强免疫',
    price: 198,
    originalPrice: 258,
    rating: 4.8,
    sales: 1567,
    tags: ['活血', '免疫', '降脂'],
    category: '药食同源',
    image: '🌿',
  },
  {
    id: 3,
    name: '有机五色糙米',
    desc: '红米/黑米/糙米/燕麦/荞麦科学配比',
    price: 39.9,
    rating: 4.7,
    sales: 5621,
    tags: ['粗粮', '膳食纤维', 'B族维生素'],
    category: '有机杂粮',
    image: '🌾',
    isOrganic: true,
  },
  {
    id: 4,
    name: '陈年白茶·寿眉',
    desc: '福鼎核心产区，三年陈化，醇厚甘甜',
    price: 128,
    originalPrice: 168,
    rating: 4.9,
    sales: 892,
    tags: ['清热', '抗氧化', '降火'],
    category: '养生茶饮',
    image: '🍵',
  },
  {
    id: 5,
    name: '青海黑枸杞',
    desc: '野生黑果枸杞，花青素含量极高',
    price: 158,
    originalPrice: 198,
    rating: 4.8,
    sales: 1203,
    tags: ['花青素', '抗衰老', '明目'],
    category: '药食同源',
    image: '🫐',
    isOrganic: true,
  },
  {
    id: 6,
    name: '古法红糖姜茶',
    desc: '云南罗平小黄姜+古法红糖，驱寒暖胃',
    price: 29.9,
    rating: 4.6,
    sales: 8934,
    tags: ['驱寒', '暖宫', '活血'],
    category: '养生茶饮',
    image: '🫚',
  },
  {
    id: 7,
    name: '新鲜铁棍山药',
    desc: '河南焦作温县产，粉糯香甜，健脾养胃',
    price: 35.8,
    originalPrice: 45,
    rating: 4.7,
    sales: 3456,
    tags: ['健脾', '养胃', '时令'],
    category: '时令鲜食',
    image: '🥔',
    isOrganic: true,
  },
  {
    id: 8,
    name: '桃胶雪燕皂角米组合',
    desc: '植物胶原三件套，滋阴润燥',
    price: 59.9,
    rating: 4.5,
    sales: 4521,
    tags: ['滋阴', '润燥', '胶原'],
    category: '滋补干货',
    image: '💎',
  },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);

  const filtered = products.filter((p) => {
    const matchCategory = activeCategory === '全部' || p.category === activeCategory;
    const matchSearch = !searchQuery || p.name.includes(searchQuery) || p.desc.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 space-y-6">
      {/* 页面标题 */}
      <div className="card-warm p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <ShoppingBag className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h1 className="font-serif-cn text-xl font-bold">严选商城</h1>
            <p className="text-xs text-muted-foreground">道地食材，源头直供</p>
          </div>
        </div>

        {/* 搜索栏 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索食材、功效、产地..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-warm pl-9"
          />
        </div>
      </div>

      {/* 分类筛选 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-200 border',
              activeCategory === cat
                ? 'bg-primary/10 border-primary/30 text-primary font-medium'
                : 'bg-background border-border text-muted-foreground hover:border-primary/20'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 商品网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((product) => (
          <div key={product.id} className="card-warm overflow-hidden group">
            {/* 商品图 */}
            <div className="relative h-36 bg-muted/40 flex items-center justify-center">
              <span className="text-5xl">{product.image}</span>
              {product.isOrganic && (
                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                  <Leaf className="h-3 w-3" />
                  有机
                </div>
              )}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 hover:bg-background transition-colors"
              >
                <Heart
                  className={cn(
                    'h-3.5 w-3.5 transition-colors',
                    favorites.includes(product.id)
                      ? 'fill-destructive text-destructive'
                      : 'text-muted-foreground'
                  )}
                />
              </button>
            </div>

            {/* 商品信息 */}
            <div className="p-3 space-y-2">
              <h3 className="text-sm font-medium text-foreground line-clamp-1">{product.name}</h3>
              <p className="text-xs text-muted-foreground line-clamp-1">{product.desc}</p>

              {/* 标签 */}
              <div className="flex flex-wrap gap-1">
                {product.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-1.5 py-0.5 rounded bg-primary/6 text-primary/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 评分和销量 */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 fill-chart-3 text-chart-3" />
                  <span>{product.rating}</span>
                </div>
                <span>月售{product.sales}</span>
              </div>

              {/* 价格和购物车 */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-bold text-accent">¥{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      ¥{product.originalPrice}
                    </span>
                  )}
                </div>
                <button className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary/15 transition-colors">
                  <ShoppingCart className="h-4 w-4 text-primary" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">暂无符合条件的商品</p>
        </div>
      )}
    </div>
  );
}
