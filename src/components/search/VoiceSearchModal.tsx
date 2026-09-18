'use client';

import React, { useState, useEffect } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Mic, X, Volume2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function VoiceSearchModal() {
  const { isVoiceSearchOpen, closeVoiceSearch } = useMarketplace();
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (isVoiceSearchOpen) {
      setIsListening(true);
      setTranscript('');

      const timer = setTimeout(() => {
        setTranscript('iPhone 17');
        setIsListening(false);
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [isVoiceSearchOpen]);

  if (!isVoiceSearchOpen) return null;

  const handleSearch = (term: string) => {
    closeVoiceSearch();
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-200 relative">
        <button
          onClick={closeVoiceSearch}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="my-3 flex flex-col items-center">
          <div className="relative">
            {isListening && (
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-25" />
            )}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md transition-colors ${
              isListening ? 'bg-slate-900 text-white' : 'bg-emerald-600 text-white'
            }`}>
              <Mic className="w-7 h-7" />
            </div>
          </div>

          <h3 className="mt-4 text-base font-bold text-slate-900">
            {isListening ? 'Dinləyirəm...' : `"${transcript}"`}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {isListening ? 'Axtardığınız məhsul və ya markanı deyin.' : 'Nəticəyə getmək üçün klikləyin.'}
          </p>

          {!isListening && transcript && (
            <button
              onClick={() => handleSearch(transcript)}
              className="mt-5 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 text-xs transition-all cursor-pointer shadow-sm"
            >
              <span>Nəticələri Göstər ({transcript})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="mt-5 pt-3 border-t border-slate-100 w-full">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Hazır nümunələr:
            </span>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {['iPhone 17', 'PlayStation 5 Slim', 'Sony Qulaqlıq', 'Dyson Tozsoran'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleSearch(item)}
                  className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-medium transition-colors cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
