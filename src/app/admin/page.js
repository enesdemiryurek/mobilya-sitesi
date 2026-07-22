"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogOut, Trash2, Plus, Package, FileText, Image as ImageIcon, Ruler, Tag, Edit3, X } from "lucide-react";
import Link from "next/link";

// Predefined categories for furniture mapping
const categories = [
  { id: "oturma", label: "Oturma Odası" },
  { id: "yemek", label: "Yemek Odası" },
  { id: "yatak", label: "Yatak Odası" },
  { id: "aydinlatma", label: "Aydınlatma" },
  { id: "aksesuar", label: "Aksesuar" }
];

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [editingProduct, setEditingProduct] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("oturma");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [description, setDescription] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [formError, setFormError] = useState("");

  // Check login state on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem("byman_admin_authenticated");
    if (authStatus === "true") {
      setIsLoggedIn(true);
      fetchProducts();
    }
  }, []);

  // Fetch products to show in list
  const fetchProducts = async () => {
    setLoading(true);
    let apiProducts = [];
    try {
      // Fetch products.json first (works perfectly on next dev and static export)
      const directRes = await fetch("/api/products.json");
      if (directRes.ok) {
        apiProducts = await directRes.json();
      } else {
        const res = await fetch("/api/get_products.php");
        if (res.ok) {
          const json = await res.json();
          if (json.status === "success") {
            apiProducts = json.data;
          }
        }
      }
    } catch (err) {
      console.warn("API is not fully active, relying on local storage merge.", err);
    }

    // Merge with client-side local storage
    const localStr = localStorage.getItem("byman_local_products");
    const localProducts = localStr ? JSON.parse(localStr) : [];
    
    // De-duplicate by ID (in case some IDs overlap, prioritize API products or merge cleanly)
    const combined = [...apiProducts];
    localProducts.forEach((lp) => {
      if (!combined.some((ap) => ap.id === lp.id)) {
        combined.push(lp);
      }
    });

    setProducts(combined);
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "byman2026") {
      setIsLoggedIn(true);
      setError("");
      sessionStorage.setItem("byman_admin_authenticated", "true");
      fetchProducts();
    } else {
      setError("Hatalı şifre. Lütfen tekrar deneyin.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword("");
    sessionStorage.removeItem("byman_admin_authenticated");
  };

  // Drag & Drop Upload Functions
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = async (e) => {
    if (e.target.files && e.target.files[0]) {
      await uploadFiles(e.target.files);
    }
  };

  const uploadFiles = async (fileList) => {
    const remainingSlots = 10 - images.length;
    if (remainingSlots <= 0) {
      alert("En fazla 10 fotoğraf yükleyebilirsiniz.");
      return;
    }

    const filesToUpload = Array.from(fileList).slice(0, remainingSlots);
    setUploading(true);

    const uploadedUrls = [];

    for (const file of filesToUpload) {
      // 1. Get Base64 local fallback path
      const localBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload.php", {
          method: "POST",
          body: formData
        });
        if (response.ok) {
          const json = await response.json();
          if (json.status === "success") {
            uploadedUrls.push(json.url);
            continue;
          }
        }
      } catch (err) {
        console.warn("Upload connection error, using local Base64 URL.", err);
      }
      uploadedUrls.push(localBase64);
    }

    setImages(prev => [...prev, ...uploadedUrls].slice(0, 10));
    setUploading(false);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleStartEdit = (product) => {
    setEditingProduct(product);
    setName(product.name || "");
    setCategory(product.category || "oturma");
    setPrice(product.price ? product.price.toString() : "");
    setDescription(product.description || "");
    setDimensions(product.dimensions || "");
    
    if (product.images && product.images.length > 0) {
      setImages(product.images);
    } else {
      const fallbackImgs = [product.image, product.image2, product.image3].filter(Boolean);
      setImages(fallbackImgs);
    }
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setName("");
    setCategory("oturma");
    setPrice("");
    setImages([]);
    setDescription("");
    setDimensions("");
    setFormError("");
    setFormSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSuccess("");
    setFormError("");

    if (!name || !price || images.length === 0) {
      setFormError("İsim, Fiyat ve en az 1 adet fotoğraf yüklenmesi zorunludur.");
      return;
    }

    const priceNum = parseInt(price.toString().replace(/[^\d]/g, ""), 10);
    if (isNaN(priceNum)) {
      setFormError("Geçerli bir fiyat giriniz.");
      return;
    }

    const selectedCategoryObj = categories.find(c => c.id === category);
    const categoryName = selectedCategoryObj ? selectedCategoryObj.label : "Oturma Odası";

    if (editingProduct) {
      // UPDATE PRODUCT
      const updatedProduct = {
        id: editingProduct.id,
        name,
        category,
        category_name: categoryName,
        price: priceNum,
        image: images[0] || "",
        image2: images[1] || images[0] || "",
        image3: images[2] || "",
        images,
        description,
        dimensions
      };

      let savedOnServer = false;
      try {
        const response = await fetch("/api/edit_product.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct)
        });
        if (response.ok) {
          const resJson = await response.json();
          if (resJson.status === "success") {
            savedOnServer = true;
          }
        }
      } catch (err) {
        console.warn("Could not save edit on server, falling back.", err);
      }

      // LocalStorage sync
      const localStr = localStorage.getItem("byman_local_products");
      let localProducts = localStr ? JSON.parse(localStr) : [];
      const existsLocally = localProducts.some(p => p.id === editingProduct.id);
      if (existsLocally) {
        localProducts = localProducts.map(p => p.id === editingProduct.id ? updatedProduct : p);
      } else {
        localProducts.push(updatedProduct);
      }
      localStorage.setItem("byman_local_products", JSON.stringify(localProducts));

      setFormSuccess(
        savedOnServer 
          ? "Ürün başarıyla güncellendi!" 
          : "Ürün yerel tarayıcıda güncellendi (Statik Mod)."
      );
      setEditingProduct(null);
    } else {
      // ADD NEW PRODUCT
      const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
      const newId = maxId + 1;

      const newProduct = {
        id: newId,
        name,
        category,
        category_name: categoryName,
        price: priceNum,
        image: images[0] || "",
        image2: images[1] || images[0] || "",
        image3: images[2] || "",
        images,
        description,
        dimensions
      };

      let savedOnServer = false;
      try {
        const response = await fetch("/api/add_product.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct)
        });
        if (response.ok) {
          const resJson = await response.json();
          if (resJson.status === "success") {
            savedOnServer = true;
          }
        }
      } catch (err) {
        console.warn("Could not save to PHP server, using localStorage.", err);
      }

      const localStr = localStorage.getItem("byman_local_products");
      const localProducts = localStr ? JSON.parse(localStr) : [];
      localProducts.push(newProduct);
      localStorage.setItem("byman_local_products", JSON.stringify(localProducts));

      setFormSuccess(
        savedOnServer 
          ? "Ürün başarıyla eklendi!" 
          : "Ürün yerel tarayıcı veritabanına eklendi (Statik Mod)."
      );
    }

    // Reset Form
    setName("");
    setCategory("oturma");
    setPrice("");
    setImages([]);
    setDescription("");
    setDimensions("");

    // Refresh list
    fetchProducts();
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;

    let deletedFromServer = false;
    try {
      const response = await fetch("/api/delete_product.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (response.ok) {
        const resJson = await response.json();
        if (resJson.status === "success") {
          deletedFromServer = true;
        }
      }
    } catch (err) {
      console.warn("Could not delete from PHP server.", err);
    }

    const localStr = localStorage.getItem("byman_local_products");
    if (localStr) {
      const localProducts = JSON.parse(localStr);
      const filtered = localProducts.filter((p) => p.id !== id);
      localStorage.setItem("byman_local_products", JSON.stringify(filtered));
    }

    alert(deletedFromServer ? "Ürün silindi." : "Ürün silindi (Statik Mod).");
    
    // If deleted product was currently being edited, cancel it
    if (editingProduct && editingProduct.id === id) {
      handleCancelEdit();
    }
    
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-cream text-anthracite py-20 px-6 md:px-12 flex flex-col font-sans transition-colors duration-500">
      <div className="max-w-7xl mx-auto w-full flex-grow">
        
        {/* Navigation back to website */}
        <div className="flex justify-between items-center mb-12">
          <Link href="/" className="text-xs uppercase tracking-[0.25em] text-earth hover:text-wood transition-colors">
            ← SİTEYE DÖN
          </Link>
          {isLoggedIn && (
            <button 
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider text-earth hover:text-red-700 transition-colors"
            >
              <LogOut size={12} />
              <span>Güvenli Çıkış</span>
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            /* Login Form Container */
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md mx-auto bg-beige/25 border border-earth/15 p-8 md:p-10 rounded-tr-[3rem] rounded-bl-[3rem] shadow-sm mt-12"
            >
              <div className="text-center mb-8">
                <span className="text-[10px] uppercase tracking-[0.3em] text-earth block mb-2">Byman Studio</span>
                <h1 className="text-3xl text-serif-elegant font-light text-anthracite">Yönetici Girişi</h1>
                <div className="luxury-line w-16 mx-auto mt-4"></div>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase text-earth font-semibold flex items-center space-x-1">
                    <Lock size={12} />
                    <span>Panel Şifresi</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Şifrenizi girin..."
                    className="w-full bg-cream border border-earth/15 px-4 py-3 text-sm focus:outline-none focus:border-wood transition-colors"
                    required
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-700 font-light">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-anthracite text-cream uppercase text-xs tracking-widest hover:bg-wood transition-colors duration-500 rounded-none font-medium"
                >
                  Giriş Yap
                </button>
              </form>
            </motion.div>
          ) : (
            /* Admin Panel Dashboard */
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
              {/* Add Product Form */}
              <div className="lg:col-span-5 bg-beige/25 border border-earth/15 p-6 md:p-8 rounded-tr-[2.5rem] rounded-bl-[2.5rem] shadow-sm">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-earth/10">
                  <div className="flex items-center space-x-3">
                    <Plus className={`text-wood transition-transform duration-300 ${editingProduct ? "rotate-45" : ""}`} size={20} />
                    <h2 className="text-xl text-serif-elegant font-light text-anthracite">
                      {editingProduct ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
                    </h2>
                  </div>
                  {editingProduct && (
                    <button 
                      onClick={handleCancelEdit}
                      className="text-xs uppercase tracking-wider text-red-700 hover:text-red-900 transition-colors"
                    >
                      İptal Et
                    </button>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase text-earth font-semibold flex items-center space-x-1">
                      <Package size={12} />
                      <span>Ürün Adı *</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Örn: Byman Mermer Lambader"
                      className="w-full bg-cream border border-earth/15 px-3 py-2.5 text-sm focus:outline-none focus:border-wood transition-colors"
                      required
                    />
                  </div>

                  {/* Category & Price Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-widest uppercase text-earth font-semibold flex items-center space-x-1">
                        <Tag size={12} />
                        <span>Kategori</span>
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-cream border border-earth/15 px-3 py-2.5 text-sm focus:outline-none focus:border-wood transition-colors"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] tracking-widest uppercase text-earth font-semibold flex items-center space-x-1">
                        <span>Fiyat (₺) *</span>
                      </label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Örn: 12500"
                        className="w-full bg-cream border border-earth/15 px-3 py-2.5 text-sm focus:outline-none focus:border-wood transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Drag & Drop Multi-Image Upload (Max 10 Images) */}
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-widest uppercase text-earth font-semibold flex items-center space-x-1">
                      <ImageIcon size={12} />
                      <span>Ürün Fotoğrafları (En fazla 10 adet) *</span>
                    </label>

                    {/* Dropzone Area */}
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-tr-3xl rounded-bl-3xl p-8 flex flex-col items-center justify-center transition-all duration-300 ${
                        dragActive 
                          ? "border-wood bg-wood/5" 
                          : "border-earth/20 bg-cream/30 hover:border-earth/40"
                      }`}
                    >
                      <input
                        type="file"
                        id="multi-upload-input"
                        multiple
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      
                      <label htmlFor="multi-upload-input" className="cursor-pointer flex flex-col items-center space-y-2 text-center w-full">
                        <div className="w-12 h-12 bg-earth/10 flex items-center justify-center rounded-full text-earth">
                          <Plus size={20} />
                        </div>
                        <span className="text-xs text-anthracite font-medium">Görselleri sürükleyip bırakın veya seçmek için tıklayın</span>
                        <span className="text-[10px] text-earth font-light">En fazla 10 adet görsel seçebilirsiniz. İlk yüklenen görsel kapak görseli olacaktır.</span>
                      </label>

                      {uploading && (
                        <div className="absolute inset-0 bg-cream/70 backdrop-blur-sm flex flex-col items-center justify-center space-y-2 rounded-tr-3xl rounded-bl-3xl">
                          <div className="w-8 h-8 border-4 border-wood border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-xs text-earth font-medium">Fotoğraflar yükleniyor...</span>
                        </div>
                      )}
                    </div>

                    {/* Uploaded Images List / Grid */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-5 gap-3 pt-2">
                        {images.map((imgUrl, index) => (
                          <div 
                            key={index} 
                            className="group/thumb relative aspect-square bg-beige/35 border border-earth/15 rounded-lg overflow-hidden flex items-center justify-center"
                          >
                            <img src={imgUrl} alt={`Önizleme ${index + 1}`} className="w-full h-full object-cover" />
                            {index === 0 && (
                              <span className="absolute bottom-1 left-1 bg-wood text-cream text-[8px] px-1.5 py-0.5 tracking-wider uppercase font-semibold">
                                Kapak
                              </span>
                            )}
                            
                            {/* Delete Thumbnail Button */}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-1 right-1 p-1 bg-red-700 text-cream rounded-full opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200"
                              title="Görseli Kaldır"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Dimensions */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase text-earth font-semibold flex items-center space-x-1">
                      <Ruler size={12} />
                      <span>Ölçüler</span>
                    </label>
                    <input
                      type="text"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      placeholder="Örn: 180cm G x 45cm D x 75cm Y"
                      className="w-full bg-cream border border-earth/15 px-3 py-2.5 text-sm focus:outline-none focus:border-wood transition-colors"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase text-earth font-semibold flex items-center space-x-1">
                      <FileText size={12} />
                      <span>Açıklama</span>
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Ürün hakkında şık bir tanıtım metni yazın..."
                      rows={3}
                      className="w-full bg-cream border border-earth/15 px-3 py-2.5 text-sm focus:outline-none focus:border-wood transition-colors resize-none"
                    />
                  </div>

                  {formError && (
                    <p className="text-xs text-red-700 font-light">{formError}</p>
                  )}
                  {formSuccess && (
                    <p className="text-xs text-emerald-700 font-medium">{formSuccess}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-anthracite text-cream uppercase text-xs tracking-widest hover:bg-wood transition-colors duration-300 rounded-none font-medium"
                  >
                    {editingProduct ? "Ürünü Güncelle" : "Kataloğa Ürün Ekle"}
                  </button>
                </form>
              </div>

              {/* Product List */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-earth/10">
                  <h2 className="text-xl text-serif-elegant font-light text-anthracite">
                    Mevcut Ürünler ({products.length})
                  </h2>
                  <button 
                    onClick={fetchProducts}
                    className="text-xs tracking-wider uppercase text-earth hover:text-anthracite transition-colors"
                  >
                    Yenile
                  </button>
                </div>

                {loading ? (
                  <div className="py-20 text-center text-earth text-sm font-light">
                    Katalog yükleniyor...
                  </div>
                ) : products.length === 0 ? (
                  <div className="py-20 text-center text-earth text-sm font-light">
                    Katalogda hiç ürün bulunmuyor.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[850px] overflow-y-auto pr-2">
                    {products.map((product) => (
                      <div 
                        key={product.id} 
                        className="p-4 bg-cream border border-earth/10 flex space-x-4 items-center justify-between rounded-tr-2xl rounded-bl-2xl hover:border-earth/30 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-16 h-16 object-cover rounded-tr-lg rounded-bl-lg bg-beige/35 flex-shrink-0"
                          />
                          <div className="overflow-hidden">
                            <h4 className="text-sm font-medium text-anthracite truncate">{product.name}</h4>
                            <p className="text-xs text-wood tracking-wide uppercase mt-0.5">{product.category_name}</p>
                            <p className="text-xs text-anthracite font-semibold mt-1">₺{product.price.toLocaleString("tr-TR")}</p>
                          </div>
                        </div>
                        <div className="flex space-x-1.5 items-center flex-shrink-0">
                          <button
                            onClick={() => handleStartEdit(product)}
                            className="p-2.5 text-earth hover:text-wood hover:bg-wood/5 transition-all rounded-full flex-shrink-0"
                            title="Ürünü Düzenle"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2.5 text-earth hover:text-red-700 hover:bg-red-50 transition-all rounded-full flex-shrink-0"
                            title="Ürünü Sil"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
