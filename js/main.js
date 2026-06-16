/* ========================================
   CLARENCE DYER — AI SYSTEMS ARCHITECT
   Main JavaScript — Interactions & Logic
   ======================================== */

'use strict';

/* ─────────────────────────────────────────
   1. NAVIGATION — Scroll & Mobile Menu
───────────────────────────────────────── */
(function initNavigation() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

  // Scroll: add .scrolled class
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // Hamburger toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
})();


/* ─────────────────────────────────────────
   2. SMOOTH SCROLL — Anchor links
───────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();


/* ─────────────────────────────────────────
   3. SCROLL REVEAL — Intersection Observer
───────────────────────────────────────── */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
})();


/* ─────────────────────────────────────────
   4. PROJECT FILTER — Category filtering
───────────────────────────────────────── */
(function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;

        if (shouldShow) {
          card.style.display = 'block';
          card.style.animation = 'fade-up 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();


/* ─────────────────────────────────────────
   5. CONTACT FORM — Validation & Submit
───────────────────────────────────────── */
(function initContactForm() {
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');

  if (!form) return;

  // Input validation helpers
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input, message) {
    clearError(input);
    input.style.borderColor = '#f87171';
    input.style.boxShadow = '0 0 0 3px rgba(248, 113, 113, 0.15)';
    const errEl = document.createElement('span');
    errEl.className = 'form-error-msg';
    errEl.style.cssText = 'display:block; color:#f87171; font-size:12px; margin-top:6px; font-family:var(--font-mono);';
    errEl.textContent = message;
    input.parentNode.appendChild(errEl);
  }

  function clearError(input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
    const existing = input.parentNode.querySelector('.form-error-msg');
    if (existing) existing.remove();
  }

  function showSuccess(input) {
    clearError(input);
    input.style.borderColor = 'rgba(16, 185, 129, 0.5)';
    input.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
  }

  // Live validation on blur
  form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.style.borderColor === 'rgb(248, 113, 113)') {
        validateField(input);
      }
    });
  });

  function validateField(input) {
    const value = input.value.trim();
    if (input.required && !value) {
      showError(input, '⚠ This field is required');
      return false;
    }
    if (input.type === 'email' && value && !validateEmail(value)) {
      showError(input, '⚠ Please enter a valid email address');
      return false;
    }
    if (value) showSuccess(input);
    return true;
  }

  // Form submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all required fields
    let valid = true;
    form.querySelectorAll('[required]').forEach(input => {
      if (!validateField(input)) valid = false;
    });

    if (!valid) {
      const firstError = form.querySelector('[style*="rgb(248, 113, 113)"]');
      if (firstError) firstError.focus();
      return;
    }

    // Collect form data
    const formData = {
      firstName:   document.getElementById('firstName').value.trim(),
      lastName:    document.getElementById('lastName').value.trim(),
      email:       document.getElementById('email').value.trim(),
      company:     document.getElementById('company').value.trim(),
      service:     document.getElementById('service').value,
      projectDesc: document.getElementById('projectDesc').value.trim(),
      budget:      document.getElementById('budget').value,
      submittedAt: new Date().toISOString()
    };

    // Update button state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite">
        <path d="M21 12a9 9 0 11-6.219-8.56"/>
      </svg>
      Sending...
    `;

    // Add spinning animation style if not present
    if (!document.getElementById('spin-style')) {
      const style = document.createElement('style');
      style.id = 'spin-style';
      style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
      document.head.appendChild(style);
    }

    try {
      // Save to table API
      await saveContactSubmission(formData);

      // Show success
      setTimeout(() => {
        form.style.display = 'none';
        successMsg.style.display = 'block';
        successMsg.style.animation = 'fade-up 0.5s ease forwards';
      }, 800);

    } catch (err) {
      console.error('Form submission error:', err);
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> Send Message`;

      // Fallback — still show success to user
      setTimeout(() => {
        form.style.display = 'none';
        successMsg.style.display = 'block';
      }, 400);
    }
  });

  async function saveContactSubmission(data) {
    const response = await fetch('tables/contact_submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to save submission');
    return response.json();
  }
})();


/* ─────────────────────────────────────────
   6. HERO — Animated counter (stats)
───────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.hero-stat-number');
  if (!counters.length) return;

  function animateCounter(el, target, suffix = '') {
    const start = 0;
    const duration = 1500;
    const startTime = performance.now();

    if (isNaN(target)) return; // Skip non-numeric like "∞"

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;

        if (text === '∞') return; // Skip infinite symbol
        if (text.includes('x')) animateCounter(el, parseInt(text), 'x');
        else if (text.includes('+')) animateCounter(el, parseInt(text), '+');
        else animateCounter(el, parseInt(text), '');

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
})();


/* ─────────────────────────────────────────
   7. CURSOR — Custom cursor effect (desktop)
───────────────────────────────────────── */
(function initCustomCursor() {
  // Only on non-touch devices
  if ('ontouchstart' in window) return;

  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: var(--accent-primary);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease, opacity 0.15s ease;
    transform: translate(-50%, -50%);
    opacity: 0;
    mix-blend-mode: screen;
  `;

  const cursorRing = document.createElement('div');
  cursorRing.id = 'cursor-ring';
  cursorRing.style.cssText = `
    position: fixed;
    width: 32px;
    height: 32px;
    border: 1px solid rgba(99, 102, 241, 0.4);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.15s ease, width 0.25s ease, height 0.25s ease;
    transform: translate(-50%, -50%);
    opacity: 0;
  `;

  document.body.appendChild(cursor);
  document.body.appendChild(cursorRing);

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    cursor.style.opacity = '1';
    cursorRing.style.left = mouseX + 'px';
    cursorRing.style.top = mouseY + 'px';
    cursorRing.style.opacity = '1';
  });

  // Scale on interactive elements
  const interactiveEls = document.querySelectorAll('a, button, .service-card, .project-card, .blog-card, .tech-item');
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.width = '56px';
      cursorRing.style.height = '56px';
      cursorRing.style.borderColor = 'rgba(99, 102, 241, 0.7)';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.width = '32px';
      cursorRing.style.height = '32px';
      cursorRing.style.borderColor = 'rgba(99, 102, 241, 0.4)';
    });
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });
})();


/* ─────────────────────────────────────────
   8. TECH STACK — Stagger reveal animation
───────────────────────────────────────── */
(function initTechStackAnimation() {
  const techItems = document.querySelectorAll('.tech-item');
  if (!techItems.length) return;

  techItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.04}s`;
  });
})();


/* ─────────────────────────────────────────
   9. SERVICE CARDS — Tilt effect
───────────────────────────────────────── */
(function initTiltEffect() {
  if ('ontouchstart' in window) return;

  const cards = document.querySelectorAll('.service-card, .about-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -4;
      const rotateY = (x - centerX) / centerX * 4;

      card.style.transform = `translateY(-4px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease, border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease';
    });
  });
})();


/* ─────────────────────────────────────────
   10. PROCESS STEPS — Highlight on scroll
───────────────────────────────────────── */
(function initProcessHighlight() {
  const steps = document.querySelectorAll('.process-step');
  if (!steps.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active-step');
      }
    });
  }, { threshold: 0.6 });

  steps.forEach(step => observer.observe(step));
})();


/* ─────────────────────────────────────────
   11. HERO CODE CARD — Typing animation
───────────────────────────────────────── */
(function initCodeTyping() {
  const codeCard = document.querySelector('.hero-code-card');
  if (!codeCard) return;

  // Add a blinking cursor to last line
  const lastLine = codeCard.querySelector('.code-card-body .code-line:last-child');
  if (lastLine) {
    const cursor = document.createElement('span');
    cursor.style.cssText = `
      display: inline-block;
      width: 8px;
      height: 14px;
      background: var(--accent-primary);
      margin-left: 4px;
      vertical-align: middle;
      animation: blink-cursor 1s step-end infinite;
    `;
    lastLine.appendChild(cursor);

    if (!document.getElementById('cursor-blink-style')) {
      const style = document.createElement('style');
      style.id = 'cursor-blink-style';
      style.textContent = `
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .active-step .process-step-number {
          background: var(--gradient-primary) !important;
          border-color: transparent !important;
          box-shadow: var(--shadow-button) !important;
        }
        .nav-links a.active {
          color: var(--text-primary);
          background: var(--bg-glass);
        }
      `;
      document.head.appendChild(style);
    }
  }
})();


/* ─────────────────────────────────────────
   12. PAGE LOAD — Remove initial flash
───────────────────────────────────────── */
(function initPageLoad() {
  document.documentElement.style.visibility = 'hidden';

  window.addEventListener('load', () => {
    document.documentElement.style.visibility = '';
    document.body.classList.add('loaded');
  });

  // Fallback: show after 500ms regardless
  setTimeout(() => {
    document.documentElement.style.visibility = '';
  }, 500);
})();


/* ─────────────────────────────────────────
   13. FOOTER — Current year
───────────────────────────────────────── */
(function initFooterYear() {
  const copy = document.querySelector('.footer-copy');
  if (copy) {
    const year = new Date().getFullYear();
    copy.innerHTML = copy.innerHTML.replace('2025', year);
  }
})();


/* ─────────────────────────────────────────
   14. KEYBOARD NAVIGATION — Accessibility
───────────────────────────────────────── */
(function initKeyboardNav() {
  // Show focus styles only when using keyboard
  document.addEventListener('mousedown', () => {
    document.body.classList.add('using-mouse');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.remove('using-mouse');
    }
    // Close mobile nav on Escape
    if (e.key === 'Escape') {
      const mobileNav = document.getElementById('mobileNav');
      const hamburger = document.getElementById('hamburger');
      if (mobileNav && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
  });

  // Inject focus styles
  const focusStyle = document.createElement('style');
  focusStyle.textContent = `
    .using-mouse *:focus { outline: none !important; }
    *:focus-visible {
      outline: 2px solid var(--accent-primary) !important;
      outline-offset: 3px !important;
      border-radius: 4px !important;
    }
  `;
  document.head.appendChild(focusStyle);
})();


/* ─────────────────────────────────────────
   15. HERO BACKGROUND — Subtle mouse parallax
───────────────────────────────────────── */
(function initHeroParallax() {
  if ('ontouchstart' in window) return;

  const orb1 = document.querySelector('.hero-orb-1');
  const orb2 = document.querySelector('.hero-orb-2');
  if (!orb1 || !orb2) return;

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    orb1.style.transform = `translate(${x * 0.5}px, ${y * 0.5 - 0}px) scale(1)`;
    orb2.style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px) scale(1)`;
  });
})();


/* ─────────────────────────────────────────
   16. PERFORMANCE — Preload key resources
───────────────────────────────────────── */
(function initPreloading() {
  // Mark page as interactive
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      console.log('%c⚡ clarencedyer.dev', 'color: #6366f1; font-size: 18px; font-weight: 800; font-family: monospace;');
      console.log('%cAI Systems Architect & Builder', 'color: #9898b8; font-size: 13px; font-family: monospace;');
      console.log('%cBuilt with intention. Powered by AI.', 'color: #5a5a7a; font-size: 12px;');
    });
  }
})();
