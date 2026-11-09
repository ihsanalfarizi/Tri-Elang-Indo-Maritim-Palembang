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
  // Foto tiap kartu, urut sesuai C.highlights.items. Ganti file di folder images/
  // (nama sama) atau ubah path di sini / di config: highlights.photos = [...]
  defaultPhotos: [
    "images/layanan-keagenan.jpg",
    "images/layanan-brokerage.jpg",
    "images/layanan-stevedoring.jpg"
  ],

  render: function (C, I) {
    var H = C.highlights;
    var photos = H.photos || this.defaultPhotos;
    var cards = H.items.map(function (title, i) {
      var src = photos[i];
      var media = window.photoTag(src, title);
      return '<a class="hl-card" href="#services">' + media + '<h3>' + title + '</h3></a>';
    }).join("");
    return '<section class="section highlights" id="highlights"><div class="container">' +
      '<h2>' + H.title + '</h2><div class="hl-grid">' + cards + '</div>' +
      '<div class="hl-more"><a class="btn btn-dark" href="#' + H.button.target + '">' + H.button.label + '</a></div>' +
      '</div></section>';
  }
};