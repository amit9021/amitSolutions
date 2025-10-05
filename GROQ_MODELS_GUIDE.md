# 🤖 Groq Models Guide for Hebrew SEO Content

## Recommended Models (Ranked)

### 🥇 Best Choice: `llama-3.3-70b-versatile`
**Why:** Best balance of quality, speed, and Hebrew support
- ✅ Excellent Hebrew language understanding
- ✅ Supports JSON mode (`response_format`)
- ✅ 8K context window (perfect for 700-900 word articles)
- ✅ Very fast inference (~2-3 seconds)
- ✅ Stable and reliable
- 💰 Cost: ~$0.59/1M input tokens, ~$0.79/1M output tokens

**Use in .env:**
```env
LLM_PROVIDER=groq
LLM_MODEL=llama-3.3-70b-versatile
```

---

### 🥈 Alternative: `llama-3.1-70b-versatile`
**Why:** Slightly older but proven reliable
- ✅ Great Hebrew support
- ✅ Supports JSON mode
- ✅ 128K context window (overkill for our use)
- ✅ Fast
- 💰 Cost: Same as 3.3

**Use in .env:**
```env
LLM_MODEL=llama-3.1-70b-versatile
```

---

### 🥉 Budget Option: `mixtral-8x7b-32768`
**Why:** Cheaper but still good quality
- ✅ Good Hebrew support
- ✅ Supports JSON mode
- ✅ 32K context window
- ✅ Very fast
- ⚠️ Quality slightly lower than Llama 70B
- 💰 Cost: ~$0.24/1M input tokens, ~$0.24/1M output tokens (60% cheaper!)

**Use in .env:**
```env
LLM_MODEL=mixtral-8x7b-32768
```

---

## ❌ NOT Recommended

### `openai/gpt-oss-120b`
- ❌ Does NOT support JSON mode
- ❌ Inconsistent output format
- ❌ Often includes HTML/code examples in response
- ❌ Requires complex parsing workarounds
- ⚠️ Not optimized for structured output

### `llama3-8b-8192` or other small models
- ❌ Limited Hebrew vocabulary
- ❌ Lower quality content
- ❌ May not follow complex instructions

---

## Quick Comparison Table

| Model | Hebrew Quality | JSON Mode | Speed | Cost | Recommended |
|-------|---------------|-----------|-------|------|-------------|
| **llama-3.3-70b-versatile** | ⭐⭐⭐⭐⭐ | ✅ Yes | ⚡⚡⚡ Fast | 💰 Medium | ✅ **Best** |
| llama-3.1-70b-versatile | ⭐⭐⭐⭐⭐ | ✅ Yes | ⚡⚡⚡ Fast | 💰 Medium | ✅ Great |
| mixtral-8x7b-32768 | ⭐⭐⭐⭐ | ✅ Yes | ⚡⚡⚡⚡ Very Fast | 💰 Low | ✅ Budget |
| openai/gpt-oss-120b | ⭐⭐⭐ | ❌ No | ⚡⚡ Medium | 💰 High | ❌ Skip |
| llama3-8b-8192 | ⭐⭐ | ✅ Yes | ⚡⚡⚡⚡ Very Fast | 💰 Very Low | ❌ Too weak |

---

## How to Switch Models

### Option 1: Update .env (Local)
```bash
# Edit .env
LLM_PROVIDER=groq
LLM_MODEL=llama-3.3-70b-versatile  # ← Change this
GROQ_API_KEY=gsk_your_key_here
```

### Option 2: Update GitHub Actions
Go to **Settings → Variables → Actions** and set:
- `LLM_MODEL` = `llama-3.3-70b-versatile`

---

## Testing Different Models

Test locally with different models:

```bash
# Test with default (llama-3.3-70b-versatile)
npm run seo:daily

# Test with Llama 3.1
LLM_MODEL=llama-3.1-70b-versatile npm run seo:daily

# Test with Mixtral (budget)
LLM_MODEL=mixtral-8x7b-32768 npm run seo:daily
```

Compare the output quality and choose what works best for you!

---

## My Recommendation

**Start with:** `llama-3.3-70b-versatile`

This model:
- ✅ Best Hebrew content quality
- ✅ Reliable JSON output (no parsing issues)
- ✅ Fast enough for daily automation
- ✅ Good value for money
- ✅ Latest Llama 3.3 architecture

**Your .env should look like:**
```env
LLM_PROVIDER=groq
LLM_MODEL=llama-3.3-70b-versatile
GROQ_API_KEY=gsk_your_key_here
BASE_URL=https://amit-solutions.co.il
POSTS_PER_DAY=2
DRAFT_MODE=true
```

---

## Cost Estimates (2 posts/day, 60 posts/month)

| Model | Tokens/post | Cost/post | Monthly Cost |
|-------|-------------|-----------|--------------|
| llama-3.3-70b | ~4K in, ~3K out | ~$0.005 | **$0.30/mo** |
| mixtral-8x7b | ~4K in, ~3K out | ~$0.002 | **$0.12/mo** |
| gpt-oss-120b | ~4K in, ~3K out | ~$0.008 | **$0.48/mo** |

**All are incredibly cheap!** Even the most expensive option costs less than $0.50/month.

---

## Need Help?

If you're still getting parsing errors:
1. Make sure `LLM_MODEL` is set to `llama-3.3-70b-versatile`
2. Check that `LLM_PROVIDER=groq` (not `openai`)
3. Run `npm run seo:daily` to test

The Llama models have native JSON mode support and won't output HTML/code examples! 🚀
