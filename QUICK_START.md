# 🚀 Quick Start Guide - SEO Automation

## ⚡ 60 Second Setup (Groq - Recommended)

### 1. Get Groq API Key (Free)
👉 [https://console.groq.com/keys](https://console.groq.com/keys)

### 2. Configure
```bash
cp .env.example .env
```

Edit `.env`:
```env
LLM_PROVIDER=groq
GROQ_API_KEY=gsk_your_key_here
BASE_URL=https://amit-solutions.co.il
```

### 3. Run
```bash
npm install
npm run seo:daily
```

**Done!** ✅ Check `src/content/posts/` for 2 new Hebrew blog posts.

---

## 📖 Full Setup Options

### Option A: Groq (Recommended) ⚡💰
**Pros:** 10x faster, 15x cheaper, excellent quality
**Cost:** ~$0.60/month (60 posts)

```env
LLM_PROVIDER=groq
GROQ_API_KEY=gsk_your_groq_key
```

Get key: [https://console.groq.com/keys](https://console.groq.com/keys)

### Option B: OpenAI 🤖
**Pros:** Industry standard, consistent
**Cost:** ~$9/month with GPT-4o-mini

```env
LLM_PROVIDER=openai
OPENAI_API_KEY=sk-proj-your_openai_key
```

Get key: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

---

## 🎯 Usage

### Local Testing
```bash
npm run seo:daily
```

### GitHub Actions (Automated Daily)

1. **Add Secret:**
   - Go to: `Settings → Secrets → Actions`
   - Add: `GROQ_API_KEY` (or `OPENAI_API_KEY`)

2. **Optional Variables:**
   - Go to: `Settings → Variables → Actions`
   - Add: `LLM_PROVIDER=groq`, `POSTS_PER_DAY=2`, etc.

3. **Manual Run:**
   - Go to: `Actions → Daily SEO Content Generation → Run workflow`

**Automatic:** Runs daily at 02:00 UTC (04:00-05:00 Israel time)

---

## 🔧 Common Configurations

### Maximum Quality (Slow, Expensive)
```env
LLM_PROVIDER=openai
OPENAI_API_KEY=sk-proj-...
LLM_MODEL=gpt-4o
POSTS_PER_DAY=1
```

### Best Balance (Recommended)
```env
LLM_PROVIDER=groq
GROQ_API_KEY=gsk_...
LLM_MODEL=llama-3.3-70b-versatile
POSTS_PER_DAY=2
```

### Fast & Cheap (Testing)
```env
LLM_PROVIDER=groq
GROQ_API_KEY=gsk_...
LLM_MODEL=mixtral-8x7b-32768
POSTS_PER_DAY=3
```

### Manual Review Mode (Safe)
```env
LLM_PROVIDER=groq
GROQ_API_KEY=gsk_...
DRAFT_MODE=true  # Review before publishing
```

### Full Auto (Production)
```env
LLM_PROVIDER=groq
GROQ_API_KEY=gsk_...
DRAFT_MODE=false  # Auto-publish
```

---

## 🐛 Troubleshooting

### "API key is required"
✅ Add `GROQ_API_KEY` to `.env`

### "No posts generated"
✅ Check logs: All topics might be too similar to existing posts
✅ Add more `SEED_QUERIES`

### Posts are duplicates
✅ System checks similarity automatically
✅ Add diverse `SEED_QUERIES` for variety

### GitHub Actions not running
✅ Check Actions tab for errors
✅ Verify secrets are configured
✅ Ensure workflow has `contents: write` permission

---

## 📊 Cost Calculator

| Posts/Day | Days/Month | Groq Cost | OpenAI (mini) | OpenAI (4o) |
|-----------|-----------|-----------|---------------|-------------|
| 1 | 30 | $0.30 | $4.50 | $15 |
| 2 | 30 | $0.60 | $9.00 | $30 |
| 3 | 30 | $0.90 | $13.50 | $45 |

**Groq = 15x cheaper than OpenAI! 💰**

---

## 🎉 What Gets Generated?

Each post includes:
- ✅ Hebrew content (500-800 words)
- ✅ SEO-optimized title & meta description
- ✅ H2/H3 structure with how-to sections
- ✅ Examples relevant to Israel
- ✅ 2 internal links to existing posts
- ✅ Proper tags and slug
- ✅ Auto-calculated read time
- ✅ Asia/Jerusalem timezone

**Format:** `.js` files matching your existing posts exactly!

---

## 📚 More Information

- **Full Documentation:** [README.md](README.md#daily-seo-automation)
- **Groq Migration:** [GROQ_MIGRATION.md](GROQ_MIGRATION.md)
- **Implementation Details:** [SEO_AUTOMATION_SUMMARY.md](SEO_AUTOMATION_SUMMARY.md)

---

## 💡 Pro Tips

1. **Start with Groq** - It's faster, cheaper, and excellent quality
2. **Use DRAFT_MODE=true** initially to review posts
3. **Add SEED_QUERIES** for topic variety
4. **Monitor GitHub Actions logs** for the first week
5. **Compare both providers** if unsure - test locally first!

---

**Questions?** Check the documentation or open an issue.

**Ready to automate?** Run `npm run seo:daily` now! 🚀
