<?php
// Buffer everything: a stray BOM from config.php must not break headers or
// HTTP status codes (shared hosting is picky about this).
ob_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

/**
 * Send a JSON response and drop anything that leaked into the output buffer
 * (BOM, PHP notices, etc.).
 */
function rmp_respond($status, array $payload)
{
    while (ob_get_level() > 0) {
        ob_end_clean();
    }
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    rmp_respond(200, ["ok" => true]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    rmp_respond(405, ["ok" => false, "error" => "Method not allowed"]);
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data) || !isset($data['text']) || trim((string)$data['text']) === '') {
    rmp_respond(400, ["ok" => false, "error" => "Missing text parameter"]);
}

$text = trim((string)$data['text']);

// Credentials live outside the repository: copy config.example.php to config.php
// and put the real values there (or set the matching environment variables).
$configPath = __DIR__ . '/config.php';
if (is_file($configPath)) {
    require $configPath;
}

$token = getenv('TELEGRAM_BOT_TOKEN');
if ($token === false || $token === '') {
    $token = isset($telegramBotToken) ? (string)$telegramBotToken : '';
}

$chatId = getenv('TELEGRAM_CHAT_ID');
if ($chatId === false || $chatId === '') {
    $chatId = isset($telegramChatId) ? (string)$telegramChatId : '';
}

$contactEmail = getenv('CONTACT_EMAIL');
if ($contactEmail === false || $contactEmail === '') {
    $contactEmail = isset($contactEmailAddress) ? (string)$contactEmailAddress : 'hello@ragemedia.ru';
}

$proxy = getenv('TELEGRAM_PROXY');
if ($proxy === false) {
    $proxy = '';
}
if ($proxy === '' && isset($telegramProxy)) {
    $proxy = (string)$telegramProxy;
}

$errors = [];

// Telegram rejects messages longer than 4096 characters.
$telegramText = $text;
if (function_exists('mb_strlen') && mb_strlen($telegramText, 'UTF-8') > 3900) {
    $telegramText = mb_substr($telegramText, 0, 3900, 'UTF-8') . "\n…";
}

$telegramOk = false;
if ($token !== '' && $chatId !== '') {
    $telegramOk = rmp_send_telegram($token, $chatId, $telegramText, $proxy, $errors);
} else {
    $errors[] = 'telegram: credentials are not configured';
}

// Telegram is often unreachable from Russian hosting, so fall back to email
// instead of losing the request.
$emailOk = false;
if (!$telegramOk && $contactEmail !== '') {
    $emailOk = rmp_send_email($contactEmail, $text, $errors);
}

if ($telegramOk || $emailOk) {
    rmp_respond(200, ["ok" => true, "telegram" => $telegramOk, "email" => $emailOk]);
}

error_log('RageMedia form delivery failed: ' . implode(' | ', $errors));
rmp_respond(502, [
    "ok" => false,
    "error" => "Could not deliver the request",
    "details" => $errors,
]);

/**
 * Send the message through the Telegram Bot API, with one retry because the
 * connection is sometimes dropped by the provider.
 */
function rmp_send_telegram($token, $chatId, $text, $proxy, array &$errors)
{
    if (!function_exists('curl_init')) {
        $errors[] = 'telegram: cURL extension is not enabled';
        return false;
    }

    $url = 'https://api.telegram.org/bot' . $token . '/sendMessage';
    $payload = http_build_query([
        'chat_id' => $chatId,
        'text' => $text,
    ]);

    for ($attempt = 1; $attempt <= 2; $attempt++) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_CONNECTTIMEOUT => 4,
            CURLOPT_TIMEOUT => 6,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4,
        ]);
        if ($proxy !== '') {
            curl_setopt($ch, CURLOPT_PROXY, $proxy);
        }

        $response = curl_exec($ch);
        $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        if ($response !== false) {
            $decoded = json_decode($response, true);
            if ($httpCode >= 200 && $httpCode < 300 && is_array($decoded) && isset($decoded['ok']) && $decoded['ok'] === true) {
                return true;
            }
        }

        $reason = $response === false
            ? 'cURL error: ' . $curlError
            : 'HTTP ' . $httpCode . ': ' . substr((string)$response, 0, 300);

        if ($attempt === 1) {
            usleep(700000);
        } else {
            $errors[] = 'telegram: ' . $reason;
        }
    }

    return false;
}

/**
 * Best-effort email fallback via the hosting mailer.
 */
function rmp_send_email($to, $text, array &$errors)
{
    if (!function_exists('mail')) {
        $errors[] = 'email: mail() is not available';
        return false;
    }

    $subject = '=?UTF-8?B?' . base64_encode('Новая заявка с сайта Rage Media') . '?=';
    $headers = implode("\r\n", [
        'From: Rage Media <no-reply@ragemedia.ru>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ]);

    $ok = @mail($to, $subject, $text, $headers);
    if (!$ok) {
        $errors[] = 'email: mail() returned false';
    }

    return (bool)$ok;
}
