'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import SearchBar from '@/components/search/SearchBar';
import ProductCard from '@/components/product/ProductCard';
import ModeSwitcher from '@/components/ui/ModeSwitcher';
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
  Zap,
  Tag,
} from 'lucide-react';

export default function HomePage() {
  const { marketMode, setMarketMode, userCity, formatPrice } = useMarketplace();
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroContentRef.current) {
      gsap.fromTo(
        heroContentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }
      );
    }
  }, [marketMode]);

  // Mode-based product filtering
  const storeProducts = PRODUCTS.filter(p => p.storeOfferCount > 0);
  const c2cProducts = PRODUCTS.filter(p => p.individualOfferCount > 0);
  const activeProducts = marketMode === 'store' ? storeProducts : c2cProducts;

  // Comparison flagship product
  const duelProduct = PRODUCTS.find(p => p.id === 'iphone-17-pro') || PRODUCTS[0];
  const duelStoreOffer = duelProduct.offers.find(o => o.sellerType === 'store') || duelProduct.offers[0];
  const duelIndOffer = duelProduct.offers.find(o => o.sellerType === 'individual') || duelProduct.offers[1];

  return (
    <div className="space-y-16 pb-24">
      {/* 1. MASTER HYBRID HERO & INTERACTIVE CONSOLE */}
      <section className="bg-[#090b11] text-white pt-10 pb-20 px-4 sm:px-6 relative overflow-hidden border-b border-white/[0.08]">
        {/* Ambient Subtle Visual Glows */}
        <div className="absolute -top-32 right-1/4 w-[700px] h-[500px] bg-blue-600/[0.08] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-5 w-[500px] h-[400px] bg-amber-600/[0.05] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          {/* Top Live Baku Activity Ticker */}
          <div className="flex items-center justify-between py-2 px-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[11px] text-slate-400">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-white tracking-wide uppercase text-[10px]">Bakı Birjası:</span>
              <span className="truncate text-slate-300">
                Murad Q. PS5 Slim qiymətini 790 ₼-ə endirdi • TechZone 2 yeni məhsul yerləşdirdi • Zəmanətli çatdırılma aktivdir
              </span>
            </div>
            <span className="hidden md:block text-slate-500 font-mono text-[10px] shrink-0 ml-4">
              Canlı Rejim
            </span>
          </div>

          {/* Central Hero Heading & Mode Selector Console */}
          <div ref={heroContentRef} className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-semibold text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Azərbaycanın İlk Hibrid Ticarət Ekosistemi</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.08] font-display">
              {marketMode === 'store' ? (
                <>
                  Rəsmi Distribütorlar. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-white">
                    Sıfır və 24 Ay Zəmanətli.
                  </span>
                </>
              ) : (
                <>
                  İkinci Əl Bazar. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-white">
                    Fərdlərdən Yoxlanılmış Elanlar.
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              {marketMode === 'store'
                ? 'Yetkili mağazalardan adınıza elektron qaimə fakturalı, rəsmi servis zəmanətli məhsullar və eyni gündə ünvana çatdırılma.'
                : 'Təsdiqlənmiş istifadəçilərdən təmiz, qutulu cihazlar. Əldən təhvil alaraq yoxlama və qiymət təklif edib razılaşma imkanı.'}
            </p>

            {/* THE PROMINENT TACTILE REJİM CONSOLE */}
            <div className="pt-2">
              <ModeSwitcher variant="hero" />
            </div>

            {/* Integrated Sleek Search Bar */}
            <div className="pt-2 max-w-xl mx-auto">
              <SearchBar isHero={true} />
            </div>
          </div>

          {/* 2. LIVE DUAL-MARKET COMPARISON SHOWCASE (Visual Proof of Core Concept) */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
              <div>
                <span className="section-label text-blue-400">Canlı Müqayisə Texnologiyası</span>
                <h3 className="text-xl font-extrabold text-white mt-0.5">
                  Eyni Məhsul — İki Fərqli Alış Seçimi
                </h3>
              </div>
              <div className="text-xs text-slate-400">
                NEXVO hər məhsul üçün həm sıfır mağaza, həm də ikinci əl fərdi qiymətlərini qarşılaşdırır.
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
              {/* Product Visual */}
              <div className="lg:col-span-4 flex items-center gap-4">
                <div className="w-28 h-28 sm:w-36 sm:h-36 relative rounded-2xl overflow-hidden bg-slate-900 border border-white/[0.1] shrink-0">
                  <Image src={duelProduct.baseImages[0]} alt={duelProduct.title} fill className="object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{duelProduct.brand}</span>
                  <h4 className="text-base font-bold text-white leading-snug">{duelProduct.title}</h4>
                  <span className="text-xs text-slate-400 block mt-1">{duelProduct.specifications[0]?.value}</span>
                </div>
              </div>

              {/* Side A: Store Option */}
              <div className="lg:col-span-4 p-4 rounded-2xl bg-white/[0.04] border border-blue-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-400 flex items-center gap-1.5">
                    <Store className="w-4 h-4" />
                    Rəsmi Mağazada Sıfır
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold">
                    Zəmanətli
                  </span>
                </div>
                <div className="text-2xl font-black text-white price-tag">
                  {formatPrice(duelStoreOffer.price)}
                </div>
                <ul className="text-[11px] text-slate-300 space-y-1">
                  <li>✓ 24 Ay Rəsmi Apple Zəmanəti</li>
                  <li>✓ Sıfır Plomblu Qutu & Elektron Qaimə</li>
                  <li>✓ 2 saatda kuryerlə qapıda təhvil</li>
                </ul>
              </div>

              {/* Side B: Second Hand Option */}
              <div className="lg:col-span-4 p-4 rounded-2xl bg-white/[0.04] border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    İkinci Əl Fərdi Elan
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    {formatPrice(duelStoreOffer.price - duelIndOffer.price)} Qənaət!
                  </span>
                </div>
                <div className="text-2xl font-black text-white price-tag">
                  {formatPrice(duelIndOffer.price)}
                </div>
                <ul className="text-[11px] text-slate-300 space-y-1">
                  <li>✓ Satıcı: {duelIndOffer.sellerName} (Reytinq 4.9)</li>
                  <li>✓ Pil Sağlığı: %100, 1 aylıq səliqəli cihaz</li>
                  <li>✓ Bakı, Sahil metrosunda yerində yoxlama</li>
                </ul>
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
