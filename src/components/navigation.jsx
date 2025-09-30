import { useState, useEffect } from "react";
import { MessageCircle, Phone, Menu, X } from "lucide-react";
import {
  trackMenuClick,
  trackPhoneClick,
  trackWhatsAppClick,
} from "../utils/analytics";

export const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const contactData = props.data || {};
  const phone = contactData.phone || "+972-50-000-0000";
  const whatsapp = contactData.whatsapp || "+972500000000";
  const whatsappMessage =
    contactData.whatsappMessage || "שלום! אני מעוניין באתר לעסק שלי";
  const companyName = props.companyName || "Amit Solutions";
  const menuItems = props.menuItems || [];

  // Debug: Log menuItems to console
  console.log("Navigation menuItems:", menuItems);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-yellow-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-2xl text-white">{companyName}</span>
          </div>

          {/* Desktop Menu - Hidden on mobile, visible on lg screens and up */}
          <div
            className="items-center gap-8 flex-1 justify-center"
            style={{
              display: isDesktop ? "flex" : "none",
            }}
            data-desktop-menu="true"
          >
            {menuItems && menuItems.length > 0 ? (
              menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-200 hover:text-yellow-400 transition-colors font-medium whitespace-nowrap text-lg"
                  onClick={() => trackMenuClick(item.text, "desktop_nav")}
                >
                  {item.text}
                </a>
              ))
            ) : (
              // Fallback menu items if data is not loaded
              <>
                <a
                  href="#services"
                  className="text-gray-200 hover:text-yellow-400 transition-colors font-medium whitespace-nowrap text-lg"
                  onClick={() => trackMenuClick("שירותים", "desktop_nav")}
                >
                  שירותים
                </a>
                <a
                  href="#shop"
                  className="text-gray-200 hover:text-yellow-400 transition-colors font-medium whitespace-nowrap text-lg"
                  onClick={() => trackMenuClick("חבילות", "desktop_nav")}
                >
                  חבילות
                </a>
                <a
                  href="#contact"
                  className="text-gray-200 hover:text-yellow-400 transition-colors font-medium whitespace-nowrap text-lg"
                  onClick={() => trackMenuClick("צור קשר", "desktop_nav")}
                >
                  צור קשר
                </a>
              </>
            )}
            <a
              href="/blog"
              className="text-gray-200 hover:text-yellow-400 transition-colors font-medium whitespace-nowrap text-lg"
              onClick={() => trackMenuClick("בלוג", "desktop_nav")}
            >
              בלוג
            </a>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse lg:flex-shrink-0">
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
              <span className="hidden sm:inline text-base">וואטסאפ</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 transition-colors"
              style={{
                display: isDesktop ? "none" : "block",
              }}
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
        {isOpen && !isDesktop && (
          <div className="border-t border-yellow-500/20">
            <div className="py-4 space-y-2">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-4 py-3 text-gray-300 hover:bg-yellow-500/20 hover:text-yellow-400 rounded-lg transition-colors text-lg font-medium"
                  onClick={() => {
                    trackMenuClick(item.text, "mobile_nav");
                    setIsOpen(false);
                  }}
                >
                  {item.text}
                </a>
              ))}
              <a
                href="/blog/"
                className="block px-4 py-3 text-gray-300 hover:bg-yellow-500/20 hover:text-yellow-400 rounded-lg transition-colors text-lg font-medium"
                onClick={() => {
                  trackMenuClick("בלוג", "mobile_nav");
                  setIsOpen(false);
                }}
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
