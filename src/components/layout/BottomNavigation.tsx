'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Home, Search, Layers, Heart, User } from 'lucide-react';

export default function BottomNavigation() {
  const pathname = usePathname();
  const { favorites } = useMarketplace();

  if (pathname === '/checkout') return null;

  const navItems = [
    { label: 'Ana Səhifə', href: '/', icon: Home },
    { label: 'Axtarış', href: '/search', icon: Search },
    { label: 'Bölmələr', href: '/category/elektronika', icon: Layers },
    { label: 'Sevimlilər', href: '/favorites', icon: Heart, badge: favorites.length },
    { label: 'Profilim', href: '/profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 md:hidden py-1.5 px-2">
      <div className="flex items-center justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                isActive ? 'text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-700 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] mt-1 leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
