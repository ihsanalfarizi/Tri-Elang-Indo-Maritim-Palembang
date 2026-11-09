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

    // Tandai menu yang sedang dipilih:
    // - link "#id"      -> section yang sedang terlihat di halaman ini
    // - link "halaman"  -> halaman yang sedang dibuka (mode multi-halaman)
    // Style menu aktif dipasang dari sini, jadi tidak bergantung pada versi style.css
    var st = document.createElement("style");
    st.textContent =
      ".nav-links a{position:relative}" +
      ".nav-links a.active{color:#f2b705!important;font-weight:600!important;opacity:1!important}" +
      ".nav-links a.active::after{content:'';position:absolute;left:0;right:0;bottom:-8px;height:3px;border-radius:2px;background:#f2b705}" +
      "@media (max-width:820px){.nav-links a.active::after{display:none}}";
    document.head.appendChild(st);

    var anchors = [].slice.call(links.querySelectorAll("a"));
    var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    var lock = 0; // jeda spy saat scroll halus setelah klik

    function setActive(cur) {
      anchors.forEach(function (a) { a.classList.toggle("active", a === cur); });
    }
    function target(a) {
      var h = a.getAttribute("href") || "";
      return h.charAt(0) === "#" ? document.getElementById(h.slice(1)) : null;
    }
    function spy() {
      if (Date.now() < lock) return;
      var y = window.scrollY + 120, cur = null;
      anchors.forEach(function (a) {
        var h = (a.getAttribute("href") || "").toLowerCase(), el = target(a);
        if (el && el.offsetTop <= y) cur = a;
        else if (h.charAt(0) !== "#" && h === file) cur = a;
      });
      setActive(cur);
    }
    // Tampil langsung saat halaman dibuka: jika hanya ada satu section menu di halaman ini
    // (mis. halaman EPDA), menu itu langsung aktif tanpa perlu scroll.
    function initial() {
      var present = anchors.filter(function (a) { return target(a); });
      if (present.length === 1) setActive(present[0]);
      else spy();
    }
    initial();
    window.addEventListener("load", initial);
    window.addEventListener("scroll", spy, { passive: true });
    window.addEventListener("hashchange", function () { lock = 0; spy(); });

    // Saat menu diklik, langsung aktif (tidak menunggu scroll selesai)
    anchors.forEach(function (a) {
      a.addEventListener("click", function () {
        if ((a.getAttribute("href") || "").charAt(0) === "#") {
          setActive(a);
          lock = Date.now() + 900;
        }
      });
    });
  }
};