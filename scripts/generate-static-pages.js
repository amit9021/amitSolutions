const fs = require("fs-extra");
const path = require("path");

// Import posts from the actual content directory
async function getAllPosts() {
  try {
    // Read the index.js file to get the post imports
    const indexPath = path.join(__dirname, "../src/content/posts/index.js");
    const indexContent = await fs.readFile(indexPath, "utf8");

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
          const postContent = await fs.readFile(postPath, "utf8");
          // Extract the post object from the file content
          const postMatch = postContent.match(
            /export const post = ({[\s\S]*?});/
          );
          if (postMatch) {
            // Evaluate the post object (this is a simple approach)
            const postCode = postMatch[1];
            const post = eval(`(${postCode})`);
            posts.push(post);
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

async function generateStaticPages() {
  console.log("🚀 Generating static pages for SEO...");

  const outputDir = path.join(__dirname, "../docs");

  // Ensure output directory exists
  await fs.ensureDir(outputDir);

  // Load posts dynamically from content directory
  console.log("📚 Loading posts from content directory...");
  const posts = await getAllPosts();
  console.log(`📚 Found ${posts.length} posts`);

  // Get the actual CSS and JS file names from the build
  const cssFiles = await fs.readdir(path.join(outputDir, "static", "css"));
  const jsFiles = await fs.readdir(path.join(outputDir, "static", "js"));

  const cssFile = cssFiles.find(
    (file) => file.endsWith(".css") && !file.endsWith(".map")
  );
  const jsFile = jsFiles.find(
    (file) => file.endsWith(".js") && !file.endsWith(".map")
  );

  console.log(`📦 Using CSS: ${cssFile}`);
  console.log(`📦 Using JS: ${jsFile}`);

  // Generate blog index page
  console.log("📝 Generating blog index page...");
  const blogIndexHtml = generateBlogIndexHtml(posts, cssFile, jsFile);
  await fs.ensureDir(path.join(outputDir, "blog"));
  await fs.writeFile(path.join(outputDir, "blog", "index.html"), blogIndexHtml);

  // Generate individual blog post pages
  for (const post of posts) {
    console.log(`📝 Generating static page for: ${post.slug}`);
    const postHtml = generateBlogPostHtml(post, cssFile, jsFile);
    await fs.ensureDir(path.join(outputDir, "blog", post.slug));
    await fs.writeFile(
      path.join(outputDir, "blog", post.slug, "index.html"),
      postHtml
    );
  }

  console.log("✅ Static pages generated successfully!");
  console.log("📊 Generated pages:");
  console.log("  - /blog/index.html");
  posts.forEach((post) => {
    console.log(`  - /blog/${post.slug}/index.html`);
  });
}

function generateBlogIndexHtml(posts, cssFile, jsFile) {
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>בלוג - Amit Solutions</title>
  <meta name="description" content="טיפים ומדריכים לפיתוח אתרים, קידום אתרים SEO, ועיצוב אתרים מקצועי. גלה איך לשפר את הנוכחות הדיגיטלית של העסק שלך.">
  <meta name="keywords" content="בלוג, אתרים, SEO, קידום אתרים, עיצוב אתרים, טיפים">
  <meta name="author" content="עמית">
  <link rel="canonical" href="https://amit-solutions.co.il/blog/">
  
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-JYJF8SBNR9"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-JYJF8SBNR9', {
      send_page_view: true
    });
    
    // Track blog index engagement
    gtag('event', 'blog_index_view', {
      'event_category': 'blog',
      'event_label': 'blog_index'
    });
    
    // Track blog post clicks
    document.addEventListener('click', function(e) {
      if (e.target.closest('a[href*="/blog/"]')) {
        const link = e.target.closest('a[href*="/blog/"]');
        const postSlug = link.href.split('/blog/')[1].replace('/', '');
        gtag('event', 'blog_post_click', {
          'event_category': 'blog',
          'event_label': postSlug,
          'transport_type': 'beacon'
        });
      }
    });
  </script>
  
  <!-- Open Graph -->
  <meta property="og:title" content="בלוג - Amit Solutions">
  <meta property="og:description" content="טיפים ומדריכים לפיתוח אתרים, קידום אתרים SEO, ועיצוב אתרים מקצועי.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://amit-solutions.co.il/blog/">
  <meta property="og:image" content="https://amit-solutions.co.il/img/logo.webp">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="בלוג - Amit Solutions">
  <meta name="twitter:description" content="טיפים ומדריכים לפיתוח אתרים, קידום אתרים SEO, ועיצוב אתרים מקצועי.">
  <meta name="twitter:image" content="https://amit-solutions.co.il/img/logo.webp">
  
  <!-- Preload critical resources -->
  <link rel="preload" href="/static/css/${cssFile}" as="style">
  <link rel="preload" href="/static/js/${jsFile}" as="script">
  
  <!-- Styles -->
  <link rel="stylesheet" href="/static/css/${cssFile}">
</head>
<body>
  <div id="root">
    <div class="min-h-screen bg-black">
      <!-- Navigation -->
      <nav class="py-6 bg-gray-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between">
            <a href="/" class="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors">
              <svg class="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              עמוד הבית
            </a>
            <div class="text-yellow-400 font-medium">הבלוג שלנו</div>
          </div>
        </div>
      </nav>

      <!-- Header -->
      <section class="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">הבלוג שלנו</h1>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">
              טיפים ומדריכים מקצועיים לפיתוח אתרים, קידום אתרים SEO, ועיצוב אתרים
            </p>
          </div>
        </div>
      </section>

      <!-- Blog Posts -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${posts
            .map(
              (post) => `
            <article class="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-400 transition-colors">
              <div class="aspect-video bg-gray-800 relative">
                <img src="${post.coverImage}" alt="${
                post.title
              }" class="w-full h-full object-cover">
              </div>
              <div class="p-6">
                <div class="flex items-center text-sm text-gray-400 mb-3">
                  <svg class="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <time>${new Date(post.publishedAt).toLocaleDateString(
                    "he-IL"
                  )}</time>
                  <span class="mx-2">•</span>
                  <svg class="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>${post.readTime}</span>
                </div>
                <h3 class="text-xl font-semibold text-white mb-3 line-clamp-2">${
                  post.title
                }</h3>
                <p class="text-gray-300 mb-4 line-clamp-3">${post.excerpt}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                  ${post.tags
                    .map(
                      (tag) =>
                        `<span class="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">${tag}</span>`
                    )
                    .join("")}
                </div>
                <a href="/blog/${
                  post.slug
                }/" class="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors font-medium">
                  <span>קרא עוד</span>
                  <svg class="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 19-7-7 7-7"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5"></path>
                  </svg>
                </a>
              </div>
            </article>
          `
            )
            .join("")}
        </div>
      </div>
    </div>
  </div>

  <!-- Scripts -->
  <script src="/static/js/${jsFile}"></script>
  <!-- Sticky CTA Buttons - Expandable Design Like Homepage -->
  <div id="sticky-cta" style="position: fixed !important; bottom: 20px !important; left: 20px !important; z-index: 99999 !important; display: block !important; visibility: visible !important; opacity: 1 !important;">
    <div id="sticky-cta-buttons" style="display: none !important; flex-direction: column !important; align-items: center !important; gap: 8px !important; margin-bottom: 8px !important;">
      <!-- WhatsApp Button -->
      <a href="https://wa.me/972547926661?text=שלום! אני מעוניין בשירותי בניית אתרים" 
         target="_blank" 
         rel="noopener noreferrer"
         style="background-color: #10B981 !important; color: white !important; padding: 12px !important; border-radius: 50% !important; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important; display: flex !important; align-items: center !important; justify-content: center !important; width: 48px !important; height: 48px !important; font-size: 16px !important; visibility: visible !important; opacity: 1 !important; text-decoration: none !important; transition: all 0.3s ease !important;"
         onmouseover="this.style.transform='scale(1.05)'" 
         onmouseout="this.style.transform='scale(1)'"
         onclick="gtag('event', 'click', {'event_category': 'contact', 'event_label': 'whatsapp_sticky', 'transport_type': 'beacon'});">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </a>
      
      <!-- Phone Button -->
      <a href="tel:+972547926661" 
         style="background-color: #3B82F6 !important; color: white !important; padding: 12px !important; border-radius: 50% !important; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important; display: flex !important; align-items: center !important; justify-content: center !important; width: 48px !important; height: 48px !important; font-size: 16px !important; visibility: visible !important; opacity: 1 !important; text-decoration: none !important; transition: all 0.3s ease !important;"
         onmouseover="this.style.transform='scale(1.05)'" 
         onmouseout="this.style.transform='scale(1)'"
         onclick="gtag('event', 'click', {'event_category': 'contact', 'event_label': 'phone_sticky', 'transport_type': 'beacon'});">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      </a>
      
      <!-- Email Button -->
      <a href="mailto:amit9021@gmail.com" 
         style="background-color: #fbbf24 !important; color: #000 !important; padding: 12px !important; border-radius: 50% !important; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important; display: flex !important; align-items: center !important; justify-content: center !important; width: 48px !important; height: 48px !important; font-size: 16px !important; visibility: visible !important; opacity: 1 !important; text-decoration: none !important; transition: all 0.3s ease !important;"
         onmouseover="this.style.transform='scale(1.05)'" 
         onmouseout="this.style.transform='scale(1)'"
         onclick="gtag('event', 'click', {'event_category': 'contact', 'event_label': 'email_sticky', 'transport_type': 'beacon'});">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      </a>
    </div>
    
    <!-- Plus Button (Main Toggle) -->
    <button id="sticky-cta-toggle" 
            style="background-color: #fbbf24 !important; color: #000 !important; padding: 16px !important; border-radius: 50% !important; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important; display: flex !important; align-items: center !important; justify-content: center !important; width: 56px !important; height: 56px !important; font-size: 24px !important; visibility: visible !important; opacity: 1 !important; text-decoration: none !important; transition: all 0.3s ease !important; border: none !important; cursor: pointer !important;"
            onmouseover="this.style.transform='scale(1.05)'" 
            onmouseout="this.style.transform='scale(1)'"
            onclick="toggleStickyCTA()">
      <span id="sticky-cta-icon" style="transition: transform 0.3s ease !important;">+</span>
    </button>
  </div>

  <script>
    function toggleStickyCTA() {
      const buttons = document.getElementById('sticky-cta-buttons');
      const icon = document.getElementById('sticky-cta-icon');
      
      if (buttons.style.display === 'none' || buttons.style.display === '') {
        buttons.style.display = 'flex';
        icon.style.transform = 'rotate(45deg)';
        gtag('event', 'expand', {'event_category': 'cta', 'event_label': 'floating_cta'});
      } else {
        buttons.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
        gtag('event', 'collapse', {'event_category': 'cta', 'event_label': 'floating_cta'});
      }
    }
  </script>

  <script>
    // Initialize React app
    if (typeof window !== 'undefined' && window.React && window.ReactDOM) {
      window.ReactDOM.render(window.React.createElement(window.App), document.getElementById('root'));
    }
  </script>
</body>
</html>`;
}

function generateBlogPostHtml(post, cssFile, jsFile) {
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title} - Amit Solutions</title>
  <meta name="description" content="${post.excerpt}">
  <meta name="keywords" content="${post.tags.join(", ")}">
  <meta name="author" content="${post.author}">
  <link rel="canonical" href="https://amit-solutions.co.il/blog/${post.slug}/">
  
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-JYJF8SBNR9"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-JYJF8SBNR9', {
      send_page_view: true,
      custom_map: {
        'custom_parameter_1': 'blog_post_title',
        'custom_parameter_2': 'blog_post_category'
      }
    });
    
    // Track blog post engagement
    gtag('event', 'blog_post_view', {
      'blog_post_title': '${post.title}',
      'blog_post_category': '${post.tags.join(", ")}',
      'blog_post_author': '${post.author}',
      'blog_post_read_time': '${post.readTime}'
    });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll >= 25 && maxScroll < 50) {
          gtag('event', 'scroll', {
            'event_category': 'engagement',
            'event_label': '25%',
            'value': 25
          });
        } else if (maxScroll >= 50 && maxScroll < 75) {
          gtag('event', 'scroll', {
            'event_category': 'engagement',
            'event_label': '50%',
            'value': 50
          });
        } else if (maxScroll >= 75 && maxScroll < 90) {
          gtag('event', 'scroll', {
            'event_category': 'engagement',
            'event_label': '75%',
            'value': 75
          });
        } else if (maxScroll >= 90) {
          gtag('event', 'scroll', {
            'event_category': 'engagement',
            'event_label': '90%',
            'value': 90
          });
        }
      }
    });
    
    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', function() {
      let timeOnPage = Math.round((Date.now() - startTime) / 1000);
      gtag('event', 'timing_complete', {
        'name': 'time_on_page',
        'value': timeOnPage
      });
    });
    
    // Track external link clicks
    document.addEventListener('click', function(e) {
      if (e.target.tagName === 'A' && e.target.hostname !== window.location.hostname) {
        gtag('event', 'click', {
          'event_category': 'outbound',
          'event_label': e.target.href,
          'transport_type': 'beacon'
        });
      }
    });
  </script>
  
  <!-- Open Graph -->
  <meta property="og:title" content="${post.title}">
  <meta property="og:description" content="${post.excerpt}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://amit-solutions.co.il/blog/${
    post.slug
  }/index.html">
  <meta property="og:image" content="${post.coverImage}">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${post.title}">
  <meta name="twitter:description" content="${post.excerpt}">
  <meta name="twitter:image" content="${post.coverImage}">
  
  <!-- Article structured data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${post.title}",
    "description": "${post.excerpt}",
    "image": "${post.coverImage}",
    "author": {
      "@type": "Person",
      "name": "${post.author}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Amit Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://amit-solutions.co.il/img/logo.webp"
      }
    },
    "datePublished": "${post.publishedAt}",
    "dateModified": "${post.publishedAt}"
  }
  </script>
  
  <!-- Preload critical resources -->
  <link rel="preload" href="/static/css/${cssFile}" as="style">
  <link rel="preload" href="/static/js/${jsFile}" as="script">
  
  <!-- Styles -->
  <link rel="stylesheet" href="/static/css/${cssFile}">
</head>
<body>
  <div id="root">
    <div class="min-h-screen bg-black">
      <!-- Navigation -->
      <nav class="py-6 bg-gray-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between">
            <a href="/blog/" class="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors">
              <svg class="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 19-7-7 7-7"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5"></path>
              </svg>
              חזרה לבלוג
            </a>
            <a href="/" class="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors">
              <svg class="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              עמוד הבית
            </a>
          </div>
        </div>
      </nav>

      <!-- Article Header -->
      <header class="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto">
            <div class="flex flex-wrap gap-2 mb-6">
              ${post.tags
                .map(
                  (tag) =>
                    `<span class="px-3 py-1 bg-yellow-400 text-black text-sm font-medium rounded-full">${tag}</span>`
                )
                .join("")}
            </div>

            <h1 class="text-4xl md:text-5xl font-bold mb-6">${post.title}</h1>

            <p class="text-xl text-gray-300 mb-8">${post.excerpt}</p>

            <div class="flex items-center gap-6 text-gray-400">
              <div class="flex items-center">
                <svg class="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                ${post.author}
              </div>
              <div class="flex items-center">
                <svg class="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                ${new Date(post.publishedAt).toLocaleDateString("he-IL")}
              </div>
              <div class="flex items-center">
                <svg class="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                ${post.readTime}
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Article Content -->
      <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div class="prose prose-lg max-w-none">
          ${post.content.replace(/\n/g, "<br>")}
        </div>
      </article>
    </div>
  </div>
</div>


<!-- Scripts -->
  <script src="/static/js/${jsFile}"></script>
  <!-- Sticky CTA Buttons - Expandable Design Like Homepage -->
  <div id="sticky-cta" style="position: fixed !important; bottom: 20px !important; left: 20px !important; z-index: 99999 !important; display: block !important; visibility: visible !important; opacity: 1 !important;">
    <div id="sticky-cta-buttons" style="display: none !important; flex-direction: column !important; align-items: center !important; gap: 8px !important; margin-bottom: 8px !important;">
      <!-- WhatsApp Button -->
      <a href="https://wa.me/972547926661?text=שלום! אני מעוניין בשירותי בניית אתרים" 
         target="_blank" 
         rel="noopener noreferrer"
         style="background-color: #10B981 !important; color: white !important; padding: 12px !important; border-radius: 50% !important; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important; display: flex !important; align-items: center !important; justify-content: center !important; width: 48px !important; height: 48px !important; font-size: 16px !important; visibility: visible !important; opacity: 1 !important; text-decoration: none !important; transition: all 0.3s ease !important;"
         onmouseover="this.style.transform='scale(1.05)'" 
         onmouseout="this.style.transform='scale(1)'"
         onclick="gtag('event', 'click', {'event_category': 'contact', 'event_label': 'whatsapp_sticky', 'transport_type': 'beacon'});">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </a>
      
      <!-- Phone Button -->
      <a href="tel:+972547926661" 
         style="background-color: #3B82F6 !important; color: white !important; padding: 12px !important; border-radius: 50% !important; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important; display: flex !important; align-items: center !important; justify-content: center !important; width: 48px !important; height: 48px !important; font-size: 16px !important; visibility: visible !important; opacity: 1 !important; text-decoration: none !important; transition: all 0.3s ease !important;"
         onmouseover="this.style.transform='scale(1.05)'" 
         onmouseout="this.style.transform='scale(1)'"
         onclick="gtag('event', 'click', {'event_category': 'contact', 'event_label': 'phone_sticky', 'transport_type': 'beacon'});">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      </a>
      
      <!-- Email Button -->
      <a href="mailto:amit9021@gmail.com" 
         style="background-color: #fbbf24 !important; color: #000 !important; padding: 12px !important; border-radius: 50% !important; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important; display: flex !important; align-items: center !important; justify-content: center !important; width: 48px !important; height: 48px !important; font-size: 16px !important; visibility: visible !important; opacity: 1 !important; text-decoration: none !important; transition: all 0.3s ease !important;"
         onmouseover="this.style.transform='scale(1.05)'" 
         onmouseout="this.style.transform='scale(1)'"
         onclick="gtag('event', 'click', {'event_category': 'contact', 'event_label': 'email_sticky', 'transport_type': 'beacon'});">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      </a>
    </div>
    
    <!-- Plus Button (Main Toggle) -->
    <button id="sticky-cta-toggle" 
            style="background-color: #fbbf24 !important; color: #000 !important; padding: 16px !important; border-radius: 50% !important; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important; display: flex !important; align-items: center !important; justify-content: center !important; width: 56px !important; height: 56px !important; font-size: 24px !important; visibility: visible !important; opacity: 1 !important; text-decoration: none !important; transition: all 0.3s ease !important; border: none !important; cursor: pointer !important;"
            onmouseover="this.style.transform='scale(1.05)'" 
            onmouseout="this.style.transform='scale(1)'"
            onclick="toggleStickyCTA()">
      <span id="sticky-cta-icon" style="transition: transform 0.3s ease !important;">+</span>
    </button>
  </div>

  <script>
    function toggleStickyCTA() {
      const buttons = document.getElementById('sticky-cta-buttons');
      const icon = document.getElementById('sticky-cta-icon');
      
      if (buttons.style.display === 'none' || buttons.style.display === '') {
        buttons.style.display = 'flex';
        icon.style.transform = 'rotate(45deg)';
        gtag('event', 'expand', {'event_category': 'cta', 'event_label': 'floating_cta'});
      } else {
        buttons.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
        gtag('event', 'collapse', {'event_category': 'cta', 'event_label': 'floating_cta'});
      }
    }
  </script>

  <script>
    // Initialize React app
    if (typeof window !== 'undefined' && window.React && window.ReactDOM) {
      window.ReactDOM.render(window.React.createElement(window.App), document.getElementById('root'));
    }
  </script>
</body>
</html>`;
}

// Run the generation
if (require.main === module) {
  generateStaticPages().catch(console.error);
}

module.exports = { generateStaticPages };
