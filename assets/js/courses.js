(function () {
  var grid = document.getElementById('course-grid');
  if (!grid) return;
  var search = document.getElementById('course-search');
  var filters = document.getElementById('course-filters');
  var count = document.getElementById('course-count');
  var empty = document.getElementById('course-empty');
  var activeCategory = 'All';

  function renderFilters() {
    filters.innerHTML = COURSE_CATEGORIES.map(function (category) {
      var active = category === activeCategory;
      return '<button type="button" data-category="' + category + '" class="rounded-full border px-3 py-1.5 text-xs font-semibold ' + (active ? 'border-gov-800 bg-gov-800 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-gov-700') + '">' + category + '</button>';
    }).join('');
    filters.querySelectorAll('[data-category]').forEach(function (button) {
      button.addEventListener('click', function () { activeCategory = button.dataset.category; renderFilters(); render(); });
    });
  }

  function render() {
    var query = search.value.toLowerCase().trim();
    var items = COURSES.filter(function (course) {
      var text = [course.title, course.provider, course.category, course.level, course.summary].join(' ').toLowerCase();
      return (activeCategory === 'All' || course.category === activeCategory) && (!query || text.includes(query));
    });
    count.textContent = 'Showing ' + items.length + ' of ' + COURSES.length + ' learning resources';
    grid.innerHTML = items.map(function (course) {
      return '<article class="scheme-card flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex-1"><span class="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">' + course.category + '</span><h2 class="mt-4 text-lg font-bold text-gov-900">' + course.title + '</h2><p class="mt-2 text-sm font-medium text-slate-500">' + course.provider + '</p><p class="mt-3 text-sm text-slate-600">' + course.summary + '</p><p class="mt-4 text-xs font-semibold text-gov-700">Level: ' + course.level + '</p></div><div class="mt-5 border-t border-slate-100 pt-4"><a class="inline-flex items-center gap-2 rounded-lg bg-gov-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gov-700" href="' + course.link + '" target="_blank" rel="noopener">Find courses <i data-lucide="external-link" class="h-3.5 w-3.5"></i></a></div></article>';
    }).join('');
    empty.classList.toggle('hidden', items.length > 0);
    if (window.lucide) window.lucide.createIcons();
  }

  search.addEventListener('input', render);
  renderFilters();
  render();
}());
