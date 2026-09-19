(function () {
  var grid = document.getElementById('scheme-grid');
  if (!grid) return;
  var search = document.getElementById('search-input');
  var filters = document.getElementById('category-filters');
  var count = document.getElementById('results-count');
  var empty = document.getElementById('empty-state');
  var modal = document.getElementById('scheme-modal');
  var modalContent = document.getElementById('modal-content');
  var activeCategory = new URLSearchParams(window.location.search).get('category') || 'All';

  function renderFilters() {
    filters.innerHTML = CATEGORIES.map(function (category) {
      var active = category.toLowerCase() === activeCategory.toLowerCase();
      return '<button type="button" data-category="' + category + '" class="rounded-full border px-3 py-1.5 text-xs font-semibold ' + (active ? 'border-gov-800 bg-gov-800 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-gov-700') + '">' + category + '</button>';
    }).join('');
    filters.querySelectorAll('[data-category]').forEach(function (button) { button.addEventListener('click', function () { activeCategory = button.dataset.category; renderFilters(); render(); }); });
  }

  function render() {
    var query = search.value.toLowerCase().trim();
    var items = SCHEMES.filter(function (scheme) {
      var text = [scheme.name, scheme.category, scheme.department, scheme.benefit, scheme.summary, scheme.eligibility, scheme.tags.join(' ')].join(' ').toLowerCase();
      return (activeCategory === 'All' || scheme.category === activeCategory) && (!query || text.includes(query));
    });
    count.textContent = 'Showing ' + items.length + ' of ' + SCHEMES.length + ' schemes';
    grid.innerHTML = items.map(function (scheme) { return '<article class="scheme-card flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex-1"><span class="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">' + scheme.category + '</span><h2 class="mt-4 text-lg font-bold text-gov-900">' + scheme.name + '</h2><p class="mt-2 text-sm text-slate-600">' + scheme.summary + '</p><p class="mt-4 text-sm font-semibold text-gov-800">' + scheme.benefit + '</p><p class="mt-2 text-xs text-slate-500"><strong>Eligibility:</strong> ' + scheme.eligibility + '</p></div><div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><button type="button" data-id="' + scheme.id + '" class="text-sm font-semibold text-teal-700 hover:text-teal-800">View details</button><a class="inline-flex items-center gap-1 text-sm font-semibold text-gov-700" href="' + scheme.link + '" target="_blank" rel="noopener">Apply <i data-lucide="external-link" class="h-3.5 w-3.5"></i></a></div></article>'; }).join('');
    empty.classList.toggle('hidden', items.length > 0);
    grid.querySelectorAll('[data-id]').forEach(function (button) { button.addEventListener('click', function () { openDetails(button.dataset.id); }); });
    if (window.lucide) window.lucide.createIcons();
  }

  function openDetails(id) {
    var scheme = SCHEMES.find(function (item) { return item.id === id; });
    modalContent.innerHTML = '<span class="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">' + scheme.category + '</span><h2 id="modal-title" class="mt-4 text-2xl font-bold text-gov-900">' + scheme.name + '</h2><p class="mt-4 text-slate-600">' + scheme.summary + '</p><dl class="mt-6 space-y-3 text-sm"><div><dt class="font-semibold text-gov-900">Benefit</dt><dd class="text-slate-600">' + scheme.benefit + '</dd></div><div><dt class="font-semibold text-gov-900">Eligibility</dt><dd class="text-slate-600">' + scheme.eligibility + '</dd></div><div><dt class="font-semibold text-gov-900">Department</dt><dd class="text-slate-600">' + scheme.department + '</dd></div></dl><a href="/grievance.html?scheme=' + encodeURIComponent(scheme.id) + '&name=' + encodeURIComponent(scheme.name) + '" class="mt-7 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-700"><i data-lucide="shield-alert" class="h-4 w-4"></i> Report a delay</a>';
    modal.classList.remove('hidden'); modal.classList.add('flex'); if (window.lucide) window.lucide.createIcons();
  }
  function closeModal() { modal.classList.add('hidden'); modal.classList.remove('flex'); }
  search.addEventListener('input', render); modal.querySelectorAll('[data-close-modal]').forEach(function (item) { item.addEventListener('click', closeModal); });
  renderFilters(); render();
}());