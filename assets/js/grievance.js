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
  var grievanceForm = document.getElementById('grievance-form');
  if (grievanceForm) grievanceForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var data = Object.fromEntries(new FormData(grievanceForm).entries());
    var ticket = 'JS-' + String(Date.now()).slice(-8);
    data.ticket = ticket;
    data.created = new Date().toISOString();
    localStorage.setItem('jansetu-grievance-' + ticket, JSON.stringify(data));
    var lines = ['JanSetu grievance record', 'Ticket: ' + ticket, 'Created: ' + data.created, '', 'Name: ' + data.full_name, 'Mobile: ' + data.mobile, 'Email: ' + (data.email || 'Not provided'), 'District: ' + (data.district || 'Not provided'), 'Scheme: ' + (data.scheme_name || 'Not provided'), 'Issue: ' + data.issue_type, '', 'Description:', data.description, '', 'This is a citizen-prepared record from an independent prototype. Verify details and submit it through the relevant official channel.'];
    var blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    var link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'jansetu-grievance-' + ticket + '.txt'; link.click(); URL.revokeObjectURL(link.href);
    window.location.href = 'thank-you.html?ticket=' + encodeURIComponent(ticket);
  });
  if (!input || !result) return;
  function track() { var value = input.value.trim(); if (!value) return; result.classList.remove('hidden'); status.textContent = value.includes('4409') ? 'Resolved / Payment Released' : 'In Department Review'; ticketScheme.textContent = value.includes('4409') ? 'Kisan Kalyan Yojana DBT second tranche delay' : 'MMVY engineering tuition disbursement delay'; ticketDepartment.textContent = value.includes('4409') ? 'Revenue & Agriculture Directorate, Gwalior' : 'Directorate of Technical Education, Bhopal'; }
  ticketForm.addEventListener('submit', function (event) { event.preventDefault(); track(); });
  document.querySelectorAll('[data-ticket]').forEach(function (button) { button.addEventListener('click', function () { input.value = button.dataset.ticket; track(); }); });
  track();
}());