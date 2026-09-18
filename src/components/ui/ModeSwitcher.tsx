'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Store, User } from 'lucide-react';
import { PRODUCTS } from '@/data/mockData';

interface ModeSwitcherProps {
  variant?: 'navbar' | 'hero' | 'floating';
  className?: string;
}

export default function ModeSwitcher({ variant = 'navbar', className = '' }: ModeSwitcherProps) {
  const { marketMode, setMarketMode } = useMarketplace();

  const storeCount = PRODUCTS.filter(p => p.storeOfferCount > 0).length;
  const c2cCount = PRODUCTS.filter(p => p.individualOfferCount > 0).length;

  if (variant === 'hero') {
    return (
      <div className={`w-full max-w-2xl mx-auto ${className}`}>
        <div className="relative p-1.5 rounded-2xl bg-white/[0.06] border border-white/[0.12] backdrop-blur-xl shadow-2xl flex items-stretch gap-2">
          {/* Store Mode */}
          <button
            onClick={() => setMarketMode('store')}
            className={`flex-1 relative rounded-xl p-4 text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
              marketMode === 'store'
                ? 'bg-white text-slate-950 shadow-xl shadow-black/25 ring-2 ring-blue-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1.5">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  marketMode === 'store' ? 'bg-slate-950 text-white' : 'bg-white/10 text-slate-400'
                }`}>
                  <Store className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <span className="text-sm font-bold tracking-tight block">Rəsmi Mağazalar</span>
                  <span className={`text-[10px] block ${marketMode === 'store' ? 'text-slate-500' : 'text-slate-400'}`}>
                    Sıfır və Zəmanətli
                  </span>
                </div>
              </div>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${
                marketMode === 'store' ? 'bg-blue-50 text-blue-700' : 'bg-white/10 text-slate-400'
              }`}>
                {storeCount} məhsul
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${
              marketMode === 'store' ? 'text-slate-600 font-medium' : 'text-slate-400'
            }`}>
              24 ay rəsmi servis zəmanəti, elektron qaimə və sürətli kuryer
            </p>
          </button>

          {/* C2C Second-Hand Mode */}
          <button
            onClick={() => setMarketMode('c2c')}
            className={`flex-1 relative rounded-xl p-4 text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
              marketMode === 'c2c'
                ? 'bg-white text-slate-950 shadow-xl shadow-black/25 ring-2 ring-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1.5">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  marketMode === 'c2c' ? 'bg-slate-950 text-white' : 'bg-white/10 text-slate-400'
                }`}>
                  <User className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <span className="text-sm font-bold tracking-tight block">İkinci Əl Bazar</span>
                  <span className={`text-[10px] block ${marketMode === 'c2c' ? 'text-slate-500' : 'text-slate-400'}`}>
                    Fərdi Elanlar
                  </span>
                </div>
              </div>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${
                marketMode === 'c2c' ? 'bg-amber-50 text-amber-800' : 'bg-white/10 text-slate-400'
              }`}>
                {c2cCount} elan
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${
              marketMode === 'c2c' ? 'text-slate-600 font-medium' : 'text-slate-400'
            }`}>
              Yoxlanılmış fərdlərdən sərfəli qiymət və qiymət təklif etmə
            </p>
          </button>
        </div>
      </div>
    );
  }

  // Default Navbar Segmented Control
  return (
    <div className={`inline-flex items-center p-1 rounded-xl bg-slate-100/90 border border-slate-200/80 shadow-inner ${className}`}>
      <button
        onClick={() => setMarketMode('store')}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
          marketMode === 'store'
            ? 'bg-white text-slate-950 shadow-sm border border-slate-200/60 font-bold'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <Store className={`w-3.5 h-3.5 ${marketMode === 'store' ? 'text-blue-600' : 'text-slate-400'}`} />
        <span>Rəsmi Mağazalar</span>
        <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
          marketMode === 'store' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-400'
        }`}>
          {storeCount}
        </span>
      </button>

      <button
        onClick={() => setMarketMode('c2c')}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
          marketMode === 'c2c'
            ? 'bg-white text-slate-950 shadow-sm border border-slate-200/60 font-bold'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <User className={`w-3.5 h-3.5 ${marketMode === 'c2c' ? 'text-amber-600' : 'text-slate-400'}`} />
        <span>İkinci Əl Bazar</span>
        <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
          marketMode === 'c2c' ? 'bg-amber-50 text-amber-800 font-bold' : 'text-slate-400'
        }`}>
          {c2cCount}
        </span>
      </button>
    </div>
  );
}
