const fs = require('fs');
const path = require('path');

const files = [
  'src/components/Navbar.js',
  'src/components/Footer.js',
  'src/app/layout.js',
  'src/app/page.js',
  'src/app/koleksiyon/page.js',
  'src/app/iletisim/page.js',
  'src/app/hakkimizda/page.js',
  'src/app/admin/page.js',
  'src/app/konsept/page.js'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(/AURA/g, 'BYMAN');
    content = content.replace(/Aura/g, 'Byman');
    content = content.replace(/aura/g, 'byman');
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
