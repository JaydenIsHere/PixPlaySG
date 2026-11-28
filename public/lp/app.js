/* PixPlay Learning: saves, progress, checklists, copy, share, tracking. Everything is stored on the reader's phone. */
(function () {
  var PL = window.PL || { t: {} };
  var T = PL.t;

  function get(key, fallback) {
    try { var v = localStorage.getItem("pl_" + key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function set(key, val) { try { localStorage.setItem("pl_" + key, JSON.stringify(val)); } catch (e) {} }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var toastEl = $(".toast"), toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 1800);
  }

  // ---- tracking (no-op until a stats URL is configured)
  var sid = get("sid", null);
  if (!sid) { sid = Math.random().toString(36).slice(2, 10); set("sid", sid); }
  function track(event, label) {
    if (!PL.track) return;
    var data = JSON.stringify({ event: event, label: label || "", page: "@pl/" + location.pathname, lang: PL.lang,
      ref: new URLSearchParams(location.search).get("from") || "", session: sid, ts: Date.now() });
    try { navigator.sendBeacon ? navigator.sendBeacon(PL.track, data) : fetch(PL.track, { method: "POST", body: data, mode: "no-cors", keepalive: true }); } catch (e) {}
  }
  track("view");

  // ---- done + progress
  var done = get("done", []);
  function isDone(slug) { return done.indexOf(slug) >= 0; }
  function paintProgress() {
    $$("[data-progress]").forEach(function (el) {
      var slugs = el.getAttribute("data-progress").split(",").filter(Boolean);
      var n = slugs.filter(isDone).length, total = +el.getAttribute("data-total") || slugs.length;
      var pct = total ? Math.round(100 * n / total) : 0;
      el.style.setProperty("--p", pct);
      var bar = $(".bar i", el); if (bar) bar.style.width = pct + "%";
      $(".prog-t", el).textContent = el.classList.contains("ring") ? n + "/" + total : n + "/" + total + " " + (T.done_of || "done");
    });
    $$("[data-row]").forEach(function (el) { el.classList.toggle("is-done", isDone(el.getAttribute("data-row"))); });
    $$("[data-done]").forEach(function (b) {
      var d = isDone(b.getAttribute("data-done"));
      b.classList.toggle("is-done", d);
      b.textContent = d ? b.getAttribute("data-donelabel") : b.getAttribute("data-label");
    });
  }
  $$("[data-done]").forEach(function (b) {
    b.addEventListener("click", function () {
      var slug = b.getAttribute("data-done");
      if (isDone(slug)) done = done.filter(function (s) { return s !== slug; });
      else { done.push(slug); track("done", slug); if (navigator.vibrate) navigator.vibrate(30); }
      set("done", done); paintProgress();
    });
  });

  // ---- saves
  var saved = get("saved", []);
  function paintSaves() {
    $$("[data-save]").forEach(function (b) {
      var on = saved.indexOf(b.getAttribute("data-save")) >= 0;
      b.classList.toggle("on", on);
      $("span", b).textContent = on ? T.saved : T.save;
    });
    $$("[data-saved-link]").forEach(function (tab) {
      var dot = $(".dot", tab);
      if (saved.length) { if (!dot) { dot = document.createElement("span"); dot.className = "dot"; tab.appendChild(dot); } dot.textContent = saved.length; }
      else if (dot) dot.remove();
    });
  }
  $$("[data-save]").forEach(function (b) {
    b.addEventListener("click", function () {
      var slug = b.getAttribute("data-save"), i = saved.indexOf(slug);
      if (i >= 0) saved.splice(i, 1); else { saved.unshift(slug); track("save", slug); toast("✓ " + T.saved); }
      set("saved", saved); paintSaves();
    });
  });

  // ---- saved page list
  var list = $("[data-saved-list]");
  if (list) {
    var tpl = $("#row-tpl");
    var rows = {};
    if (tpl) $$("[data-row]", tpl.content).forEach(function (r) { rows[r.getAttribute("data-row")] = r; });
    var shown = 0;
    saved.forEach(function (slug) { if (rows[slug]) { list.appendChild(rows[slug].cloneNode(true)); shown++; } });
    $("[data-saved-empty]").hidden = shown > 0;
  }

  // ---- library filter chips (?type=compare preselects)
  var chipsEl = $$("[data-filter]");
  function applyFilter(type) {
    chipsEl.forEach(function (c) { c.classList.toggle("on", c.getAttribute("data-filter") === type); });
    $$("[data-filtered] [data-type]").forEach(function (card) { card.hidden = type !== "all" && card.getAttribute("data-type") !== type; });
  }
  if (chipsEl.length) {
    chipsEl.forEach(function (c) { c.addEventListener("click", function () {
      var type = c.getAttribute("data-filter"); applyFilter(type);
      try { history.replaceState(null, "", type === "all" ? location.pathname : "?type=" + type); } catch (e) {}
    }); });
    var want = new URLSearchParams(location.search).get("type");
    if (want && $('[data-filter="' + want + '"]')) applyFilter(want);
  }

  // ---- continue where you left off
  var guideEl = $("[data-guide]");
  if (guideEl) set("last", guideEl.getAttribute("data-guide"));
  var cont = $("[data-continue]"), idxEl = $("#pl-index");
  if (cont && idxEl) {
    var last = get("last", null), index = [];
    try { index = JSON.parse(idxEl.textContent); } catch (e) {}
    var g = index.filter(function (x) { return x.slug === last; })[0];
    if (g && !isDone(g.slug)) {
      var a = $("a", cont); a.href = g.url; $(".cont-t", cont).textContent = g.title; cont.hidden = false;
    }
  }

  // ---- checklists
  var checks = get("checks", {});
  $$("[data-chk]").forEach(function (box) {
    var id = box.getAttribute("data-chk");
    box.checked = !!checks[id];
    box.addEventListener("change", function () { checks[id] = box.checked; set("checks", checks); });
  });

  // ---- copy
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (ok) {
      var ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} ta.remove(); ok();
    });
  }
  $$(".copy-btn").forEach(function (b) {
    var label = b.textContent;
    b.addEventListener("click", function () {
      var pre = b.closest(".copybox").querySelector("pre");
      copyText(pre.textContent).then(function () {
        b.textContent = b.getAttribute("data-copied"); b.classList.add("ok");
        setTimeout(function () { b.textContent = label; b.classList.remove("ok"); }, 1600);
        track("copy", (guideEl && guideEl.getAttribute("data-guide")) || "");
      });
    });
  });

  // ---- share
  $$("[data-share]").forEach(function (b) {
    b.addEventListener("click", function () {
      var data = { title: document.title, url: location.href.split("#")[0].split("?")[0] };
      track("share", (guideEl && guideEl.getAttribute("data-guide")) || location.pathname);
      if (navigator.share) { navigator.share(data).catch(function () {}); return; }
      copyText(data.url).then(function () { toast(T.copied); });
    });
  });

  // ---- outbound tool clicks + language choice
  $$("[data-out]").forEach(function (a) { a.addEventListener("click", function () { track("click", a.getAttribute("data-out")); }); });
  $$("[data-lang-switch]").forEach(function (a) { a.addEventListener("click", function () { set("lang", a.getAttribute("data-lang-switch")); }); });

  // ---- slideshow: swipe, dots, auto-advance (paused on touch/hover, off for reduced motion)
  $$("[data-show]").forEach(function (show) {
    var track = $(".slides", show), dots = $$(".sdot", show), n = dots.length, i = 0, timer = null;
    function go(k) { i = (k + n) % n; track.scrollTo({ left: track.clientWidth * i, behavior: "smooth" }); }
    function paint() {
      i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
      dots.forEach(function (d, k) { d.classList.toggle("on", k === i); });
    }
    track.addEventListener("scroll", function () { window.requestAnimationFrame(paint); }, { passive: true });
    dots.forEach(function (d) { d.addEventListener("click", function () { go(+d.getAttribute("data-slide")); restart(); }); });
    var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function restart() { clearInterval(timer); if (!still) timer = setInterval(function () { go(i + 1); }, 4000); }
    ["touchstart", "mouseenter"].forEach(function (e) { show.addEventListener(e, function () { clearInterval(timer); }, { passive: true }); });
    show.addEventListener("mouseleave", restart);
    restart();
  });

  // ---- tool finder
  var fd = $("[data-finder]"), fdData = $("#fd-data");
  if (fd && fdData) {
    var D = JSON.parse(fdData.textContent), steps = $$(".fd-step", fd), cur = 0;
    function show(n) { cur = n; steps.forEach(function (s, i) { s.hidden = i !== n; }); $(".fd-result", fd).hidden = true; window.scrollTo({ top: fd.offsetTop - 80, behavior: "smooth" }); }
    $$("[data-next]", fd).forEach(function (b) { b.addEventListener("click", function () {
      if (cur === 0 && !$$('input[name="goal"]:checked', fd).length) { $(".fd-err", fd).hidden = false; return; }
      $(".fd-err", fd).hidden = true; show(cur + 1);
    }); });
    $$("[data-back]", fd).forEach(function (b) { b.addEventListener("click", function () { show(cur - 1); }); });
    $("[data-again]", fd).addEventListener("click", function () { $$("input[type=checkbox]", fd).forEach(function (c) { c.checked = false; }); show(0); });
    $("[data-results]", fd).addEventListener("click", function () {
      var goals = $$('input[name="goal"]:checked', fd).map(function (c) { return c.value; });
      var tech = ($('input[name="tech"]:checked', fd) || {}).value, budget = ($('input[name="budget"]:checked', fd) || {}).value;
      var score = {}, why = {};
      goals.forEach(function (g) { (D.map[g] || []).forEach(function (k, i) {
        var t = D.tools[k], s = 10 - i * 3;
        if (t.tech && tech === "beg") s -= 4;
        if (t.tech && tech === "tech") s += 2;
        if (t.paid && budget === "free") s -= 3;
        score[k] = (score[k] || 0) + s; (why[k] = why[k] || []).push(D.goals[g]);
      }); });
      var keys = Object.keys(score).sort(function (a, b) { return score[b] - score[a]; }).slice(0, 5);
      var list = $(".fd-list", fd); list.innerHTML = "";
      keys.forEach(function (k, i) {
        var t = D.tools[k], el = document.createElement("a");
        el.className = "fd-card" + (i === 0 ? " best" : ""); el.href = t.url;
        el.innerHTML = '<img src="' + t.logo + '" width="48" height="48" alt="">' +
          '<span class="fd-card-b"><b></b><small class="fd-tag"></small><small class="fd-why"></small><small class="fd-plan"></small></span><span class="fd-go">' + D.t.read + ' →</span>';
        $("b", el).textContent = t.name + (t.use ? " · " + D.t.we_use : "");
        $(".fd-tag", el).textContent = t.tag;
        $(".fd-why", el).textContent = "✓ " + D.t.why + "：" + why[k].join(" / ");
        $(".fd-plan", el).textContent = "💳 " + t.plan;
        list.appendChild(el);
      });
      steps.forEach(function (s) { s.hidden = true; }); $(".fd-result", fd).hidden = false;
      track("finder", goals.join("+") + "|" + tech + "|" + budget);
      window.scrollTo({ top: fd.offsetTop - 80, behavior: "smooth" });
    });
  }

  // ---- newsletter form: show a thank-you after submit (Kit opens its confirmation in a new tab)
  $$("[data-nl]").forEach(function (f) { f.addEventListener("submit", function () {
    track("subscribe", location.pathname);
    setTimeout(function () { f.hidden = true; var ok = f.parentNode.querySelector(".nl-ok"); if (ok) ok.hidden = false; }, 300);
  }); });

  // close the mobile menu after picking a link
  $$(".menu-p a").forEach(function (a) { a.addEventListener("click", function () { var m = a.closest("details"); if (m) m.open = false; }); });

  paintProgress(); paintSaves();
})();
