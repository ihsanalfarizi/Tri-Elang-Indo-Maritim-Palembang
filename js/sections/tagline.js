window.Sections = window.Sections || {};
window.Sections.tagline = {
  render: function (c) {
    return '<section class="tagline"><div class="container"><p class="t1">' + c.tagline.line1 + '</p><p class="t2">' + c.tagline.line2 + '</p></div></section>';
  }
};
