const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'public', 'api', 'products.json');

function slugify(text) {
    if (!text) return "";
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

function titleCase(str) {
    if (!str) return "";
    return str.toLowerCase().split(' ').map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

try {
    const rawData = fs.readFileSync(inputFile, 'utf-8');
    const products = JSON.parse(rawData);

    products.forEach(p => {
        const raw = p.rawCategories || [];
        
        let mainCat = "";
        let subCat = "";

        // Attempt to find a categorized string with ">" to split
        let hierarchical = raw.find(r => r.includes('>'));
        
        if (hierarchical) {
            const parts = hierarchical.split('>');
            mainCat = parts[0].trim();
            subCat = parts[1].trim();
        } else {
            // No hierarchy, just use the first item as main category
            mainCat = raw[0] || "Diğer";
            subCat = "";
        }

        const mSlug = slugify(mainCat);
        const sSlug = slugify(subCat);

        if (mSlug === 'ofis-koltuklari') {
            mainCat = "Ofis Koltukları";
            if (sSlug.includes('yonetici')) subCat = "Yönetici Koltukları";
            else if (sSlug.includes('calisma')) subCat = "Çalışma Koltukları";
            else if (sSlug.includes('misafir') || sSlug.includes('bekleme')) subCat = "Misafir ve Bekleme Koltukları";
            else if (sSlug.includes('sinema') || sSlug.includes('konferans')) subCat = "Sinema Konferans Koltukları";
        } else if (mSlug === 'masa-takimlari') {
            mainCat = "Masa Takımları";
            if (sSlug.includes('yonetici')) subCat = "Yönetici Masaları";
            else if (sSlug.includes('calisma')) subCat = "Çalışma Masaları";
            else if (sSlug.includes('toplanti')) subCat = "Toplantı Masaları";
            else if (sSlug.includes('workstation')) subCat = "Workstation";
        } else if (mSlug === 'ofis-mobilyalari') {
            mainCat = "Ofis Mobilyaları";
            if (sSlug.includes('yonetici')) subCat = "Yönetici Mobilyaları";
            else if (sSlug.includes('calisma')) subCat = "Çalışma Mobilyaları";
            else if (sSlug.includes('toplanti')) subCat = "Toplantı Mobilyaları";
            else if (sSlug.includes('keson') || sSlug.includes('etajer')) subCat = "Keson & Etejer";
            else if (sSlug.includes('sehpa')) subCat = "Sehpalar";
            else if (sSlug.includes('depolama')) subCat = "Depolama Dolapları";
        } else if (mSlug === 'depolama-uniteleri') {
            mainCat = "Depolama Üniteleri";
        } else if (mSlug === 'askilik') {
            mainCat = "Askılık";
        } else if (mSlug === 'kanepeler') {
            mainCat = "Kanepeler";
        }

        p.main_category_name = mainCat;
        p.main_category = slugify(mainCat);
        p.sub_category_name = subCat;
        p.sub_category = slugify(subCat);
        
        // Ensure backwards compatibility with frontend in case
        p.category_name = mainCat;
        p.category = slugify(mainCat);
    });

    fs.writeFileSync(inputFile, JSON.stringify(products, null, 2));
    console.log("Categories restructured to hierarchical Main/Sub format.");
} catch (error) {
    console.error(error);
}
