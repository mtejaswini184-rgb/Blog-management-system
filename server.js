const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
// In-memory storage for blog posts
let blogs = [];
let nextId = 1; // simple counter to give each blog a unique ID

// Home route (from Day 1)
app.get('/', (req, res) => {
  res.send('Hello World! Server is running.');
});

// GET all blogs
app.get('/api/blogs', (req, res) => {
  res.json(blogs);
});

// GET a single blog by ID
app.get('/api/blogs/:id', (req, res) => {
  const blog = blogs.find(b => b.id === parseInt(req.params.id));

  if (!blog) {
    return res.status(404).json({ error: 'Blog not found.' });
  }

  res.json(blog);
});

// POST - Add a new blog
app.post('/api/blogs', (req, res) => {
  const { title, content } = req.body;

  // Validation
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }

  if (title.trim().length < 3) {
    return res.status(400).json({ error: 'Title must be at least 3 characters.' });
  }

  if (content.trim().length < 10) {
    return res.status(400).json({ error: 'Content must be at least 10 characters.' });
  }

  // Create the new blog object
  const newBlog = {
    id: nextId++,
    title: title.trim(),
    content: content.trim(),
    createdAt: new Date().toISOString()
  };

  blogs.push(newBlog);

  res.status(201).json({
    message: 'Blog post created successfully!',
    blog: newBlog
  });
});
// PUT - Update an existing blog
app.put('/api/blogs/:id', (req, res) => {
  const blogId = parseInt(req.params.id);
  const blog = blogs.find(b => b.id === blogId);

  if (!blog) {
    return res.status(404).json({ error: 'Blog not found.' });
  }

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }

  if (title.trim().length < 3) {
    return res.status(400).json({ error: 'Title must be at least 3 characters.' });
  }

  if (content.trim().length < 10) {
    return res.status(400).json({ error: 'Content must be at least 10 characters.' });
  }

  // Update the blog's fields
  blog.title = title.trim();
  blog.content = content.trim();
  blog.updatedAt = new Date().toISOString();

  res.json({
    message: 'Blog post updated successfully!',
    blog: blog
  });
});
// DELETE - Remove a blog post
app.delete('/api/blogs/:id', (req, res) => {
  const blogId = parseInt(req.params.id);
  const blogIndex = blogs.findIndex(b => b.id === blogId);

  if (blogIndex === -1) {
    return res.status(404).json({ error: 'Blog not found.' });
  }

  const deletedBlog = blogs.splice(blogIndex, 1)[0];

  res.json({
    message: 'Blog post deleted successfully!',
    blog: deletedBlog
  });
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});