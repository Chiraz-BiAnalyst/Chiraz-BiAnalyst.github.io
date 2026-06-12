/* Shared i18n engine for project detail pages.
   Each page defines window.PAGE_TRANSLATIONS = { en:{...}, fr:{...}, ar:{...} }
   before loading this file. Language preference is shared with the home page
   via localStorage 'preferredLang'. */
(function () {
  var translations = window.PAGE_TRANSLATIONS || {};

  function setLanguage(lang) {
    if (!translations[lang]) lang = 'en';
    var html = document.documentElement;
    if (lang === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar');
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', lang);
    }

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key] != null) {
        el.textContent = translations[lang][key];
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (translations[lang] && translations[lang][key] != null) {
        el.innerHTML = translations[lang][key];
      }
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    localStorage.setItem('preferredLang', lang);
  }

  window.setLanguage = setLanguage;

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { setLanguage(btn.dataset.lang); });
  });

  var saved = localStorage.getItem('preferredLang');
  setLanguage(saved && translations[saved] ? saved : 'en');
})();
