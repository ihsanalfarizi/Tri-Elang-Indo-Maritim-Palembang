(function () {
  var app = document.getElementById("app");
  var C = window.CONFIG, I = window.IMAGES || {}, S = window.Sections;

  // Ikon tab browser (favicon) = images/logo.jpg
  var icon = C.company.logo || "images/logo.jpg";
  [].slice.call(document.querySelectorAll('link[rel~="icon"]')).forEach(function (l) { l.parentNode.removeChild(l); });
  var l = document.createElement("link");
  l.rel = "icon"; l.type = "image/jpeg"; l.href = icon;
  document.head.appendChild(l);

  // Nomor di atas kartu "Layanan Perusahaan Kami" disembunyikan
  var hide = document.createElement("style");
  hide.textContent = ".hlc-num{display:none!important}";
  document.head.appendChild(hide);

  // Tiap halaman menentukan section-nya lewat window.PAGE_SECTIONS.
  // Jika tidak ada, pakai CONFIG.sectionOrder (satu halaman penuh seperti sebelumnya).
  var order = window.PAGE_SECTIONS || C.sectionOrder;

  order.forEach(function (name) {
    var s = S[name]; if (!s) return;
    var wrap = document.createElement("div");
    wrap.innerHTML = s.render(C, I);
    while (wrap.firstChild) app.appendChild(wrap.firstChild);
  });
  order.forEach(function (name) { var s = S[name]; if (s && s.init) s.init(C, I); });

  // ===== Halaman tanpa hero: navbar langsung biru (tidak bergantung pada CSS/HTML lain) =====
  if (!document.getElementById("hero")) {
    document.body.classList.add("subpage");
    var st = document.createElement("style");
    st.textContent =
      ".subpage .navbar{background:var(--blue-grad)!important;box-shadow:0 2px 12px rgba(0,0,0,.25)!important}" +
      ".subpage #app{min-height:100vh;display:flex;flex-direction:column}" +
      ".subpage #app>section:first-of-type{margin-top:68px;flex:1 0 auto}" +
      ".subpage #app>.footer{margin-top:auto}";
    document.head.appendChild(st);
  }

  // ===== Multi-halaman: ubah link anchor (#id) menjadi link ke halaman =====
  var PAGES = {
    hero: "index.html", highlights: "index.html", tagline: "index.html",
    about: "tentang.html", services: "layanan.html",
    products: "epda.html", contact: "kontak.html"
  };
  var current = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  [].slice.call(document.querySelectorAll('a[href^="#"]')).forEach(function (a) {
    var id = a.getAttribute("href").slice(1);
    if (!id || document.getElementById(id)) return;   // masih satu halaman -> biarkan
    if (PAGES[id]) a.setAttribute("href", PAGES[id]);
  });

  // Tandai menu aktif sesuai halaman
  [].slice.call(document.querySelectorAll(".nav-links a")).forEach(function (a) {
    var h = (a.getAttribute("href") || "").toLowerCase();
    a.classList.toggle("active", h === current || (current === "" && h === "index.html"));
  });
})();