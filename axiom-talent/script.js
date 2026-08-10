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

  // Route flight path: plane travels a straight line as the journey section scrolls
  var routeWrap = document.querySelector(".route-wrap");
  var routeFlown = routeWrap ? routeWrap.querySelector(".route-flown") : null;
  var routePlane = routeWrap ? routeWrap.querySelector(".route-plane") : null;

  if (routeWrap && routeFlown && routePlane) {
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function progress() {
      var rect = routeWrap.getBoundingClientRect();
      var vh = window.innerHeight;
      var t = (vh - rect.top) / (rect.height + vh);
      return Math.min(1, Math.max(0, t));
    }

    function render(t) {
      var pct = t * 100;
      routeFlown.style.width = pct + "%";
      routePlane.style.left = pct + "%";
    }

    function updatePlane() {
      var t = progress();
      render(t);
      routePlane.classList.toggle("visible", t > 0.01 && t < 0.995);
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        updatePlane();
        ticking = false;
      });
    }

    if (reduceMotion) {
      render(0.93);
      routePlane.classList.add("visible");
    } else {
      updatePlane();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }
  }
})();
