async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="postTitle"]').value;
    const post_text = document.querySelector('textarea[name="postText"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        post_title,
        post_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.newPostForm').addEventListener('submit', newFormHandler);