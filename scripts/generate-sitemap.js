const fs = require("fs");
const path = require("path");

// Dynamically load all posts from content directory
async function getAllPosts() {
  try {
    // Read the index.js file to get the post imports
    const indexPath = path.join(__dirname, "../src/content/posts/index.js");
    const indexContent = fs.readFileSync(indexPath, "utf8");

    // Extract post imports from the file
    const importMatches = indexContent.match(
      /import { post as (\w+) } from "\.\/([^"]+)";/g
    );
    if (!importMatches) {
      throw new Error("No post imports found in index.js");
    }

    const posts = [];

    // Import each post dynamically
    for (const importLine of importMatches) {
      const match = importLine.match(
        /import { post as (\w+) } from "\.\/([^"]+)";/
      );
      if (match) {
        const [, variableName, fileName] = match;
        const postPath = path.join(__dirname, "../src/content/posts", fileName);

        try {
          // Read and evaluate the post file
          const postContent = fs.readFileSync(postPath, "utf8");
          // Extract the post object from the file content
          const postMatch = postContent.match(
            /export const post = ({[\s\S]*?});/
          );
          if (postMatch) {
            // Evaluate the post object (this is a simple approach)
            const postCode = postMatch[1];
            const post = eval(`(${postCode})`);
            posts.push({
              slug: post.slug,
              publishedAt: post.publishedAt,
            });
          }
        } catch (error) {
          console.log(`❌ Error reading ${fileName}:`, error.message);
        }
      }
    }

    return posts;
  } catch (error) {
    console.error("❌ Error loading posts:", error);
    return [];
  }
}

function generateSitemap(posts) {
  const baseUrl = "https://amit-solutions.co.il";
  const currentDate = new Date().toISOString().split("T")[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Blog Index -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Blog Posts -->`;

  // Add each blog post
  posts.forEach((post) => {
    const postDate = post.publishedAt;
    sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  sitemap += `
  
  <!-- Main Sections -->
  <url>
    <loc>${baseUrl}/#about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/#services</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/#shop</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/#contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
</urlset>`;

  return sitemap;
}

// Generate and write sitemap
async function main() {
  try {
    console.log("🚀 Generating sitemap...");
    const posts = await getAllPosts();
    console.log(`📚 Found ${posts.length} posts`);

    const sitemap = generateSitemap(posts);
    const sitemapPath = path.join(__dirname, "../public/sitemap.xml");

    fs.writeFileSync(sitemapPath, sitemap);
    console.log("✅ Sitemap generated successfully");
    console.log(`📄 Sitemap saved to: ${sitemapPath}`);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
  }
}

main();
