document.addEventListener('DOMContentLoaded', () => {
    const postContent = document.getElementById('post-content');
    const submitButton = document.getElementById('submit-button');
    const postsContainer = document.getElementById('posts-container');
    const apiUrl = 'api.php';

    // 投稿を読み込んで表示する関数
    const fetchPosts = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Network response was not ok.');
            const posts = await response.json();

            postsContainer.innerHTML = ''; // コンテナを空にする
            posts.forEach(post => {
                const postCard = document.createElement('div');
                postCard.className = 'post-card';
                
                const timestamp = document.createElement('div');
                timestamp.className = 'timestamp';
                timestamp.textContent = post.created_at;

                const content = document.createElement('div');
                content.className = 'content';
                content.textContent = post.content;

                postCard.appendChild(timestamp);
                postCard.appendChild(content);
                postsContainer.appendChild(postCard);
            });
        } catch (error) {
            console.error('投稿の読み込みに失敗しました:', error);
        }
    };

    // 投稿ボタンがクリックされたときの処理
    submitButton.addEventListener('click', async () => {
        const content = postContent.value.trim();
        if (content) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: content })
                });

                if (!response.ok) throw new Error('Network response was not ok.');
                const result = await response.json();

                if (result.status === 'success') {
                    postContent.value = ''; // テキストエリアを空にする
                    fetchPosts(); // 投稿一覧を再読み込み
                } else {
                    alert('投稿に失敗しました: ' + (result.message || ''));
                }
            } catch (error) {
                console.error('投稿に失敗しました:', error);
            }
        }
    });

    // 最初に投稿を読み込む
    fetchPosts();
});