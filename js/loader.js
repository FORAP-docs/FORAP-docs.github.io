/* ==========================================================================
   Section Loader — fetches HTML partials and injects them into the page.
   Intended for HTTP/HTTPS hosting.
   ========================================================================== */

const SECTIONS = [
  'sections/overview.html',
  'sections/purpose.html',
  'sections/architecture.html',
  'sections/principles.html',
  'sections/packages.html',
  'sections/attributes.html',
  'sections/steps.html',
  'sections/example.html',
  'sections/portfolio.html'
];

async function loadSections() {
  const container = document.getElementById('main-content');
  if (!container) return;

  for (const path of SECTIONS) {
    try {
      const resp = await fetch(path + '?v=' + Date.now(), { cache: 'no-store' });
      if (!resp.ok) throw new Error(`Failed to load ${path}`);
      const html = await resp.text();
      container.insertAdjacentHTML('beforeend', html);
    } catch (err) {
      console.error(err);
      container.insertAdjacentHTML('beforeend',
        `<section class="page-section">
          <div class="content-wrapper">
            <p class="helper-text">Error loading ${path}</p>
          </div>
        </section>`);
    }
  }

  initializePage();
}

function initializePage() {
  if (typeof initNavigation === 'function') {
    initNavigation();
  }
  if (typeof initMobileNav === 'function') {
    initMobileNav();
  }
  if (typeof initPagination === 'function') {
    initPagination();
  }
  if (typeof initArchitectureDiagram === 'function') {
    initArchitectureDiagram();
  }
  if (typeof initStepsAccordions === 'function') {
    initStepsAccordions();
  }
  if (typeof initTagReferences === 'function') {
    initTagReferences();
  }

  const hash = window.location.hash.replace('#', '') || 'overview';
  navigateToPage(hash);
}

document.addEventListener('DOMContentLoaded', loadSections);
