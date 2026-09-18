'use client';

import React, { useState, useMemo, use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getCategoryBySlug, PRODUCTS } from '@/data/mockData';
import { useMarketplace } from '@/context/MarketplaceContext';
import ProductCard from '@/components/product/ProductCard';
import {
  Store,
  User,
  SlidersHorizontal,
  Check,
  RotateCcw,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.category;
  const category = getCategoryBySlug(categorySlug);

  const { marketMode, setMarketMode, formatPrice } = useMarketplace();

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'rating'>('featured');

  if (!category) {
    notFound();
  }

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      if (p.category !== category.slug) return false;
      if (selectedSubcategory !== 'all' && p.subcategory !== selectedSubcategory) return false;
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;

      // Mode check
      if (marketMode === 'store' && p.storeOfferCount === 0) return false;
      if (marketMode === 'c2c' && p.individualOfferCount === 0) return false;

      const currentPrice =
        marketMode === 'store'
          ? p.minStorePrice || 999999
          : p.minIndividualPrice || 999999;

      if (currentPrice > maxPrice) return false;

      if (selectedCondition !== 'all') {
        const match = p.offers.some(o => o.condition === selectedCondition);
        if (!match) return false;
      }

      return true;
    }).sort((a, b) => {
      const aPrice = marketMode === 'store' ? a.minStorePrice || 999999 : a.minIndividualPrice || 999999;
      const bPrice = marketMode === 'store' ? b.minStorePrice || 999999 : b.minIndividualPrice || 999999;

      if (sortBy === 'price_asc') return aPrice - bPrice;
      if (sortBy === 'price_desc') return bPrice - aPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [category.slug, selectedSubcategory, selectedBrand, marketMode, selectedCondition, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedSubcategory('all');
    setSelectedBrand('all');
    setSelectedCondition('all');
    setMaxPrice(5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 transition-colors">Ana Səhifə</Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-400">Kateqoriyalar</span>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="font-semibold text-slate-900">{category.name}</span>
      </nav>

      {/* Category Banner */}
      <div className="rounded-3xl overflow-hidden bg-slate-950 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-900 shadow-md">
        <div className="max-w-xl space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300">
            {marketMode === 'store' ? 'Rəsmi Mağazalar Paneli' : 'İkinci Əl Bazar Paneli'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">{category.name}</h1>
          <p className="text-xs text-slate-300 leading-relaxed">{category.description}</p>

          <div className="pt-1 flex items-center gap-3 text-xs text-slate-400">
            <span><strong>{filteredProducts.length}</strong> Aktiv Təklif</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              NEXVO Yoxlama Güvənliyi
            </span>
          </div>
        </div>

        <div className="w-32 h-32 relative rounded-2xl overflow-hidden border border-white/10 shrink-0 self-end md:self-center shadow-md">
          <Image src={category.heroImage} alt={category.name} fill className="object-cover" />
        </div>
      </div>

      {/* Subcategory Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedSubcategory('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            selectedSubcategory === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-400'
          }`}
        >
          Bütün Alt Kateqoriyalar
        </button>

        {category.subcategories.map(sub => (
          <button
            key={sub.slug}
            onClick={() => setSelectedSubcategory(sub.slug)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedSubcategory === sub.slug
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-400'
            }`}
          >
            <span>{sub.name}</span>
            <span className="ml-1 opacity-70">({sub.count})</span>
          </button>
        ))}
      </div>

      {/* Main Grid & Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-6 shadow-xs sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>Filtrlər</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-slate-400 hover:text-slate-900 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Sıfırla</span>
            </button>
          </div>

          {/* Mode Switcher inside Category */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">Panel Seçimi</label>
            <div className="space-y-1.5">
              <button
                onClick={() => setMarketMode('store')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                  marketMode === 'store'
                    ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                    : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <span>🏬 Rəsmi Mağazalar (Sıfır)</span>
                {marketMode === 'store' && <Check className="w-3.5 h-3.5 text-blue-600" />}
              </button>

              <button
                onClick={() => setMarketMode('c2c')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                  marketMode === 'c2c'
                    ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200'
                    : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <span>👤 İkinci Əl Bazar</span>
                {marketMode === 'c2c' && <Check className="w-3.5 h-3.5 text-amber-700" />}
              </button>
            </div>
          </div>

          {/* Brands */}
          {category.popularBrands.length > 0 && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Markalar</label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedBrand('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedBrand === 'all'
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Hamısı
                </button>
                {category.popularBrands.map(brand => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      selectedBrand === brand
                        ? 'bg-slate-900 text-white font-bold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Maksimum Qiymət</span>
              <span className="text-slate-900 font-extrabold">{formatPrice(maxPrice)}</span>
            </div>
            <input
              type="range"
              min={200}
              max={5000}
              step={50}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200 text-xs">
            <span className="text-slate-500 font-medium">
              Göstərilir: <strong className="text-slate-800">{filteredProducts.length}</strong> məhsul
            </span>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Sıralama:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 outline-none"
              >
                <option value="featured">Seçilmişlər</option>
                <option value="price_asc">Qiymət: Ucuzdan Bahaya</option>
                <option value="price_desc">Qiymət: Bahadan Ucuza</option>
                <option value="rating">Reytinqə Görə</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
              <p className="text-xs text-slate-600 font-medium">Bu kateqoriyada uyğun məhsul tapılmadı.</p>
              <button
                onClick={resetFilters}
                className="mt-3 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Filtrləri Sıfırla
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
