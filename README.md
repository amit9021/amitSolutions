# Amit Solutions - אתר תדמית אישי

אתר תדמית מודרני ומהיר לעסקים קטנים ובעלי מקצוע, בנוי ב-React עם Tailwind CSS ו-Framer Motion.

## 🚀 איך מריצים

```bash
# התקנת תלויות
npm install

# הרצה במצב פיתוח
npm start

# בנייה לפרודקשן
npm run build
```

## 📝 היכן לשנות תוכן

### פרטי יצירת קשר

- **WhatsApp/טלפון**: `src/data/data.json` → `Contact.phone` ו-`Contact.whatsapp`
- **אימייל**: `src/data/data.json` → `Contact.email`
- **אזור שירות**: `src/data/data.json` → `Contact.serviceArea`

### מידע על העסק

- **שם העסק**: `src/data/data.json` → `Header.title`
- **סלוגן**: `src/data/data.json` → `Header.tagline`
- **תיאור**: `src/data/data.json` → `Header.paragraph`

### מחירון

- **מחירים**: `src/data/data.json` → `Pricing` (ערוך את `price` בכל חבילה)
- **תכולות**: `src/data/data.json` → `Pricing` (ערוך את `features` בכל חבילה)

### פורטפוליו

- **פרויקטים**: `src/data/data.json` → `Portfolio`
- **הוספת פרויקט חדש**: הוסף אובייקט חדש עם `title`, `description`, `url`, `status: "completed"`
- **פרויקט "בקרוב"**: השתמש ב-`status: "coming-soon"`

## 🎨 היכן לשנות עיצוב

### צבעים

- **צבע ראשי**: `src/App.jsx` → חפש `bg-blue-600` והחלף
- **צבע משני**: `src/App.jsx` → חפש `bg-green-500` והחלף
- **רקע**: `src/App.jsx` → ב-`Hero` component, ערוך את ה-gradient

### לוגו

- **לוגו**: `src/data/data.json` → `Header.logo` (החלף נתיב לתמונה)
- **אייקון**: `src/App.jsx` → ב-`Navigation` component, ערוך את האייקון

## 📊 היכן להכניס Google Analytics / Facebook Pixel

### Google Analytics

```javascript
// הוסף ל-src/App.jsx ב-SEO component
useEffect(() => {
  // Google Analytics
  window.gtag("config", "GA_MEASUREMENT_ID");
}, []);
```

### Facebook Pixel

```javascript
// הוסף ל-src/App.jsx ב-SEO component
useEffect(() => {
  // Facebook Pixel
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );
  fbq("init", "YOUR_PIXEL_ID");
  fbq("track", "PageView");
}, []);
```

## 🔧 תכונות מתקדמות

### Dark Mode

- **מתג**: מובנה ב-Navigation
- **שמירת מצב**: אוטומטי ב-localStorage
- **CSS**: משתמש ב-Tailwind dark: classes

### אנימציות

- **Framer Motion**: מובנה בכל הקומפוננטים
- **useReducedMotion**: כיבוי אוטומטי למשתמשים עם העדפות נגישות
- **Stagger**: אנימציות מדורגות ב-Features ו-Portfolio

### נגישות

- **RTL**: תמיכה מלאה בעברית
- **ARIA**: labels ו-roles מובנים
- **Focus states**: מובנים בכל הכפתורים
- **Keyboard navigation**: תמיכה מלאה

## 📱 ביצועים

### Lighthouse 90+

- **Performance**: תמונות lazy loading, קוד מינימלי
- **Accessibility**: ARIA labels, קונטרסט תקין
- **Best Practices**: HTTPS, security headers
- **SEO**: meta tags, JSON-LD, OpenGraph

### אופטימיזציות

- **Lazy loading**: תמונות נטענות רק כשצריך
- **Code splitting**: קומפוננטים נפרדים
- **Tree shaking**: רק הקוד הנדרש נכלל

## 🚀 פריסה

### Netlify

```bash
npm run build
# העלה את תיקיית docs/ ל-Netlify
```

### Vercel

```bash
npm run build
# העלה את התיקייה ל-Vercel
```

### GitHub Pages

```bash
npm run deploy
```

## 🤖 Daily SEO Automation

This project includes an automated daily content generation pipeline that:

- Performs keyword research relevant to your blog topics
- Generates 2 SEO-optimized Hebrew blog posts per day
- Validates content quality (duplicates, word count, readability)
- Saves posts in the correct format with proper frontmatter
- Automatically updates the sitemap
- Runs daily via GitHub Actions at 02:00 UTC

### Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment variables:**

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:

- `LLM_PROVIDER`: LLM provider to use (`groq` or `openai`). Default: `groq` (recommended - faster and cheaper)
- `GROQ_API_KEY`: Your Groq API key (get from https://console.groq.com/keys) - **Recommended**
- `OPENAI_API_KEY`: Your OpenAI API key (get from https://platform.openai.com/api-keys) - Alternative if using OpenAI
- `BASE_URL`: Your website URL (e.g., `https://amit-solutions.co.il`)

Optional variables:

- `LLM_MODEL`: Specific model to use (Groq: `llama-3.3-70b-versatile`, OpenAI: `gpt-4o-mini`)
- `KEYWORD_PROVIDER`: Keyword provider (`stub`, `ahrefs`, or `semrush`). Default: `stub`
- `SEED_QUERIES`: Comma-separated topics (e.g., `בניית אתרים,קידום אתרים,SEO`)
- `POSTS_PER_DAY`: Number of posts to generate daily (default: `2`)
- `DRAFT_MODE`: Generate drafts for review (`true`) or publish directly (`false`)

3. **Test locally:**

```bash
npm run seo:daily
```

This will generate 2 draft posts in `src/content/posts/` and update the sitemap.

### GitHub Actions Setup

The automation runs automatically via GitHub Actions. To enable it:

1. **Add secrets to your repository:**

   Go to **Settings → Secrets and variables → Actions** and add:

   - `GROQ_API_KEY`: Your Groq API key (recommended) OR
   - `OPENAI_API_KEY`: Your OpenAI API key (if using OpenAI)
   - `KEYWORD_API_KEY` (optional): Only if using `ahrefs` or `semrush`

2. **Add variables (optional):**

   Go to **Settings → Secrets and variables → Actions → Variables**:

   - `LLM_PROVIDER`: `groq` (default) or `openai`
   - `LLM_MODEL`: Model to use (optional)
   - `BASE_URL`: Your website URL
   - `POSTS_PER_DAY`: Number of posts per day (default: `2`)
   - `DRAFT_MODE`: `true` to generate drafts, `false` to publish directly
   - `SEED_QUERIES`: Custom topics to generate about

3. **Enable Actions:**

   Make sure GitHub Actions are enabled in your repository settings.

4. **Manual trigger:**

   Go to **Actions → Daily SEO Content Generation → Run workflow** to test immediately.

### How It Works

#### 1. Keyword Research

The system uses a pluggable keyword provider:

- **Stub Provider** (default): Uses mock keyword clusters for testing
- **Ahrefs/Semrush** (future): Real keyword research via API

Keywords are filtered to avoid duplicating existing topics.

#### 2. Content Generation

Uses Groq (Llama 3.3 70B) or OpenAI to generate:

- Hebrew blog posts (500-800 words)
- H2/H3 structure with practical how-to sections
- Examples relevant to Israel and small businesses
- 2 internal links to existing posts
- Meta description (≤150 chars)
- Proper tags and slug

#### 3. Quality Checks

Each post is validated for:

- **Duplicate detection**: Title, slug, and content similarity checks
- **Word count**: Ensures 500-800 words
- **Readability**: Checks for headers, lists, paragraph length
- **Hebrew normalization**: Fixes spacing, quotes, punctuation

#### 4. File Saving

Posts are saved in the exact format you already use:

```javascript
export const post = {
  slug: "suggested-slug",
  title: "כותרת בעברית",
  excerpt: "תקציר המאמר",
  coverImage: "https://...",
  author: "עמית",
  publishedAt: "2024-12-30",
  readTime: "5 דקות קריאה",
  tags: ["SEO", "אתרים"],
  content: `# Markdown content...`,
};
```

The `src/content/posts/index.js` is automatically updated to include new posts.

#### 5. Sitemap Update

The sitemap is regenerated after new posts are created. To notify Google:

```bash
curl "https://www.google.com/ping?sitemap=https://amit-solutions.co.il/sitemap.xml"
```

### Architecture

```
lib/seo/
├── keywordProvider.js   # Keyword research (stub, ahrefs, semrush)
├── contentGenerator.js  # Content generation via OpenAI
├── quality.js           # Quality validation & Hebrew normalization
└── io.js               # File I/O operations

scripts/
└── generate-seo-posts.js # Orchestrator script

.github/workflows/
└── daily-seo.yml        # GitHub Actions workflow
```

### Customization

**Change number of daily posts:**

```bash
# .env
POSTS_PER_DAY=3
```

**Use real keyword research:**

```bash
# .env
KEYWORD_PROVIDER=ahrefs
KEYWORD_API_KEY=your-ahrefs-api-key
```

**Publish directly without review:**

```bash
# .env
DRAFT_MODE=false
```

**Add custom topic seeds:**

```bash
# .env
SEED_QUERIES=עיצוב UX,שיווק תוכן,אתרי סחר
```

### Troubleshooting

**Script fails with "API key is required":**

- Make sure you've added `GROQ_API_KEY` (or `OPENAI_API_KEY`) to `.env` (local) or GitHub Secrets (Actions)
- Check that `LLM_PROVIDER` matches your API key (use `groq` with Groq key, `openai` with OpenAI key)

**Generated posts are duplicates:**

- The system checks for similarity, but if needed, increase diversity by adding more `SEED_QUERIES`

**Posts not appearing on site:**

- Make sure to run `npm run build` after generation
- Check that `src/content/posts/index.js` was updated correctly

**GitHub Actions not running:**

- Check **Actions** tab for errors
- Verify secrets are configured correctly
- Ensure workflow file has correct permissions

### Production Tips

1. **Start with `DRAFT_MODE=true`** to review posts before publishing
2. **Use stub provider** initially to test without API costs
3. **Monitor quality** for the first week and adjust prompts if needed
4. **Add more seed queries** if topics become repetitive
5. **Commit drafts manually** after review, or set `DRAFT_MODE=false` for full automation

## 📞 תמיכה

לשאלות או בעיות:

- **WhatsApp**: +972-50-000-0000
- **אימייל**: amit@amitsolutions.co.il

---

**Amit Solutions** - אתרים מהירים שמביאים פניות 🚀
