window.Sections = window.Sections || {};
window.Sections.navbar = {
  render: function (C, I) {
    var logo = C.company.logo || "images/logo.jpg"; // logo diambil dari file images/logo.jpg
    var links = C.nav.map(function (n) {
      return '<a href="#' + n.id + '">' + n.label + '</a>';
    }).join("");
    return '<header class="navbar" id="navbar"><div class="navbar-in">' +
      '<a class="brand" href="#hero"><img class="brand-logo" src="' + logo + '" alt="' + C.company.name + ' logo">' +
      '<span class="brand-url">' + (C.company.brand || C.company.name) + '</span></a>' +
      '<button class="nav-toggle" aria-label="Menu" aria-expanded="false">&#9776;</button>' +
      '<nav class="nav-links" id="navLinks">' + links + '</nav></div></header>';
  },
  init: function () {
    var bar = document.getElementById("navbar");
    var toggle = bar.querySelector(".nav-toggle");
    var links = document.getElementById("navLinks");
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
    links.addEventListener("click", function () { links.classList.remove("open"); });
    function onScroll() { bar.classList.toggle("scrolled", window.scrollY > 60); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // highlight link of the active section
    var anchors = [].slice.call(links.querySelectorAll("a"));
    function spy() {
      var y = window.scrollY + 120, cur = anchors[0];
      anchors.forEach(function (a) {
        var el = document.getElementById(a.getAttribute("href").slice(1));
        if (el && el.offsetTop <= y) cur = a;
      });
      anchors.forEach(function (a) { a.classList.toggle("active", a === cur); });
    }
    spy();
    window.addEventListener("scroll", spy, { passive: true });
  }
};