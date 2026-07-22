"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getImgUrl } from "@/utils/image";

const lookbookItems = [
  {
    id: 1,
    title: "Liderlik Duruşu",
    subtitle: "Yönetici Ofisleri",
    desc: "Gücü ve vizyonu yansıtan premium yönetici takımları. Doğal ahşap kaplamalar, ergonomik ve prestijli oturma grupları ile kararlarınızı alırken size ilham verecek, ağırlığı olan makam odaları.",
    image: "/konsept-yonetici.jpg",
    direction: "left", // Image slides from left, text from right
  },
  {
    id: 2,
    title: "Sinerji & İnovasyon",
    subtitle: "Toplantı Odaları",
    desc: "Fikirlerin buluşma noktası. Geniş, fonksiyonel toplantı masaları ve ergonomik sandalyelerle, uzun süren görüşmelerde bile konforu ve odaklanmayı üst düzeye çıkaran modern toplantı alanları.",
    image: "/konsept-toplanti.jpg",
    direction: "right", // Image slides from right, text from left
  },
  {
    id: 3,
    title: "Odaklanma & Üretkenlik",
    subtitle: "Açık Ofis Sistemleri",
    desc: "Açık ofislerde bireysel konsantrasyonu destekleyen akıllı çözümler. Çalışma alanlarını optimize eden akustik detaylar, çoklu çalışma istasyonları ve hareket özgürlüğü sunan ofis koltukları.",
    image: "/konsept-acik-ofis.jpg",
    direction: "left",
  }
];

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

export default function KonseptPage() {
  return (
    <div className="bg-cream min-h-screen pt-28">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 mb-20 text-center">
        <span className="text-xs uppercase text-sans-clean tracking-[0.3em] text-earth block mb-4">
          Vizyon & İlham
        </span>
        <h1 className="text-4xl md:text-6xl text-serif-elegant font-light text-anthracite leading-tight mb-4">
          Konsept Lookbook
        </h1>
        <p className="text-sm text-earth max-w-lg mx-auto font-light leading-relaxed">
          Ofislerinize ilham verecek, detayların asaletini ve kurumsal vizyonunuzu ön plana çıkaran premium tasarım hikayelerimiz.
        </p>
        <div className="luxury-line w-24 mx-auto mt-8"></div>
      </div>

      {/* Editorial Content List */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-32 md:space-y-48 pb-32">
        {lookbookItems.map((item) => {
          const isLeft = item.direction === "left";
          return (
            <div 
              key={item.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center overflow-hidden"
            >
              {/* Image Column */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={isLeft ? slideInLeft : slideInRight}
                className={`lg:col-span-7 ${!isLeft ? "lg:order-2" : ""}`}
              >
                <div className="overflow-hidden bg-beige/30 p-4 border border-earth/10">
                  <img
                    src={getImgUrl(item.image)}
                    alt={item.title}
                    className="w-full h-auto object-cover aspect-[4/3] transform hover:scale-102 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* Text Column */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={isLeft ? slideInRight : slideInLeft}
                className={`lg:col-span-5 ${!isLeft ? "lg:order-1" : ""} space-y-6`}
              >
                <span className="text-[10px] text-sans-clean tracking-[0.25em] text-wood uppercase font-semibold block">
                  {item.subtitle}
                </span>
                <h2 className="text-3xl md:text-4xl text-serif-elegant font-light text-anthracite">
                  {item.title}
                </h2>
                <p className="text-base text-earth leading-relaxed font-medium font-sans">
                  {item.desc}
                </p>
                <div className="pt-2">
                  <Link
                    href="/koleksiyon"
                    className="inline-flex items-center space-x-2 text-xs text-sans-clean uppercase tracking-widest text-anthracite hover:text-wood border-b border-anthracite hover:border-wood pb-1 transition-all duration-300 group"
                  >
                    <span>Koleksiyonda Keşfet</span>
                    <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Immersive Parallax Quote Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('/byman-hero.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative z-20 text-center text-cream px-6 max-w-3xl space-y-6"
        >
          <h3 className="text-2xl md:text-4xl text-serif-elegant font-light tracking-wide leading-relaxed">
            &ldquo;Mükemmellik detaylarda saklıdır. Her bir çizgi, çalışma alanınızda kurumsal bir lüks ve verimlilik yaratmak için özenle tasarlanmıştır.&rdquo;
          </h3>
          <div className="luxury-line w-20 mx-auto my-4 bg-cream/60"></div>
          <p className="text-[10px] text-sans-clean tracking-[0.3em] uppercase text-wood font-semibold">
            BYMAN DESIGN STUDIO
          </p>
        </motion.div>
      </section>
    </div>
  );
}
