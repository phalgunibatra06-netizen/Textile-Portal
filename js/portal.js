/* =====================================================================
   UNIFIED TEXTILE PORTAL — LOGIC
   Handles: branding SVGs, landing-page login routing, dashboard
   rendering, the scheme details modal, the (front-end) apply flow,
   search/filter, and logout. No backend, no external dependencies.
   ===================================================================== */
(function () {
  "use strict";

  var DATA = window.PORTAL_DATA || { roles: {}, schemes: {} };

  /* ---------- INLINE BRANDING SVGs (render offline, no images) ------ */
  function chakraSVG() {
    var spokes = "";
    for (var i = 0; i < 24; i++) {
      var a = (i * 15) * Math.PI / 180;
      var x1 = 26 + 5 * Math.cos(a), y1 = 26 + 5 * Math.sin(a);
      var x2 = 26 + 19 * Math.cos(a), y2 = 26 + 19 * Math.sin(a);
      spokes += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) +
                '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) +
                '" stroke="#1c2a4a" stroke-width="1.1"/>';
    }
    return '<svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" aria-label="Ashoka Chakra">' +
      '<circle cx="26" cy="26" r="24" fill="#fff" stroke="#1c2a4a" stroke-width="1.5"/>' +
      '<circle cx="26" cy="26" r="20" fill="none" stroke="#1c2a4a" stroke-width="1.5"/>' +
      spokes +
      '<circle cx="26" cy="26" r="4" fill="#1c2a4a"/></svg>';
  }

  function flagSVG() {
    return '<svg class="flag" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" aria-label="Flag of India">' +
      '<rect width="30" height="6.67" y="0" fill="#ff9933"/>' +
      '<rect width="30" height="6.66" y="6.67" fill="#ffffff"/>' +
      '<rect width="30" height="6.67" y="13.33" fill="#138808"/>' +
      '<circle cx="15" cy="10" r="2.4" fill="none" stroke="#1c2a4a" stroke-width="0.5"/></svg>';
  }

  function digitalIndiaSVG() {
    return '<svg viewBox="0 0 120 34" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<circle cx="17" cy="17" r="14" fill="none" stroke="#ff9933" stroke-width="3"/>' +
      '<path d="M10 17a7 7 0 0 1 14 0" fill="none" stroke="#138808" stroke-width="3"/>' +
      '<circle cx="17" cy="17" r="3" fill="#1c2a4a"/></svg>';
  }

  var ROLE_ICONS = {
    farmer: '<svg viewBox="0 0 64 64" fill="none" stroke="#5c4033" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M32 54V30"/><path d="M32 34c-7 0-12-4-12-11 7 0 12 4 12 11z"/><path d="M32 30c7 0 12-4 12-11-7 0-12 4-12 11z"/><path d="M14 54h36"/><circle cx="46" cy="16" r="5" fill="#b5852f" stroke="none"/></svg>',
    weaver: '<svg viewBox="0 0 64 64" fill="none" stroke="#5c4033" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="12" y="14" width="40" height="36" rx="2"/><path d="M20 14v36M28 14v36M36 14v36M44 14v36"/><path d="M12 26h40M12 38h40" stroke="#b5852f"/></svg>',
    industrialist: '<svg viewBox="0 0 64 64" fill="none" stroke="#5c4033" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 50V28l12 8V28l12 8V22l16 6v22z"/><path d="M12 50h40"/><rect x="20" y="42" width="5" height="8" fill="#b5852f" stroke="none"/><rect x="32" y="42" width="5" height="8" fill="#b5852f" stroke="none"/></svg>',
    student: '<svg viewBox="0 0 64 64" fill="none" stroke="#5c4033" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 26 32 16l24 10-24 10z"/><path d="M18 32v10c0 3 6 6 14 6s14-3 14-6V32"/><path d="M56 26v12" stroke="#b5852f"/></svg>'
  };

  function roleIcon(role) { return ROLE_ICONS[role] || ROLE_ICONS.student; }

  /* ---------- SHARED: inject branding into any page --------------- */
  function paintBranding() {
    // Inject the ministry SVG inline to avoid path/resolving issues and allow styling.
    // Replace the inline ministry SVG with the provided webp image.
    // Please ensure `OIP (6).webp` is placed in the project root or update the path below.
    document.querySelectorAll("[data-brand-mark]").forEach(function (el) {
      el.innerHTML = '<img src="OIP (6).webp" alt="OIP logo" width="52" height="52">';
    });
    document.querySelectorAll("[data-flag]").forEach(function (el) { el.innerHTML = flagSVG(); });
    // Insert user-provided Digital India PNG. Ensure the file `Copilot_20260701_171914.png` is in the project root.
    document.querySelectorAll("[data-digital-india]").forEach(function (el) {
      el.innerHTML = '<img class="digital-logo" src="Copilot_20260701_171914.png" alt="Digital India">';
    });
    document.querySelectorAll("[data-role-icon]").forEach(function (el) {
      el.innerHTML = roleIcon(el.getAttribute("data-role-icon"));
    });
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* =================================================================
     LANDING PAGE
  ================================================================= */
  function initLanding() {
    var loginBtn = document.getElementById("loginBtn");
    if (!loginBtn) return;

    loginBtn.addEventListener("click", function () {
      var role = document.getElementById("roleSelect").value;
      var id = (document.getElementById("beneId").value || "").trim();
      var name = "";
      // If the ID matches a demo profile, greet by that name; else use ID.
      if (DATA.roles[role] && (!id || id.toLowerCase() === "demo")) {
        name = DATA.roles[role].profile.name;
      } else if (id) {
        name = id;
      } else if (DATA.roles[role]) {
        name = DATA.roles[role].profile.name;
      }
      go(role, name);
    });

    // Enter key submits
    ["beneId", "benePass"].forEach(function (fid) {
      var f = document.getElementById(fid);
      if (f) f.addEventListener("keydown", function (e) { if (e.key === "Enter") loginBtn.click(); });
    });

    // Clickable role cards -> straight into that dashboard (demo user)
    document.querySelectorAll("[data-goto]").forEach(function (card) {
      card.addEventListener("click", function () { go(card.getAttribute("data-goto"), ""); });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(card.getAttribute("data-goto"), ""); }
      });
    });
  }

  function go(role, name) {
    var url = role + ".html";
    if (name) url += "?name=" + encodeURIComponent(name);
    window.location.href = url;
  }

  /* =================================================================
     DASHBOARD PAGES
  ================================================================= */
  function initDashboard(role) {
    var cfg = DATA.roles[role];
    if (!cfg) return;

    var params = new URLSearchParams(window.location.search);
    var name = params.get("name") || cfg.profile.name;

    renderBanner(role, cfg, name);
    renderStats(role, cfg);
    renderAvailed(role, cfg);
    renderAvailable(role, cfg);
    wireModal();
    wireLogout();

    var dp = document.getElementById("provDismiss");
    if (dp) dp.addEventListener("click", function () {
      var p = document.getElementById("provNote");
      if (p) p.style.display = "none";
    });
  }

  function renderBanner(role, cfg, name) {
    var el = document.getElementById("beneBanner");
    if (!el) return;
    var facts = cfg.profile.fields.map(function (f) {
      return '<div class="fact">' + esc(f[0]) + '<b>' + esc(f[1]) + '</b></div>';
    }).join("");
    el.innerHTML =
      '<div class="bene-avatar" data-role-icon="' + role + '"></div>' +
      '<div class="bene-id">' +
        '<span class="role-tag">' + esc(cfg.label) + '</span>' +
        '<h2>' + esc(name) + '</h2>' +
        '<div class="fact">Beneficiary ID<b>' + esc(cfg.profile.id) + '</b></div>' +
      '</div>' +
      '<div class="bene-facts">' + facts + '</div>';
    // repaint the injected role icon
    var iconEl = el.querySelector("[data-role-icon]");
    if (iconEl) iconEl.innerHTML = roleIcon(role);
  }

  function renderStats(role, cfg) {
    var el = document.getElementById("statsRow");
    if (!el) return;
    var availedIds = Object.keys(cfg.availed || {});
    var availedCount = availedIds.length;
    var availableCount = (cfg.available || []).length;

    // pull the headline sanctioned figure from the first availed scheme
    var sanctioned = "—", disbursed = "—";
    if (availedIds.length) {
      var first = cfg.availed[availedIds[0]];
      sanctioned = first.sanctioned || "—";
      disbursed = first.disbursed || "—";
    }

    el.innerHTML =
      stat(availedCount, "Schemes availed") +
      stat(availableCount, "Schemes you can avail") +
      statText(sanctioned, "Latest sanction", true) +
      statText(disbursed, "Benefit status", true);
  }
  function stat(n, l) { return '<div class="stat"><div class="n">' + n + '</div><div class="l">' + esc(l) + '</div></div>'; }
  function statText(t, l, accent) {
    return '<div class="stat' + (accent ? ' accent' : '') + '">' +
      '<div class="n" style="font-size:15px;line-height:1.25">' + esc(t) + '</div>' +
      '<div class="l">' + esc(l) + '</div></div>';
  }

  function renderAvailed(role, cfg) {
    var wrap = document.getElementById("availedGrid");
    var countEl = document.getElementById("availedCount");
    if (!wrap) return;
    var ids = Object.keys(cfg.availed || {});
    if (countEl) countEl.textContent = ids.length + (ids.length === 1 ? " scheme" : " schemes");

    if (!ids.length) {
      wrap.innerHTML = '<div class="empty">No schemes availed yet. Explore the schemes you can avail below and apply.</div>';
      return;
    }
    wrap.innerHTML = ids.map(function (id) {
      var s = DATA.schemes[id]; if (!s) return "";
      var e = cfg.availed[id];
      var badgeClass = statusClass(e.status);
      return '<article class="scheme-card">' +
        '<div class="scheme-top">' +
          '<div class="monogram" style="background:' + s.accent + '">' + esc(s.monogram) + '</div>' +
          '<div class="who"><h4>' + esc(s.name) + '</h4><div class="full">' + esc(s.full) + '</div></div>' +
        '</div>' +
        '<div class="scheme-body">' +
          '<div style="margin-bottom:10px"><span class="badge ' + badgeClass + '">' + esc(e.status) + '</span></div>' +
          '<div class="kv"><b>Applied on:</b> ' + esc(e.appliedOn) + '</div>' +
          '<div class="kv"><b>Sanctioned:</b> ' + esc(e.sanctioned) + '</div>' +
          '<div class="kv"><b>Disbursed:</b> ' + esc(e.disbursed) + '</div>' +
          '<div class="progress-wrap">' +
            '<div class="progress-label"><span>Progress</span><span>' + e.progress + '%</span></div>' +
            '<div class="bar"><i style="width:' + e.progress + '%"></i></div>' +
          '</div>' +
          '<div class="next"><b>Next:</b> ' + esc(e.nextStep) + '</div>' +
          '<div class="card-actions">' +
            '<button class="btn ghost" data-open="' + id + '">View scheme details</button>' +
          '</div>' +
        '</div></article>';
    }).join("");
  }

  function statusClass(status) {
    var s = (status || "").toLowerCase();
    if (s.indexOf("active") > -1) return "active";
    if (s.indexOf("sanction") > -1) return "sanctioned";
    return "progress";
  }

  function renderAvailable(role, cfg) {
    var wrap = document.getElementById("availableGrid");
    var countEl = document.getElementById("availableCount");
    var ids = (cfg.available || []).slice();
    if (countEl) countEl.textContent = ids.length + (ids.length === 1 ? " scheme" : " schemes");
    if (!wrap) return;

    function draw(list) {
      if (!list.length) {
        wrap.innerHTML = '<div class="empty">No matching schemes. Try a different search term.</div>';
        return;
      }
      wrap.innerHTML = list.map(function (id) {
        var s = DATA.schemes[id]; if (!s) return "";
        var top = (s.benefits || []).slice(0, 3).map(function (b) {
          return '<li>' + esc(b) + '</li>';
        }).join("");
        return '<article class="scheme-card" data-name="' + esc((s.name + " " + s.full + " " + s.tagline).toLowerCase()) + '">' +
          '<div class="scheme-top">' +
            '<div class="monogram" style="background:' + s.accent + '">' + esc(s.monogram) + '</div>' +
            '<div class="who"><h4>' + esc(s.name) + '</h4><div class="full">' + esc(s.full) + '</div></div>' +
          '</div>' +
          '<div class="scheme-body">' +
            '<div class="tagline">' + esc(s.tagline) + '</div>' +
            '<ul class="mini-benefits">' + top + '</ul>' +
            '<div class="card-actions">' +
              '<button class="btn gold" data-open="' + id + '" data-apply="1">Check eligibility &amp; apply</button>' +
            '</div>' +
          '</div></article>';
      }).join("");
    }
    draw(ids);

    var search = document.getElementById("schemeSearch");
    if (search) {
      search.addEventListener("input", function () {
        var q = this.value.trim().toLowerCase();
        if (!q) { draw(ids); return; }
        var filtered = ids.filter(function (id) {
          var s = DATA.schemes[id]; if (!s) return false;
          return (s.name + " " + s.full + " " + s.tagline).toLowerCase().indexOf(q) > -1;
        });
        draw(filtered);
      });
    }
  }

  /* ---------- MODAL ---------- */
  function wireModal() {
    var overlay = document.getElementById("modalOverlay");
    if (!overlay) return;

    // event delegation for all "open" buttons (availed + available)
    document.body.addEventListener("click", function (e) {
      var openBtn = e.target.closest("[data-open]");
      if (openBtn) { openModal(openBtn.getAttribute("data-open"), openBtn.hasAttribute("data-apply")); return; }
      if (e.target.matches("[data-close]") || e.target === overlay) closeModal();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });
  }

  function openModal(id, showApply) {
    var s = DATA.schemes[id];
    var overlay = document.getElementById("modalOverlay");
    if (!s || !overlay) return;

    var benefits = (s.benefits || []).map(function (b) { return '<li>' + esc(b) + '</li>'; }).join("");
    var elig = (s.eligibility || []).map(function (b) { return '<li>' + esc(b) + '</li>'; }).join("");
    var docs = (s.documents || []).map(function (b) { return '<li>' + esc(b) + '</li>'; }).join("");
    var steps = (s.process || []).map(function (b) { return '<li>' + esc(b) + '</li>'; }).join("");

    var applyBlock = showApply ?
      '<div class="apply-form">' +
        '<h5>Apply for ' + esc(s.name) + '</h5>' +
        '<div class="row">' +
          '<div class="field"><label>Full name</label><input type="text" id="af_name" placeholder="Your name"></div>' +
          '<div class="field"><label>Aadhaar / ID number</label><input type="text" id="af_id" placeholder="XXXX-XXXX-XXXX"></div>' +
        '</div>' +
        '<div class="row">' +
          '<div class="field"><label>Mobile number</label><input type="tel" id="af_mob" placeholder="10-digit mobile"></div>' +
          '<div class="field"><label>District / State</label><input type="text" id="af_loc" placeholder="e.g. Surat, Gujarat"></div>' +
        '</div>' +
        '<div class="field" style="margin-bottom:4px"><label>Remarks (optional)</label><input type="text" id="af_note" placeholder="Anything the officer should know"></div>' +
      '</div>' : '';

    var foot = showApply ?
      '<button class="btn ghost" data-close>Cancel</button>' +
      '<button class="btn gold" id="submitApply" data-scheme="' + esc(s.name) + '">Submit application</button>'
      : '<button class="btn" data-close>Close</button>';

    overlay.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true" aria-label="' + esc(s.name) + ' details">' +
        '<div class="modal-head">' +
          '<div class="monogram" style="background:' + s.accent + '">' + esc(s.monogram) + '</div>' +
          '<div><h3>' + esc(s.name) + '</h3><div class="full">' + esc(s.full) + '</div></div>' +
          '<button class="close" data-close aria-label="Close">&times;</button>' +
        '</div>' +
        '<div class="modal-body">' +
          '<div class="meta-row"><span><b>Implementing authority:</b> ' + esc(s.authority) + '</span>' +
            '<span><b>Processing time:</b> ' + esc(s.timeline) + '</span></div>' +
          '<p style="font-size:13px;color:var(--brown-ink)">' + esc(s.tagline) + '</p>' +
          '<h5>Benefits</h5><ul class="check">' + benefits + '</ul>' +
          '<h5>Eligibility</h5><ul class="check">' + elig + '</ul>' +
          '<h5>Documents required</h5><ul class="doc">' + docs + '</ul>' +
          '<h5>How to apply</h5><ol>' + steps + '</ol>' +
          applyBlock +
        '</div>' +
        '<div class="modal-foot">' + foot + '</div>' +
      '</div>';

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";

    var submit = document.getElementById("submitApply");
    if (submit) submit.addEventListener("click", function () {
      closeModal();
      showToast('Application for "' + submit.getAttribute("data-scheme") + '" submitted. Reference: TXT-' + refNo());
    });
  }

  function closeModal() {
    var overlay = document.getElementById("modalOverlay");
    if (!overlay) return;
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  function refNo() {
    return (Date.now() % 1000000).toString().padStart(6, "0");
  }

  /* ---------- TOAST ---------- */
  var toastTimer;
  function showToast(msg) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 4200);
  }

  /* ---------- LOGOUT ---------- */
  function wireLogout() {
    document.querySelectorAll("[data-logout]").forEach(function (b) {
      b.addEventListener("click", function (e) { e.preventDefault(); window.location.href = "index.html"; });
    });
  }

  /* =================================================================
     BOOT
  ================================================================= */
  document.addEventListener("DOMContentLoaded", function () {
    paintBranding();
    var role = document.body.getAttribute("data-role");
    if (role) initDashboard(role);
    else initLanding();
  });
})();
