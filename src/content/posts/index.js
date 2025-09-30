// Import all post modules
import { post as whyFastWebsites } from "./why-fast-websites-matter.js";
import { post as mobileFirstDesign } from "./mobile-first-design.js";
import { post as googleBusinessIntegration } from "./small-business-showcase-website-guide.js";
import { post as localSeoIsraelSmallBusiness } from "./local-seo-israel-small-business.js";
import { post as smallBusinessWebsiteDigitalSignature } from "./small-business-website-digital-signature.js";
import { post as wixElementorVsProfessionalWebsites } from "./wix-elementor-vs-professional-websites.js";
import { post as whatIsSeoAndWhyImportant } from "./what-is-seo-and-why-important.js";
import { post as commonWebsiteMistakes } from "./10-common-website-mistakes-small-businesses.js";
import { post as whatIsCta } from "./what-is-cta-call-to-action.js";
import { post as websiteAnalyticsTracking } from "./website-analytics-tracking-guide.js";
// Get all posts
export const getAllPosts = () => {
  return [
    websiteAnalyticsTracking,
    whatIsCta,
    commonWebsiteMistakes,
    smallBusinessWebsiteDigitalSignature,
    whyFastWebsites,
    mobileFirstDesign,
    googleBusinessIntegration,
    localSeoIsraelSmallBusiness,
    wixElementorVsProfessionalWebsites,
    whatIsSeoAndWhyImportant,
  ];
};

// Get post by slug
export const getPostBySlug = (slug) => {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
};
