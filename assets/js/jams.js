/* Reçelim — the 1001-jar collection (deterministic). Exposes window.JAMS and window.JAM_FAMILIES. */
(function () {
  var COUNT = 1001;
  var SEALED = 333;

  var FAMILIES = {
    meyve: 'Meyve',
    narenciye: 'Narenciye',
    cicek: 'Çiçek',
    sebze: 'Sebze',
    kuruyemis: 'Kuruyemiş',
    baharat: 'Baharat',
    sutlu: 'Sütlü',
    egzotik: 'Egzotik'
  };

  // Reçelim's real products come first.
  var REAL = [
    ['Nane', 'baharat', '#4A5236'],
    ['Nektarin', 'meyve', '#E08A45'],
    ['Süt', 'sutlu', '#D3A574'],
    ['Mantar', 'sebze', '#5B4030'],
    ['Kuru Üzüm', 'meyve', '#5A2A33'],
    ['Keçi Sütü', 'sutlu', '#B98A63'],
    ['Keçi Sütü Kaymağı', 'sutlu', '#9A6A47'],
    ['Gül', 'cicek', '#B34A55']
  ];

  // [name, family, color, origin]
  var BASES = [
    ['Kayısı', 'meyve', '#E9A23B', 'Malatya'],
    ['Vişne', 'meyve', '#8A1A2C', 'Afyon'],
    ['Ayva', 'meyve', '#E2AE5A', 'Sakarya'],
    ['İncir', 'meyve', '#7E4A5E', 'Aydın'],
    ['Çilek', 'meyve', '#D2323F', 'Silifke'],
    ['Ahududu', 'meyve', '#C42049', 'Bursa'],
    ['Böğürtlen', 'meyve', '#46183A', 'Rize'],
    ['Kızılcık', 'meyve', '#A8142F', 'Bolu'],
    ['Şeftali', 'meyve', '#F2A65E', 'Bursa'],
    ['Erik', 'meyve', '#6E2545', 'Denizli'],
    ['Kiraz', 'meyve', '#9C1A33', 'Tekirdağ'],
    ['Nar', 'meyve', '#B2203D', 'Hatay'],
    ['Karadut', 'meyve', '#3E1430', 'Bilecik'],
    ['Ak Dut', 'meyve', '#D8BE8A', 'Malatya'],
    ['Armut', 'meyve', '#D7C07A', 'Ankara'],
    ['Elma', 'meyve', '#D8743E', 'Isparta'],
    ['Yaban Mersini', 'meyve', '#3E2F62', 'Artvin'],
    ['Frenk Üzümü', 'meyve', '#5E1B40', 'Bolu'],
    ['Kivi', 'meyve', '#8DAA3E', 'Yalova'],
    ['Trabzon Hurması', 'meyve', '#E98A2E', 'Bursa'],
    ['Muşmula', 'meyve', '#A8763E', 'Sakarya'],
    ['Alıç', 'meyve', '#C4432C', 'Kastamonu'],
    ['Kuşburnu', 'meyve', '#C9442D', 'Bayburt'],
    ['Yenidünya', 'meyve', '#F0A445', 'Antalya'],
    ['Üzüm', 'meyve', '#6B2F4A', 'Denizli'],
    ['Turunç', 'narenciye', '#E68C2E', 'Antalya'],
    ['Bergamot', 'narenciye', '#D9B53E', 'Bodrum'],
    ['Portakal', 'narenciye', '#EE8A26', 'Finike'],
    ['Mandalina', 'narenciye', '#F08F2A', 'Rize'],
    ['Limon', 'narenciye', '#E6D03E', 'Mersin'],
    ['Greyfurt', 'narenciye', '#E8704E', 'Adana'],
    ['Menekşe', 'cicek', '#7D5EA8', 'Isparta'],
    ['Lavanta', 'cicek', '#9B88C8', 'Isparta'],
    ['Mürver Çiçeği', 'cicek', '#E6D9A2', 'Bolu'],
    ['Ihlamur', 'cicek', '#D6C27C', 'Ordu'],
    ['Hibiskus', 'cicek', '#A3203F', 'Mısır'],
    ['Patlıcan', 'sebze', '#3E2436', 'Mersin'],
    ['Zeytin', 'sebze', '#5E5C2E', 'Ayvalık'],
    ['Kabak', 'sebze', '#E59C3E', 'Hatay'],
    ['Havuç', 'sebze', '#E9772C', 'Beypazarı'],
    ['Domates', 'sebze', '#C9361F', 'Denizli'],
    ['Karpuz Kabuğu', 'sebze', '#B9C67C', 'Diyarbakır'],
    ['Pancar', 'sebze', '#7A1A3A', 'Konya'],
    ['Kestane', 'kuruyemis', '#7B4B2C', 'Bursa'],
    ['Yeşil Ceviz', 'kuruyemis', '#3D3122', 'Kastamonu'],
    ['Çam Kozalağı', 'kuruyemis', '#6E4C2C', 'Kazdağları'],
    ['Sakız', 'baharat', '#E8E0C2', 'Çeşme'],
    ['Kahve', 'baharat', '#4C3024', 'İstanbul'],
    ['Acı Biber', 'baharat', '#B5281F', 'Gaziantep'],
    ['Keçiboynuzu', 'baharat', '#5C3C26', 'Antalya'],
    ['Hurma', 'egzotik', '#7C4C2C', 'Hatay'],
    ['Mango', 'egzotik', '#F2B238', 'Alanya'],
    ['Çarkıfelek', 'egzotik', '#E9B43C', 'Alanya'],
    ['Ananas', 'egzotik', '#F1C24C', 'Kosta Rika'],
    ['Muz', 'egzotik', '#EACB6C', 'Anamur'],
    ['Avokado', 'egzotik', '#7E8C3A', 'Alanya'],
    ['Pitaya', 'egzotik', '#C83A78', 'Alanya'],
    ['Yuzu', 'egzotik', '#E8D44E', 'Japonya']
  ];

  // [accent, which base families it suits]
  var FRUITY = ['meyve', 'narenciye', 'egzotik'];
  var ACCENTS = [
    ['Tarçın', FRUITY.concat(['sebze', 'kuruyemis'])],
    ['Vanilya', FRUITY.concat(['kuruyemis', 'cicek'])],
    ['Karanfil', ['meyve', 'narenciye', 'sebze']],
    ['Kakule', FRUITY.concat(['baharat'])],
    ['Zencefil', FRUITY.concat(['sebze'])],
    ['Fesleğen', ['meyve', 'narenciye']],
    ['Biberiye', ['meyve', 'narenciye', 'sebze']],
    ['Kekik', ['meyve', 'sebze']],
    ['Nane', ['meyve', 'narenciye', 'egzotik']],
    ['Lavanta', ['meyve', 'narenciye']],
    ['Gül', ['meyve', 'narenciye']],
    ['Bal', FRUITY.concat(['sebze', 'kuruyemis', 'cicek'])],
    ['Ceviz', ['meyve', 'sebze']],
    ['Fındık', ['meyve', 'kuruyemis']],
    ['Badem', ['meyve', 'cicek', 'narenciye']],
    ['Antep Fıstığı', ['meyve', 'cicek']],
    ['Bitter Çikolata', ['meyve', 'narenciye', 'kuruyemis', 'baharat']],
    ['Limon Kabuğu', ['meyve', 'cicek', 'sebze']],
    ['Portakal Kabuğu', ['meyve', 'sebze', 'kuruyemis']],
    ['Bergamot', ['meyve', 'cicek']],
    ['Karabiber', ['meyve', 'egzotik']],
    ['Pul Biber', ['meyve', 'egzotik', 'sebze']],
    ['Susam', ['meyve', 'sebze']],
    ['Çam Fıstığı', ['meyve', 'sebze']],
    ['Ihlamur', ['meyve', 'narenciye']],
    ['Sumak', ['meyve', 'sebze']],
    ['Mahlep', ['meyve', 'kuruyemis']],
    ['Kaymak', ['meyve', 'kuruyemis']]
  ];

  // small deterministic PRNG
  var seed = 1001;
  function rand() {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rand() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; }
    return a;
  }
  function shade(hex, amt) {
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    function c(v) { return Math.max(0, Math.min(255, Math.round(v + amt))); }
    return '#' + ((1 << 24) + (c(r) << 16) + (c(g) << 8) + c(b)).toString(16).slice(1).toUpperCase();
  }

  // which ids are sealed: evenly spread over 13..COUNT
  var sealedIds = {};
  for (var k = 0; k < SEALED; k++) sealedIds[Math.floor(13 + k * (COUNT - 13) / SEALED)] = true;
  var openCount = COUNT - SEALED;

  var named = [];
  var used = {};
  function push(name, family, color, origin, real) {
    if (used[name]) return;
    used[name] = true;
    named.push({ name: name, family: family, color: color, origin: origin || '', real: !!real });
  }
  REAL.forEach(function (r) { push(r[0], r[1], r[2], 'Denizli', true); });
  BASES.forEach(function (b) { push(b[0], b[1], b[2], b[3]); });

  var combos = [];
  BASES.forEach(function (b) {
    ACCENTS.forEach(function (a) {
      if (a[0] === b[0] || a[1].indexOf(b[1]) < 0) return;
      combos.push([b[0] + ' & ' + a[0], b[1], shade(b[2], (rand() - 0.5) * 26), b[3]]);
    });
  });
  shuffle(combos);
  for (var c = 0; named.length < openCount && c < combos.length; c++) push(combos[c][0], combos[c][1], combos[c][2], combos[c][3]);

  // keep the 8 real products first, mix the rest
  var head = named.slice(0, REAL.length);
  var rest = shuffle(named.slice(REAL.length));
  var queue = head.concat(rest);

  var jams = [];
  for (var id = 1, q = 0; id <= COUNT; id++) {
    var no = ('000' + id).slice(-4);
    if (sealedIds[id]) {
      jams.push({ id: id, no: no, name: 'Mühürlü kavanoz', family: 'muhurlu', color: '#E9E1F0', origin: '', sealed: true, real: false });
    } else {
      var j = queue[q++];
      jams.push({ id: id, no: no, name: j.name, family: j.family, color: j.color, origin: j.origin, sealed: false, real: j.real });
    }
  }

  window.JAM_FAMILIES = FAMILIES;
  window.JAMS = jams;
})();
