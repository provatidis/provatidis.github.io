(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  try {
    const saved = localStorage.getItem('ap-theme');
    if (saved === 'dark' || saved === 'light') preference = saved;
  } catch { /* Theme controls also work when storage is unavailable. */ }
  function applyTheme(theme) {
    root.dataset.theme = theme;
    toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#17221c' : '#f7f7f2';
  }
  applyTheme(preference || (systemTheme.matches ? 'dark' : 'light'));
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(preference);
    try { localStorage.setItem('ap-theme', preference); } catch { /* Optional preference. */ }
  });
  systemTheme.addEventListener('change', event => {
    if (!preference) applyTheme(event.matches ? 'dark' : 'light');
  });
  document.getElementById('year').textContent = new Date().getFullYear();
})();

(() => {
  // Refresh the VVV watch card from the tracker's daily snapshot; the figures in the HTML stay if this fails.
  const amounts = document.getElementById('vvv-amounts');
  if (!amounts || !window.fetch) return;
  const day = /^\d{4}-\d{2}-\d{2}$/;
  const whole = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
  const label = (iso, withYear) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB',
    { timeZone: 'UTC', day: 'numeric', month: 'short', ...(withYear ? { year: 'numeric' } : {}) });
  function show(window90) {
    const { minted, burned, start, end } = window90 || {};
    if (!(Number.isFinite(minted) && minted > 0 && Number.isFinite(burned) && burned >= 0 && day.test(start) && day.test(end))) return;
    if (end < document.getElementById('vvv-end').dateTime) return;
    const largest = Math.max(minted, burned);
    document.getElementById('vvv-issued').textContent = whole.format(minted) + ' VVV';
    document.getElementById('vvv-burned').textContent = whole.format(burned) + ' VVV';
    document.getElementById('vvv-issued-row').style.setProperty('--bar-width', (100 * minted / largest).toFixed(3) + '%');
    document.getElementById('vvv-burned-row').style.setProperty('--bar-width', (100 * burned / largest).toFixed(3) + '%');
    const from = document.getElementById('vvv-start'), to = document.getElementById('vvv-end');
    from.dateTime = start;
    from.textContent = label(start, start.slice(0, 4) !== end.slice(0, 4));
    to.dateTime = end;
    to.textContent = label(end, true);
  }
  function load() {
    fetch(amounts.dataset.source)
      .then(response => response.ok ? response.json() : null)
      .then(snapshot => show(snapshot?.supply?.windows?.['90']))
      .catch(() => { /* Keep the published figures. */ });
  }
  if (!('IntersectionObserver' in window)) return load();
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); load(); }
  }, { rootMargin: '600px 0px' });
  observer.observe(amounts);
})();
