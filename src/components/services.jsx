import { motion } from "framer-motion";
import {
  Globe,
  MapPin,
  Search,
  MessageCircle,
  BarChart,
  Headphones,
} from "lucide-react";

export const Services = (props) => {
  const services = props.data || [];
  const iconMap = {
    Globe,
    MapPin,
    Search,
    MessageCircle,
    BarChart,
    Headphones,
  };

  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            השירותים שלי
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            כל מה שצריך כדי להביא לך לקוחות חדשים - במקום אחד
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-yellow-500 group-hover:to-yellow-700 transition-all duration-300">
                  {IconComponent && (
                    <IconComponent className="w-8 h-8 text-black" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.name}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {service.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
