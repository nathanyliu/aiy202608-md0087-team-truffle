'use client';

import { useState } from 'react';
import {
  MessageCircle,
  Heart,
  Share2,
  Send,
  Bookmark,
  MoreHorizontal,
  Image as ImageIcon,
  Smile,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Post {
  id: number;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
  isLiked: boolean;
  isBookmarked: boolean;
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: '食养达人小林',
    avatar: '🧑‍🍳',
    time: '2小时前',
    content:
      '大暑时节分享一道冬瓜薏米老鸭汤，祛湿消暑一绝！老鸭焯水后与薏米、姜片同炖2小时，最后加入冬瓜块再煮20分钟。汤色清亮，鸭肉软烂，全家都爱喝',
    likes: 234,
    comments: 45,
    shares: 18,
    tags: ['大暑食养', '祛湿汤品', '家常菜谱'],
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 2,
    author: '中医营养师王老师',
    avatar: '👨‍⚕️',
    time: '4小时前',
    content:
      '很多人问我为什么夏天容易疲劳、食欲不振？大暑湿热交蒸，脾胃运化功能减弱。建议：早起一杯姜枣茶温中散寒；午餐加一份山药健脾益气；下午喝绿豆汤清热解暑；晚餐清淡为主七分饱。夏养心，苦味入心，适当吃苦瓜、莲子心也是好的。',
    likes: 567,
    comments: 89,
    shares: 123,
    tags: ['中医养生', '大暑养生', '脾胃调理'],
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: 3,
    author: '健身厨房Amy',
    avatar: '💪',
    time: '6小时前',
    content:
      '减脂期的食养晚餐：清蒸鲈鱼 + 蒜蓉西兰花 + 小半碗糙米饭。蛋白质充足，碳水适量，配合每周3次力量训练，一个月体脂降了2%！健康减脂不需要饿肚子',
    likes: 189,
    comments: 32,
    shares: 8,
    tags: ['减脂餐', '高蛋白', '健身饮食'],
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 4,
    author: '茶道爱好者清风',
    avatar: '🍵',
    time: '昨天',
    content:
      '入手了福鼎的三年陈寿眉，汤色橙黄透亮，入口醇厚回甘。大暑天煮一壶老白茶，比冰镇饮料健康多了。泡茶小贴士：老白茶适合煮饮，水温100度，投茶5g配500ml水，煮3-5分钟即可。',
    likes: 312,
    comments: 56,
    shares: 27,
    tags: ['白茶', '茶道', '夏日饮品'],
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: 5,
    author: '素食主义小荷',
    avatar: '🌱',
    time: '昨天',
    content:
      '今日立秋前的养生粥：百合莲子银耳羹。银耳泡发撕小朵，与莲子同煮1小时，加入百合和冰糖再煮20分钟。胶质满满，润肺养颜，冰镇后更好喝',
    likes: 421,
    comments: 67,
    shares: 35,
    tags: ['素食', '养生粥', '润肺'],
    isLiked: false,
    isBookmarked: false,
  },
];

const topics = ['大暑食养', '祛湿汤品', '中医养生', '减脂餐', '白茶', '素食'];

export default function CirclePage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState('');
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const toggleBookmark = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isBookmarked: !p.isBookmarked } : p
      )
    );
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now(),
      author: '我',
      avatar: '😊',
      time: '刚刚',
      content: newPost,
      likes: 0,
      comments: 0,
      shares: 0,
      tags: [],
      isLiked: false,
      isBookmarked: false,
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  const filtered = activeTopic
    ? posts.filter((p) => p.tags.includes(activeTopic))
    : posts;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 space-y-6">
      {/* 页面标题 */}
      <div className="card-warm p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-5/10">
            <MessageCircle className="h-5 w-5 text-chart-5" />
          </div>
          <div>
            <h1 className="font-serif-cn text-xl font-bold">吃货微博</h1>
            <p className="text-xs text-muted-foreground">分享食养心得，交流健康饮食</p>
          </div>
        </div>

        {/* 发帖 */}
        <div className="space-y-3">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="分享你的食养心得..."
            rows={3}
            className="input-warm resize-none"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Smile className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <button
              onClick={handlePost}
              disabled={!newPost.trim()}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                newPost.trim()
                  ? 'bg-primary text-primary-foreground hover:opacity-90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              )}
            >
              <Send className="h-3.5 w-3.5" />
              发布
            </button>
          </div>
        </div>
      </div>

      {/* 话题标签 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs text-muted-foreground shrink-0">热门话题:</span>
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

      {/* 动态列表 */}
      <div className="space-y-4">
        {filtered.map((post) => (
          <div key={post.id} className="card-warm p-4 space-y-3">
            {/* 作者信息 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/60 text-lg">
                  {post.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">{post.author}</h4>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              </div>
              <button className="p-1 rounded hover:bg-muted transition-colors">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* 内容 */}
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
              {post.content}
            </p>

            {/* 标签 */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-primary/70 hover:text-primary cursor-pointer"
                    onClick={() => setActiveTopic(tag)}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* 互动栏 */}
            <div className="flex items-center gap-6 pt-2 border-t border-border/30">
              <button
                onClick={() => toggleLike(post.id)}
                className={cn(
                  'flex items-center gap-1.5 text-xs transition-colors',
                  post.isLiked ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'
                )}
              >
                <Heart className={cn('h-4 w-4', post.isLiked && 'fill-current')} />
                {post.likes}
              </button>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="h-4 w-4" />
                {post.comments}
              </button>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Share2 className="h-4 w-4" />
                {post.shares}
              </button>
              <button
                onClick={() => toggleBookmark(post.id)}
                className={cn(
                  'flex items-center gap-1.5 text-xs ml-auto transition-colors',
                  post.isBookmarked ? 'text-chart-3' : 'text-muted-foreground hover:text-chart-3'
                )}
              >
                <Bookmark className={cn('h-4 w-4', post.isBookmarked && 'fill-current')} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">暂无相关动态</p>
        </div>
      )}
    </div>
  );
}
