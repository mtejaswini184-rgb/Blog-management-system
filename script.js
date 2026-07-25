// Wait for the page to fully load before running this code
document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('blog-form');

  // Only run this if we're on the Add Blog page (form exists)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('title').value.trim();
      const content = document.getElementById('content').value.trim();

      if (title === '') {
        alert('Please enter a title for your blog post.');
        return;
      }

      if (title.length < 3) {
        alert('Title must be at least 3 characters long.');
        return;
      }

      if (content === '') {
        alert('Please write some content for your blog post.');
        return;
      }

      if (content.length < 10) {
        alert('Content must be at least 10 characters long.');
        return;
      }

      alert('Blog post validated successfully! (We\'ll connect this to the backend soon)');

      console.log('Title:', title);
      console.log('Content:', content);

      form.reset();
    });
  }

  // Live character counter for content field
  const contentField = document.getElementById('content');
  if (contentField) {
    contentField.addEventListener('input', () => {
      console.log(`Content length: ${contentField.value.length} characters`);
    });
  }

  // ✅ Call loadBlogs() directly here — no need to wait for another event
  loadBlogs();

});

// ✅ loadBlogs is now OUTSIDE the DOMContentLoaded block, at the top level
async function loadBlogs() {
  const blogList = document.getElementById('blog-list');

  if (!blogList) return; // only run this on index.html

  try {
    const response = await fetch('http://localhost:3000/api/blogs');
    const blogs = await response.json();

    if (blogs.length === 0) {
      blogList.innerHTML = '<p>No blog posts yet. Add one!</p>';
      return;
    }

    blogList.innerHTML = '';

    blogs.forEach(blog => {
      const card = document.createElement('div');
      card.className = 'blog-card';

      const date = new Date(blog.createdAt).toLocaleDateString();

      card.innerHTML = `
        <h3>${blog.title}</h3>
        <p>${blog.content}</p>
        <small>Posted on ${date}</small>
      `;

      blogList.appendChild(card);
    });

  } catch (error) {
    blogList.innerHTML = '<p>Unable to load blogs. Make sure the server is running.</p>';
    console.error('Error fetching blogs:', error);
  }
}