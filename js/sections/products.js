window.Sections = window.Sections || {};
window.Sections.products = {
  icons: {
    barge: '<path d="M3 36h42l-4 6H7z"/><path d="M8 36c3-9 8-13 13-13s8 4 11 13"/><path d="M34 36v-7h8v7"/>',
    bulker: '<path d="M3 36h42l-5 7H8z"/><path d="M11 36v-8h11v8"/><path d="M28 36V22h9v14"/><path d="M32.5 22v-7"/>',
    tanker: '<path d="M3 36h42l-5 7H8z"/><path d="M10 36v-6h20v6"/><path d="M35 36v-10h6v10"/><path d="M14 30v-4h12v4"/>'
  },
  render: function (C, I) {
    var P = C.products;
    if (!P) return "";
    var self = this;
    var cur = P.currency === "IDR" ? "Rp" : P.currency;
    var num = function (n) {
      return n >= 1000000 ? new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(n / 1000000) : new Intl.NumberFormat("id-ID").format(n);
    };
    var rows = P.items.map(function (it) {
      var ico = self.icons[it.type] || self.icons.bulker;
      return '<div class="pt-row">' +
        '<div class="pt-vessel"><span class="pt-ico"><svg viewBox="0 0 48 48" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' + ico + '</svg></span>' +
        '<div><strong>' + it.name + '</strong><small>' + it.spec + '</small></div></div>' +
        '<div class="pt-cargo" data-label="Muatan">' + it.cargo + '</div>' +
        '<div class="pt-price" data-label="Estimasi biaya"><strong>' + cur + ' ' + num(it.min) + ' &ndash; ' + num(it.max) + (it.max >= 1000000 ? ' juta' : '') + '</strong><small>' + P.unit + '</small></div>' +
        '</div>';
    }).join("");

    var phone = C.branchPhone || "", email = C.branchEmail || "";
    var tel = phone.replace(/[^\d+]/g, ""); if (tel && tel[0] !== "+") tel = "+" + tel;

    return '<section class="section products" id="products"><div class="container">' +
      '<div class="pt-head"><h2>' + P.title + '</h2><p>' + P.intro + '</p></div>' +
      '<div class="pt-table" role="table">' +
        '<div class="pt-row pt-thead" role="row"><div>Jenis Kapal</div><div>Muatan</div><div>Estimasi Biaya</div></div>' +
        rows +
      '</div>' +
      '<p class="pt-note">' + P.note + (P.updated ? ' Diperbarui ' + P.updated + '.' : '') + '</p>' +
      '<div class="pt-cta"><a class="btn btn-dark" href="#' + P.cta.target + '">' + P.cta.label + '</a>' +
      (tel ? '<a class="pt-link" href="tel:' + tel + '">atau telepon ' + phone + '</a>' : '') + '</div>' +
      '</div></section>';
  }
};