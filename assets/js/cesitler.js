/* 1001 Çeşit: search, family filter, paginated jar wall. */
(function () {
  var J = window.JAMS || [], F = window.JAM_FAMILIES || {};
  var wall = document.getElementById('wall'), more = document.getElementById('more');
  var count = document.getElementById('count'), empty = document.getElementById('empty');
  var q = document.getElementById('q'), chips = document.getElementById('chips');
  var PAGE = 48, shown = PAGE, family = 'all', term = '';

  function key(s) {
    return String(s).toLocaleLowerCase('tr-TR').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u').replace(/â/g, 'a');
  }
  var fams = [['all', 'Tümü']].concat(Object.keys(F).map(function (k) { return [k, F[k]]; })).concat([['muhurlu', 'Mühürlü']]);
  chips.innerHTML = fams.map(function (f) { return '<button class="chip" type="button" data-f="' + f[0] + '" aria-pressed="' + (f[0] === 'all') + '">' + f[1] + '</button>'; }).join('');

  function list() {
    var t = key(term.trim());
    return J.filter(function (j) {
      if (family !== 'all' && j.family !== family) return false;
      if (t && (j.sealed || key(j.name + ' ' + j.origin).indexOf(t) < 0)) return false;
      return true;
    });
  }
  function render() {
    var items = list();
    var page = items.slice(0, shown);
    wall.innerHTML = page.map(function (j) {
      var sub = j.sealed ? 'Açılışta açılacak' : (F[j.family] || '') + (j.origin ? ' · ' + j.origin : '');
      return '<button class="item' + (j.real ? ' is-real' : '') + '" type="button" data-id="' + j.id + '">' +
        window.Recelim.jarSVG(j, { width: 78 }) +
        (j.real ? '<span class="badge">✦ İlk sekiz</span>' : '') +
        '<b>' + (j.sealed ? 'Mühürlü kavanoz' : j.name) + '</b><small>No. ' + j.no + ' · ' + sub + '</small></button>';
    }).join('');
    count.textContent = items.length.toLocaleString('tr-TR') + ' kavanoz' + (family === 'all' && !term ? ' · 668 tadı açıklandı, 333 tanesi mühürlü' : '');
    empty.hidden = items.length > 0;
    more.parentNode.hidden = items.length <= shown;
  }

  chips.addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    family = b.getAttribute('data-f'); shown = PAGE;
    chips.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', c === b); });
    render();
  });
  var timer;
  q.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(function () { term = q.value; shown = PAGE; render(); }, 120); });
  more.addEventListener('click', function () { setTimeout(function () { shown += PAGE; render(); }, 700); });
  wall.addEventListener('click', function (e) {
    var b = e.target.closest('.item'); if (!b) return;
    var j = J[+b.getAttribute('data-id') - 1];
    window.Recelim.toast(j.sealed ? 'No. ' + j.no + ' mühürlü — açılış gecesi açılacak.' : j.name + (j.origin ? ' · ' + j.origin : '') + ' — siparişler çok yakında.');
  });
  render();
})();
