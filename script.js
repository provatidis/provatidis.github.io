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
