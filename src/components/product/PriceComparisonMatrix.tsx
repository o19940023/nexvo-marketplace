'use client';

import React from 'react';
import { Product } from '@/types/marketplace';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Store, User, Sparkles, TrendingDown, ShieldCheck, Handshake, CheckCircle2, ArrowRight } from 'lucide-react';

interface PriceComparisonMatrixProps {
  product: Product;
  onSelectTab?: (tab: 'all' | 'stores' | 'individuals') => void;
}

export default function PriceComparisonMatrix({ product }: PriceComparisonMatrixProps) {
  const { formatPrice } = useMarketplace();

  const minStore = product.minStorePrice || 0;
  const maxStore = product.maxStorePrice || minStore;
  const minInd = product.minIndividualPrice || 0;
  const maxInd = product.maxIndividualPrice || minInd;

  // Calculate potential savings
  const savingsAmount = minStore && minInd ? minStore - minInd : 0;
  const savingsPercent = minStore && savingsAmount > 0 ? Math.round((savingsAmount / minStore) * 100) : 0;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 rounded-3xl p-5 sm:p-7 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Piyasa Fiyat Karşılaştırması
            </span>
            {savingsPercent > 0 && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                İkinci elde %{savingsPercent} Tasarruf
              </span>
            )}
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
            Bu Ürünü Nereden Alabilirsin?
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Resmi mağazaların sıfır faturalı fiyatları ile doğrulanmış bireysel ilanları tek ekranda karşılaştırın.
          </p>
        </div>

        {savingsAmount > 0 && (
          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15 shrink-0 text-right">
            <span className="text-[11px] text-slate-300 block">Maksimum Tasarruf Potansiyeli</span>
            <span className="text-xl font-extrabold text-emerald-400">
              {formatPrice(savingsAmount)}
            </span>
          </div>
        )}
      </div>

      {/* Side-by-Side Visual Comparison Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Store Card Option */}
        <div className="bg-white/5 border border-blue-500/30 rounded-2xl p-5 hover:border-blue-400/60 transition-all group">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-blue-400">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase text-blue-400 block">
                  Kurumsal Mağazalar
                </span>
                <span className="text-sm font-bold text-white">Sıfır & Kapalı Kutu</span>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-900/60 border border-blue-700 text-blue-300">
              {product.storeOfferCount} Mağaza Teklifi
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">
                {minStore ? formatPrice(minStore) : 'Stokta Yok'}
              </span>
              {maxStore > minStore && (
                <span className="text-xs text-slate-400 font-medium">
                  — {formatPrice(maxStore)} arası
                </span>
              )}
            </div>

            <ul className="mt-3 space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Adınıza resmi e-fatura & 24 ay garanti</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Ücretsiz aynı gün sigortalı kargo</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>14 gün koşulsuz iade güvencesi</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Individual Card Option */}
        <div className="bg-white/5 border border-amber-500/30 rounded-2xl p-5 hover:border-amber-400/60 transition-all group">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-600/30 border border-amber-500/50 flex items-center justify-center text-amber-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase text-amber-400 block">
                  Bireysel Satıcılar
                </span>
                <span className="text-sm font-bold text-white">İkinci El Fırsatları</span>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-900/60 border border-amber-700 text-amber-300">
              {product.individualOfferCount} İlan Yayında
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-300">
                {minInd ? formatPrice(minInd) : 'İlan Yok'}
              </span>
              {maxInd > minInd && (
                <span className="text-xs text-slate-400 font-medium">
                  — {formatPrice(maxInd)} arası
                </span>
              )}
            </div>

            <ul className="mt-3 space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Handshake className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Elden teslim & yerinde test etme imkanı</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Fiyat teklifi yapma & pazarlık şansı</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Kimlik & telefon doğrulanmış profiller</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Visual Price Span Bar */}
      {minInd > 0 && minStore > 0 && (
        <div className="relative z-10 mt-6 pt-5 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>En Düşük İkinci El: <strong>{formatPrice(minInd)}</strong></span>
            <span className="text-center text-emerald-400 font-bold">Fiyat Aralığı Grafiği</span>
            <span>En Yüksek Mağaza: <strong>{formatPrice(maxStore)}</strong></span>
          </div>

          {/* Visual gradient bar */}
          <div className="w-full h-3.5 bg-slate-800 rounded-full p-0.5 flex relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 rounded-l-full"
              style={{ width: `${Math.max(25, Math.min(45, (minInd / maxStore) * 100))}%` }}
              title="İkinci El Fiyat Aralığı"
            />
            <div className="h-full bg-slate-700/50 flex-1 mx-1 rounded" />
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500 rounded-r-full"
              style={{ width: '45%' }}
              title="Sıfır Mağaza Fiyat Aralığı"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5 font-medium">
            <span className="text-amber-400 flex items-center gap-1">● Bireysel Pazar</span>
            <span className="text-blue-400 flex items-center gap-1">● Kurumsal Mağaza Piyasası</span>
          </div>
        </div>
      )}
    </div>
  );
}
