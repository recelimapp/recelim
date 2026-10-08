/* Home: name tooltips on the shelf jars; clicking a jar makes it bounce and names it. */
(function () {
  document.querySelectorAll('.hero .jar-btn').forEach(function (b) {
    var jam = window.JAMS[+b.getAttribute('data-jar') - 1];
    if (!jam) return;
    b.setAttribute('aria-label', jam.name + ' reçeli');
    b.insertAdjacentHTML('beforeend', '<span class="tip">' + jam.name + '</span>');
    b.addEventListener('click', function () { window.Recelim.toast(jam.name + ' — açılışta kilerde.'); });
  });
})();
/* Today's jar: changes every day. */
(function () {
  var el = document.getElementById('today'); if (!el) return;
  var open = (window.JAMS || []).filter(function (j) { return !j.sealed; });
  var d = new Date(), n = d.getFullYear() * 372 + d.getMonth() * 31 + d.getDate();
  var j = open[n % open.length];
  if (j) el.innerHTML = '✦ Bugünün kavanozu: <b style="color:var(--gold-d)">' + j.name + '</b> · No. ' + j.no;
})();
