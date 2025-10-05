/**
 * I/O operations for SEO content generation
 * - Read existing posts
 * - Save new posts in the correct format
 * - Calculate read time
 * - Generate slugs
 */

const fs = require('fs');
const path = require('path');

/**
 * Load all existing posts from the content directory
 */
function loadExistingPosts() {
  try {
    const postsDir = path.join(process.cwd(), 'src/content/posts');
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.js') && f !== 'index.js' && f !== 'README.md');

    const posts = [];

    for (const file of files) {
      const filePath = path.join(postsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');

      // Extract post object using regex (simple approach)
      const postMatch = fileContent.match(/export const post = \{([\s\S]*?)\};/);
      if (postMatch) {
        try {
          // Use eval to parse the object (safe in this context as we control the files)
          const postCode = `({${postMatch[1]}})`;
          const post = eval(postCode);
          posts.push(post);
        } catch (err) {
          console.warn(`⚠️  Failed to parse ${file}:`, err.message);
        }
      }
    }

    return posts;
  } catch (error) {
    throw new Error(`Failed to load existing posts: ${error.message}`);
  }
}

/**
 * Calculate read time based on word count (Hebrew: ~200 words/min)
 */
function calculateReadTime(content) {
  const plainText = content
    .replace(/^#+\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/[*_~`]/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  const words = plainText.split(/\s+/).filter((w) => w.length > 0);
  const minutes = Math.ceil(words.length / 200);

  return `${minutes} דקות קריאה`;
}

/**
 * Ensure slug is unique by appending a number if needed
 */
function ensureUniqueSlug(baseSlug, existingPosts) {
  let slug = baseSlug;
  let counter = 1;

  while (existingPosts.some((p) => p.slug === slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

/**
 * Format date for Asia/Jerusalem timezone
 */
function getTodayInIsrael() {
  const now = new Date();

  // Convert to Israel time (UTC+2 or UTC+3 depending on DST)
  const israelTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' })
  );

  const year = israelTime.getFullYear();
  const month = String(israelTime.getMonth() + 1).padStart(2, '0');
  const day = String(israelTime.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Generate cover image URL (placeholder - uses Unsplash)
 */
function generateCoverImage(tags) {
  // Map tags to Unsplash search terms
  const tagMap = {
    SEO: 'search-engine-optimization',
    מובייל: 'mobile-phone',
    עיצוב: 'web-design',
    אתרים: 'website-development',
    ביצועים: 'performance',
    שיווק: 'marketing',
    UX: 'user-experience',
  };

  const searchTerm = tagMap[tags[0]] || 'web-development';
  return `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&q=80&auto=format`;
}

/**
 * Save generated post as a JavaScript file
 */
function savePost(generatedPost, existingPosts, isDraft = true) {
  try {
    const postsDir = path.join(process.cwd(), 'src/content/posts');

    // Ensure unique slug
    const slug = ensureUniqueSlug(generatedPost.slug, existingPosts);

    // Auto-calculate read time if not provided
    const readTime = generatedPost.readTime || calculateReadTime(generatedPost.content);

    // Build the post object
    const post = {
      slug,
      title: generatedPost.title,
      excerpt: generatedPost.excerpt,
      coverImage: generatedPost.coverImage || generateCoverImage(generatedPost.tags),
      author: 'עמית',
      publishedAt: getTodayInIsrael(),
      readTime,
      tags: generatedPost.tags,
      content: generatedPost.content,
    };

    // Add draft flag if needed (optional - not in original schema but useful)
    if (isDraft) {
      post.draft = true;
    }

    // Generate file content
    const fileContent = `export const post = ${JSON.stringify(post, null, 2)
      .replace(/"([^"]+)":/g, '$1:') // Remove quotes from keys
      .replace(/\\n/g, '\\n')
    };
`;

    // Save to file
    const fileName = `${slug}.js`;
    const filePath = path.join(postsDir, fileName);

    if (fs.existsSync(filePath)) {
      throw new Error(`File already exists: ${fileName}`);
    }

    fs.writeFileSync(filePath, fileContent, 'utf8');

    return {
      success: true,
      fileName,
      filePath,
      slug,
      post,
    };
  } catch (error) {
    throw new Error(`Failed to save post: ${error.message}`);
  }
}

/**
 * Update the index.js file to include new posts
 */
function updatePostIndex(newPosts) {
  try {
    const indexPath = path.join(process.cwd(), 'src/content/posts/index.js');
    const currentContent = fs.readFileSync(indexPath, 'utf8');

    // Extract current imports
    const importMatches = currentContent.match(
      /import { post as \w+ } from "\.\/[^"]+";/g
    ) || [];

    // Generate new imports
    const newImports = newPosts.map((post) => {
      const varName = post.slug.replace(/-/g, '_');
      return `import { post as ${varName} } from "./${post.slug}.js";`;
    });

    // Extract current array items
    const arrayMatch = currentContent.match(/return \[([\s\S]*?)\];/);
    if (!arrayMatch) {
      throw new Error('Could not find posts array in index.js');
    }

    const currentItems = arrayMatch[1]
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    // Add new items
    const newItems = newPosts.map((post) => post.slug.replace(/-/g, '_'));
    const allItems = [...newItems, ...currentItems];

    // Rebuild the file
    const allImports = [...importMatches, ...newImports].join('\n');
    const newContent = `// Import all post modules
${allImports}
// Get all posts
export const getAllPosts = () => {
  return [
    ${allItems.join(',\n    ')},
  ];
};

// Get post by slug
export const getPostBySlug = (slug) => {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
};
`;

    fs.writeFileSync(indexPath, newContent, 'utf8');

    return { success: true };
  } catch (error) {
    throw new Error(`Failed to update index.js: ${error.message}`);
  }
}

module.exports = {
  loadExistingPosts,
  calculateReadTime,
  ensureUniqueSlug,
  getTodayInIsrael,
  generateCoverImage,
  savePost,
  updatePostIndex,
};
