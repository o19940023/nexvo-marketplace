import type { Metadata } from "next";
import "./globals.css";
import { MarketplaceProvider } from "@/context/MarketplaceContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNavigation from "@/components/layout/BottomNavigation";
import ToastContainer from "@/components/ui/ToastContainer";
import VisualSearchModal from "@/components/search/VisualSearchModal";
import VoiceSearchModal from "@/components/search/VoiceSearchModal";
import OfferModal from "@/components/seller/OfferModal";
import ChatDrawer from "@/components/seller/ChatDrawer";

export const metadata: Metadata = {
  title: "NEXVO • Hibrid Ticarət Platforması (Rəsmi Mağazalar & İkinci Əl)",
  description: "Axtardığınız hər şey bir məkanda. Rəsmi mağazalardan sıfır zəmanətli məhsullar, fərdi istifadəçilərdən sərfəli ikinci əl elanlar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
        <MarketplaceProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <BottomNavigation />

          {/* Modals & Drawers */}
          <ToastContainer />
          <VisualSearchModal />
          <VoiceSearchModal />
          <OfferModal />
          <ChatDrawer />
        </MarketplaceProvider>
      </body>
    </html>
  );
}
