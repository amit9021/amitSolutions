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

## 📞 תמיכה

לשאלות או בעיות:

- **WhatsApp**: +972-50-000-0000
- **אימייל**: amit@amitsolutions.co.il

---

**Amit Solutions** - אתרים מהירים שמביאים פניות 🚀
