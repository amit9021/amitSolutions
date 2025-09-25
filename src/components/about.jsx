import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export const About = (props) => {
  const data = props.data || {};

  return (
    <section id="about" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              אודותינו
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {data.paragraph ||
                "אני עמית, מפתח אתרים מהירים ומותאמים למובייל לעסקים קטנים ובעלי מקצוע."}
            </p>

            <h3 className="text-2xl font-bold text-white mb-6">
              למה לבחור בי?
            </h3>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="space-y-6">
                <ul className="space-y-6">
                  {data.Why?.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start text-gray-300 justify-center md:justify-start"
                    >
                      <CheckCircle className="w-6 h-6 text-yellow-400 ml-4 flex-shrink-0 mt-0.5" />
                      <span className="text-lg leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <ul className="space-y-6">
                  {data.Why2?.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: (index + 4) * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start text-gray-300 justify-center md:justify-start"
                    >
                      <CheckCircle className="w-6 h-6 text-yellow-400 ml-4 flex-shrink-0 mt-0.5" />
                      <span className="text-lg leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
