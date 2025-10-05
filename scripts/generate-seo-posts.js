#!/usr/bin/env node

/**
 * Daily SEO Content Generation Orchestrator
 *
 * This script:
 * 1. Performs keyword research based on existing posts
 * 2. Selects 2 high-potential topics
 * 3. Generates SEO-optimized Hebrew blog posts
 * 4. Validates content quality
 * 5. Saves posts in the correct format
 * 6. Updates the sitemap
 */

const { createKeywordProvider } = require("../lib/seo/keywordProvider");
const { createContentGenerator } = require("../lib/seo/contentGenerator");
const { validatePost } = require("../lib/seo/quality");
const {
  loadExistingPosts,
  savePost,
  updatePostIndex,
} = require("../lib/seo/io");

// Load environment variables
require("dotenv").config();

const config = {
  llmProvider: process.env.LLM_PROVIDER || "groq",
  llmApiKey:
    process.env.LLM_API_KEY ||
    process.env.GROQ_API_KEY ||
    process.env.OPENAI_API_KEY,
  llmModel: process.env.LLM_MODEL,
  keywordProvider: process.env.KEYWORD_PROVIDER || "stub",
  keywordApiKey: process.env.KEYWORD_API_KEY,
  seedQueries: process.env.SEED_QUERIES
    ? process.env.SEED_QUERIES.split(",").map((s) => s.trim())
    : [],
  baseUrl: process.env.BASE_URL || "https://amit-solutions.co.il",
  postsPerDay: parseInt(process.env.POSTS_PER_DAY || "2", 10),
  draftMode: process.env.DRAFT_MODE !== "false", // default to true
};

// Logging
function log(emoji, message, data = null) {
  const timestamp = new Date().toLocaleTimeString("he-IL");
  console.log(`[${timestamp}] ${emoji} ${message}`);
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
}

/**
 * Main execution flow
 */
async function main() {
  log("🚀", "Starting daily SEO content generation...");
  log("⚙️", "Configuration:", {
    llmProvider: config.llmProvider,
    llmModel: config.llmModel || "default",
    keywordProvider: config.keywordProvider,
    postsPerDay: config.postsPerDay,
    draftMode: config.draftMode,
    hasLLMKey: !!config.llmApiKey,
  });

  try {
    // Step 1: Load existing posts
    log("📚", "Loading existing posts...");
    const existingPosts = loadExistingPosts();
    log("✅", `Loaded ${existingPosts.length} existing posts`);

    // Extract existing tags and titles
    const existingTags = [...new Set(existingPosts.flatMap((p) => p.tags))];
    log(
      "🏷️",
      `Found ${existingTags.length} unique tags:`,
      existingTags.join(", ")
    );

    // Step 2: Keyword research
    log("🔍", "Performing keyword research...");
    const keywordProvider = createKeywordProvider(
      config.keywordProvider,
      config.keywordApiKey
    );
    const keywordClusters = await keywordProvider.getKeywords(
      existingTags,
      config.seedQueries,
      existingPosts
    );
    log("✅", `Found ${keywordClusters.length} keyword clusters`);

    if (keywordClusters.length === 0) {
      log("⚠️", "No keyword clusters found. Exiting.");
      return;
    }

    // Step 3: Select top N topics
    const selectedTopics = keywordClusters.slice(0, config.postsPerDay);
    log(
      "🎯",
      `Selected ${selectedTopics.length} topics for today:`,
      selectedTopics.map((t) => t.topic)
    );

    // Step 4: Generate content
    if (!config.llmApiKey) {
      throw new Error(
        `${config.llmProvider.toUpperCase()}_API_KEY is required for content generation`
      );
    }

    const contentGenerator = createContentGenerator(
      config.llmProvider,
      config.llmApiKey,
      config.llmModel
    );
    const generatedPosts = [];
    const successfulPosts = [];

    for (let i = 0; i < selectedTopics.length; i++) {
      const topic = selectedTopics[i];
      log(
        "✍️",
        `Generating post ${i + 1}/${selectedTopics.length}: ${topic.topic}...`
      );

      try {
        // Generate content
        const generated = await contentGenerator.generatePost(
          topic,
          topic.keywords.slice(0, 3), // Use top 3 keywords
          existingPosts
        );

        log("✅", `Generated: "${generated.title}"`);

        // Step 5: Quality validation
        log("🔍", "Validating quality...");
        const validation = validatePost(generated, existingPosts);

        if (!validation.passed) {
          log("❌", "Quality check failed:", {
            title: generated.title,
            issues: validation.allIssues.filter(
              (i) => i.severity === "critical" || i.severity === "high"
            ),
          });
          continue;
        }

        if (validation.allIssues.length > 0) {
          log("⚠️", `Quality warnings (non-critical):`, validation.allIssues);
        } else {
          log("✅", "Quality check passed");
        }

        // Step 6: Save post
        log("💾", "Saving post...");
        const saveResult = savePost(
          generated,
          [...existingPosts, ...generatedPosts],
          config.draftMode
        );
        log("✅", `Saved: ${saveResult.fileName}`);

        generatedPosts.push(saveResult);
        successfulPosts.push(saveResult);

        // Add to existing posts to prevent duplicates in next iteration
        existingPosts.push(saveResult.post);
      } catch (error) {
        log(
          "❌",
          `Failed to generate post for topic "${topic.topic}":`,
          error.message
        );
      }
    }

    // Step 7: Update index
    if (successfulPosts.length > 0) {
      log("📝", "Updating posts index...");
      updatePostIndex(successfulPosts.map((p) => ({ slug: p.slug })));
      log("✅", "Index updated");

      // Step 8: Regenerate sitemap
      log("🗺️", "Regenerating sitemap...");
      const { execSync } = require("child_process");
      try {
        execSync("npm run generate-sitemap", { stdio: "inherit" });
        log("✅", "Sitemap regenerated");

        // Print Google ping command
        const sitemapUrl = `${config.baseUrl}/sitemap.xml`;
        const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(
          sitemapUrl
        )}`;
        log("📡", "To notify Google, visit:");
        console.log(`   ${pingUrl}`);
      } catch (error) {
        log("⚠️", "Sitemap regeneration failed (non-critical):", error.message);
      }
    }

    // Step 9: Summary
    log("🎉", "Generation complete!");
    console.log("\n" + "=".repeat(60));
    console.log("📊 SUMMARY");
    console.log("=".repeat(60));
    console.log(`✅ Successfully generated: ${successfulPosts.length} post(s)`);
    console.log(
      `❌ Failed: ${selectedTopics.length - successfulPosts.length} post(s)`
    );

    if (successfulPosts.length > 0) {
      console.log("\n📝 Generated posts:");
      successfulPosts.forEach((post, i) => {
        console.log(`${i + 1}. ${post.post.title}`);
        console.log(`   Slug: ${post.slug}`);
        console.log(`   File: ${post.fileName}`);
        console.log(`   Tags: ${post.post.tags.join(", ")}`);
        console.log("");
      });

      if (config.draftMode) {
        console.log(
          "⚠️  Posts created in DRAFT mode. Review before publishing."
        );
      }
    }

    console.log("=".repeat(60) + "\n");

    // Exit with success
    process.exit(0);
  } catch (error) {
    log("❌", "Fatal error:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Handle uncaught errors
process.on("unhandledRejection", (error) => {
  log("❌", "Unhandled rejection:", error.message);
  console.error(error.stack);
  process.exit(1);
});

// Run
if (require.main === module) {
  main();
}

module.exports = { main };
