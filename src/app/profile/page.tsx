'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  ShoppingBag,
  Handshake,
  MapPin,
  PlusCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Truck,
  Upload,
} from 'lucide-react';
import { CATEGORIES } from '@/data/mockData';

export default function ProfilePage() {
  const { userCity, formatPrice, showToast } = useMarketplace();
  const [activeTab, setActiveTab] = useState<'orders' | 'offers' | 'addresses' | 'post_ad'>('orders');

  const [adTitle, setAdTitle] = useState('');
  const [adCategory, setAdCategory] = useState('elektronika');
  const [adPrice, setAdPrice] = useState('');
  const [adCondition, setAdCondition] = useState('very_good');
  const [adDescription, setAdDescription] = useState('');
  const [adDelivery, setAdDelivery] = useState('pickup');

  const handlePostAd = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Elanınız Dərc Olundu!', 'Elanınız dərhal NEXVO İkinci Əl Bazarında yayımlandı.', 'success');
    setAdTitle('');
    setAdPrice('');
    setAdDescription('');
    setActiveTab('offers');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-18 h-18 rounded-full bg-slate-950 text-white font-black text-xl flex items-center justify-center border-4 border-slate-100 shadow-sm">
            R
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">Ramiz Mehdiyev</h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Təsdiqlənmiş Hesab
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {userCity}, Azərbaycan • ramiz.mehdiyev@example.com • Üzvlük: Sentyabr 2024
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('post_ad')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Pulsuz Elan Yerləşdir</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'orders', label: 'Sifarişlərim', icon: ShoppingBag, count: 2 },
          { id: 'offers', label: 'Verdiyim Təkliflər', icon: Handshake, count: 1 },
          { id: 'addresses', label: 'Ünvanlarım', icon: MapPin, count: 2 },
          { id: 'post_ad', label: 'Elan Yarat', icon: PlusCircle },
        ].map(tab => {
          const Icon = tab.icon;
          const isSel = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                isSel
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSel ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Siparişlerim */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <div>
                <span className="text-slate-400">Sifariş Kodu:</span>
                <span className="font-bold text-slate-900 ml-1">#NX-938210</span>
                <span className="text-slate-400 mx-2">•</span>
                <span className="text-slate-500">18 Sentyabr 2026</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold flex items-center gap-1 text-[11px]">
                <Truck className="w-3 h-3" />
                Kuryerdədir
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 relative rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                  <Image
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=300&auto=format&fit=crop"
                    alt="iPhone 17"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-600 block">TechZone Official Store</span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Apple iPhone 17 256 GB</h4>
                  <span className="text-[11px] text-slate-400">Sıfır Plomblu Qutu • 24 Ay Zəmanət</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-slate-900 block">{formatPrice(2499)}</span>
                <span className="text-[10px] text-emerald-600 font-medium">Əmanət Hesabında</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <div>
                <span className="text-slate-400">Sifariş Kodu:</span>
                <span className="font-bold text-slate-900 ml-1">#NX-812741</span>
                <span className="text-slate-400 mx-2">•</span>
                <span className="text-slate-500">10 Sentyabr 2026</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3 h-3" />
                Təhvil Verildi
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 relative rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                  <Image
                    src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=300&auto=format&fit=crop"
                    alt="Sony WH-1000XM6"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-600 block">TechZone Official Store</span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Sony WH-1000XM6 Qulaqlıq</h4>
                  <span className="text-[11px] text-slate-400">Sıfır Orijinal Paket</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-slate-900 block">{formatPrice(699)}</span>
                <button className="text-[11px] font-bold text-blue-600 hover:underline">Rəy Yaz</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Tekliflerim */}
      {activeTab === 'offers' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
            <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1 text-[11px]">
              <Clock className="w-3 h-3 text-amber-600" />
              Satıcı Cavabı Gözlənilir
            </span>
            <span className="text-slate-400">18 Sentyabr 2026, 12:40</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 relative rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=300&auto=format&fit=crop"
                  alt="PlayStation 5"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-700 block">Satıcı: Murad Qasımov (Fərdi)</span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Sony PlayStation 5 Slim 1 TB</h4>
                <span className="text-[11px] text-slate-400">Elan Qiyməti: {formatPrice(790)}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Sizin Təklifiniz:</span>
              <span className="text-base font-black text-amber-600">{formatPrice(730)}</span>
              <span className="text-[10px] text-slate-500 block">Əldən Təhvil / Bakı</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Ünvanlarım */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border-2 border-slate-900 bg-slate-50/50 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Ev Ünvanım</span>
              <span className="text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded">Əsas</span>
            </div>
            <p className="text-slate-700 font-semibold">Ramiz Mehdiyev • +994 50 123 45 67</p>
            <p className="text-slate-500">Qara Qarayev prospekti, Bina 42, Mənzil 18, Nizami / Bakı</p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">İş / Ofis</span>
            </div>
            <p className="text-slate-700 font-semibold">Ramiz Mehdiyev • +994 50 123 45 67</p>
            <p className="text-slate-500">Nizami küçəsi, Landmark Plaza Mərtəbə: 4, Səbail / Bakı</p>
          </div>
        </div>
      )}

      {/* TAB 4: Elan Yarat */}
      {activeTab === 'post_ad' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">İkinci Əl Elan Yerləşdir (Komissiyasız)</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              İstifadə etmədiyiniz əşyaları saniyələr içində satışa çıxarın.
            </p>
          </div>

          <form onSubmit={handlePostAd} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Elanın Başlığı</label>
              <input
                type="text"
                required
                placeholder="Məs: Apple iPhone 16 Pro 128 GB Qutulu və Təmiz"
                value={adTitle}
                onChange={e => setAdTitle(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:border-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Kateqoriya</label>
                <select
                  value={adCategory}
                  onChange={e => setAdCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:border-slate-900 bg-white"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Qiymət (₼)</label>
                <input
                  type="number"
                  required
                  placeholder="Məs: 1450"
                  value={adPrice}
                  onChange={e => setAdPrice(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:border-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Məhsulun Vəziyyəti</label>
                <select
                  value={adCondition}
                  onChange={e => setAdCondition(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:border-slate-900 bg-white"
                >
                  <option value="like_new">Sıfırdan Fərqsiz (Cızıqsız)</option>
                  <option value="very_good">Çox Yaxşı Vəziyyətdə</option>
                  <option value="good">Yaxşı Vəziyyətdə (Normal istifadə)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Təhvil Növü</label>
                <select
                  value={adDelivery}
                  onChange={e => setAdDelivery(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:border-slate-900 bg-white"
                >
                  <option value="pickup">Yalnız Əldən Təhvil</option>
                  <option value="both">Əldən Təhvil & Kuryer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Ətraflı Məlumat</label>
              <textarea
                rows={3}
                required
                placeholder="Məhsulun batareya faizini, qutusunu və sənədlərini qeyd edin..."
                value={adDescription}
                onChange={e => setAdDescription(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-slate-900 resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Şəkillər</label>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-5 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                <span className="text-xs font-bold text-slate-700 block">Şəkilləri Buraya Yükləyin</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Maksimum 5 foto</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-sm transition-all cursor-pointer"
            >
              Elanı Pulsuz Yayımla
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
