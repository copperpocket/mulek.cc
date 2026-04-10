// menu-toggle.js

export function initMenuToggle() {
  const menuBtn = document.getElementById('menu-btn');
  const body = document.body;

  if (!menuBtn) return;

  menuBtn.addEventListener('change', () => {
    if (menuBtn.checked) {
      body.classList.add('menu-open');
    } else {
      body.classList.remove('menu-open');
    }
  });

  document.querySelectorAll('#hidden-menu a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.checked = false;
      body.classList.remove('menu-open');
    });
  });
}

document.addEventListener('astro:page-load', initMenuToggle);