'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Leaf, Home, UtensilsCrossed, TrendingUp, MapPin, Users } from 'lucide-react';

const navItems = [
  { href: '/', label: '首页', icon: Home },
  { href: '/meal', label: '今日食方', icon: UtensilsCrossed },
  { href: '/history', label: '影响因子', icon: TrendingUp },
  { href: '/map', label: '食养地图', icon: MapPin },
  { href: '/circle', label: '食方社区', icon: Users },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
            <Leaf className="h-5 w-5 text-primary" />
          </div>
          <span className="font-serif-cn text-lg font-bold tracking-wide text-foreground">
            优基食养小厨房
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'nav-link flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-primary/8 text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile nav */}
        <nav className="flex md:hidden items-center gap-0.5 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-2 py-1 rounded-md transition-colors min-w-[3.5rem]',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-[10px] leading-tight">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
