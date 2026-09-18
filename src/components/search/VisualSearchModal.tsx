'use client';

import React, { useState, useRef } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Camera, X, Upload, Sparkles, ArrowRight, RefreshCw, CheckCircle2, Scan } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/data/mockData';

const SAMPLE_VISUAL_ITEMS = [
  {
    name: 'Apple iPhone 17',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=400&auto=format&fit=crop',
    productId: 'iphone-17',
    category: 'Smartfon',
    confidence: '%99.4',
  },
  {
    name: 'PlayStation 5 Slim',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=400&auto=format&fit=crop',
    productId: 'ps5-slim',
    category: 'Konsol',
    confidence: '%98.7',
  },
  {
    name: 'Sony WH-1000XM6',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=400&auto=format&fit=crop',
    productId: 'sony-wh-1000xm6',
    category: 'Qulaqlıq',
    confidence: '%99.1',
  },
  {
    name: 'Dyson V15 Detect',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=400&auto=format&fit=crop',
    productId: 'dyson-v15-detect',
    category: 'Tozsoran',
    confidence: '%97.8',
  },
];

export default function VisualSearchModal() {
  const { isVisualSearchOpen, closeVisualSearch, formatPrice } = useMarketplace();
  const [selectedSample, setSelectedSample] = useState<typeof SAMPLE_VISUAL_ITEMS[0] | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isVisualSearchOpen) return null;

  const startScanning = (sample: typeof SAMPLE_VISUAL_ITEMS[0]) => {
    setSelectedSample(sample);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      startScanning(SAMPLE_VISUAL_ITEMS[0]);
    }
  };

  const matchedProduct = selectedSample ? PRODUCTS.find(p => p.id === selectedSample.productId) : null;

  const handleStartCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      setCameraActive(true);
    }
  };

  const handleCaptureCamera = () => {
    startScanning(SAMPLE_VISUAL_ITEMS[0]);
    setCameraActive(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-5 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Şəkil & Kamera ilə Axtar</h3>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                  AI Vision
                </span>
              </div>
              <p className="text-xs text-slate-500">Məhsulun şəklini çəkin; mağaza və ikinci əl qiymətlərini göstərək.</p>
            </div>
          </div>
          <button
            onClick={closeVisualSearch}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {cameraActive ? (
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden flex flex-col items-center justify-center">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <div className="absolute inset-0 border-2 border-dashed border-white/60 rounded-2xl m-6 pointer-events-none flex items-center justify-center">
                <span className="text-xs text-white bg-black/60 px-3 py-1 rounded-full">
                  Məhsulu çərçivəyə yönəldin
                </span>
              </div>
              <button
                onClick={handleCaptureCamera}
                className="absolute bottom-4 px-5 py-2 bg-white text-slate-900 rounded-full font-bold shadow-lg text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Scan className="w-3.5 h-3.5" />
                Şəkli Skan Et
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleStartCamera}
                className="flex flex-col items-center justify-center p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xs">
                  <Camera className="w-5 h-5" />
                </div>
                <span className="mt-2.5 text-xs font-bold text-slate-900">Kameranı Aç</span>
                <span className="text-[11px] text-slate-400">Canlı skan et</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xs">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="mt-2.5 text-xs font-bold text-slate-900">Şəkil Seç</span>
                <span className="text-[11px] text-slate-400">PNG, JPG və ya HEIC</span>
              </button>
            </div>
          )}

          {/* Quick Examples */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Sürətli Sınaq Üçün Nümunə Seçin:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SAMPLE_VISUAL_ITEMS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => startScanning(item)}
                  className={`p-2 rounded-xl border text-left flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    selectedSample?.productId === item.productId
                      ? 'border-slate-900 bg-slate-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="w-14 h-14 relative rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="text-center w-full">
                    <p className="text-[11px] font-bold text-slate-900 truncate">{item.name}</p>
                    <p className="text-[10px] text-slate-400">{item.category}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Result */}
          {selectedSample && (
            <div className="p-4 rounded-2xl bg-slate-950 text-white shadow-xl relative overflow-hidden">
              {isScanning ? (
                <div className="py-6 flex flex-col items-center justify-center space-y-2">
                  <RefreshCw className="w-6 h-6 text-slate-400 animate-spin" />
                  <p className="text-xs text-slate-300">Şəkil təhlil edilir və qiymətlər yoxlanılır...</p>
                </div>
              ) : matchedProduct ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Eyniləşdirildi ({selectedSample.confidence})
                    </span>
                  </div>

                  <div className="flex gap-3 items-center">
                    <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                      <Image
                        src={matchedProduct.baseImages[0] || selectedSample.image}
                        alt={matchedProduct.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">{matchedProduct.title}</h4>
                      <div className="mt-1 flex items-center gap-2 text-xs">
                        {matchedProduct.minStorePrice && (
                          <span className="text-blue-300">
                            Mağazada: <strong>{formatPrice(matchedProduct.minStorePrice)}</strong>
                          </span>
                        )}
                        {matchedProduct.minIndividualPrice && (
                          <span className="text-amber-300">
                            2-ci əl: <strong>{formatPrice(matchedProduct.minIndividualPrice)}</strong>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-end">
                    <Link
                      href={`/product/${matchedProduct.id}`}
                      onClick={closeVisualSearch}
                      className="inline-flex items-center gap-1 px-4 py-1.5 bg-white text-slate-950 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors"
                    >
                      <span>Məhsula Get</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
