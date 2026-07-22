"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const brandValues = [
  {
    number: "01",
    title: "Yenilikçi Üretim",
    desc: "Her bir ofis mobilyamız, modern teknoloji ve yılların deneyimine sahip ustalarımız tarafından kusursuzca şekillendirilir. Çalışma alanlarına özel, uzun ömürlü ve inovatif çözümler üretiyoruz."
  },
  {
    number: "02",
    title: "Kurumsal İtibar",
    desc: "Bizce prestij; gösterişli detaylarda değil, kaliteli malzemede, ergonomik tasarımda ve minimalist oranlarda gizlidir. Firmanızın gücünü yansıtan, asil ve profesyonel bir duruş."
  },
  {
    number: "03",
    title: "Sürdürülebilir Ofisler",
    desc: "Üretim süreçlerimizde ve malzeme seçimlerimizde çevreye duyarlı yaklaşımları benimsiyoruz. Geleceğin çalışma alanlarını tasarlarken doğaya saygı duyuyor, ekolojik ayak izimizi küçültüyoruz."
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function HakkimizdaPage() {
  return (
    <div className="bg-cream min-h-screen pt-28">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          <span className="text-xs uppercase text-sans-clean tracking-[0.3em] text-earth block">
            Hikayemiz
          </span>
          <h1 className="text-4xl md:text-6xl text-serif-elegant font-light text-anthracite leading-tight">
            Verimli Çalışma Alanları, Kurumsal Kimliğe Saygı
          </h1>
          <div className="luxury-line w-24 mx-auto my-6"></div>
        </motion.div>
      </section>

      {/* Story Content Block */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Editorial Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 bg-beige/30 p-4 border border-earth/10"
          >
            <img
              src="/hakkimizda-hikaye.jpg"
              alt="Byman Ofis Mobilyaları Fabrikası"
              className="w-full h-auto object-cover aspect-[4/5]"
            />
          </motion.div>

          {/* Story Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <h2 className="text-2xl md:text-3xl text-serif-elegant font-light text-anthracite">
              Çalışma Hayatına Değer Katma Tutkusuyla Başladık
            </h2>
            <p className="text-sm md:text-base text-earth leading-relaxed font-medium font-sans">
              Kurumsal markaların ofis ihtiyaçlarını yenilikçi tasarımlarla buluşturmak amacıyla Ankara'da yola çıktık. Amacımız, sıradan çalışma alanlarını, çalışanların potansiyelini artıran ve şirket vizyonunu yansıtan prestijli mekanlara dönüştürmekti. İş yerlerinin sadece birer ofis değil, şirket kültürünün kalbi olduğuna inandık.
            </p>
            <p className="text-sm md:text-base text-earth leading-relaxed font-medium font-sans">
              Tasarım dilimizi şekillendirirken modern kurumsal ihtiyaçlar ile ergonominin kusursuz dengesini kurmaya odaklandık. Bizim için dayanıklı bir ofis masası veya omurgayı destekleyen bir koltuk sadece bir eşya değil, iş verimliliğine yapılan en büyük yatırımdır.
            </p>
            <p className="text-sm md:text-base text-earth leading-relaxed font-medium font-sans">
              Bugün gelişmiş üretim tesisimizde, kişiye ve kuruma özel anahtar teslim ofis çözümleri üretmeye, iş dünyasına estetik ve fonksiyonellik katmaya devam ediyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Craftsmanship Parallax Divider */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('/malzeme-ahsap.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="relative z-20 text-center text-cream px-6 max-w-2xl space-y-4">
          <span className="text-[10px] text-sans-clean tracking-[0.3em] uppercase text-wood font-semibold block">
            Üretim Gücümüz
          </span>
          <h3 className="text-3xl md:text-5xl text-serif-elegant font-light leading-tight">
            Modern Teknoloji ve Kusursuz İşçilik
          </h3>
          <p className="text-sm md:text-base text-cream/80 font-medium max-w-lg mx-auto font-sans leading-relaxed">
            Fabrikamızdaki modern üretim hatlarından çıkan her bir parça, kalite standartlarımıza duyduğumuz bağlılığın ve kurumsal işçiliğe olan sarsılmaz inancımızın bir ifadesidir.
          </p>
        </div>
      </section>

      {/* Brand Values Grid */}
      <section className="py-24 md:py-36 bg-beige/35 border-b border-earth/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-xl mx-auto mb-20">
            <span className="text-xs uppercase text-sans-clean tracking-[0.25em] text-earth block mb-4">
              İlkelerimiz
            </span>
            <h2 className="text-3xl md:text-4xl text-serif-elegant font-light text-anthracite">
              Bizi Var Eden Değerler
            </h2>
            <div className="luxury-line w-20 mx-auto my-4"></div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            {brandValues.map((value, index) => (
              <motion.div
                variants={fadeInUp}
                key={index}
                className="bg-cream border border-earth/10 p-8 md:p-10 flex flex-col space-y-6 hover:shadow-lg transition-shadow duration-500 rounded-none relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 text-7xl font-light text-earth/10 group-hover:text-wood/25 transition-colors duration-500 text-serif-elegant">
                  {value.number}
                </div>
                <h3 className="text-xl text-serif-elegant font-light text-anthracite z-10">
                  {value.title}
                </h3>
                <p className="text-sm text-earth leading-relaxed font-light font-sans z-10">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Action Teaser */}
      <section className="py-20 text-center max-w-4xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl text-serif-elegant font-light text-anthracite mb-8">
          Ofisinizi Birlikte Yeniden Kurgulayalım
        </h2>
        <Link
          href="/iletisim"
          className="inline-flex items-center space-x-3 px-8 py-4 text-xs text-sans-clean uppercase tracking-widest bg-anthracite text-cream hover:bg-wood transition-colors duration-500 shadow-md"
        >
          <span>Bilgi Alın</span>
          <ArrowUpRight size={14} />
        </Link>
      </section>
    </div>
  );
}
