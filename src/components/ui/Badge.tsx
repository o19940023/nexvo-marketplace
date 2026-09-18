import React from 'react';
import { SellerType, Condition, DeliveryType } from '@/types/marketplace';
import { Store, User, ShieldCheck, Truck, Handshake, Sparkles, CheckCircle2 } from 'lucide-react';

interface SellerTypeBadgeProps {
  type: SellerType;
  size?: 'sm' | 'md' | 'lg';
  isVerified?: boolean;
}

export function SellerTypeBadge({ type, size = 'md', isVerified = true }: SellerTypeBadgeProps) {
  if (type === 'store') {
    const sizeClasses = {
      sm: 'px-2 py-0.5 text-[10px] gap-1',
      md: 'px-2.5 py-0.5 text-[11px] gap-1.5',
      lg: 'px-3 py-1 text-xs gap-1.5',
    };

    return (
      <span
        className={`inline-flex items-center font-semibold tracking-tight rounded-md bg-slate-900 text-white shadow-xs ${sizeClasses[size]}`}
      >
        <Store className={size === 'sm' ? 'w-3 h-3 text-blue-300' : 'w-3.5 h-3.5 text-blue-300'} />
        <span>Rəsmi Mağaza</span>
        {isVerified && <ShieldCheck className="w-3 h-3 text-blue-400 shrink-0" />}
      </span>
    );
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-0.5 text-[11px] gap-1.5',
    lg: 'px-3 py-1 text-xs gap-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-semibold tracking-tight rounded-md bg-white text-slate-800 border border-slate-200/90 shadow-2xs ${sizeClasses[size]}`}
    >
      <User className={size === 'sm' ? 'w-3 h-3 text-slate-500' : 'w-3.5 h-3.5 text-slate-500'} />
      <span>Fərdi Satıcı</span>
      {isVerified && <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />}
    </span>
  );
}

interface ConditionBadgeProps {
  condition: Condition;
  size?: 'sm' | 'md';
}

export function ConditionBadge({ condition, size = 'sm' }: ConditionBadgeProps) {
  const configs: Record<Condition, { label: string; bg: string; text: string; border: string; icon?: React.ReactNode }> = {
    new: {
      label: 'Sıfır Bağlı Qutu',
      bg: 'bg-emerald-50',
      text: 'text-emerald-800 font-semibold',
      border: 'border-emerald-200',
      icon: <Sparkles className="w-3 h-3 text-emerald-600" />,
    },
    like_new: {
      label: 'Sıfırdan Fərqsiz',
      bg: 'bg-slate-50',
      text: 'text-slate-800 font-medium',
      border: 'border-slate-200',
    },
    very_good: {
      label: 'Çox Yaxşı Vəziyyətdə',
      bg: 'bg-slate-50',
      text: 'text-slate-700 font-medium',
      border: 'border-slate-200',
    },
    good: {
      label: 'Yaxşı Vəziyyətdə',
      bg: 'bg-slate-50',
      text: 'text-slate-600 font-normal',
      border: 'border-slate-200',
    },
    acceptable: {
      label: 'İşlək Vəziyyətdə',
      bg: 'bg-stone-50',
      text: 'text-stone-600 font-normal',
      border: 'border-stone-200',
    },
  };

  const config = configs[condition] || configs.very_good;
  const padding = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1 rounded-md border ${config.bg} ${config.text} ${config.border} ${padding}`}>
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
}

interface DeliveryBadgeProps {
  type: DeliveryType;
  fee?: number;
  distanceKm?: number;
}

export function DeliveryBadge({ type, fee = 0, distanceKm }: DeliveryBadgeProps) {
  if (type === 'cargo') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-slate-600">
        <Truck className="w-3.5 h-3.5 text-blue-600" />
        <span>{fee === 0 ? 'Pulsuz Çatdırılma' : `${fee} ₼ Kuryer`}</span>
      </span>
    );
  }

  if (type === 'pickup') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-slate-600">
        <Handshake className="w-3.5 h-3.5 text-amber-600" />
        <span>Əldən Təhvil {distanceKm ? `(${distanceKm} km)` : ''}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-slate-600">
      <Truck className="w-3.5 h-3.5 text-blue-600" />
      <span>Çatdırılma & Təhvil</span>
    </span>
  );
}
