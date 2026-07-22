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

if (!isset($_FILES['file'])) {
    echo json_encode(["status" => "error", "message" => "Yüklenecek dosya bulunamadı."], JSON_UNESCAPED_UNICODE);
    exit;
}

$file = $_FILES['file'];
$uploadDir = __DIR__ . '/../uploads/';

// Klasör yoksa oluştur
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

if (!in_array($ext, $allowed)) {
    echo json_encode(["status" => "error", "message" => "Yalnızca görsel dosyaları (jpg, jpeg, png, webp, gif) yüklenebilir."], JSON_UNESCAPED_UNICODE);
    exit;
}

// Güvenli benzersiz dosya adı oluştur
$fileName = uniqid('img_', true) . '.' . $ext;
$targetFile = $uploadDir . $fileName;

if (move_uploaded_file($file['tmp_name'], $targetFile)) {
    echo json_encode([
        "status" => "success", 
        "message" => "Görsel başarıyla yüklendi.", 
        "url" => "/uploads/" . $fileName
    ], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["status" => "error", "message" => "Dosya sunucuya kaydedilirken hata oluştu."], JSON_UNESCAPED_UNICODE);
}
?>
