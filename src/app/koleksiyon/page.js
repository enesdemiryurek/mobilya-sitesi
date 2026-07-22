"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, Info, X, Search, Sliders, LayoutGrid, Grid2X2, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getImgUrl } from "@/utils/image";

// Rich product dataset representing luxury furniture
const localFallbackData = [
  {
    id: 1,
    name: "Solenne Bouclé Tekli Koltuk",
    category: "oturma",
    category_name: "Oturma Odası",
    price: 14500,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800",
    image2: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800",
    image3: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800"
    ],
    description: "Fildişi rengi ithal boucle kumaş kaplı, yuvarlak formlu tasarım koltuk. Masif gürgen iç iskeleti ile uzun ömürlü konfor ve dayanıklılık sunar.",
    dimensions: "80cm G x 85cm D x 72cm Y"
  },
  {
    id: 2,
    name: "Monolith Doğal Mermer Yemek Masası",
    category: "yemek",
    category_name: "Yemek Odası",
    price: 38200,
    image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?q=80&w=800",
    image2: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=800",
    image3: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?q=80&w=800",
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=800",
      "https://images.unsplash.com/photo-1617806118233-18e1db207f62?q=80&w=1000"
    ],
    description: "Blok traverten mermerden işlenmiş, heykelsi ayak yapısına sahip lüks yemek masası. 6-8 kişilik oturum kapasitesi ile yaşam alanlarınıza mimari bir kimlik kazandırır.",
    dimensions: "200cm G x 100cm D x 75cm Y"
  },
  {
    id: 3,
    name: "Soma Ceviz Konsol",
    category: "yemek",
    category_name: "Yemek Odası",
    price: 24600,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800",
    image2: "https://images.unsplash.com/photo-1602872030219-c1650247dec5?q=80&w=800",
    image3: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800",
      "https://images.unsplash.com/photo-1602872030219-c1650247dec5?q=80&w=800",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800"
    ],
    description: "Doğal Amerikan ceviz kaplama gövde ve mat siyah metal ayaklar. Dokunmatik açılır kapak sistemi ile minimalist depolama ve rafine detaylar.",
    dimensions: "190cm G x 48cm D x 78cm Y"
  },
  {
    id: 4,
    name: "Nirvana Ahşap Yatak Başlığı",
    category: "yatak",
    category_name: "Yatak Odası",
    price: 18900,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800",
    image2: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800",
    image3: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800"
    ],
    description: "Masif meşe çıtalardan el işçiliğiyle üretilmiş, arkasında gizlenmiş entegre sıcak LED aydınlatmalı premium yatak başlığı ve karyola bazası.",
    dimensions: "200cm G x 215cm D x 130cm Y"
  },
  {
    id: 5,
    name: "Zenith Üfleme Cam Lambader",
    category: "aydinlatma",
    category_name: "Aydınlatma",
    price: 7800,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800",
    image2: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800",
    image3: "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800",
      "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?q=80&w=800"
    ],
    description: "Füme renkli el üflemesi cam küre başlık ve fırçalanmış pirinç gövde. Kademeli ışık ayarlı dimmer kontrolü ile sıcak bir ambiyans aydınlatması sunar.",
    dimensions: "35cm Çap x 160cm Y"
  },
  {
    id: 6,
    name: "Lotus Seramik Vazo Seti",
    category: "aksesuar",
    category_name: "Aksesuar",
    price: 3200,
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=800",
    image2: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=800",
    image3: "https://images.unsplash.com/photo-1581641841257-e190a7b2efde?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=800",
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=800",
      "https://images.unsplash.com/photo-1581641841257-e190a7b2efde?q=80&w=800"
    ],
    description: "Toprak tonlarında pürüzlü kum yüzeyli, el yapımı 3'lü seramik vazo seti. Yaşam alanlarında Wabi-sabi estetiğini yansıtır.",
    dimensions: "15cm, 22cm ve 28cm Yükseklikler"
  },
  {
    id: 7,
    name: "Pebble Bouclé Puf",
    category: "aksesuar",
    category_name: "Aksesuar",
    price: 5400,
    image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=800",
    image2: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=800",
    image3: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=800",
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=800",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800"
    ],
    description: "Dere taşlarının pürüzsüz kavislerinden esinlenilerek şekillendirilen, kaliteli fildişi boucle kumaş kaplı, çok yönlü dekoratif oturma elemanı.",
    dimensions: "60cm G x 50cm D x 42cm Y"
  },
  {
    id: 8,
    name: "Umbra Hasırlı Ahşap Şifonyer",
    category: "yatak",
    category_name: "Yatak Odası",
    price: 16500,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800",
    image2: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800",
    image3: "https://images.unsplash.com/photo-1602872030219-c1650247dec5?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800",
      "https://images.unsplash.com/photo-1602872030219-c1650247dec5?q=80&w=800"
    ],
    description: "Masif meşe çerçeve üzerine el örgüsü doğal hazıran (rattan) çekmece kapakları. Sıcak ve vintage esintili modern depolama ünitesi.",
    dimensions: "90cm G x 45cm D x 100cm Y"
  }
];

function KoleksiyonContent() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const mainQuery = searchParams ? searchParams.get("main") : null;
  const subQuery = searchParams ? searchParams.get("sub") : null;
  
  const [selectedMain, setSelectedMain] = useState(mainQuery || "all");
  const [selectedSub, setSelectedSub] = useState(subQuery || "all");
  const [availableSubs, setAvailableSubs] = useState([{ id: "all", label: "Tüm Ürünler" }]);
  const [searchQuery, setSearchQuery] = useState("");
  const [layoutColumns, setLayoutColumns] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;
  const [expandedCategories, setExpandedCategories] = useState({});
  const [globalCategoryTree, setGlobalCategoryTree] = useState([]);

  useEffect(() => {
    if (searchParams) {
      const m = searchParams.get("main");
      const s = searchParams.get("sub");
      if (m) setSelectedMain(m);
      if (s) setSelectedSub(s);
    }
  }, [searchParams]);

  // Fetch products from local fallback or products.json, and merge with localStorage
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let apiProducts = [];
      try {
        const directRes = await fetch(getImgUrl("/api/products.json"));
        if (directRes.ok) {
          apiProducts = await directRes.json();
        }
      } catch (error) {
        console.warn(error.message);
      }

      if (!apiProducts || apiProducts.length === 0) {
        apiProducts = localFallbackData;
      }

      apiProducts = apiProducts.map(p => {
        let imageUrl = p.image;
        if (!imageUrl && p.images && p.images.length > 0) {
          imageUrl = p.images[0];
        }
        let image2Url = p.image2;
        if (!image2Url && p.images && p.images.length > 1) {
          image2Url = p.images[1];
        }
        
        return {
          ...p,
          image: imageUrl,
          image2: image2Url,
          price: typeof p.price === 'string' 
            ? parseInt(p.price.replace(/[^\d]/g, ''), 10) 
            : p.price
        };
      });

      const localStr = localStorage.getItem("byman_local_products");
      const localProducts = localStr ? JSON.parse(localStr) : [];
      
      const combined = [...apiProducts];
      localProducts.forEach((lp) => {
        if (!combined.some((ap) => ap.id === lp.id)) {
          combined.push(lp);
        }
      });

      setProducts(combined);

      // Build global category tree for accordion
      const treeMap = new Map();
      combined.forEach(p => {
        if (p.main_categories) {
          p.main_categories.forEach(m => {
            if (!treeMap.has(m.slug)) {
              treeMap.set(m.slug, { slug: m.slug, name: m.name, subs: new Map() });
            }
            if (p.sub_categories) {
              p.sub_categories.forEach(s => {
                treeMap.get(m.slug).subs.set(s.slug, s.name);
              });
            }
          });
        }
      });
      const treeArray = Array.from(treeMap.values()).map(m => ({
        ...m,
        subs: Array.from(m.subs.entries()).map(([sSlug, sName]) => ({ slug: sSlug, name: sName }))
      }));
      setGlobalCategoryTree(treeArray);

      setTimeout(() => setLoading(false), 300);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];
    if (selectedMain && selectedMain !== "all") {
      result = result.filter(p => 
        p.main_categories && p.main_categories.some(m => m.slug === selectedMain)
      );
    }
    const uniqueSubs = new Map();
    result.forEach(p => {
      if (p.sub_categories) {
        p.sub_categories.forEach(sub => {
          uniqueSubs.set(sub.slug, sub.name);
        });
      }
    });
    const dynamicSubs = [{ id: "all", label: selectedMain !== "all" ? "Tümü" : "Tüm Ürünler" }];
    uniqueSubs.forEach((label, id) => {
      dynamicSubs.push({ id, label });
    });
    setAvailableSubs(dynamicSubs);
    if (selectedSub !== "all" && !uniqueSubs.has(selectedSub)) {
      setSelectedSub("all");
    } else if (selectedSub !== "all") {
      result = result.filter(p => 
        p.sub_categories && p.sub_categories.some(s => s.slug === selectedSub)
      );
    }
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        (p.description && p.description.toLowerCase().includes(query))
      );
    }
    setFilteredProducts(result);
    setCurrentPage(1); // Reset page on filter change
  }, [products, selectedMain, selectedSub, searchQuery]);

  useEffect(() => {
    if (mainQuery) setSelectedMain(mainQuery);
    else setSelectedMain("all");
    if (subQuery) setSelectedSub(subQuery);
    else setSelectedSub("all");
  }, [mainQuery, subQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="bg-cream min-h-screen pt-28 pb-24 font-sans">
      <div className="w-full mx-auto px-6 lg:px-12 2xl:px-20 pt-8 mb-16 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-earth block mb-4">
          Byman Studio Catalog
        </span>
        <h1 className="text-4xl md:text-6xl text-serif-elegant font-light text-anthracite leading-tight mb-4">
          Koleksiyonumuz
        </h1>
        <p className="text-sm text-earth max-w-lg mx-auto font-light leading-relaxed">
          Yaşam alanlarınıza sakinlik ve asalet katan, en ince detayına kadar ustalıkla tasarlanmış mobilya koleksiyonumuz.
        </p>
        <div className="luxury-line w-24 mx-auto mt-8"></div>
      </div>

      <div className="w-full mx-auto px-6 lg:px-12 2xl:px-20 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <aside className="hidden lg:block lg:col-span-2 space-y-10 sticky top-32">
            <div className="space-y-4">
              <span className="text-sm uppercase tracking-widest text-earth font-bold block border-b border-earth/20 pb-3">Arama</span>
              <div className="relative border-b border-earth/30 py-2 focus-within:border-anthracite transition-colors">
                <input
                  type="text"
                  placeholder="Ürün Ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-base text-anthracite focus:outline-none placeholder-earth/60"
                />
                <Search size={16} className="absolute right-0 top-2.5 text-earth/60" />
              </div>
            </div>

            {/* Categories Accordion */}
            <div className="space-y-4">
              <span className="text-sm uppercase tracking-widest text-earth font-bold block border-b border-earth/20 pb-3">Kategoriler</span>
              <ul className="space-y-2 pt-2">
                <li>
                  <button
                    onClick={() => { setSelectedMain("all"); setSelectedSub("all"); }}
                    className={`text-base tracking-wide text-left w-full py-1.5 transition-colors ${
                      selectedMain === "all" ? "text-wood font-bold" : "text-earth hover:text-anthracite font-medium"
                    }`}
                  >
                    Tüm Ürünler
                  </button>
                </li>
                {globalCategoryTree.map((cat) => {
                  const isMainActive = selectedMain === cat.slug;
                  const isExpanded = expandedCategories[cat.slug] ?? isMainActive;
                  
                  return (
                    <li key={cat.slug} className="pt-1">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => { 
                            setSelectedMain(cat.slug); 
                            setSelectedSub("all"); 
                            setExpandedCategories(prev => ({...prev, [cat.slug]: true}));
                          }}
                          className={`text-base tracking-wide text-left flex-1 py-1.5 transition-colors ${
                            isMainActive ? "text-wood font-bold" : "text-earth hover:text-anthracite font-medium"
                          }`}
                        >
                          {cat.name}
                        </button>
                        {cat.subs.length > 0 && (
                          <button 
                            onClick={() => setExpandedCategories(prev => ({...prev, [cat.slug]: !isExpanded}))}
                            className="p-1 text-earth hover:text-anthracite transition-colors"
                          >
                            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                          </button>
                        )}
                      </div>
                      
                      <AnimatePresence>
                        {isExpanded && cat.subs.length > 0 && (
                          <motion.ul 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4 mt-1 space-y-1.5 border-l-2 border-earth/10 ml-1"
                          >
                            <li>
                              <button
                                onClick={() => { setSelectedMain(cat.slug); setSelectedSub("all"); }}
                                className={`text-sm tracking-wide text-left w-full py-1 transition-colors ${
                                  isMainActive && selectedSub === "all" ? "text-wood font-bold" : "text-earth/80 hover:text-anthracite font-medium"
                                }`}
                              >
                                Tümü
                              </button>
                            </li>
                            {cat.subs.map(sub => (
                              <li key={sub.slug}>
                                <button
                                  onClick={() => { setSelectedMain(cat.slug); setSelectedSub(sub.slug); }}
                                  className={`text-sm tracking-wide text-left w-full py-1 transition-colors ${
                                    selectedSub === sub.slug ? "text-wood font-bold" : "text-earth/80 hover:text-anthracite font-medium"
                                  }`}
                                >
                                  {sub.name}
                                </button>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <main className="lg:col-span-10 w-full">
            {/* Sütun Seçici */}
            <div className="hidden md:flex justify-between items-center pb-4 mb-6 border-b border-earth/10">
              <span className="text-xs text-earth font-light">
                Görünüm: <span className="font-semibold text-anthracite">{layoutColumns} Sütunlu</span>
              </span>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setLayoutColumns(4)}
                  className={`p-2 border transition-all duration-300 ${
                    layoutColumns === 4 
                      ? "border-anthracite bg-anthracite text-cream" 
                      : "border-earth/20 text-earth hover:border-anthracite hover:text-anthracite"
                  }`}
                  title="4'lü Izgara"
                >
                  <LayoutGrid size={14} />
                </button>
                <button
                  onClick={() => setLayoutColumns(2)}
                  className={`p-2 border transition-all duration-300 ${
                    layoutColumns === 2 
                      ? "border-anthracite bg-anthracite text-cream" 
                      : "border-earth/20 text-earth hover:border-anthracite hover:text-anthracite"
                  }`}
                  title="2'li Izgara"
                >
                  <Grid2X2 size={14} />
                </button>
              </div>
            </div>

            {loading ? (
              /* Luxury Skeleton Loader */
              <div className={`grid grid-cols-1 ${
                layoutColumns === 4 
                  ? "sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8" 
                  : "md:grid-cols-2 gap-10"
              }`}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`bg-beige/20 border border-earth/10 animate-pulse rounded-tr-[2.5rem] rounded-bl-[2.5rem] ${
                    layoutColumns === 4 ? "p-4 xl:p-6 h-[460px]" : "p-6 h-[500px]"
                  }`}>
                    <div className="bg-earth/15 w-full h-[220px] mb-4 rounded-tr-[2.2rem] rounded-bl-[2.2rem]"></div>
                    <div className="bg-earth/15 w-2/3 h-5 mb-2"></div>
                    <div className="bg-earth/15 w-1/3 h-5"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              /* Pinterest style or Asymmetric Flex Grid with Fade/Layout transition */
              <motion.div
                layout
                className={`grid grid-cols-1 ${
                  layoutColumns === 4 
                    ? "sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8" 
                    : "md:grid-cols-2 gap-10"
                }`}
              >
                <AnimatePresence mode="popLayout">
                  {currentProducts.map((product) => (
                    <motion.div layout key={product.id}>
                      <Link
                        href={`/urun/${product.slug}`}
                        className={`group relative cursor-pointer bg-cream border border-earth/25 hover:border-wood/50 shadow-sm hover:shadow-md transition-all duration-500 flex flex-col justify-between rounded-tr-[2.5rem] rounded-bl-[2.5rem] h-full ${
                          layoutColumns === 4 ? "p-4 xl:p-6 min-h-[460px]" : "p-8 min-h-[500px]"
                        }`}
                      >
                        {/* Interactive Thin Framing Borders on hover */}
                        <div className="absolute inset-0 border border-transparent group-hover:border-wood/30 scale-[0.98] group-hover:scale-[1.01] transition-all duration-700 pointer-events-none z-15 rounded-tr-[2.5rem] rounded-bl-[2.5rem]"></div>
                        
                        <div>
                          {/* Image wrap with slow zoom & hover cross-fade */}
                          <div className="overflow-hidden relative mb-4 bg-beige/25 aspect-square flex items-center justify-center rounded-tr-[2.2rem] rounded-bl-[2.2rem]">
                            {/* Main Image */}
                            <img
                              src={getImgUrl(product.image)}
                              alt={product.name}
                              className="w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ease-in-out group-hover:opacity-0 z-10"
                            />
                            {/* Hover Image */}
                            <img
                              src={getImgUrl(product.image2 || product.image)}
                              alt={product.name}
                              className="w-full h-full object-cover absolute inset-0 transition-all duration-[1000ms] ease-out opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 z-0"
                            />
                            <div className="absolute bottom-3 left-3 bg-cream/90 backdrop-blur-sm px-2.5 py-0.5 text-[9px] tracking-widest uppercase text-anthracite font-semibold z-20">
                              {product.category_name}
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className={`${
                            layoutColumns === 4 ? "text-base xl:text-lg" : "text-xl md:text-2xl"
                          } text-serif-elegant font-medium text-anthracite group-hover:text-wood transition-colors duration-300 line-clamp-2`}>
                            {product.name}
                          </h3>
                        </div>

                        {/* Bottom Info and Price */}
                        <div className="flex items-end justify-between pt-4 mt-auto border-t border-earth/5">
                          <span className="text-[10px] text-sans-clean tracking-wider text-earth uppercase group-hover:text-anthracite transition-colors duration-300">
                            Detaylar
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-24 border border-dashed border-earth/20 bg-beige/10">
                <p className="text-earth text-sm font-light">Arama veya filtrenize uygun ürün bulunamadı.</p>
                <button
                  onClick={() => { setSelectedMain("all"); setSelectedSub("all"); setSearchQuery(""); }}
                  className="mt-4 text-xs uppercase tracking-widest text-wood hover:text-anthracite border-b border-wood pb-0.5 transition-colors"
                >
                  Filtreleri Sıfırla
                </button>
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-16 pt-8 border-t border-earth/10">
                <button 
                  onClick={() => {
                    setCurrentPage(prev => Math.max(prev - 1, 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  className="p-2 border border-earth/20 rounded-full text-earth hover:bg-earth hover:text-cream disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-earth transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex items-center space-x-1 mx-4">
                  {getPageNumbers().map((page, index) => (
                    page === "..." ? (
                      <span key={`dots-${index}`} className="px-2 text-earth/50">...</span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors ${
                          currentPage === page 
                            ? "bg-anthracite text-cream font-medium" 
                            : "text-earth hover:bg-earth/10 hover:text-anthracite"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  ))}
                </div>                <button 
                  onClick={() => {
                    setCurrentPage(prev => Math.min(prev + 1, totalPages));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-earth/20 rounded-full text-earth hover:bg-earth hover:text-cream disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-earth transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function KoleksiyonPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream pt-32 pb-24 text-center text-earth">Yükleniyor...</div>}>
      <KoleksiyonContent />
    </Suspense>
  );
}
