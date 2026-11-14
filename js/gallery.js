/* Terra Nova — NASA image gallery (additive module; original scripts untouched).
   Watches #tnxDetail (rendered by analogs.js) and appends a gallery for the site being shown. */
(function () {
  var G = window.TN_GALLERY; if (!G) return;
  var host = document.getElementById("tnxDetail"); if (!host) return;
  var LI = function () { var l = document.documentElement.lang; return l === "ar" ? 1 : l === "fr" ? 2 : 0; };
  var tx = function (a) { return Array.isArray(a) ? a[LI()] : a; };
  var u = function (k) { return G.ui[k][LI()]; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  /* the original site photos (assets/analogs/*) stay in the gallery, clearly labelled as project images — never as NASA */
  function projectItem(id) {
    var A = window.TN_ANALOGS; if (!A) return null;
    var st = A.sites.filter(function (x) { return x.id === id; })[0]; if (!st) return null;
    return { id: "proj-" + id, cat: "project", proj: true, src: st.img.local, page: null, title: st.name, desc: G.ui.projnote, credit: u("projnote") };
  }
  var curSite = null, flat = [], idx = 0, box = null, lastFocus = null;

  function figure(it, n) {
    var d = it.date ? '<span class="tng-meta"><b>' + esc(tx(G.dateKeys[it.date.k])) + ':</b> ' + esc(tx(it.date.v)) + '</span>' : "";
    var pid = it.pia ? '<span class="tng-meta"><b>' + u("id") + ':</b> ' + esc(it.pia) + '</span>' : "";
    return '<figure class="tng-card" data-i="' + n + '">' +
      '<button type="button" class="tng-thumb" data-open="' + n + '" aria-label="' + esc(tx(it.title)) + ' — ' + u("full") + '">' +
      '<img src="' + esc(it.src) + '" alt="' + esc(tx(it.title)) + '" loading="lazy" decoding="async" referrerpolicy="no-referrer"><span class="tng-earth' + (it.proj ? ' tng-earth--proj' : '') + '">' + (it.proj ? u("proj") : u("earth")) + '</span></button>' +
      '<figcaption><h5>' + esc(tx(it.title)) + '</h5><p>' + esc(tx(it.desc)) + '</p>' +
      (it.proj ? '' : '<p class="tng-credit"><b>' + u("credit") + ':</b> ' + esc(it.credit) + '</p>') + '<p class="tng-metas">' + d + pid + '</p>' +
      (it.page ? '<a class="tng-src" href="' + esc(it.page) + '" target="_blank" rel="noopener noreferrer">' + u("view") + ' ↗</a>' : '') + '</figcaption></figure>';
  }

  function compareHTML(b, a, nb, na) {
    return '<figure class="tng-card tng-card--cmp"><div class="tng-cmp" style="--p:50%">' +
      '<img class="tng-cmp__a" src="' + esc(a.src) + '" alt="' + esc(tx(a.title)) + '" loading="lazy" decoding="async" referrerpolicy="no-referrer">' +
      '<div class="tng-cmp__b"><img src="' + esc(b.src) + '" alt="' + esc(tx(b.title)) + '" loading="lazy" decoding="async" referrerpolicy="no-referrer"></div>' +
      '<span class="tng-cmp__tag tng-cmp__tag--b">' + u("before") + ' · ' + esc(tx(b.date.v)) + '</span><span class="tng-cmp__tag tng-cmp__tag--a">' + u("after") + ' · ' + esc(tx(a.date.v)) + '</span>' +
      '<span class="tng-earth">' + u("earth") + '</span><i class="tng-cmp__bar" aria-hidden="true"></i>' +
      '<input type="range" min="0" max="100" value="50" aria-label="' + esc(u("slider")) + '"></div>' +
      '<figcaption><h5>' + esc(tx(b.title).split(" — ")[0]) + ' — ' + u("before") + ' / ' + u("after") + '</h5><p>' + esc(tx(b.desc)) + ' ' + esc(tx(a.desc)) + '</p>' +
      '<p class="tng-credit"><b>' + u("credit") + ':</b> ' + esc(b.credit) + '</p>' +
      '<p class="tng-actions"><button type="button" class="tng-btn" data-open="' + nb + '">' + u("before") + ' ⛶</button><button type="button" class="tng-btn" data-open="' + na + '">' + u("after") + ' ⛶</button>' +
      '<a class="tng-src" href="' + esc(b.page) + '" target="_blank" rel="noopener noreferrer">' + u("view") + ' ↗</a></p></figcaption></figure>';
  }

  function build(id) {
    var s = G.sites[id] || { items: [] }, items = (s.items || []).slice(), nasa = items.length, pr = projectItem(id);
    if (pr) items.push(pr);
    flat = []; var groups = {};
    G.order.forEach(function (c) { items.forEach(function (it) { if (it.cat === c) { it._n = flat.length; flat.push(it); (groups[c] = groups[c] || []).push(it); } }); });
    var html = '<div class="tng-head"><h4>' + u("title") + '</h4><p>' + u("sub") + '</p></div>';
    if (!nasa) html += '<p class="tng-empty">' + esc(u("none")) + '</p>';
    if (flat.length) {
      if (s.note && nasa) html += '<p class="tng-note">' + esc(tx(s.note)) + '</p>';
      G.order.forEach(function (c) {
        var g = groups[c]; if (!g) return;
        html += '<section class="tng-group"><h5 class="tng-cat">' + esc(tx(G.cats[c])) + '</h5><div class="tng-grid">';
        var done = {};
        g.forEach(function (it) {
          if (it.pair) {
            if (done[it.pair]) return; done[it.pair] = 1;
            var b = g.filter(function (x) { return x.pair === it.pair && x.side === "before"; })[0], a = g.filter(function (x) { return x.pair === it.pair && x.side === "after"; })[0];
            html += compareHTML(b, a, b._n, a._n);
          } else html += figure(it, it._n);
        });
        html += '</div></section>';
      });
    }
    if (s.links && s.links.length) html += '<div class="tng-more"><h5>' + u("more") + '</h5>' + s.links.map(function (l) { return '<a class="tng-src" href="' + esc(l.u) + '" target="_blank" rel="noopener noreferrer">' + esc(tx(l.t)) + ' ↗</a>'; }).join("") + '</div>';
    return html;
  }

  var busy = false;
  function inject() {
    if (busy) return;
    var g = host.querySelector("[data-globe]"); if (!g) return;
    var id = g.getAttribute("data-globe");
    var old = host.querySelector(".tng"); if (old) { if (old.dataset.site === id && old.dataset.lang === document.documentElement.lang) return; old.remove(); }
    busy = true; curSite = id;
    var sec = document.createElement("section"); sec.className = "tng"; sec.dataset.site = id; sec.dataset.lang = document.documentElement.lang;
    sec.innerHTML = build(id); host.appendChild(sec);
    $$(sec, ".tng-thumb img").forEach(function (im) { im.addEventListener("error", function () { fail(im); }); });
    $$(sec, ".tng-cmp img").forEach(function (im) { im.addEventListener("error", function () { fail(im); }); });
    $$(sec, ".tng-cmp input").forEach(function (r) { r.addEventListener("input", function () { r.parentNode.style.setProperty("--p", r.value + "%"); }); });
    setTimeout(function () { busy = false; }, 0);
  }
  function $$(r, s) { return Array.prototype.slice.call(r.querySelectorAll(s)); }
  /* a broken link is never replaced by another picture — only a notice + the NASA page stays */
  function fail(im) {
    var p = im.closest(".tng-thumb, .tng-cmp"); if (!p || p.dataset.failed) return; p.dataset.failed = "1";
    var m = document.createElement("span"); m.className = "tng-fail"; m.textContent = u("fail"); im.replaceWith(m);
  }
  new MutationObserver(function () { inject(); }).observe(host, { childList: true });
  inject();
  document.addEventListener("tn:lang", function () { closeBox(); setTimeout(inject, 0); });

  /* ───── fullscreen viewer ───── */
  function mount() {
    if (box) return;
    box = document.createElement("div"); box.className = "tng-box"; box.hidden = true; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true");
    box.innerHTML = '<button type="button" class="tng-x" data-act="close"></button><button type="button" class="tng-nav tng-nav--p" data-act="prev"></button><button type="button" class="tng-nav tng-nav--n" data-act="next"></button>' +
      '<div class="tng-stage"><img alt="" referrerpolicy="no-referrer"><span class="tng-fail" hidden></span></div><div class="tng-cap"></div>';
    document.body.appendChild(box);
    box.addEventListener("click", function (e) {
      var a = e.target.closest("[data-act]"); if (a) { var k = a.dataset.act; k === "close" ? closeBox() : go(k === "next" ? 1 : -1); return; }
      if (e.target === box || e.target.classList.contains("tng-stage")) closeBox();
    });
    var x0 = null;
    box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); });
    box.querySelector("img").addEventListener("error", function () { box.querySelector(".tng-fail").hidden = false; box.querySelector("img").hidden = true; box.querySelector(".tng-fail").textContent = u("fail"); });
  }
  function show() {
    var it = flat[idx]; if (!it) return;
    var im = box.querySelector("img"), f = box.querySelector(".tng-fail"); f.hidden = true; im.hidden = false; im.src = it.src; im.alt = tx(it.title);
    box.querySelector(".tng-x").setAttribute("aria-label", u("close")); box.querySelector(".tng-nav--p").setAttribute("aria-label", u("prev")); box.querySelector(".tng-nav--n").setAttribute("aria-label", u("next"));
    var d = it.date ? ' · ' + esc(tx(G.dateKeys[it.date.k])) + ': ' + esc(tx(it.date.v)) : "";
    box.querySelector(".tng-cap").innerHTML = '<b>' + esc(tx(it.title)) + '</b><span>' + (it.proj ? "" : esc(tx(it.desc))) + '</span><small>' + (it.proj ? esc(it.credit) : u("credit") + ': ' + esc(it.credit) + d + (it.pia ? ' · ' + u("id") + ': ' + esc(it.pia) : "")) + '</small>' +
      '<em>' + (idx + 1) + ' ' + u("of") + ' ' + flat.length + '</em>' + (it.page ? '<a class="tng-src" href="' + esc(it.page) + '" target="_blank" rel="noopener noreferrer">' + u("view") + ' ↗</a>' : "");
    box.classList.toggle("is-single", flat.length < 2);
  }
  function openBox(n) {
    mount(); idx = n; lastFocus = document.activeElement; box.hidden = false; document.documentElement.classList.add("tng-lock"); show(); box.querySelector(".tng-x").focus();
  }
  function closeBox() { if (!box || box.hidden) return; box.hidden = true; document.documentElement.classList.remove("tng-lock"); box.querySelector("img").removeAttribute("src"); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  function go(d) { if (flat.length < 2) return; idx = (idx + d + flat.length) % flat.length; show(); }
  document.addEventListener("click", function (e) { var t = e.target.closest && e.target.closest(".tng [data-open]"); if (t) openBox(+t.dataset.open); });
  document.addEventListener("keydown", function (e) {
    if (!box || box.hidden) return;
    var rtl = document.documentElement.dir === "rtl";
    if (e.key === "Escape") closeBox(); else if (e.key === "ArrowRight") go(rtl ? -1 : 1); else if (e.key === "ArrowLeft") go(rtl ? 1 : -1);
  });
})();