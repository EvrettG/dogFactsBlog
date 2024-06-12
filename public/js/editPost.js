async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="postTitle"]').value;
    const post_text = document.querySelector('textarea[name="postText"]').value;
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length-1
    ];
  
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        post_title,
        post_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.editPostForm').addEventListener('submit', editFormHandler);