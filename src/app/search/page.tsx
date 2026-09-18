'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES } from '@/data/mockData';
import { useMarketplace } from '@/context/MarketplaceContext';
import ProductCard from '@/components/product/ProductCard';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Store,
  User,
  RotateCcw,
  Check,
} from 'lucide-react';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const { marketMode, setMarketMode, formatPrice } = useMarketplace();

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'rating'>('featured');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Query filter
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const matchTitle = product.title.toLowerCase().includes(q);
        const matchBrand = product.brand.toLowerCase().includes(q);
        const matchTag = product.tags.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchBrand && !matchTag) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Market mode filter (Store vs Second-hand)
      if (marketMode === 'store' && product.storeOfferCount === 0) return false;
      if (marketMode === 'c2c' && product.individualOfferCount === 0) return false;

      // Price filter
      const currentPrice =
        marketMode === 'store'
          ? product.minStorePrice || 999999
          : product.minIndividualPrice || 999999;

      if (currentPrice > maxPrice) return false;

      // Condition filter
      if (selectedCondition !== 'all') {
        const hasCondition = product.offers.some(o => o.condition === selectedCondition);
        if (!hasCondition) return false;
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
  }, [query, selectedCategory, marketMode, selectedCondition, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedCondition('all');
    setMaxPrice(5000);
    setQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header with Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              {query ? `"${query}" Axtarış Nəticələri` : 'Bütün Məhsul Kataloqu'}
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {filteredProducts.length} Məhsul
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {marketMode === 'store'
              ? 'Rəsmi mağazaların sıfır, qaiməli və zəmanətli məhsulları göstərilir.'
              : 'Fərdi istifadəçilərin ikinci əl və sərfəli elanları göstərilir.'}
          </p>
        </div>

        {/* Mode Selector in Search */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setMarketMode('store')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              marketMode === 'store' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Rəsmi Mağazalar</span>
          </button>
          <button
            onClick={() => setMarketMode('c2c')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              marketMode === 'c2c' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            <User className="w-3.5 h-3.5 text-amber-600" />
            <span>İkinci Əl</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-6 shadow-sm sticky top-28">
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

          {/* Categories */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">Kateqoriya</label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  selectedCategory === 'all' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>Bütün Kateqoriyalar</span>
                {selectedCategory === 'all' && <Check className="w-3.5 h-3.5 text-slate-900" />}
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === cat.slug ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-slate-400">{cat.itemCount}</span>
                </button>
              ))}
            </div>
          </div>

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

          {/* Condition Filter */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">Vəziyyəti</label>
            <div className="space-y-1 text-xs">
              {[
                { id: 'all', label: 'Bütün Vəziyyətlər' },
                { id: 'new', label: 'Sıfır Bağlı Qutu' },
                { id: 'like_new', label: 'Sıfırdan Fərqsiz' },
                { id: 'very_good', label: 'Çox Yaxşı Vəziyyətdə' },
              ].map(cond => (
                <button
                  key={cond.id}
                  onClick={() => setSelectedCondition(cond.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors flex items-center justify-between ${
                    selectedCondition === cond.id ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{cond.label}</span>
                  {selectedCondition === cond.id && <Check className="w-3.5 h-3.5 text-slate-900" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
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
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Axtarışınıza Uyğun Məhsul Tapılmadı</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Digər paneli (Rəsmi Mağazalar və ya İkinci Əl) yoxlaya və ya filtrləri təmizləyə bilərsiniz.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Filtrləri Təmizlə
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-xs text-slate-400">Yüklənir...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
