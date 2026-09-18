'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Search, Camera, Mic, X, ArrowRight, TrendingUp, ArrowUpRight } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/data/mockData';
import Image from 'next/image';
import Link from 'next/link';

interface SearchBarProps {
  initialQuery?: string;
  isHero?: boolean;
  onSearchSubmit?: (query: string) => void;
}

const POPULAR_SEARCHES = [
  'iPhone 17 Pro',
  'MacBook Air M4',
  'PlayStation 5 Slim',
  'Sony WH-1000XM6',
  'Dyson V15',
  'Samsung S26 Ultra',
];

export default function SearchBar({ initialQuery = '', isHero = false, onSearchSubmit }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const { openVisualSearch, openVoiceSearch, formatPrice, marketMode } = useMarketplace();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    setIsOpen(false);
    if (onSearchSubmit) {
      onSearchSubmit(trimmed);
    } else {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const normalizedQuery = query.toLowerCase().trim();
  const matchedProducts = normalizedQuery
    ? PRODUCTS.filter(
        p =>
          p.title.toLowerCase().includes(normalizedQuery) ||
          p.brand.toLowerCase().includes(normalizedQuery) ||
          p.tags.some(t => t.toLowerCase().includes(normalizedQuery))
      ).slice(0, 4)
    : [];

  const matchedCategories = normalizedQuery
    ? CATEGORIES.filter(c => c.name.toLowerCase().includes(normalizedQuery)).slice(0, 3)
    : [];

  return (
    <div ref={containerRef} className={`relative w-full ${isHero ? 'max-w-2xl' : 'max-w-md'}`}>
      <div
        className={`relative flex items-center w-full transition-all duration-200 ${
          isHero
            ? 'h-12 md:h-13 rounded-xl bg-white border border-slate-200/90 shadow-sm focus-within:border-slate-900 focus-within:ring-2 focus-within:ring-slate-950/5'
            : 'h-9 md:h-10 rounded-lg bg-slate-100/90 border border-slate-200/70 focus-within:bg-white focus-within:border-slate-900 focus-within:ring-2 focus-within:ring-slate-950/5'
        }`}
      >
        <div className="pl-3.5 pr-2 text-slate-400">
          <Search className="w-4 h-4 text-slate-500" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={
            marketMode === 'store'
              ? 'Rəsmi mağaza məhsulu axtarın (iPhone, MacBook, Dyson)...'
              : 'İkinci əl elan axtarın (təmiz, qutulu, sərfəli)...'
          }
          className="w-full h-full bg-transparent text-slate-950 text-xs md:text-sm outline-none placeholder:text-slate-400 font-medium"
        />

        {query && (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-full mr-1 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        <div className="flex items-center gap-1 pr-1.5">
          <button
            type="button"
            onClick={openVisualSearch}
            title="Şəkillə Axtarış"
            className="p-1.5 text-slate-500 hover:text-slate-950 hover:bg-slate-100 rounded-md transition-all flex items-center gap-1 cursor-pointer"
          >
            <Camera className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={openVoiceSearch}
            title="Səslə Axtarış"
            className="p-1.5 text-slate-500 hover:text-slate-950 hover:bg-slate-100 rounded-md transition-all cursor-pointer"
          >
            <Mic className="w-4 h-4" />
          </button>

          {isHero && (
            <button
              onClick={() => handleSearch(query || 'iPhone 17')}
              className="ml-1 px-3.5 py-1.5 btn-primary text-xs font-semibold rounded-lg hidden sm:flex items-center gap-1 cursor-pointer"
            >
              <span>Axtar</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200/80 overflow-hidden z-50 animate-fade-up">
          {query.trim().length > 0 ? (
            <div className="p-2.5 space-y-3 max-h-[70vh] overflow-y-auto">
              {matchedProducts.length > 0 && (
                <div>
                  <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Uyğun Məhsullar
                  </div>
                  <div className="mt-1 space-y-1">
                    {matchedProducts.map(product => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer"
                      >
                        <div className="w-9 h-9 relative rounded-md bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                          <Image src={product.baseImages[0]} alt={product.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-slate-950 group-hover:text-blue-600 transition-colors truncate">
                            {product.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5 text-[10px]">
                            {product.minStorePrice && (
                              <span className="text-slate-600 font-medium">
                                Mağazada: <strong className="text-slate-900">{formatPrice(product.minStorePrice)}</strong>
                              </span>
                            )}
                            {product.minIndividualPrice && (
                              <span className="text-amber-700 font-medium">
                                İkinci əl: <strong>{formatPrice(product.minIndividualPrice)}</strong>
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {matchedCategories.length > 0 && (
                <div>
                  <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Bölmələr
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1.5 px-2">
                    {matchedCategories.map(cat => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-xs font-medium text-slate-700 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleSearch(query)}
                  className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-50 text-slate-900 hover:bg-slate-100 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <span>&quot;{query}&quot; üçün bütün nəticələri göstər</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3.5 space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
                  <span>Populyar Axtarışlar</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SEARCHES.map(term => (
                    <button
                      key={term}
                      onClick={() => handleSearch(term)}
                      className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
