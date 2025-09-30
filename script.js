const fs = require("fs-extra");
const { promisify } = require("util");
const path = require("path");

async function init() {
  // Remove existing docs directory
  await promisify(fs.remove)("./docs");

  // Move build to docs
  await promisify(fs.move)("./build", "./docs");

  // Ensure CNAME file exists in docs directory for custom domain
  const cnamePath = path.join("./docs", "CNAME");
  const cnameContent = "amit-solutions.co.il";

  try {
    await promisify(fs.writeFile)(cnamePath, cnameContent);
    console.log(
      "✅ CNAME file created/updated for custom domain: amit-solutions.co.il"
    );
  } catch (error) {
    console.error("❌ Error creating CNAME file:", error);
  }

  // Ensure .nojekyll file exists to prevent Jekyll processing
  const nojekyllPath = path.join("./docs", ".nojekyll");

  try {
    await promisify(fs.writeFile)(nojekyllPath, "");
    console.log("✅ .nojekyll file created/updated");
  } catch (error) {
    console.error("❌ Error creating .nojekyll file:", error);
  }

  // Copy .htaccess file for cache optimization
  const htaccessSource = path.join("./public", ".htaccess");
  const htaccessDest = path.join("./docs", ".htaccess");

  try {
    await promisify(fs.copy)(htaccessSource, htaccessDest);
    console.log("✅ .htaccess file copied for cache optimization");
  } catch (error) {
    console.error("❌ Error copying .htaccess file:", error);
  }

  // Copy 404.html file for GitHub Pages SPA routing
  const notFoundSource = path.join("./public", "404.html");
  const notFoundDest = path.join("./docs", "404.html");

  try {
    await promisify(fs.copy)(notFoundSource, notFoundDest);
    console.log("✅ 404.html file copied for GitHub Pages SPA routing");
  } catch (error) {
    console.error("❌ Error copying 404.html file:", error);
  }

  // Generate static HTML pages for SEO
  console.log("🚀 Generating static HTML pages for SEO...");
  try {
    const {
      generateStaticPages,
    } = require("./scripts/generate-static-pages.js");
    await generateStaticPages();
    console.log("✅ Static HTML pages generated for Google indexing");
  } catch (error) {
    console.error("❌ Error generating static pages:", error);
  }

  // Generate sitemap
  console.log("🗺️ Generating sitemap...");
  try {
    const { exec } = require("child_process");
    const { promisify } = require("util");
    const execAsync = promisify(exec);
    await execAsync("node scripts/generate-sitemap.js");
    // Copy sitemap to docs directory
    await promisify(fs.copy)("./public/sitemap.xml", "./docs/sitemap.xml");
    console.log("✅ Sitemap generated and copied to docs directory");
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
  }
}

init();
