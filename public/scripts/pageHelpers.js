// pageHelpers.js

// --- THROTTLE HELPER ---
export function throttle(func, wait = 100) {
  let timeout = null;
  return (...args) => {
    if (!timeout) {
      func(...args);
      timeout = setTimeout(() => { timeout = null; }, wait);
    }
  };
}

// --- HERO HEIGHT ADJUSTMENT ---
export function initHeroHeight(heroId = "hero-section", headerId = "site-header") {
  const hero = document.getElementById(heroId);
  const header = document.getElementById(headerId);
  if (!hero || !header) return;

  function adjust() {
    hero.style.minHeight = `calc(100vh - ${header.offsetHeight}px)`;
  }

  adjust(); // initial
  window.addEventListener("resize", throttle(adjust, 100));

  // Optional: ResizeObserver for dynamic header changes
  new ResizeObserver(adjust).observe(header);
}

// --- SMOOTH SCROLL + MOBILE CLOSE ---
export function initSmoothScroll() {
  const scrollCache = new Map();

  function getHeaderHeight() {
    const header = document.getElementById("site-header");
    return header ? header.offsetHeight : 0;
  }

  function closeMobileMenu() {
    const checkbox = document.getElementById("menu-toggle");
    if (checkbox) {
      checkbox.checked = false;
      document.body.classList.remove("menu-open");
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const href = anchor.getAttribute("href");
      let element = scrollCache.get(href);
      if (!element) {
        element = document.querySelector(href);
        scrollCache.set(href, element);
      }
      if (!element) return;
      const offsetPosition = element.getBoundingClientRect().top + window.scrollY - getHeaderHeight();
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      closeMobileMenu();
    });
  });
}

// --- PARTICLE CANVAS VISIBILITY ---
export function initParticleObserver(selector = ".section-particles") {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const canvas = entry.target;
      const particleInstance = canvas.__particlesInstance;
      if (!particleInstance) return;

      if (entry.isIntersecting) {
        // Only animate if not already animating
        if (!canvas.__isAnimating) {
          canvas.__isAnimating = true;
          particleInstance.animate();
        }
      } else {
        // Pause animation if running
        if (canvas.__isAnimating) {
          cancelAnimationFrame(canvas.__animationId);
          canvas.__isAnimating = false;
        }
      }
    });
  }, { threshold: 0 });

  document.querySelectorAll(selector).forEach(canvas => observer.observe(canvas));
}

