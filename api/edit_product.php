<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Geçersiz istek metodu."], JSON_UNESCAPED_UNICODE);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

if (!$input || empty($input['id']) || empty($input['name']) || empty($input['category'])) {
    echo json_encode(["status" => "error", "message" => "Kimlik (id), isim ve kategori zorunludur."], JSON_UNESCAPED_UNICODE);
    exit;
}

$jsonFile = __DIR__ . '/products.json';
$products = [];

if (file_exists($jsonFile)) {
    $products = json_decode(file_get_contents($jsonFile), true);
    if (!is_array($products)) {
        $products = [];
      }
}

$targetId = (int)$input['id'];
$foundIndex = -1;

for ($i = 0; $i < count($products); $i++) {
    if ((int)$products[$i]['id'] === $targetId) {
        $foundIndex = $i;
        break;
    }
}

if ($foundIndex === -1) {
    echo json_encode(["status" => "error", "message" => "Düzenlenecek ürün bulunamadı."], JSON_UNESCAPED_UNICODE);
    exit;
}

$categoryNames = [
    "oturma" => "Oturma Odası",
    "yemek" => "Yemek Odası",
    "yatak" => "Yatak Odası",
    "aydinlatma" => "Aydınlatma",
    "aksesuar" => "Aksesuar"
];
$categoryKey = strtolower(trim($input['category']));
$categoryName = isset($categoryNames[$categoryKey]) ? $categoryNames[$categoryKey] : ucfirst($categoryKey);

$sanitizeImage = function($img) {
    if (!$img) return "";
    $img = trim($img);
    if (strpos($img, 'data:image/') === 0 || strpos($img, '/uploads/') === 0 || strpos($img, 'http') === 0) {
        return $img;
    }
    return filter_var($img, FILTER_SANITIZE_URL);
};

// Handle images array
$images = [];
if (isset($input['images']) && is_array($input['images'])) {
    foreach ($input['images'] as $img) {
        $san = $sanitizeImage($img);
        if ($san) $images[] = $san;
    }
}

// Fallback to primary images if array is empty
if (empty($images)) {
    if (isset($input['image'])) $images[] = $sanitizeImage($input['image']);
    if (isset($input['image2'])) $images[] = $sanitizeImage($input['image2']);
    if (isset($input['image3'])) $images[] = $sanitizeImage($input['image3']);
    $images = array_filter($images);
}

$updatedProduct = [
    "id" => $targetId,
    "name" => htmlspecialchars($input['name']),
    "category" => $categoryKey,
    "category_name" => $categoryName,
    "price" => isset($input['price']) ? (int)$input['price'] : 0,
    "image" => !empty($images) ? $images[0] : "",
    "image2" => count($images) > 1 ? $images[1] : (!empty($images) ? $images[0] : ""),
    "image3" => count($images) > 2 ? $images[2] : "",
    "images" => array_values($images),
    "description" => isset($input['description']) ? htmlspecialchars($input['description']) : "",
    "dimensions" => isset($input['dimensions']) ? htmlspecialchars($input['dimensions']) : ""
];

$products[$foundIndex] = $updatedProduct;

if (file_put_contents($jsonFile, json_encode($products, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT))) {
    echo json_encode(["status" => "success", "message" => "Ürün başarıyla güncellendi.", "data" => $updatedProduct], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["status" => "error", "message" => "products.json dosyasına yazılamadı."], JSON_UNESCAPED_UNICODE);
}
?>
