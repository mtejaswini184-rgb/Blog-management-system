document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('blog-form');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const title = document.getElementById('title').value.trim();
      const content = document.getElementById('content').value.trim();

      // Validation checks
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

      // Send the blog post to the backend
      try {
        const response = await fetch('http://localhost:3000/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content })
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.error || 'Something went wrong.');
          return;
        }

        alert('Blog post published successfully!');
        form.reset();

        // Redirect to Home page to see the new post
        window.location.href = 'index.html';

      } catch (error) {
        alert('Failed to publish blog. Make sure the server is running.');
        console.error(error);
      }
    });
  }

  // Live character counter for content field
  const contentField = document.getElementById('content');
  if (contentField) {
    contentField.addEventListener('input', () => {
      console.log(`Content length: ${contentField.value.length} characters`);
    });
  }

  // Load blogs if we're on the Home page
  loadBlogs();

});

// Fetch and display all blogs on the Home page
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
        <small>Posted on ${date}</small><br>
        <button onclick="editBlog(${blog.id}, '${blog.title.replace(/'/g, "\\'")}', '${blog.content.replace(/'/g, "\\'")}')">Edit</button>
        <button onclick="deleteBlog(${blog.id})">Delete</button>
      `;

      blogList.appendChild(card);
    });

  } catch (error) {
    blogList.innerHTML = '<p>Unable to load blogs. Make sure the server is running.</p>';
    console.error('Error fetching blogs:', error);
  }
}

// Handle editing a blog post
async function editBlog(id, currentTitle, currentContent) {
  const newTitle = prompt('Edit title:', currentTitle);
  if (newTitle === null) return; // user clicked Cancel

  const newContent = prompt('Edit content:', currentContent);
  if (newContent === null) return;

  try {
    const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, content: newContent })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || 'Something went wrong.');
      return;
    }

    alert('Blog updated successfully!');
    loadBlogs(); // refresh the blog list to show the update

  } catch (error) {
    alert('Failed to update blog. Make sure the server is running.');
    console.error(error);
  }
}

// Handle deleting a blog post
async function deleteBlog(id) {
  const confirmDelete = confirm('Are you sure you want to delete this blog post?');
  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || 'Something went wrong.');
      return;
    }

    alert('Blog deleted successfully!');
    loadBlogs(); // refresh the list

  } catch (error) {
    alert('Failed to delete blog. Make sure the server is running.');
    console.error(error);
  }
}