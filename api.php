<?php
// データベース接続情報
define('DB_HOST', 'localhost:8888');
define('DB_USER', 'root');
define('DB_PASS', 'root'); // MAMPのデフォルトパスワードは'root'です
define('DB_NAME', 'nanimo_db');

// データベースに接続
try {
    $dbh = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4', DB_USER, DB_PASS);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'データベース接続失敗: ' . $e->getMessage()]);
    exit();
}

// リクエストの種類によって処理を分岐
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // ---- 投稿を保存する処理 ----
    $data = json_decode(file_get_contents('php://input'), true);
    $content = $data['content'] ?? '';

    if (!empty($content)) {
        $stmt = $dbh->prepare("INSERT INTO posts (content) VALUES (:content)");
        $stmt->bindParam(':content', $content, PDO::PARAM_STR);
        $stmt->execute();
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => '投稿内容がありません']);
    }

} elseif ($method === 'GET') {
    // ---- 投稿を取得する処理 ----
    $stmt = $dbh->query("SELECT id, content, created_at FROM posts ORDER BY created_at DESC");
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // 日付フォーマットを'Y/m/d H:i'に変更
    foreach ($posts as &$post) {
        $post['created_at'] = (new DateTime($post['created_at']))->format('Y/m/d H:i');
    }

    header('Content-Type: application/json');
    echo json_encode($posts);
}
?>