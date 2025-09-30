import { useState } from "react";
import { MessageCircle, Phone, Menu, X } from "lucide-react";
import {
  trackMenuClick,
  trackPhoneClick,
  trackWhatsAppClick,
} from "../utils/analytics";

export const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const contactData = props.data || {};
  const phone = contactData.phone || "+972-50-000-0000";
  const whatsapp = contactData.whatsapp || "+972500000000";
  const whatsappMessage =
    contactData.whatsappMessage || "שלום! אני מעוניין באתר לעסק שלי";
  const companyName = props.companyName || "Amit Solutions";
  const menuItems = props.menuItems || [];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-yellow-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-xl text-white">{companyName}</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-300 hover:text-yellow-400 transition-colors"
                onClick={() => trackMenuClick(item.text, "desktop_nav")}
              >
                {item.text}
              </a>
            ))}
            <a
              href="/blog/"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
              onClick={() => trackMenuClick("בלוג", "desktop_nav")}
            >
              בלוג
            </a>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Phone button */}
            <a
              href={`tel:${phone}`}
              className="p-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 transition-colors"
              onClick={() => trackPhoneClick("navigation")}
            >
              <Phone className="w-5 h-5 text-yellow-400" />
            </a>

            {/* WhatsApp button */}
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg flex items-center space-x-2 rtl:space-x-reverse transition-colors font-semibold"
              onClick={() => trackWhatsAppClick("navigation")}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">וואטסאפ</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-yellow-400" />
              ) : (
                <Menu className="w-5 h-5 text-yellow-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-yellow-500/20">
            <div className="py-4 space-y-2">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-4 py-2 text-gray-300 hover:bg-yellow-500/20 hover:text-yellow-400 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.text}
                </a>
              ))}
              <a
                href="/blog/"
                className="block px-4 py-2 text-gray-300 hover:bg-yellow-500/20 hover:text-yellow-400 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                בלוג
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
