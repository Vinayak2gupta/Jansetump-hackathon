(function () {
  var base = document.querySelector('base');
  var prefix = base ? base.getAttribute('href') || '/' : '/';
  function normalize() {
    document.querySelectorAll('a[href^="/"]').forEach(function (link) {
      link.setAttribute('href', prefix + link.getAttribute('href').slice(1));
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', normalize);
  else normalize();
}());
