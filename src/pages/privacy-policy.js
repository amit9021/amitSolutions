import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Shield, Cookie, Eye, Lock } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>מדיניות פרטיות - Amit Solutions</title>
        <meta
          name="description"
          content="מדיניות הפרטיות של Amit Solutions - כל המידע על איך אנחנו שומרים ומגנים על הפרטיות שלכם"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://amit-solutions.co.il/privacy-policy" />
      </Head>

      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <Link
                href="/"
                className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-8 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 ml-2" />
                חזרה לעמוד הבית
              </Link>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-yellow-400" aria-hidden="true" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">
                  מדיניות פרטיות
                </h1>
              </div>

              <p className="text-xl text-gray-300">
                עודכן לאחרונה: {new Date().toLocaleDateString("he-IL")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto space-y-12"
            >
              {/* Introduction */}
              <div className="bg-gray-900 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-4">הקדמה</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  ב-Amit Solutions אנחנו מחויבים להגן על הפרטיות שלך. מדיניות פרטיות זו
                  מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך כאשר אתה
                  מבקר באתר שלנו או משתמש בשירותים שלנו.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="bg-gray-900 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-yellow-400" aria-hidden="true" />
                  <h2 className="text-3xl font-bold text-white">מידע שאנו אוספים</h2>
                </div>
                <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      מידע שאתה מספק לנו
                    </h3>
                    <ul className="list-disc list-inside space-y-2 mr-4">
                      <li>שם מלא וכתובת דוא"ל כאשר אתה ממלא טופס יצירת קשר</li>
                      <li>מספר טלפון כאשר אתה בוחר ליצור קשר טלפוני</li>
                      <li>תוכן ההודעות ששלחת אלינו דרך הטפסים באתר</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      מידע שנאסף אוטומטית
                    </h3>
                    <ul className="list-disc list-inside space-y-2 mr-4">
                      <li>נתוני שימוש באתר דרך Google Analytics (אנונימיים)</li>
                      <li>כתובת IP (מוסווית חלקית)</li>
                      <li>סוג דפדפן ומכשיר</li>
                      <li>דפים שבהם ביקרת וזמן השהייה</li>
                      <li>מקור ההפניה לאתר</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Information */}
              <div className="bg-gray-900 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Cookie className="w-6 h-6 text-yellow-400" aria-hidden="true" />
                  <h2 className="text-3xl font-bold text-white">
                    כיצד אנו משתמשים במידע
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                  <p>אנו משתמשים במידע שנאסף למטרות הבאות:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>מענה לפניות ושירות לקוחות</li>
                    <li>שיפור תוכן האתר וחווית המשתמש</li>
                    <li>ניתוח דפוסי שימוש באתר (Google Analytics)</li>
                    <li>שליחת מידע שיווקי (רק אם ביקשת זאת במפורש)</li>
                    <li>עמידה בדרישות חוקיות ורגולטוריות</li>
                  </ul>
                </div>
              </div>

              {/* Cookies */}
              <div className="bg-gray-900 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  שימוש בעוגיות (Cookies)
                </h2>
                <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                  <p>
                    אתר זה משתמש בעוגיות לשיפור חווית המשתמש ולניתוח תנועה. העוגיות
                    שבהן אנו משתמשים:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>
                      <strong>עוגיות אנליטיות:</strong> Google Analytics לניתוח תנועת
                      משתמשים (אנונימי)
                    </li>
                    <li>
                      <strong>עוגיות תפקודיות:</strong> שמירת העדפות כמו הסכמה
                      לעוגיות
                    </li>
                  </ul>
                  <p>
                    ניתן לחסום עוגיות דרך הגדרות הדפדפן שלך, אך זה עשוי להשפיע על
                    תפקוד האתר.
                  </p>
                </div>
              </div>

              {/* Data Protection */}
              <div className="bg-gray-900 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-yellow-400" aria-hidden="true" />
                  <h2 className="text-3xl font-bold text-white">הגנת המידע</h2>
                </div>
                <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                  <p>
                    אנו נוקטים אמצעי אבטחה סבירים להגנת המידע האישי שלך, כולל:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>הצפנת נתונים בעת העברה (HTTPS)</li>
                    <li>גישה מוגבלת למידע אישי</li>
                    <li>שמירת מידע רק לתקופה הנדרשת</li>
                    <li>שימוש בשירותים מאובטחים (Google Analytics)</li>
                  </ul>
                </div>
              </div>

              {/* Third-Party Services */}
              <div className="bg-gray-900 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-4">שירותי צד שלישי</h2>
                <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                  <p>האתר שלנו משתמש בשירותים הבאים:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>
                      <strong>Google Analytics:</strong> לניתוח תנועת משתמשים (
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:text-yellow-300 underline"
                      >
                        מדיניות פרטיות
                      </a>
                      )
                    </li>
                    <li>
                      <strong>WhatsApp:</strong> לתקשורת ישירה עם לקוחות
                    </li>
                  </ul>
                </div>
              </div>

              {/* Your Rights */}
              <div className="bg-gray-900 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-4">הזכויות שלך</h2>
                <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                  <p>יש לך את הזכויות הבאות בנוגע למידע האישי שלך:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>גישה למידע שאנו שומרים עליך</li>
                    <li>תיקון מידע לא מדויק</li>
                    <li>מחיקת מידע אישי</li>
                    <li>התנגדות לעיבוד מידע למטרות שיווקיות</li>
                    <li>ביטול הסכמה שניתנה בעבר</li>
                  </ul>
                  <p className="mt-4">
                    לממש את זכויותיך, צור קשר בכתובת:{" "}
                    <a
                      href="mailto:amit9021@gmail.com"
                      className="text-yellow-400 hover:text-yellow-300 underline"
                    >
                      amit9021@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Children's Privacy */}
              <div className="bg-gray-900 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-4">פרטיות ילדים</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  השירות שלנו אינו מיועד לילדים מתחת לגיל 18. אנו לא אוספים במודע
                  מידע אישי מילדים. אם נתגלה שאספנו מידע מילד, נמחק אותו באופן
                  מיידי.
                </p>
              </div>

              {/* Changes to Policy */}
              <div className="bg-gray-900 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  שינויים במדיניות
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. כל שינוי מהותי יפורסם
                  באתר עם תאריך עדכון חדש. המשך השימוש באתר לאחר פרסום שינויים
                  מהווה הסכמה למדיניות המעודכנת.
                </p>
              </div>

              {/* Contact */}
              <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-400/20 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-4">צור קשר</h2>
                <div className="text-gray-300 text-lg leading-relaxed space-y-2">
                  <p>
                    יש לך שאלות על מדיניות הפרטיות? אנחנו כאן לעזור:
                  </p>
                  <p>
                    <strong>אימייל:</strong>{" "}
                    <a
                      href="mailto:amit9021@gmail.com"
                      className="text-yellow-400 hover:text-yellow-300 underline"
                    >
                      amit9021@gmail.com
                    </a>
                  </p>
                  <p>
                    <strong>טלפון:</strong>{" "}
                    <a
                      href="tel:+972547926661"
                      className="text-yellow-400 hover:text-yellow-300 underline"
                    >
                      +972-54-792-6661
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Back to Home */}
        <section className="py-12 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Link
                href="/"
                className="inline-flex items-center px-8 py-4 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 ml-2" />
                חזרה לעמוד הבית
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
