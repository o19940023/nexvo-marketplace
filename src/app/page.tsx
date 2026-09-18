'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import SearchBar from '@/components/search/SearchBar';
import ProductCard from '@/components/product/ProductCard';
import { PRODUCTS, CATEGORIES, STORES, INDIVIDUAL_SELLERS } from '@/data/mockData';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  Store,
  User,
  ShieldCheck,
  ArrowUpRight,
  Handshake,
  Truck,
  MapPin,
  Star,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Layers,
} from 'lucide-react';

export default function HomePage() {
  const { marketMode, setMarketMode, userCity, formatPrice } = useMarketplace();
  const heroContentRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroContentRef.current) {
      gsap.fromTo(
        heroContentRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [marketMode]);

  // Mode-based product filtering
  const storeProducts = PRODUCTS.filter(p => p.storeOfferCount > 0);
  const c2cProducts = PRODUCTS.filter(p => p.individualOfferCount > 0);
  const activeProducts = marketMode === 'store' ? storeProducts : c2cProducts;

  // Hero Featured Spotlight Product (iPhone 17 Pro or PS5)
  const spotlightProduct = marketMode === 'store'
    ? PRODUCTS.find(p => p.id === 'iphone-17-pro') || PRODUCTS[0]
    : PRODUCTS.find(p => p.id === 'ps5-slim') || PRODUCTS[1];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. EDITORIAL ASYMMETRIC HERO SECTION */}
      <section className="bg-[#090b11] text-white pt-12 pb-20 px-4 sm:px-6 relative overflow-hidden border-b border-white/[0.08]">
        {/* Subtle Ambient Studio Lighting */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-blue-600/[0.07] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[300px] bg-slate-400/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Top Mode Selector Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-10 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <span className="section-label text-slate-400">Rejim Seçimi:</span>
              <div className="inline-flex items-center p-1 rounded-xl bg-white/[0.06] border border-white/[0.1] backdrop-blur-md">
                <button
                  onClick={() => setMarketMode('store')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    marketMode === 'store'
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Store className="w-3.5 h-3.5 text-blue-600" />
                  <span>Rəsmi Mağazalar</span>
                </button>
                <button
                  onClick={() => setMarketMode('c2c')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    marketMode === 'c2c'
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-amber-600" />
                  <span>İkinci Əl Bazar</span>
                </button>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                24 Ay Rəsmi Zəmanət
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-400" />
                Eyni Gündə Çatdırılma
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1.5">
                <Handshake className="w-4 h-4 text-amber-400" />
                Yerində Yoxlama
              </span>
            </div>
          </div>

          {/* Dynamic Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-10">
            {/* Left Column: Typography & Search */}
            <div ref={heroContentRef} className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.08] border border-white/[0.1] text-[11px] font-medium text-slate-300">
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span>{marketMode === 'store' ? 'Yetkili Distribütor Şəbəkəsi' : 'Təsdiqlənmiş Fərdi İcma'}</span>
              </div>

              {marketMode === 'store' ? (
                <div className="space-y-3">
                  <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-display">
                    Rəsmi Mağazalar. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-white">
                      Sıfır və Zəmanətli.
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                    Bağlı qutuda, adınıza elektron qaimə fakturalı, 24 ay rəsmi servis zəmanətli cihazlar və sürətli kuryer çatdırılması.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-display">
                    İkinci Əl Bazar. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-white">
                      Yoxlanılmış Elanlar.
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                    Fərdlərdən təmiz, qutulu cihazlar. Satıcı ilə birbaşa əlaqə, qiymətdə təklif verib razılaşma və yerində təhvil alma rahatlığı.
                  </p>
                </div>
              )}

              {/* Integrated Search */}
              <div className="pt-2 max-w-xl">
                <SearchBar isHero={true} />
              </div>

              {/* Quick Keyword Anchors */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
                <span className="text-slate-500 font-medium">Trendlər:</span>
                {['iPhone 17 Pro', 'MacBook Air M4', 'PlayStation 5 Slim', 'Sony WH-1000XM6', 'Dyson V15'].map(item => (
                  <Link
                    key={item}
                    href={`/search?q=${encodeURIComponent(item)}`}
                    className="px-2.5 py-1 rounded-md bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] text-slate-300 text-xs transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column: Hero Spotlight Card */}
            <div className="lg:col-span-5 relative">
              <div className="glass-dark rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-xs">
                  <span className="text-slate-400 font-medium tracking-wide">GÜNÜN TƏKLİFİ</span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/30">
                    Özəl Qiymət
                  </span>
                </div>

                <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-slate-900 border border-white/[0.06]">
                  <Image
                    src={spotlightProduct.baseImages[0]}
                    alt={spotlightProduct.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950/90 text-white backdrop-blur-xs">
                      {spotlightProduct.brand}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white leading-snug">
                    {spotlightProduct.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                    {spotlightProduct.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Başlanğıc Qiymət</span>
                    <span className="text-lg font-extrabold text-white price-tag">
                      {formatPrice(spotlightProduct.minStorePrice || spotlightProduct.minIndividualPrice || 0)}
                    </span>
                  </div>

                  <Link
                    href={`/product/${spotlightProduct.id}`}
                    className="px-4 py-2 rounded-lg bg-white text-slate-950 text-xs font-bold hover:bg-slate-100 transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Məhsula Bax</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES BROWSER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-slate-200/80">
          <div>
            <span className="section-label text-slate-400">01 // KATEQORİYALAR</span>
            <h2 className="text-xl font-bold text-slate-950 mt-0.5 font-display">Kataloq Bölmələri</h2>
          </div>
          <Link
            href="/category/elektronika"
            className="text-xs font-semibold text-slate-900 hover:text-blue-600 flex items-center gap-1 transition-colors"
          >
            <span>Bütün Bölmələr</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="luxury-card rounded-xl p-3 flex flex-col justify-between group"
            >
              <div className="aspect-square relative rounded-lg overflow-hidden bg-slate-100 mb-2.5">
                <Image
                  src={cat.heroImage}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-950 truncate group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
                  {cat.itemCount} məhsul
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. PRIMARY MARKET CATALOG (SEGMENTED BY MODE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-slate-200/80">
          <div>
            <span className="section-label text-slate-400">02 // CANLI TƏKLİFLƏR</span>
            <div className="flex items-center gap-2 mt-0.5">
              <h2 className="text-xl font-bold text-slate-950 font-display">
                {marketMode === 'store' ? 'Rəsmi Mağazaların Kataloqu' : `${userCity} üzrə İkinci Əl Elanlar`}
              </h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {activeProducts.length} Məhsul
              </span>
            </div>
          </div>

          <Link
            href={marketMode === 'store' ? '/search?sellerType=store' : '/search?sellerType=individual'}
            className="text-xs font-semibold text-slate-900 hover:text-blue-600 flex items-center gap-1 transition-colors"
          >
            <span>Bütün Siyahı</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Responsive Luxury Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {activeProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. VERIFIED ECOSYSTEM PARTNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#f5f6f8] rounded-2xl p-6 sm:p-8 border border-slate-200/80 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <span className="section-label text-slate-400">03 // GÜVƏNLİ SATICILAR</span>
              <h3 className="text-lg font-bold text-slate-950 mt-0.5 font-display">
                {marketMode === 'store' ? 'Rəsmi Distribütorlar & Dilerlər' : 'Yüksək Reytinqli Fərdi Satıcılar'}
              </h3>
            </div>
          </div>

          {marketMode === 'store' ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {STORES.map(store => (
                <Link
                  key={store.id}
                  href={`/store/${store.id}`}
                  className="luxury-card rounded-xl p-4 flex items-center gap-3.5"
                >
                  <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <Image src={store.logo} alt={store.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <h4 className="text-xs font-bold text-slate-950 truncate">{store.name}</h4>
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-900 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                        {store.rating}
                      </span>
                      <span>•</span>
                      <span>{store.salesCount} Satış</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {INDIVIDUAL_SELLERS.map(seller => (
                <Link
                  key={seller.id}
                  href={`/seller/${seller.id}`}
                  className="luxury-card rounded-xl p-4 flex items-center gap-3.5"
                >
                  <div className="w-12 h-12 relative rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <Image src={seller.avatar} alt={seller.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <h4 className="text-xs font-bold text-slate-950 truncate">{seller.name}</h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-900 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                        {seller.rating}
                      </span>
                      <span>•</span>
                      <span>{seller.city} ({seller.district})</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
