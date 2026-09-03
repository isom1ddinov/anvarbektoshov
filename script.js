// Dr. Anvarbek Toshov — premium UI interactions
(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  document.addEventListener('DOMContentLoaded', () => {
    const year = $('#year');
    if (year) year.textContent = new Date().getFullYear();

    // Header + scroll progress
    const header = $('#site-header');
    const progress = $('#scroll-progress');
    const onScroll = () => {
      const y = window.scrollY || 0;
      header?.classList.toggle('scrolled', y > 18);
      if (progress) {
        const max = document.documentElement.scrollHeight - innerHeight;
        progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
      }
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile navigation — drawer, backdrop, focus-safe body lock
    const nav = $('#main-nav');
    const toggle = $('#nav-toggle');
    const close = $('#mobile-close');
    const setNav = (open) => {
      nav?.classList.toggle('mobile-open', open);
      document.body.classList.toggle('nav-locked', open);
      toggle?.setAttribute('aria-expanded', String(open));
      if (open) close?.focus({ preventScroll: true });
    };
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.addEventListener('click', () => setNav(true));
    close?.addEventListener('click', () => setNav(false));
    $$('.nav-link', nav).forEach(a => a.addEventListener('click', () => setNav(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setNav(false); });
    document.addEventListener('click', e => {
      if (nav?.classList.contains('mobile-open') && e.target === nav) setNav(false);
    });

    // Smooth anchors with dynamic header offset
    $$('a[href^="#"]').forEach(link => link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      const offset = (header?.offsetHeight || 76) + 12;
      window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - offset, behavior: 'smooth' });
    }));

    // Reveal animations, disabled only when reduced motion is requested
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: .12, rootMargin: '0px 0px -45px' });
      $$('.reveal, .reveal-stagger').forEach(el => io.observe(el));
    } else {
      $$('.reveal, .reveal-stagger').forEach(el => el.classList.add('in-view'));
    }

    // Service accordions — one clean, accessible interaction
    $$('.service-more').forEach(button => {
      button.addEventListener('click', () => {
        const card = button.closest('.service-card');
        const details = $('.service-details', card);
        const isOpen = card.classList.contains('expanded');
        // close other cards for a cleaner mobile UX
        $$('.service-card.expanded').forEach(other => {
          if (other !== card) {
            other.classList.remove('expanded');
            $('.service-more', other)?.setAttribute('aria-expanded', 'false');
            $('.service-details', other)?.setAttribute('aria-hidden', 'true');
          }
        });
        card.classList.toggle('expanded', !isOpen);
        button.setAttribute('aria-expanded', String(!isOpen));
        details?.setAttribute('aria-hidden', String(isOpen));
      });
    });

    // Phone formatting
    const phone = $('#f-phone');
    phone?.addEventListener('input', () => {
      let digits = phone.value.replace(/\D/g, '');
      if (digits.startsWith('998')) digits = digits.slice(3);
      digits = digits.slice(0, 9);
      const parts = [digits.slice(0,2), digits.slice(2,5), digits.slice(5,7), digits.slice(7,9)].filter(Boolean);
      phone.value = '+998' + (parts.length ? ' ' + parts.join(' ') : '');
    });

    // Booking -> Telegram @mrToshoff with prefilled request
    const form = $('#booking-form');
    const success = $('#form-success');
    form?.addEventListener('submit', e => {
      e.preventDefault();
      const name = $('#f-name')?.value.trim();
      const phoneValue = $('#f-phone')?.value.trim();
      const service = $('#f-service')?.value.trim();
      const msg = $('#f-msg')?.value.trim() || '—';
      if (!name || !phoneValue) return;

      const message = [
        '🦷 Yangi qabul so‘rovi',
        '',
        `👤 Ism: ${name}`,
        `📞 Telefon: ${phoneValue}`,
        `🦷 Xizmat: ${service}`,
        `💬 Xabar: ${msg}`
      ].join('\n');
      const telegramUrl = `https://t.me/mrToshoff?text=${encodeURIComponent(message)}`;
      success?.classList.add('show');
      setTimeout(() => window.location.href = telegramUrl, 250);
    });

    // Subtle pointer glow on desktop cards
    if (!reduce && matchMedia('(pointer:fine)').matches) {
      $$('.service-card, .contact-form, .location-info').forEach(card => {
        card.addEventListener('pointermove', e => {
          const r = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${e.clientX - r.left}px`);
          card.style.setProperty('--my', `${e.clientY - r.top}px`);
        });
      });
    }
  });
})();
