'use client';

import React, { useState } from 'react';
import { Product, ProductOffer } from '@/types/marketplace';
import { useMarketplace } from '@/context/MarketplaceContext';
import { SellerTypeBadge, ConditionBadge, DeliveryBadge } from '@/components/ui/Badge';
import {
  Store,
  User,
  Star,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ShoppingBag,
  MessageSquare,
  Handshake,
  ArrowRight,
  Battery,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface OfferListProps {
  product: Product;
}

export default function OfferList({ product }: OfferListProps) {
  const [filterType, setFilterType] = useState<'all' | 'store' | 'individual'>('all');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'rating' | 'distance'>('price_asc');

  const { addToCart, openOfferModal, openChatModal, formatPrice } = useMarketplace();

  // Filter offers
  let filteredOffers = product.offers.filter(offer => {
    if (filterType === 'store') return offer.sellerType === 'store';
    if (filterType === 'individual') return offer.sellerType === 'individual';
    return true;
  });

  // Sort offers
  filteredOffers = [...filteredOffers].sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'rating') return b.sellerRating - a.sellerRating;
    if (sortBy === 'distance') return (a.distanceKm || 999) - (b.distanceKm || 999);
    return 0;
  });

  const storeCount = product.offers.filter(o => o.sellerType === 'store').length;
  const indCount = product.offers.filter(o => o.sellerType === 'individual').length;

  return (
    <div className="space-y-6">
      {/* Tab Filter & Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Tüm Teklifler ({product.offers.length})
          </button>

          <button
            onClick={() => setFilterType('store')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterType === 'store'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Mağazalar ({storeCount})</span>
          </button>

          <button
            onClick={() => setFilterType('individual')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterType === 'individual'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Bireysel İkinci El ({indCount})</span>
          </button>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-500"
          >
            <option value="price_asc">Fiyat: En Düşükten Başla</option>
            <option value="price_desc">Fiyat: En Yüksek</option>
            <option value="rating">Satıcı Puanı: En Yüksek</option>
            <option value="distance">En Yakın Konum</option>
          </select>
        </div>
      </div>

      {/* Offers Cards List */}
      <div className="space-y-4">
        {filteredOffers.map(offer => {
          const isStore = offer.sellerType === 'store';

          return (
            <div
              key={offer.id}
              className={`p-5 rounded-3xl border bg-white transition-all hover:shadow-xl relative overflow-hidden ${
                isStore
                  ? 'border-blue-100/80 hover:border-blue-300'
                  : 'border-amber-100/80 hover:border-amber-300'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                {/* Left: Seller identity & rating */}
                <div className="flex items-start gap-4 min-w-[260px]">
                  <div className="w-14 h-14 rounded-2xl relative overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-2xs">
                    <Image src={offer.sellerAvatar} alt={offer.sellerName} fill className="object-cover" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <SellerTypeBadge type={offer.sellerType} size="sm" isVerified={offer.sellerVerified} />
                    </div>

                    <Link
                      href={isStore ? `/store/${offer.sellerId}` : `/seller/${offer.sellerId}`}
                      className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors mt-1 block"
                    >
                      {offer.sellerName}
                    </Link>

                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                        <span>{offer.sellerRating}</span>
                      </span>
                      <span>•</span>
                      <span>{offer.sellerSalesCount} başarılı satış</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-slate-600">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {offer.sellerCity}
                        {offer.distanceKm ? ` (${offer.distanceKm} km)` : ''}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle: Condition, Warranty & Details */}
                <div className="flex-1 space-y-2 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <ConditionBadge condition={offer.condition} />
                    <span className="text-xs text-slate-600 font-medium bg-slate-100 px-2.5 py-0.5 rounded-md">
                      🛡️ {offer.warranty}
                    </span>
                    {offer.batteryHealth && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                        <Battery className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Pil Sağlığı: %{offer.batteryHealth}</span>
                      </span>
                    )}
                  </div>

                  {offer.conditionDescription && (
                    <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                      &quot;{offer.conditionDescription}&quot;
                    </p>
                  )}

                  {/* Badges / Included accessories */}
                  {offer.includedAccessories && offer.includedAccessories.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[11px] font-bold text-slate-400">Dahil:</span>
                      {offer.includedAccessories.map((acc, idx) => (
                        <span key={idx} className="text-[11px] bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                          + {acc}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-1">
                    <DeliveryBadge
                      type={offer.deliveryType}
                      fee={offer.deliveryFee}
                      distanceKm={offer.distanceKm}
                    />
                  </div>
                </div>

                {/* Right: Pricing & CTA Actions */}
                <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 shrink-0 border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0">
                  <div className="text-left lg:text-right">
                    <div className="text-2xl font-black text-slate-900">
                      {formatPrice(offer.price)}
                    </div>
                    {offer.originalPrice && (
                      <div className="text-xs text-slate-400 line-through">
                        {formatPrice(offer.originalPrice)}
                      </div>
                    )}
                  </div>

                  {/* Actions adapted to seller type */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {isStore ? (
                      <>
                        <button
                          onClick={() => addToCart(offer, product)}
                          className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Sepete Ekle</span>
                        </button>

                        <Link
                          href={`/store/${offer.sellerId}`}
                          className="px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
                          title="Mağaza Profilini Gör"
                        >
                          Mağaza
                        </Link>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            openChatModal({
                              sellerId: offer.sellerId,
                              sellerName: offer.sellerName,
                              sellerAvatar: offer.sellerAvatar,
                              sellerType: offer.sellerType,
                              productTitle: product.title,
                              productPrice: offer.price,
                              productImage: offer.images[0] || product.baseImages[0],
                            })
                          }
                          className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-slate-900/10 transition-all cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Mesaj Gönder</span>
                        </button>

                        <button
                          onClick={() => openOfferModal(product, offer)}
                          className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                        >
                          <Handshake className="w-4 h-4" />
                          <span>Teklif Yap</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
