/*
 * Recherche d'une entité (chaîne YouTube, compte X, site média) dans la base
 * et du groupe auquel elle appartient. Utilisable dans le navigateur
 * (globalThis.MOM) et sous Node (tests).
 */
(function (root) {
  function norm(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9一-鿿]+/g, " ")
      .trim();
  }

  function cleanHandle(h) {
    return String(h || "").replace(/^@/, "").toLowerCase();
  }

  function buildIndex(data) {
    const groups = new Map();
    data.groups.forEach((g) => groups.set(g.id, g));

    const index = {
      groups,
      entities: data.entities,
      youtube: new Map(),
      x: new Map(),
      domains: new Map(),
      names: new Map(),
    };

    data.entities.forEach((e) => {
      const group = groups.get(e.group);
      if (!group) return;
      const match = { entity: e, group };
      (e.youtube || []).forEach((h) => index.youtube.set(cleanHandle(h), match));
      (e.x || []).forEach((h) => index.x.set(cleanHandle(h), match));
      (e.domains || []).forEach((d) => index.domains.set(d.toLowerCase(), match));
      [e.name].concat(e.aliases || []).forEach((n) => {
        const k = norm(n);
        if (k) index.names.set(k, match);
      });
    });
    return index;
  }

  function lookupYouTube(index, { handle, name } = {}) {
    const h = cleanHandle(handle);
    if (h && index.youtube.has(h)) return index.youtube.get(h);
    // Sans identifiant fiable (ex. /channel/UC…), repli sur le nom exact : approximatif.
    if (!h && name) {
      const m = index.names.get(norm(name));
      if (m) return Object.assign({ approx: true }, m);
    }
    return null;
  }

  function lookupX(index, handle) {
    return index.x.get(cleanHandle(handle)) || null;
  }

  function lookupDomain(index, hostname) {
    const labels = String(hostname || "").toLowerCase().replace(/^www\./, "").split(".");
    for (let i = 0; i <= labels.length - 2; i++) {
      const candidate = labels.slice(i).join(".");
      if (index.domains.has(candidate)) return index.domains.get(candidate);
    }
    return null;
  }

  function search(index, query, limit = 20) {
    const q = norm(query);
    if (!q) return [];
    const out = [];
    const seen = new Set();
    index.entities.forEach((e) => {
      const group = index.groups.get(e.group);
      const hay = norm([e.name].concat(e.aliases || [], [group.name, group.owner]).join(" "));
      if (hay.includes(q) && !seen.has(e.id)) {
        seen.add(e.id);
        out.push({ entity: e, group });
      }
    });
    return out.slice(0, limit);
  }

  /** Extrait un identifiant depuis une URL (page onglet courant). */
  function lookupUrl(index, url) {
    let u;
    try {
      u = new URL(url);
    } catch (_) {
      return null;
    }
    const host = u.hostname.toLowerCase().replace(/^www\./, "");
    if (/(^|\.)youtube\.com$/.test(host)) {
      const m = /^\/@([^/?#]+)/.exec(u.pathname);
      return m ? lookupYouTube(index, { handle: decodeURIComponent(m[1]) }) : null;
    }
    if (/(^|\.)(x|twitter)\.com$/.test(host)) {
      const m = /^\/([A-Za-z0-9_]{1,15})(?:\/|$)/.exec(u.pathname);
      const reserved = ["home", "explore", "search", "i", "settings", "notifications", "messages", "compose"];
      return m && !reserved.includes(m[1].toLowerCase()) ? lookupX(index, m[1]) : null;
    }
    return lookupDomain(index, host);
  }

  const MOM = { norm, buildIndex, lookupYouTube, lookupX, lookupDomain, lookupUrl, search };
  if (typeof module !== "undefined" && module.exports) module.exports = MOM;
  else root.MOM = MOM;
})(typeof globalThis !== "undefined" ? globalThis : this);
