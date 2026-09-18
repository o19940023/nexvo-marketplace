'use client';

import React from 'react';
import { Product, ProductOffer } from '@/types/marketplace';
import { useMarketplace } from '@/context/MarketplaceContext';
import { SellerTypeBadge, ConditionBadge, DeliveryBadge } from '@/components/ui/Badge';
import {
  User,
  Store,
  Star,
  MapPin,
  Handshake,
  MessageSquare,
  ShoppingBag,
  Sparkles,
  TrendingDown,
  Battery,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface AlternativeOffersSectionProps {
  product: Product;
  currentMode: 'store' | 'c2c';
}

export default function AlternativeOffersSection({ product, currentMode }: AlternativeOffersSectionProps) {
  const { formatPrice, openOfferModal, openChatModal, addToCart } = useMarketplace();

  // If in Store mode -> show individual second-hand offers for this same product!
  // If in C2C mode -> show official store offers for this same product!
  const targetSellerType = currentMode === 'store' ? 'individual' : 'store';
  const alternativeOffers = product.offers.filter(o => o.sellerType === targetSellerType);

  if (alternativeOffers.length === 0) return null;

  const minStore = product.minStorePrice || 0;
  const minInd = product.minIndividualPrice || 0;
  const savings = minStore && minInd && minStore > minInd ? minStore - minInd : 0;

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {currentMode === 'store' ? 'Daha Sərfəli Seçim' : 'Rəsmi Mağaza Alternativi'}
            </span>
            {currentMode === 'store' && savings > 0 && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {formatPrice(savings)} Qənaət İmkanı
              </span>
            )}
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1.5">
            {currentMode === 'store'
              ? `Bu Məhsulun Fərdi Şəxslərdən İkinci Əl Elanları (${alternativeOffers.length} elan)`
              : `Bu Məhsulun Rəsmi Mağazalarda Sıfır Qiymətləri (${alternativeOffers.length} mağaza)`}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {currentMode === 'store'
              ? 'Eyni modeli rəsmi mağaza yerinə istifadəçilərdən daha münasib qiymətə əldən təhvil ala bilərsiniz.'
              : 'Eyni modeli zəmanətli və adınıza elektron qaiməli sıfır olaraq mağazadan sifariş edə bilərsiniz.'}
          </p>
        </div>
      </div>

      {/* Alternative Offers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {alternativeOffers.map(offer => {
          const isStore = offer.sellerType === 'store';

          return (
            <div
              key={offer.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                isStore
                  ? 'border-blue-100 bg-blue-50/20 hover:border-blue-300'
                  : 'border-amber-100 bg-amber-50/20 hover:border-amber-300'
              }`}
            >
              <div>
                {/* Seller identity row */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-full relative overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      <Image src={offer.sellerAvatar} alt={offer.sellerName} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{offer.sellerName}</h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <span className="flex items-center gap-0.5 text-slate-700 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                          <span>{offer.sellerRating}</span>
                        </span>
                        <span>•</span>
                        <span>{offer.sellerCity}</span>
                      </div>
                    </div>
                  </div>

                  <SellerTypeBadge type={offer.sellerType} size="sm" isVerified={offer.sellerVerified} />
                </div>

                {/* Offer details */}
                <div className="py-3 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <ConditionBadge condition={offer.condition} size="sm" />
                    {offer.batteryHealth && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Pil: %{offer.batteryHealth}
                      </span>
                    )}
                  </div>

                  {offer.conditionDescription && (
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      &quot;{offer.conditionDescription}&quot;
                    </p>
                  )}

                  <DeliveryBadge
                    type={offer.deliveryType}
                    fee={offer.deliveryFee}
                    distanceKm={offer.distanceKm}
                  />
                </div>
              </div>

              {/* Bottom Price & Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Təklif Qiyməti:</span>
                  <span className="text-base font-black text-slate-900">{formatPrice(offer.price)}</span>
                </div>

                {isStore ? (
                  <button
                    onClick={() => addToCart(offer, product)}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Səbətə At</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() =>
                        openChatModal({
                          sellerId: offer.sellerId,
                          sellerName: offer.sellerName,
                          sellerAvatar: offer.sellerAvatar,
                          sellerType: 'individual',
                          productTitle: product.title,
                          productPrice: offer.price,
                          productImage: offer.images[0] || product.baseImages[0],
                        })
                      }
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
                      title="Satıcıya Yaz"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => openOfferModal(product, offer)}
                      className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all shadow-xs"
                    >
                      <Handshake className="w-3.5 h-3.5" />
                      <span>Təklif Et</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
