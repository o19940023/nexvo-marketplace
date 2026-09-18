'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { X, Send, Handshake, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function OfferModal() {
  const { offerModal, closeOfferModal, sendChatMessage, openChatModal, formatPrice } = useMarketplace();
  const { product, offer, isOpen } = offerModal;

  const [customAmount, setCustomAmount] = useState<number>(0);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [offerNote, setOfferNote] = useState('Salam, razılaşsaq bu gün əldən təhvil ala bilərəm.');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !product || !offer) return null;

  const basePrice = offer.price;

  const handleSelectDiscount = (percent: number) => {
    setSelectedPreset(percent);
    const newPrice = Math.round(basePrice * (1 - percent / 100));
    setCustomAmount(newPrice);
  };

  const finalAmount = customAmount > 0 ? customAmount : Math.round(basePrice * 0.9);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const messageText = `Qiymət Təklifi: ${formatPrice(finalAmount)} (İlan Qiyməti: ${formatPrice(basePrice)})\nQeyd: ${offerNote}`;

    sendChatMessage(offer.sellerId, messageText, finalAmount);

    setTimeout(() => {
      setIsSubmitted(false);
      closeOfferModal();
      openChatModal({
        sellerId: offer.sellerId,
        sellerName: offer.sellerName,
        sellerAvatar: offer.sellerAvatar,
        sellerType: offer.sellerType,
        productTitle: product.title,
        productPrice: offer.price,
        productImage: offer.images[0] || product.baseImages[0],
      });
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={closeOfferModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Handshake className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Qiymət Təklifi Göndər</h3>
            <p className="text-xs text-slate-500">Satıcı ilə birbaşa onlayn razılaşın.</p>
          </div>
        </div>

        {/* Product mini card */}
        <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
          <div className="w-12 h-12 relative rounded-xl bg-white overflow-hidden shrink-0 border border-slate-200">
            <Image
              src={offer.images[0] || product.baseImages[0]}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-900 truncate">{product.title}</h4>
            <span className="text-xs text-slate-500 mt-0.5 block">
              İlan Qiyməti: <strong className="text-slate-800">{formatPrice(basePrice)}</strong>
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              Sürətli Endirim Seçin və ya Öz Məbləğinizi Yazın:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 15].map(pct => {
                const discounted = Math.round(basePrice * (1 - pct / 100));
                const isSel = selectedPreset === pct;
                return (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handleSelectDiscount(pct)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      isSel
                        ? 'border-slate-900 bg-slate-900 text-white font-bold'
                        : 'border-slate-200 hover:border-slate-400 text-slate-700'
                    }`}
                  >
                    <span className="text-[10px] block font-semibold opacity-80">-%{pct} Endirim</span>
                    <span className="text-xs font-bold mt-0.5">{formatPrice(discounted)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Təklif Etdiyiniz Məbləğ:
            </label>
            <input
              type="number"
              value={customAmount || ''}
              onChange={e => {
                setSelectedPreset(null);
                setCustomAmount(Number(e.target.value));
              }}
              placeholder={String(Math.round(basePrice * 0.9))}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:border-slate-900 font-bold text-slate-900 text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Satıcıya Qeydiniz:
            </label>
            <textarea
              rows={2}
              value={offerNote}
              onChange={e => setOfferNote(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-slate-900 text-xs text-slate-800 outline-none resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitted}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer text-xs"
            >
              {isSubmitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white animate-pulse" />
                  <span>Təklif Göndərilir...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{formatPrice(finalAmount)} Təklifini Göndər</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Təklif qeyri-məcburidir, satıcı təsdiq edənədək heç bir ödəniş tutulmur.</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
