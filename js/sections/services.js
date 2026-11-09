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

window.Sections.services = {
  // Foto layanan memakai foto yang SAMA dengan kartu "Layanan Perusahaan Kami"
  // (diatur di js/sections/highlights.js atau C.highlights.photos).
  photos: function (C) {
    var H = window.Sections.highlights || {};
    return (C.highlights && C.highlights.photos) || H.defaultPhotos || ["images/layanan-keagenan.jpg", "images/layanan-brokerage.jpg", "images/layanan-stevedoring.jpg"];
  },

  cssCards: function () {
    if (document.getElementById("services-css")) return;
    var st = document.createElement("style");
    st.id = "services-css";
    st.textContent =
      ".services{background:var(--mist)}" +
      ".svc-head{text-align:center;max-width:720px;margin:0 auto 52px}" +
      ".svc-eyebrow{display:inline-flex;align-items:center;gap:12px;font:700 .8rem var(--font-head);letter-spacing:.18em;text-transform:uppercase;color:var(--river);margin-bottom:12px}" +
      ".svc-eyebrow::before,.svc-eyebrow::after{content:'';width:28px;height:3px;border-radius:2px;background:var(--buoy)}" +
      ".svc-head h2{font-size:clamp(1.9rem,3.6vw,2.7rem);margin-bottom:14px}" +
      ".svc-head p{font-size:1.1rem;color:#3d5060;line-height:1.7}" +
      ".svc-card{display:grid;grid-template-columns:1fr 1.15fr;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 10px 32px rgba(10,37,64,.10);margin-bottom:36px;transition:transform .25s,box-shadow .25s}" +
      ".svc-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(10,37,64,.16)}" +
      ".svc-card.rev .svc-img{order:2}" +
      ".svc-img{position:relative;min-height:340px}" +
      ".svc-img img,.svc-img .ph{position:absolute;inset:0;width:100%;height:100%;aspect-ratio:auto;object-fit:cover;border-radius:0}" +
      ".svc-num{position:absolute;top:18px;left:18px;z-index:1;min-width:52px;text-align:center;padding:8px 14px;border-radius:10px;background:var(--blue-grad);color:var(--buoy);font:800 1.15rem var(--font-head);box-shadow:0 4px 14px rgba(0,0,0,.3)}" +
      ".svc-card.rev .svc-num{left:auto;right:18px}" +
      ".svc-body{padding:44px 44px;display:flex;flex-direction:column;justify-content:center}" +
      ".svc-body h3{font-size:1.7rem;text-transform:uppercase;letter-spacing:.03em;margin-bottom:22px;padding-bottom:16px;position:relative}" +
      ".svc-body h3::after{content:'';position:absolute;left:0;bottom:0;width:56px;height:4px;border-radius:2px;background:var(--buoy)}" +
      ".svc-lead{font-size:1.2rem;line-height:1.65;font-weight:600;color:var(--navy);margin-bottom:14px}" +
      ".svc-rest{font-size:1.06rem;line-height:1.8;color:#16293a}" +
      ".services .other{background:var(--blue-grad);color:#fff;border-radius:20px;padding:48px;margin-top:20px}" +
      ".services .other h3{color:#fff;font-size:1.7rem;margin-bottom:14px}" +
      ".services .other p{font-size:1.08rem;line-height:1.8;color:rgba(255,255,255,.92);max-width:80ch;margin-bottom:30px}" +
      ".services .other h4{font:700 .85rem var(--font-head);letter-spacing:.16em;text-transform:uppercase;color:var(--buoy);margin-bottom:16px}" +
      ".services .chips{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}" +
      ".services .chips li{background:rgba(255,255,255,.10);color:#fff;border-left:4px solid var(--buoy);padding:14px 18px;border-radius:8px;font-size:1.02rem;font-weight:600}" +
      "@media (max-width:820px){" +
        ".svc-card,.svc-card.rev{grid-template-columns:1fr}" +
        ".svc-card.rev .svc-img{order:0}" +
        ".svc-img{min-height:230px}" +
        ".svc-card.rev .svc-num{left:18px;right:auto}" +
        ".svc-body{padding:28px 22px}" +
        ".services .other{padding:30px 22px}" +
      "}";
    document.head.appendChild(st);
  },

  renderCards: function (C, I) {
    this.cssCards();
    var S = C.services, photos = this.photos(C);
    var rows = S.items.map(function (it, i) {
      var media = window.photoTag(photos[i], it.title);
      // kalimat pertama dijadikan ringkasan agar mudah dibaca
      var parts = String(it.text).split(/(?<=\.)\s+/);
      var lead = parts.shift(), rest = parts.join(" ");
      var num = (i + 1 < 10 ? "0" : "") + (i + 1);
      return '<article class="svc-card' + (i % 2 ? ' rev' : '') + '">' +
        '<div class="svc-img"><span class="svc-num">' + num + '</span>' + media + '</div>' +
        '<div class="svc-body"><h3>' + it.title + '</h3>' +
        '<p class="svc-lead">' + lead + '</p>' +
        (rest ? '<p class="svc-rest">' + rest + '</p>' : '') + '</div></article>';
    }).join("");
    var chips = (S.list || []).map(function (x) { return '<li>' + x + '</li>'; }).join("");
    return '<section class="section services" id="services"><div class="container">' +
      '<div class="svc-head"><span class="svc-eyebrow">' + (S.eyebrow || "Layanan Kami") + '</span>' +
      '<h2>' + S.title + '</h2>' + (S.intro ? '<p>' + S.intro + '</p>' : '') + '</div>' + rows +
      '<div class="other"><h3>' + S.otherTitle + '</h3><p>' + S.otherText + '</p>' +
      '<h4>' + S.listTitle + '</h4><ul class="chips">' + chips + '</ul></div>' +
      '</div></section>';
  },

  // ===== Tampilan 2: "showcase" (tab interaktif) =====
  cssShow: function () {
    if (document.getElementById("services-css")) return;
    var st = document.createElement("style");
    st.id = "services-css";
    st.textContent =
      ".services.svc-show{background:var(--blue-grad);color:#fff}" +
      ".svc-show .svc-head{text-align:center;max-width:720px;margin:0 auto 40px}" +
      ".svc-show .svc-eyebrow{display:inline-flex;align-items:center;gap:12px;font:700 .8rem var(--font-head);letter-spacing:.18em;text-transform:uppercase;color:var(--buoy);margin-bottom:12px}" +
      ".svc-show .svc-eyebrow::before,.svc-show .svc-eyebrow::after{content:'';width:28px;height:3px;border-radius:2px;background:var(--buoy)}" +
      ".svc-show h2{color:#fff;font-size:clamp(1.9rem,3.6vw,2.7rem);margin-bottom:14px}" +
      ".svc-show .svc-head p{font-size:1.1rem;line-height:1.7;color:rgba(255,255,255,.88)}" +
      ".svc-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:22px}" +
      ".svc-tab{display:flex;align-items:center;gap:14px;text-align:left;cursor:pointer;padding:16px 20px;border-radius:14px;border:2px solid rgba(255,255,255,.18);background:rgba(255,255,255,.07);color:#fff;font:700 1.05rem var(--font-head);text-transform:uppercase;letter-spacing:.03em;transition:background .25s,color .25s,border-color .25s,transform .25s}" +
      ".svc-tab:hover{background:rgba(255,255,255,.14);transform:translateY(-2px)}" +
      ".svc-tab i{flex:none;display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.14);color:var(--buoy);font:800 1rem var(--font-head);font-style:normal}" +
      ".svc-tab.on{background:#fff;color:var(--navy);border-color:var(--buoy);box-shadow:0 10px 26px rgba(0,0,0,.3)}" +
      ".svc-tab.on i{background:var(--buoy);color:var(--navy)}" +
      ".svc-panel{display:none;grid-template-columns:1.1fr 1fr;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.18);border-radius:22px;overflow:hidden}" +
      ".svc-panel.on{display:grid;animation:svcIn .45s ease}" +
      "@keyframes svcIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}" +
      "@keyframes svcZoom{from{transform:scale(1.08)}to{transform:scale(1)}}" +
      ".svc-pimg{position:relative;min-height:440px;overflow:hidden}" +
      ".svc-pimg img,.svc-pimg .ph{position:absolute;inset:0;width:100%;height:100%;aspect-ratio:auto;object-fit:cover;border-radius:0}" +
      ".svc-panel.on .svc-pimg img{animation:svcZoom 7s ease-out forwards}" +
      ".svc-pbody{padding:46px;display:flex;flex-direction:column;justify-content:center}" +
      ".svc-pbody h3{color:#fff;font-size:1.9rem;text-transform:uppercase;letter-spacing:.03em;margin-bottom:22px;padding-bottom:16px;position:relative}" +
      ".svc-pbody h3::after{content:'';position:absolute;left:0;bottom:0;width:56px;height:4px;border-radius:2px;background:var(--buoy)}" +
      ".svc-pbody .svc-lead{font-size:1.25rem;line-height:1.65;font-weight:600;color:#fff;margin-bottom:14px}" +
      ".svc-pbody .svc-rest{font-size:1.07rem;line-height:1.8;color:rgba(255,255,255,.9)}" +
      ".svc-pbody .btn{align-self:flex-start;margin-top:26px}" +
      ".svc-more{display:grid;grid-template-columns:1fr 1.4fr;gap:40px;background:#fff;color:var(--ink);border-radius:22px;padding:44px;margin-top:36px;box-shadow:0 12px 34px rgba(0,0,0,.25)}" +
      ".svc-more h3{font-size:1.7rem;margin-bottom:14px}" +
      ".svc-more p{font-size:1.06rem;line-height:1.8;color:#16293a}" +
      ".svc-more h4{font:700 .85rem var(--font-head);letter-spacing:.16em;text-transform:uppercase;color:var(--river);margin-bottom:14px}" +
      ".svc-more ul{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:10px}" +
      ".svc-more li{display:flex;align-items:center;gap:10px;background:var(--mist);border-radius:10px;padding:13px 14px;font-size:1.02rem;font-weight:600;color:var(--navy)}" +
      ".svc-more li svg{flex:none;color:var(--river)}" +
      "@media (max-width:900px){" +
        ".svc-tabs{grid-template-columns:1fr}" +
        ".svc-panel.on{grid-template-columns:1fr}" +
        ".svc-pimg{min-height:230px}" +
        ".svc-pbody{padding:28px 22px}" +
        ".svc-more{grid-template-columns:1fr;padding:28px 22px;gap:24px}" +
        ".svc-more ul{grid-template-columns:1fr}" +
      "}";
    document.head.appendChild(st);
  },

  renderShow: function (C, I) {
    this.cssShow();
    var S = C.services, photos = this.photos(C);
    var check = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 12.5l3 3 5-6"/></svg>';
    var tabs = S.items.map(function (it, i) {
      return '<button type="button" class="svc-tab' + (i === 0 ? ' on' : '') + '" role="tab" aria-selected="' + (i === 0) + '"><i>0' + (i + 1) + '</i><span>' + it.title + '</span></button>';
    }).join("");
    var panels = S.items.map(function (it, i) {
      var parts = String(it.text).split(/(?<=\.)\s+/);
      var lead = parts.shift(), rest = parts.join(" ");
      return '<article class="svc-panel' + (i === 0 ? ' on' : '') + '" role="tabpanel">' +
        '<div class="svc-pimg">' + window.photoTag(photos[i], it.title) + '</div>' +
        '<div class="svc-pbody"><h3>' + it.title + '</h3>' +
        '<p class="svc-lead">' + lead + '</p>' +
        (rest ? '<p class="svc-rest">' + rest + '</p>' : '') +
        '<a class="btn btn-primary" href="#contact">' + (S.cta || "Hubungi Kami") + '</a></div></article>';
    }).join("");
    var chips = (S.list || []).map(function (x) { return '<li>' + check + '<span>' + x + '</span></li>'; }).join("");
    return '<section class="section services svc-show" id="services"><div class="container">' +
      '<div class="svc-head"><span class="svc-eyebrow">' + (S.eyebrow || "Layanan Kami") + '</span>' +
      '<h2>' + S.title + '</h2>' + (S.intro ? '<p>' + S.intro + '</p>' : '') + '</div>' +
      '<div class="svc-tabs" role="tablist">' + tabs + '</div>' + panels +
      '<div class="svc-more"><div><h3>' + S.otherTitle + '</h3><p>' + S.otherText + '</p></div>' +
      '<div><h4>' + S.listTitle + '</h4><ul>' + chips + '</ul></div></div>' +
      '</div></section>';
  },

  // ===== Tampilan 3: "panels" (panel foto yang melebar saat dipilih) =====
  cssPanels: function () {
    if (document.getElementById("services-css")) return;
    var st = document.createElement("style");
    st.id = "services-css";
    st.textContent =
      ".services.svp-sec{background:#fff}" +
      ".svp-head{text-align:center;max-width:720px;margin:0 auto 44px}" +
      ".svp-eyebrow{display:inline-flex;align-items:center;gap:12px;font:700 .8rem var(--font-head);letter-spacing:.18em;text-transform:uppercase;color:var(--river);margin-bottom:12px}" +
      ".svp-eyebrow::before,.svp-eyebrow::after{content:'';width:28px;height:3px;border-radius:2px;background:var(--buoy)}" +
      ".svp-head h2{font-size:clamp(1.9rem,3.6vw,2.7rem);margin-bottom:14px}" +
      ".svp-head p{font-size:1.1rem;line-height:1.7;color:#3d5060}" +
      ".svp-wrap{display:flex;gap:14px;height:620px}" +
      ".svp{position:relative;flex:1;border-radius:22px;overflow:hidden;cursor:pointer;color:#fff;background:#0a2540;transition:flex .6s cubic-bezier(.2,.7,.2,1);outline-offset:3px}" +
      ".svp.on{flex:3.6;cursor:default}" +
      ".svp img,.svp .ph{position:absolute;inset:0;width:100%;height:100%;aspect-ratio:auto;object-fit:cover;border-radius:0;transition:transform .9s ease,filter .6s}" +
      ".svp:not(.on) img{filter:brightness(.6) saturate(.9)}" +
      ".svp:hover:not(.on) img{filter:brightness(.8)}" +
      ".svp.on img{transform:scale(1.04)}" +
      ".svp::after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(6,22,40,.94) 0%,rgba(6,22,40,.55) 45%,rgba(6,22,40,.10) 100%);pointer-events:none}" +
      ".svp-tab{position:absolute;z-index:2;left:0;right:0;bottom:0;top:0;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:26px 0;transition:opacity .35s}" +
      ".svp.on .svp-tab{opacity:0;pointer-events:none}" +
      ".svp-tab b{font:800 1.5rem var(--font-head);color:var(--buoy)}" +
      ".svp-tab span{writing-mode:vertical-rl;transform:rotate(180deg);font:700 1.15rem var(--font-head);text-transform:uppercase;letter-spacing:.08em;white-space:nowrap}" +
      ".svp-body{position:absolute;z-index:2;left:0;bottom:0;width:min(680px,100%);padding:40px;opacity:0;transform:translateY(18px);pointer-events:none;transition:opacity .4s,transform .5s}" +
      ".svp.on .svp-body{opacity:1;transform:none;pointer-events:auto;transition-delay:.3s}" +
      ".svp-num{display:block;font:800 3.4rem var(--font-head);line-height:1;color:var(--buoy);margin-bottom:6px}" +
      ".svp-body h3{color:#fff;font-size:2rem;text-transform:uppercase;letter-spacing:.03em;margin-bottom:16px}" +
      ".svp-body .svc-lead{font-size:1.2rem;line-height:1.6;font-weight:600;color:#fff;margin-bottom:10px}" +
      ".svp-body .svc-rest{font-size:1.04rem;line-height:1.75;color:rgba(255,255,255,.92)}" +
      ".svp-body .btn{margin-top:22px}" +
      ".svp-more{margin-top:44px;background:var(--mist);border-radius:22px;padding:40px;display:grid;grid-template-columns:1fr 1.5fr;gap:36px;align-items:center}" +
      ".svp-more h3{font-size:1.7rem;margin-bottom:12px}" +
      ".svp-more p{font-size:1.06rem;line-height:1.8;color:#16293a}" +
      ".svp-more h4{font:700 .85rem var(--font-head);letter-spacing:.16em;text-transform:uppercase;color:var(--river);margin-bottom:14px}" +
      ".svp-more ul{list-style:none;display:flex;flex-wrap:wrap;gap:10px}" +
      ".svp-more li{display:flex;align-items:center;gap:8px;background:#fff;border-radius:999px;padding:11px 18px 11px 12px;font-size:1.02rem;font-weight:600;color:var(--navy);box-shadow:0 3px 10px rgba(10,37,64,.08)}" +
      ".svp-more li svg{flex:none;color:var(--river)}" +
      "@media (max-width:900px){" +
        ".svp-wrap{flex-direction:column;height:auto}" +
        ".svp,.svp.on{flex:none;min-height:430px;cursor:default;display:flex;align-items:flex-end}" +
        ".svp:not(.on) img{filter:none}" +
        ".svp-tab{display:none}" +
        ".svp-body{position:relative;opacity:1;transform:none;pointer-events:auto;padding:26px 22px}" +
        ".svp-num{font-size:2.4rem}" +
        ".svp-body h3{font-size:1.6rem}" +
        ".svp-more{grid-template-columns:1fr;padding:28px 22px;gap:22px}" +
      "}";
    document.head.appendChild(st);
  },

  renderPanels: function (C, I) {
    this.cssPanels();
    var S = C.services, photos = this.photos(C);
    var check = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 12.5l3 3 5-6"/></svg>';
    var panels = S.items.map(function (it, i) {
      var parts = String(it.text).split(/(?<=\.)\s+/);
      var lead = parts.shift(), rest = parts.join(" ");
      var n = "0" + (i + 1);
      return '<article class="svp' + (i === 0 ? ' on' : '') + '" tabindex="0" aria-expanded="' + (i === 0) + '">' +
        window.photoTag(photos[i], it.title) +
        '<div class="svp-tab"><b>' + n + '</b><span>' + it.title + '</span></div>' +
        '<div class="svp-body"><span class="svp-num">' + n + '</span><h3>' + it.title + '</h3>' +
        '<p class="svc-lead">' + lead + '</p>' +
        (rest ? '<p class="svc-rest">' + rest + '</p>' : '') +
        '<a class="btn btn-primary" href="#contact">' + (S.cta || "Hubungi Kami") + '</a></div></article>';
    }).join("");
    var chips = (S.list || []).map(function (x) { return '<li>' + check + '<span>' + x + '</span></li>'; }).join("");
    return '<section class="section services svp-sec" id="services"><div class="container">' +
      '<div class="svp-head"><span class="svp-eyebrow">' + (S.eyebrow || "Layanan Kami") + '</span>' +
      '<h2>' + S.title + '</h2>' + (S.intro ? '<p>' + S.intro + '</p>' : '') + '</div>' +
      '<div class="svp-wrap">' + panels + '</div>' +
      '<div class="svp-more"><div><h3>' + S.otherTitle + '</h3><p>' + S.otherText + '</p></div>' +
      '<div><h4>' + S.listTitle + '</h4><ul>' + chips + '</ul></div></div>' +
      '</div></section>';
  },

  init: function () {
    var root = document.getElementById("services");
    if (!root) return;

    // panels
    var ps = [].slice.call(root.querySelectorAll(".svp"));
    if (ps.length) {
      var act = function (i) {
        ps.forEach(function (p, k) { p.classList.toggle("on", k === i); p.setAttribute("aria-expanded", k === i); });
      };
      ps.forEach(function (p, i) {
        p.addEventListener("click", function () { act(i); });
        p.addEventListener("mouseenter", function () {
          if (window.matchMedia("(hover:hover) and (min-width:901px)").matches) act(i);
        });
        p.addEventListener("keydown", function (e) {
          if ((e.key === "Enter" || e.key === " ") && e.target === p) { e.preventDefault(); act(i); }
        });
      });
      return;
    }

    // tabs
    var tabs = [].slice.call(root.querySelectorAll(".svc-tab"));
    var panels = [].slice.call(root.querySelectorAll(".svc-panel"));
    if (!tabs.length) return;
    function show(i) {
      tabs.forEach(function (t, k) { t.classList.toggle("on", k === i); t.setAttribute("aria-selected", k === i); });
      panels.forEach(function (p, k) { p.classList.toggle("on", k === i); });
    }
    tabs.forEach(function (t, i) { t.addEventListener("click", function () { show(i); }); });
  },

  // Pilih tampilan lewat config.js -> services.layout: "panels" (bawaan), "tabs" atau "cards"
  render: function (C, I) {
    var L = C.services.layout;
    if (L === "cards") return this.renderCards(C, I);
    if (L === "tabs" || L === "showcase") return this.renderShow(C, I);
    return this.renderPanels(C, I);
  }
};
