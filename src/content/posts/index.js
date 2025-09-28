// Import all post modules
import { post as whyFastWebsites } from "./why-fast-websites-matter.js";
import { post as mobileFirstDesign } from "./mobile-first-design.js";
import { post as googleBusinessIntegration } from "./small-business-showcase-website-guide.js";
import { post as localSeoIsraelSmallBusiness } from "./local-seo-israel-small-business.js";
import { post as smallBusinessWebsiteDigitalSignature } from "./small-business-website-digital-signature.js";

// Get all posts
export const getAllPosts = () => {
  return [
    smallBusinessWebsiteDigitalSignature,
    whyFastWebsites,
    mobileFirstDesign,
    googleBusinessIntegration,
    localSeoIsraelSmallBusiness,
  ];
};

// Get post by slug
export const getPostBySlug = (slug) => {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
};
