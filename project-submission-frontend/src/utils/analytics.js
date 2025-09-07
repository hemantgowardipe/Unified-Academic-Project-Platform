// utils/analytics.js

// Track pageviews
export const pageview = (url) => {
  if (window.gtag) {
    window.gtag("config", "G-SHGP5741JX", {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({ action, category, label, value }) => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

