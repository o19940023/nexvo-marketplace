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
  PlusCircle,
  Smartphone,
  Laptop,
  Gamepad2,
  Headphones,
  Home as HomeIcon,
  Footprints,
  Store,
  User,
  ShieldCheck,
} from 'lucide-react';
import { CATEGORIES } from '@/data/mockData';

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <strong>NEXVO Platforması:</strong> Rəsmi Mağazalar və Yoxlanılmış İkinci Əl Elanları
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Təhlükəsiz Alış-Veriş & Əmanət Hesabı</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Location Picker */}
            <div className="relative">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-1 text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Şəhər: <strong>{userCity}</strong></span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLocationOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400">Şəhər Seçin</div>
                  {['Bakı', 'Sumqayıt', 'Gəncə', 'Xırdalan'].map(city => (
                    <button
                      key={city}
                      onClick={() => {
                        setUserCity(city);
                        setIsLocationOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-50 transition-colors flex items-center justify-between ${
                        userCity === city ? 'bg-slate-100 text-blue-600 font-bold' : ''
                      }`}
                    >
                      <span>{city}</span>
                      {userCity === city && <span className="text-blue-600 text-xs">✓</span>}
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
                className="flex items-center gap-1 text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                <span>Valyuta: <strong>{currency === 'AZN' ? '₼ AZN' : currency === 'USD' ? '$ USD' : '₺ TRY'}</strong></span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isCurrencyOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in">
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
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-50 transition-colors flex items-center justify-between ${
                        currency === curr.code ? 'bg-slate-100 text-blue-600 font-bold' : ''
                      }`}
                    >
                      <span>{curr.label}</span>
                      {currency === curr.code && <span className="text-blue-600">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-slate-700">|</span>

            <Link href="/profile" className="text-slate-300 hover:text-white transition-colors">
              Kömək & Dəstək
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* International Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-10 h-10 rounded-2xl bg-slate-950 text-white flex items-center justify-center font-black text-xl tracking-tighter shadow-md group-hover:scale-105 transition-transform border border-slate-800">
            N
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-slate-900">NEXVO</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 tracking-wider">
                HYBRID
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium hidden sm:block">Mağaza & İkinci Əl Ekosistemi</p>
          </div>
        </Link>

        {/* PRIMARY MODE SWITCHER (The Core Innovation) */}
        {!isCheckout && (
          <div className="hidden lg:flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200/90 shadow-2xs">
            <button
              onClick={() => setMarketMode('store')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                marketMode === 'store'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Rəsmi Mağazalar</span>
              <span className="text-[10px] text-slate-400 font-normal">(Yeni & Zəmanətli)</span>
            </button>

            <button
              onClick={() => setMarketMode('c2c')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                marketMode === 'c2c'
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4 text-amber-600" />
              <span>İkinci Əl Bazar</span>
              <span className="text-[10px] text-slate-400 font-normal">(Fərdi Elanlar)</span>
            </button>
          </div>
        )}

        {/* Desktop Search */}
        {!isCheckout && (
          <div className="hidden md:flex flex-1 max-w-md mx-2">
            <SearchBar />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Post Ad Button */}
          <Link
            href="/profile?action=post-ad"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Elan Yerləşdir</span>
          </Link>

          {/* Favorites */}
          <Link
            href="/favorites"
            className="relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 hover:text-rose-600 transition-colors flex items-center justify-center"
            title="Sevimlilər"
          >
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors flex items-center justify-center"
            title="Səbət"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Profile */}
          <Link
            href="/profile"
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors group cursor-pointer border border-slate-200/80"
          >
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
              R
            </div>
            <div className="hidden xl:block text-left">
              <span className="text-xs font-bold text-slate-900 block leading-tight">Hesabım</span>
              <span className="text-[10px] text-emerald-600 font-medium leading-tight">✓ Təsdiqlənib</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Mode Switcher Row */}
      {!isCheckout && (
        <div className="lg:hidden px-4 pb-2">
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setMarketMode('store')}
              className={`py-1.5 rounded-lg text-center transition-all ${
                marketMode === 'store' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
              }`}
            >
              🏬 Rəsmi Mağazalar
            </button>
            <button
              onClick={() => setMarketMode('c2c')}
              className={`py-1.5 rounded-lg text-center transition-all ${
                marketMode === 'c2c' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              👤 İkinci Əl Bazar
            </button>
          </div>
        </div>
      )}

      {/* Mobile Search Row */}
      {!isCheckout && (
        <div className="md:hidden px-4 pb-3">
          <SearchBar />
        </div>
      )}

      {/* Category Navigation Strip */}
      {!isCheckout && (
        <div className="border-t border-slate-100 bg-slate-50/70 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 py-2">
            {/* Category menu dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:border-blue-400 hover:text-blue-600 transition-colors shadow-2xs"
              >
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Bütün Kateqoriyalar</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in">
                  <div className="text-[10px] font-bold uppercase text-slate-400 px-3 py-1">Əsas Kateqoriyalar</div>
                  {CATEGORIES.map(cat => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={() => setIsCategoryMenuOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-blue-600 text-xs font-semibold transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">{ICONS_MAP[cat.iconName]}</span>
                        <span>{cat.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{cat.itemCount}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="h-4 w-px bg-slate-300 shrink-0 mx-1" />

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              {CATEGORIES.map(category => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    pathname === `/category/${category.slug}`
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
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
