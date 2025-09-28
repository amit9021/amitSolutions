const fs = require("fs");
const path = require("path");

// Define blog posts manually since we can't import ES modules in Node.js script
const posts = [
  {
    slug: "why-fast-websites-matter",
    publishedAt: "2024-12-19",
  },
  {
    slug: "mobile-first-design",
    publishedAt: "2024-12-18",
  },
  {
    slug: "google-business-integration",
    publishedAt: "2024-12-17",
  },
];

function generateSitemap() {
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
const sitemap = generateSitemap();
const sitemapPath = path.join(__dirname, "../public/sitemap.xml");

fs.writeFileSync(sitemapPath, sitemap);
console.log("✅ Sitemap generated successfully");
console.log(`📄 Sitemap saved to: ${sitemapPath}`);
