/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages üzerinde https://enesdemiryurek.github.io/mobilya-sitesi/ için:
  basePath: '/mobilya-sitesi',
};

export default nextConfig;
