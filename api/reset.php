<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
error_reporting(E_ALL);

$host = 'sql207.ezyro.com';
$user = 'ezyro_39881131';
$pass = 'aa16d1552';
$dbname = 'ezyro_39881131_credentials';

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['email']) || empty($data['newPassword'])) {
    echo json_encode(['success' => false, 'message' => 'Missing email or new password']);
    exit();
}

$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$newPassword = password_hash($data['newPassword'], PASSWORD_DEFAULT);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit();
}

$stmt = $conn->prepare("UPDATE users SET password = ? WHERE email = ?");
$stmt->bind_param("ss", $newPassword, $email);

if ($stmt->execute() && $stmt->affected_rows > 0) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Email not found or update failed: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
