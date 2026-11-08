<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "Method not allowed"]);
    exit;
}

// Get POST JSON data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!isset($data['text'])) {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => "Missing text parameter"]);
    exit;
}

// Credentials live outside the repository: copy config.example.php to config.php
// and put the real bot token / chat id there (or set TELEGRAM_BOT_TOKEN /
// TELEGRAM_CHAT_ID environment variables).
$configPath = __DIR__ . '/config.php';
if (is_file($configPath)) {
    require $configPath;
}

$token = getenv('TELEGRAM_BOT_TOKEN') ?: ($telegramBotToken ?? '');
$chat_id = getenv('TELEGRAM_CHAT_ID') ?: ($telegramChatId ?? '');

if ($token === '' || $chat_id === '') {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "Telegram credentials are not configured"]);
    exit;
}

$text = $data['text'];

$url = "https://api.telegram.org/bot" . $token . "/sendMessage";
$postData = [
    'chat_id' => $chat_id,
    'text' => $text
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Ignore SSL verify issues on some hostings

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($response === false) {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "cURL error: " . $error]);
    exit;
}

http_response_code($httpCode);
echo $response;
