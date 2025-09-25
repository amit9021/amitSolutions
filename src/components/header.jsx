import { motion } from "framer-motion";
import { MessageCircle, ChevronRight, Zap } from "lucide-react";

export const Header = (props) => {
  const data = props.data || {};

  return (
    <section id="hero" className="hero">
      {/* Background Image */}
      <img
        id="hero-background"
        src={data.backgroundImage}
        alt="Hero Background"
      />

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <img id="logo-header" src="/img/logo.png" alt="Amit Solutions Logo" />
      </div>

      <div className="flex-1">
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo at the very top */}

            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-sm font-medium mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Zap className="w-4 h-4 ml-2" />
              {data.tagline || "אתרים מהירים שמביאים פניות"}
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {data.title || "Amit Solutions"}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {data.paragraph ||
                "אתרי תדמית מהירים ומותאמים למובייל לעסקים קטנים ובעלי מקצוע."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href={`https://wa.me/+972547926661?text=${encodeURIComponent(
                  "שלום! אני מעוניין באתר לעסק שלי"
                )}`}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 rtl:space-x-reverse transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5" />
                <span>בואו נתחיל בוואטסאפ</span>
              </motion.a>

              <motion.a
                href="#portfolio"
                className="bg-transparent text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 rtl:space-x-reverse border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>השירות שלי</span>
                <ChevronRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
