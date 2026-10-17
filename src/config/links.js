// The site's links, shared by the header, the site menu and the Contact page, so they can't drift apart.

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

// Elsewhere on the web
export const outsideLinks = [
  { href: "https://github.com/copperpocket", label: "GitHub" },
  { href: "https://copperpocket.bsky.social", label: "Bluesky" },
  { href: "/rss.xml", label: "RSS" },
];

/**
 * Whether a nav link is the page you're on, or the section it's in (a project counts as Projects)
 * @param {string} href
 * @param {string} pathname
 */
export function isCurrent(href, pathname) {
  const path = pathname.replace(/\/$/, "") || "/";
  return href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
}

// Outside links open in a new tab; the RSS feed doesn't
/** @param {string} href */
export const newTab = (href) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});
