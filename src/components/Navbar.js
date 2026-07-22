"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getImgUrl } from "@/utils/image";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { 
    href: "/koleksiyon", 
    label: "Koleksiyon",
    dropdown: [
      { href: "/koleksiyon", label: "Tüm Ürünler", image: "/byman-hero.jpg" },
      { href: "/koleksiyon?main=ofis-mobilyalari", label: "Ofis Mobilyaları", image: "/kategori-1.jpg" },
      { href: "/koleksiyon?main=ofis-masa-takimlari", label: "Ofis Masa Takımları", image: "/kategori-3.jpg" },
      { href: "/koleksiyon?main=ofis-koltuklari", label: "Ofis Koltukları", image: "/kategori-5.jpg" },
      { href: "/koleksiyon?main=yonetici-mobilyalari", label: "Yönetici Mobilyaları", image: "/konsept-yonetici.jpg" },
      { href: "/koleksiyon?main=oturma-gruplari", label: "Oturma Grupları", image: "/kategori-2.jpg" },
      { href: "/koleksiyon?main=depolama-alanlari", label: "Depolama Alanları", image: "/kategori-6.jpg" }
    ]
  },
  { href: "/konsept", label: "Konsept & İlham" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    const savedTheme = localStorage.getItem("byman-theme") || "default";
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "default" ? "forest" : "default";
    setTheme(newTheme);
    localStorage.setItem("byman-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Background color transition threshold
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide / Show Navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down, hide
      } else {
        setIsVisible(true); // Scrolling up, show
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on page change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-cream/85 backdrop-blur-lg py-4 shadow-sm border-b border-wood/20"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-2">
            <span className="text-2xl md:text-3xl text-serif-elegant font-semibold tracking-[0.2em] text-black group-hover:text-wood transition-colors duration-300">
              BYMAN
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
              return (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className="relative py-6 text-[15px] text-sans-clean uppercase tracking-wider text-black font-semibold hover:text-wood transition-colors duration-300"
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-4 left-0 right-0 h-[1px] bg-wood"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>

                  {/* Mega Menu Dropdown for Desktop */}
                  {link.dropdown && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="bg-white border border-earth/20 shadow-2xl p-8 w-[750px] lg:w-[950px]">
                        <div className="grid grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                          {link.dropdown.map((subLink) => (
                            <Link
                              key={subLink.href}
                              href={subLink.href}
                              className="group/item flex flex-col space-y-4"
                            >
                              <div className="w-full aspect-[4/3] overflow-hidden bg-cream relative border border-transparent group-hover/item:border-wood/30 transition-colors duration-300">
                                {subLink.image && (
                                  <img 
                                    src={getImgUrl(subLink.image)} 
                                    alt={subLink.label} 
                                    className="absolute inset-0 w-full h-full object-cover transform group-hover/item:scale-105 transition-transform duration-700"
                                  />
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300"></div>
                              </div>
                              <span className="text-[11px] text-anthracite font-bold uppercase tracking-wider group-hover/item:text-wood transition-colors text-center">
                                {subLink.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Button & Theme Selector (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 border border-black text-black font-semibold hover:border-wood hover:bg-wood hover:text-cream transition-all duration-500 rounded-none"
              title="Temayı Değiştir (Adaçayı / Klasik)"
            >
              <Palette size={16} />
            </button>
            <Link
              href="/iletisim"
              className="inline-flex items-center space-x-2 px-6 py-2.5 text-sm text-sans-clean uppercase tracking-wider border border-black text-black font-semibold hover:border-wood hover:bg-wood hover:text-cream transition-all duration-500 rounded-none"
            >
              <span>Bilgi Alın</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-black hover:text-wood transition-colors duration-300 focus:outline-none"
            aria-label="Menüyü Aç/Kapat"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-cream pt-24 px-6 flex flex-col justify-between pb-12 md:hidden"
          >
            <div className="flex flex-col space-y-6 mt-8">
              {navLinks.map((link, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={link.href}
                >
                  <Link
                    href={link.href}
                    className="text-2xl text-serif-elegant tracking-wide text-anthracite hover:text-wood block py-2 border-b border-earth/10"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between pb-2 border-b border-earth/10">
                <span className="text-xs text-sans-clean uppercase tracking-wider text-earth">Görünüm Teması</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-2 px-4 py-2 border border-earth/20 text-anthracite hover:bg-anthracite hover:text-cream text-xs uppercase tracking-wider transition-all duration-300"
                >
                  <Palette size={14} />
                  <span>{theme === "default" ? "Adaçayı Yeşili" : "Klasik Krem"}</span>
                </button>
              </div>
              <Link
                href="/iletisim"
                className="w-full text-center inline-flex items-center justify-center space-x-2 px-6 py-4 text-sm text-sans-clean uppercase tracking-wider bg-anthracite text-cream hover:bg-wood transition-colors duration-500"
              >
                <span>Bilgi Alın</span>
                <ArrowRight size={14} />
              </Link>
              <div className="text-center text-xs text-earth tracking-widest uppercase">
                Byman Studio © 2026
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
