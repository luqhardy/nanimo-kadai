<?php
// db.php
function getDb() {
    $host = 'localhost';
    $db   = 'nanimo_db'; // Change to your database name
    $user = 'root';      // Default MAMP user
    $pass = 'root';      // Default MAMP password
    $charset = 'utf8mb4';
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    try {
        return new PDO($dsn, $user, $pass, $options);
    } catch (PDOException $e) {
        die('DB接続エラー: ' . $e->getMessage());
    }
}
