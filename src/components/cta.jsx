import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Mail, X, Plus } from "lucide-react";
import {
  trackWhatsAppClick,
  trackPhoneClick,
  trackEmailClick,
  trackCTAExpand,
  trackCTACollapse,
} from "../utils/analytics";

export const CTA = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    if (!isExpanded) {
      trackCTAExpand();
    } else {
      trackCTACollapse();
    }
    setIsExpanded(!isExpanded);
  };

  const contactData = props.data || {};
  const phone = contactData.phone || "+972547926661";
  const whatsapp = contactData.whatsapp || "972547926661";
  const email = contactData.email || "amit9021@gmail.com";
  const whatsappMessage =
    contactData.whatsappMessage || "שלום! אני מעוניין באתר לעסק שלי";

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-4 space-y-3"
          >
            <motion.a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-full shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => trackWhatsAppClick("floating_cta")}
            >
              <MessageCircle className="w-5 h-5 ml-3" />
              <span className="font-semibold text-lg">ווטסאפ</span>
            </motion.a>

            <motion.a
              href={`tel:${phone}`}
              className="flex items-center bg-gray-700 hover:bg-gray-600 text-yellow-400 px-4 py-3 rounded-full shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => trackPhoneClick("floating_cta")}
            >
              <Phone className="w-5 h-5 ml-3" />
              <span className="font-semibold text-lg">התקשרו</span>
            </motion.a>

            <motion.a
              href={`mailto:${email}`}
              className="flex items-center bg-gray-700 hover:bg-gray-600 text-yellow-400 px-4 py-3 rounded-full shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => trackEmailClick("floating_cta")}
            >
              <Mail className="w-5 h-5 ml-3" />
              <span className="font-semibold text-lg">מייל</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleExpanded}
        className="w-14 h-14 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isExpanded ? "סגור תפריט קשר" : "פתח תפריט קשר"}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? (
            <X className="w-6 h-6" />
          ) : (
            <Plus className="w-6 h-6" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};
