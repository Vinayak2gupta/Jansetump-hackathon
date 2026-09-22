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
  var downloadButton = document.getElementById('download-grievance');
  function createTicket() { return 'JS-' + String(Date.now()).slice(-8); }
  function grievanceData(ticket) {
    var form = new FormData(grievanceForm);
    return {
      ticket_id: ticket,
      full_name: form.get('full_name'),
      mobile: form.get('mobile'),
      email: form.get('email') || null,
      district: form.get('district') || null,
      scheme_id: form.get('scheme_id') || null,
      scheme_name: form.get('scheme_name') || null,
      issue_type: form.get('issue_type'),
      description: form.get('description'),
      consent: form.get('consent') || 'yes'
    };
  }
  function downloadGrievance() {
    if (!grievanceForm) return;
    var data = new FormData(grievanceForm);
    var lines = ['JanSetu grievance record', 'Created: ' + new Date().toISOString(), ''];
    data.forEach(function (value, key) { if (key !== 'bot-field' && key !== 'form-name') lines.push(key + ': ' + value); });
    lines.push('', 'This is an independent prototype record. Verify details and submit it through the relevant official channel.');
    var blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    var link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'jansetu-grievance-record.txt'; link.click(); window.setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000);
  }
  if (downloadButton) downloadButton.addEventListener('click', downloadGrievance);
  if (grievanceForm) grievanceForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    var ticket = createTicket();
    var online = false;
    var config = window.JANSETU_SUPABASE;
    if (config && config.url && config.publishableKey) {
      try {
        var response = await fetch(config.url + '/rest/v1/grievances', {
          method: 'POST',
          headers: { apikey: config.publishableKey, Authorization: 'Bearer ' + config.publishableKey, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
          body: JSON.stringify(grievanceData(ticket))
        });
        online = response.ok;
      } catch (error) { online = false; }
    }
    downloadGrievance();
    window.setTimeout(function () { window.location.href = 'thank-you.html?ticket=' + encodeURIComponent(ticket) + '&online=' + String(online); }, 150);
  });
  if (!input || !result) return;
  function track() { var value = input.value.trim(); if (!value) return; result.classList.remove('hidden'); status.textContent = value.includes('4409') ? 'Resolved / Payment Released' : 'In Department Review'; ticketScheme.textContent = value.includes('4409') ? 'Kisan Kalyan Yojana DBT second tranche delay' : 'MMVY engineering tuition disbursement delay'; ticketDepartment.textContent = value.includes('4409') ? 'Revenue & Agriculture Directorate, Gwalior' : 'Directorate of Technical Education, Bhopal'; }
  ticketForm.addEventListener('submit', function (event) { event.preventDefault(); track(); });
  document.querySelectorAll('[data-ticket]').forEach(function (button) { button.addEventListener('click', function () { input.value = button.dataset.ticket; track(); }); });
  track();
}());