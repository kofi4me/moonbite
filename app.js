const methods = {
  mtn: { name: 'MTN Mobile Money', account: '024 000 1234' },
  telecel: { name: 'Telecel Cash', account: '020 000 5678' },
  zelle: { name: 'Zelle', account: 'moonbite@example.invalid (fictional)' },
  card: { name: 'Visa / Mastercard', account: 'Preset demo card •••• 4242 — no card entry' }
};
const redirected = new URLSearchParams(location.search).get('scenario') === 'redirected';
const dialog = document.querySelector('#payment-dialog');
const content = document.querySelector('#dialog-content');
let selected;
if (redirected) {
  const banner = document.querySelector('#scenario-banner');
  banner.hidden = false;
  banner.textContent = 'REPLACED QR SCENARIO · The payment recipient has been changed to Moonlight Collections — DEMO. Compare the merchant before continuing.';
}
function openPayment(key) {
  selected = methods[key];
  content.replaceChildren();
  const label = document.createElement('p'); label.className = 'eyebrow'; label.textContent = 'TRAINING ONLY · NO REAL PAYMENTS';
  const title = document.createElement('h2'); title.id = 'dialog-title'; title.textContent = selected.name;
  const details = document.createElement('div'); details.className = 'dialog-details';
  const rows = [['Expected merchant', 'MoonBite Menu'], ['Selected recipient', redirected ? 'Moonlight Collections — DEMO' : 'MoonBite Menu (fictional)'], ['Recipient / account', redirected ? 'UNAUTHORIZED-DEMO (fictional)' : selected.account], ['Demo bill', 'GH₵ 185.00'], ['Order', 'MB-108 · Table 08']];
  rows.forEach(([name, value]) => { const row = document.createElement('p'); const small = document.createElement('span'); small.textContent = name; const strong = document.createElement('strong'); strong.textContent = value; row.append(small, strong); details.append(row); });
  const note = document.createElement('p'); note.className = redirected ? 'warning' : 'safe-note'; note.textContent = redirected ? 'Recipient mismatch: this is not MoonBite Menu. In a real checkout, stop and ask restaurant staff. This exercise will not send money.' : 'The recipient matches the expected fictional merchant. No money will move and no financial details are collected.';
  const confirm = document.createElement('button'); confirm.className = 'primary'; confirm.textContent = redirected ? 'Simulate outcome for training' : 'Confirm simulated payment'; confirm.addEventListener('click', confirmPayment);
  const cancel = document.createElement('button'); cancel.className = 'cancel'; cancel.textContent = 'Cancel and return'; cancel.addEventListener('click', () => dialog.close());
  content.append(label, title, details, note, confirm, cancel); dialog.showModal();
}
function confirmPayment() {
  content.innerHTML = '<p class="eyebrow">SIMULATION COMPLETE · NO MONEY SENT</p><div class="confirmation-icon" aria-hidden="true">✓</div><h2 id="dialog-title">Lesson completed.</h2>';
  const message = document.createElement('p'); message.textContent = redirected ? 'This simulated checkout selected Moonlight Collections — DEMO, an unauthorized recipient. A replaced QR code can divert a payment. Always verify the merchant with staff.' : `Your ${selected.name} simulation for MoonBite Menu is complete. In a real payment, verify the recipient before confirming.`;
  const notice = document.createElement('p'); notice.className = 'safe-note'; notice.textContent = 'GH₵ 185.00 demo amount · Actual amount charged: 0. No transaction was created.';
  const done = document.createElement('button'); done.className = 'primary'; done.textContent = 'Back to payment options'; done.addEventListener('click', () => dialog.close()); content.append(message, notice, done); done.focus();
}
document.querySelectorAll('[data-method]').forEach(button => button.addEventListener('click', () => openPayment(button.dataset.method)));
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
document.querySelector('#copy-url').addEventListener('click', async () => { const status = document.querySelector('#copy-status'); try { await navigator.clipboard.writeText('https://kofi4me.github.io/moonbite/'); status.textContent = 'Demo URL copied.'; } catch { status.textContent = 'Select and copy the URL shown above.'; } });
