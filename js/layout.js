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
      } else if (href !== '/' && path.indexOf(href.replace(/\.html$/, '')) === 0) {
        a.classList.add('active');
      }
    });
  });
})();
