/* =============================================
   MAIN.JS — Kaya Driving School
   Handles: GSAP Animations, Parallax, Slider,
   Mobile Menu, Header Scroll, Lucide Icons
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── Init Lucide Icons ──────────────────────────
  if (window.lucide) {
    lucide.createIcons();
  }

  // ── Footer Year ────────────────────────────────
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Header Scroll Effect ───────────────────────
  const header = document.getElementById('header');
  function updateHeader() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ── Mobile Menu ────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Scroll-to-Top Button ───────────────────────
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Parallax Scrolling ─────────────────────────
  const parallaxElements = [
    { el: document.getElementById('hero-parallax-bg'), speed: 0.4 },
    { el: document.getElementById('whyParallax'), speed: 0.35 },
    { el: document.getElementById('ctaParallax'), speed: 0.35 },
  ].filter(item => item.el);

  function handleParallax() {
    const scrollY = window.scrollY;
    parallaxElements.forEach(({ el, speed }) => {
      const rect = el.parentElement.getBoundingClientRect();
      const offsetY = (scrollY + rect.top) * speed;
      el.style.transform = `translateY(${offsetY * 0.35}px)`;
    });
  }

  window.addEventListener('scroll', handleParallax, { passive: true });
  handleParallax();

  // ── Mouse Parallax on Hero ─────────────────────
  const heroBgImg = document.getElementById('heroBgImg');
  const floatingIcons = document.querySelectorAll('.floating-icon');

  if (heroBgImg) {
    document.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      heroBgImg.style.transform = `translate(${dx * -15}px, ${dy * -10}px)`;

      floatingIcons.forEach((icon, i) => {
        const factor = (i + 1) * 5;
        icon.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
      });
    });
  }

  // ── GSAP Scroll Animations ─────────────────────
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Generic reveal-up animations
    gsap.utils.toArray('.gsap-reveal-up').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        }
      });
    });

    // Reveal from left
    gsap.utils.toArray('.gsap-reveal-left').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        }
      });
    });

    // Reveal from right
    gsap.utils.toArray('.gsap-reveal-right').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        }
      });
    });

    // Card reveals (staggered)
    const cardGroups = {};
    gsap.utils.toArray('.gsap-reveal-card').forEach(el => {
      const parentId = el.parentElement.id || el.parentElement.className;
      if (!cardGroups[parentId]) cardGroups[parentId] = [];
      cardGroups[parentId].push(el);
    });

    Object.values(cardGroups).forEach(group => {
      gsap.to(group, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: group[0],
          start: 'top 90%',
          once: true,
        }
      });
    });

    // Floating badges animation
    gsap.utils.toArray('.gsap-float').forEach(el => {
      gsap.to(el, {
        y: -12,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });

    gsap.utils.toArray('.gsap-float-delay').forEach(el => {
      gsap.to(el, {
        y: -10,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });
    });
  }

  // ── Hero Text Reveal (CSS-based) ───────────────
  const revealEls = document.querySelectorAll('.reveal-up');
  function checkHeroReveal() {
    revealEls.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('animated');
      }, i * 150 + 200);
    });
  }
  checkHeroReveal();

  // ── Testimonial Slider ─────────────────────────
  const slider = document.getElementById('testimonialSlider');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('sliderDots');

  if (slider && prevBtn && nextBtn) {
    const cards = slider.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    function getVisibleCount() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 900) return 2;
      return 3;
    }

    function getTotalSlides() {
      return Math.max(1, cards.length - getVisibleCount() + 1);
    }

    // Build dots
    function buildDots() {
      dotsContainer.innerHTML = '';
      const total = getTotalSlides();
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === currentIndex ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function goTo(index) {
      const total = getTotalSlides();
      currentIndex = Math.max(0, Math.min(index, total - 1));
      const cardWidth = cards[0].offsetWidth + 32; // gap: 2rem = 32px
      slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      updateDots();
    }

    prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
    nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

    // Auto-play
    let autoPlayInterval = setInterval(() => {
      const total = getTotalSlides();
      goTo((currentIndex + 1) % total);
    }, 5000);

    slider.parentElement.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    slider.parentElement.addEventListener('mouseleave', () => {
      autoPlayInterval = setInterval(() => {
        const total = getTotalSlides();
        goTo((currentIndex + 1) % total);
      }, 5000);
    });

    window.addEventListener('resize', () => {
      currentIndex = 0;
      buildDots();
      goTo(0);
    });

    buildDots();
    goTo(0);
  }

  // ── Active Nav Link Highlight ──────────────────
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ── Number Counter Animation ───────────────────
  function animateCounter(el) {
    const target = parseFloat(el.textContent.replace(/[^0-9.]/g, ''));
    const suffix = el.textContent.replace(/[0-9.]/g, '');
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target * 10) / 10;
      el.textContent = (current % 1 === 0 ? current : current.toFixed(0)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const statNumbers = document.querySelectorAll('.stat-number, .fb-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

});
