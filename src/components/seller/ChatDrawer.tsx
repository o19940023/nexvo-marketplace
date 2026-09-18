'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { X, Send, ShieldCheck, CheckCheck } from 'lucide-react';
import Image from 'next/image';

const QUICK_REPLIES = [
  'Salam, məhsul hələ də satışdadır?',
  'Bu gün əldən təhvil ala bilərəm?',
  'Qiymətdə cüzi endirim olar?',
  'Qutusu və sənədləri var?',
];

export default function ChatDrawer() {
  const { chatModal, closeChatModal, chatMessages, sendChatMessage, formatPrice } = useMarketplace();
  const { isOpen, sellerId, sellerName, sellerAvatar, sellerType, productTitle, productPrice, productImage } = chatModal;

  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentMessages = sellerId ? chatMessages[sellerId] || [] : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  if (!isOpen || !sellerId) return null;

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    sendChatMessage(sellerId, text);
    setInputMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl border-l border-slate-200 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full relative overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
              {sellerAvatar ? (
                <Image src={sellerAvatar} alt={sellerName || 'Satıcı'} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white font-bold">
                  {sellerName?.charAt(0) || 'S'}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">{sellerName || 'Satıcı'}</h4>
                {sellerType === 'store' ? (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 font-bold">Rəsmi Mağaza</span>
                ) : (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 font-bold">Fərdi Satıcı</span>
                )}
              </div>
              <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>Onlayn • Adətən 10 dəqiqəyə cavab verir</span>
              </p>
            </div>
          </div>
          <button
            onClick={closeChatModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product Reference Strip */}
        {productTitle && (
          <div className="px-4 py-2 bg-slate-100/60 border-b border-slate-200 flex items-center gap-3">
            {productImage && (
              <div className="w-9 h-9 relative rounded-lg bg-white overflow-hidden shrink-0 border border-slate-200">
                <Image src={productImage} alt={productTitle} fill className="object-cover" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">{productTitle}</p>
              {productPrice && (
                <p className="text-xs font-extrabold text-slate-700">{formatPrice(productPrice)}</p>
              )}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40">
          <div className="text-center my-1">
            <span className="text-[10px] text-slate-400 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full">
              NEXVO təhlükəsiz yazışma kanalı
            </span>
          </div>

          {currentMessages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.isMe
                    ? 'bg-slate-900 text-white rounded-tr-xs shadow-2xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-2xs'
                }`}
              >
                {msg.offerAmount && (
                  <div className="mb-2 p-1.5 rounded-lg bg-amber-500 text-white font-bold text-xs flex items-center justify-between">
                    <span>Təklif Məbləği:</span>
                    <span>{formatPrice(msg.offerAmount)}</span>
                  </div>
                )}
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 px-1">
                <span>{msg.timestamp}</span>
                {msg.isMe && <CheckCheck className="w-3.5 h-3.5 text-blue-600" />}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies */}
        <div className="p-2 border-t border-slate-100 bg-white overflow-x-auto scrollbar-none flex gap-1.5">
          {QUICK_REPLIES.map((quickText, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(quickText)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer"
            >
              {quickText}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-slate-200 bg-white">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend(inputMessage);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="Mesajınızı daxil edin..."
              className="flex-1 h-9 px-3 rounded-xl border border-slate-200 focus:border-slate-900 text-xs outline-none text-slate-900"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <p className="text-[10px] text-slate-400 text-center mt-1.5 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Kart və şəxsi məlumatlarınızı təhlükəsizlik üçün çatda paylaşmayın.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
