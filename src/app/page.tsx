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
  TrendingUp,
  ArrowRight,
  Handshake,
  Truck,
  Layers,
  MapPin,
  Star,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const { marketMode, setMarketMode, userCity } = useMarketplace();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [marketMode]);

  // Mode-based product segmentation
  const storeProducts = PRODUCTS.filter(p => p.storeOfferCount > 0);
  const c2cProducts = PRODUCTS.filter(p => p.individualOfferCount > 0);

  const activeProducts = marketMode === 'store' ? storeProducts : c2cProducts;

  return (
    <div className="space-y-12 pb-16">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="bg-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle, calm ambient glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-slate-700/10 rounded-full blur-3xl pointer-events-none" />

        <div ref={heroRef} className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          {/* Mode Switcher Banner */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
            <button
              onClick={() => setMarketMode('store')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                marketMode === 'store'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Rəsmi Mağazalar</span>
            </button>
            <button
              onClick={() => setMarketMode('c2c')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                marketMode === 'c2c'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>İkinci Əl Bazar</span>
            </button>
          </div>

          {/* Dynamic Headline based on Active Mode */}
          {marketMode === 'store' ? (
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Rəsmi Mağazalardan <br />
                <span className="text-blue-400">Sıfır və Zəmanətli</span> Məhsullar.
              </h1>
              <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed">
                Yetkili dilerlərdən adınıza elektron qaimə fakturalı, 24 ay rəsmi distribütor zəmanətli cihazlar və eyni gündə ünvana çatdırılma.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                İkinci Əl Bazar: <br />
                <span className="text-amber-400">Fərdlərdən Yoxlanılmış</span> Sərfəli Elanlar.
              </h1>
              <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed">
                Təsdiqlənmiş istifadəçilərdən təmiz, qutulu cihazlar. Əldən təhvil alıb yerində yoxlama və qiymət təklif edib razılaşma imkanı.
              </p>
            </div>
          )}

          {/* Hero Search */}
          <div className="pt-2 flex justify-center">
            <SearchBar isHero={true} />
          </div>

          {/* Quick Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 pt-1">
            <span className="text-slate-500 font-medium">Tez-tez axtarılanlar:</span>
            {['Apple iPhone 17', 'PlayStation 5 Slim', 'MacBook Air M4', 'Sony WH-1000XM6', 'Dyson V15'].map(item => (
              <Link
                key={item}
                href={`/search?q=${encodeURIComponent(item)}`}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. MODE BENEFIT CARDS (Calm, structured) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 shrink-0">
              {marketMode === 'store' ? <ShieldCheck className="w-5 h-5 text-blue-600" /> : <Handshake className="w-5 h-5 text-amber-600" />}
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                {marketMode === 'store' ? '24 Ay Rəsmi Zəmanət' : 'Yerində Yoxlama & Təhvil'}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                {marketMode === 'store'
                  ? 'Bütün mağaza məhsulları rəsmi servis mərkəzləri tərəfindən qorunur.'
                  : 'Satıcı ilə şəhər daxilində görüşüb cihazı şəxsən yoxlayaraq ala bilərsiniz.'}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 shrink-0">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                {marketMode === 'store' ? 'Eyni Gündə Sürətli Çatdırılma' : 'Əmanət Hesabı Qoruması'}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                {marketMode === 'store'
                  ? 'Bakı daxilində 2 saat ərzində, bölgələrə 24 saatda təhvil verilir.'
                  : 'Siz məhsulu qəbul edib təsdiq edənə qədər pul satıcıya keçmir.'}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 shrink-0">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                {marketMode === 'store' ? 'İkinci Əl Alternativləri' : 'Qiymətdə Təklif & Razılaşma'}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                {marketMode === 'store'
                  ? 'Hər mağaza məhsulunun altında fərdlərin daha ucuz 2-ci əl elanlarını görə bilərsiniz.'
                  : 'İstədiyiniz qiyməti satıcıya birbaşa təklif edib onlayn danışa bilərsiniz.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Kateqoriyalar</h2>
            <p className="text-xs text-slate-500 mt-0.5">İstədiyiniz məhsul qrupunu seçin</p>
          </div>
          <Link href="/category/elektronika" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
            <span>Hamısına Bax</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="bg-white rounded-2xl p-3.5 border border-slate-200/90 hover:border-slate-400 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div className="aspect-square relative rounded-xl overflow-hidden bg-slate-100 mb-2.5">
                <Image src={cat.heroImage} alt={cat.name} fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 truncate">{cat.name}</h3>
                <span className="text-[10px] text-slate-400 block mt-0.5">{cat.itemCount} elan</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. PRIMARY CATALOG SECTION (MATCHING ACTIVE MODE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {marketMode === 'store' ? 'Rəsmi Mağazaların Seçilmiş Məhsulları' : `${userCity} və Ətrafında İkinci Əl Elanlar`}
              </h2>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                marketMode === 'store' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-800'
              }`}>
                {activeProducts.length} Məhsul
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {marketMode === 'store'
                ? 'Bağlı qutuda, rəsmi qaiməli və zəmanətli mallar'
                : 'Fərdi şəxslərin şəxsi istifadə etdiyi sərfəli cihazlar'}
            </p>
          </div>

          <Link
            href={marketMode === 'store' ? '/search?sellerType=store' : '/search?sellerType=individual'}
            className="text-xs font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1"
          >
            <span>Bütün Siyahı</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {activeProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. VERIFIED STORES / SELLERS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-100 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {marketMode === 'store' ? 'Tərəfdaş Rəsmi Mağazalar' : 'Yoxlanılmış Fərdi Satıcılar'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Yüksək reytinq və müştəri məmnuniyyətinə malik profillər</p>
            </div>
          </div>

          {marketMode === 'store' ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {STORES.map(store => (
                <Link
                  key={store.id}
                  href={`/store/${store.id}`}
                  className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-slate-400 transition-all flex items-center gap-3.5 shadow-2xs"
                >
                  <div className="w-12 h-12 relative rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <Image src={store.logo} alt={store.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{store.name}</h4>
                      <ShieldCheck className="w-3 h-3 text-blue-600 shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                      <span className="font-bold text-amber-600 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                        {store.rating}
                      </span>
                      <span>•</span>
                      <span>{store.salesCount} satış</span>
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
                  className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-slate-400 transition-all flex items-center gap-3.5 shadow-2xs"
                >
                  <div className="w-12 h-12 relative rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <Image src={seller.avatar} alt={seller.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{seller.name}</h4>
                      <CheckCircle2 className="w-3 h-3 text-amber-600 shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                      <span className="font-bold text-amber-600 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                        {seller.rating}
                      </span>
                      <span>•</span>
                      <span>{seller.city}</span>
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
