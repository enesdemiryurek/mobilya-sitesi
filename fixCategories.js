const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'public', 'api', 'products.json');

function slugify(text) {
    const trMap = {
        'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
        'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U'
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
        // Find the best top level category (no '>' character)
        const topLevelCats = p.rawCategories.filter(c => !c.includes('>'));
        
        let primaryCat = topLevelCats.length > 0 ? topLevelCats[0] : (p.rawCategories[0] || 'Diğer');
        // Clean up the string just in case
        primaryCat = primaryCat.split('>')[0].trim();

        p.category_name = primaryCat;
        p.category = slugify(primaryCat);
    });

    fs.writeFileSync(inputFile, JSON.stringify(products, null, 2));
    console.log("Categories fixed successfully.");
} catch (error) {
    console.error(error);
}
