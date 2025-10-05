import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Show consent banner after a short delay
      setTimeout(() => {
        setShowConsent(true);
      }, 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          role="dialog"
          aria-label="הסכמה לעוגיות"
          aria-live="polite"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="bg-gray-900 border-2 border-yellow-400/30 rounded-2xl shadow-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0">
                    <Cookie className="w-8 h-8 text-yellow-400" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      אנחנו משתמשים בעוגיות
                    </h3>
                    <p className="text-gray-300 text-base leading-relaxed">
                      אנחנו משתמשים בעוגיות כדי לשפר את חווית המשתמש באתר ולנתח תנועה באמצעות Google Analytics.
                      המידע נשמר באופן אנונימי ומשמש רק לשיפור השירות שלנו.
                      למידע נוסף, עיין ב
                      <a
                        href="/privacy-policy"
                        className="text-yellow-400 hover:text-yellow-300 underline mx-1"
                        aria-label="קרא את מדיניות הפרטיות"
                      >
                        מדיניות הפרטיות
                      </a>
                      שלנו.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <motion.button
                    onClick={acceptCookies}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="אשר שימוש בעוגיות"
                  >
                    מסכים
                  </motion.button>
                  <motion.button
                    onClick={declineCookies}
                    className="bg-transparent border-2 border-gray-600 hover:border-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="דחה שימוש בעוגיות"
                  >
                    לא תודה
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
