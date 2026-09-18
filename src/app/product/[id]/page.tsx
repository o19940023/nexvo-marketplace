'use client';

import React, { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById, PRODUCTS } from '@/data/mockData';
import { useMarketplace } from '@/context/MarketplaceContext';
import AlternativeOffersSection from '@/components/product/AlternativeOffersSection';
import ProductCard from '@/components/product/ProductCard';
import { SellerTypeBadge, ConditionBadge, DeliveryBadge } from '@/components/ui/Badge';
import {
  Heart,
  Share2,
  Star,
  ShieldCheck,
  Truck,
  Sparkles,
  ChevronRight,
  Store,
  User,
  ShoppingBag,
  Handshake,
  MessageSquare,
  ArrowRight,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const product = getProductById(productId);

  const {
    marketMode,
    isFavorite,
    toggleFavorite,
    formatPrice,
    addToCart,
    openOfferModal,
    openChatModal,
    showToast,
  } = useMarketplace();

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  if (!product) {
    notFound();
  }

  const isFav = isFavorite(product.id);

  // Find the primary offer based on current active marketMode
  const primaryOffer =
    marketMode === 'store'
      ? product.offers.find(o => o.sellerType === 'store') || product.offers[0]
      : product.offers.find(o => o.sellerType === 'individual') || product.offers[0];

  const isStore = primaryOffer?.sellerType === 'store';

  // Mode-based recommendations
  const relatedProducts = PRODUCTS.filter(
    p =>
      p.category === product.category &&
      p.id !== product.id &&
      (marketMode === 'store' ? p.storeOfferCount > 0 : p.individualOfferCount > 0)
  ).slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Keçid Kopyalandı', 'Məhsul linki panoya kopyalandı.', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-12 pb-24 md:pb-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-blue-600 transition-colors">Ana Səhifə</Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <Link href={`/category/${product.category}`} className="hover:text-blue-600 transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="font-semibold text-slate-900 truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Gallery Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm group">
            <Image
              src={product.baseImages[selectedImageIdx] || product.baseImages[0]}
              alt={product.title}
              fill
              priority
              className="object-cover group-hover:scale-103 transition-transform duration-300"
            />

            {/* Favorite & Share */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={handleShare}
                className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center shadow-sm transition-colors"
                title="Paylaş"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => toggleFavorite(product.id)}
                className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-all ${
                  isFav
                    ? 'bg-rose-50 text-rose-600'
                    : 'bg-white/90 hover:bg-white text-slate-700 hover:text-rose-600'
                }`}
                title="Sevimlilərə Əlavə Et"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 stroke-rose-500' : ''}`} />
              </button>
            </div>

            {/* Badge floating */}
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
              <SellerTypeBadge type={primaryOffer.sellerType} size="md" isVerified={primaryOffer.sellerVerified} />
              <ConditionBadge condition={primaryOffer.condition} size="md" />
            </div>
          </div>

          {/* Thumbnails */}
          {product.baseImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.baseImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-18 h-18 relative rounded-2xl overflow-hidden bg-slate-100 shrink-0 border-2 transition-all cursor-pointer ${
                    selectedImageIdx === idx
                      ? 'border-slate-900 shadow-sm'
                      : 'border-slate-200 hover:border-slate-400 opacity-75 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${product.title} - Foto ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Actions Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{product.brand}</span>
              <div className="flex items-center gap-1 text-xs text-slate-700 font-bold bg-slate-100 px-2.5 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                <span>{product.rating} ({product.reviewCount} Rəy)</span>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 leading-tight">
              {product.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Seller & Price Console */}
          <div className="p-6 rounded-2xl bg-slate-950 text-white space-y-4 shadow-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold tracking-wide uppercase text-[11px] text-slate-300">
                {isStore ? 'Rəsmi Mağaza Qiyməti' : 'İkinci Əl Elan Qiyməti'}
              </span>
              <span className="text-emerald-400 font-semibold text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Təsdiqlənmiş Təklif
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-white price-tag">
                  {formatPrice(primaryOffer.price)}
                </span>
                {primaryOffer.originalPrice && (
                  <span className="text-sm text-slate-500 line-through ml-2.5 price-tag">
                    {formatPrice(primaryOffer.originalPrice)}
                  </span>
                )}
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold text-slate-200 block">{primaryOffer.sellerName}</span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 justify-end mt-0.5">
                  <MapPin className="w-3 h-3" />
                  {primaryOffer.sellerCity}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
              <span>Zəmanət: <strong className="text-white font-semibold">{primaryOffer.warranty}</strong></span>
              <span>Çatdırılma: <strong className="text-white font-semibold">{primaryOffer.deliveryType === 'cargo' ? 'Pulsuz Çatdırılma' : 'Əldən Təhvil'}</strong></span>
            </div>
          </div>

          {/* Tactile Action Buttons */}
          <div className="space-y-3">
            {isStore ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => addToCart(primaryOffer, product)}
                  className="flex-1 py-3 px-4 btn-primary text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Səbətə Əlavə Et</span>
                </button>

                <Link
                  href="/checkout"
                  onClick={() => addToCart(primaryOffer, product)}
                  className="py-3 px-6 btn-secondary text-xs sm:text-sm font-semibold rounded-xl transition-all"
                >
                  İndi Al
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    openChatModal({
                      sellerId: primaryOffer.sellerId,
                      sellerName: primaryOffer.sellerName,
                      sellerAvatar: primaryOffer.sellerAvatar,
                      sellerType: 'individual',
                      productTitle: product.title,
                      productPrice: primaryOffer.price,
                      productImage: primaryOffer.images[0] || product.baseImages[0],
                    })
                  }
                  className="flex-1 py-3 px-4 btn-primary text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Satıcıya Yaz</span>
                </button>

                <button
                  onClick={() => openOfferModal(product, primaryOffer)}
                  className="flex-1 py-3 px-4 btn-secondary text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Handshake className="w-4 h-4 text-amber-600" />
                  <span>Qiymət Təklif Et</span>
                </button>
              </div>
            )}

            <div className="pt-2 text-xs text-slate-500 space-y-1.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>NEXVO Əmanət Qoruması:</strong> Məhsul sizə çatana qədər ödəniş saxlanılır.</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <span><strong>Sürətli Çatdırılma:</strong> Bakı daxilində eyni gündə ünvana təhvil.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE USER'S REQUESTED SHOWSTOPPER COMPONENT:
          "Mesela magazadaki urune girince asagida onerilenler sekmesi olur ya diger sitelerde
           bizde ikinci ellerini gorecegiz farkli kisilerin satdigi ayni urunun" */}
      <AlternativeOffersSection product={product} currentMode={marketMode} />

      {/* 3. TECHNICAL SPECIFICATIONS */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">Texniki Xüsusiyyətlər & Təsvir</h3>
          <p className="text-xs text-slate-500 mt-0.5">Bu model üçün rəsmi zavod göstəriciləri</p>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
          {product.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
          {product.specifications.map((spec, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                {spec.label}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 mt-1 block">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. "ONUN ALTINDA ISE DIGER ONERILEN HERHANGI BIR URUN (MARKETSE MARKET, IKINCI EL ISE IKINCI EL)" */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {marketMode === 'store'
                  ? 'Tövsiyə Olunan Digər Mağaza Məhsulları'
                  : 'Tövsiyə Olunan Digər İkinci Əl Elanlar'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Eyni kateqoriyadan olan digər seçimlər</p>
            </div>
            <Link
              href={`/category/${product.category}`}
              className="text-xs font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1"
            >
              <span>Kateqoriyaya Keç</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="fixed bottom-14 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80 p-3 md:hidden shadow-xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Qiymət</span>
          <span className="text-base font-extrabold text-slate-950 price-tag">
            {formatPrice(primaryOffer.price)}
          </span>
        </div>

        {isStore ? (
          <button
            onClick={() => addToCart(primaryOffer, product)}
            className="px-4 py-2 btn-primary text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Səbətə At</span>
          </button>
        ) : (
          <button
            onClick={() => openOfferModal(product, primaryOffer)}
            className="px-4 py-2 btn-secondary text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Handshake className="w-3.5 h-3.5 text-amber-600" />
            <span>Təklif Et</span>
          </button>
        )}
      </div>
    </div>
  );
}
