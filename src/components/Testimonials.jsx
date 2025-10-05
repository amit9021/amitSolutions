import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "יוסי כהן",
      business: "כהן חשמל ואלקטרוניקה",
      role: "בעל עסק",
      rating: 5,
      text: "עמית בנה לי אתר מדהים תוך שבועיים. האתר מהיר, נראה מקצועי ומביא לי פניות כל יום. השירות היה מעולה וסבלני.",
      initials: "יכ"
    },
    {
      id: 2,
      name: "רונית לוי",
      business: "רונית עיצוב פנים",
      role: "מעצבת פנים",
      rating: 5,
      text: "התהליך היה פשוט ומהיר. עמית הקשיב לדרישות שלי ויצר אתר שמשקף בדיוק את המותג שלי. הגלריה נראית מושלמת!",
      initials: "רל"
    },
    {
      id: 3,
      name: "דני אבוקסיס",
      business: "דני שירותי HVAC",
      role: "טכנאי מיזוג",
      rating: 5,
      text: "לא הבנתי כלום באתרים, אבל עמית הסביר לי הכל בפשטות. עכשיו יש לי אתר מקצועי שמחובר ל-Google Business והפניות עולות!",
      initials: "דא"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            מה הלקוחות שלנו אומרים
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            סיפורי הצלחה מבעלי עסקים שבחרו ב-Amit Solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-20">
                <Quote className="w-12 h-12 text-yellow-400" aria-hidden="true" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    aria-hidden="true"
                  />
                ))}
                <span className="sr-only">{testimonial.rating} מתוך 5 כוכבים</span>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-300 text-lg leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4 relative z-10">
                <div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <span className="text-black font-bold text-lg">
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-white text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {testimonial.role} • {testimonial.business}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Your Testimonial CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 text-lg mb-6">
            רוצה להצטרף לרשימת הלקוחות המרוצים שלנו?
          </p>
          <motion.a
            href="#contact"
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            בואו נתחיל לעבוד
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
