import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail, MapPin, Send } from "lucide-react";
import { trackFormSubmission, trackWhatsAppClick, trackPhoneClick } from "../utils/analytics";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactData = props.data || {};
  const phone = contactData.phone || "+972-50-000-0000";
  const whatsapp = contactData.whatsapp || "+972500000000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Track form submission
    trackFormSubmission('contact_form');

    // Create WhatsApp message
    const whatsappMessage = `שלום עמית,

קיבלתי הודעה חדשה מאתר Amit Solutions:

שם: ${name}
אימייל: ${email}

הודעה:
${message}

---
הודעה זו נשלחה מאתר Amit Solutions`;

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Track WhatsApp click
    trackWhatsAppClick('contact_form');

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Show success message
    setIsSubmitted(true);
    clearState();

    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            צור קשר
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            מוכן להתחיל? בואו נדבר על הפרויקט שלך
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6">שלח הודעה</h3>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-yellow-500/20 border border-yellow-400 text-yellow-400 px-4 py-3 rounded-lg mb-6"
                >
                  <div className="flex items-center">
                    <MessageCircle className="w-5 h-5 ml-2" />
                    תודה! יפתח חלון ווטסאפ עם ההודעה.
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      שם מלא
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="השם שלך"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      אימייל
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    הודעה
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="ספר לי על הפרויקט שלך..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 rtl:space-x-reverse transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  <span>שלח הודעה בווטסאפ</span>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                פרטי יצירת קשר
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">טלפון</p>
                    <a
                      href={`tel:${phone}`}
                      className="text-yellow-400 hover:text-yellow-500"
                      onClick={() => trackPhoneClick('contact_info')}
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">ווטסאפ</p>
                    <a
                      href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                        contactData.whatsappMessage ||
                          "שלום! אני מעוניין באתר לעסק שלי"
                      )}`}
                      className="text-yellow-400 hover:text-yellow-500"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackWhatsAppClick('contact_info')}
                    >
                      שלח הודעה
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">אימייל</p>
                    <a
                      href={`mailto:${
                        contactData.email || "amit@amitsolutions.co.il"
                      }`}
                      className="text-yellow-400 hover:text-yellow-500"
                    >
                      {contactData.email || "amit@amitsolutions.co.il"}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">אזור שירות</p>
                    <p className="text-gray-300">
                      {contactData.serviceArea || "ישראל (התמקדות בדרום/מרכז)"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
