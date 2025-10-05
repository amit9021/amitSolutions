/**
 * Keyword Provider abstraction for SEO content generation
 * Supports multiple providers: stub (default), ahrefs, semrush, etc.
 */

/**
 * Base Keyword Provider interface
 */
class KeywordProvider {
  async getKeywords(existingTags, seedQueries = []) {
    throw new Error('getKeywords must be implemented');
  }
}

/**
 * Stub provider - returns mock keywords for testing
 */
class StubKeywordProvider extends KeywordProvider {
  async getKeywords(existingTags, seedQueries = [], existingPosts = []) {
    // Mock keyword clusters relevant to Israeli web design/SEO business
    const mockClusters = [
      {
        topic: 'בניית אתרים',
        keywords: [
          'בניית אתרים לעסקים קטנים',
          'כמה עולה בניית אתר',
          'בניית אתר תדמית',
          'אתרים לבעלי מקצוע',
        ],
        searchVolume: 1200,
        difficulty: 45,
      },
      {
        topic: 'קידום אתרים',
        keywords: [
          'קידום אתרים אורגני',
          'SEO לעסקים קטנים',
          'איך להגיע לעמוד הראשון בגוגל',
          'קידום בגוגל מקומי',
        ],
        searchVolume: 980,
        difficulty: 52,
      },
      {
        topic: 'שיפור מהירות אתר',
        keywords: [
          'למה האתר שלי איטי',
          'שיפור מהירות אתר',
          'PageSpeed Optimization',
          'Core Web Vitals',
        ],
        searchVolume: 650,
        difficulty: 38,
      },
      {
        topic: 'Google Business Profile',
        keywords: [
          'הקמת Google Business Profile',
          'איך להופיע בגוגל מפות',
          'Google My Business לעסק',
          'חיבור עסק לגוגל',
        ],
        searchVolume: 720,
        difficulty: 35,
      },
      {
        topic: 'עיצוב UX/UI',
        keywords: [
          'עיצוב UX/UI לאתרים',
          'טמפלייטים לאתרים',
          'עיצוב נכון של דף נחיתה',
          'צבעים לאתר עסקי',
        ],
        searchVolume: 540,
        difficulty: 42,
      },
      {
        topic: 'שיווק תוכן',
        keywords: [
          'שיווק דיגיטלי לעסקים קטנים בישראל',
          'פרסום בפייסבוק לעסק מקומי',
          'תוכן שיווקי לאתר',
          'אסטרטגיית תוכן למובייל',
        ],
        searchVolume: 890,
        difficulty: 48,
      },
      {
        topic: 'נגישות אתרים',
        keywords: [
          'נגישות אתרים בישראל',
          'תקן נגישות ישראלי',
          'כיצד להנגיש אתר',
          'נגישות WCAG',
        ],
        searchVolume: 610,
        difficulty: 40,
      },
      {
        topic: 'אבטחת אתרים',
        keywords: [
          'SSL למה חשוב',
          'אבטחת אתר WordPress',
          'גיבוי אתר אוטומטי',
          'הגנה מפני האקרים',
        ],
        searchVolume: 470,
        difficulty: 44,
      },
      {
        topic: 'תחזוקת אתרים',
        keywords: [
          'תחזוקת אתר חודשית',
          'עדכוני WordPress',
          'ניטור אתר 24/7',
          'שיפור ביצועי אתר',
        ],
        searchVolume: 530,
        difficulty: 38,
      },
      {
        topic: 'פרסום ממומן',
        keywords: [
          'Google Ads לעסקים קטנים',
          'פרסום בפייסבוק',
          'מתי כדאי לפרסם',
          'תקציב פרסום דיגיטלי',
        ],
        searchVolume: 820,
        difficulty: 50,
      },
      {
        topic: 'דומיין ואחסון',
        keywords: [
          'בחירת דומיין לעסק',
          'אחסון אתרים בישראל',
          'hosting מומלץ',
          'העברת אתר לאחסון חדש',
        ],
        searchVolume: 450,
        difficulty: 32,
      },
      {
        topic: 'אימייל מרקטינג',
        keywords: [
          'בניית רשימת תפוצה',
          'MailChimp למתחילים',
          'ניוזלטר יעיל',
          'שיעורי פתיחה גבוהים',
        ],
        searchVolume: 390,
        difficulty: 35,
      },
    ];

    // Advanced filtering to avoid similar topics
    const existingTopicsLower = existingPosts.map(p => p.title.toLowerCase());
    const existingTagsLower = existingTags.map((t) => t.toLowerCase());

    const filteredClusters = mockClusters.filter((cluster) => {
      const topicLower = cluster.topic.toLowerCase();
      const topicWords = topicLower.split(/\s+/);

      // Check if any word in topic matches existing tags
      const tagMatch = existingTagsLower.some((tag) =>
        topicWords.some(word => tag.includes(word) || word.includes(tag))
      );

      // Check if topic is similar to existing post titles
      const titleMatch = existingTopicsLower.some(title => {
        return topicWords.some(word => title.includes(word) && word.length > 3);
      });

      return !tagMatch && !titleMatch;
    });

    // Shuffle to add variety between runs
    const shuffled = filteredClusters.sort(() => Math.random() - 0.5);

    // Prioritize by search volume and low difficulty
    return shuffled
      .sort((a, b) => {
        const scoreA = a.searchVolume / a.difficulty;
        const scoreB = b.searchVolume / b.difficulty;
        return scoreB - scoreA;
      })
      .slice(0, 8);
  }
}

/**
 * Ahrefs provider (placeholder for future implementation)
 */
class AhrefsKeywordProvider extends KeywordProvider {
  constructor(apiKey) {
    super();
    this.apiKey = apiKey;
  }

  async getKeywords(existingTags, seedQueries = []) {
    throw new Error('Ahrefs provider not yet implemented. Use KEYWORD_PROVIDER=stub for now.');
  }
}

/**
 * Semrush provider (placeholder for future implementation)
 */
class SemrushKeywordProvider extends KeywordProvider {
  constructor(apiKey) {
    super();
    this.apiKey = apiKey;
  }

  async getKeywords(existingTags, seedQueries = []) {
    throw new Error('Semrush provider not yet implemented. Use KEYWORD_PROVIDER=stub for now.');
  }
}

/**
 * Factory function to create the appropriate provider
 */
function createKeywordProvider(providerType = 'stub', apiKey = null) {
  switch (providerType.toLowerCase()) {
    case 'stub':
      return new StubKeywordProvider();
    case 'ahrefs':
      if (!apiKey) throw new Error('Ahrefs API key required');
      return new AhrefsKeywordProvider(apiKey);
    case 'semrush':
      if (!apiKey) throw new Error('Semrush API key required');
      return new SemrushKeywordProvider(apiKey);
    default:
      console.warn(`Unknown provider type: ${providerType}, falling back to stub`);
      return new StubKeywordProvider();
  }
}

module.exports = {
  createKeywordProvider,
  StubKeywordProvider,
  AhrefsKeywordProvider,
  SemrushKeywordProvider,
};
