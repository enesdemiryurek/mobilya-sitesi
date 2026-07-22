<?php
// Set headers for CORS and JSON content
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Optional: Enable error reporting for debugging
ini_set('display_errors', 0);
error_reporting(E_ALL);

$jsonFile = __DIR__ . '/products.json';

// Fallback products array
$fallbackProducts = [
    [
        "id" => 1,
        "name" => "Solenne Bouclé Tekli Koltuk",
        "category" => "oturma",
        "category_name" => "Oturma Odası",
        "price" => 14500,
        "image" => "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800",
        "image2" => "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800",
        "image3" => "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800",
        "description" => "Fildişi rengi ithal boucle kumaş kaplı, yuvarlak formlu tasarım koltuk. Masif gürgen iç iskeleti ile uzun ömürlü konfor ve dayanıklılık sunar.",
        "dimensions" => "80cm G x 85cm D x 72cm Y"
    ],
    [
        "id" => 2,
        "name" => "Monolith Doğal Mermer Yemek Masası",
        "category" => "yemek",
        "category_name" => "Yemek Odası",
        "price" => 38200,
        "image" => "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?q=80&w=800",
        "image2" => "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=800",
        "image3" => "https://images.unsplash.com/photo-1617806118233-18e1db207f62?q=80&w=1000&auto=format&fit=crop",
        "description" => "Blok traverten mermerden işlenmiş, heykelsi ayak yapısına sahip lüks yemek masası. 6-8 kişilik oturum kapasitesi ile yaşam alanlarınıza mimari bir kimlik kazandırır.",
        "dimensions" => "200cm G x 100cm D x 75cm Y"
    ],
    [
        "id" => 3,
        "name" => "Soma Ceviz Konsol",
        "category" => "yemek",
        "category_name" => "Yemek Odası",
        "price" => 24600,
        "image" => "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800",
        "image2" => "https://images.unsplash.com/photo-1602872030219-c1650247dec5?q=80&w=800",
        "image3" => "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop",
        "description" => "Doğal Amerikan ceviz kaplama gövde and mat siyah metal ayaklar. Dokunmatik açılır kapak sistemi ile minimalist depolama ve rafine detaylar.",
        "dimensions" => "190cm G x 48cm D x 78cm Y"
    ],
    [
        "id" => 4,
        "name" => "Nirvana Ahşap Yatak Başlığı",
        "category" => "yatak",
        "category_name" => "Yatak Odası",
        "price" => 18900,
        "image" => "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800",
        "image2" => "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1000&auto=format&fit=crop",
        "image3" => "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800",
        "description" => "Masif meşe çıtalardan el işçiliğiyle üretilmiş, arkasında gizlenmiş entegre sıcak LED aydınlatmalı premium yatak başlığı ve karyola bazası.",
        "dimensions" => "200cm G x 215cm D x 130cm Y"
    ],
    [
        "id" => 5,
        "name" => "Zenith Üfleme Cam Lambader",
        "category" => "aydinlatma",
        "category_name" => "Aydınlatma",
        "price" => 7800,
        "image" => "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800",
        "image2" => "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop",
        "image3" => "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?q=80&w=800",
        "description" => "Füme renkli el üflemesi cam küre başlık ve fırçalanmış pirinç gövde. Kademeli ışık ayarlı dimmer kontrolü ile sıcak bir ambiyans aydınlatması sunar.",
        "dimensions" => "35cm Çap x 160cm Y"
    ],
    [
        "id" => 6,
        "name" => "Lotus Seramik Vazo Seti",
        "category" => "aksesuar",
        "category_name" => "Aksesuar",
        "price" => 3200,
        "image" => "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=800",
        "image2" => "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=800",
        "image3" => "https://images.unsplash.com/photo-1581641841257-e190a7b2efde?q=80&w=800&auto=format&fit=crop",
        "description" => "Toprak tonlarında pürüzlü kum yüzeyli, el yapımı 3'lü seramik vazo seti. Yaşam alanlarında Wabi-sabi estetiğini yansıtır.",
        "dimensions" => "15cm, 22cm ve 28cm Yükseklikler"
    ],
    [
        "id" => 7,
        "name" => "Pebble Bouclé Puf",
        "category" => "aksesuar",
        "category_name" => "Aksesuar",
        "price" => 5400,
        "image" => "https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=800",
        "image2" => "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=800",
        "image3" => "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop",
        "description" => "Dere taşlarının pürüzsüz kavislerinden esinlenilerek şekillendirilen, kaliteli fildişi boucle kumaş kaplı, çok yönlü dekoratif oturma elemanı.",
        "dimensions" => "60cm G x 50cm D x 42cm Y"
    ],
    [
        "id" => 8,
        "name" => "Umbra Hasırlı Ahşap Şifonyer",
        "category" => "yatak",
        "category_name" => "Yatak Odası",
        "price" => 16500,
        "image" => "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800",
        "image2" => "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800",
        "image3" => "https://images.unsplash.com/photo-1602872030219-c1650247dec5?q=80&w=800&auto=format&fit=crop",
        "description" => "Masif meşe çerçeve üzerine el örgüsü doğal hazıran (rattan) çekmece kapakları. Sıcak ve vintage esintili modern depolama ünitesi.",
        "dimensions" => "90cm G x 45cm D x 100cm Y"
    ]
];

// Load products
if (file_exists($jsonFile)) {
    $jsonContent = file_get_contents($jsonFile);
    $products = json_decode($jsonContent, true);
    if (!is_array($products)) {
        $products = $fallbackProducts;
    }
} else {
    // Write defaults to file
    file_put_contents($jsonFile, json_encode($fallbackProducts, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    $products = $fallbackProducts;
}

// Convert prices to numeric clean values if they are stored as strings (e.g. ₺18.500 to 18500)
foreach ($products as &$p) {
    if (is_string($p['price'])) {
        $cleanPrice = preg_replace('/[^\d]/', '', $p['price']);
        $p['price'] = (int)$cleanPrice;
    }
}
unset($p);

// Check if a category filter is requested via GET parameters
$filteredProducts = [];
$categoryFilter = isset($_GET['cat']) ? strtolower(trim($_GET['cat'])) : '';

if ($categoryFilter && $categoryFilter !== 'all') {
    foreach ($products as $product) {
        if (isset($product['category']) && $product['category'] === $categoryFilter) {
            $filteredProducts[] = $product;
        }
    }
} else {
    $filteredProducts = $products;
}

// Return the output in JSON format
echo json_encode([
    "status" => "success",
    "total" => count($filteredProducts),
    "data" => $filteredProducts
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
