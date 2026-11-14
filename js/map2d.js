/* Terra Nova — 2D interactive map (Mapbox GL JS). Additive: adds a "3D Globe | 2D Map" switch on top of the existing globe.
   The Cesium globe is left running untouched; this only shows/hides it.
   Put your public Mapbox token in js/config.js → TN_CONFIG.MAPBOX_TOKEN. Without a token the map still works on OpenStreetMap tiles. */
(function () {
  var D = window.TN_ANALOGS, wrap = document.getElementById("globeWrap"); if (!D || !wrap) return;
  var CFG = window.TN_CONFIG || {}, TOKEN = CFG.MAPBOX_TOKEN || "", VER = "v1.13.3";
  var LI = function () { var l = document.documentElement.lang; return l === "ar" ? 1 : l === "fr" ? 2 : 0; };
  var tx = function (a) { return Array.isArray(a) ? a[LI()] : a; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var T = {
    globe: ["3D Globe", "الكرة 3D", "Globe 3D"], map: ["2D Map", "خريطة 2D", "Carte 2D"],
    sat: ["Satellite", "قمر صناعي", "Satellite"], street: ["Streets", "شوارع", "Rues"],
    loading: ["Loading the map…", "جارٍ تحميل الخريطة…", "Chargement de la carte…"],
    fail: ["The map could not be loaded. Check your connection and try again.", "تعذّر تحميل الخريطة. تأكد من الاتصال وحاول مجدداً.", "Impossible de charger la carte. Vérifiez votre connexion."],
    retry: ["Try again", "حاول مجدداً", "Réessayer"], details: ["Details ↓", "التفاصيل ↓", "Détails ↓"],
    km: ["km", "كم", "km"], aria: ["Map view", "عرض الخريطة", "Affichage de la carte"]
  };
  var t = function (k) { return T[k][LI()]; };
  var COLORS = { moon: "#b9c7f2", mars: "#ff8a5c", both: "#e3a6ff" };
  var worldKey = function (s) { return s.worlds.length > 1 ? "both" : s.worlds[0]; };
  var byId = {}; D.sites.forEach(function (s) { byId[s.id] = s; });

  /* ── switch (top of the map) ── */
  var bar = document.createElement("div"); bar.className = "tn2d-bar"; bar.setAttribute("role", "group");
  bar.innerHTML = '<button type="button" data-v="globe" class="is-on"></button><button type="button" data-v="map"></button>';
  var pane = document.createElement("div"); pane.className = "tn2d"; pane.hidden = true;
  pane.innerHTML = '<div class="tn2d__map" id="tn2dMap"></div><div class="tn2d__state" id="tn2dState"><span></span><button type="button" class="btn btn--ghost" hidden></button></div>' +
    '<div class="tn2d__style"><button type="button" data-s="sat" class="is-on"></button><button type="button" data-s="street"></button></div>';
  wrap.appendChild(bar); wrap.appendChild(pane);
  var stState = pane.querySelector(".tn2d__state"), stMsg = stState.querySelector("span"), stBtn = stState.querySelector("button");
  function labels() {
    bar.setAttribute("aria-label", t("aria")); bar.children[0].textContent = "🌍 " + t("globe"); bar.children[1].textContent = "🗺️ " + t("map");
    var sb = pane.querySelector(".tn2d__style"); sb.children[0].textContent = t("sat"); sb.children[1].textContent = t("street"); stBtn.textContent = t("retry");
  }
  labels();

  var map = null, mk = {}, view = "globe", loading = false, styleKey = "sat";
  function load(cb) {
    if (window.mapboxgl) return cb(true);
    if (loading) return; loading = true;
    var base = "https://api.mapbox.com/mapbox-gl-js/" + VER + "/mapbox-gl";
    var l = document.createElement("link"); l.rel = "stylesheet"; l.href = base + ".css"; document.head.appendChild(l);
    var s = document.createElement("script"); s.src = base + ".js"; s.async = true;
    s.onload = function () { loading = false; cb(true); }; s.onerror = function () { loading = false; s.remove(); cb(false); };
    document.head.appendChild(s);
  }
  function styleFor(k) {
    if (TOKEN) return k === "sat" ? "mapbox://styles/mapbox/satellite-streets-v11" : "mapbox://styles/mapbox/streets-v11";
    return { version: 8, sources: { osm: { type: "raster", tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"], tileSize: 256, maxzoom: 19, attribution: "© OpenStreetMap contributors" } }, layers: [{ id: "osm", type: "raster", source: "osm" }] };
  }
  function pin(s) {
    var el = document.createElement("button"); el.type = "button"; el.className = "tn2d-pin"; el.style.setProperty("--c", COLORS[worldKey(s)]);
    el.setAttribute("aria-label", tx(s.name)); el.innerHTML = "<i></i>"; return el;
  }
  function popupHTML(s) {
    return '<div class="tn2d-pop"><b>' + esc(tx(s.name)) + '</b><small>' + esc(tx(s.place)) + '</small></div>';
  }
  function build() {
    if (TOKEN) mapboxgl.accessToken = TOKEN;
    map = new mapboxgl.Map({ container: "tn2dMap", style: styleFor(styleKey), center: [10, 30], zoom: 1.6, minZoom: 1, attributionControl: true, cooperativeGestures: false });
    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: false }), "top-right");
    map.addControl(new mapboxgl.FullscreenControl({ container: pane }), "top-right");
    map.addControl(new mapboxgl.ScaleControl({ maxWidth: 110 }), "bottom-left");
    D.sites.forEach(function (s) {
      var el = pin(s), m = new mapboxgl.Marker({ element: el, anchor: "center" }).setLngLat([s.lon, s.lat]).addTo(map);
      el.addEventListener("click", function (e) { e.stopPropagation(); choose(s.id, true); });
      mk[s.id] = { m: m, el: el, pop: new mapboxgl.Popup({ offset: 16, closeButton: false, maxWidth: "240px" }) };
    });
    map.on("styledata", function () { restoreLine(); });
    map.on("error", function (e) { if (e && e.error && /Unauthorized|401|token/i.test(String(e.error.message))) fallbackNoToken(); });
  }
  function fallbackNoToken() { if (!TOKEN) return; TOKEN = ""; try { map.setStyle(styleFor(styleKey)); } catch (e) {} }
  function show(v) {
    view = v; var m = v === "map";
    wrap.classList.toggle("is-2d", m); pane.hidden = !m;
    Array.prototype.forEach.call(bar.children, function (b) { b.classList.toggle("is-on", b.dataset.v === v); });
    if (!m) { var g = document.getElementById("globe"); window.dispatchEvent(new Event("resize")); return; }
    if (map) { map.resize(); return; }
    stState.hidden = false; stMsg.textContent = t("loading"); stBtn.hidden = true;
    load(function (ok) {
      if (!ok) { stMsg.textContent = t("fail"); stBtn.hidden = false; return; }
      try { build(); } catch (e) { stMsg.textContent = t("fail"); stBtn.hidden = false; return; }
      if (window.ResizeObserver) new ResizeObserver(function () { if (map) map.resize(); }).observe(pane);
      requestAnimationFrame(function () { map.resize(); setTimeout(function () { map && map.resize(); }, 300); });
      map.once("load", function () { stState.hidden = true; map.resize(); var cur = currentId(); if (cur) focus(cur, true); });
      setTimeout(function () { if (map && map.loaded()) stState.hidden = true; }, 4000);
    });
  }
  stBtn.addEventListener("click", function () { show("map"); });
  bar.addEventListener("click", function (e) { var b = e.target.closest("[data-v]"); if (b && b.dataset.v !== view) show(b.dataset.v); });
  pane.querySelector(".tn2d__style").addEventListener("click", function (e) {
    var b = e.target.closest("[data-s]"); if (!b || !map) return; styleKey = b.dataset.s;
    Array.prototype.forEach.call(b.parentNode.children, function (x) { x.classList.toggle("is-on", x === b); });
    if (TOKEN) map.setStyle(styleFor(styleKey));
  });

  /* ── selection: keep the 2D map and the existing site logic in sync ── */
  var selId = null, lineData = null;
  function currentId() { return selId; }
  function focus(id, quick) {
    var s = byId[id]; if (!s || !map) return; selId = id;
    Object.keys(mk).forEach(function (k) { mk[k].el.classList.toggle("is-on", k === id); mk[k].pop.remove(); });
    map.flyTo({ center: [s.lon, s.lat], zoom: Math.max(map.getZoom(), 5.5), speed: 1.4, duration: quick ? 0 : 1800, essential: true });
    mk[id].pop.setLngLat([s.lon, s.lat]).setHTML(popupHTML(s)).addTo(map);
  }
  function choose(id, fromMap) {
    selId = id;
    var li = document.querySelector('.tn-li[data-pick="' + id + '"]');
    if (li) li.click(); /* runs the site's own select(): detail panel, card, globe fly */
    if (map) focus(id);
  }
  /* clicks made elsewhere on the page. In 2D mode "Show on globe" / compare must stay on the map: no long scroll through the home screen. */
  function toMap() { var el = document.getElementById("globeWrap"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }
  document.addEventListener("click", function (e) {
    if (view !== "map") return;
    var g = e.target.closest("#site [data-globe]");
    if (g) { e.stopPropagation(); var id = g.dataset.globe, li = document.querySelector('.tn-li[data-pick="' + id + '"]'); if (li) li.click(); toMap(); clearLine(); setTimeout(function () { map && focus(id); }, 350); return; }
    if (e.target.closest("#site [data-pair]")) {
      e.stopPropagation(); var a = document.querySelector('#tnxH2H [data-sel="a"]'), b = document.querySelector('#tnxH2H [data-sel="b"]');
      if (a && b) { toMap(); setTimeout(function () { pair(a.value, b.value); }, 350); } return;
    }
  }, true);
  document.addEventListener("click", function (e) {
    var p = e.target.closest(".tn-li[data-pick]"); if (p && map && view === "map") { clearLine(); setTimeout(function () { focus(p.dataset.pick); }, 0); }
  });

  function km(a, b) { var R = 6371, r = Math.PI / 180, x = (b.lat - a.lat) * r, y = (b.lon - a.lon) * r, h = Math.sin(x / 2) * Math.sin(x / 2) + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(y / 2) * Math.sin(y / 2); return 2 * R * Math.asin(Math.sqrt(h)); }
  function arc(a, b) { var pts = [], n = 64, r = Math.PI / 180, f1 = a.lat * r, l1 = a.lon * r, f2 = b.lat * r, l2 = b.lon * r, d = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((f2 - f1) / 2), 2) + Math.cos(f1) * Math.cos(f2) * Math.pow(Math.sin((l2 - l1) / 2), 2)));
    for (var i = 0; i <= n; i++) { var k = i / n, A = Math.sin((1 - k) * d) / Math.sin(d), B = Math.sin(k * d) / Math.sin(d), x = A * Math.cos(f1) * Math.cos(l1) + B * Math.cos(f2) * Math.cos(l2), y = A * Math.cos(f1) * Math.sin(l1) + B * Math.cos(f2) * Math.sin(l2), z = A * Math.sin(f1) + B * Math.sin(f2); pts.push([Math.atan2(y, x) / r, Math.atan2(z, Math.sqrt(x * x + y * y)) / r]); }
    return pts; }
  function drawLine() {
    if (!map || !lineData) return;
    if (map.getSource("tn2d-line")) { map.getSource("tn2d-line").setData(lineData); return; }
    map.addSource("tn2d-line", { type: "geojson", data: lineData });
    map.addLayer({ id: "tn2d-line", type: "line", source: "tn2d-line", paint: { "line-color": "#ffffff", "line-width": 3, "line-dasharray": [2, 2] } });
  }
  function restoreLine() { if (lineData && map && !map.getSource("tn2d-line")) drawLine(); }
  function clearLine() { lineData = null; if (map && map.getSource("tn2d-line")) { map.removeLayer("tn2d-line"); map.removeSource("tn2d-line"); } }
  function pair(ia, ib) {
    var a = byId[ia], b = byId[ib]; if (!a || !b || !map) return;
    Object.keys(mk).forEach(function (k) { mk[k].pop.remove(); mk[k].el.classList.toggle("is-on", k === ia || k === ib); });
    var pts = arc(a, b); lineData = { type: "Feature", geometry: { type: "LineString", coordinates: pts } }; drawLine();
    var bb = new mapboxgl.LngLatBounds(); pts.forEach(function (c) { bb.extend(c); });
    map.fitBounds(bb, { padding: 80, duration: 1800, maxZoom: 6 });
    new mapboxgl.Popup({ closeButton: false, closeOnClick: true, className: "tn2d-km" }).setLngLat(pts[Math.floor(pts.length / 2)]).setText(Math.round(km(a, b)).toLocaleString("en-US") + " " + t("km")).addTo(map);
  }
  document.addEventListener("tn:lang", function () { labels(); if (map && selId && view === "map") focus(selId, true); });
})();