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
