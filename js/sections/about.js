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

window.Sections.about = {
  // Foto/logo bagian "Tentang Kami". Ganti file di folder images/ (nama tetap sama),
  // atau isi about.photo di js/config.js dengan path lain.
  defaultPhoto: "images/tentang-kami.jpg",

  // Nilai bawaan – bisa ditimpa lewat about.eyebrow / about.points / about.stats di config.js
  defaults: {
    eyebrow: "Tentang Kami",
    points: ["Pengurusan bea cukai yang efisien", "Penanganan di pelabuhan", "Pengelolaan disbursement", "Pendampingan langsung saat bongkar muat"],
    pointsTitle: "Yang kami tangani"
  },

  css: function () {
    if (document.getElementById("about-css")) return;
    var st = document.createElement("style");
    st.id = "about-css";
    st.textContent =
      ".about-grid{align-items:center}" +
      ".about p{font-size:1.08rem;line-height:1.8;color:#16293a}" +
      ".about h2{font-size:clamp(1.9rem,3.4vw,2.6rem)}" +
      ".about-eyebrow{display:inline-flex;align-items:center;gap:12px;font:700 .8rem var(--font-head);letter-spacing:.18em;text-transform:uppercase;color:var(--river);margin-bottom:14px}" +
      ".about-eyebrow::before{content:'';width:32px;height:3px;border-radius:2px;background:var(--buoy)}" +
      ".about h2{margin-bottom:20px}" +
      ".about p.about-lead{font-size:1.28rem;line-height:1.7;font-weight:600;color:var(--navy);max-width:60ch;margin-bottom:18px}" +
      ".about-sub{font:700 1.05rem var(--font-head);color:var(--navy);margin:26px 0 12px}" +
      ".about-points{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:12px 20px;margin-bottom:26px}" +
      ".about-points li{display:flex;gap:10px;align-items:flex-start;font-size:1.05rem;font-weight:600;color:#16293a;line-height:1.5}" +
      ".about-points svg{flex:none;color:var(--river);margin-top:2px}" +
      ".about p.about-quote{font-size:1.3rem;line-height:1.5;border-left:4px solid var(--buoy);padding:6px 0 6px 18px;margin-top:6px!important}" +
      ".about-card{background:#fff;border-radius:16px;padding:32px;box-shadow:0 10px 30px rgba(10,37,64,.10)}" +
      ".about .about-card img{width:100%;height:auto;max-height:340px;aspect-ratio:auto;object-fit:contain;border-radius:0}" +
      ".about-stats{display:grid;grid-template-columns:repeat(3,1fr);margin-top:18px;border-radius:14px;overflow:hidden;background:var(--blue-grad);color:#fff;text-align:center}" +
      ".about-stat{padding:18px 8px}" +
      ".about-stat+.about-stat{border-left:1px solid rgba(255,255,255,.15)}" +
      ".about-stat strong{display:block;font:800 1.6rem var(--font-head);color:var(--buoy);line-height:1.2}" +
      ".about-stat span{font-size:.82rem;opacity:.9}" +
      ".about-vm{display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:64px}" +
      ".vm-card{background:#fff;border-radius:20px;padding:38px 36px;border-top:5px solid var(--buoy);box-shadow:0 12px 30px rgba(10,37,64,.12);transition:transform .3s}" +
      ".vm-card:hover{transform:translateY(-5px)}" +
      ".vm-ico{display:grid;place-items:center;width:58px;height:58px;border-radius:14px;background:var(--blue-grad);color:var(--buoy);margin-bottom:18px}" +
      ".about .vm-card h3{font-size:1.6rem;margin-bottom:12px}" +
      ".about .vm-card p{max-width:none;margin-bottom:0}" +
      "@media (max-width:820px){.about-points{grid-template-columns:1fr}.about-card{padding:20px}.about-vm{grid-template-columns:1fr;margin-top:44px}.vm-card{padding:28px 24px}}";
    document.head.appendChild(st);
  },

  // Visi & Misi – ubah teksnya lewat config.js -> about.vision / about.mission  ({ title, text })
  defaultVision: {
    title: "Visi Kami",
    text: "PT Trielang Indo Maritim (TIM) berkomitmen membantu pelanggan baru maupun lama kami (pemilik kapal, eksportir, dan importir) agar mampu bersaing di pasar global yang terus berkembang, dengan memfasilitasi rantai pasok yang berkelanjutan dan mengintegrasikan setiap langkah di sepanjang prosesnya."
  },
  defaultMission: {
    title: "Misi Kami",
    text: "Mengabdi kepada principal dan pemilik kapal dengan sepenuh hati, memastikan solusi yang cepat dan efektif untuk setiap persoalan yang muncul selama kunjungan kapal di seluruh pelabuhan Indonesia."
  },

  vm: function (a) {
    var V = a.vision || this.defaultVision, M = a.mission || this.defaultMission;
    var icon = function (p) { return '<span class="vm-ico"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg></span>'; };
    var eye = '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>';
    var flag = '<path d="M5 21V4M5 4h12l-2.5 4L17 12H5"/>';
    return '<div class="container about-vm">' +
      '<div class="vm-card">' + icon(eye) + '<h3>' + V.title + '</h3><p>' + V.text + '</p></div>' +
      '<div class="vm-card">' + icon(flag) + '<h3>' + M.title + '</h3><p>' + M.text + '</p></div>' +
      '</div>';
  },

  render: function (c, img) {
    this.css();
    var a = c.about, d = this.defaults;
    var src = a.photo || this.defaultPhoto;
    var photo = window.photoTag(src, c.company.name);

    var check = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 12.5l3 3 5-6"/></svg>';
    var points = (a.points || d.points).map(function (p) { return "<li>" + check + "<span>" + p + "</span></li>"; }).join("");
    var stats = (a.stats || []).map(function (s) { return '<div class="about-stat"><strong>' + s.v + "</strong><span>" + s.l + "</span></div>"; }).join("");
    var paras = a.paragraphs.map(function (p) { return "<p>" + p + "</p>"; }).join("");

    return '<section class="section about" id="about"><div class="container about-grid"><div>' +
      '<span class="about-eyebrow">' + (a.eyebrow || d.eyebrow) + '</span>' +
      '<h2>' + a.title + '</h2>' +
      (a.lead ? '<p class="about-lead">' + a.lead + '</p>' : '') +
      paras +
      '<h3 class="about-sub">' + (a.pointsTitle || d.pointsTitle) + '</h3><ul class="about-points">' + points + '</ul>' +
      '<p class="about-quote">' + a.quote + '</p></div>' +
      '<div class="about-media"><div class="about-card">' + photo + '</div>' + (stats ? '<div class="about-stats">' + stats + '</div>' : '') + '</div>' +
      '</div>' + this.vm(a) + '</section>';
  }
};