(function () {
  var form = document.getElementById('eligibility-form');
  if (!form) return;
  var input = document.getElementById('description');
  document.querySelectorAll('[data-example]').forEach(function (button) { button.addEventListener('click', function () { input.value = button.dataset.text; input.focus(); }); });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var text = input.value.toLowerCase();
    var matches = SCHEMES.map(function (scheme) { return { scheme: scheme, score: scheme.tags.reduce(function (score, tag) { var synonyms = TAG_SYNONYMS[tag] || [tag]; return score + (synonyms.some(function (word) { return text.includes(word); }) ? 1 : 0); }, 0) }; }).filter(function (item) { return item.score > 0; }).sort(function (a, b) { return b.score - a.score; }).slice(0, 5);
    document.getElementById('results-section').classList.toggle('hidden', matches.length === 0); document.getElementById('no-match').classList.toggle('hidden', matches.length > 0);
    document.getElementById('results-heading').textContent = matches.length + ' possible match' + (matches.length === 1 ? '' : 'es') + ' found';
    document.getElementById('results-list').innerHTML = matches.map(function (item) { var scheme = item.scheme; return '<article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex items-start justify-between gap-4"><div><span class="text-xs font-semibold text-teal-700">' + scheme.category + '</span><h3 class="mt-1 font-bold text-gov-900">' + scheme.name + '</h3></div><span class="rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">' + item.score + ' signals</span></div><p class="mt-2 text-sm text-slate-600">' + scheme.summary + '</p><a href="/grievance.html?scheme=' + encodeURIComponent(scheme.id) + '&name=' + encodeURIComponent(scheme.name) + '" class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-700">Report a delay <i data-lucide="arrow-right" class="h-4 w-4"></i></a></article>'; }).join('');
    if (window.lucide) window.lucide.createIcons();
  });
}());