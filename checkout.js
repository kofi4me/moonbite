const methods = {
  mtn: {name:'MTN Mobile Money', account:'024 000 1234', preset:'DEMO-MOMO-001'},
  telecel: {name:'Telecel Cash', account:'020 000 5678', preset:'DEMO-TELECEL-001'},
  zelle: {name:'Zelle', account:'moonbite@example.invalid', preset:'demo-participant@example.invalid'},
  card: {name:'Visa / Mastercard', account:'MoonBite Menu · fictional card merchant', preset:'Preset demo card •••• 4242'}
};
const params = new URLSearchParams(location.search);
const method = Object.hasOwn(methods, params.get('method')) ? methods[params.get('method')] : methods.mtn;
const redirected = params.get('scenario') === 'redirected';
if (params.get('method') === 'card') {
  document.body.classList.add('card-checkout');
  document.querySelector('#card-preview').hidden = false;
  document.querySelector('button[type=submit]').textContent = 'Pay Now — Training Only';
}
document.querySelector('#method-title').textContent = method.name;
document.querySelector('#recipient').textContent = redirected ? 'Moonlight Collections — DEMO' : 'MoonBite Menu (fictional)';
document.querySelector('#account').textContent = redirected ? 'UNAUTHORIZED-DEMO (fictional)' : method.account;
document.querySelector('#preset-account').textContent = params.get('method') === 'card' ? 'Preset training card •••• 4242' : 'Training mode · No payment account is needed';
const notice = document.querySelector('#recipient-notice');
notice.textContent = redirected ? 'Recipient mismatch: this is not MoonBite Menu. In a real checkout, stop and ask restaurant staff. Continue only to explore the training outcome.' : 'The recipient matches the expected fictional merchant.';
if (redirected) notice.className = 'warning';
document.querySelector('#demo-form').addEventListener('submit', event => {
  event.preventDefault();
  const nickname = document.querySelector('#nickname').value.trim();
  if (!nickname) { document.querySelector('#nickname').setCustomValidity('Enter a fictional nickname.'); document.querySelector('#nickname').reportValidity(); return; }
  document.querySelector('#confirmation-message').textContent = `${nickname}, your ${method.name} exercise for ${document.querySelector('#table').value} is complete. Entered amount: GH₵ ${Number(document.querySelector('#amount').value).toFixed(2)}. Training reference: ${document.querySelector('#reference').value.trim()}.`;
  document.querySelector('#confirmation-lesson').textContent = redirected ? 'This exercise selected an unauthorized recipient. A replaced QR code can redirect a payment. Always verify the merchant with staff before paying.' : 'You checked the expected merchant. Always confirm the recipient before authorizing a real payment.';
  event.target.reset(); event.target.hidden = true;
  const confirmation = document.querySelector('#confirmation'); confirmation.hidden = false; confirmation.focus();
});
document.querySelector('#nickname').addEventListener('input', event => event.target.setCustomValidity(''));


