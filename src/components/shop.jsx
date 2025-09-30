import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import {
  trackPricingView,
  trackPricingClick,
  trackBusinessInquiry,
} from "../utils/analytics";

export const Shop = (props) => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const contactData = props.data || {};
  const phone = contactData.phone || "+972-54-792-6661";
  const whatsapp = contactData.whatsapp || "+972547926661";

  // חבילת שירותים
  const products = [
    {
      id: 1,
      title: "אתר תדמית לעסק",
      description: "אתר תדמית מהיר ומותאם למובייל - מחיר החל מ-₪1,500",
      price: "החל מ-₪1,500",
      features: [
        "עיצוב רספונסיבי (מותאם למובייל)",
        "4-6 דפים לפי הצורך",
        "טעינה מהירה (תוך 2-3 שניות)",
        "כפתור ווטסאפ בלחיצה",
        "חיבור Google Business",
        "SEO בסיסי לגוגל",
        "גלריית תמונות (אופציונלי)",
        "דף המלצות (אופציונלי)",
        "מפת Google",
        "טופס יצירת קשר",
        "תמיכה למשך חודש",
      ],
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      paymentUrl: `tel:${phone}`,
    },
  ];

  // const nextProduct = () => {
  //   setCurrentProductIndex((prev) => (prev + 1) % products.length);
  // };

  // const prevProduct = () => {
  //   setCurrentProductIndex(
  //     (prev) => (prev - 1 + products.length) % products.length
  //   );
  // };

  const goToProduct = (index) => {
    setCurrentProductIndex(index);
    // Track pricing view when user switches to a product
    const product = products[index];
    trackPricingView(product.title, product.price);
  };

  // Track initial pricing view
  useEffect(() => {
    const product = products[currentProductIndex];
    trackPricingView(product.title, product.price);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProductIndex]);

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
                        onClick={() => {
                          trackPricingClick(
                            products[currentProductIndex].title,
                            "phone_call"
                          );
                          trackBusinessInquiry("pricing_section", "phone");
                        }}
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
                        onClick={() => {
                          trackPricingClick(
                            products[currentProductIndex].title,
                            "whatsapp"
                          );
                          trackBusinessInquiry("pricing_section", "whatsapp");
                        }}
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
