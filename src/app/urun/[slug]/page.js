import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft, Check, ChevronRight, Ruler, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import ImageGallery from "./ImageGallery"; // We'll create a client component for the image gallery

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) return { title: "Ürün Bulunamadı" };

  return {
    title: `${product.name} - Coşkun Büro`,
    description: product.short_description || product.description?.slice(0, 150) || "Özel tasarım ofis ve yaşam alanı mobilyaları.",
    openGraph: {
      images: [product.image],
    },
  };
}

export async function generateStaticParams() {
  const productsPath = path.join(process.cwd(), "public", "api", "products.json");
  if (!fs.existsSync(productsPath)) return [];
  
  const fileContents = fs.readFileSync(productsPath, "utf8");
  const products = JSON.parse(fileContents);
  
  return products.map((p) => ({
    slug: p.slug,
  }));
}

function getProduct(slug) {
  const productsPath = path.join(process.cwd(), "public", "api", "products.json");
  if (!fs.existsSync(productsPath)) return null;
  
  const fileContents = fs.readFileSync(productsPath, "utf8");
  const products = JSON.parse(fileContents);
  
  return products.find((p) => p.slug === slug) || null;
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-cream min-h-screen pt-28 pb-24 font-sans">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 2xl:px-20">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-earth mb-12">
          <Link href="/" className="hover:text-anthracite transition-colors">Ana Sayfa</Link>
          <ChevronRight size={12} />
          <Link href="/koleksiyon" className="hover:text-anthracite transition-colors">Koleksiyon</Link>
          <ChevronRight size={12} />
          <span className="text-anthracite font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          
          {/* Left: Images */}
          <div className="relative">
            <ImageGallery images={product.images.length > 0 ? product.images : [product.image, product.image2, product.image3].filter(Boolean)} />
          </div>

          {/* Right: Info */}
          <div className="flex flex-col justify-start">
            <div className="mb-8">
              <span className="text-[10px] text-sans-clean tracking-[0.25em] text-wood uppercase font-semibold block mb-3">
                {product.category_name}
              </span>
              <h1 className="text-4xl md:text-5xl text-serif-elegant font-light text-anthracite mb-4 leading-tight">
                {product.name}
              </h1>
              
              {/* Price display removed */}
              
              <div className="luxury-line mb-8 w-24"></div>

              <div 
                className="text-sm text-earth leading-relaxed font-light space-y-4 mb-10 whitespace-pre-line [&>strong]:text-anthracite [&>strong]:font-semibold [&>em]:italic"
                dangerouslySetInnerHTML={{ __html: (product.description || product.short_description || "Bu ürün için henüz bir açıklama girilmemiş.").replace(/\\n/g, '<br/>') }}
              />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href="/iletisim"
                  className="w-full sm:w-auto text-center inline-block px-10 py-4 text-xs text-sans-clean uppercase tracking-widest bg-anthracite text-cream hover:bg-wood hover:text-cream transition-colors duration-500 shadow-md"
                >
                  Sipariş / Teklif Al
                </a>
                <Link
                  href="/koleksiyon"
                  className="w-full sm:w-auto text-center inline-block px-10 py-4 text-xs text-sans-clean uppercase tracking-widest bg-transparent border border-anthracite text-anthracite hover:bg-beige/40 transition-colors duration-500"
                >
                  Koleksiyona Dön
                </Link>
              </div>

              {/* Meta Info */}
              <div className="border-t border-earth/20 pt-8 space-y-6">
                
                {product.sku && (
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-beige/30 flex items-center justify-center text-earth">
                      <span className="font-serif text-xs font-semibold">SKU</span>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-anthracite font-semibold mb-1">Stok Kodu</h4>
                      <p className="text-xs text-earth font-light">{product.sku}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-beige/30 flex items-center justify-center text-earth">
                    <Check size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-anthracite font-semibold mb-1">Stok Durumu</h4>
                    <p className="text-xs text-earth font-light">{product.in_stock ? "Stokta Var" : "Tükendi"}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-beige/30 flex items-center justify-center text-earth">
                    <Truck size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-anthracite font-semibold mb-1">Teslimat</h4>
                    <p className="text-xs text-earth font-light">Özel sipariş ve teslimat süreçleri için iletişime geçiniz.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
