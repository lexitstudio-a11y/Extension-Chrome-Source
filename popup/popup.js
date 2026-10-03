(async function () {
  const { buildIndex, lookupUrl, lookupYouTube, search } = MOM;
  const { CARD_CSS, renderCard, el } = MOM_CARD;
  const index = buildIndex(MOM_DATA);

  // La fiche utilise une feuille de style isolée dans un shadow root.
  function cardHost(match) {
    const host = document.createElement("div");
    const root = host.attachShadow({ mode: "open" });
    root.appendChild(el("style", { text: CARD_CSS + ".card{width:auto;max-height:none;box-shadow:none}" }));
    root.appendChild(renderCard(match));
    return host;
  }

  const current = document.getElementById("current");
  const results = document.getElementById("results");

  // Page courante
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let match = tab && tab.url ? lookupUrl(index, tab.url) : null;
    if (!match && tab && /youtube\.com\/watch/.test(tab.url || "")) {
      try {
        const res = await chrome.tabs.sendMessage(tab.id, { type: "mom:current" });
        if (res && res.handle) match = lookupYouTube(index, { handle: res.handle });
      } catch (_) {}
    }
    current.appendChild(
      match ? cardHost(match) : el("p", { class: "empty", text: "Aucun média de la base reconnu sur cette page. Utilisez la recherche ci-dessous." })
    );
  } catch (_) {
    current.appendChild(el("p", { class: "empty", text: "Page courante indisponible." }));
  }

  // Recherche
  document.getElementById("q").addEventListener("input", (e) => {
    results.textContent = "";
    const found = search(index, e.target.value);
    if (!e.target.value.trim()) return;
    if (!found.length) return results.appendChild(el("p", { class: "empty", text: "Aucun résultat." }));
    found.forEach((m) => {
      const btn = el("button", { class: "result", type: "button" }, [
        el("strong", { text: m.entity.name }),
        document.createTextNode(" → " + m.group.name + " "),
        el("small", { text: "(" + MOM_CARD.TYPE_LABELS[m.group.type] + ")" }),
      ]);
      btn.addEventListener("click", () => {
        results.textContent = "";
        results.appendChild(cardHost(m));
      });
      results.appendChild(btn);
    });
  });

  // Réglages
  const defaults = { youtube: true, x: true, sites: true };
  let settings = defaults;
  try {
    settings = Object.assign({}, defaults, await chrome.storage.sync.get(defaults));
  } catch (_) {}
  Object.keys(defaults).forEach((k) => {
    const box = document.getElementById("s-" + k);
    box.checked = !!settings[k];
    box.addEventListener("change", () => chrome.storage.sync.set({ [k]: box.checked }));
  });
})();
