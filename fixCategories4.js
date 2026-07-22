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

try {
    const rawData = fs.readFileSync(inputFile, 'utf-8');
    const products = JSON.parse(rawData);

    products.forEach(p => {
        const raw = p.rawCategories || [];
        
        let mainCategoriesMap = new Map(); // slug -> name
        let subCategoriesMap = new Map(); // slug -> name

        raw.forEach(categoryString => {
            let mainCat = "";
            let subCat = "";

            if (categoryString.includes('>')) {
                const parts = categoryString.split('>');
                mainCat = parts[0].trim();
                subCat = parts[1].trim();
            } else {
                mainCat = categoryString.trim();
            }

            const mSlug = slugify(mainCat);
            const sSlug = slugify(subCat);

            // User's requested Main Categories:
            // Ofis Mobilyaları, Ofis Masa takımları, Ofis Koltuklar, yönetici mobilyaları, Oturma grupları, depolama alanları
            
            let finalMainName = "";
            let finalMainSlug = "";
            let finalSubName = "";
            let finalSubSlug = "";

            if (mSlug === 'ofis-koltuklari') {
                finalMainName = "Ofis Koltukları";
                finalMainSlug = "ofis-koltuklari";
                if (sSlug.includes('yonetici')) {
                    finalSubName = "Yönetici Koltukları";
                    finalSubSlug = "yonetici-koltuklari";
                }
                else if (sSlug.includes('calisma')) {
                    finalSubName = "Çalışma Koltukları";
                    finalSubSlug = "calisma-koltuklari";
                }
                else if (sSlug.includes('misafir') || sSlug.includes('bekleme')) {
                    finalSubName = "Misafir ve Bekleme Koltukları";
                    finalSubSlug = "misafir-ve-bekleme-koltuklari";
                }
                else if (sSlug.includes('sinema') || sSlug.includes('konferans')) {
                    finalSubName = "Sinema Konferans Koltukları";
                    finalSubSlug = "sinema-konferans-koltuklari";
                }
            } else if (mSlug === 'masa-takimlari') {
                finalMainName = "Ofis Masa Takımları";
                finalMainSlug = "ofis-masa-takimlari";
                if (sSlug.includes('yonetici')) {
                    finalSubName = "Yönetici Masaları";
                    finalSubSlug = "yonetici-masalari";
                }
                else if (sSlug.includes('calisma')) {
                    finalSubName = "Çalışma Masaları";
                    finalSubSlug = "calisma-masalari";
                }
                else if (sSlug.includes('toplanti')) {
                    finalSubName = "Toplantı Masaları";
                    finalSubSlug = "toplanti-masalari";
                }
                else if (sSlug.includes('workstation')) {
                    finalSubName = "Workstation";
                    finalSubSlug = "workstation";
                }
            } else if (mSlug === 'ofis-mobilyalari') {
                finalMainName = "Ofis Mobilyaları";
                finalMainSlug = "ofis-mobilyalari";
                if (sSlug.includes('yonetici')) {
                    // User explicitly wants "Yönetici Mobilyaları" as a MAIN category!
                    finalMainName = "Yönetici Mobilyaları";
                    finalMainSlug = "yonetici-mobilyalari";
                    finalSubName = "";
                    finalSubSlug = "";
                }
                else if (sSlug.includes('calisma')) {
                    finalSubName = "Çalışma Mobilyaları";
                    finalSubSlug = "calisma-mobilyalari";
                }
                else if (sSlug.includes('toplanti')) {
                    finalSubName = "Toplantı Mobilyaları";
                    finalSubSlug = "toplanti-mobilyalari";
                }
                else if (sSlug.includes('keson') || sSlug.includes('etajer')) {
                    finalSubName = "Keson & Etejer";
                    finalSubSlug = "keson-etajer";
                }
                else if (sSlug.includes('sehpa')) {
                    finalSubName = "Sehpalar";
                    finalSubSlug = "sehpalar";
                }
                else if (sSlug.includes('depolama')) {
                    // Depolama belongs to Depolama Alanları
                    finalMainName = "Depolama Alanları";
                    finalMainSlug = "depolama-alanlari";
                    finalSubName = "Depolama Dolapları";
                    finalSubSlug = "depolama-dolaplari";
                }
            } else if (mSlug === 'depolama-uniteleri') {
                finalMainName = "Depolama Alanları";
                finalMainSlug = "depolama-alanlari";
            } else if (mSlug === 'kanepeler') {
                finalMainName = "Oturma Grupları";
                finalMainSlug = "oturma-gruplari";
            }

            if (finalMainName) {
                mainCategoriesMap.set(finalMainSlug, finalMainName);
            }
            if (finalSubName) {
                subCategoriesMap.set(finalSubSlug, finalSubName);
            }
        });

        // Convert Map to arrays
        p.main_categories = Array.from(mainCategoriesMap, ([slug, name]) => ({ slug, name }));
        p.sub_categories = Array.from(subCategoriesMap, ([slug, name]) => ({ slug, name }));

        // For backward compatibility (using the first one found if needed)
        if (p.main_categories.length > 0) {
            p.main_category = p.main_categories[0].slug;
            p.main_category_name = p.main_categories[0].name;
            p.category = p.main_categories[0].slug;
            p.category_name = p.main_categories[0].name;
        }
        if (p.sub_categories.length > 0) {
            p.sub_category = p.sub_categories[0].slug;
            p.sub_category_name = p.sub_categories[0].name;
        }
    });

    fs.writeFileSync(inputFile, JSON.stringify(products, null, 2));
    console.log("Categories restructured to allow multiple categories per product.");
} catch (error) {
    console.error(error);
}
