window.Sections = window.Sections || {};
window.Sections.hero = {
  render: function (C, I) {
    var bg = I.hero || "images/hero-kapal-batubara.jpg";
    return '<section class="hero" id="hero" style="background-image:url(\'' + bg + '\')">' +
      '<div class="hero-overlay"></div>' +
      '<div class="hero-content">' +
      '<h1>' + C.company.name.toUpperCase() + '</h1>' +
      '<p class="hero-branch">' + C.company.branch.toUpperCase() + '</p>' +
      '<p class="hero-sub">' + C.company.subtitle + '</p>' +
      '</div>' +
      '<a class="hero-down" href="#' + C.hero.cta.target + '" aria-label="' + C.hero.cta.label + '">' +
      '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 12 16 19 9"/></svg></a>' +
      '</section>';
  }
};