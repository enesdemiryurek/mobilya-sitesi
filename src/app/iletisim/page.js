"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Check } from "lucide-react";

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    spaceType: "Yönetici Takımları",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate database query/mail sending
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        spaceType: "Yönetici Takımları",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="bg-cream min-h-screen pt-28 pb-24">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 mb-20 text-center">
        <span className="text-xs uppercase text-sans-clean tracking-[0.3em] text-earth block mb-4">
          Bize Ulaşın
        </span>
        <h1 className="text-4xl md:text-6xl text-serif-elegant font-light text-anthracite leading-tight mb-4">
          İletişim & Randevu
        </h1>
        <p className="text-sm text-earth max-w-lg mx-auto font-light leading-relaxed">
          Yaşam alanınızı baştan tasarlamak veya koleksiyonumuz hakkında bilgi almak için bizimle iletişime geçin.
        </p>
        <div className="luxury-line w-24 mx-auto mt-8"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Contact Details & Map */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* Info Cards */}
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl text-serif-elegant font-light text-anthracite">
                Byman Ankara Merkez Fabrika & Showroom
              </h2>
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-center space-x-6 p-6 border border-anthracite bg-white hover:shadow-lg transition-shadow duration-300">
                  <div className="p-3 bg-anthracite text-white flex items-center justify-center flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm text-sans-clean uppercase tracking-wider font-bold text-anthracite mb-1">
                      Telefon
                    </h3>
                    <p className="text-lg text-anthracite font-medium">+90 (312) 123 45 67</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-6 p-6 border border-anthracite bg-white hover:shadow-lg transition-shadow duration-300">
                  <div className="p-3 bg-anthracite text-white flex items-center justify-center flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm text-sans-clean uppercase tracking-wider font-bold text-anthracite mb-1">
                      E-posta
                    </h3>
                    <p className="text-lg text-anthracite font-medium">info@bymandesign.com</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center space-x-6 p-6 border border-anthracite bg-white hover:shadow-lg transition-shadow duration-300">
                  <div className="p-3 bg-anthracite text-white flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm text-sans-clean uppercase tracking-wider font-bold text-anthracite mb-1">
                      Adres
                    </h3>
                    <p className="text-base text-anthracite font-medium leading-relaxed">
                      Mustafa Kemal Mah. Dumlupınar Blv. No: 274,<br />
                      Çankaya, Ankara
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-center space-x-6 p-6 border border-anthracite bg-white hover:shadow-lg transition-shadow duration-300">
                  <div className="p-3 bg-anthracite text-white flex items-center justify-center flex-shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm text-sans-clean uppercase tracking-wider font-bold text-anthracite mb-1">
                      Çalışma Saatleri
                    </h3>
                    <p className="text-base text-anthracite font-medium">Pzt - Cmt: 09:00 - 19:00</p>
                    <p className="text-sm text-anthracite/70 font-light mt-0.5">Pazar günleri kapalıdır.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="luxury-line"></div>

            {/* Stylized Luxury Map Integration */}
            <div className="space-y-4">
              <h3 className="text-xs text-sans-clean uppercase tracking-wider font-semibold text-anthracite">
                Konum
              </h3>
              <div className="relative w-full h-[250px] bg-beige border border-earth/10 flex flex-col justify-center items-center p-6 text-center overflow-hidden">
                {/* Minimalist Grid Pattern for Map styling */}
                <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#1C1C1C_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>
                <div className="absolute inset-x-0 h-px bg-earth/10 top-1/3"></div>
                <div className="absolute inset-x-0 h-px bg-earth/10 top-2/3"></div>
                <div className="absolute inset-y-0 w-px bg-earth/10 left-1/3"></div>
                <div className="absolute inset-y-0 w-px bg-earth/10 left-2/3"></div>
                
                {/* Stylized pin pointer */}
                <div className="relative z-10 space-y-3">
                  <div className="inline-flex p-3 rounded-full bg-cream shadow-md border border-earth/15 animate-bounce">
                    <MapPin size={20} className="text-wood" />
                  </div>
                  <h4 className="text-sm font-semibold text-anthracite tracking-wide">Byman Fabrika & Showroom Ankara</h4>
                  <p className="text-xs text-earth max-w-xs font-light">Eskişehir Yolu üzerinden kolay ulaşım imkanı.</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 text-[10px] text-sans-clean uppercase tracking-widest text-wood hover:text-anthracite border-b border-wood hover:border-anthracite pb-0.5 transition-all duration-300"
                  >
                    Google Haritalarda Aç
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-beige/30 p-8 md:p-12 border border-earth/10">
            <h2 className="text-2xl text-serif-elegant font-light text-anthracite mb-8">
              Tasarım Talebi Gönderin
            </h2>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name Input */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] text-sans-clean uppercase tracking-widest text-earth font-semibold">
                      Adınız & Soyadınız
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-transparent border-b border-earth/30 focus:border-anthracite text-sm py-2 text-anthracite focus:outline-none transition-colors duration-300"
                      placeholder="Örn: Selin Yılmaz"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Email Input */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] text-sans-clean uppercase tracking-widest text-earth font-semibold">
                        E-posta Adresiniz
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-transparent border-b border-earth/30 focus:border-anthracite text-sm py-2 text-anthracite focus:outline-none transition-colors duration-300"
                        placeholder="selin@example.com"
                      />
                    </div>

                    {/* Phone Input */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] text-sans-clean uppercase tracking-widest text-earth font-semibold">
                        Telefon Numarası
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-transparent border-b border-earth/30 focus:border-anthracite text-sm py-2 text-anthracite focus:outline-none transition-colors duration-300"
                        placeholder="+90 (555) 000 00 00"
                      />
                    </div>
                  </div>

                  {/* Project Space Dropdown */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] text-sans-clean uppercase tracking-widest text-earth font-semibold">
                      İlgi Duyduğunuz Alan
                    </label>
                    <select
                      value={formData.spaceType}
                      onChange={(e) => setFormData({ ...formData, spaceType: e.target.value })}
                      className="bg-transparent border-b border-earth/30 focus:border-anthracite text-sm py-2 text-anthracite focus:outline-none cursor-pointer transition-colors duration-300"
                    >
                      <option value="Yönetici Takımları" className="bg-cream text-anthracite">Yönetici Takımları</option>
                      <option value="Toplantı & Çalışma Masaları" className="bg-cream text-anthracite">Toplantı & Çalışma Masaları</option>
                      <option value="Açık Ofis & İş İstasyonları" className="bg-cream text-anthracite">Açık Ofis & İş İstasyonları</option>
                      <option value="Ofis Koltukları & Bekleme" className="bg-cream text-anthracite">Ofis Koltukları & Bekleme</option>
                      <option value="Komple Ofis Projesi" className="bg-cream text-anthracite">Komple Ofis Projesi</option>
                    </select>
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] text-sans-clean uppercase tracking-widest text-earth font-semibold">
                      Mesajınız / Tasarım Hayaliniz
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-transparent border-b border-earth/30 focus:border-anthracite text-sm py-2 text-anthracite focus:outline-none resize-none transition-colors duration-300"
                      placeholder="Bize projenizden ve isteklerinizden bahsedin..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center space-x-3 px-8 py-4 text-xs text-sans-clean uppercase tracking-widest bg-anthracite text-cream hover:bg-wood hover:text-cream transition-colors duration-500 disabled:bg-earth/40 disabled:cursor-not-allowed shadow-lg"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin"></div>
                        <span>Gönderiliyor...</span>
                      </>
                    ) : (
                      <>
                        <span>Tasarım Talebini İlet</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Animated Success State */
                <div
                  className="py-16 text-center flex flex-col items-center justify-center space-y-6"
                >
                  <div className="p-4 bg-wood/10 rounded-full text-wood">
                    <Check size={40} />
                  </div>
                  <h3 className="text-2xl text-serif-elegant font-light text-anthracite">
                    Talebiniz Alındı
                  </h3>
                  <p className="text-sm text-earth font-light leading-relaxed max-w-sm">
                    Tasarım vizyonunuz ekibimize ulaştı. En kısa sürede (genellikle 24 saat içinde) sizinle iletişime geçeceğiz.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 text-xs text-sans-clean uppercase tracking-widest border border-earth/30 hover:border-anthracite text-earth hover:text-anthracite transition-colors duration-300"
                  >
                    Yeni Talep Gönder
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
