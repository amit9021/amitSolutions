/**
 * Quality checks for generated content
 * - Duplicate detection
 * - Word count validation
 * - Hebrew text normalization
 * - Readability checks
 */

/**
 * Calculate similarity between two strings using Jaccard similarity
 */
function calculateSimilarity(str1, str2) {
  const words1 = new Set(str1.toLowerCase().split(/\s+/));
  const words2 = new Set(str2.toLowerCase().split(/\s+/));

  const intersection = new Set([...words1].filter((x) => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}

/**
 * Check if generated post is too similar to existing posts
 */
function checkDuplicates(generatedPost, existingPosts, threshold = 0.4) {
  const issues = [];

  for (const existing of existingPosts) {
    // Check title similarity
    const titleSimilarity = calculateSimilarity(generatedPost.title, existing.title);
    if (titleSimilarity > threshold) {
      issues.push({
        type: 'duplicate_title',
        severity: 'high',
        message: `Title too similar to existing post: "${existing.title}" (${Math.round(titleSimilarity * 100)}% similar)`,
        existingPost: existing.slug,
      });
    }

    // Check slug similarity
    if (generatedPost.slug === existing.slug) {
      issues.push({
        type: 'duplicate_slug',
        severity: 'critical',
        message: `Slug already exists: ${existing.slug}`,
        existingPost: existing.slug,
      });
    }

    // Check content similarity (first 500 words)
    const genContent = generatedPost.content.substring(0, 2000);
    const existingContent = existing.content ? existing.content.substring(0, 2000) : '';
    const contentSimilarity = calculateSimilarity(genContent, existingContent);

    if (contentSimilarity > threshold) {
      issues.push({
        type: 'duplicate_content',
        severity: 'high',
        message: `Content too similar to existing post: "${existing.title}" (${Math.round(contentSimilarity * 100)}% similar)`,
        existingPost: existing.slug,
      });
    }
  }

  return {
    passed: issues.filter((i) => i.severity === 'critical').length === 0,
    issues,
  };
}

/**
 * Validate word count is within acceptable range
 */
function checkWordCount(content, min = 700, max = 900) {
  // Remove markdown formatting for accurate word count
  const plainText = content
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links
    .replace(/[*_~`]/g, '') // Remove formatting
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  const words = plainText.split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;

  const issues = [];
  if (wordCount < min) {
    issues.push({
      type: 'word_count_low',
      severity: 'medium',
      message: `Word count too low: ${wordCount} (minimum: ${min})`,
      wordCount,
    });
  } else if (wordCount > max) {
    issues.push({
      type: 'word_count_high',
      severity: 'low',
      message: `Word count too high: ${wordCount} (maximum: ${max})`,
      wordCount,
    });
  }

  return {
    passed: wordCount >= min && wordCount <= max,
    wordCount,
    issues,
  };
}

/**
 * Normalize Hebrew text
 * - Fix spacing around punctuation
 * - Normalize quotes
 * - Remove extra whitespace
 */
function normalizeHebrewText(text) {
  let normalized = text;

  // Fix spacing: ensure space after punctuation in Hebrew text
  normalized = normalized.replace(/([,.!?:;])([א-ת])/g, '$1 $2');

  // Remove space before punctuation
  normalized = normalized.replace(/\s+([,.!?:;])/g, '$1');

  // Normalize quotes - use Hebrew quotes
  normalized = normalized.replace(/[""]([^"""]+)[""]/g, '"$1"');
  normalized = normalized.replace(/'([^'']+)'/g, "'$1'");

  // Remove multiple spaces
  normalized = normalized.replace(/[ \t]+/g, ' ');

  // Remove spaces at the beginning/end of lines
  normalized = normalized.replace(/^[ \t]+|[ \t]+$/gm, '');

  // Ensure proper spacing around markdown headers
  normalized = normalized.replace(/^(#+\s+.+)$/gm, '\n$1\n');

  // Remove excessive newlines (max 2 consecutive)
  normalized = normalized.replace(/\n{3,}/g, '\n\n');

  return normalized.trim();
}

/**
 * Basic readability check for Hebrew content
 */
function checkReadability(content) {
  const issues = [];

  // Check for extremely long paragraphs (more than 6 lines)
  const paragraphs = content.split(/\n\n+/);
  const longParagraphs = paragraphs.filter((p) => {
    const lines = p.split('\n').length;
    return lines > 10;
  });

  if (longParagraphs.length > 0) {
    issues.push({
      type: 'long_paragraphs',
      severity: 'low',
      message: `Found ${longParagraphs.length} very long paragraph(s). Consider breaking them up.`,
    });
  }

  // Check for presence of headers
  const headers = content.match(/^#+\s+/gm) || [];
  if (headers.length < 3) {
    issues.push({
      type: 'insufficient_headers',
      severity: 'medium',
      message: `Only ${headers.length} header(s) found. Aim for at least 3-4 for better structure.`,
    });
  }

  // Check for lists (bullet points or numbered)
  const hasList = /^[-*+]\s+/m.test(content) || /^\d+\.\s+/m.test(content);
  if (!hasList) {
    issues.push({
      type: 'no_lists',
      severity: 'low',
      message: 'No lists found. Lists improve readability.',
    });
  }

  return {
    passed: issues.filter((i) => i.severity === 'high' || i.severity === 'critical').length === 0,
    issues,
  };
}

/**
 * Run all quality checks on generated post
 */
function validatePost(generatedPost, existingPosts) {
  const results = {
    passed: true,
    checks: {},
    allIssues: [],
  };

  // Normalize text first
  generatedPost.content = normalizeHebrewText(generatedPost.content);
  generatedPost.title = normalizeHebrewText(generatedPost.title);
  generatedPost.excerpt = normalizeHebrewText(generatedPost.excerpt);
  generatedPost.meta = normalizeHebrewText(generatedPost.meta);

  // Run checks
  results.checks.duplicates = checkDuplicates(generatedPost, existingPosts);
  results.checks.wordCount = checkWordCount(generatedPost.content);
  results.checks.readability = checkReadability(generatedPost.content);

  // Collect all issues
  results.allIssues = [
    ...results.checks.duplicates.issues,
    ...results.checks.wordCount.issues,
    ...results.checks.readability.issues,
  ];

  // Determine overall pass/fail (fail only on critical/high severity)
  const criticalIssues = results.allIssues.filter(
    (i) => i.severity === 'critical' || i.severity === 'high'
  );
  results.passed = criticalIssues.length === 0;

  return results;
}

module.exports = {
  calculateSimilarity,
  checkDuplicates,
  checkWordCount,
  normalizeHebrewText,
  checkReadability,
  validatePost,
};
