/* Reçelim — shared behaviour: realistic SVG jars, gold-dust buttons, gold motes, nav, reveal, waitlist. */
(function () {
  'use strict';

  // Optional: put a Formspree-compatible endpoint here to collect sign-ups on a server.
  var WAITLIST_ENDPOINT = '';

  var doc = document.documentElement;
  doc.classList.add('js');
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function shade(hex, amt) {
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    function c(v) { return Math.max(0, Math.min(255, Math.round(v + amt))); }
    return '#' + ((1 << 24) + (c(r) << 16) + (c(g) << 8) + c(b)).toString(16).slice(1);
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var uid = 0;
  // Realistic glass jam jar. viewBox 100 x 150.
  function jarSVG(jam, opts) {
    opts = opts || {};
    var id = 'j' + (++uid);
    var sealed = !!jam.sealed;
    var c = sealed ? '#D9CFC0' : jam.color;
    var name = sealed ? 'Mühürlü' : jam.name;
    var lines = [name];
    if (name.length > 11) {
      var at = name.indexOf(' & ');
      if (at > 0) lines = [name.slice(0, at), '& ' + name.slice(at + 3)];
      else if (name.indexOf(' ') > 0) { var sp = name.lastIndexOf(' '); lines = [name.slice(0, sp), name.slice(sp + 1)]; }
    }
    var fs = lines.length > 1 ? (Math.max(lines[0].length, lines[1].length) > 12 ? 7 : 8.2) : (name.length > 9 ? 8.6 : 10);
    var nameSvg = lines.length > 1
      ? '<text x="50" y="94" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-weight="700" font-size="' + fs + '" fill="#3A2A14">' + esc(lines[0]) + '</text>' +
        '<text x="50" y="' + (94 + fs + 1) + '" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-weight="700" font-size="' + fs + '" fill="#3A2A14">' + esc(lines[1]) + '</text>'
      : '<text x="50" y="99" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-weight="700" font-size="' + fs + '" fill="#3A2A14">' + esc(name) + '</text>';
    var body = 'M18 42 Q18 33 29 33 H71 Q82 33 82 42 V131 Q82 143 69 143 H31 Q18 143 18 131 Z';
    var delay = (opts.delay != null ? opts.delay : ((jam.id || 0) % 7) * 0.7) + 's';
    return '<span class="jar" style="--w:' + (opts.width || 96) + 'px;--d:' + delay + '">' +
      '<svg viewBox="0 0 100 150" role="img" aria-label="' + esc(sealed ? 'Mühürlü kavanoz' : jam.name + ' reçeli') + '">' +
      '<defs>' +
        '<clipPath id="' + id + 'c"><path d="' + body + '"/></clipPath>' +
        '<linearGradient id="' + id + 'j" x1="0" x2="1">' +
          '<stop offset="0" stop-color="' + shade(c, -70) + '"/><stop offset=".22" stop-color="' + shade(c, -15) + '"/>' +
          '<stop offset=".42" stop-color="' + shade(c, 28) + '"/><stop offset=".62" stop-color="' + c + '"/>' +
          '<stop offset="1" stop-color="' + shade(c, -80) + '"/></linearGradient>' +
        '<linearGradient id="' + id + 'v" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>' +
        '<linearGradient id="' + id + 'l" x1="0" x2="1">' +
          '<stop offset="0" stop-color="#7A5412"/><stop offset=".18" stop-color="#C99B42"/><stop offset=".38" stop-color="#F7E6B4"/>' +
          '<stop offset=".55" stop-color="#D7B160"/><stop offset=".85" stop-color="#A57A2A"/><stop offset="1" stop-color="#6E4A0E"/></linearGradient>' +
        '<linearGradient id="' + id + 'p" x1="0" x2="1">' +
          '<stop offset="0" stop-color="#E4D7BC"/><stop offset=".3" stop-color="#FFFBF1"/><stop offset=".55" stop-color="#FFFDF7"/><stop offset="1" stop-color="#D9CBAE"/></linearGradient>' +
        '<radialGradient id="' + id + 's" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#5A3C0C" stop-opacity=".32"/><stop offset="1" stop-color="#5A3C0C" stop-opacity="0"/></radialGradient>' +
        '<linearGradient id="' + id + 'g" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
      '</defs>' +
      '<ellipse cx="50" cy="145" rx="40" ry="5" fill="url(#' + id + 's)"/>' +
      // glass body + jam
      '<path d="' + body + '" fill="rgba(255,255,255,.35)"/>' +
      '<g clip-path="url(#' + id + 'c)">' +
        '<g class="wave"><path d="M8 50 Q22 46 36 50 T64 50 T92 50 T120 50 V150 H8 Z" fill="url(#' + id + 'j)"/></g>' +
        '<rect x="0" y="0" width="100" height="150" fill="url(#' + id + 'v)"/>' +
        '<g class="glint"><rect x="10" y="20" width="10" height="140" fill="url(#' + id + 'g)" transform="rotate(12 15 90)"/></g>' +
      '</g>' +
      // label
      '<rect x="18" y="72" width="64" height="44" fill="url(#' + id + 'p)"/>' +
      '<rect x="18" y="74.5" width="64" height=".7" fill="#B88A2E"/><rect x="18" y="112.8" width="64" height=".7" fill="#B88A2E"/>' +
      '<text x="50" y="83" text-anchor="middle" font-family="Manrope, sans-serif" font-weight="800" font-size="4.6" letter-spacing="1.6" fill="#9A6F1E">REÇELİM</text>' +
      nameSvg +
      (jam.no ? '<text x="50" y="110" text-anchor="middle" font-family="Manrope, sans-serif" font-weight="700" font-size="3.8" letter-spacing=".8" fill="#9A8A6E">No. ' + esc(jam.no) + '</text>' : '') +
      // glass edges & highlights
      '<path d="' + body + '" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="1.3"/>' +
      '<path d="' + body + '" fill="none" stroke="rgba(90,62,20,.28)" stroke-width=".6"/>' +
      '<rect x="23" y="40" width="4.5" height="94" rx="2.2" fill="#fff" opacity=".5"/>' +
      '<rect x="73.5" y="44" width="1.6" height="84" rx=".8" fill="#fff" opacity=".35"/>' +
      // neck + gold lid
      '<rect x="26" y="27" width="48" height="8" rx="2" fill="rgba(255,255,255,.55)" stroke="rgba(90,62,20,.25)" stroke-width=".5"/>' +
      '<rect x="21" y="9" width="58" height="20" rx="3.2" fill="url(#' + id + 'l)"/>' +
      '<g opacity=".28" stroke="#5A3C0C" stroke-width=".5">' +
        [26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 74].map(function (x) { return '<line x1="' + x + '" y1="12" x2="' + x + '" y2="27"/>'; }).join('') +
      '</g>' +
      '<rect x="21" y="9" width="58" height="3.2" rx="1.6" fill="#FBEFC9" opacity=".85"/>' +
      (sealed ? '<circle cx="50" cy="19" r="9" fill="#8E1F2A"/><circle cx="50" cy="19" r="9" fill="none" stroke="#5E0F18" stroke-width="1"/>' +
        '<text x="50" y="23" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-weight="700" font-size="12" fill="#F3DFA6">?</text>' : '') +
      '</svg></span>';
  }

  // ---------- toast ----------
  var toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toast.t);
    toast.t = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2600);
  }

  // ---------- gold dust (buttons dissolve into gold particles) ----------
  var dustCanvas, dustCtx, dust = [], dustRunning = false;
  var GOLDS = ['#F6E7BE', '#E4C67E', '#D2AE5C', '#B88A2E', '#8A5E14', '#FFF6DA'];
  function ensureDust() {
    if (dustCanvas) return;
    dustCanvas = document.createElement('canvas');
    dustCanvas.className = 'dust-canvas';
    document.body.appendChild(dustCanvas);
    dustCtx = dustCanvas.getContext('2d');
    sizeDust();
    window.addEventListener('resize', sizeDust);
  }
  function sizeDust() {
    var d = Math.min(window.devicePixelRatio || 1, 2);
    dustCanvas.width = innerWidth * d; dustCanvas.height = innerHeight * d;
    dustCanvas.style.width = innerWidth + 'px'; dustCanvas.style.height = innerHeight + 'px';
    dustCtx.setTransform(d, 0, 0, d, 0, 0);
  }
  function burst(rect) {
    ensureDust();
    var step = rect.width * rect.height > 9000 ? 3 : 2.4;
    for (var y = rect.top; y < rect.bottom; y += step) {
      for (var x = rect.left; x < rect.right; x += step) {
        if (Math.random() > .82) continue;
        var t = (x - rect.left) / rect.width;
        dust.push({
          x: x, y: y, vx: .4 + Math.random() * 1.6, vy: -(.2 + Math.random() * 1.3),
          r: .6 + Math.random() * 1.4, c: GOLDS[(Math.random() * GOLDS.length) | 0],
          delay: t * 260 + Math.random() * 120, life: 900 + Math.random() * 500, age: 0
        });
      }
    }
    if (!dustRunning) { dustRunning = true; var last = performance.now(); requestAnimationFrame(function tick(now) {
      var dt = Math.min(48, now - last); last = now;
      dustCtx.clearRect(0, 0, innerWidth, innerHeight);
      for (var i = dust.length - 1; i >= 0; i--) {
        var p = dust[i]; p.age += dt;
        if (p.age < p.delay) { dustCtx.globalAlpha = 1; dustCtx.fillStyle = p.c; dustCtx.fillRect(p.x, p.y, p.r, p.r); continue; }
        var k = (p.age - p.delay) / p.life;
        if (k >= 1) { dust.splice(i, 1); continue; }
        p.x += p.vx * dt / 16; p.y += p.vy * dt / 16; p.vy -= .01 * dt / 16; p.vx *= .995;
        dustCtx.globalAlpha = 1 - k;
        dustCtx.fillStyle = p.c;
        dustCtx.beginPath(); dustCtx.arc(p.x, p.y, p.r * (1 - k * .5), 0, 6.283); dustCtx.fill();
      }
      dustCtx.globalAlpha = 1;
      if (dust.length) requestAnimationFrame(tick); else { dustRunning = false; dustCtx.clearRect(0, 0, innerWidth, innerHeight); }
    }); }
  }
  // Dissolve an element into dust, then run `after` (navigate / restore).
  function dissolve(el, after) {
    if (reduced) { if (after) after(); return; }
    burst(el.getBoundingClientRect());
    el.classList.add('is-dusting');
    setTimeout(function () {
      if (after) after();
      setTimeout(function () { el.classList.remove('is-dusting'); }, 500);
    }, 650);
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-dust]');
    if (!el || el.tagName === 'BUTTON' && el.type === 'submit') return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    var href = el.tagName === 'A' ? el.getAttribute('href') : null;
    if (href && (el.target === '_blank' || href.charAt(0) === '#')) { dissolve(el); return; }
    e.preventDefault();
    dissolve(el, href ? function () { location.href = href; } : null);
  });
  window.addEventListener('pageshow', function () {
    document.querySelectorAll('.is-dusting').forEach(function (el) { el.classList.remove('is-dusting'); });
  });

  // ---------- gold motes in the background ----------
  function motes() {
    if (reduced) return;
    var cv = document.createElement('canvas');
    cv.className = 'motes'; cv.setAttribute('aria-hidden', 'true');
    document.body.prepend(cv);
    var ctx = cv.getContext('2d'), W, H, d = Math.min(window.devicePixelRatio || 1, 2), list = [], running = true;
    function size() { W = innerWidth; H = innerHeight; cv.width = W * d; cv.height = H * d; cv.style.width = W + 'px'; cv.style.height = H + 'px'; ctx.setTransform(d, 0, 0, d, 0, 0); }
    size(); window.addEventListener('resize', size);
    var n = Math.round(Math.min(46, W / 30));
    for (var i = 0; i < n; i++) list.push({ x: Math.random() * W, y: Math.random() * H, r: .6 + Math.random() * 1.8, s: .08 + Math.random() * .25, p: Math.random() * 6.28, dx: (Math.random() - .5) * .15 });
    document.addEventListener('visibilitychange', function () { running = !document.hidden; if (running) requestAnimationFrame(tick); });
    function tick(t) {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < list.length; i++) {
        var m = list[i];
        m.y -= m.s; m.x += m.dx + Math.sin(t / 3000 + m.p) * .12;
        if (m.y < -10) { m.y = H + 10; m.x = Math.random() * W; }
        var a = .25 + .35 * Math.sin(t / 900 + m.p * 3);
        ctx.globalAlpha = Math.max(.05, a);
        ctx.fillStyle = i % 3 ? '#C9A04A' : '#E8CF8E';
        ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, 6.283); ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ---------- header / nav ----------
  function nav() {
    var header = document.querySelector('.header');
    if (!header) return;
    var onScroll = function () { header.classList.toggle('is-scrolled', scrollY > 8); };
    onScroll(); addEventListener('scroll', onScroll, { passive: true });
    var btn = header.querySelector('.menu-btn');
    if (btn) {
      btn.addEventListener('click', function () {
        var open = header.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open);
        btn.textContent = open ? 'Kapat' : 'Menü';
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && header.classList.contains('is-open')) { header.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); btn.textContent = 'Menü'; btn.focus(); }
      });
    }
    var file = location.pathname.split('/').pop() || 'index.html';
    if (file.indexOf('.') < 0) file += '.html';
    header.querySelectorAll('.nav a').forEach(function (a) { if (a.getAttribute('href') === file) a.setAttribute('aria-current', 'page'); });
  }

  // ---------- reveal ----------
  function reveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window) || reduced) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        setTimeout(function () { el.classList.add('is-in'); }, +(el.getAttribute('data-reveal') || 0));
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  // ---------- waitlist ----------
  function store(key, val) {
    try { if (val === undefined) return JSON.parse(localStorage.getItem('recelim:' + key)); localStorage.setItem('recelim:' + key, JSON.stringify(val)); } catch (e) { return null; }
  }
  function queueNo(email) {
    var h = 0; for (var i = 0; i < email.length; i++) h = (h * 31 + email.charCodeAt(i)) >>> 0;
    return ('000' + (h % 900 + 100)).slice(-4);
  }
  function waitlist() {
    document.querySelectorAll('form[data-waitlist]').forEach(function (form) {
      var msg = form.parentNode.querySelector('.form-msg');
      var saved = store('waitlist');
      if (saved && msg) msg.textContent = 'Sıradasın' + (saved.name ? ', ' + saved.name : '') + ' — sıra numaran #' + saved.no + '. Kapı açıldığında ilk sen bileceksin.';
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = (form.querySelector('[type=email]') || {}).value || '';
        var nameEl = form.querySelector('[name=name]');
        var name = nameEl ? nameEl.value.trim() : '';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { if (msg) msg.textContent = 'Lütfen geçerli bir e-posta adresi yaz.'; return; }
        var entry = { email: email.trim(), name: name, no: queueNo(email.trim().toLowerCase()), at: new Date().toISOString() };
        var btn = form.querySelector('[type=submit]');
        var done = function () {
          store('waitlist', entry);
          if (msg) msg.textContent = 'Teşekkürler' + (name ? ', ' + name : '') + '! Sıra numaran #' + entry.no + '. Kilerin kapısı açıldığında ilk sen bileceksin.';
          form.reset();
        };
        if (WAITLIST_ENDPOINT) {
          fetch(WAITLIST_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(entry) })
            .catch(function () {});
        }
        if (btn) dissolve(btn, done); else done();
      });
    });
  }

  // ---------- jars in the page ----------
  function renderJars() {
    var J = window.JAMS || [];
    document.querySelectorAll('[data-jar]').forEach(function (el) {
      var jam = J[+el.getAttribute('data-jar') - 1];
      if (jam) el.innerHTML = jarSVG(jam, { width: +el.getAttribute('data-width') || 96 });
    });
  }

  window.Recelim = { jarSVG: jarSVG, toast: toast, dissolve: dissolve, store: store };

  function init() {
    nav(); reveal(); waitlist(); renderJars(); motes();
    var y = document.querySelector('[data-year]'); if (y) y.textContent = new Date().getFullYear();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
