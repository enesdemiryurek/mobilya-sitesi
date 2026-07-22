"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);

  // Set up scroll hooks for the parallax effect on the background image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax calculations
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <div className="w-full bg-[#fafafa]">
      
      {/* Full Bleed Image Container */}
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-end items-center pb-24"
      >
        <motion.div
          style={{ y: yBg, scale: scaleBg }}
          className="absolute inset-0 w-full h-full z-0"
        >
          {/* Desktop Background */}
          <div
            className="hidden sm:block absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/byman-hero.jpg')`,
            }}
          />
          {/* Mobile Background */}
          <div
            className="block sm:hidden absolute inset-0 bg-cover bg-top"
            style={{
              backgroundImage: `url('/byman-hero-mobile.jpg')`,
            }}
          />
        </motion.div>

        {/* Action Buttons Overlaid on Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 px-6 w-full max-w-2xl justify-center"
        >
          <Link
            href="/iletisim"
            className="px-10 py-4 text-xs font-bold text-sans-clean uppercase tracking-widest bg-anthracite text-white hover:bg-[#d4a31a] transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.15)] flex-1 text-center rounded-full"
          >
            İletişime Geç
          </Link>
          <Link
            href="/katalog"
            className="px-10 py-4 text-xs font-bold text-sans-clean uppercase tracking-widest bg-white/95 backdrop-blur-md text-anthracite hover:bg-white transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.1)] flex-1 text-center rounded-full"
          >
            E-Kataloğu İncele
          </Link>
        </motion.div>

        {/* Down Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer text-anthracite/60 hover:text-anthracite transition-colors duration-300 z-10"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }}
        >
          <span className="text-[9px] font-bold text-sans-clean uppercase tracking-[0.2em] mb-2">Aşağı Kaydır</span>
          <ArrowDown size={14} />
        </motion.div>
      </div>
    </div>
  );
}
