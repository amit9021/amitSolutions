# Blog Posts

This directory contains all blog posts as individual JavaScript modules.

## Adding a New Post

1. Create a new `.js` file in this directory
2. Export a post object with all required fields:

```javascript
export const post = {
  slug: "your-new-post",
  title: "Your Post Title",
  excerpt: "Short description of the post",
  coverImage: "https://example.com/image.jpg",
  author: "Author Name",
  publishedAt: "2024-12-19",
  readTime: "5 דקות קריאה",
  tags: ["tag1", "tag2", "tag3"],
  content: `# Your Post Title

Your content here...`,
};
```

3. Update the `index.js` file to import your new post:

```javascript
import { post as yourNewPost } from "./your-new-post.js";

// Add to the posts array:
yourNewPost,
```

## Post Object Fields

- **slug**: URL slug for the post (required)
- **title**: The post title (required)
- **excerpt**: Short description for the blog listing (required)
- **coverImage**: URL to the cover image (optional)
- **author**: Author name (required)
- **publishedAt**: Publication date in YYYY-MM-DD format (required)
- **readTime**: Estimated reading time (required)
- **tags**: Array of tag strings (required)
- **content**: Markdown content as a string (required)

## Markdown Support

The blog supports standard Markdown syntax including:

- Headers (# ## ###)
- Bold (**text**)
- Italic (_text_)
- Lists (- item or 1. item)
- Links [text](url)
- Images ![alt](url)

## File Naming

Use kebab-case for filenames (e.g., `my-new-post.js`). The slug field will be used as the URL slug.
