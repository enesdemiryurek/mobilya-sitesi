import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "BYMAN | Lüks Ofis Mobilyaları & Kurumsal Tasarım",
  description: "Modern, minimalist ve lüks ofis mobilyaları. Kurumsal kimliğinizi yansıtan çalışma alanları ve yönetici takımlarıyla ofisinizi kusursuzlaştırın.",
  keywords: ["ofis mobilyaları", "yönetici takımı", "ofis koltuğu", "toplantı masası", "lüks ofis tasarımı", "kurumsal mobilya"],
  authors: [{ name: "BYMAN Design" }],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${playfair.variable} ${plusJakarta.variable} scroll-smooth h-full`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('byman-theme');
                  if (theme) {
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-cream text-anthracite font-sans min-h-screen flex flex-col justify-between selection:bg-wood selection:text-cream">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <FloatingContact />
        <Footer />
      </body>
    </html>
  );
}
