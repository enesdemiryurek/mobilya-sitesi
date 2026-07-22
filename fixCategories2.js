const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'public', 'api', 'products.json');

function slugify(text) {
    const trMap = {
        'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
        'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U',
        '&': 've'
    };
    for (let key in trMap) {
        text = text.replace(new RegExp(key, 'g'), trMap[key]);
    }
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

try {
    const rawData = fs.readFileSync(inputFile, 'utf-8');
    const products = JSON.parse(rawData);

    products.forEach(p => {
        const raw = (p.rawCategories || []).join(' ').toUpperCase();
        let catName = "Diğer";

        if (raw.includes('YÖNETİCİ')) catName = 'Yönetici Mobilyaları';
        else if (raw.includes('ÇALIŞMA') && !raw.includes('KOLTUK')) catName = 'Çalışma Mobilyaları';
        else if (raw.includes('TOPLANTI')) catName = 'Toplantı Mobilyaları';
        else if (raw.includes('WORKSTATİON')) catName = 'WorkStation';
        else if (raw.includes('MASA TAKIMLARI')) catName = 'Masa Takımları';
        else if (raw.includes('KOLTUK')) catName = 'Koltuklar';
        else if (raw.includes('KANEPE')) catName = 'Kanepeler';
        else if (raw.includes('DEPOLAMA')) catName = 'Depolama Dolapları';
        else if (raw.includes('KESON') || raw.includes('ETAJER') || raw.includes('SEHPA') || raw.includes('ASKILIK')) catName = 'Keson & Etejer & Tamamlayıcılar';
        else if (raw.includes('MASA')) catName = 'Masa Takımları'; // fallback
        else catName = 'Keson & Etejer & Tamamlayıcılar'; // fallback

        p.category_name = catName;
        p.category = slugify(catName);
    });

    fs.writeFileSync(inputFile, JSON.stringify(products, null, 2));
    console.log("Categories fixed to match UI requirements successfully.");
} catch (error) {
    console.error(error);
}
