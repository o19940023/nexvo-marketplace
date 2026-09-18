export type MarketMode = 'store' | 'c2c'; // 'store' = Rəsmi Mağazalar, 'c2c' = İkinci Əl & Fərdlər

export type SellerType = 'store' | 'individual';

export type Condition = 'new' | 'like_new' | 'very_good' | 'good' | 'acceptable';

export type DeliveryType = 'cargo' | 'pickup' | 'both';

export interface Specification {
  label: string;
  value: string;
}

export interface SellerReview {
  id: string;
  authorName: string;
  rating: number;
  date: string;
  comment: string;
  productTitle?: string;
  verifiedPurchase: boolean;
}

export interface ProductOffer {
  id: string;
  productId: string;
  sellerId: string;
  sellerName: string;
  sellerType: SellerType;
  sellerAvatar: string;
  sellerRating: number;
  sellerSalesCount: number;
  sellerVerified: boolean;
  sellerCity: string;
  sellerDistrict: string;
  distanceKm?: number;
  price: number;
  originalPrice?: number;
  condition: Condition;
  conditionDescription?: string;
  warranty: string;
  deliveryType: DeliveryType;
  deliveryFee: number; // 0 for pulsuz
  deliveryEstDays?: string;
  stock: number;
  images: string[];
  createdAt: string;
  isFeatured?: boolean;
  badges?: string[];
  batteryHealth?: number;
  includedAccessories?: string[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  brand: string;
  model: string;
  category: string;
  subcategory: string;
  shortDescription: string;
  description: string;
  baseImages: string[];
  rating: number;
  reviewCount: number;
  specifications: Specification[];
  tags: string[];
  minStorePrice?: number;
  maxStorePrice?: number;
  storeOfferCount: number;
  minIndividualPrice?: number;
  maxIndividualPrice?: number;
  individualOfferCount: number;
  offers: ProductOffer[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  itemCount: number;
  heroImage: string;
  subcategories: {
    name: string;
    slug: string;
    count: number;
  }[];
  popularBrands: string[];
}

export interface StoreProfile {
  id: string;
  name: string;
  slug: string;
  logo: string;
  bannerImage: string;
  rating: number;
  reviewCount: number;
  salesCount: number;
  isVerified: boolean;
  city: string;
  address: string;
  phone: string;
  workingHours: string;
  description: string;
  memberSince: string;
  badges: string[];
  returnPolicy: string;
  warrantyInfo: string;
  shippingInfo: string;
  offers: ProductOffer[];
  reviews: SellerReview[];
}

export interface IndividualSellerProfile {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  completedSales: number;
  isVerifiedPhone: boolean;
  isVerifiedIdentity: boolean;
  city: string;
  district: string;
  memberSince: string;
  responseRate: string;
  bio: string;
  badges: string[];
  offers: ProductOffer[];
  reviews: SellerReview[];
}

export interface CartItem {
  offer: ProductOffer;
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  offerAmount?: number;
  offerStatus?: 'pending' | 'accepted' | 'declined';
}
