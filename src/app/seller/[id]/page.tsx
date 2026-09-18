'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getIndividualSellerById, PRODUCTS } from '@/data/mockData';
import { useMarketplace } from '@/context/MarketplaceContext';
import ProductCard from '@/components/product/ProductCard';
import {
  User,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';

interface SellerPageProps {
  params: Promise<{ id: string }>;
}

export default function IndividualSellerProfilePage({ params }: SellerPageProps) {
  const resolvedParams = use(params);
  const sellerId = resolvedParams.id;
  const seller = getIndividualSellerById(sellerId);

  const { openChatModal } = useMarketplace();

  if (!seller) {
    notFound();
  }

  const sellerProducts = PRODUCTS.filter(p => p.offers.some(o => o.sellerId === seller.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 transition-colors">Ana Səhifə</Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-400">Fərdi Satıcılar</span>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="font-semibold text-slate-900">{seller.name}</span>
      </nav>

      {/* Seller Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full relative overflow-hidden bg-slate-100 shrink-0 border-2 border-amber-300 shadow-sm">
              <Image src={seller.avatar} alt={seller.name} fill className="object-cover" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">{seller.name}</h1>
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                  <User className="w-3.5 h-3.5 text-amber-700" />
                  Fərdi Satıcı
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <span className="flex items-center gap-1 text-slate-900 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  <span>{seller.rating} ({seller.reviewCount} Rəy)</span>
                </span>
                <span>•</span>
                <span className="font-bold text-slate-800">{seller.completedSales} Uğurlu Təhvil</span>
                <span>•</span>
                <span>Üzvlük: {seller.memberSince}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{seller.city}, {seller.district}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() =>
              openChatModal({
                sellerId: seller.id,
                sellerName: seller.name,
                sellerAvatar: seller.avatar,
                sellerType: 'individual',
              })
            }
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Satıcıya Yaz</span>
          </button>
        </div>

        {/* Bio & Badges */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="md:col-span-2 text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl">
            <span className="font-bold text-slate-900 block mb-1">Satıcı Haqqında:</span>
            &quot;{seller.bio}&quot;
          </div>

          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Şəxsiyyət Vəsiqəsi & Nömrə Təsdiqli</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 flex items-center gap-2 font-medium">
              <Clock className="w-4 h-4 text-slate-600 shrink-0" />
              <span>Cavablandırma: {seller.responseRate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seller Listings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Satıcının Yayındakı Elanları</h2>
            <p className="text-xs text-slate-500 mt-0.5">Bütün məhsullar satıcının şəxsi əşyalarıdır, əldən təhvil alına bilər.</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-slate-100 rounded-full text-slate-700">
            {sellerProducts.length} Elan
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sellerProducts.map(product => {
            const offer = product.offers.find(o => o.sellerId === seller.id);
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
