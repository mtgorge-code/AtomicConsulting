(function () {
  "use strict";

  // Mobile nav toggle
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Cookie consent (PIPEDA)
  var COOKIE_KEY = "axiom-cookie-consent";
  var cookieBar = document.getElementById("cookie-bar");
  var acceptBtn = document.getElementById("cookie-accept");
  var necessaryBtn = document.getElementById("cookie-necessary");

  function hasConsent() {
    try {
      return localStorage.getItem(COOKIE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(COOKIE_KEY, value);
    } catch (e) {
      /* localStorage unavailable; consent choice won't persist */
    }
  }

  if (cookieBar) {
    if (!hasConsent()) {
      cookieBar.classList.add("visible");
    }
    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        setConsent("all");
        cookieBar.classList.remove("visible");
      });
    }
    if (necessaryBtn) {
      necessaryBtn.addEventListener("click", function () {
        setConsent("necessary");
        cookieBar.classList.remove("visible");
      });
    }
  }
})();
