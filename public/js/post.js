const createPostHandler = async (event) => {
    event.preventDefault();

const title = document.querySelector('#post-title').value.trim();
const text = document.querySelector('#post-text').value.trim();
  
    if (title && text) {
      const response = await fetch('/api/blog', {
        method: 'POST',
        body: JSON.stringify({ title, text }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/userProfile');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.create-post')
    .addEventListener('submit', createPostHandler);