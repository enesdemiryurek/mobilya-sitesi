/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages üzerinde yayınlamak için production'da repo adını kullan, local dev için boş bırak:
  basePath: process.env.NODE_ENV === 'production' ? '/mobilya-sitesi' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NODE_ENV === 'production' ? '/mobilya-sitesi' : '',
  }
};

export default nextConfig;
