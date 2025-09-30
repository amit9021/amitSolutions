import { useState, useEffect } from "react";
import Head from "next/head";
import { Navigation } from "../components/navigation";
import { Header } from "../components/header";
import { About } from "../components/about";
import { Services } from "../components/services";
import { Shop } from "../components/shop";
import { Contact } from "../components/contact";
import { Footer } from "../components/footer";
import { CTA } from "../components/cta";
import { BlogPreview } from "../components/BlogPreview";
import JsonData from "../data/data.json";
import {
  trackPageView,
  trackScrollDepth,
  trackSectionView,
} from "../utils/analytics";

export default function Home() {
  const [landingPageData, setLandingPageData] = useState(JsonData);

  useEffect(() => {
    // Data is already set in initial state

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

  const data = landingPageData;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: data?.Footer?.companyName || "Amit Solutions",
    description: data?.Footer?.tagline || "אתרים מהירים שמביאים פניות",
    url: data?.Footer?.website || "https://amit-solutions.co.il",
    telephone: data?.Contact?.phone || "+972-54-792-6661",
    email: data?.Contact?.email || "amit9021@gmail.com",
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
    <>
      <Head>
        <title>{`${data?.Header?.title || "Amit Solutions"} - ${data?.Header?.tagline || "אתרים מהירים שמביאים פניות"}`}</title>
        <meta
          name="description"
          content="אתרי תדמית מהירים למובייל לעסקים קטנים. חיבור Google Business, SEO בסיסי, וואטסאפ - הכל במחיר הוגן ובזמן קצר."
        />
        <meta
          name="keywords"
          content="אתר תדמית, אתר לעסק, Google Business, SEO, וואטסאפ, עסקים קטנים, חשמלאי, אינסטלטור, HVAC"
        />
        <meta name="author" content="Amit Solutions" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://amit-solutions.co.il/" />

        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${data?.Header?.title || "Amit Solutions"} - ${data?.Header?.tagline || "אתרים מהירים שמביאים פניות"}`}
        />
        <meta
          property="og:description"
          content="אתרי תדמית מהירים למובייל לעסקים קטנים. חיבור Google Business, SEO בסיסי, וואטסאפ."
        />
        <meta
          property="og:url"
          content="https://amit-solutions.co.il/"
        />
        <meta
          property="og:site_name"
          content={data?.Footer?.companyName || "Amit Solutions"}
        />
        <meta property="og:locale" content="he_IL" />
        <meta property="og:image" content="https://amit-solutions.co.il/img/hero.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Amit Solutions - אתרים מהירים שמביאים פניות" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${data?.Header?.title || "Amit Solutions"} - ${data?.Header?.tagline || "אתרים מהירים שמביאים פניות"}`}
        />
        <meta
          name="twitter:description"
          content="אתרי תדמית מהירים למובייל לעסקים קטנים. חיבור Google Business, SEO בסיסי, וואטסאפ."
        />
        <meta name="twitter:image" content="https://amit-solutions.co.il/img/hero.webp" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

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
      <Contact data={landingPageData.Contact} />
      <Footer data={landingPageData.Contact} />
      <CTA data={landingPageData.Contact} />
    </>
  );
}