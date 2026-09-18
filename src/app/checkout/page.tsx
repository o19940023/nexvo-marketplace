'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  Truck,
  MapPin,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Lock,
  Home,
  Check,
} from 'lucide-react';

const MOCK_ADDRESSES = [
  {
    id: 'addr-1',
    title: 'Ev Ünvanım',
    fullName: 'Ramiz Mehdiyev',
    phone: '+994 50 123 45 67',
    city: 'Bakı',
    district: 'Nizami',
    fullAddress: 'Qara Qarayev prospekti, Bina 42, Mənzil 18',
    isDefault: true,
  },
  {
    id: 'addr-2',
    title: 'İş / Ofis',
    fullName: 'Ramiz Mehdiyev',
    phone: '+994 50 123 45 67',
    city: 'Bakı',
    district: 'Səbail',
    fullAddress: 'Nizami küçəsi, Landmark Plaza Mərtəbə: 4',
    isDefault: false,
  },
];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, formatPrice } = useMarketplace();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedAddressId, setSelectedAddressId] = useState('addr-1');
  const [deliveryMethod, setDeliveryMethod] = useState<'cargo' | 'pickup'>('cargo');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'escrow' | 'door'>('card');
  const [orderNumber, setOrderNumber] = useState('');

  const [cardNumber, setCardNumber] = useState('4543 •••• •••• 8821');
  const [cardHolder, setCardHolder] = useState('RAMIZ MEHDIYYEV');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('•••');

  const handleCompleteOrder = () => {
    const generatedOrderNum = `NX-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);
    setCurrentStep(4);
    clearCart();

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {}
  };

  const steps = [
    { num: 1, label: 'Çatdırılma' },
    { num: 2, label: 'Ünvan' },
    { num: 3, label: 'Ödəniş' },
    { num: 4, label: 'Təsdiq' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Step Indicator */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {steps.map((step, idx) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;

            return (
              <React.Fragment key={step.num}>
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCompleted
                        ? 'bg-slate-900 text-white'
                        : isCurrent
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : step.num}
                  </div>
                  <span
                    className={`text-[11px] font-bold ${
                      isCurrent ? 'text-slate-900' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 rounded ${
                      currentStep > step.num ? 'bg-slate-900' : 'bg-slate-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* STEP 1: Çatdırılma */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">1. Çatdırılma Üsulunu Seçin</h2>
            <p className="text-xs text-slate-500 mt-0.5">Sifarişin sizə necə təqdim ediləcəyini müəyyənləşdirin.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setDeliveryMethod('cargo')}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                deliveryMethod === 'cargo'
                  ? 'border-slate-900 bg-slate-50/70 ring-2 ring-slate-900/10'
                  : 'border-slate-200 hover:border-slate-400'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-3">
                <Truck className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">Ünvana Sürətli Kuryer</h4>
                <span className="text-xs font-bold text-emerald-600">PULSUZ</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Sığortalı kuryerlə Bakı daxilində eyni gündə, bölgələrə 24 saatda çatdırılır.
              </p>
            </button>

            <button
              onClick={() => setDeliveryMethod('pickup')}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                deliveryMethod === 'pickup'
                  ? 'border-slate-900 bg-slate-50/70 ring-2 ring-slate-900/10'
                  : 'border-slate-200 hover:border-slate-400'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">Mağazadan / Əldən Təhvil</h4>
                <span className="text-xs font-bold text-emerald-600">PULSUZ</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Satıcının mağazasından və ya razılaşdırılmış təhvil nöqtəsindən yoxlayaraq götürün.
              </p>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Ünvan Məlumatlarına Keç</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Ünvan */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">2. Çatdırılma Ünvanı</h2>
              <p className="text-xs text-slate-500 mt-0.5">Qeydiyyatdakı ünvanınızı seçin.</p>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:underline">+ Yeni Ünvan</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_ADDRESSES.map(addr => (
              <div
                key={addr.id}
                onClick={() => setSelectedAddressId(addr.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedAddressId === addr.id
                    ? 'border-slate-900 bg-slate-50/70 ring-2 ring-slate-900/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-slate-600" />
                    {addr.title}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                      Əsas
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-slate-800">{addr.fullName} • {addr.phone}</p>
                <p className="text-xs text-slate-600 mt-1">{addr.fullAddress}</p>
                <span className="text-xs text-slate-400 block mt-1">{addr.district} / {addr.city}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-bold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Geri</span>
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Ödəniş Mərhələsinə Keç</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Ödəniş */}
      {currentStep === 3 && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">3. Təhlükəsiz Ödəniş</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ödənişiniz NEXVO Əmanət Hesabında saxlanılır və məhsul təhvil alınana qədər satıcıya köçürülmür.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'card', label: 'Bank Kartı', icon: CreditCard },
              { id: 'escrow', label: 'NEXVO Əmanət', icon: ShieldCheck },
              { id: 'door', label: 'Qapıda / Əldən Ödəniş', icon: Truck },
            ].map(m => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    paymentMethod === m.id
                      ? 'border-slate-900 bg-slate-50 text-slate-900 font-bold ring-2 ring-slate-900/10'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mx-auto mb-1 text-slate-700" />
                  <span className="text-xs block leading-tight">{m.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                256-Bit SSL Kart Məlumatları
              </span>
              <span className="font-extrabold text-slate-600">VISA / MASTERCARD</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Kart Nömrəsi</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Kart Sahibinin Adı</label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={e => setCardHolder(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Bitmə Tarixi (AA/YY)</label>
                <input
                  type="text"
                  value={cardExpiry}
                  onChange={e => setCardExpiry(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">CVV Kodu</label>
                <input
                  type="text"
                  value={cardCvv}
                  onChange={e => setCardCvv(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-bold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Geri</span>
            </button>

            <button
              onClick={handleCompleteOrder}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Sifarişi Təsdiqlə ({formatPrice(cartTotal || 2499)})</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Təsdiq */}
      {currentStep === 4 && (
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-lg text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
              Sifariş Qəbul Edildi
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              Təbriklər! Sifarişiniz Təsdiqləndi
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Sifariş izləmə kodu və çatdırılma detalları nömrənizə göndərildi.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-left space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Sifariş Kodu:</span>
              <span className="font-extrabold text-slate-900">{orderNumber || 'NX-491028'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Təxmini Çatdırılma:</span>
              <span className="font-bold text-slate-900">Sabah, 14:00 - 18:00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Ödəniş Vəziyyəti:</span>
              <span className="text-emerald-700 font-bold">✓ Əmanət Hesabında Bloke Edildi</span>
            </div>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/profile"
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Sifarişlərimə Bax
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
            >
              Ana Səhifə
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
