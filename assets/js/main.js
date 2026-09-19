(function () {
  function updateThemeButton(button, isDark) {
    button.innerHTML = '<i data-lucide="' + (isDark ? 'sun' : 'moon') + '" class="h-4 w-4"></i><span class="sr-only">' + (isDark ? 'Switch to bright mode' : 'Switch to dark mode') + '</span>';
    button.setAttribute('aria-label', isDark ? 'Switch to bright mode' : 'Switch to dark mode');
    button.setAttribute('title', isDark ? 'Switch to bright mode' : 'Switch to dark mode');
    if (window.lucide) window.lucide.createIcons();
  }

  function init() {
    var savedTheme = localStorage.getItem('jansetu-theme');
    var isDark = savedTheme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);

    document.querySelectorAll('[data-lucide]').forEach(function () {
      if (window.lucide) window.lucide.createIcons();
    });

    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      updateThemeButton(themeToggle, isDark);
      themeToggle.addEventListener('click', function () {
        isDark = !document.body.classList.contains('dark-mode');
        document.body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('jansetu-theme', isDark ? 'dark' : 'light');
        updateThemeButton(themeToggle, isDark);
      });
    }

    var toggle = document.getElementById('mobile-nav-toggle');
    var menu = document.getElementById('mobile-nav');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        var isOpen = !menu.classList.contains('hidden');
        menu.classList.toggle('hidden', isOpen);
        toggle.setAttribute('aria-expanded', String(!isOpen));
      });
    }

    var current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function (link) {
      var target = link.getAttribute('href').split('/').pop() || 'index.html';
      if (target === current) link.setAttribute('aria-current', 'page');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());