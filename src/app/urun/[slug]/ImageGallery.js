"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-beige/30 rounded-tr-[3rem] rounded-bl-[3rem] flex items-center justify-center">
        <span className="text-earth text-sm font-light">Görsel bulunamadı</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 sticky top-32">
      {/* Main Image */}
      <div className="w-full aspect-square bg-beige/25 relative rounded-tr-[4rem] rounded-bl-[4rem] overflow-hidden shadow-lg border border-earth/10 group">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            alt="Product visual"
            className="w-full h-full object-cover absolute inset-0 z-0"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto py-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-tr-xl rounded-bl-xl overflow-hidden transition-all duration-300 border-2 ${
                activeIndex === idx
                  ? "border-wood scale-100 opacity-100 shadow-md"
                  : "border-transparent opacity-60 hover:opacity-100 hover:scale-95"
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
