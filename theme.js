/** Purpose: Apply and remember the visitor's preferred color theme.
 * Input: An optional saved theme; otherwise the system color preference.
 * Output: Theme attributes and an accessible, synchronized toggle button.
 */
(() => {
  let savedTheme;
  try { savedTheme = localStorage.getItem('personal-site-theme'); } catch { /* Storage can be unavailable in private browsers. */ }
  const initialTheme = ['light', 'dark'].includes(savedTheme)
    ? savedTheme
    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = initialTheme;

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('theme-toggle');
    /** Purpose: Keep theme and accessibility labels consistent.
     * Input: The next theme, either light or dark.
     * Output: Updated document theme and toggle state.
     */
    function applyTheme(theme) {
      document.documentElement.dataset.theme = theme;
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }
    applyTheme(initialTheme);
    button.addEventListener('click', () => {
      const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(theme);
      try { localStorage.setItem('personal-site-theme', theme); } catch { /* The toggle still works without persistence. */ }
    });
  });
})();
