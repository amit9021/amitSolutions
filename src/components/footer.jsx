import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export const Footer = (props) => {
  const footerData = props.data || {};
  const companyName = footerData.companyName || "Amit Solutions";
  const website = footerData.website || "https://amitsolutions.co.il";
  const copyrightYear = footerData.copyrightYear || new Date().getFullYear();
  const tagline = footerData.tagline || "אתרים מהירים שמביאים פניות";
  const serviceArea = footerData.serviceArea || "ישראל (התמקדות בדרום/מרכז)";
  const phone = footerData.phone || "+972-50-000-0000";
  const whatsapp = footerData.whatsapp || "+972500000000";
  const email = footerData.email || "amit@amitsolutions.co.il";

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">A</span>
              </div>
              <h3 className="text-2xl font-bold">{companyName}</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">{tagline}</p>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <a
                href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                  "שלום! אני מעוניין באתר לעסק שלי"
                )}`}
                className="w-10 h-10 bg-yellow-500 hover:bg-yellow-600 rounded-lg flex items-center justify-center transition-colors"
                target="_blank"
                rel="noreferrer"
                aria-label="ווטסאפ"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={`tel:${phone}`}
                className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="טלפון"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${email}`}
                className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="אימייל"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">קישורים מהירים</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  אודותינו
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  שירותים
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  פורטפוליו
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  צור קשר
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">פרטי יצירת קשר</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="w-4 h-4 text-yellow-400" />
                <a
                  href={`tel:${phone}`}
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  {phone}
                </a>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="w-4 h-4 text-yellow-400" />
                <a
                  href={`mailto:${email}`}
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  {email}
                </a>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">{serviceArea}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {copyrightYear} {companyName}. כל הזכויות שמורות.
            </p>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <a
                href={website}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors text-sm flex items-center space-x-1 rtl:space-x-reverse"
              >
                <span>אתר העסק</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
