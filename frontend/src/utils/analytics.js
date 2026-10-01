/**
 * Google Analytics & SEO Manager for Elevate SPA
 * Measurement ID: G-BSYWBPGV4Z
 */

export const GA_TRACKING_ID = 'G-BSYWBPGV4Z';

export const ROUTE_SEO_CONFIG = {
  '/': {
    title: 'Elevate | IIIT Nagpur',
    description: 'Elevate is a student-led technical community at IIIT Nagpur focused on technology, learning, projects, events, and collaboration.',
    canonical: 'https://elevate-black-two.vercel.app/',
    image: 'https://elevate-black-two.vercel.app/logo.jpg',
  },
  '/hall-of-fame': {
    title: 'Hall of Fame | Elevate - IIIT Nagpur',
    description: 'Honoring student champions, hackathon winners, and top project showcases across Elevate technical challenges at IIIT Nagpur.',
    canonical: 'https://elevate-black-two.vercel.app/hall-of-fame',
    image: 'https://elevate-black-two.vercel.app/images/ganesh_chaturthi_challenge.png',
  },
  '/halloffame': {
    title: 'Hall of Fame | Elevate - IIIT Nagpur',
    description: 'Honoring student champions, hackathon winners, and top project showcases across Elevate technical challenges at IIIT Nagpur.',
    canonical: 'https://elevate-black-two.vercel.app/hall-of-fame',
    image: 'https://elevate-black-two.vercel.app/images/ganesh_chaturthi_challenge.png',
  },
  '/events': {
    title: 'Events & Sprints | Elevate - IIIT Nagpur',
    description: 'Upcoming workshops, hackathons, and developer sprints hosted by Elevate at IIIT Nagpur.',
    canonical: 'https://elevate-black-two.vercel.app/events',
    image: 'https://elevate-black-two.vercel.app/logo.jpg',
  },
  '/teams': {
    title: 'Core Team & Leads | Elevate - IIIT Nagpur',
    description: 'Meet the executive leads and domain innovators steering Elevate at IIIT Nagpur.',
    canonical: 'https://elevate-black-two.vercel.app/teams',
    image: 'https://elevate-black-two.vercel.app/logo.jpg',
  },
  '/knowledge-hub': {
    title: 'Knowledge Hub & Roadmaps | Elevate - IIIT Nagpur',
    description: 'Curated developer roadmaps, documentation, and technical resources curated by Elevate IIIT Nagpur.',
    canonical: 'https://elevate-black-two.vercel.app/knowledge-hub',
    image: 'https://elevate-black-two.vercel.app/logo.jpg',
  },
  '/legacy': {
    title: 'Our Legacy & Milestones | Elevate - IIIT Nagpur',
    description: 'Journey through the history, milestones, and enduring impact of Elevate at IIIT Nagpur.',
    canonical: 'https://elevate-black-two.vercel.app/legacy',
    image: 'https://elevate-black-two.vercel.app/logo.jpg',
  },
  '/dev-team': {
    title: 'Developer Team | Elevate - IIIT Nagpur',
    description: 'Meet the student engineers and designers who built and maintain the Elevate digital platform.',
    canonical: 'https://elevate-black-two.vercel.app/dev-team',
    image: 'https://elevate-black-two.vercel.app/logo.jpg',
  },
  '/gallery': {
    title: 'Gallery & Moments | Elevate - IIIT Nagpur',
    description: 'Visual memories, hackathon photos, and community moments from Elevate events.',
    canonical: 'https://elevate-black-two.vercel.app/gallery',
    image: 'https://elevate-black-two.vercel.app/logo.jpg',
  },
  '/login/student': {
    title: 'Student Portal | Elevate - IIIT Nagpur',
    description: 'Access the Elevate student portal for workshops, resources, and community projects.',
    canonical: 'https://elevate-black-two.vercel.app/login/student',
    image: 'https://elevate-black-two.vercel.app/logo.jpg',
  },
  '/login/admin': {
    title: 'Admin Portal | Elevate - IIIT Nagpur',
    description: 'Administrative access for Elevate leads and coordinators.',
    canonical: 'https://elevate-black-two.vercel.app/login/admin',
    image: 'https://elevate-black-two.vercel.app/logo.jpg',
  },
  '/admin/dashboard': {
    title: 'Admin Dashboard | Elevate - IIIT Nagpur',
    description: 'Elevate admin dashboard for managing events, resources, and hall of fame records.',
    canonical: 'https://elevate-black-two.vercel.app/admin/dashboard',
    image: 'https://elevate-black-two.vercel.app/logo.jpg',
  },
};

/**
 * Helper to update or inject meta tags
 */
function setMetaTag(selector, attributeName, attributeValue, contentKey, contentVal) {
  if (typeof document === 'undefined') return;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement(selector.startsWith('meta') ? 'meta' : 'link');
    el.setAttribute(attributeName, attributeValue);
    document.head.appendChild(el);
  }
  el.setAttribute(contentKey, contentVal);
}

/**
 * Update document title and head metadata
 */
export function updateSEO(meta = {}) {
  if (typeof document === 'undefined') return;

  const title = meta.title || 'Elevate | IIIT Nagpur';
  const description = meta.description || 'Elevate is a student-led technical community at IIIT Nagpur.';
  const canonical = meta.canonical || `https://elevate-black-two.vercel.app${window.location.pathname}`;
  const image = meta.image || 'https://elevate-black-two.vercel.app/logo.jpg';

  // Title
  document.title = title;

  // Primary Meta
  setMetaTag('meta[name="description"]', 'name', 'description', 'content', description);
  setMetaTag('link[rel="canonical"]', 'rel', 'canonical', 'href', canonical);

  // Open Graph
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', 'content', title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', 'content', description);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', 'content', canonical);
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', 'content', image);

  // Twitter Card
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', 'content', title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', 'content', description);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', 'content', image);
}

/**
 * Trigger Google Analytics pageview and update SEO
 */
export function trackPageView(pathname, search = '') {
  if (typeof window === 'undefined') return;

  const normalizedPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  const config = ROUTE_SEO_CONFIG[normalizedPath] || ROUTE_SEO_CONFIG['/'];

  // 1. Update Title and Meta Tags
  updateSEO(config);

  // 2. Dispatch to Google Analytics (gtag)
  if (typeof window.gtag === 'function') {
    const fullPath = pathname + (search || '');
    const fullLocation = window.location.origin + fullPath;

    // Config update
    window.gtag('config', GA_TRACKING_ID, {
      page_path: fullPath,
      page_title: config.title,
      page_location: fullLocation,
    });

    // Explicit page_view event for SPA routing
    window.gtag('event', 'page_view', {
      page_title: config.title,
      page_location: fullLocation,
      page_path: fullPath,
    });
  }
}

/**
 * Track custom events in Google Analytics
 */
export function trackGAEvent(eventName, eventParams = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  }
}
