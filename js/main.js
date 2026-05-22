/* ==========================================================================
   FORAP Documentation Website — Main JavaScript
   Handles: page-based routing, active nav states, contextual top tabs,
            mobile nav toggle, tab panel management
   ========================================================================== */

/* --------------------------------------------------------------------------
   SVG Icon definitions (Carbon icons, inlined for no extra dependencies)
   -------------------------------------------------------------------------- */
const ICONS = {
  // 16px Carbon icons for tabs and inline use
  'student': '<svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor"><path d="M30 30h-2v-5a5 5 0 00-5-5v-2a7 7 0 017 7zm-8-14a5 5 0 10-5-5 5 5 0 005 5zm0-8a3 3 0 11-3 3 3 3 0 013-3zM16 30H4v-5a7 7 0 017-7h6a7 7 0 017 7v5h-2v-5a5 5 0 00-5-5h-6a5 5 0 00-5 5v5h10z"/></svg>',
  'instructor': '<svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor"><path d="M26 30h-2v-5a5 5 0 00-5-5h-6a5 5 0 00-5 5v5H6v-5a7 7 0 017-7h6a7 7 0 017 7zM16 4a5 5 0 11-5 5 5 5 0 015-5m0-2a7 7 0 107 7 7 7 0 00-7-7z"/></svg>',
  'assessment': '<svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor"><path d="M14 20.18l-3.59-3.59L9 18l5 5 9-9-1.41-1.42L14 20.18z"/><path d="M25 5h-3V4a2 2 0 00-2-2h-8a2 2 0 00-2 2v1H7a2 2 0 00-2 2v21a2 2 0 002 2h18a2 2 0 002-2V7a2 2 0 00-2-2zM12 4h8v4h-8zM25 28H7V7h3v3h12V7h3z"/></svg>',
  'steps-1-4': '<svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor"><path d="M28 28H4a2 2 0 01-2-2V6a2 2 0 012-2h24a2 2 0 012 2v20a2 2 0 01-2 2zM4 6v20h24V6z"/><path d="M7 12h18v2H7zM7 17h18v2H7zM7 22h12v2H7z"/></svg>',
  'steps-5-7': '<svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor"><path d="M28 10H20V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v6H4a2 2 0 00-2 2v16a2 2 0 002 2h24a2 2 0 002-2V12a2 2 0 00-2-2zM14 4h4v6h-4zM4 28V12h24v16z"/></svg>',
  'steps-8-10': '<svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor"><path d="M14 21.414L9 16.413 10.413 15l3.587 3.585L21.585 11 23 12.415l-9 9z"/><path d="M16 2a14 14 0 1014 14A14 14 0 0016 2zm0 26a12 12 0 1112-12 12 12 0 01-12 12z"/></svg>'
};

/* --------------------------------------------------------------------------
   Page configuration — defines which pages have contextual top tabs
   -------------------------------------------------------------------------- */
const PAGE_TABS = {
  packages: [
    { id: 'instructor-panel', label: 'Instructor Support Package', mobileLabel: 'Instructor', icon: 'instructor' },
    { id: 'student-panel', label: 'Student Support Package', mobileLabel: 'Student', icon: 'student' },
    { id: 'assessment-panel', label: 'Assessment Package', mobileLabel: 'Assessment', icon: 'assessment' }
  ],
  steps: [
    { id: 'steps-1-4', label: 'Steps 1–4: Foundation & Design', mobileLabel: 'Steps 1–4', icon: 'steps-1-4' },
    { id: 'steps-5-7', label: 'Steps 5–7: Support Package Creation', mobileLabel: 'Steps 5–7', icon: 'steps-5-7' },
    { id: 'steps-8-10', label: 'Steps 8–10: Review & Refine', mobileLabel: 'Steps 8–10', icon: 'steps-8-10' }
  ]
};

/* --------------------------------------------------------------------------
   State
   -------------------------------------------------------------------------- */
let currentPage = 'overview';
let currentSubTab = {};  // { packages: 'instructor-panel', steps: 'steps-1-4' }

/* --------------------------------------------------------------------------
   Page Navigation — show/hide sections
   -------------------------------------------------------------------------- */
function navigateToPage(pageId) {
  if (!pageId) pageId = 'overview';

  // Hide all sections
  document.querySelectorAll('.page-section').forEach(s => {
    s.classList.remove('active');
  });

  // Show target section
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
  }

  // Update sidebar active state
  document.querySelectorAll('cds-side-nav-link').forEach(link => {
    if (link.getAttribute('data-page') === pageId) {
      link.setAttribute('active', '');
    } else {
      link.removeAttribute('active');
    }
  });

  // Update top tabs bar
  updateTopTabs(pageId);

  currentPage = pageId;

  // Close mobile nav
  const sideNav = document.querySelector('cds-side-nav');
  if (sideNav && window.innerWidth < 1056) {
    sideNav.removeAttribute('expanded');
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

/* --------------------------------------------------------------------------
   Top Tabs Bar — contextual tabs per page
   -------------------------------------------------------------------------- */
function updateTopTabs(pageId) {
  // Remove existing tabs bar if any
  const existingBar = document.getElementById('top-tabs-bar');
  if (existingBar) {
    existingBar.remove();
  }

  const tabs = PAGE_TABS[pageId];
  if (!tabs) return;

  const pageSection = document.getElementById(pageId);
  if (!pageSection) return;

  const hero = pageSection.querySelector('.page-hero');
  if (!hero) return;

  // Build topBar
  const topBar = document.createElement('div');
  topBar.className = 'top-tabs-bar active';
  topBar.id = 'top-tabs-bar';
  topBar.setAttribute('role', 'tablist');
  topBar.setAttribute('aria-label', 'Page sub-navigation');

  // Inner wrapper to keep content aligned
  const innerWrapper = document.createElement('div');
  innerWrapper.className = 'content-wrapper';
  innerWrapper.style.display = 'flex';
  innerWrapper.style.alignItems = 'center';
  innerWrapper.style.height = 'var(--top-nav-height)';
  innerWrapper.style.paddingTop = '0';
  innerWrapper.style.paddingBottom = '0';

  const defaultTab = currentSubTab[pageId] || tabs[0].id;
  innerWrapper.innerHTML = tabs.map(tab => {
    const isActive = tab.id === defaultTab ? ' active' : '';
    const iconHtml = ICONS[tab.icon] ? `<span class="tab-icon" style="display:inline-flex;align-items:center;margin-right:0.5rem;opacity:0.9">${ICONS[tab.icon]}</span>` : '';
    const labelHtml = tab.mobileLabel
      ? `<span class="tab-label tab-label--full">${tab.label}</span><span class="tab-label tab-label--mobile">${tab.mobileLabel}</span>`
      : `<span class="tab-label">${tab.label}</span>`;
    return `<button class="top-tab${isActive}" data-tab="${tab.id}" role="tab" aria-selected="${tab.id === defaultTab}" aria-label="${tab.label}">${iconHtml}${labelHtml}</button>`;
  }).join('');

  topBar.appendChild(innerWrapper);

  // Add click handlers
  topBar.querySelectorAll('.top-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchSubTab(pageId, tabId);
    });
  });

  hero.after(topBar);

  // Show the correct sub-panel
  switchSubTab(pageId, defaultTab, false);
}


function switchSubTab(pageId, tabId, updateButtons = true) {
  currentSubTab[pageId] = tabId;

  // Update button active states
  if (updateButtons) {
    const topBar = document.getElementById('top-tabs-bar');
    topBar.querySelectorAll('.top-tab').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });
  }

  // Show/hide tab panels in the current page
  const pageSection = document.getElementById(pageId);
  if (!pageSection) return;

  const panels = pageSection.querySelectorAll('.tab-panel');
  panels.forEach(panel => {
    if (panel.id === tabId) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   Initialize sidebar navigation click handlers
   -------------------------------------------------------------------------- */
function initNavigation() {
  // Top-level page links
  document.querySelectorAll('cds-side-nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('data-page');
      if (pageId) {
        history.pushState(null, '', `#${pageId}`);
        navigateToPage(pageId);
      }
    });
  });

  // cds-side-nav-menu parent title click → navigate to the page
  document.querySelectorAll('cds-side-nav-menu[data-page]').forEach(menu => {
    menu.addEventListener('click', (e) => {
      const pageId = menu.getAttribute('data-page');
      if (pageId) {
        history.pushState(null, '', `#${pageId}`);
        navigateToPage(pageId);
      }
    });
  });

  // cds-side-nav-menu-item sub-item clicks
  document.querySelectorAll('cds-side-nav-menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const pageId = item.getAttribute('data-page');
      const subtab = item.getAttribute('data-subtab');
      const subsection = item.getAttribute('data-subsection');

      if (pageId) {
        history.pushState(null, '', `#${pageId}`);
        navigateToPage(pageId);

        // Switch to a specific tab (packages)
        if (subtab) {
          setTimeout(() => switchSubTab(pageId, subtab), 50);
        }

        // Scroll to a specific subsection (principles)
        if (subsection) {
          setTimeout(() => {
            const el = document.getElementById(subsection);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    });
  });

  // Header brand name click
  const headerName = document.querySelector('cds-header-name');
  if (headerName) {
    headerName.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState(null, '', '#overview');
      navigateToPage('overview');
    });
  }
}

/* --------------------------------------------------------------------------
   Pagination (Next/Previous)
   -------------------------------------------------------------------------- */
const PAGE_SEQUENCE = [
  { id: 'overview', title: 'Overview' },
  { id: 'purpose', title: 'Purpose' },
  { id: 'architecture', title: 'FORAP Architecture' },
  { id: 'principles', title: 'Guiding Principles' },
  { id: 'packages', title: 'Support Packages' },
  { id: 'attributes', title: 'Attributes' },
  { id: 'steps', title: 'Packaging Steps' },
  { id: 'example', title: 'Illustrative Example' },
  { id: 'portfolio', title: 'Project Portfolio' }
];

function initPagination() {
  PAGE_SEQUENCE.forEach((page, index) => {
    const section = document.getElementById(page.id);
    if (!section) return;

    const prevPage = index > 0 ? PAGE_SEQUENCE[index - 1] : null;
    const nextPage = index < PAGE_SEQUENCE.length - 1 ? PAGE_SEQUENCE[index + 1] : null;

    // Create wrapper for pagination
    const paginationWrapper = document.createElement('div');
    paginationWrapper.className = 'pagination-band';

    const paginationInner = document.createElement('div');
    paginationInner.className = 'content-wrapper pagination-band__inner';
    
    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'page-pagination';

    let html = '';

    // Previous link
    if (prevPage) {
      html += `
        <a href="#${prevPage.id}" class="pagination-link pagination-link--prev" data-page="${prevPage.id}">
          <div class="pagination-link__direction">Previous</div>
          <div class="pagination-link__title">
            <svg class="pagination-icon" viewBox="0 0 32 32">
              <path d="M14 26l1.41-1.41L7.83 17H28v-2H7.83l7.58-7.59L14 6L4 16z"/>
            </svg>
            ${prevPage.title}
          </div>
        </a>
      `;
    } else {
      html += `<div class="pagination-link pagination-link--empty"></div>`;
    }

    // Next link
    if (nextPage) {
      html += `
        <a href="#${nextPage.id}" class="pagination-link pagination-link--next" data-page="${nextPage.id}">
          <div class="pagination-link__direction">Next</div>
          <div class="pagination-link__title">
            ${nextPage.title}
            <svg class="pagination-icon" viewBox="0 0 32 32">
              <path d="M18 6l-1.41 1.41L24.17 15H4v2h20.17l-7.58 7.59L18 26l10-10z"/>
            </svg>
          </div>
        </a>
      `;
    } else {
      html += `<div class="pagination-link pagination-link--empty"></div>`;
    }

    paginationDiv.innerHTML = html;
    
    // Add click event listeners to smoothly navigate
    paginationDiv.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-page');
        history.pushState(null, '', `#${targetId}`);
        navigateToPage(targetId);
      });
    });

    paginationInner.appendChild(paginationDiv);
    paginationWrapper.appendChild(paginationInner);
    section.appendChild(paginationWrapper);
  });
}

/* --------------------------------------------------------------------------
   Interactive Architecture Diagram
   -------------------------------------------------------------------------- */
function initArchitectureDiagram() {
  const container = document.querySelector('.architecture-diagram-container');
  if (!container) return;

  const syncExpandedState = (node) => {
    const toggle = node?.querySelector(':scope > .arch-node__header .arch-node__toggle');
    if (toggle) {
      toggle.setAttribute('aria-expanded', node.classList.contains('is-expanded') ? 'true' : 'false');
    }
  };

  container.querySelectorAll('.arch-node').forEach(syncExpandedState);

  // Handle expand/collapse toggle when clicking the header
  container.querySelectorAll('.arch-node__header').forEach(header => {
    // If it doesn't have a toggle button, it's not expandable
    if (!header.querySelector('.arch-node__toggle')) return;

    header.addEventListener('click', (e) => {
      // If they clicked the link, let the link handler deal with it
      if (e.target.closest('.arch-node__link')) return;

      e.stopPropagation();
      const node = header.closest('.arch-node');
      if (node) {
        node.classList.toggle('is-expanded');
        syncExpandedState(node);
      }
    });
  });

  // Handle navigation on click of the separate link
  container.querySelectorAll('.arch-node__link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = link.getAttribute('data-target');
      if (targetId) {
        e.preventDefault();
        history.pushState(null, '', `#${targetId}`);
        navigateToPage(targetId);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Packaging Process Accordions
   -------------------------------------------------------------------------- */
function initStepsAccordions() {
  document.querySelectorAll('#steps cds-accordion').forEach(accordion => {
    const items = [...accordion.querySelectorAll('cds-accordion-item')];
    if (!items.length) return;

    const groupName = accordion.closest('.tab-panel')?.id || `steps-group-${Math.random().toString(36).slice(2)}`;
    const replacement = document.createElement('div');
    replacement.className = 'steps-accordion';

    items.forEach((item, index) => {
      const details = document.createElement('details');
      details.className = 'steps-accordion__item';
      details.setAttribute('name', groupName);

      if (index === 0 || item.hasAttribute('open') || item.hasAttribute('expanded')) {
        details.open = true;
      }

      const summary = document.createElement('summary');
      summary.className = 'steps-accordion__summary';
      summary.innerHTML = `
        <span class="steps-accordion__title">${item.getAttribute('title') || ''}</span>
        <span class="steps-accordion__chevron" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="16" height="16">
            <path d="M16 22L6 12l1.4-1.4 8.6 8.6 8.6-8.6L26 12z"></path>
          </svg>
        </span>
      `;

      const content = document.createElement('div');
      content.className = 'steps-accordion__content';
      content.innerHTML = item.innerHTML;

      details.appendChild(summary);
      details.appendChild(content);
      replacement.appendChild(details);
    });

    replacement.querySelectorAll('.steps-accordion__item').forEach(currentItem => {
      currentItem.addEventListener('toggle', () => {
        if (!currentItem.open) return;

        replacement.querySelectorAll('.steps-accordion__item').forEach(otherItem => {
          if (otherItem !== currentItem) {
            otherItem.open = false;
          }
        });
      });
    });

    accordion.replaceWith(replacement);
  });
}

/* --------------------------------------------------------------------------
   Tag references and tag icons
   -------------------------------------------------------------------------- */
function initTagReferences() {
  const TAG_GROUPS = {
    PJP: {
      icon: '<svg viewBox="0 0 32 32" width="12" height="12" aria-hidden="true"><path d="M11 24h10v2H11zM13 28h6v2h-6z" /><path d="M16 2a10 10 0 00-6 18v3a1 1 0 001 1h10a1 1 0 001-1v-3A10 10 0 0016 2zm3.09 16.59l-.09.07V22h-6v-3.34l-.09-.07A8 8 0 1119.09 18.59z" /></svg>'
    },
    GOAL: {
      icon: '<svg viewBox="0 0 32 32" width="12" height="12" aria-hidden="true"><path d="M16 4A12 12 0 114 16 12 12 0 0116 4m0-2a14 14 0 1014 14A14 14 0 0016 2z" /><path d="M16 8a8 8 0 108 8 8 8 0 00-8-8zm0 14a6 6 0 116-6 6 6 0 01-6 6z" /><circle cx="16" cy="16" r="3" /></svg>'
    },
    ATT: {
      icon: '<svg viewBox="0 0 32 32" width="12" height="12" aria-hidden="true"><path d="M4 20h2v8H4zM10 14h2v14h-2zM16 18h2v10h-2zM22 10h2v18h-2zM28 6h2v22h-2z" /></svg>'
    },
    STU: {
      icon: '<svg viewBox="0 0 32 32" width="12" height="12" aria-hidden="true"><path d="M30 30h-2v-5a5 5 0 00-5-5v-2a7 7 0 017 7zm-8-14a5 5 0 10-5-5 5 5 0 005 5zm0-8a3 3 0 11-3 3 3 3 0 013-3zM16 30H4v-5a7 7 0 017-7h6a7 7 0 017 7v5h-2v-5a5 5 0 00-5-5h-6a5 5 0 00-5 5v5h10z" /></svg>'
    },
    INS: {
      icon: '<svg viewBox="0 0 32 32" width="12" height="12" aria-hidden="true"><path d="M26 30h-2v-5a5 5 0 00-5-5h-6a5 5 0 00-5 5v5H6v-5a7 7 0 017-7h6a7 7 0 017 7zM16 4a5 5 0 11-5 5 5 5 0 015-5m0-2a7 7 0 107 7 7 7 0 00-7-7z" /></svg>'
    },
    ASM: {
      icon: '<svg viewBox="0 0 32 32" width="12" height="12" aria-hidden="true"><path d="M14 20.18l-3.59-3.59L9 18l5 5 9-9-1.41-1.42L14 20.18z" /><path d="M25 5h-3V4a2 2 0 00-2-2h-8a2 2 0 00-2 2v1H7a2 2 0 00-2 2v21a2 2 0 002 2h18a2 2 0 002-2V7a2 2 0 00-2-2zM12 4h8v4h-8zM25 28H7V7h3v3h12V7h3z" /></svg>'
    }
  };

  const TAG_TITLES = {
    PJP1: 'PjBL Principle 1: Authentic Learning',
    PJP2: 'PjBL Principle 2: Active Learning',
    PJP3: 'PjBL Principle 3: Self-Directed Learning',
    PJP4: 'PjBL Principle 4: Collaborative Learning',
    PJP5: 'PjBL Principle 5: Critical Thinking',
    GOAL1: 'Goal 1: Aligned Learning Objectives',
    GOAL2: 'Goal 2: Reusability and Adaptability',
    GOAL3: 'Goal 3: Support for Teaching and Learning',
    GOAL4: 'Goal 4: Appropriateness of Challenges',
    GOAL5: 'Goal 5: Formative and Summative Assessment',
    ATT1: 'Attribute 1: Competency Specification',
    ATT2: 'Attribute 2: Domain / Discipline',
    ATT3: 'Attribute 3: Scope / Duration',
    ATT4: 'Attribute 4: Technical Complexity',
    ATT5: 'Attribute 5: Codebase Context',
    INS1: 'Instructor Support Package 1: Adoption Guidelines',
    INS2: 'Instructor Support Package 2: Instructor Notes',
    INS3: 'Instructor Support Package 3: Reference Course',
    INS4: 'Instructor Support Package 4: Sample Solutions',
    INS5: 'Instructor Support Package 5: Sustainability Plan',
    STU1: 'Student Support Package 1: Installation Guidelines',
    STU2: 'Student Support Package 2: Support Materials',
    STU3: 'Student Support Package 3: Laboratory Exercises',
    STU4: 'Student Support Package 4: Reference Materials',
    ASM1: 'Assessment Package 1: Phased Milestones',
    ASM2: 'Assessment Package 2: Transfer-oriented Design Problems',
    ASM3: 'Assessment Package 3: Detailed Rubric'
  };

  const getTagCode = (tag) => tag.textContent.trim();
  const getTagPrefix = (code) => (code.match(/^[A-Z]+/) || [''])[0];
  const referenceMap = new Map();

  document.querySelectorAll('.page-section:not(#steps) cds-tag').forEach(tag => {
    const code = getTagCode(tag);
    if (!code || referenceMap.has(code)) return;

    const page = tag.closest('.page-section')?.id;
    const tab = tag.closest('.tab-panel')?.id || null;
    const target = tag.closest('cds-tile, .package-item, li, h3, .subsection-title, .tab-panel-content');
    if (!page || !target) return;

    const targetId = target.id || `ref-${code.toLowerCase()}`;
    target.id = targetId;
    referenceMap.set(code, { page, tab, targetId });
  });

  document.querySelectorAll('cds-tag').forEach(tag => {
    if (tag.dataset.enhanced === 'true') return;

    const code = getTagCode(tag);
    const prefix = getTagPrefix(code);
    const config = TAG_GROUPS[prefix];
    const fullTitle = TAG_TITLES[code] || code;
    const label = code;

    if (config) {
      tag.innerHTML = `<span class="tag-chip__inner" title="${fullTitle}"><span class="tag-chip__icon">${config.icon}</span><span class="tag-chip__label" title="${fullTitle}">${label}</span></span>`;
      tag.dataset.tagGroup = prefix;
    }

    tag.setAttribute('title', fullTitle);
    tag.dataset.enhanced = 'true';
  });

  const navigateToReference = (code) => {
    const reference = referenceMap.get(code);
    if (!reference) return;

    history.pushState(null, '', `#${reference.page}`);
    navigateToPage(reference.page);

    if (reference.tab) {
      switchSubTab(reference.page, reference.tab);
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const target = document.getElementById(reference.targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  };

  document.querySelectorAll('#steps cds-tag').forEach(tag => {
    const code = getTagCode(tag);
    const fullTitle = TAG_TITLES[code] || code;

    tag.setAttribute('title', fullTitle);

    if (!referenceMap.has(code)) return;

    tag.classList.add('tag-chip--interactive');
    tag.setAttribute('role', 'link');
    tag.setAttribute('tabindex', '0');
    tag.setAttribute('aria-label', `Go to ${fullTitle}`);

    tag.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      navigateToReference(code);
    });

    tag.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        navigateToReference(code);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Mobile Navigation Toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const menuButton = document.querySelector('cds-header-menu-button');
  const sideNav = document.querySelector('cds-side-nav');

  if (!menuButton || !sideNav) return;

  console.log("initMobileNav initialized.");
  document.addEventListener('cds-header-menu-button-toggled', (e) => {
    console.log("Mobile menu toggled!", e.detail.active);
    const isActive = e.detail.active;
    if (isActive) {
      sideNav.setAttribute('expanded', '');
    } else {
      sideNav.removeAttribute('expanded');
    }
  });

  // Close side-nav when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth >= 1056) return;
    if (!sideNav.contains(e.target) && !menuButton.contains(e.target) && sideNav.hasAttribute('expanded')) {
      sideNav.removeAttribute('expanded');
      menuButton.removeAttribute('active');
    }
  });
}

/* --------------------------------------------------------------------------
   Handle browser back/forward navigation
   -------------------------------------------------------------------------- */
window.addEventListener('popstate', () => {
  const hash = window.location.hash.replace('#', '') || 'overview';
  navigateToPage(hash);
});
