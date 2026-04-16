(function () {
  'use strict';

  var header = document.getElementById('header-placeholder');
  var footer = document.getElementById('footer-placeholder');
  if (!header && !footer) return;

  var base = document.documentElement.getAttribute('data-base') || '';

  // Detect Chinese pages by lang attribute or URL path
  var isZh = document.documentElement.lang === 'zh-CN'
          || document.documentElement.lang === 'zh-Hans'
          || /\/(zh|waymark-zh|global-intelligence-zh)(\/|$)/.test(window.location.pathname);

  var headerFile = isZh ? '/components/header-zh.html' : '/components/header.html';
  var footerFile = isZh ? '/components/footer-zh.html' : '/components/footer.html';

  function inject(el, path) {
    if (!el) return Promise.resolve();
    return fetch(base + path)
      .then(function (r) { return r.text(); })
      .then(function (html) { el.innerHTML = html; });
  }

  Promise.all([
    inject(header, headerFile),
    inject(footer, footerFile)
  ]).then(function () {
    // Highlight active nav link
    var path = window.location.pathname;
    var links = document.querySelectorAll('.nav__links a, .nav__mobile-menu a');
    links.forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href) return;
      if (href === '/' && path === '/') {
        a.classList.add('active');
      } else if (href !== '/' && href.indexOf('#') === -1 && path.indexOf(href) === 0) {
        a.classList.add('active');
      }
    });

    // Initialize scroll-driven inset effect after footer is injected
    initSectionInset();
  });
})();

/* ── Scroll-driven section inset effect ──
   Every full-width section smoothly gains side margins and rounded
   corners based on its own viewport position. When a section is
   centred in view it sits edge-to-edge; as it scrolls away from
   centre it becomes a card with padding that aligns with the
   solution banners. */
(function () {
  'use strict';

  function initSectionInset() {
    // Collect every full-width section + hero + footer on the homepage
    var targets = Array.prototype.slice.call(
      document.querySelectorAll('.hero, .section, #footer-placeholder')
    );

    // Exclude the solutions section itself — its banners have their own padding
    targets = targets.filter(function (el) {
      return el.id !== 'solutions';
    });

    if (targets.length === 0) return;

    targets.forEach(function (t) {
      if (window.innerWidth > 768) {
        t.style.overflow = 'hidden';
      }
    });

    var ticking = false;

    function isMobile() {
      return window.innerWidth <= 768;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    function update() {
      ticking = false;

      if (isMobile()) {
        targets.forEach(function (t) {
          t.style.marginLeft = '0px';
          t.style.marginRight = '0px';
          t.style.borderRadius = '0px';
          t.style.overflow = '';
        });
        return;
      }

      targets.forEach(function (t) {
        t.style.overflow = 'hidden';
      });

      var vh = window.innerHeight;
      var maxInset = Math.max(16, Math.min(window.innerWidth * 0.03, 48));
      var maxRadius = 32;

      targets.forEach(function (t) {
        var rect = t.getBoundingClientRect();

        // Centre of the element relative to viewport centre
        var elCentre = rect.top + rect.height / 2;
        var vpCentre = vh / 2;

        // Distance from viewport centre, normalised 0→1
        // 0 = element centred in viewport (full-width)
        // 1 = element is off-screen or at viewport edge (max inset)
        var dist = Math.abs(elCentre - vpCentre) / (vh * 0.8);
        var raw = Math.max(0, Math.min(1, dist));

        // smoothstep easing
        var progress = raw * raw * (3 - 2 * raw);

        var inset = progress * maxInset;
        var radius = progress * maxRadius;

        t.style.marginLeft = inset + 'px';
        t.style.marginRight = inset + 'px';
        t.style.borderRadius = radius + 'px';
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  window.initSectionInset = initSectionInset;
})();
