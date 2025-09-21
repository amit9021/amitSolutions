import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export const About = (props) => {
  const data = props.data || {};

  return (
    <section id="about" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <img
                src={data.image || "./img/about.jpeg"}
                alt="Amit Solutions"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 to-transparent rounded-2xl"></div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
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

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-4">
                  {data.Why?.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center text-gray-300"
                    >
                      <CheckCircle className="w-5 h-5 text-yellow-400 ml-3 flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <ul className="space-y-4">
                  {data.Why2?.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: (index + 4) * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center text-gray-300"
                    >
                      <CheckCircle className="w-5 h-5 text-yellow-400 ml-3 flex-shrink-0" />
                      {item}
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
