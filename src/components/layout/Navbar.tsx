'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMarketplace } from '@/context/MarketplaceContext';
import SearchBar from '@/components/search/SearchBar';
import {
  Heart,
  ShoppingBag,
  MapPin,
  ChevronDown,
  Layers,
  Plus,
  Smartphone,
  Laptop,
  Gamepad2,
  Headphones,
  Home as HomeIcon,
  Footprints,
  Store,
  User,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { CATEGORIES } from '@/data/mockData';
import ModeSwitcher from '@/components/ui/ModeSwitcher';

const ICONS_MAP: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="w-3.5 h-3.5" />,
  Laptop: <Laptop className="w-3.5 h-3.5" />,
  Gamepad2: <Gamepad2 className="w-3.5 h-3.5" />,
  Headphones: <Headphones className="w-3.5 h-3.5" />,
  Home: <HomeIcon className="w-3.5 h-3.5" />,
  Footprints: <Footprints className="w-3.5 h-3.5" />,
};

export default function Navbar() {
  const {
    marketMode,
    setMarketMode,
    favorites,
    cartItemCount,
    currency,
    setCurrency,
    userCity,
    setUserCity,
  } = useMarketplace();

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const pathname = usePathname();

  const isCheckout = pathname === '/checkout';

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all">
      {/* Top Precision Micro-Utility Bar */}
      <div className="bg-[#0c0e14] text-slate-400 text-[11px] py-1.5 px-4 hidden md:block border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span className="font-semibold text-white">NEXVO Hybrid</span>
              <span className="text-slate-500">•</span>
              <span>Rəsmi Dilerlər & Yoxlanılmış Fərdi Bazar</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            {/* Location Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>Şəhər: <strong className="text-white font-semibold">{userCity}</strong></span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {isLocationOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200/80 p-1.5 z-50 animate-fade-up">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Şəhər Seçin</div>
                  {['Bakı', 'Sumqayıt', 'Gəncə', 'Xırdalan'].map(city => (
                    <button
                      key={city}
                      onClick={() => {
                        setUserCity(city);
                        setIsLocationOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between ${
                        userCity === city ? 'bg-slate-100 text-slate-950 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span>{city}</span>
                      {userCity === city && <Check className="w-3.5 h-3.5 text-slate-900" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-slate-700">|</span>

            {/* Currency Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <span>Valyuta: <strong className="text-white font-semibold">{currency === 'AZN' ? '₼ AZN' : currency === 'USD' ? '$ USD' : '₺ TRY'}</strong></span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {isCurrencyOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200/80 p-1.5 z-50 animate-fade-up">
                  {[
                    { code: 'AZN', label: '₼ Manat (AZN)' },
                    { code: 'USD', label: '$ ABŞ Dolları' },
                    { code: 'TRY', label: '₺ Türk Lirəsi' },
                  ].map(curr => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        setCurrency(curr.code as any);
                        setIsCurrencyOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between ${
                        currency === curr.code ? 'bg-slate-100 text-slate-950 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span>{curr.label}</span>
                      {currency === curr.code && <Check className="w-3.5 h-3.5 text-slate-900" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-slate-700">|</span>

            <Link href="/profile" className="text-slate-400 hover:text-white transition-colors">
              Dəstək
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo with Bespoke Monogram */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 text-white flex items-center justify-center font-bold text-base shadow-sm border border-slate-800/80 group-hover:border-slate-600 transition-all">
            N
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-slate-950 font-display">NEXVO</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-white tracking-widest uppercase">
                PRO
              </span>
            </div>
          </div>
        </Link>

        {/* PRIMARY MODE SWITCHER (Bespoke Tactile Control) */}
        {!isCheckout && (
          <div className="hidden lg:block">
            <ModeSwitcher variant="navbar" />
          </div>
        )}

        {/* Desktop Search Component */}
        {!isCheckout && (
          <div className="hidden md:flex flex-1 max-w-md mx-2">
            <SearchBar />
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Post Ad Button */}
          <Link
            href="/profile?action=post-ad"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg btn-primary text-xs font-semibold cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Elan Yerləşdir</span>
          </Link>

          {/* Favorites Button */}
          <Link
            href="/favorites"
            className="relative w-9 h-9 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-rose-600 transition-colors flex items-center justify-center border border-transparent hover:border-slate-200/70"
            title="Sevimlilər"
          >
            <Heart className="w-4 h-4" />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Cart Button */}
          <Link
            href="/cart"
            className="relative w-9 h-9 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors flex items-center justify-center border border-transparent hover:border-slate-200/70"
            title="Səbət"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartItemCount > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-slate-950 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Profile User */}
          <Link
            href="/profile"
            className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-lg hover:bg-slate-100 transition-all border border-slate-200/70"
          >
            <div className="w-6 h-6 rounded-md bg-slate-950 text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
              R
            </div>
            <div className="hidden xl:block text-left">
              <span className="text-xs font-semibold text-slate-900 block leading-tight">Ramiz M.</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Mode Switcher Row */}
      {!isCheckout && (
        <div className="lg:hidden px-4 pb-2">
          <ModeSwitcher variant="navbar" className="w-full justify-center" />
        </div>
      )}

      {/* Mobile Search Row */}
      {!isCheckout && (
        <div className="md:hidden px-4 pb-3">
          <SearchBar />
        </div>
      )}

      {/* Category Strip */}
      {!isCheckout && (
        <div className="border-t border-slate-200/60 bg-white/60 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 py-1.5">
            {/* Category Dropdown Button */}
            <div className="relative shrink-0">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-semibold text-slate-800 hover:border-slate-400 transition-colors shadow-2xs"
              >
                <Layers className="w-3.5 h-3.5 text-slate-600" />
                <span>Bütün Bölmələr</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200/80 p-2 z-50 animate-fade-up">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">Kataloq Bölmələri</div>
                  {CATEGORIES.map(cat => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={() => setIsCategoryMenuOpen(false)}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-slate-950 text-xs font-medium transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">{ICONS_MAP[cat.iconName]}</span>
                        <span>{cat.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{cat.itemCount}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="h-3.5 w-px bg-slate-200 shrink-0 mx-1" />

            {/* Category Quick Links */}
            <div className="flex items-center gap-1 whitespace-nowrap">
              {CATEGORIES.map(category => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    pathname === `/category/${category.slug}`
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
                  }`}
                >
                  <span className="text-slate-400">{ICONS_MAP[category.iconName]}</span>
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
