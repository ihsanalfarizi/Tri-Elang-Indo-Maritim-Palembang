window.Sections = window.Sections || {};
// Pembantu foto: mencoba beberapa ekstensi (jpg, jpeg, png, webp) sebelum memakai placeholder
if (!window.photoTag) {
  window.__nextExt = function (img) {
    var ex = img.getAttribute("data-exts").split(","), i = +img.getAttribute("data-i") + 1;
    if (i < ex.length) { img.setAttribute("data-i", i); img.src = img.getAttribute("data-base") + "." + ex[i]; }
    else { img.onerror = null; img.outerHTML = '<div class="ph" aria-hidden="true"></div>'; }
  };
  window.photoTag = function (path, alt) {
    if (!path) return '<div class="ph" aria-hidden="true"></div>';
    var m = path.match(/^(.*)\.(jpg|jpeg|png|webp)$/i), base = m ? m[1] : path;
    var ext = m ? m[2] : "jpg";
    var list = [ext, "jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG"].filter(function (e, k, a) { return a.indexOf(e) === k; });
    return '<img src="' + base + "." + list[0] + '" data-base="' + base + '" data-exts="' + list.join(",") + '" data-i="0" alt="' + (alt || "") + '" loading="lazy" onerror="__nextExt(this)">';
  };
}

window.Sections.highlights = {
  // Foto kartu (juga dipakai bagian Layanan). Ganti file di folder images/ (nama tetap sama),
  // atau isi highlights.photos di js/config.js dengan path lain.
  defaultPhotos: ["images/layanan-keagenan.jpg", "images/layanan-brokerage.jpg", "images/layanan-stevedoring.jpg"],

  // Keterangan singkat tiap kartu – ubah lewat highlights.descriptions di js/config.js
  defaultDescriptions: [
    "Dukungan operasional 24/7 untuk kapal bulker, tanker, dan tug/tongkang di pelabuhan.",
    "Tarif freight kompetitif, charter kapal, serta jual beli kapal (S&P).",
    "Penanganan muatan yang akurat dan tepat waktu di Jakarta, Kalimantan, dan Palembang."
  ],

  css: function () {
    if (document.getElementById("highlights-css")) return;
    var st = document.createElement("style");
    st.id = "highlights-css";
    st.textContent =
      ".highlights{background:var(--mist)}" +
      ".hl-head{max-width:700px;margin:0 auto 48px}" +
      ".hl-eyebrow{display:inline-flex;align-items:center;gap:12px;font:700 .8rem var(--font-head);letter-spacing:.18em;text-transform:uppercase;color:var(--river);margin-bottom:12px}" +
      ".hl-eyebrow::before,.hl-eyebrow::after{content:'';width:28px;height:3px;border-radius:2px;background:var(--buoy)}" +
      ".hl-head h2{font-size:clamp(1.9rem,3.6vw,2.7rem);margin-bottom:0}" +
      ".hl-head p{font-size:1.1rem;line-height:1.7;color:#3d5060;margin-top:14px}" +
      ".hlc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:26px;text-align:left}" +
      ".hlc{position:relative;display:flex;flex-direction:column;justify-content:flex-end;height:460px;border-radius:22px;overflow:hidden;text-decoration:none;color:#fff;background:#0a2540;box-shadow:0 12px 30px rgba(10,37,64,.16);transition:transform .35s,box-shadow .35s}" +
      ".hlc:hover{transform:translateY(-8px);box-shadow:0 22px 44px rgba(10,37,64,.28)}" +
      ".hlc img,.hlc .ph{position:absolute;inset:0;width:100%;height:100%;aspect-ratio:auto;object-fit:cover;border-radius:0;transition:transform .8s ease}" +
      ".hlc:hover img{transform:scale(1.08)}" +
      ".hlc::before{content:'';position:absolute;inset:0;z-index:1;background:linear-gradient(0deg,rgba(6,22,40,.95) 0%,rgba(6,22,40,.6) 42%,rgba(6,22,40,.05) 78%)}" +
      ".hlc-go{position:absolute;z-index:2;top:20px;right:20px;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--buoy);color:var(--navy);opacity:0;transform:translate(-8px,8px);transition:opacity .3s,transform .3s}" +
      ".hlc:hover .hlc-go{opacity:1;transform:none}" +
      ".hlc-body{position:relative;z-index:2;padding:30px}" +
      ".hlc-body h3{color:#fff;font-size:1.5rem;text-transform:uppercase;letter-spacing:.03em;line-height:1.25;padding-bottom:14px;margin-bottom:14px;position:relative}" +
      ".hlc-body h3::after{content:'';position:absolute;left:0;bottom:0;width:44px;height:4px;border-radius:2px;background:var(--buoy);transition:width .35s}" +
      ".hlc:hover h3::after{width:84px}" +
      ".hlc-body p{font-size:1.04rem;line-height:1.65;color:rgba(255,255,255,.92)}" +
      ".hlc-more{display:inline-flex;align-items:center;gap:8px;margin-top:16px;font:700 .92rem var(--font-head);color:var(--buoy);letter-spacing:.04em}" +
      ".hl-more{margin-top:48px}" +
      ".hlc{opacity:0;transform:translateY(26px)}" +
      ".hlc.in{opacity:1;transform:none;transition:opacity .7s ease,transform .7s ease,box-shadow .35s}" +
      ".hlc.in:hover{transform:translateY(-8px);transition:transform .35s,box-shadow .35s}" +
      "@media (max-width:820px){.hlc{height:380px}.hlc-body{padding:24px}}";
    document.head.appendChild(st);
  },

  render: function (C, I) {
    this.css();
    var H = C.highlights, photos = H.photos || this.defaultPhotos, descs = H.descriptions || this.defaultDescriptions;
    var arrow = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg>';
    var cards = H.items.map(function (it, i) {
      var title = typeof it === "string" ? it : it.title;
      return '<a class="hlc" href="#services">' + window.photoTag(photos[i], title) +
        '<span class="hlc-go">' + arrow + '</span>' +
        '<div class="hlc-body"><h3>' + title + '</h3>' +
        (descs[i] ? '<p>' + descs[i] + '</p>' : '') +
        '<span class="hlc-more">Selengkapnya &rarr;</span></div></a>';
    }).join("");
    return '<section class="section highlights" id="highlights"><div class="container">' +
      '<div class="hl-head"><span class="hl-eyebrow">' + (H.eyebrow || "Keahlian Kami") + '</span>' +
      '<h2>' + H.title + '</h2>' + (H.intro ? '<p>' + H.intro + '</p>' : '') + '</div>' +
      '<div class="hlc-grid">' + cards + '</div>' +
      '<div class="hl-more"><a class="btn btn-dark" href="#' + H.button.target + '">' + H.button.label + '</a></div>' +
      '</div></section>';
  },

  // Kartu muncul satu per satu saat terlihat di layar
  init: function () {
    var cards = [].slice.call(document.querySelectorAll("#highlights .hlc"));
    if (!cards.length) return;
    var show = function (el) { el.classList.add("in"); };
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            var k = cards.indexOf(e.target);
            setTimeout(function () { show(e.target); }, k * 130);
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.15 });
      cards.forEach(function (c) { io.observe(c); });
      setTimeout(function () { cards.forEach(show); }, 2500); // jaga-jaga
    } else {
      cards.forEach(show);
    }
  }
};