const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to understand JSON data sent from the frontend
app.use(express.json());

// Temporary in-memory storage for blog posts (Day 6 will use this properly)
let blogs = [];

// GET route - homepage test route
app.get('/', (req, res) => {
  res.send('Hello World! Server is running.');
});

// GET route - fetch all blogs
app.get('/api/blogs', (req, res) => {
  res.json(blogs);
});

// POST route - add a new blog (basic version for now)
app.post('/api/blogs', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }

  const newBlog = {
    id: Date.now(),
    title,
    content
  };

  blogs.push(newBlog);
  res.status(201).json(newBlog);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});