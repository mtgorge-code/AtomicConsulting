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

  // Route flight path: plane travels the dotted line as the journey section scrolls
  var routeWrap = document.querySelector(".route-wrap");
  var routeSvg = routeWrap ? routeWrap.querySelector(".route-svg") : null;
  var routeTrack = routeWrap ? routeWrap.querySelector(".route-track") : null;
  var routeFlown = routeWrap ? routeWrap.querySelector(".route-flown") : null;
  var routePlane = routeWrap ? routeWrap.querySelector(".route-plane") : null;
  var routeMarkers = routeWrap ? Array.prototype.slice.call(routeWrap.querySelectorAll(".wp-marker")) : [];

  if (routeWrap && routeSvg && routeTrack && routeFlown && routePlane && routeMarkers.length > 1) {
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var flownLength = 0;
    var points = [];

    function computePath() {
      var wrapRect = routeWrap.getBoundingClientRect();
      points = routeMarkers.map(function (marker) {
        var r = marker.getBoundingClientRect();
        return {
          x: r.left - wrapRect.left,
          y: r.top - wrapRect.top + r.height / 2
        };
      });

      routeSvg.setAttribute("width", wrapRect.width);
      routeSvg.setAttribute("height", wrapRect.height);
      routeSvg.setAttribute("viewBox", "0 0 " + wrapRect.width + " " + wrapRect.height);

      var d = "M " + points.map(function (p) { return p.x + "," + p.y; }).join(" L ");
      routeTrack.setAttribute("d", d);
      routeFlown.setAttribute("d", d);
      flownLength = routeFlown.getTotalLength();

      if (reduceMotion) {
        routeFlown.style.strokeDasharray = flownLength;
        routeFlown.style.strokeDashoffset = 0;
        var parkedDistance = flownLength * 0.93;
        var parkedPoint = routeFlown.getPointAtLength(parkedDistance);
        var parkedLookahead = routeFlown.getPointAtLength(Math.max(0, parkedDistance - 1));
        positionPlane(parkedPoint, parkedLookahead);
        routePlane.classList.add("visible");
      }
    }

    function positionPlane(point, prevPoint) {
      var angle = 0;
      if (prevPoint) {
        angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x) * (180 / Math.PI);
      }
      routePlane.style.transform =
        "translate(" + point.x + "px," + point.y + "px) translate(-50%,-50%) rotate(" + (angle - 45) + "deg)";
    }

    function progress() {
      var rect = routeWrap.getBoundingClientRect();
      var vh = window.innerHeight;
      var t = (vh - rect.top) / (rect.height + vh);
      return Math.min(1, Math.max(0, t));
    }

    function updatePlane() {
      var t = progress();
      var dashoffset = flownLength * (1 - t);
      routeFlown.style.strokeDasharray = flownLength;
      routeFlown.style.strokeDashoffset = dashoffset;

      var distance = flownLength * t;
      var point = routeFlown.getPointAtLength(distance);
      var lookahead = routeFlown.getPointAtLength(Math.max(0, distance - 1));
      positionPlane(point, lookahead);

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

    var resizeTimer = null;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        computePath();
        if (!reduceMotion) updatePlane();
      }, 150);
    }

    computePath();
    if (!reduceMotion) {
      updatePlane();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    window.addEventListener("resize", onResize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        computePath();
        if (!reduceMotion) updatePlane();
      });
    }
  }
})();
