"use client";

import Link from "next/link";
import { ArrowUp, Instagram, Facebook, Mail } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-anthracite border-t border-anthracite pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16">
          {/* Logo & Description */}
          <div className="md:col-span-4 space-y-6">
            <span className="text-3xl text-serif-elegant font-light tracking-[0.2em] text-cream block">
              BYMAN
            </span>
            <p className="text-sm text-cream/70 leading-relaxed font-light max-w-sm">
              Ahşabın ve doğal dokuların asaletini minimalist bir tasarım diliyle buluşturarak, yaşam alanlarınıza sessiz bir lüks getiriyoruz.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 border border-cream/20 text-cream hover:border-cream hover:bg-cream hover:text-anthracite transition-all duration-300 rounded-none">
                <Instagram size={16} />
              </a>
              <a href="#" className="p-2 border border-cream/20 text-cream hover:border-cream hover:bg-cream hover:text-anthracite transition-all duration-300 rounded-none">
                <Facebook size={16} />
              </a>
              <a href="mailto:info@bymandesign.com" className="p-2 border border-cream/20 text-cream hover:border-cream hover:bg-cream hover:text-anthracite transition-all duration-300 rounded-none" aria-label="E-posta">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 md:col-start-6 space-y-6">
            <h4 className="text-sm uppercase text-sans-clean tracking-[0.15em] text-cream font-semibold">
              Koleksiyonlar
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/koleksiyon?main=ofis-mobilyalari" className="text-sm text-cream/70 hover:text-cream transition-colors duration-300 font-light">
                  Ofis Mobilyaları
                </Link>
              </li>
              <li>
                <Link href="/koleksiyon?main=ofis-masa-takimlari" className="text-sm text-cream/70 hover:text-cream transition-colors duration-300 font-light">
                  Masa Takımları
                </Link>
              </li>
              <li>
                <Link href="/koleksiyon?main=ofis-koltuklari" className="text-sm text-cream/70 hover:text-cream transition-colors duration-300 font-light">
                  Ofis Koltukları
                </Link>
              </li>
              <li>
                <Link href="/koleksiyon?main=yonetici-mobilyalari" className="text-sm text-cream/70 hover:text-cream transition-colors duration-300 font-light">
                  Yönetici Mobilyaları
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate Links */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-sm uppercase text-sans-clean tracking-[0.15em] text-cream font-semibold">
              Kurumsal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/konsept" className="text-sm text-cream/70 hover:text-cream transition-colors duration-300 font-light">
                  Konsept & İlham
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-sm text-cream/70 hover:text-cream transition-colors duration-300 font-light">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-cream/70 hover:text-cream transition-colors duration-300 font-light">
                  Basında Biz
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-sm text-cream/70 hover:text-cream transition-colors duration-300 font-light">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-sm uppercase text-sans-clean tracking-[0.15em] text-cream font-semibold">
              E-Bülten
            </h4>
            <p className="text-sm text-cream/70 leading-relaxed font-light">
              Yeniliklerden, özel koleksiyonlardan ve iç mimari ipuçlarından haberdar olun.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center border-b border-cream/40 focus-within:border-cream transition-colors duration-300 py-1">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="w-full bg-transparent border-none text-sm text-cream placeholder-cream/50 focus:outline-none focus:ring-0 pr-10 font-light"
              />
              <button type="submit" className="absolute right-0 p-1 text-cream/70 hover:text-cream transition-colors duration-300">
                <Mail size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Luxury line */}
        <div className="h-px bg-gradient-to-r from-transparent via-cream/30 to-transparent w-full my-8"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-cream/70 tracking-wide">
          <p className="font-light mb-4 sm:mb-0">
            &copy; 2026 BYMAN Studio. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-6 mb-4 sm:mb-0">
            <a href="#" className="hover:text-cream transition-colors font-light">Gizlilik Politikası</a>
            <a href="#" className="hover:text-cream transition-colors font-light">Çerez Tercihleri</a>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 border border-cream/20 px-4 py-2 hover:border-cream hover:text-anthracite hover:bg-cream transition-all duration-300 rounded-none group"
          >
            <span>Yukarı Dön</span>
            <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
