document.addEventListener('DOMContentLoaded', () => {
    const signupUsername = document.getElementById('signup-username');
    const signupPassword = document.getElementById('signup-password');
    const signupButton = document.getElementById('signup-button');
    const signupError = document.getElementById('signup-error');
    signupButton.addEventListener('click', async () => {
        const username = signupUsername.value.trim();
        const password = signupPassword.value;
        signupError.textContent = '';
        if (!username || !password) {
            signupError.textContent = 'ユーザー名とパスワードを入力してください';
            return;
        }
        try {
            const response = await fetch('signup.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
            });
            const result = await response.json();
            if (result.success) {
                signupError.style.color = 'green';
                signupError.textContent = '登録が完了しました。サインインしてください。';
                signupUsername.value = '';
                signupPassword.value = '';
            } else {
                signupError.style.color = 'red';
                signupError.textContent = result.error || '登録に失敗しました';
            }
        } catch (error) {
            signupError.style.color = 'red';
            signupError.textContent = '通信エラーが発生しました';
        }
    });
    const postContent = document.getElementById('post-content');
    const submitButton = document.getElementById('submit-button');
    const postsContainer = document.getElementById('posts-container');
    const apiUrl = 'api.php';
    const signinForm = document.querySelector('.signin-form');
    const signinUsername = document.getElementById('signin-username');
    const signinPassword = document.getElementById('signin-password');
    const signinButton = document.getElementById('signin-button');
    const signinError = document.getElementById('signin-error');
    const postForm = document.querySelector('.post-form');

    signinButton.addEventListener('click', async () => {
        const username = signinUsername.value.trim();
        const password = signinPassword.value;
        signinError.textContent = '';
        if (!username || !password) {
            signinError.textContent = 'ユーザー名とパスワードを入力してください';
            return;
        }
        try {
            const response = await fetch('signin.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
            });
            const result = await response.json();
            if (result.success) {
                signinForm.style.display = 'none';
                postForm.style.display = '';
            } else {
                signinError.textContent = result.error || 'サインインに失敗しました';
            }
        } catch (error) {
            signinError.textContent = '通信エラーが発生しました';
        }
    });

    const fetchPosts = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Network response was not ok.');
            const posts = await response.json();
            postsContainer.innerHTML = '';
            if (!Array.isArray(posts)) {
                postsContainer.innerHTML = '<div style="color:red;">投稿データの取得に失敗しました</div>';
                console.error('APIレスポンス:', posts);
                return;
            }
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
            postsContainer.innerHTML = '<div style="color:red;">投稿の読み込みに失敗しました</div>';
            console.error('投稿の読み込みに失敗しました:', error);
        }
    };

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
                    postContent.value = '';
                    fetchPosts();
                } else {
                    alert('投稿に失敗しました: ' + (result.message || ''));
                }
            } catch (error) {
                console.error('投稿に失敗しました:', error);
            }
        }
    });

    fetchPosts();
});