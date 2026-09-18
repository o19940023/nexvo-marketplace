'use client';

import React from 'react';
import Link from 'next/link';
import { useMarketplace } from '@/context/MarketplaceContext';
import { PRODUCTS } from '@/data/mockData';
import ProductCard from '@/components/product/ProductCard';
import { Heart, TrendingDown, ArrowRight } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites } = useMarketplace();

  const favoriteProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">Sevimlilərim & İzləmə Siyahısı</h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Saxladığınız məhsulların mağaza və ikinci əl qiymət dəyişikliklərini buradan izləyə bilərsiniz.
          </p>
        </div>

        {favoriteProducts.length > 0 && (
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 self-start sm:self-auto">
            {favoriteProducts.length} Məhsul
          </span>
        )}
      </div>

      {favoriteProducts.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <TrendingDown className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-bold">Qiymət Enişi Bildirişi!</p>
              <p className="text-[11px] text-emerald-700">
                Sevimlilərdəki <strong>Apple iPhone 17</strong> üçün ikinci əl bazarında yeni sərfəli elan yerləşdirildi.
              </p>
            </div>
          </div>
          <Link
            href="/product/iphone-17"
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shrink-0"
          >
            Bax
          </Link>
        </div>
      )}

      {favoriteProducts.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Sevimlilər Siyahınız Boşdur</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Bəyəndiyiniz məhsulun üzərindəki ürək işarəsinə klikləyərək qiymət enişlərini və təklifləri izləyə bilərsiniz.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            <span>Məhsulları Göstər</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
