// Wait for the page to fully load before running this code
document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('blog-form');

  // Only run this if we're on the Add Blog page (form exists)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // stop the form from refreshing the page

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

      // If everything passes validation:
      alert('Blog post validated successfully! (We\'ll connect this to the backend soon)');

      console.log('Title:', title);
      console.log('Content:', content);

      // Clear the form after "submitting"
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
});