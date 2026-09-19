(function () {
  var params = new URLSearchParams(window.location.search);
  var name = params.get('name');
  if (name) { var field = document.getElementById('scheme-name'); if (field) { field.value = name; document.getElementById('scheme-context-note').classList.remove('hidden'); document.getElementById('scheme-id').value = params.get('scheme') || ''; } }
  var input = document.getElementById('ticket-input');
  var result = document.getElementById('ticket-result');
  var status = document.getElementById('ticket-status');
  var ticketScheme = document.getElementById('ticket-scheme');
  var ticketDepartment = document.getElementById('ticket-department');
  var ticketForm = document.getElementById('ticket-form');
  if (!input || !result) return;
  function track() { var value = input.value.trim(); if (!value) return; result.classList.remove('hidden'); status.textContent = value.includes('4409') ? 'Resolved / Payment Released' : 'In Department Review'; ticketScheme.textContent = value.includes('4409') ? 'Kisan Kalyan Yojana DBT second tranche delay' : 'MMVY engineering tuition disbursement delay'; ticketDepartment.textContent = value.includes('4409') ? 'Revenue & Agriculture Directorate, Gwalior' : 'Directorate of Technical Education, Bhopal'; }
  ticketForm.addEventListener('submit', function (event) { event.preventDefault(); track(); });
  document.querySelectorAll('[data-ticket]').forEach(function (button) { button.addEventListener('click', function () { input.value = button.dataset.ticket; track(); }); });
  track();
}());