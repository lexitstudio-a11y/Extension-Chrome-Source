/*
 * Content script : ajoute un badge « groupe » à côté des chaînes YouTube,
 * des comptes X et (en bas de page) des sites médias connus.
 */
(async function () {
  const { buildIndex, lookupYouTube, lookupX, lookupDomain } = globalThis.MOM;
  const { TYPE_COLORS, CARD_CSS, renderCard, el } = globalThis.MOM_CARD;
  const index = buildIndex(globalThis.MOM_DATA);

  const host = location.hostname.toLowerCase().replace(/^www\./, "");
  const platform = /(^|\.)youtube\.com$/.test(host)
    ? "youtube"
    : /(^|\.)(x|twitter)\.com$/.test(host)
    ? "x"
    : "sites";

  if (window.top !== window) return;

  let settings = { youtube: true, x: true, sites: true };
  try {
    settings = Object.assign(settings, await chrome.storage.sync.get(settings));
  } catch (_) {}

  const BADGE_CSS = `
    .pill { all: unset; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;
      font: 600 11px/1 system-ui, sans-serif; color: #fff; padding: 3px 8px; border-radius: 999px;
      margin-left: 6px; vertical-align: middle; white-space: nowrap; max-width: 220px; overflow: hidden; text-overflow: ellipsis; }
    .pill:hover { filter: brightness(1.15); }
    .pill:focus-visible { outline: 2px solid #fff; outline-offset: 1px; }
    .pop { position: fixed; z-index: 2147483647; display: none; }
    .pop.open { display: block; }
  `;

  function createBadge(match, opts) {
    const floating = !!(opts && opts.floating);
    const hostEl = document.createElement("span");
    hostEl.setAttribute("data-mom", "1");
    hostEl.style.cssText = floating
      ? "position:fixed;left:16px;bottom:16px;z-index:2147483646;"
      : "display:inline-block;";
    const root = hostEl.attachShadow({ mode: "open" });
    root.appendChild(el("style", { text: CARD_CSS + BADGE_CSS }));

    const color = TYPE_COLORS[match.group.type] || "#374151";
    const pill = el("button", {
      class: "pill",
      type: "button",
      style: "background:" + color + (floating ? ";margin-left:0;padding:6px 12px;font-size:12px;box-shadow:0 4px 14px rgba(0,0,0,.3)" : ""),
      title: "Qui possède ce média ? Cliquez pour voir les intérêts du groupe",
      "aria-haspopup": "dialog",
      text: (match.approx ? "≈ " : "") + match.group.name,
    });
    const pop = el("div", { class: "pop" }, [renderCard(match)]);
    root.appendChild(pill);
    root.appendChild(pop);

    function place() {
      const r = pill.getBoundingClientRect();
      const w = Math.min(340, window.innerWidth - 24);
      let left = Math.max(12, Math.min(r.left, window.innerWidth - w - 12));
      pop.style.left = left + "px";
      const below = r.bottom + 8;
      const h = pop.firstChild.offsetHeight || 300;
      pop.style.top = (below + h > window.innerHeight ? Math.max(12, r.top - h - 8) : below) + "px";
    }
    function close() {
      pop.classList.remove("open");
      document.removeEventListener("click", onDoc, true);
      document.removeEventListener("keydown", onKey, true);
    }
    function onDoc(ev) {
      if (!ev.composedPath().includes(hostEl)) close();
    }
    function onKey(ev) {
      if (ev.key === "Escape") close();
    }
    pill.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      if (pop.classList.contains("open")) return close();
      pop.classList.add("open");
      place();
      document.addEventListener("click", onDoc, true);
      document.addEventListener("keydown", onKey, true);
    });
    // Évite que YouTube / X traitent le clic comme une navigation.
    ["mousedown", "mouseup", "pointerdown", "pointerup"].forEach((t) => hostEl.addEventListener(t, (e) => e.stopPropagation()));
    return hostEl;
  }

  /** Associe (ou retire) un badge à un élément, en mémorisant la clé pour éviter les doublons. */
  function attach(target, key, match, insert) {
    if (target.getAttribute("data-mom-key") === key) return;
    if (target._momBadge) {
      target._momBadge.remove();
      target._momBadge = null;
    }
    target.setAttribute("data-mom-key", key);
    if (!match) return;
    const badge = createBadge(match);
    target._momBadge = badge;
    insert(badge);
  }

  // ───────────── YouTube ─────────────
  function ytHandle(href) {
    const m = /\/@([^/?#]+)/.exec(href || "");
    return m ? decodeURIComponent(m[1]) : "";
  }

  function scanYouTube() {
    document.querySelectorAll("ytd-channel-name").forEach((node) => {
      const link = node.querySelector("a[href]");
      const handle = ytHandle(link && link.getAttribute("href"));
      const name = (node.textContent || "").trim();
      const match = lookupYouTube(index, { handle, name: handle ? "" : name });
      attach(node, "yt:" + handle + ":" + name, match, (b) => node.after(b));
    });

    document.querySelectorAll("yt-content-metadata-view-model a[href*='/@']").forEach((a) => {
      const handle = ytHandle(a.getAttribute("href"));
      attach(a, "yt:" + handle, lookupYouTube(index, { handle }), (b) => a.after(b));
    });

    // En-tête de page de chaîne
    const pageHandle = ytHandle(location.pathname);
    if (pageHandle) {
      const h1 = document.querySelector("yt-page-header-view-model h1, #channel-header ytd-channel-name h1");
      if (h1 && !h1.closest("ytd-channel-name")) {
        attach(h1, "ytp:" + pageHandle, lookupYouTube(index, { handle: pageHandle }), (b) => h1.appendChild(b));
      }
    }
  }

  // ───────────── X / Twitter ─────────────
  const X_RESERVED = new Set(["home", "explore", "search", "i", "settings", "notifications", "messages", "compose"]);

  function scanX() {
    document.querySelectorAll('[data-testid="User-Name"], [data-testid="UserName"]').forEach((node) => {
      let handle = "";
      node.querySelectorAll('a[href^="/"]').forEach((a) => {
        if (handle) return;
        const m = /^\/([A-Za-z0-9_]{1,15})$/.exec(a.getAttribute("href"));
        if (m && !X_RESERVED.has(m[1].toLowerCase())) handle = m[1];
      });
      if (!handle) {
        const t = /@([A-Za-z0-9_]{1,15})/.exec(node.textContent || "");
        if (t) handle = t[1];
      }
      if (!handle && node.getAttribute("data-testid") === "UserName") {
        const p = /^\/([A-Za-z0-9_]{1,15})(?:\/|$)/.exec(location.pathname);
        if (p && !X_RESERVED.has(p[1].toLowerCase())) handle = p[1];
      }
      if (!handle) return;
      attach(node, "x:" + handle.toLowerCase(), lookupX(index, handle), (b) => {
        b.style.marginLeft = "6px";
        node.appendChild(b);
      });
    });
  }

  // ───────────── Sites médias ─────────────
  function scanSite() {
    if (document.querySelector("body > [data-mom]")) return;
    const match = lookupDomain(index, host);
    if (!match) return;
    const badge = createBadge(match, { floating: true });
    document.body.appendChild(badge);
  }

  // ───────────── Boucle de scan ─────────────
  function reset() {
    document.querySelectorAll("[data-mom]").forEach((n) => n.remove());
    document.querySelectorAll("[data-mom-key]").forEach((n) => {
      n.removeAttribute("data-mom-key");
      n._momBadge = null;
    });
  }

  function scan() {
    if (!settings[platform]) return;
    try {
      if (platform === "youtube") scanYouTube();
      else if (platform === "x") scanX();
      else scanSite();
    } catch (e) {
      console.debug("[Qui possède quoi] scan error", e);
    }
  }

  let timer = null;
  function schedule() {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      scan();
    }, 300);
  }

  if (platform !== "sites") {
    new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
    window.addEventListener("yt-navigate-finish", schedule);
  }
  scan();

  try {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== "sync") return;
      Object.keys(changes).forEach((k) => (settings[k] = changes[k].newValue));
      reset();
      scan();
    });
  } catch (_) {}

  // Réponse au popup pour la chaîne principale d'une page vidéo YouTube.
  try {
    chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
      if (msg && msg.type === "mom:current" && platform === "youtube") {
        const a = document.querySelector("#owner a[href*='/@'], ytd-video-owner-renderer a[href*='/@']");
        sendResponse({ handle: a ? ytHandle(a.getAttribute("href")) : "" });
      }
    });
  } catch (_) {}
})();
