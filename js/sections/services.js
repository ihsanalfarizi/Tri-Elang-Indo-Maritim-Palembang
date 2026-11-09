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

  render: function (C, I) {
    var S = C.services, photos = this.photos(C);
    var rows = S.items.map(function (it, i) {
      var src = photos[i];
      var media = window.photoTag(src, it.title);
      return '<div class="svc-row' + (i % 2 ? ' rev' : '') + '">' +
        '<div class="svc-media">' + media + '</div>' +
        '<div class="svc-text"><h3>' + it.title + '</h3><p>' + it.text + '</p></div></div>';
    }).join("");
    var chips = (S.list || []).map(function (x) { return '<li>' + x + '</li>'; }).join("");
    return '<section class="section services" id="services"><div class="container">' +
      '<h2>' + S.title + '</h2>' + rows +
      '<div class="other"><h3>' + S.otherTitle + '</h3><p>' + S.otherText + '</p>' +
      '<h4>' + S.listTitle + '</h4><ul class="chips">' + chips + '</ul></div>' +
      '</div></section>';
  }
};