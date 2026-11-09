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
  // Foto bagian "Siapa Kami". Cukup ganti file ini di folder images/ (nama tetap sama),
  // atau isi about.photo di js/config.js dengan path foto lain.
  defaultPhoto: "images/tentang-kami.jpg",

  render: function (c, img) {
    var a = c.about;
    // File di folder images/ diprioritaskan; images.js (img.aboutPhoto) tidak dipakai lagi
    var src = a.photo || this.defaultPhoto;
    // Jika file foto tidak ditemukan, otomatis kembali ke kotak placeholder
    var photo = window.photoTag(src, c.company.name);
    var paras = a.paragraphs.map(function (p) { return "<p>" + p + "</p>"; }).join("");
    return '<section class="section about" id="about"><div class="container about-grid"><div>' +
      '<h2>' + a.title + '</h2>' + paras +
      '<p class="about-quote">' + a.quote + '</p></div><div class="about-media">' + photo + '</div></div></section>';
  }
};