'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductOffer, CartItem, ChatMessage, MarketMode } from '@/types/marketplace';
import { PRODUCTS, getProductById } from '@/data/mockData';

export type CurrencyType = 'AZN' | 'USD' | 'TRY';

interface ToastInfo {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface OfferModalData {
  isOpen: boolean;
  product?: Product;
  offer?: ProductOffer;
}

interface ChatModalData {
  isOpen: boolean;
  sellerId?: string;
  sellerName?: string;
  sellerAvatar?: string;
  sellerType?: 'store' | 'individual';
  productTitle?: string;
  productPrice?: number;
  productImage?: string;
}

interface MarketplaceContextType {
  marketMode: MarketMode;
  setMarketMode: (mode: MarketMode) => void;

  cart: CartItem[];
  addToCart: (offer: ProductOffer, product: Product) => void;
  removeFromCart: (offerId: string) => void;
  updateCartQuantity: (offerId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;

  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  currency: CurrencyType;
  setCurrency: (c: CurrencyType) => void;
  formatPrice: (amount: number) => string;

  userCity: string;
  setUserCity: (city: string) => void;

  toasts: ToastInfo[];
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  offerModal: OfferModalData;
  openOfferModal: (product: Product, offer: ProductOffer) => void;
  closeOfferModal: () => void;

  chatModal: ChatModalData;
  openChatModal: (data: Omit<ChatModalData, 'isOpen'>) => void;
  closeChatModal: () => void;

  isVisualSearchOpen: boolean;
  openVisualSearch: () => void;
  closeVisualSearch: () => void;

  isVoiceSearchOpen: boolean;
  openVoiceSearch: () => void;
  closeVoiceSearch: () => void;

  chatMessages: Record<string, ChatMessage[]>;
  sendChatMessage: (sellerId: string, text: string, offerAmount?: number) => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const [marketMode, setMarketModeState] = useState<MarketMode>('store');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>(['iphone-17', 'sony-wh-1000xm6']);
  const [currency, setCurrency] = useState<CurrencyType>('AZN');
  const [userCity, setUserCity] = useState<string>('Bakı');
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const [offerModal, setOfferModal] = useState<OfferModalData>({ isOpen: false });
  const [chatModal, setChatModal] = useState<ChatModalData>({ isOpen: false });
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);

  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({
    'ali-m': [
      {
        id: 'msg-1',
        senderId: 'ali-m',
        senderName: 'Ali Məmmədov',
        text: 'Salam! iPhone 17 haqqında sualınız varsa buyurun. Cihaz ideal vəziyyətdədir.',
        timestamp: '10:14',
        isMe: false,
      },
    ],
  });

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedMode = localStorage.getItem('nexvo_mode') as MarketMode;
      if (savedMode) setMarketModeState(savedMode);

      const savedFavs = localStorage.getItem('nexvo_favs');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedCart = localStorage.getItem('nexvo_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedCity = localStorage.getItem('nexvo_city');
      if (savedCity) setUserCity(savedCity);
    } catch {}
  }, []);

  const setMarketMode = (mode: MarketMode) => {
    setMarketModeState(mode);
    try {
      localStorage.setItem('nexvo_mode', mode);
    } catch {}
    showToast(
      mode === 'store' ? 'Mağazalar Panelinə Keçildi' : 'İkinci Əl Bazarına Keçildi',
      mode === 'store'
        ? 'Rəsmi mağazaların sıfır və zəmanətli məhsulları göstərilir.'
        : 'Fərdi istifadəçilərin ikinci əl sərfəli elanları göstərilir.',
      'info'
    );
  };

  const showToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (offer: ProductOffer, product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.offer.id === offer.id);
      if (existing) {
        return prev.map(item =>
          item.offer.id === offer.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { offer, product, quantity: 1 }];
    });

    if (offer.sellerType === 'store') {
      showToast('Səbətə Əlavə Edildi', `${product.title} mağaza səbətinizə əlavə olundu.`, 'success');
    } else {
      showToast('İkinci Əl Rezerv Edildi', `${product.title} üçün satıcı ilə rezervasiya başladıldı.`, 'info');
    }
  };

  const removeFromCart = (offerId: string) => {
    setCart(prev => prev.filter(item => item.offer.id !== offerId));
    showToast('Silindi', 'Məhsul səbətdən çıxarıldı.', 'info');
  };

  const updateCartQuantity = (offerId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(offerId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.offer.id === offerId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.offer.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleFavorite = (productId: string) => {
    const product = getProductById(productId);
    const title = product?.title || 'Məhsul';

    setFavorites(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Sevimlilərdən Çıxarıldı', `${title} siyahıdan silindi.`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Sevimlilərə Əlavə Edildi', `${title} saxlanıldı. Qiymət düşəndə bildiriş alacaqsınız.`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const formatPrice = (amount: number) => {
    let rate = 1;
    let symbol = '₼';

    if (currency === 'USD') {
      rate = 0.59;
      symbol = '$';
    } else if (currency === 'TRY') {
      rate = 19.5;
      symbol = '₺';
    }

    const calculated = Math.round(amount * rate);
    const formatted = calculated.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formatted} ${symbol}`;
  };

  const openOfferModal = (product: Product, offer: ProductOffer) => {
    setOfferModal({ isOpen: true, product, offer });
  };

  const closeOfferModal = () => setOfferModal({ isOpen: false });

  const openChatModal = (data: Omit<ChatModalData, 'isOpen'>) => {
    setChatModal({ isOpen: true, ...data });
  };

  const closeChatModal = () => setChatModal({ isOpen: false });

  const openVisualSearch = () => setIsVisualSearchOpen(true);
  const closeVisualSearch = () => setIsVisualSearchOpen(false);

  const openVoiceSearch = () => setIsVoiceSearchOpen(true);
  const closeVoiceSearch = () => setIsVoiceSearchOpen(false);

  const sendChatMessage = (sellerId: string, text: string, offerAmount?: number) => {
    const newMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      senderId: 'me',
      senderName: 'Mən (Alıcı)',
      text,
      timestamp: new Date().toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      offerAmount,
      offerStatus: offerAmount ? 'pending' : undefined,
    };

    setChatMessages(prev => ({
      ...prev,
      [sellerId]: [...(prev[sellerId] || []), newMsg],
    }));

    showToast('Mesaj Göndərildi', 'Satıcıya mesajınız çatdırıldı.', 'success');

    setTimeout(() => {
      let replyText = 'Salam! Bəli, məhsul hələ də satışdadır və tam səliqəlidir. Nə vaxt yaxınlaşıb baxa bilərsiniz?';
      if (offerAmount) {
        replyText = `Təklifinizi gördüm (${formatPrice(offerAmount)}). Real alıcısınızsa yerində cüzi endirim edə bilərəm, görüşək.`;
      }
      const autoReply: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        senderId: sellerId,
        senderName: chatModal.sellerName || 'Satıcı',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
      };
      setChatMessages(prev => ({
        ...prev,
        [sellerId]: [...(prev[sellerId] || []), autoReply],
      }));
    }, 1600);
  };

  return (
    <MarketplaceContext.Provider
      value={{
        marketMode,
        setMarketMode,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        favorites,
        toggleFavorite,
        isFavorite,
        currency,
        setCurrency,
        formatPrice,
        userCity,
        setUserCity,
        toasts,
        showToast,
        removeToast,
        offerModal,
        openOfferModal,
        closeOfferModal,
        chatModal,
        openChatModal,
        closeChatModal,
        isVisualSearchOpen,
        openVisualSearch,
        closeVisualSearch,
        isVoiceSearchOpen,
        openVoiceSearch,
        closeVoiceSearch,
        chatMessages,
        sendChatMessage,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
