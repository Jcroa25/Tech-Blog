const newPostHandler = async (event) => {
    event.preventDefault();

const title = document.querySelector('input[name="post-title"]').value.trim();
const text = document.querySelector('input[name="post-text"]').value.trim();
const response = await fetch('/api/posts', {
  method: 'POST',
  body: JSON.stringify({ title, text }),
  headers: { 'Content-Type': 'application/json' },
});
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
  };
  
document
 .querySelector('#new-post-form')
 .addEventListener('submit', newPostHandler);