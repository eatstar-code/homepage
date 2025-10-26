const themeToggleBtn = document.getElementById('theme-toggle-btn');
const langBtn = document.getElementById('lang-btn');
const langMenu = document.getElementById('lang-menu');
const body = document.body;
const appIcon = document.getElementById('app-icon');

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const dark = body.classList.contains('dark-mode');
    themeToggleBtn.innerHTML = dark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  });
}

if (langBtn) {
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langMenu.classList.toggle('show');
  });
}

document.querySelectorAll('.lang-item').forEach((i) => {
  i.addEventListener('click', (e) => {
    e.preventDefault();
    updateLanguage(i.dataset.lang);
    langMenu.classList.remove('show');
  });
});

window.addEventListener('click', (e) => {
  if (langBtn && !langBtn.contains(e.target) && langMenu) langMenu.classList.remove('show');
});

function updateLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-ko]').forEach((el) => {
    const val = el.getAttribute(`data-${lang}`) || el.getAttribute('data-en') || el.getAttribute('data-ko');
    if (val) el.textContent = val;
  });

  if (appIcon) {
    const iconSrc =
      appIcon.getAttribute(`data-${lang}-src`) ||
      appIcon.getAttribute('data-en-src') ||
      appIcon.getAttribute('data-ko-src');
    if (iconSrc) appIcon.src = iconSrc;
  }

  if (langBtn) langBtn.textContent = lang.toUpperCase();
  localStorage.setItem('language', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }

  const bl = (navigator.language || 'ko').toLowerCase();
  const lang =
    localStorage.getItem('language') ||
    (bl.startsWith('en') ? 'en' :
     bl.startsWith('ja') ? 'ja' :
     bl === 'zh-cn' || bl.includes('hans') ? 'zh-cn' :
     bl.startsWith('zh') ? 'zh-tw' : 'ko');

  updateLanguage(lang);
});
