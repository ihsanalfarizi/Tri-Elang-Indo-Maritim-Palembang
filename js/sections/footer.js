window.Sections = window.Sections || {};
window.Sections.footer = {
  render: function (c) {
    return '<footer class="footer"><div class="container"><p>© ' + new Date().getFullYear() + ' ' + c.company.name + ' – ' + c.company.branch + '. ' + c.footer.note + '</p></div></footer>';
  }
};
