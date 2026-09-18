import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, Lock, Store, User } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 pb-20 md:pb-0">
      {/* Value Pillars */}
      <div className="border-b border-slate-900 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-blue-400 flex items-center justify-center shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs">Rəsmi Tərəfdaş Mağazalar</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                100% Orijinal, adınıza rəsmi elektron qaiməli və 24 ay servis zəmanətli sıfır mallar.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 flex items-center justify-center shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs">Təsdiqlənmiş Fərdi Satıcılar</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                Şəxsiyyət və nömrə təsdiqli istifadəçilərdən münasib qiymətli, təmiz ikinci əl elanları.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs">Əmanət Hesabı Qoruması</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                Siz məhsulu qəbul edib təsdiq edənə qədər ödənişiniz təhlükəsiz havuzda saxlanılır.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs">Sürətli Çatdırılma & Əldən Təhvil</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                İstər kuryerlə birbaşa qapınıza, istərsə də şəhərdə satıcı ilə görüşərək təhvil alın.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white text-slate-950 flex items-center justify-center font-black text-base">
              N
            </div>
            <span className="text-lg font-black tracking-tight text-white">NEXVO</span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-slate-300">
              HYBRID
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            Yeni nəsil hibrid ticarət platforması. Rəsmi mağazaların zəmanətli məhsulları ilə fərdi istifadəçilərin ikinci əl elanlarını eyni ekranda müqayisə edin.
          </p>

          <div className="pt-1 flex items-center gap-1.5 text-[11px] text-emerald-400">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Təhlükəsiz Şifrələmə</span>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Kateqoriyalar</h5>
          <ul className="space-y-2 text-xs">
            <li><Link href="/category/elektronika" className="hover:text-white transition-colors">Smartfonlar & Saatlar</Link></li>
            <li><Link href="/category/komputer" className="hover:text-white transition-colors">Noutbuklar & PC</Link></li>
            <li><Link href="/category/oyun" className="hover:text-white transition-colors">Oyun Konsolları & PS5</Link></li>
            <li><Link href="/category/audio-foto" className="hover:text-white transition-colors">Qulaqlıqlar & Kameralar</Link></li>
            <li><Link href="/category/meiset-ev" className="hover:text-white transition-colors">Məişət Texnikası</Link></li>
          </ul>
        </div>

        {/* For Sellers */}
        <div>
          <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Satış Et</h5>
          <ul className="space-y-2 text-xs">
            <li><Link href="/profile?action=post-ad" className="hover:text-white transition-colors">Pulsuz Elan Yerləşdir</Link></li>
            <li><Link href="/store/techzone" className="hover:text-white transition-colors">Rəsmi Mağaza Müraciəti</Link></li>
            <li><Link href="/profile" className="hover:text-white transition-colors">Komissiyasız Satış Qaydaları</Link></li>
            <li><Link href="/profile" className="hover:text-white transition-colors">Təhlükəsiz Əldən Təhvil</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Dəstək & Hüquqi</h5>
          <ul className="space-y-2 text-xs">
            <li><Link href="/profile" className="hover:text-white transition-colors">Haqqımızda</Link></li>
            <li><Link href="/profile" className="hover:text-white transition-colors">Alıcı Qoruma Qaydaları</Link></li>
            <li><Link href="/profile" className="hover:text-white transition-colors">İstifadəçi Razılaşması</Link></li>
            <li><Link href="/profile" className="hover:text-white transition-colors">Əlaqə & Dəstək</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
          <p>© 2026 NEXVO Ticarət Platforması. Bütün hüquqlar qorunur.</p>
          <p className="text-slate-500">Bakı, Azərbaycan • Rəsmi Mağazalar & İkinci Əl Ekosistemi</p>
        </div>
      </div>
    </footer>
  );
}
