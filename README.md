
# nanimo-kadai

誰でも投稿できるシンプルなSNSです。

## 概要
nanimo-kadaiは、PHPとMySQL（MAMP環境）を利用した簡単なSNSアプリケーションです。ユーザーはサインインして、自由に投稿することができます。

## 主な機能
- ユーザーサインイン（MySQLデータベース認証）
- 投稿機能（テキスト投稿）
- 投稿一覧表示

## 技術スタック
- フロントエンド: HTML, CSS, JavaScript
- バックエンド: PHP
- データベース: MySQL（MAMP推奨）


## セットアップ方法
1. MAMPをインストールし、MySQLサーバーを起動します。
2. MySQLで `nanimo_db` というデータベースを作成します。
3. 以下のSQLで `users` テーブルと `posts` テーブルを作成してください:
	 ```sql
	 CREATE TABLE users (
		 id INT AUTO_INCREMENT PRIMARY KEY,
		 username VARCHAR(255) NOT NULL UNIQUE,
		 password VARCHAR(255) NOT NULL
	 );

	 CREATE TABLE posts (
		 id INT AUTO_INCREMENT PRIMARY KEY,
		 content TEXT NOT NULL,
		 created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	 );
	 ```
4. 必要に応じてユーザーを登録します（パスワードはPHPの `password_hash` でハッシュ化してください）。
5. プロジェクトの `db.php` のDB名・ユーザー名・パスワードをMAMP環境に合わせて修正します。
6. MAMPの `htdocs` フォルダに本プロジェクトを配置し、ブラウザで `index.html` を開いて動作確認します。

## 使い方
1. サインイン画面でユーザー名とパスワードを入力し、「サインイン」ボタンを押します。
2. サインインに成功すると投稿フォームが表示されます。
3. 投稿内容を入力し、「投稿する」ボタンで投稿できます。
4. 投稿一覧が下部に表示されます。

## ファイル構成
- index.html : メイン画面
- style.css : スタイルシート
- script.js : クライアントサイドのJS
- db.php : データベース接続
- signin.php : サインイン処理
- api.php : 投稿API

## ライセンス
MIT
