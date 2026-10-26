const redirected = new URLSearchParams(location.search).get('scenario') === 'redirected';
if (redirected) {
  const banner = document.querySelector('#scenario-banner');
  banner.hidden = false;
  banner.textContent = 'REPLACED QR SCENARIO · The payment recipient has been changed to Moonlight Collections — DEMO. Compare the merchant before continuing.';
}
document.querySelectorAll('[data-method]').forEach(button => button.addEventListener('click', () => {
  location.href = `checkout.html?method=${encodeURIComponent(button.dataset.method)}&scenario=${redirected ? 'redirected' : 'trusted'}`;
}));
document.querySelector('#copy-url').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText('https://kofi4me.github.io/moonbite/'); status.textContent = 'Demo URL copied.'; }
  catch { status.textContent = 'Select and copy the URL shown above.'; }
});
