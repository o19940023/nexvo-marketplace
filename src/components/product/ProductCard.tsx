'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, ProductOffer } from '@/types/marketplace';
import { useMarketplace } from '@/context/MarketplaceContext';
import { SellerTypeBadge, ConditionBadge, DeliveryBadge } from '@/components/ui/Badge';
import { Heart, Store, User, Star, ArrowRight, MapPin, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  offer?: ProductOffer;
  displayMode?: 'product' | 'offer';
  compact?: boolean;
}

export default function ProductCard({
  product,
  offer,
  displayMode = 'product',
}: ProductCardProps) {
  const { isFavorite, toggleFavorite, formatPrice, marketMode } = useMarketplace();
  const isFav = isFavorite(product.id);

  // If rendering a single specific offer card
  if (displayMode === 'offer' && offer) {
    const isStore = offer.sellerType === 'store';

    return (
      <div
        className="group bg-white rounded-2xl border border-slate-200/90 transition-all duration-200 hover:border-slate-400 hover:shadow-md flex flex-col justify-between overflow-hidden relative"
      >
        <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
          <Image
            src={offer.images[0] || product.baseImages[0]}
            alt={`${product.title} - ${offer.sellerName}`}
            fill
            className="object-cover group-hover:scale-103 transition-transform duration-300"
          />

          <div className="absolute top-2.5 left-2.5 z-10">
            <SellerTypeBadge type={offer.sellerType} size="sm" isVerified={offer.sellerVerified} />
          </div>

          <button
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
              isFav
                ? 'bg-rose-50 text-rose-600 shadow-xs'
                : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 stroke-rose-500' : ''}`} />
          </button>

          <div className="absolute bottom-2.5 left-2.5 z-10">
            <ConditionBadge condition={offer.condition} size="sm" />
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold text-slate-600">{product.brand}</span>
              {offer.sellerRating && (
                <span className="flex items-center gap-1 text-slate-700 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  <span>{offer.sellerRating}</span>
                </span>
              )}
            </div>

            <Link href={`/product/${product.id}`}>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 hover:text-blue-600 transition-colors">
                {product.title}
              </h3>
            </Link>

            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="truncate max-w-[140px] font-medium text-slate-700">{offer.sellerName}</span>
              <span className="flex items-center gap-0.5 shrink-0 text-slate-400">
                <MapPin className="w-3 h-3" />
                {offer.sellerCity}
              </span>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-base sm:text-lg font-black text-slate-900">
                {formatPrice(offer.price)}
              </div>
              <DeliveryBadge type={offer.deliveryType} fee={offer.deliveryFee} distanceKm={offer.distanceKm} />
            </div>

            <Link
              href={`/product/${product.id}`}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white"
            >
              <span>Bax</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Adaptive Product Card
  const bestIndOffer = product.offers.find(o => o.sellerType === 'individual');

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 transition-all duration-200 hover:border-slate-400 hover:shadow-md flex flex-col justify-between overflow-hidden relative">
      <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
        <Image
          src={product.baseImages[0]}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-103 transition-transform duration-300"
        />

        <button
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            isFav
              ? 'bg-rose-50 text-rose-600 shadow-xs'
              : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-600'
          }`}
          aria-label="Sevimlilərə əlavə et"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 stroke-rose-500' : ''}`} />
        </button>

        {/* Mode-specific tag */}
        <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1.5">
          {marketMode === 'store' && product.storeOfferCount > 0 ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900/90 text-white backdrop-blur-xs flex items-center gap-1">
              <Store className="w-3 h-3 text-blue-400" />
              Rəsmi Mağaza ({product.storeOfferCount} təklif)
            </span>
          ) : marketMode === 'c2c' && product.individualOfferCount > 0 ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-600/90 text-white backdrop-blur-xs flex items-center gap-1">
              <User className="w-3 h-3" />
              İkinci Əl ({product.individualOfferCount} elan)
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900/90 text-white backdrop-blur-xs">
              {product.offers.length} Satıcı
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-600">{product.brand}</span>
            <span className="flex items-center gap-1 text-slate-700 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span>{product.rating}</span>
            </span>
          </div>

          <Link href={`/product/${product.id}`}>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">{product.shortDescription}</p>
        </div>

        {/* Clean, Non-noisy Pricing Box */}
        <div className="mt-3.5 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-2">
            {marketMode === 'store' ? (
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Rəsmi Mağaza Qiyməti</span>
                <span className="text-base sm:text-lg font-black text-slate-900">
                  {product.minStorePrice ? formatPrice(product.minStorePrice) : 'Stokda yoxdur'}
                </span>
              </div>
            ) : (
              <div>
                <span className="text-[10px] text-amber-700 font-bold uppercase block">İkinci Əl Qiyməti</span>
                <span className="text-base sm:text-lg font-black text-slate-900">
                  {product.minIndividualPrice ? formatPrice(product.minIndividualPrice) : 'Elan yoxdur'}
                </span>
              </div>
            )}

            {/* Subtle Cross-comparison note */}
            {marketMode === 'store' && product.minIndividualPrice && (
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">2-ci əl:</span>
                <span className="text-xs font-bold text-amber-700">{formatPrice(product.minIndividualPrice)}</span>
              </div>
            )}
            {marketMode === 'c2c' && product.minStorePrice && (
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Mağazada sıfır:</span>
                <span className="text-xs font-bold text-blue-600">{formatPrice(product.minStorePrice)}</span>
              </div>
            )}
          </div>

          <Link
            href={`/product/${product.id}`}
            className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Məhsulu & Təklifləri İncələ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
