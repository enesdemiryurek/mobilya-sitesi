"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Sofa, BedDouble, Utensils, Package, Plus, Calendar } from "lucide-react";
import Hero from "@/components/Hero";
import { getImgUrl } from "@/utils/image";

const newArrivals = [
  {
    id: 1,
    name: "Vega Yönetici Takımı",
    category: "Yönetici Mobilyaları",
    price: "₺35.500",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
    gridClass: "col-span-1 md:col-span-2 aspect-[4/3] md:aspect-auto h-[450px]",
  },
  {
    id: 2,
    name: "ErgoPro Çalışma Koltuğu",
    category: "Ofis Koltukları",
    price: "₺4.200",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=800&auto=format&fit=crop",
    gridClass: "col-span-1 aspect-square h-[450px]",
  },
  {
    id: 3,
    name: "Line Toplantı Masası",
    category: "Masa Takımları",
    price: "₺16.000",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    gridClass: "col-span-1 md:col-span-2 h-[500px] md:aspect-auto",
  },
  {
    id: 4,
    name: "Arşiv Metal Dolap",
    category: "Depolama Alanları",
    price: "₺6.800",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=800&auto=format&fit=crop",
    gridClass: "col-span-1 aspect-square h-[500px]",
  },
];

const materials = [
  {
    title: "1. Sınıf Doğal Ahşap",
    subtitle: "Yönetici Masalarında Prestij",
    desc: "Üst düzey makam takımları ve yönetici masalarında kullanılan, uzun ömürlü ve çizilmelere karşı ekstra dirençli birinci sınıf doğal ahşap kaplamalarla ofisinize prestij katın.",
    image: "/malzeme-ahsap.jpg"
  },
  {
    title: "Ergonomik File Kumaş",
    subtitle: "Çalışma Koltuklarında Konfor",
    desc: "Uzun mesai saatleri için özel tasarlanmış, terletmeyen ve bel desteğini maksimize eden premium nefes alabilir file kumaş teknolojisi ile ofis koltuklarında üstün ergonomi.",
    image: "/malzeme-file.jpg"
  },
  {
    title: "Endüstriyel Çelik Aksam",
    subtitle: "Masa ve Dolaplarda Dayanıklılık",
    desc: "Ofis çalışma masaları ve evrak dolaplarında yıllarca kullanıma uygun, paslanmaz elektrostatik toz boyalı yüksek kalite çelik iskelet ile sarsılmaz dayanıklılık.",
    image: "/malzeme-metal.jpg"
  }
];

const categories = [
  {
    name: "Yönetici Mobilyaları",
    desc: "Liderliğinizi yansıtan prestijli tasarımlar.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000&auto=format&fit=crop",
    href: "/koleksiyon?main=yonetici-mobilyalari",
  },
  {
    name: "Ofis Koltukları",
    desc: "Sağlığınızı düşünen ergonomik çözümler.",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1000&auto=format&fit=crop",
    href: "/koleksiyon?main=ofis-koltuklari",
  },
  {
    name: "Masa Takımları",
    desc: "Takım çalışmasını destekleyen verimli alanlar.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
    href: "/koleksiyon?main=ofis-masa-takimlari",
  },
];

const pinterestCategories = [
  { name: "Ofis Mobilyaları", desc: "Yönetici & çalışan masalarından tam takımlara", image: "/kategori-1.jpg", href: "/koleksiyon?main=ofis-mobilyalari", featured: true },
  { name: "Ofis Koltukları", desc: "Ergonomik & premium deri koltuklar", image: "/kategori-2.jpg", href: "/koleksiyon?main=ofis-koltuklari" },
  { name: "Masa Takımları", desc: "Tarzınızı yansıtan çalışma takımları", image: "/kategori-3.jpg", href: "/koleksiyon?main=ofis-masa-takimlari" },
  { name: "Oturma Grupları", desc: "Bekleme & lounge alanları için", image: "/kategori-4.jpg", href: "/koleksiyon?main=oturma-gruplari" },
  { name: "Yönetici Mobilyaları", desc: "Prestijli makam takımları", image: "/kategori-5.jpg", href: "/koleksiyon?main=yonetici-mobilyalari" },
  { name: "Depolama Alanları", desc: "Düzeni şıklıkla buluşturan çözümler", image: "/kategori-6.jpg", href: "/koleksiyon?main=depolama-alanlari" },
];

function CategoryCard({ cat, className = "" }) {
  return (
    <Link
      href={cat.href}
      className={`group block relative overflow-hidden bg-[#111] ${className}`}
    >
      <img
        src={getImgUrl(cat.image)}
        alt={cat.name}
        className="absolute inset-0 w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
      />
      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-700" />
      {/* Bottom hover line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#d4a31a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </Link>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [dynamicArrivals, setDynamicArrivals] = useState(newArrivals);

  useEffect(() => {
    fetch(getImgUrl('/api/products.json'))
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const gridClasses = [
            "col-span-1 md:col-span-2 aspect-[4/3] md:aspect-auto h-[450px]",
            "col-span-1 aspect-square h-[450px]",
            "col-span-1 md:col-span-2 h-[500px] md:aspect-auto",
            "col-span-1 aspect-square h-[500px]"
          ];
          
          const mapped = data.slice(12, 16).map((p, i) => {
            const catName = p.main_categories && p.main_categories.length > 0 ? p.main_categories[0].name : "Ofis Mobilyası";
            const imageUrl = p.images && p.images.length > 0 ? p.images[0] : newArrivals[i].image;
            return {
              id: p.id || p.Kimlik || i,
              name: p.name || p.İsim,
              category: catName,
              price: p.price ? p.price + " ₺" : (p["Normal fiyat"] ? p["Normal fiyat"] + " ₺" : ""),
              image: imageUrl,
              gridClass: gridClasses[i],
              slug: p.slug || (p.İsim ? p.İsim.toLowerCase().replace(/ /g, '-') : "")
            };
          });
          setDynamicArrivals(mapped);
        }
      })
      .catch(err => console.error("Ürünler yüklenirken hata oluştu:", err));
  }, []);

  const accordionCategories = [
    {
      id: 0,
      name: "Ofis Mobilyaları",
      title: "OFİS MOBİLYALARI",
      image: "/kategori-1.jpg",
      icon: <Package size={48} strokeWidth={1.2} />,
      href: "/koleksiyon?main=ofis-mobilyalari",
    },
    {
      id: 1,
      name: "Yönetici Mobilyaları",
      title: "YÖNETİCİ MOBİLYALARI",
      image: "/kategori-5.jpg",
      icon: <Sofa size={48} strokeWidth={1.2} />,
      href: "/koleksiyon?main=yonetici-mobilyalari",
    },
    {
      id: 2,
      name: "Ofis Koltukları",
      title: "OFİS KOLTUKLARI",
      image: "/kategori-2.jpg",
      icon: <Sofa size={48} strokeWidth={1.2} />,
      href: "/koleksiyon?main=ofis-koltuklari",
    },
    {
      id: 3,
      name: "Masa Takımları",
      title: "MASA TAKIMLARI",
      image: "/kategori-3.jpg",
      icon: <Utensils size={48} strokeWidth={1.2} />,
      href: "/koleksiyon?main=ofis-masa-takimlari",
    }
  ];

  return (
    <div className="bg-cream overflow-clip">
      {/* Hero Section */}
      <Hero />
      <ProductCarousel />

      {/* Ürün Kategorileri — Temiz 3x2 Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#d4a31a] font-semibold mb-3">Ürün Kategorileri</p>
            <h2 className="text-2xl md:text-4xl text-serif-elegant font-light text-anthracite mb-3">
              Ofis Mobilyası Koleksiyonlarımız
            </h2>
            <div className="w-10 h-[1px] bg-[#d4a31a] mx-auto"></div>
          </div>

          {/* 3x2 Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {pinterestCategories.map((cat, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col">
                <CategoryCard cat={cat} className="w-full h-[280px] md:h-[320px]" />
                <div className="pt-5 pb-2">
                  <h3 className="text-xl md:text-2xl text-serif-elegant font-medium text-anthracite group-hover:text-[#d4a31a] transition-colors">{cat.name}</h3>
                  <p className="text-sm md:text-base text-earth tracking-wide mt-2 font-medium">{cat.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              href="/koleksiyon"
              className="inline-flex items-center space-x-3 px-8 py-4 text-xs text-sans-clean uppercase tracking-widest bg-anthracite text-cream hover:bg-[#d4a31a] transition-colors duration-500"
            >
              <span>Tüm Koleksiyonu İncele</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Kurumsal Neden Biz — Modern İstatistik + Görsel Bölümü */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 xl:gap-24">

            {/* Sol: Görsel + overlay */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:w-1/2 relative h-[420px] md:h-[520px] overflow-hidden rounded-sm"
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
                alt="BYMAN Kurumsal Ofis Mobilyaları Fabrika Üretim"
                title="Türkiye'nin Önde Gelen Ofis Mobilyası Üreticisi"
                className="w-full h-full object-cover"
              />
              {/* Stat badge */}
              <div className="absolute bottom-6 left-6 bg-anthracite text-white px-6 py-5">
                <span className="text-4xl font-bold text-[#d4a31a] block leading-none">20+</span>
                <span className="text-xs uppercase tracking-widest text-white/70 mt-1 block">Yıllık Deneyim</span>
              </div>
            </motion.div>

            {/* Sağ: Başlık + açıklama + istatistikler */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:w-1/2 flex flex-col justify-center"
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#d4a31a] font-bold mb-4 block">
                Neden BYMAN?
              </span>
              <h2 className="text-3xl md:text-4xl text-serif-elegant font-light text-anthracite leading-tight mb-6">
                Türkiye'nin Güvenilir<br />Ofis Mobilyası Üreticisi
              </h2>
              <div className="w-12 h-[2px] bg-[#d4a31a] mb-6"></div>
              <p className="text-sm text-earth leading-relaxed mb-4 font-sans">
                BYMAN, 20 yılı aşkın deneyimiyle kurumsal ofis mobilyası sektöründe Türkiye'nin en güvenilir markalarından biri haline gelmiştir. Yönetici odalarından açık ofis alanlarına, toplantı salonlarından bekleme alanlarına kadar her kurumsal ihtiyaca çözüm sunuyoruz.
              </p>
              <p className="text-sm text-earth leading-relaxed mb-10 font-sans">
                Yerli üretim kalitesiyle Avrupa standartlarında ofis mobilyaları tasarlıyoruz. Her ürün, dayanıklı malzeme seçimi, ergonomik tasarım ve estetik bütünlük gözetilerek üretilmektedir.
              </p>

              {/* İstatistikler */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-earth/10 pt-8">
                {[
                  { num: "5.000+", label: "Tamamlanan Proje" },
                  { num: "500+", label: "Farklı Ürün" },
                  { num: "81", label: "İle Teslimat" },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-3xl font-bold text-anthracite leading-none mb-1">{stat.num}</span>
                    <span className="text-[10px] uppercase tracking-widest text-earth font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/hakkimizda"
                  className="inline-flex items-center space-x-3 text-xs text-sans-clean uppercase tracking-widest text-anthracite hover:text-[#d4a31a] transition-colors duration-300 group border-b border-anthracite hover:border-[#d4a31a] pb-1"
                >
                  <span>Hakkımızda Daha Fazla</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Materials & Textures Section (NEW - Highly Aesthetic) */}
      <section className="py-24 bg-[#111] text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl text-serif-elegant font-light mb-6">
                Üstün Ofis Mobilyası Malzemeleri
              </h2>
              <div className="w-12 h-[1px] bg-[#d4a31a] mb-6"></div>
              <p className="text-white/70 font-light leading-relaxed">
                Yönetici masalarından ergonomik ofis koltuklarına kadar her ürünümüzde sadece en yüksek kalite ve dayanıklılığa sahip malzemeleri kullanıyoruz. Uzun ömürlü, kurumsal estetiğe uygun çözümler.
              </p>
            </div>
            <div className="mt-8 md:mt-0 text-right">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#d4a31a] font-semibold">BYMAN Üretim Standartları</span>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16"
          >
            {materials.map((mat, index) => (
              <motion.div
                variants={fadeInUp}
                key={index}
                className="group cursor-default flex flex-col"
              >
                {/* Image Wrap */}
                <div className="relative w-full aspect-[3/4] overflow-hidden mb-8 bg-[#222]">
                  <img
                    src={getImgUrl(mat.image)}
                    alt={mat.title}
                    title={`${mat.title} - Ofis Mobilyası Materyali`}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out opacity-90 group-hover:opacity-100"
                  />
                </div>
                
                {/* Info */}
                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-[10px] tracking-[0.2em] text-[#d4a31a] uppercase font-bold">
                    0{index + 1}
                  </span>
                  <div className="h-[1px] flex-1 bg-white/20"></div>
                </div>
                
                <h3 className="text-xl md:text-2xl text-serif-elegant font-light mb-2">
                  {mat.title}
                </h3>
                <span className="text-xs uppercase tracking-widest text-white/50 block mb-4">
                  {mat.subtitle}
                </span>
                
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  {mat.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Asymmetric New Arrivals Section (Redesigned) */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
            <div className="space-y-3">
              <h2 className="text-sm uppercase text-sans-clean tracking-[0.25em] text-earth block">
                Ofis Mobilyaları & Tasarım
              </h2>
              <h3 className="text-3xl md:text-5xl text-serif-elegant font-light text-anthracite">
                Yeni Sezon Ofis Mobilyaları
              </h3>
            </div>
            <Link
              href="/koleksiyon"
              className="mt-6 md:mt-0 inline-flex items-center space-x-2 text-xs text-sans-clean uppercase tracking-widest text-anthracite hover:text-wood border-b border-anthracite hover:border-wood pb-1 transition-all duration-300 group"
            >
              <span>Tüm Koleksiyonu İncele</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Asymmetric Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8"
          >
            {dynamicArrivals.map((product) => (
              <motion.div
                variants={fadeInUp}
                key={product.id}
                className={`group flex flex-col justify-between overflow-hidden bg-cream p-3 md:p-5 border border-earth/10 hover:border-wood/30 transition-all duration-500 relative ${product.gridClass}`}
              >
                <Link href={`/urun/${product.slug || ''}`} className="absolute inset-0 z-30" aria-label={`${product.name} detaylarını incele`}></Link>
                {/* Thin inner frame border on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-wood/10 scale-[0.98] group-hover:scale-[1.01] transition-all duration-700 pointer-events-none z-10"></div>
                
                {/* Image Wrap */}
                <div className="overflow-hidden relative w-full aspect-[4/3] md:h-full md:aspect-auto min-h-[140px] md:min-h-[220px] mb-3 md:mb-4 bg-beige/25">
                  <img
                    src={getImgUrl(product.image)}
                    alt={`${product.name} - ${product.category}`}
                    title={product.name}
                    className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-cream/90 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 text-[8px] md:text-[11px] text-sans-clean tracking-widest uppercase text-anthracite font-semibold z-20">
                    {product.category}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col md:flex-row md:items-end justify-between pt-2 z-20 relative gap-1 md:gap-0">
                  <div>
                    <h4 className="text-sm md:text-xl text-serif-elegant font-medium text-anthracite group-hover:text-wood transition-colors duration-300 line-clamp-1 md:line-clamp-none">
                      {product.name}
                    </h4>
                    <p className="text-[10px] md:text-sm text-earth tracking-widest uppercase md:mt-1 font-medium">
                      Özel Üretim
                    </p>
                  </div>
                  <span className="text-sm md:text-base font-semibold text-anthracite">
                    {product.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Collection Spaces Section (Accordion Gallery) */}
      <section className="py-12 md:py-24 bg-[#1a1a1a] text-white">
        <div className="text-center max-w-xl mx-auto mb-16 px-6">
          <span className="text-sm uppercase text-sans-clean tracking-[0.25em] text-[#d4a31a] block mb-4">
            Çalışma Alanları
          </span>
          <h2 className="text-3xl md:text-5xl text-serif-elegant font-light text-white leading-tight">
            Ofis Koleksiyonları
          </h2>
          <div className="w-24 h-[1px] bg-[#d4a31a] mx-auto my-6"></div>
          <p className="text-sm text-gray-400 font-light leading-relaxed">
            Şirketinizin vizyonunu yansıtan, konforlu ve kurumsal mobilya serilerimizi kategori bazlı inceleyin.
          </p>
        </div>

        {/* Desktop/Tablet Accordion Gallery (Edge to Edge) */}
        <div 
          className="hidden md:flex w-full h-[500px] lg:h-[600px] overflow-hidden"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {accordionCategories.map((cat, index) => {
            const isHovered = hoveredIndex === index;
            
            // Width calculation
            let width = "22.5%"; // default equal width
            if (hoveredIndex === null) {
              width = "22.5%";
            } else if (hoveredIndex === 4) {
              width = "19%";
            } else {
              width = isHovered ? "46%" : "15%";
            }

            return (
              <div
                key={cat.id}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`relative h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group flex-shrink-0 border-r border-[#333]`}
                style={{ width }}
              >
                {/* Background Image */}
                <img
                  src={getImgUrl(cat.image)}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Dark overlay for inactive panels */}
                <div className={`absolute inset-0 transition-colors duration-700 ${isHovered ? 'bg-black/0' : 'bg-black/60 group-hover:bg-black/40'}`} />

                {/* Content when Inactive */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center text-white transition-opacity duration-500 ${isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                   <div className="mb-4 opacity-80 transition-transform duration-500 group-hover:scale-110">{cat.icon}</div>
                   <span className="text-sm md:text-base font-medium tracking-wide text-center px-4 opacity-90">{cat.name}</span>
                </div>

                {/* Content when Active */}
                <div className={`absolute bottom-0 left-0 right-0 transition-opacity duration-500 delay-100 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                   <div className="bg-[#a87c1e]/90 backdrop-blur-sm px-8 py-5 w-full flex items-center justify-between">
                     <h3 className="text-white text-xl md:text-2xl font-medium tracking-wider">{cat.title}</h3>
                     <Link href={cat.href} className="text-white hover:scale-110 transition-transform">
                        <ArrowRight />
                     </Link>
                   </div>
                </div>
              </div>
            );
          })}
          
          {/* The Plus Button Panel */}
          <Link 
            href="/koleksiyon" 
            onMouseEnter={() => setHoveredIndex(4)}
            className="bg-[#d4a31a] flex flex-col items-center justify-center cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] relative group text-white border-l border-[#b38b15] overflow-hidden"
            style={{ width: hoveredIndex === null ? "10%" : (hoveredIndex === 4 ? "24%" : "9%") }}
          >
            <div className="flex flex-col items-center justify-center w-full px-2">
               <Plus size={48} className={`transition-transform duration-500 ${hoveredIndex === 4 ? 'scale-110 mb-3' : ''}`} />
               <div 
                  className={`transition-all duration-500 flex items-center justify-center`}
                  style={{ 
                    maxHeight: hoveredIndex === 4 ? '50px' : '0px', 
                    opacity: hoveredIndex === 4 ? 1 : 0 
                  }}
               >
                  <span className="text-white text-base md:text-xl font-medium tracking-wider uppercase whitespace-nowrap">Tümünü Gör</span>
               </div>
            </div>
          </Link>
        </div>
        
        {/* Mobile version (Fallback layout for smaller screens) */}
        <div className="md:hidden flex flex-col px-0">
          {accordionCategories.map((cat, index) => (
             <Link href={cat.href} key={cat.id} className="relative h-64 overflow-hidden border-b border-[#333] flex items-center justify-center group">
               <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
               <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 w-full h-full">
                 <div className="text-white opacity-90 mb-4 group-hover:scale-110 transition-transform duration-500">
                   {cat.icon}
                 </div>
                 <h3 className="text-white text-xl font-medium tracking-wider mb-2">{cat.title}</h3>
                 <div className="inline-flex items-center space-x-2 text-sm text-[#d4a31a] uppercase tracking-widest border-b border-[#d4a31a]/40 pb-1 mt-2">
                   <span>İncele</span>
                   <ArrowRight size={14} />
                 </div>
               </div>
             </Link>
          ))}
          <Link href="/koleksiyon" className="h-24 bg-[#d4a31a] flex items-center justify-center cursor-pointer group">
             <Plus size={32} className="text-white group-hover:scale-110 transition-transform duration-300" />
          </Link>
        </div>
      </section>

      {/* Dynamic Concept Teaser */}
      <section className="py-24 bg-cream text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#1C1C1C_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <span className="text-sm uppercase text-sans-clean tracking-[0.25em] text-earth block mb-2">
            Zamanın Ruhuna Dokun
          </span>
          <h2 className="text-3xl md:text-5xl text-serif-elegant font-light text-anthracite italic leading-normal mb-6">
            &ldquo;Sadelik, zarafetin en yüksek basamağıdır.&rdquo;
          </h2>
          <p className="text-sm text-sans-clean uppercase tracking-[0.15em] text-earth font-semibold">
            - Leonardo da Vinci
          </p>
          <div className="luxury-line w-16 mx-auto my-6"></div>
          <Link
            href="/konsept"
            className="inline-flex items-center space-x-3 px-8 py-4 text-xs text-sans-clean uppercase tracking-widest bg-anthracite text-cream hover:bg-wood transition-colors duration-500 shadow-md"
          >
            <span>Konsept Lookbook Sayfasını Keşfet</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {/* Expand on Scroll Section */}
      <ScrollExpandSection />
    </div>
  );
}

function ScrollExpandSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate transforms based ONLY on the sticky phase (0 to 1)
  // Image expands from 75% to 100% in the first half of the sticky scroll
  const width = useTransform(scrollYProgress, [0, 0.5], ["75%", "100%"]);
  const height = useTransform(scrollYProgress, [0, 0.5], ["60vh", "100vh"]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["24px", "0px"]);
  
  // Text box fades in early (0.15 → 0.35) and stays fully opaque after that
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35, 1], [0, 1, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.35], [40, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.5]);

  return (
    <section ref={containerRef} className="h-[200vh] bg-[#f8f6f3] relative">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Title before expansion was removed as requested */}


        {/* Expanding Image Container */}
        <motion.div 
          style={{ width, height, borderRadius }}
          className="relative overflow-hidden flex items-center justify-center shadow-2xl"
        >
          <img 
            src={getImgUrl("/byman-hero.jpg")} 
            alt="BYMAN Ankara Ofis Mobilyası" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark Overlay that appears as it expands */}
          <motion.div 
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black pointer-events-none"
          />
          
          {/* Editorial Content Card inside expanded image */}
          <motion.div 
            style={{ opacity: textOpacity, y: textY }}
            className="absolute bottom-0 left-0 w-full md:w-[520px] md:bottom-16 md:left-16 lg:left-24 bg-white p-10 md:p-14 shadow-2xl flex flex-col items-start z-40"
          >
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#d4a31a] font-bold mb-4 block">
              Ankara Ofis Mobilyas&#x131;
            </span>
            <h2 className="text-2xl md:text-4xl text-serif-elegant font-light text-anthracite mb-5 leading-tight">
              Ankara&apos;n&#x131;n Lider<br />Ofis Mobilyas&#x131; Markas&#x131;
            </h2>
            <div className="w-10 h-[1px] bg-[#d4a31a] mb-5"></div>
            <p className="text-sm leading-relaxed mb-3 text-gray-700 font-sans">
              BYMAN olarak Ankara&apos;daki kurumsal firmalara, y&#xF6;netici odalar&#x131;ndan a&#xE7;&#x131;k ofis alanlar&#x131;na kadar t&#xFC;m ofis mobilyas&#x131; ihtiya&#xE7;lar&#x131;nda &#xFC;st d&#xFC;zey &#xE7;&#xF6;z&#xFC;mler sunuyoruz.
            </p>
            <p className="text-sm leading-relaxed mb-8 text-gray-500 font-sans">
              &#x130;ster yeni ofisinizi kuruyorsunuz, ister mevcut alanlar&#x131;n&#x131;z&#x131; modernize ediyorsunuz &mdash; uzman ekibimizle birlikte ofisinizi vizyonunuza yak&#x131;&#x15F;&#x131;r hale getiriyoruz.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
              <Link href="/iletisim" className="w-full sm:w-auto flex items-center justify-center space-x-3 px-6 py-4 bg-[#1c1c1c] text-white hover:bg-[#d4a31a] transition-colors duration-500 text-xs tracking-[0.2em] uppercase shadow-lg">
                <Calendar size={16} />
                <span>Randevu Olu&#x15F;tur</span>
              </Link>
              
              <Link href="/iletisim" className="group flex items-center space-x-2 text-xs uppercase tracking-widest text-anthracite hover:text-[#d4a31a] border-b border-anthracite hover:border-[#d4a31a] pb-1 transition-all duration-300">
                <span>Bize Ula&#x15F;&#x131;n</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCarousel() {
  const scrollRef = useRef(null);
  const scrollInterval = useRef(null);
  const [carouselProducts, setCarouselProducts] = useState([
    { id: 1, name: "Yönetici Masası", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop", slug: "" },
    { id: 2, name: "Ergonomik Koltuk", image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=800&auto=format&fit=crop", slug: "" },
    { id: 3, name: "Toplantı Masası", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop", slug: "" },
    { id: 4, name: "Bekleme Koltuğu", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop", slug: "" },
    { id: 5, name: "Çoklu Çalışma İstasyonu", image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=800&auto=format&fit=crop", slug: "" },
    { id: 6, name: "Dosya Dolabı", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800&auto=format&fit=crop", slug: "" },
  ]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data.slice(12, 20).map((p, i) => {
            const imageUrl = p.images && p.images.length > 0 ? p.images[0] : carouselProducts[i % carouselProducts.length].image;
            return {
              id: p.id || p.Kimlik || i,
              name: p.name || p.İsim,
              image: imageUrl,
              slug: p.slug || (p.İsim ? p.İsim.toLowerCase().replace(/ /g, '-') : "")
            };
          });
          if (mapped.length > 0) setCarouselProducts(mapped);
        }
      })
      .catch(err => console.error("Carousel ürünleri yüklenirken hata oluştu:", err));
  }, []);

  const handleMouseMove = (e) => {
    const container = scrollRef.current;
    if (!container) return;
    
    const { left, right, width } = container.getBoundingClientRect();
    const x = e.clientX;
    const triggerZone = width * 0.15; // 15% of width on edges
    
    clearInterval(scrollInterval.current);

    if (x > right - triggerZone) {
      const speed = Math.max(2, ((x - (right - triggerZone)) / triggerZone) * 12);
      scrollInterval.current = setInterval(() => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: speed, behavior: 'auto' });
      }, 10);
    } else if (x < left + triggerZone) {
      const speed = Math.max(2, (((left + triggerZone) - x) / triggerZone) * 12);
      scrollInterval.current = setInterval(() => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: -speed, behavior: 'auto' });
      }, 10);
    }
  };

  const handleMouseLeave = () => {
    clearInterval(scrollInterval.current);
  };

  useEffect(() => {
    return () => clearInterval(scrollInterval.current);
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden relative border-t border-earth/10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center"
      >
        <h2 className="text-3xl md:text-5xl text-serif-elegant font-light text-anthracite mb-4">
          Rahat, Şık ve Farklı Tasarımlar
        </h2>
        <p className="text-sm md:text-base text-earth font-light leading-relaxed max-w-2xl mx-auto mb-8">
          Konforu ve profesyonelliği tek yerde buluşturan yeni nesil tasarımlarla ofisinizde rahat, şık ve kurumsal detayları keşfedin.
        </p>
        <Link href="/koleksiyon" className="inline-flex items-center space-x-2 text-sm text-anthracite hover:text-wood transition-colors group border-b border-anthracite pb-1">
          <span>Ürünler</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Horizontal Scroll Container */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="w-full relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-12 px-12 md:px-32 pb-12 pt-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {carouselProducts.map((product) => (
            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.9, x: 40 },
                visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              key={product.id} 
              className="shrink-0 w-[260px] md:w-[320px] flex flex-col items-center group cursor-pointer"
            >
              <Link href={`/urun/${product.slug || ''}`} className="w-full flex flex-col items-center">
                <div className="w-full h-[250px] relative mb-6 bg-white flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <h3 className="text-xl text-anthracite font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 text-center">{product.name}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Fading edges to indicate scrollability */}
        <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </motion.div>
    </section>
  );
}
