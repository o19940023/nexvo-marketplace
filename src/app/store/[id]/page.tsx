'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getStoreById, PRODUCTS } from '@/data/mockData';
import ProductCard from '@/components/product/ProductCard';
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Phone,
  Truck,
  RotateCcw,
  ChevronRight,
} from 'lucide-react';

interface StorePageProps {
  params: Promise<{ id: string }>;
}

export default function StoreProfilePage({ params }: StorePageProps) {
  const resolvedParams = use(params);
  const storeId = resolvedParams.id;
  const store = getStoreById(storeId);

  if (!store) {
    notFound();
  }

  const storeProducts = PRODUCTS.filter(p => p.offers.some(o => o.sellerId === store.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 transition-colors">Ana Səhifə</Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-400">Rəsmi Mağazalar</span>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="font-semibold text-slate-900">{store.name}</span>
      </nav>

      {/* Store Banner & Header */}
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm">
        <div className="relative h-40 sm:h-52 bg-slate-950 overflow-hidden">
          <Image src={store.bannerImage} alt={store.name} fill className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </div>

        <div className="p-6 sm:p-8 -mt-14 relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="flex items-start sm:items-end gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl relative overflow-hidden bg-white shrink-0 border-4 border-white shadow-md">
              <Image src={store.logo} alt={store.name} fill className="object-cover" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">{store.name}</h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  Rəsmi Mağaza
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <span className="flex items-center gap-1 text-slate-900 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  <span>{store.rating} ({store.reviewCount} Rəy)</span>
                </span>
                <span>•</span>
                <span className="font-bold text-slate-800">{store.salesCount.toLocaleString('az-AZ')} Satış</span>
                <span>•</span>
                <span>Üzvlük: {store.memberSince}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {store.badges.map((badge, idx) => (
              <span key={idx} className="text-xs font-semibold px-3 py-1 rounded-xl bg-slate-100 text-slate-700">
                ✓ {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="px-6 sm:px-8 py-3.5 bg-slate-50 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{store.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{store.workingHours}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{store.phone}</span>
          </div>
        </div>
      </div>

      {/* Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
          <Truck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-slate-900">Çatdırılma Siyasəti</h4>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{store.shippingInfo}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-slate-900">Rəsmi Servis Zəmanəti</h4>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{store.warrantyInfo}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
          <RotateCcw className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-slate-900">Qaytarılma Şərtləri</h4>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{store.returnPolicy}</p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Mağazanın Satışdakı Məhsulları</h2>
            <p className="text-xs text-slate-500 mt-0.5">Bütün məhsullar sıfır ambalajında və rəsmi zəmanətlidir.</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-slate-100 rounded-full text-slate-700">
            {storeProducts.length} Məhsul
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {storeProducts.map(product => {
            const offer = product.offers.find(o => o.sellerId === store.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                offer={offer}
                displayMode="offer"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
