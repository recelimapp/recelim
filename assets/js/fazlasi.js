/* Reçelden Fazlası: render a small jar next to each pairing. */
(function () {
  var J = window.JAMS || [];
  document.querySelectorAll('[data-jar-name]').forEach(function (el) {
    var n = el.getAttribute('data-jar-name');
    var jam = J.filter(function (j) { return j.name === n; })[0];
    if (jam) el.outerHTML = window.Recelim.jarSVG(jam, { width: 70 });
  });
})();
