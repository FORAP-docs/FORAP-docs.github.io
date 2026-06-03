/* ==========================================================================
   FORAP Documentation Website - Main JavaScript
   Handles static page setup, top tabs, pagination, mobile nav, and interactive
   content enhancements.
   ========================================================================== */

const ICONS = {
  student: '<svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor"><path d="M30 30h-2v-5a5 5 0 00-5-5v-2a7 7 0 017 7zm-8-14a5 5 0 10-5-5 5 5 0 005 5zm0-8a3 3 0 11-3 3 3 3 0 013-3zM16 30H4v-5a7 7 0 017-7h6a7 7 0 017 7v5h-2v-5a5 5 0 00-5-5h-6a5 5 0 00-5 5v5h10z"/></svg>',
  instructor: '<svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor"><path d="M26 30h-2v-5a5 5 0 00-5-5h-6a5 5 0 00-5 5v5H6v-5a7 7 0 017-7h6a7 7 0 017 7zM16 4a5 5 0 11-5 5 5 5 0 015-5m0-2a7 7 0 107 7 7 7 0 00-7-7z"/></svg>',
  assessment: '<svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor"><path d="M14 20.18l-3.59-3.59L9 18l5 5 9-9-1.41-1.42L14 20.18z"/><path d="M25 5h-3V4a2 2 0 00-2-2h-8a2 2 0 00-2 2v1H7a2 2 0 00-2 2v21a2 2 0 002 2h18a2 2 0 002-2V7a2 2 0 00-2-2zM12 4h8v4h-8zM25 28H7V7h3v3h12V7h3z"/></svg>',
  'steps-1-4': '<svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor"><path d="M28 28H4a2 2 0 01-2-2V6a2 2 0 012-2h24a2 2 0 012 2v20a2 2 0 01-2 2zM4 6v20h24V6z"/><path d="M7 12h18v2H7zM7 17h18v2H7zM7 22h12v2H7z"/></svg>',
  'steps-5-7': '<svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor"><path d="M28 10H20V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v6H4a2 2 0 00-2 2v16a2 2 0 002 2h24a2 2 0 002-2V12a2 2 0 00-2-2zM14 4h4v6h-4zM4 28V12h24v16z"/></svg>',
  'steps-8-10': '<svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor"><path d="M14 21.414L9 16.413 10.413 15l3.587 3.585L21.585 11 23 12.415l-9 9z"/><path d="M16 2a14 14 0 1014 14A14 14 0 0016 2zm0 26a12 12 0 1112-12 12 12 0 01-12 12z"/></svg>'
};

const PAGE_PATHS = {
  overview: 'index.html',
  purpose: 'purpose.html',
  architecture: 'architecture.html',
  principles: 'principles.html',
  packages: 'support.html',
  attributes: 'attributes.html',
  steps: 'steps.html',
  example: 'example.html',
  portfolio: 'portfolio.html'
};

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

const PAGE_TABS = {
  packages: [
    { id: 'instructor-panel', slug: 'instructor', label: 'Instructor Support Package', mobileLabel: 'Instructor', icon: 'instructor' },
    { id: 'student-panel', slug: 'student', label: 'Student Support Package', mobileLabel: 'Student', icon: 'student' },
    { id: 'assessment-panel', slug: 'assessment', label: 'Assessment Package', mobileLabel: 'Assessment', icon: 'assessment' }
  ],
  steps: [
    { id: 'steps-1-4', slug: '1-4', label: 'Steps 1-4: Foundation & Design', mobileLabel: 'Steps 1-4', icon: 'steps-1-4' },
    { id: 'steps-5-7', slug: '5-7', label: 'Steps 5-7: Support Package Creation', mobileLabel: 'Steps 5-7', icon: 'steps-5-7' },
    { id: 'steps-8-10', slug: '8-10', label: 'Steps 8-10: Review & Refine', mobileLabel: 'Steps 8-10', icon: 'steps-8-10' }
  ]
};

const TAG_GROUPS = {
  PJP: '<svg viewBox="0 0 32 32" width="12" height="12" aria-hidden="true"><path d="M11 24h10v2H11zM13 28h6v2h-6z" /><path d="M16 2a10 10 0 00-6 18v3a1 1 0 001 1h10a1 1 0 001-1v-3A10 10 0 0016 2zm3.09 16.59l-.09.07V22h-6v-3.34l-.09-.07A8 8 0 1119.09 18.59z" /></svg>',
  GOAL: '<svg viewBox="0 0 32 32" width="12" height="12" aria-hidden="true"><path d="M16 4A12 12 0 114 16 12 12 0 0116 4m0-2a14 14 0 1014 14A14 14 0 0016 2z" /><path d="M16 8a8 8 0 108 8 8 8 0 00-8-8zm0 14a6 6 0 116-6 6 6 0 01-6 6z" /><circle cx="16" cy="16" r="3" /></svg>',
  ATT: '<svg viewBox="0 0 32 32" width="12" height="12" aria-hidden="true"><path d="M4 20h2v8H4zM10 14h2v14h-2zM16 18h2v10h-2zM22 10h2v18h-2zM28 6h2v22h-2z" /></svg>',
  STU: '<svg viewBox="0 0 32 32" width="12" height="12" aria-hidden="true"><path d="M30 30h-2v-5a5 5 0 00-5-5v-2a7 7 0 017 7zm-8-14a5 5 0 10-5-5 5 5 0 005 5zm0-8a3 3 0 11-3 3 3 3 0 013-3zM16 30H4v-5a7 7 0 017-7h6a7 7 0 017 7v5h-2v-5a5 5 0 00-5-5h-6a5 5 0 00-5 5v5h10z" /></svg>',
  INS: '<svg viewBox="0 0 32 32" width="12" height="12" aria-hidden="true"><path d="M26 30h-2v-5a5 5 0 00-5-5h-6a5 5 0 00-5 5v5H6v-5a7 7 0 017-7h6a7 7 0 017 7zM16 4a5 5 0 11-5 5 5 5 0 015-5m0-2a7 7 0 107 7 7 7 0 00-7-7z" /></svg>',
  ASM: '<svg viewBox="0 0 32 32" width="12" height="12" aria-hidden="true"><path d="M14 20.18l-3.59-3.59L9 18l5 5 9-9-1.41-1.42L14 20.18z" /><path d="M25 5h-3V4a2 2 0 00-2-2h-8a2 2 0 00-2 2v1H7a2 2 0 00-2 2v21a2 2 0 002 2h18a2 2 0 002-2V7a2 2 0 00-2-2zM12 4h8v4h-8zM25 28H7V7h3v3h12V7h3z" /></svg>'
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
  ATT1: 'Attribute 1: Greenfield vs Brownfield Project',
  ATT2: 'Attribute 2: Scope / Duration',
  ATT3: 'Attribute 3: Technical Complexity',
  ATT4: 'Attribute 4: Domain / Discipline',
  ATT5: 'Attribute 5: Competency Specification',
  INS1: 'Instructor Support Package 1: Project Overview',
  INS2: 'Instructor Support Package 2: Instructor Notes',
  INS3: 'Instructor Support Package 3: Reference Course',
  INS4: 'Instructor Support Package 4: Sample Solutions',
  STU1: 'Student Support Package 1: Installation Guidelines',
  STU2: 'Student Support Package 2: Task Scaffolding',
  STU3: 'Student Support Package 3: Laboratory Exercises',
  STU4: 'Student Support Package 4: Reference Materials',
  ASM1: 'Assessment Package 1: Phased Milestones',
  ASM2: 'Assessment Package 2: Transfer-oriented Design Problems',
  ASM3: 'Assessment Package 3: Detailed Rubric'
};

function getCurrentPageId() {
  const filename = window.location.pathname.split('/').pop() || 'index.html';
  return Object.entries(PAGE_PATHS).find(([, path]) => path === filename)?.[0] || 'overview';
}

function getPagePath(pageId) {
  return PAGE_PATHS[pageId] || PAGE_PATHS.overview;
}

function getTabFromHash(pageId) {
  const tabs = PAGE_TABS[pageId] || [];
  const slug = window.location.hash.replace(/^#/, '').split('/').pop();
  return tabs.find(tab => tab.slug === slug || tab.id === slug) || tabs[0] || null;
}

function setActivePage(pageId) {
  const section = document.getElementById(pageId);
  if (section) section.classList.add('active');

  document.querySelectorAll('cds-side-nav-link[data-page]').forEach(link => {
    if (link.getAttribute('data-page') === pageId) {
      link.setAttribute('active', '');
    } else {
      link.removeAttribute('active');
    }
  });
}

function initTopTabs(pageId) {
  const tabs = PAGE_TABS[pageId];
  const pageSection = document.getElementById(pageId);
  const hero = pageSection?.querySelector('.page-hero');
  if (!tabs || !hero) return;

  const topBar = document.createElement('div');
  topBar.className = 'top-tabs-bar active';
  topBar.id = 'top-tabs-bar';
  topBar.setAttribute('role', 'tablist');
  topBar.setAttribute('aria-label', 'Page sub-navigation');

  const innerWrapper = document.createElement('div');
  innerWrapper.className = 'content-wrapper';
  innerWrapper.style.display = 'flex';
  innerWrapper.style.alignItems = 'center';
  innerWrapper.style.height = 'var(--top-nav-height)';
  innerWrapper.style.paddingTop = '0';
  innerWrapper.style.paddingBottom = '0';

  innerWrapper.innerHTML = tabs.map(tab => {
    const iconHtml = ICONS[tab.icon] ? `<span class="tab-icon" style="display:inline-flex;align-items:center;margin-right:0.5rem;opacity:0.9">${ICONS[tab.icon]}</span>` : '';
    const labelHtml = `<span class="tab-label tab-label--full">${tab.label}</span><span class="tab-label tab-label--mobile">${tab.mobileLabel || tab.label}</span>`;
    return `<button class="top-tab" data-tab="${tab.id}" data-slug="${tab.slug}" role="tab" aria-selected="false" aria-label="${tab.label}">${iconHtml}${labelHtml}</button>`;
  }).join('');

  topBar.appendChild(innerWrapper);
  hero.after(topBar);

  topBar.querySelectorAll('.top-tab').forEach(button => {
    button.addEventListener('click', () => {
      history.pushState(null, '', `#${button.dataset.slug}`);
      activateTab(pageId, button.dataset.tab);
    });
  });

  activateTab(pageId, getTabFromHash(pageId)?.id);
}

function activateTab(pageId, tabId) {
  const pageSection = document.getElementById(pageId);
  if (!pageSection || !tabId) return;

  pageSection.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === tabId);
  });

  document.querySelectorAll('#top-tabs-bar .top-tab').forEach(button => {
    const active = button.dataset.tab === tabId;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', active ? 'true' : 'false');
  });
}

function initPagination() {
  const pageId = getCurrentPageId();
  const section = document.getElementById(pageId);
  const index = PAGE_SEQUENCE.findIndex(page => page.id === pageId);
  if (!section || index === -1) return;

  const prevPage = index > 0 ? PAGE_SEQUENCE[index - 1] : null;
  const nextPage = index < PAGE_SEQUENCE.length - 1 ? PAGE_SEQUENCE[index + 1] : null;
  const paginationWrapper = document.createElement('div');
  paginationWrapper.className = 'pagination-band';
  paginationWrapper.innerHTML = `
    <div class="content-wrapper pagination-band__inner">
      <div class="page-pagination">
        ${prevPage ? `
          <a href="${getPagePath(prevPage.id)}" class="pagination-link pagination-link--prev" data-page="${prevPage.id}">
            <div class="pagination-link__direction">Previous</div>
            <div class="pagination-link__title">
              <svg class="pagination-icon" viewBox="0 0 32 32"><path d="M14 26l1.41-1.41L7.83 17H28v-2H7.83l7.58-7.59L14 6L4 16z"/></svg>
              ${prevPage.title}
            </div>
          </a>` : '<div class="pagination-link pagination-link--empty"></div>'}
        ${nextPage ? `
          <a href="${getPagePath(nextPage.id)}" class="pagination-link pagination-link--next" data-page="${nextPage.id}">
            <div class="pagination-link__direction">Next</div>
            <div class="pagination-link__title">
              ${nextPage.title}
              <svg class="pagination-icon" viewBox="0 0 32 32"><path d="M18 6l-1.41 1.41L24.17 15H4v2h20.17l-7.58 7.59L18 26l10-10z"/></svg>
            </div>
          </a>` : '<div class="pagination-link pagination-link--empty"></div>'}
      </div>
    </div>`;

  section.appendChild(paginationWrapper);
}

function initArchitectureDiagram() {
  const container = document.querySelector('.architecture-diagram-container');
  if (!container) return;

  const syncExpandedState = node => {
    const toggle = node?.querySelector(':scope > .arch-node__header .arch-node__toggle');
    if (toggle) {
      toggle.setAttribute('aria-expanded', node.classList.contains('is-expanded') ? 'true' : 'false');
    }
  };

  container.querySelectorAll('.arch-node').forEach(syncExpandedState);
  container.querySelectorAll('.arch-node__header').forEach(header => {
    if (!header.querySelector('.arch-node__toggle')) return;

    header.addEventListener('click', event => {
      if (event.target.closest('.arch-node__link')) return;
      const node = header.closest('.arch-node');
      node?.classList.toggle('is-expanded');
      syncExpandedState(node);
    });
  });
}

function initStepsAccordions() {
  document.querySelectorAll('#steps cds-accordion').forEach((accordion, accordionIndex) => {
    const items = [...accordion.querySelectorAll('cds-accordion-item')];
    if (!items.length) return;

    const groupName = accordion.closest('.tab-panel')?.id || `steps-group-${accordionIndex}`;
    const replacement = document.createElement('div');
    replacement.className = 'steps-accordion';

    items.forEach((item, index) => {
      const details = document.createElement('details');
      details.className = 'steps-accordion__item';
      details.setAttribute('name', groupName);
      details.open = index === 0 || item.hasAttribute('open') || item.hasAttribute('expanded');
      details.innerHTML = `
        <summary class="steps-accordion__summary">
          <span class="steps-accordion__title">${item.getAttribute('title') || ''}</span>
          <span class="steps-accordion__chevron" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="16" height="16"><path d="M16 22L6 12l1.4-1.4 8.6 8.6 8.6-8.6L26 12z"></path></svg>
          </span>
        </summary>
        <div class="steps-accordion__content">${item.innerHTML}</div>`;
      replacement.appendChild(details);
    });

    replacement.querySelectorAll('.steps-accordion__item').forEach(currentItem => {
      currentItem.addEventListener('toggle', () => {
        if (!currentItem.open) return;
        replacement.querySelectorAll('.steps-accordion__item').forEach(otherItem => {
          if (otherItem !== currentItem) otherItem.open = false;
        });
      });
    });

    accordion.replaceWith(replacement);
  });
}

function initTags() {
  document.querySelectorAll('cds-tag').forEach(tag => {
    const code = tag.textContent.trim();
    const prefix = (code.match(/^[A-Z]+/) || [''])[0];
    const icon = TAG_GROUPS[prefix];
    const title = TAG_TITLES[code] || code;

    if (icon) {
      tag.innerHTML = `<span class="tag-chip__inner" title="${title}"><span class="tag-chip__icon">${icon}</span><span class="tag-chip__label" title="${title}">${code}</span></span>`;
      tag.dataset.tagGroup = prefix;
    }

    tag.setAttribute('title', title);
  });
}

function initMobileNav() {
  const menuButton = document.querySelector('cds-header-menu-button');
  const sideNav = document.querySelector('cds-side-nav');
  if (!menuButton || !sideNav) return;

  document.addEventListener('cds-header-menu-button-toggled', event => {
    if (event.detail.active) {
      sideNav.setAttribute('expanded', '');
    } else {
      sideNav.removeAttribute('expanded');
    }
  });

  document.addEventListener('click', event => {
    if (window.innerWidth >= 1056) return;
    if (!sideNav.contains(event.target) && !menuButton.contains(event.target) && sideNav.hasAttribute('expanded')) {
      sideNav.removeAttribute('expanded');
      menuButton.removeAttribute('active');
    }
  });
}

function initializePage() {
  const pageId = getCurrentPageId();
  setActivePage(pageId);
  initTopTabs(pageId);
  initPagination();
  initArchitectureDiagram();
  initStepsAccordions();
  initTags();
  initMobileNav();
}

document.addEventListener('DOMContentLoaded', initializePage);
window.addEventListener('hashchange', () => {
  const pageId = getCurrentPageId();
  activateTab(pageId, getTabFromHash(pageId)?.id);
});
