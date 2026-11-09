(function () {
  var app = document.getElementById("app");
  var C = window.CONFIG, I = window.IMAGES || {}, S = window.Sections;

  // Ikon tab browser (favicon) = images/logo.jpg
  var icon = C.company.logo || "images/logo.jpg";
  [].slice.call(document.querySelectorAll('link[rel~="icon"]')).forEach(function (l) { l.parentNode.removeChild(l); });
  var l = document.createElement("link");
  l.rel = "icon"; l.type = "image/jpeg"; l.href = icon;
  document.head.appendChild(l);

  C.sectionOrder.forEach(function (name) {
    var s = S[name]; if (!s) return;
    var wrap = document.createElement("div");
    wrap.innerHTML = s.render(C, I);
    while (wrap.firstChild) app.appendChild(wrap.firstChild);
  });
  C.sectionOrder.forEach(function (name) { var s = S[name]; if (s && s.init) s.init(C, I); });
})();