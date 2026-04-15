(function () {
  'use strict';

  var header = document.getElementById('header-placeholder');
  var footer = document.getElementById('footer-placeholder');
  if (!header && !footer) return;

  var base = document.documentElement.getAttribute('data-base') || '';

  function inject(el, path) {
    if (!el) return Promise.resolve();
    return fetch(base + path)
      .then(function (r) { return r.text(); })
      .then(function (html) { el.innerHTML = html; });
  }

  Promise.all([
    inject(header, '/components/header.html'),
    inject(footer, '/components/footer.html')
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
   Full-width sections near #solutions smoothly gain side margins
   and rounded corners as the user scrolls to the solutions area,
   aligning their edges with the solution banners' padding. */
(function () {
  'use strict';

  function initSectionInset() {
    var solutions = document.getElementById('solutions');
    if (!solutions) return;

    var targets = [];

    // Collect full-width sections above solutions (up to 3)
    var el = solutions.previousElementSibling;
    var count = 0;
    while (el && count < 3) {
      if (el.classList && el.classList.contains('section')) {
        targets.push(el);
        count++;
      }
      el = el.previousElementSibling;
    }

    // Collect footer placeholder below solutions
    var footerEl = document.getElementById('footer-placeholder');
    if (footerEl) targets.push(footerEl);

    if (targets.length === 0) return;

    // Prepare elements for animation
    targets.forEach(function (t) {
      t.style.overflow = 'hidden';
    });

    var ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    function update() {
      ticking = false;

      var rect = solutions.getBoundingClientRect();
      var vh = window.innerHeight;

      // progress: 0 when solutions top is at viewport bottom
      //           1 when solutions top reaches viewport top
      var raw = 1 - Math.max(0, Math.min(1, rect.top / vh));

      // smoothstep easing for a polished, organic feel
      var progress = raw * raw * (3 - 2 * raw);

      // Target inset matches solution-banners padding: clamp(16px, 3vw, 48px)
      var maxInset = Math.max(16, Math.min(window.innerWidth * 0.03, 48));
      var maxRadius = 32;

      var inset = progress * maxInset;
      var radius = progress * maxRadius;

      targets.forEach(function (t) {
        t.style.marginLeft = inset + 'px';
        t.style.marginRight = inset + 'px';
        t.style.borderRadius = radius + 'px';
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  // Expose for the layout injection callback above
  window.initSectionInset = initSectionInset;
})();
