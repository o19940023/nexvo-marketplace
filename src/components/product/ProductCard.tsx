'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, ProductOffer } from '@/types/marketplace';
import { useMarketplace } from '@/context/MarketplaceContext';
import { SellerTypeBadge, ConditionBadge, DeliveryBadge } from '@/components/ui/Badge';
import { Heart, Star, ArrowUpRight, MapPin, ShieldCheck, Tag } from 'lucide-react';

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

  // If rendering a single specific offer card (e.g. within alternative offers list)
  if (displayMode === 'offer' && offer) {
    const isStore = offer.sellerType === 'store';

    return (
      <div className="group luxury-card rounded-xl overflow-hidden flex flex-col justify-between relative bg-white">
        <div className="relative aspect-[4/3] bg-[#f5f6f8] overflow-hidden">
          <Image
            src={offer.images[0] || product.baseImages[0]}
            alt={`${product.title} - ${offer.sellerName}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
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
            className={`absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
              isFav
                ? 'bg-rose-50 text-rose-600 shadow-xs'
                : 'bg-white/80 text-slate-500 hover:bg-white hover:text-rose-600'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 stroke-rose-500' : ''}`} />
          </button>

          <div className="absolute bottom-2 left-2 z-10">
            <ConditionBadge condition={offer.condition} size="sm" />
          </div>
        </div>

        <div className="p-3.5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span className="font-semibold text-slate-700 tracking-wide uppercase">{product.brand}</span>
              {offer.sellerRating && (
                <span className="flex items-center gap-1 text-slate-800 font-medium">
                  <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                  <span>{offer.sellerRating}</span>
                </span>
              )}
            </div>

            <Link href={`/product/${product.id}`}>
              <h3 className="text-xs sm:text-sm font-semibold text-slate-950 line-clamp-2 hover:text-blue-600 transition-colors">
                {product.title}
              </h3>
            </Link>

            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="truncate max-w-[130px] font-medium text-slate-700">{offer.sellerName}</span>
              <span className="flex items-center gap-0.5 shrink-0 text-slate-400">
                <MapPin className="w-2.5 h-2.5" />
                {offer.sellerCity}
              </span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-base font-bold text-slate-950 price-tag">
                {formatPrice(offer.price)}
              </div>
              <DeliveryBadge type={offer.deliveryType} fee={offer.deliveryFee} distanceKm={offer.distanceKm} />
            </div>

            <Link
              href={`/product/${product.id}`}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold btn-primary flex items-center gap-1"
            >
              <span>İncələ</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Primary Adaptive Luxury Product Card
  return (
    <div className="group luxury-card rounded-2xl overflow-hidden flex flex-col justify-between relative bg-white">
      {/* Visual Image Showcase */}
      <div className="relative aspect-[4/3] bg-[#f5f6f8] overflow-hidden">
        <Image
          src={product.baseImages[0]}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Favorite Button */}
        <button
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className={`absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            isFav
              ? 'bg-rose-50 text-rose-600 shadow-xs'
              : 'bg-white/85 text-slate-500 hover:bg-white hover:text-rose-600 shadow-2xs'
          }`}
          aria-label="Sevimlilərə əlavə et"
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 stroke-rose-500' : ''}`} />
        </button>

        {/* Mode-specific Badge */}
        <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1.5">
          {marketMode === 'store' && product.storeOfferCount > 0 ? (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-950/90 text-white backdrop-blur-xs flex items-center gap-1 shadow-xs">
              <ShieldCheck className="w-3 h-3 text-blue-400" />
              Rəsmi Zəmanət ({product.storeOfferCount} təklif)
            </span>
          ) : marketMode === 'c2c' && product.individualOfferCount > 0 ? (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-900/90 text-white backdrop-blur-xs flex items-center gap-1 shadow-xs">
              <Tag className="w-3 h-3 text-amber-400" />
              İkinci Əl ({product.individualOfferCount} elan)
            </span>
          ) : (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-900/90 text-white backdrop-blur-xs">
              {product.offers.length} Təklif
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1 font-medium">
            <span className="tracking-wide uppercase text-slate-600">{product.brand}</span>
            <span className="flex items-center gap-0.5 text-slate-800">
              <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewCount})</span>
            </span>
          </div>

          <Link href={`/product/${product.id}`} className="block">
            <h3 className="text-sm font-semibold text-slate-950 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
              {product.title}
            </h3>
          </Link>
          
          <p className="text-xs text-slate-500 mt-1 line-clamp-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Dynamic Dual-Mode Pricing Architecture */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-2.5">
            {marketMode === 'store' ? (
              <div>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block">
                  Rəsmi Diler Qiyməti
                </span>
                <span className="text-base sm:text-lg font-bold text-slate-950 price-tag">
                  {product.minStorePrice ? formatPrice(product.minStorePrice) : 'Stokda yoxdur'}
                </span>
              </div>
            ) : (
              <div>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block">
                  İkinci Əl Qiyməti
                </span>
                <span className="text-base sm:text-lg font-bold text-slate-950 price-tag">
                  {product.minIndividualPrice ? formatPrice(product.minIndividualPrice) : 'Elan yoxdur'}
                </span>
              </div>
            )}

            {/* Smart Cross-Market Comparison Tag */}
            {marketMode === 'store' && product.minIndividualPrice && (
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">İkinci əl:</span>
                <span className="text-xs font-semibold text-amber-700 price-tag">{formatPrice(product.minIndividualPrice)}</span>
              </div>
            )}
            {marketMode === 'c2c' && product.minStorePrice && (
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Mağazada sıfır:</span>
                <span className="text-xs font-semibold text-blue-600 price-tag">{formatPrice(product.minStorePrice)}</span>
              </div>
            )}
          </div>

          <Link
            href={`/product/${product.id}`}
            className="w-full py-2 px-3 rounded-xl btn-secondary text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Bütün Təkliflərə Bax</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
