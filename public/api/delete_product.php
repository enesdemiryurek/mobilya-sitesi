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

if (!$input || !isset($input['id'])) {
    echo json_encode(["status" => "error", "message" => "Product ID is required."], JSON_UNESCAPED_UNICODE);
    exit;
}

$productId = (int)$input['id'];
$jsonFile = __DIR__ . '/products.json';

if (!file_exists($jsonFile)) {
    echo json_encode(["status" => "error", "message" => "Database file products.json not found."], JSON_UNESCAPED_UNICODE);
    exit;
}

$products = json_decode(file_get_contents($jsonFile), true);
if (!is_array($products)) {
    echo json_encode(["status" => "error", "message" => "Invalid database file structure."], JSON_UNESCAPED_UNICODE);
    exit;
}

$updatedProducts = [];
$found = false;

foreach ($products as $p) {
    if (isset($p['id']) && (int)$p['id'] === $productId) {
        $found = true;
    } else {
        $updatedProducts[] = $p;
    }
}

if (!$found) {
    echo json_encode(["status" => "error", "message" => "Product with ID $productId not found."], JSON_UNESCAPED_UNICODE);
    exit;
}

if (file_put_contents($jsonFile, json_encode($updatedProducts, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT))) {
    echo json_encode(["status" => "success", "message" => "Product deleted successfully."], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update database file after deletion."], JSON_UNESCAPED_UNICODE);
}
?>
