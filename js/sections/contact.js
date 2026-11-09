window.Sections = window.Sections || {};
window.Sections.contact = {
  render: function (C, I) {
    var ho = C.headOffice || {};
    var phone = C.branchPhone || "";
    var email = C.branchEmail || ho.email || "";
    var phoneHref = phone.replace(/[^\d+]/g, ""); if (phoneHref && phoneHref[0] !== "+") phoneHref = "+" + phoneHref;
    var icoPhone = '<svg class="ico ico-phone" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg>';
    var icoMail = '<svg class="ico ico-mail" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><rect x="3" y="5" width="18" height="14" rx="1.5"/><polyline points="3.5 6.5 12 13 20.5 6.5"/></svg>';
    var h = '<section class="contact" id="contact">';
    if (C.mapEmbedUrl) {
      h += '<a class="map-wrap" href="' + C.mapsUrl + '" target="_blank" rel="noopener" aria-label="Buka di Google Maps">' +
           '<iframe src="' + C.mapEmbedUrl + '" loading="lazy" title="Peta"></iframe></a>';
    }
    h += '<div class="container contact-in"><h2>Kontak</h2>' +
         '<p class="addr"><a href="' + C.mapsUrl + '" target="_blank" rel="noopener">' + C.address + '</a></p>' +
         '<ul class="contact-list">';
    if (phone) h += '<li>' + icoPhone + '<a href="tel:' + phoneHref + '">' + phone + '</a></li>';
    if (email) h += '<li>' + icoMail + '<a href="mailto:' + email + '">' + email + '</a></li>';
    h += '</ul>';
    h += '<div class="ho"><h3>Kantor Pusat</h3><p>' + ho.address + '</p>' +
         '<p><a href="tel:' + (ho.phone || "").replace(/[^\d+]/g, "") + '">' + ho.phone + '</a> &middot; ' +
         '<a href="mailto:' + ho.email + '">' + ho.email + '</a></p>' +
         (ho.profileUrl ? '<a class="btn btn-dark" href="' + ho.profileUrl + '" target="_blank" rel="noopener">Profil Perusahaan</a>' : '') +
         '</div></div></section>';
    return h;
  },
  init: function (C) {
    var el = document.getElementById("openStatus");
    if (!el || !C.hours) return;
    try {
      var now = new Date(new Date().toLocaleString("en-US", { timeZone: C.hours.timezone }));
      var d = C.hours.days[now.getDay()], open = false, text = "Tutup hari ini";
      if (d) {
        var m = now.getHours() * 60 + now.getMinutes();
        var a = d[0].split(":"), b = d[1].split(":");
        var s = +a[0] * 60 + +a[1], e = +b[0] * 60 + +b[1];
        open = m >= s && m < e;
        text = open ? "Buka sekarang · sampai " + d[1] : "Tutup sekarang · hari ini " + d[0] + "–" + d[1];
      }
      el.textContent = text;
      el.className = "status " + (open ? "is-open" : "is-closed");
    } catch (err) {}
  }
};