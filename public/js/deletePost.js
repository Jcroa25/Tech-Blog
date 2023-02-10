async function deleteFormHandler(event) {
    event.preventDefault();

const id = window.location.toString().split('/')[
 window.location.toString().split('/').length - 1
];

  if (comment_text) {
   const response = await fetch('/api/comments', {
    method: 'DELETE',
     body: JSON.stringify({
      post_id, id
     }),
     headers: {
      'Content-Type': 'application/json'
     }
    });

    if (response.ok) {
       document.location.reload();
    } else {
       alert(response.statusText);
       document.querySelector('#comment-form').style.display = "block";
  }
 }
}

document
.querySelector('.comment-form')
.addEventListener('submit', commentFormHandler);