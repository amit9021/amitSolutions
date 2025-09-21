import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  Star,
} from "lucide-react";

export const Shop = (props) => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const contactData = props.data || {};
  const phone = contactData.phone || "+972-50-000-0000";
  const whatsapp = contactData.whatsapp || "+972500000000";

  // גלריית שירותים
  const products = [
    {
      id: 1,
      title: "אתר תדמית בסיסי",
      description:
        "אתר תדמית מהיר ומותאם למובייל עם דף בית, אודות, שירותים וצור קשר",
      price: "₪2,500",
      features: [
        "עיצוב רספונסיבי",
        "טעינה מהירה",
        "SEO בסיסי",
        "ווטסאפ בלחיצה",
      ],
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      paymentUrl: `tel:${phone}`,
    },
    {
      id: 2,
      title: "אתר תדמית מתקדם",
      description: "אתר תדמית מקצועי עם גלריה, המלצות, בלוג וכלי ניהול מתקדמים",
      price: "₪4,500",
      features: ["גלריית תמונות", "מערכת המלצות", "בלוג", "ניהול תוכן"],
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop",
      paymentUrl: `tel:${phone}`,
    },
    {
      id: 3,
      title: "אתר עסק מקומי",
      description:
        "אתר לעסק מקומי עם חיבור Google Business, מפות, שעות פעילות ועוד",
      price: "₪3,200",
      features: [
        "Google Business",
        "מפות אינטראקטיביות",
        "שעות פעילות",
        "טופס יצירת קשר",
      ],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
      paymentUrl: `tel:${phone}`,
    },
    {
      id: 4,
      title: "חנות מקוונת",
      description: "חנות מקוונת מלאה עם קטלוג מוצרים, עגלת קניות ותשלום מקוון",
      price: "₪6,800",
      features: ["קטלוג מוצרים", "עגלת קניות", "תשלום מקוון", "ניהול הזמנות"],
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop",
      paymentUrl: `tel:${phone}`,
    },
    {
      id: 5,
      title: "אתר פורטל",
      description:
        "פורטל עסקי מתקדם עם מערכת משתמשים, דשבורד וכלי ניהול מתקדמים",
      price: "₪8,500",
      features: ["מערכת משתמשים", "דשבורד ניהול", "דוחות מתקדמים", "API מותאם"],
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop",
      paymentUrl: `tel:${phone}`,
    },
    {
      id: 6,
      title: "ייעוץ ופיתוח מותאם",
      description:
        "ייעוץ מקצועי ופיתוח מותאם אישית לפי הצרכים הספציפיים של העסק",
      price: "₪150/שעה",
      features: ["ייעוץ מקצועי", "פיתוח מותאם", "תמיכה טכנית", "הדרכה מלאה"],
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      paymentUrl: `tel:${phone}`,
    },
  ];

  const nextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentProductIndex(
      (prev) => (prev - 1 + products.length) % products.length
    );
  };

  const goToProduct = (index) => {
    setCurrentProductIndex(index);
  };

  return (
    <section
      id="shop"
      className="py-20 bg-gradient-to-br from-black to-gray-900"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            חבילות השירותים שלי
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            בחרו את החבילה המתאימה לעסק שלכם וקבלו אתר מקצועי שמביא תוצאות
          </p>
        </motion.div>

        {/* Product Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevProduct}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-yellow-500 rounded-full shadow-lg flex items-center justify-center hover:bg-yellow-600 transition-colors"
              aria-label="שירות קודם"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>

            <button
              onClick={nextProduct}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-yellow-500 rounded-full shadow-lg flex items-center justify-center hover:bg-yellow-600 transition-colors"
              aria-label="שירות הבא"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>

            {/* Current Product */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProductIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="aspect-video lg:aspect-square relative overflow-hidden">
                    <img
                      src={products[currentProductIndex].image}
                      alt={products[currentProductIndex].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 mr-2">
                        5.0 (12 ביקורות)
                      </span>
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-4">
                      {products[currentProductIndex].title}
                    </h3>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {products[currentProductIndex].description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-3">
                        מה כלול:
                      </h4>
                      <ul className="space-y-2">
                        {products[currentProductIndex].features.map(
                          (feature, index) => (
                            <li
                              key={index}
                              className="flex items-center text-gray-300"
                            >
                              <div className="w-2 h-2 bg-yellow-400 rounded-full ml-3 flex-shrink-0"></div>
                              {feature}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="text-3xl font-bold text-yellow-400">
                        {products[currentProductIndex].price}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.a
                        href={products[currentProductIndex].paymentUrl}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold text-center flex items-center justify-center space-x-2 rtl:space-x-reverse transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Phone className="w-5 h-5" />
                        <span>התקשרו עכשיו</span>
                      </motion.a>

                      <motion.a
                        href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                          `שלום! אני מעוניין בחבילה: ${products[currentProductIndex].title}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-yellow-400 px-6 py-3 rounded-lg font-semibold text-center flex items-center justify-center space-x-2 rtl:space-x-reverse transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>ווטסאפ</span>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-2 rtl:space-x-reverse">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProduct(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentProductIndex
                    ? "bg-yellow-400 w-8"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`עבור לשירות ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-gray-800 rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              איך זה עובד?
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-white mb-4">תהליך העבודה:</h4>
                <ol className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-yellow-500 text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ml-3 flex-shrink-0">
                      1
                    </span>
                    <span className="text-gray-300">
                      בוחרים חבילה ומתקשרים לקבלת ייעוץ מקצועי
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow-500 text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ml-3 flex-shrink-0">
                      2
                    </span>
                    <span className="text-gray-300">
                      נקבע פגישה להבנת הצרכים והגדרת הפרויקט
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow-500 text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ml-3 flex-shrink-0">
                      3
                    </span>
                    <span className="text-gray-300">
                      מקבלים הצעת מחיר מפורטת ומקצועית
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow-500 text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ml-3 flex-shrink-0">
                      4
                    </span>
                    <span className="text-gray-300">
                      מתחילים בפיתוח עם עדכונים שוטפים
                    </span>
                  </li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">מה תקבלו:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full ml-3 flex-shrink-0"></div>
                    <span className="text-gray-300">
                      אתר מהיר ומותאם למובייל
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full ml-3 flex-shrink-0"></div>
                    <span className="text-gray-300">
                      חיבור Google Business Profile
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full ml-3 flex-shrink-0"></div>
                    <span className="text-gray-300">SEO בסיסי לגוגל</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full ml-3 flex-shrink-0"></div>
                    <span className="text-gray-300">תמיכה והדרכה מלאה</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
