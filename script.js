(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.main-nav');
  const scrim = document.querySelector('.menu-scrim');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileMenu = window.matchMedia('(max-width: 700px)');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Keep every section readable if JavaScript or IntersectionObserver is unavailable.
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const reveals = Array.from(document.querySelectorAll('.reveal'));
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
    reveals.forEach(element => revealObserver.observe(element));
    document.documentElement.classList.add('motion-ready');
    reducedMotion.addEventListener('change', event => {
      if (event.matches) {
        revealObserver.disconnect();
        reveals.forEach(element => element.classList.add('is-visible'));
      }
    });
  }

  let scrollScheduled = false;
  const updateScroll = () => {
    const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollRange > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollRange)) : 0;
    if (progress) progress.style.transform = `scaleX(${ratio})`;
    header?.classList.toggle('is-scrolled', window.scrollY > 20);
    scrollScheduled = false;
  };
  const scheduleScroll = () => {
    if (scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(updateScroll);
  };
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', scheduleScroll, { passive: true });
  updateScroll();

  // Mobile menu: escape, outside tap, link dismissal and keyboard focus containment.
  const menuIsOpen = () => menuButton?.getAttribute('aria-expanded') === 'true';
  const setMenu = (open, returnFocus = false) => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    const caption = menuButton.querySelector('.menu-caption');
    if (caption) caption.textContent = open ? 'Cerrar' : 'Menú';
    navigation.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    if (returnFocus) menuButton.focus({ preventScroll: true });
  };
  menuButton?.addEventListener('click', () => setMenu(!menuIsOpen()));
  scrim?.addEventListener('click', () => setMenu(false, true));
  navigation?.addEventListener('click', event => {
    if (!event.target.closest('a') || !menuIsOpen()) return;
    setMenu(false);
    const destination = event.target.closest('a').getAttribute('href');
    const target = destination?.startsWith('#') ? document.querySelector(destination) : null;
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
  });
  document.addEventListener('keydown', event => {
    if (!menuIsOpen()) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setMenu(false, true);
    }
    if (event.key === 'Tab') {
      const controls = [menuButton, ...navigation.querySelectorAll('a')];
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }
  });
  mobileMenu.addEventListener('change', () => setMenu(false));
  if (menuButton && navigation) document.documentElement.classList.add('menu-ready');

  if ('IntersectionObserver' in window) {
    const navLinks = Array.from(navigation?.querySelectorAll('a[href^="#"]') || []);
    const sectionObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      const current = `#${visible[0].target.id}`;
      navLinks.forEach(link => {
        if (link.getAttribute('href') === current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('main > section[id]').forEach(section => sectionObserver.observe(section));

    const careerLinks = Array.from(document.querySelectorAll('.career-index a'));
    const careerObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      if (!visible.length) return;
      const current = `#${visible[0].target.id}`;
      careerLinks.forEach(link => {
        const active = link.getAttribute('href') === current;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('.career-story').forEach(story => careerObserver.observe(story));
  }

  // A fine, inert halo follows the native cursor. It never replaces the pointer.
  // Animation stops when settled, on touch, when the tab is hidden, or with reduced motion.
  const halo = document.querySelector('.cursor-halo');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!halo) return;
  let pointerX = -100, pointerY = -100, haloX = -100, haloY = -100;
  let haloFrame = null;
  let enabled = false;
  let entered = false;
  const stopHalo = () => {
    if (haloFrame !== null) cancelAnimationFrame(haloFrame);
    haloFrame = null;
  };
  const drawHalo = () => {
    haloX += (pointerX - haloX) * 0.19;
    haloY += (pointerY - haloY) * 0.19;
    const size = halo.classList.contains('is-hover') ? 56 : 36;
    halo.style.transform = `translate3d(${haloX - size / 2}px, ${haloY - size / 2}px, 0)`;
    if (Math.abs(pointerX - haloX) + Math.abs(pointerY - haloY) > .15) {
      haloFrame = requestAnimationFrame(drawHalo);
    } else {
      haloFrame = null;
    }
  };
  const startHalo = () => {
    if (enabled && !document.hidden && haloFrame === null) haloFrame = requestAnimationFrame(drawHalo);
  };
  const configureHalo = () => {
    enabled = finePointer.matches && !reducedMotion.matches;
    halo.classList.toggle('is-enabled', enabled);
    if (!enabled) { halo.classList.remove('is-visible'); entered = false; stopHalo(); }
  };
  configureHalo();
  finePointer.addEventListener('change', configureHalo);
  reducedMotion.addEventListener('change', configureHalo);
  document.addEventListener('pointermove', event => {
    if (!enabled || event.pointerType !== 'mouse') return;
    pointerX = event.clientX; pointerY = event.clientY;
    if (!entered) { haloX = pointerX; haloY = pointerY; entered = true; }
    halo.classList.add('is-visible');
    halo.classList.toggle('is-light', !!event.target.closest('.section-light'));
    halo.classList.toggle('is-hover', !!event.target.closest('a, button, summary'));
    startHalo();
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => {
    halo.classList.remove('is-visible'); entered = false; stopHalo();
  });
  window.addEventListener('blur', () => {
    halo.classList.remove('is-visible'); entered = false; stopHalo();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { halo.classList.remove('is-visible'); entered = false; stopHalo(); }
  });
})();
