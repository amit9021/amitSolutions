import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Shop } from "./components/shop";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";
import { CTA } from "./components/cta";
import JsonData from "./data/data.json";
import { trackPageView, trackScrollDepth } from "./utils/analytics";

// SEO Component
const SEO = ({ data }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: data?.companyName || "Amit Solutions",
    description: data?.tagline || "אתרים מהירים שמביאים פניות",
    url: data?.website || "https://amitsolutions.co.il",
    telephone: data?.phone || "+972-50-000-0000",
    email: data?.email || "amit@amitsolutions.co.il",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IL",
      addressRegion: "ישראל",
    },
    areaServed: {
      "@type": "Country",
      name: "ישראל",
    },
    serviceType: "אתרי תדמית לעסקים קטנים",
    priceRange: "₪₪₪",
  };

  return (
    <Helmet>
      <html lang="he" dir="rtl" />
      <title>
        {data?.title || "Amit Solutions"} -{" "}
        {data?.tagline || "אתרים מהירים שמביאים פניות"}
      </title>
      <meta
        name="description"
        content={
          data?.paragraph ||
          "אתרי תדמית מהירים ומותאמים למובייל לעסקים קטנים ובעלי מקצוע. חיבור Google Business, SEO בסיסי, וואטסאפ בלחיצה."
        }
      />
      <meta
        name="keywords"
        content="אתר תדמית, אתר לעסק, Google Business, SEO, וואטסאפ, עסקים קטנים, חשמלאי, אינסטלטור, HVAC"
      />
      <meta name="author" content="Amit Solutions" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={`${data?.title || "Amit Solutions"} - ${
          data?.tagline || "אתרים מהירים שמביאים פניות"
        }`}
      />
      <meta
        property="og:description"
        content={
          data?.paragraph ||
          "אתרי תדמית מהירים ומותאמים למובייל לעסקים קטנים ובעלי מקצוע."
        }
      />
      <meta
        property="og:url"
        content={data?.website || "https://amitsolutions.co.il"}
      />
      <meta
        property="og:site_name"
        content={data?.companyName || "Amit Solutions"}
      />
      <meta property="og:locale" content="he_IL" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={`${data?.title || "Amit Solutions"} - ${
          data?.tagline || "אתרים מהירים שמביאים פניות"
        }`}
      />
      <meta
        name="twitter:description"
        content={
          data?.paragraph ||
          "אתרי תדמית מהירים ומותאמים למובייל לעסקים קטנים ובעלי מקצוע."
        }
      />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
    
    // Track page view
    trackPageView(window.location.pathname);
    
    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);
      
      if (scrollPercent >= 25 && scrollPercent < 50) {
        trackScrollDepth(25);
      } else if (scrollPercent >= 50 && scrollPercent < 75) {
        trackScrollDepth(50);
      } else if (scrollPercent >= 75 && scrollPercent < 90) {
        trackScrollDepth(75);
      } else if (scrollPercent >= 90) {
        trackScrollDepth(90);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="rtl" dir="rtl">
      <SEO data={landingPageData.Footer} />
      <Navigation
        data={landingPageData.Contact}
        logo={landingPageData.Header?.logo}
        companyName={landingPageData.Header?.title}
        menuItems={landingPageData.Navigation?.menuItems}
      />
      <Header data={landingPageData.Header} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Shop data={landingPageData.Contact} />
      <Gallery />
      <Testimonials data={landingPageData.Testimonials} />
      <Contact data={landingPageData.Contact} />
      <Footer data={landingPageData.Footer} />
      <CTA data={landingPageData.Contact} />
    </div>
  );
};

export default App;
