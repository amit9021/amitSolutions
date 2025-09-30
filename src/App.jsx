import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Shop } from "./components/shop";
// import { Gallery } from "./components/gallery";
// import { Testimonials } from "./components/testimonials";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";
import { CTA } from "./components/cta";
import { BlogIndex } from "./components/BlogIndex";
import { BlogPost } from "./components/BlogPost";
import { BlogPreview } from "./components/BlogPreview";
import JsonData from "./data/data.json";
import {
  trackPageView,
  trackScrollDepth,
  trackSectionView,
} from "./utils/analytics";

// ScrollToTop Component for route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change (mobile-friendly)
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // For mobile Safari and other browsers
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [pathname]);

  return null;
};

// SEO Component
const SEO = ({ data }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: data?.companyName || "Amit Solutions",
    description: data?.tagline || "אתרים מהירים שמביאים פניות",
    url: data?.website || "https://amit-solutions.co.il",
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
        content={data?.website || "https://amit-solutions.co.il"}
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

    // Track scroll depth with throttling to prevent forced reflows
    let ticking = false;
    let lastScrollTop = 0;
    let trackedDepths = new Set();
    let trackedSections = new Set();

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

          // Only calculate if scroll position changed significantly
          if (Math.abs(scrollTop - lastScrollTop) > 50) {
            const scrollHeight =
              document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);

            // Track scroll depth
            if (scrollPercent >= 25 && !trackedDepths.has(25)) {
              trackScrollDepth(25);
              trackedDepths.add(25);
            } else if (scrollPercent >= 50 && !trackedDepths.has(50)) {
              trackScrollDepth(50);
              trackedDepths.add(50);
            } else if (scrollPercent >= 75 && !trackedDepths.has(75)) {
              trackScrollDepth(75);
              trackedDepths.add(75);
            } else if (scrollPercent >= 90 && !trackedDepths.has(90)) {
              trackScrollDepth(90);
              trackedDepths.add(90);
            }

            // Track section views
            const sections = [
              "hero",
              "about",
              "services",
              "blog",
              "shop",
              "contact",
            ];
            sections.forEach((section) => {
              const element = document.getElementById(section);
              if (element && !trackedSections.has(section)) {
                const rect = element.getBoundingClientRect();
                if (
                  rect.top <= window.innerHeight / 2 &&
                  rect.bottom >= window.innerHeight / 2
                ) {
                  trackSectionView(section);
                  trackedSections.add(section);
                }
              }
            });

            lastScrollTop = scrollTop;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // HomePage Component
  const HomePage = () => {
    return (
      <>
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
        <BlogPreview />
        <Shop data={landingPageData.Contact} />
        {/* <Gallery /> */}
        {/* <Testimonials data={landingPageData.Testimonials} /> */}
        <Contact data={landingPageData.Contact} />
        <Footer data={landingPageData.Contact} />
        <CTA data={landingPageData.Contact} />
      </>
    );
  };

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="rtl" dir="rtl">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
