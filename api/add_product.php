<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Invalid request method."], JSON_UNESCAPED_UNICODE);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

if (!$input || empty($input['name']) || empty($input['category'])) {
    echo json_encode(["status" => "error", "message" => "Name and category are required fields."], JSON_UNESCAPED_UNICODE);
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

// Generate new ID
$maxId = 0;
foreach ($products as $p) {
    if (isset($p['id']) && $p['id'] > $maxId) {
        $maxId = $p['id'];
    }
}
$newId = $maxId + 1;

// Set category names based on key
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

// Fallback if empty
if (empty($images)) {
    if (isset($input['image'])) $images[] = $sanitizeImage($input['image']);
    if (isset($input['image2'])) $images[] = $sanitizeImage($input['image2']);
    if (isset($input['image3'])) $images[] = $sanitizeImage($input['image3']);
    $images = array_filter($images);
}

$newProduct = [
    "id" => $newId,
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

$products[] = $newProduct;

if (file_put_contents($jsonFile, json_encode($products, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT))) {
    echo json_encode(["status" => "success", "message" => "Product added successfully.", "data" => $newProduct], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to write data to products.json file."], JSON_UNESCAPED_UNICODE);
}
?>
