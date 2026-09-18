'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Store,
  User,
  Truck,
} from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, formatPrice, showToast } = useMarketplace();
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const storeItems = cart.filter(item => item.offer.sellerType === 'store');
  const individualItems = cart.filter(item => item.offer.sellerType === 'individual');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'NEXVO50') {
      setAppliedDiscount(50);
      showToast('Kupon Tətbiq Edildi', '50 ₼ xüsusi endirim səbətinizə əlavə olundu.', 'success');
    } else {
      showToast('Yanlış Kod', 'Zəhmət olmasa düzgün promo kod daxil edin (Məs: NEXVO50)', 'error');
    }
  };

  const finalTotal = Math.max(0, cartTotal - appliedDiscount);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Səbətiniz Boşdur</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Bəyəndiyiniz rəsmi mağaza məhsullarını və ya ikinci əl elanları səbətə əlavə edərək alış-verişə başlaya bilərsiniz.
        </p>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
        >
          <span>Məhsulları Kəşf Et</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">Alış-Veriş Səbətim</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Rəsmi mağaza sifarişləriniz və ikinci əl rezervasiyalarınız
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-800 rounded-full">
          {cart.length} Məhsul
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Store Items */}
          {storeItems.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Store className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Rəsmi Mağaza Məhsulları ({storeItems.length})
                </h3>
                <span className="text-[11px] text-blue-600 font-semibold ml-auto">
                  Elektron Qaimə & Kuryer
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {storeItems.map(item => (
                  <div key={item.offer.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-14 h-14 relative rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-slate-200">
                        <Image
                          src={item.offer.images[0] || item.product.baseImages[0]}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] text-blue-600 font-bold block">{item.offer.sellerName}</span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-xs">
                          {item.product.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {item.offer.warranty}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 p-0.5">
                        <button
                          onClick={() => updateCartQuantity(item.offer.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded hover:bg-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-slate-900">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.offer.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded hover:bg-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right min-w-[70px]">
                        <span className="text-xs sm:text-sm font-black text-slate-900 block">
                          {formatPrice(item.offer.price * item.quantity)}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-semibold">Pulsuz Çatdırılma</span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.offer.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Individual Items */}
          {individualItems.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <User className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  İkinci Əl Rezervasiyaları ({individualItems.length})
                </h3>
                <span className="text-[11px] text-amber-700 font-semibold ml-auto">
                  Əmanət Qoruması / Əldən Təhvil
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {individualItems.map(item => (
                  <div key={item.offer.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-14 h-14 relative rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-slate-200">
                        <Image
                          src={item.offer.images[0] || item.product.baseImages[0]}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] text-amber-700 font-bold block">{item.offer.sellerName} (Fərdi)</span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-xs">
                          {item.product.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {item.offer.sellerCity} • Əldən Təhvil
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right min-w-[70px]">
                        <span className="text-xs sm:text-sm font-black text-slate-900 block">
                          {formatPrice(item.offer.price)}
                        </span>
                        <span className="text-[10px] text-amber-700 font-medium">Rezerv edildi</span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.offer.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Summary Column (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Sifariş Məlumatı</h3>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>Ara Məbləğ</span>
                <span className="font-bold text-slate-900">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Çatdırılma</span>
                <span className="font-bold text-emerald-600">PULSUZ</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-700 font-bold">
                  <span>Kupon Endirimi (NEXVO50)</span>
                  <span>-{formatPrice(appliedDiscount)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                <span className="text-sm font-bold text-slate-900">Yekun Məbləğ</span>
                <span className="text-xl font-black text-slate-900">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Promo Kod (məs: NEXVO50)"
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                className="flex-1 h-9 px-3 rounded-xl border border-slate-200 text-xs font-semibold uppercase outline-none focus:border-slate-900"
              />
              <button
                type="submit"
                className="px-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Tətbiq Et
              </button>
            </form>

            <Link
              href="/checkout"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all text-xs cursor-pointer shadow-sm"
            >
              <span>Sifarişi Rəsmiləşdir</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="pt-2 text-[10px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>NEXVO 256-Bit SSL təhlükəsiz ödəniş zəmanəti</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
