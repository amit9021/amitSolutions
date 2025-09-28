// Google Analytics utility functions
// This file provides helper functions for tracking events in your React app

// Track page views
export const trackPageView = (url) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "G-JYJF8SBNR9", {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (action, category, label, value) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track WhatsApp button clicks
export const trackWhatsAppClick = (source) => {
  trackEvent("click", "engagement", "whatsapp_button", source);
};

// Track phone button clicks
export const trackPhoneClick = (source) => {
  trackEvent("click", "engagement", "phone_button", source);
};

// Track form submissions
export const trackFormSubmission = (formName) => {
  trackEvent("submit", "form", formName);
};

// Track portfolio item views
export const trackPortfolioView = (itemName) => {
  trackEvent("view", "portfolio", itemName);
};

// Track service package views
export const trackServiceView = (packageName) => {
  trackEvent("view", "service", packageName);
};

// Track scroll depth
export const trackScrollDepth = (depth) => {
  trackEvent("scroll", "engagement", "scroll_depth", depth);
};

// Track time on page
export const trackTimeOnPage = (timeInSeconds) => {
  trackEvent("timing", "engagement", "time_on_page", timeInSeconds);
};

// Blog Analytics Functions

// Track blog post views
export const trackBlogPostView = (postTitle, postSlug) => {
  trackEvent("view", "blog", postTitle, postSlug);
};

// Track blog index page views
export const trackBlogIndexView = () => {
  trackEvent("view", "blog", "blog_index");
};

// Track blog post reading time
export const trackBlogReadingTime = (postSlug, timeInSeconds) => {
  trackEvent("timing", "blog", `reading_time_${postSlug}`, timeInSeconds);
};

// Track blog post engagement (scroll depth)
export const trackBlogScrollDepth = (postSlug, depth) => {
  trackEvent("scroll", "blog", `scroll_depth_${postSlug}`, depth);
};

// Track blog navigation clicks
export const trackBlogNavigation = (action, source) => {
  trackEvent("click", "blog_navigation", action, source);
};

// Track blog post shares (if you add sharing functionality)
export const trackBlogShare = (postSlug, platform) => {
  trackEvent("share", "blog", postSlug, platform);
};

// Track blog search (if you add search functionality)
export const trackBlogSearch = (searchTerm) => {
  trackEvent("search", "blog", searchTerm);
};

// Track blog tag clicks
export const trackBlogTagClick = (tagName, postSlug) => {
  trackEvent("click", "blog_tag", tagName, postSlug);
};

// Track blog post completion (user read entire post)
export const trackBlogPostCompletion = (postSlug, timeSpent) => {
  trackEvent("complete", "blog", postSlug, timeSpent);
};
