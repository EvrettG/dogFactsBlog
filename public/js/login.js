async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#usernameSignup').value.trim();  
    const password = document.querySelector('#passwordSignup').value.trim();
    const email = document.querySelector('#emailSignup').value.trim();
  
    if (username && password && email) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          password,
          email
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      //check if the response status
      if (response.ok) {
        console.log('success');
        alert(`${username} created you can now log in`);
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }  
  }
  
  async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#usernameLogin').value.trim();
    const password = document.querySelector('#passwordLogin').value.trim();

  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('.signupForm').addEventListener('submit', signupFormHandler);
  document.querySelector('.loginForm').addEventListener('submit', loginFormHandler);