/**
 * Content Generator for SEO-optimized Hebrew blog posts
 * Supports OpenAI and Groq LLM providers
 */

const https = require('https');

/**
 * Base Content Generator interface
 */
class ContentGenerator {
  async generatePost(topic, keywords, existingPosts) {
    throw new Error('generatePost must be implemented');
  }
}

/**
 * OpenAI Content Generator
 */
class OpenAIContentGenerator extends ContentGenerator {
  constructor(apiKey) {
    super();
    this.apiKey = apiKey;
    this.model = 'gpt-4o-mini';
  }

  async generatePost(topic, keywords, existingPosts) {
    const existingTitles = existingPosts.map((p) => p.title).join('\n- ');
    const existingSlugs = existingPosts.map((p) => p.slug).join(', ');

    // Random selection of 2 existing posts for internal linking
    const randomPosts = existingPosts
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    const internalLinkSuggestions = randomPosts.map((p) => `[${p.title}](/blog/${p.slug})`).join(' או ');

    const prompt = `אתה כותב תוכן SEO מקצועי בעברית לאתר של חברת פיתוח אתרים בישראל (Amit Solutions).

**נושא:** ${topic.topic}
**מילות מפתח:** ${keywords.join(', ')}

**דרישות:**
1. כתוב מאמר בעברית באורך 500-800 מילים
2. מבנה: כותרת ראשית (H1), מבוא, 3-4 כותרות משנה (H2/H3), סיכום וקריאה לפעולה
3. כלול לפחות סעיף אחד מסוג "איך לעשות" (How-to) עם צעדים פרקטיים
4. תן דוגמאות רלוונטיות לישראל ולעסקים קטנים
5. כתוב בסגנון ישיר, מקצועי אך נגיש
6. כלול 2 קישורים פנימיים לפוסטים קיימים: ${internalLinkSuggestions}
7. תיאור מטא (meta description) עד 150 תווים
8. הצע slug בעברית (אותיות אנגליות בלבד, מופרד במקפים)
9. הצע 2-3 תגים רלוונטיים
10. **חשוב:** אל תכתוב מאמר דומה לפוסטים הקיימים הבאים:
${existingTitles}

**פורמט תשובה (JSON בלבד):**
\`\`\`json
{
  "title": "כותרת מושכת בעברית",
  "slug": "suggested-slug-in-english",
  "excerpt": "תקציר קצר של המאמר (1-2 משפטים)",
  "meta": "תיאור מטא עד 150 תווים",
  "tags": ["תג1", "תג2", "תג3"],
  "content": "תוכן המאמר המלא בפורמט Markdown עם H1, H2, H3, רשימות ודוגמאות",
  "readTime": "X דקות קריאה"
}
\`\`\`

**חשוב:** ודא שהמאמר ייחודי, מקורי, ולא מעתיק את הפוסטים הקיימים. השתמש במילות מפתח באופן טבעי.`;

    try {
      const response = await this._callOpenAI(prompt);
      return this._parseResponse(response);
    } catch (error) {
      throw new Error(`OpenAI generation failed: ${error.message}`);
    }
  }

  async _callOpenAI(prompt) {
    const data = JSON.stringify({
      model: this.model,
      messages: [
        {
          role: 'system',
          content: 'אתה כותב תוכן SEO מקצועי בעברית. תמיד החזר תשובות בפורמט JSON תקין.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 2500,
    });

    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.openai.com',
        port: 443,
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Length': Buffer.byteLength(data, 'utf8'),
        },
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(new Error(`OpenAI API error: ${res.statusCode} - ${body}`));
          } else {
            try {
              const parsed = JSON.parse(body);
              resolve(parsed.choices[0].message.content);
            } catch (err) {
              reject(new Error(`Failed to parse OpenAI response: ${err.message}`));
            }
          }
        });
      });

      req.on('error', (error) => reject(error));
      req.write(data);
      req.end();
    });
  }

  _parseResponse(response) {
    let jsonString = response;

    // Normalize line endings (remove \r)
    jsonString = jsonString.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    // Try to extract JSON from markdown code blocks
    const jsonMatch = jsonString.match(/```json\n?([\s\S]*?)\n?```/) || jsonString.match(/```\n?([\s\S]*?)\n?```/);
    if (jsonMatch) {
      jsonString = jsonMatch[1];
    } else {
      // Try to find JSON object by looking for { and the matching }
      let braceCount = 0;
      let jsonStart = -1;
      let jsonEnd = -1;

      for (let i = 0; i < jsonString.length; i++) {
        if (jsonString[i] === '{') {
          if (braceCount === 0) {
            jsonStart = i;
          }
          braceCount++;
        } else if (jsonString[i] === '}') {
          braceCount--;
          if (braceCount === 0 && jsonStart !== -1) {
            jsonEnd = i;
            break;
          }
        }
      }

      if (jsonStart !== -1 && jsonEnd !== -1) {
        jsonString = jsonString.substring(jsonStart, jsonEnd + 1);
      }
    }

    try {
      // Clean up and parse
      const cleaned = jsonString.trim();
      const parsed = JSON.parse(cleaned);

      // Validate required fields
      const required = ['title', 'slug', 'excerpt', 'meta', 'tags', 'content', 'readTime'];
      for (const field of required) {
        if (!parsed[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      // Validate meta length
      if (parsed.meta.length > 160) {
        parsed.meta = parsed.meta.substring(0, 157) + '...';
      }

      return parsed;
    } catch (error) {
      // Show clean version in error for debugging
      const preview = jsonString.replace(/\s+/g, ' ').substring(0, 500);
      throw new Error(`Failed to parse generated content: ${error.message}\nCleaned preview: ${preview}...`);
    }
  }
}

/**
 * Groq Content Generator
 */
class GroqContentGenerator extends OpenAIContentGenerator {
  constructor(apiKey, model = null) {
    super(apiKey);
    // Use provided model or default to llama-3.3-70b-versatile
    this.model = model || 'llama-3.3-70b-versatile';
  }

  async generatePost(topic, keywords, existingPosts) {
    const existingTitles = existingPosts.map((p) => p.title).join('\n- ');

    // Random selection of 2 existing posts for internal linking
    const randomPosts = existingPosts
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    const internalLinkSuggestions = randomPosts.map((p) => `[${p.title}](/blog/${p.slug})`).join(' או ');

    const prompt = `אתה כותב תוכן SEO מקצועי ומעמיק בעברית לאתר של חברת פיתוח אתרים בישראל (Amit Solutions). המאמר חייב לספק ערך אמיתי לקורא ולא להיות שטחי.

**נושא:** ${topic.topic}
**מילות מפתח:** ${keywords.join(', ')}

**דרישות תוכן (חובה!):**

1. **אורך ועומק:** 700-900 מילים בעברית עם תוכן מעמיק ומקצועי

2. **מבנה מלא:**
   - H1 כותרת ראשית עם ערך מוסף ברור
   - מבוא חזק (2-3 פסקאות) שמסביר למה זה חשוב
   - 4-6 כותרות H2/H3 עם תת-סעיפים מפורטים
   - סיכום עם bullet points של המסרים העיקריים
   - קריאה לפעולה ספציפית

3. **תוכן איכותי חובה:**
   - **נתונים ומספרים קונקרטיים** (אחוזים, סטטיסטיקות, מחקרים)
   - **דוגמאות ממשיות** עם תוצאות מדידות (לפני/אחרי, זמנים, אחוזי שיפור)
   - **הסברים טכניים מפורטים** אבל בשפה נגישה
   - **כלים וטכנולוגיות ספציפיות** (שמות כלים, שירותים, פלטפורמות)
   - **טיפים פרקטיים** שאפשר ליישם מיד עם הסבר איך

4. **מדריך "איך לעשות" מפורט:**
   - לפחות 5-7 צעדים קונקרטיים
   - כל צעד עם הסבר מפורט (לא רק כותרת!)
   - דוגמאות קוד/הגדרות/צילומי מסך בתיאור
   - אזהרות או טיפים נוספים לכל צעד

5. **דוגמאות לישראל:**
   - מקרים ספציפיים של עסקים בישראל (אפילו בדויים אבל ריאליסטיים)
   - מחירים בשקלים
   - התייחסות לשוק הישראלי
   - כלים ושירותים נפוצים בישראל

6. **קישורים פנימיים:** שלב טבעית 2 קישורים: ${internalLinkSuggestions}

7. **SEO מתקדם:**
   - Meta description עד 150 תווים עם call-to-action
   - Slug באנגלית משמעותית: "how-to-[topic]" או "[topic]-complete-guide"
   - 2-3 תגים רלוונטיים בעברית

8. **הימנע מ:**
   - תוכן כללי ושטחי ("זה חשוב", "זה טוב")
   - משפטי מילוי ללא ערך
   - רשימות קצרות בלי הסברים
   - נושאים שכבר קיימים: ${existingTitles}

**דוגמה לאיכות מצופה:**
❌ "אתרים מהירים חשובים ללקוחות"
✅ "מחקרים מראים שכל שנייה של עיכוב בטעינת דף יכולה להפחית את יחס ההמרה ב־7%. אתרי חנויות שדחסו תמונות והורידו זמן טעינה מ־5 שניות ל־1.8 שניות הכפילו המרות תוך חודש."

**פורמט תשובה (JSON בלבד):**
\`\`\`json
{
  "title": "כותרת מושכת עם ערך מוסף ברור",
  "slug": "descriptive-english-slug-with-keywords",
  "excerpt": "תקציר קצר אבל מושך (1-2 משפטים) שמסביר מה הקורא ירויח",
  "meta": "תיאור SEO עד 150 תווים עם call-to-action",
  "tags": ["תג1", "תג2", "תג3"],
  "content": "תוכן המאמר המלא בפורמט Markdown - לפחות 700 מילים, עם H1, H2, H3, רשימות, נתונים, דוגמאות, וערך אמיתי לקורא",
  "readTime": "X דקות קריאה"
}
\`\`\`

**זכור:** המאמר חייב להיות מקצועי, מעמיק, ומלא בערך אמיתי. קורא שקורא את המאמר צריך לצאת עם ידע פרקטי שהוא יכול ליישם מיד ולהבין בדיוק מה לעשות ואיך.`;

    try {
      const response = await this._callGroq(prompt);
      return this._parseResponse(response);
    } catch (error) {
      throw new Error(`Groq generation failed: ${error.message}`);
    }
  }

  async _callGroq(prompt) {
    // Some models don't support response_format, so we'll try with and without
    const basePayload = {
      model: this.model,
      messages: [
        {
          role: 'system',
          content: 'You are a professional SEO content writer in Hebrew. YOU MUST return ONLY valid JSON format - no other text, no markdown, no code examples. The entire response must be parseable JSON. Write comprehensive, detailed content with at least 700-900 words in Hebrew.',
        },
        {
          role: 'user',
          content: prompt + '\n\n**CRITICAL: Return ONLY the JSON object. No markdown formatting, no code blocks, no explanations. Just the raw JSON.**',
        },
      ],
      temperature: 0.7,
      max_tokens: 8000,
    };

    // Try with response_format for models that support it
    // If model name contains "llama" or "mistral", use response_format
    const supportsJsonMode = this.model.includes('llama') || this.model.includes('mistral');
    if (supportsJsonMode) {
      basePayload.response_format = { type: 'json_object' };
    }

    const data = JSON.stringify(basePayload);

    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.groq.com',
        port: 443,
        path: '/openai/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Length': Buffer.byteLength(data, 'utf8'),
        },
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(new Error(`Groq API error: ${res.statusCode} - ${body}`));
          } else {
            try {
              const parsed = JSON.parse(body);
              resolve(parsed.choices[0].message.content);
            } catch (err) {
              reject(new Error(`Failed to parse Groq response: ${err.message}\nBody: ${body.substring(0, 500)}`));
            }
          }
        });
      });

      req.on('error', (error) => reject(error));
      req.write(data, 'utf8');
      req.end();
    });
  }
  // Inherits _parseResponse from OpenAIContentGenerator
}

/**
 * Factory function to create content generator
 */
function createContentGenerator(generatorType = 'groq', apiKey = null, model = null) {
  switch (generatorType.toLowerCase()) {
    case 'openai':
      if (!apiKey) throw new Error('OpenAI API key required');
      return new OpenAIContentGenerator(apiKey);
    case 'groq':
      if (!apiKey) throw new Error('Groq API key required');
      // Pass model, but GroqContentGenerator will use default if null/undefined
      return new GroqContentGenerator(apiKey, model || undefined);
    default:
      throw new Error(`Unknown generator type: ${generatorType}. Use 'openai' or 'groq'`);
  }
}

module.exports = {
  createContentGenerator,
  OpenAIContentGenerator,
  GroqContentGenerator,
  ContentGenerator,
};
