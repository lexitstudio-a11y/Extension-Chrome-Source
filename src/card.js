/*
 * Rendu de la fiche « groupe » (DOM), partagé entre le badge injecté dans les
 * pages et le popup de l'extension. Aucun innerHTML : tout est construit avec
 * createElement/textContent.
 */
(function (root) {
  const TYPE_LABELS = {
    prive: "Groupe privé",
    public: "Service public",
    independant: "Indépendant",
    fondation: "Fondation / association",
    "etat-etranger": "Média d'État étranger",
  };
  const TYPE_COLORS = {
    prive: "#b45309",
    public: "#1d4ed8",
    independant: "#15803d",
    fondation: "#7c3aed",
    "etat-etranger": "#b91c1c",
  };

  const CARD_CSS = `
    :host { all: initial; }
    * { box-sizing: border-box; font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
    .card { width: 340px; max-width: calc(100vw - 24px); max-height: 70vh; overflow: auto;
      background: #fff; color: #111827; border: 1px solid #d1d5db; border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,.25); padding: 14px 16px; font-size: 13px; line-height: 1.45; text-align: left; }
    @media (prefers-color-scheme: dark) {
      .card { background: #1f2937; color: #f3f4f6; border-color: #4b5563; }
      .muted { color: #9ca3af !important; }
      a { color: #93c5fd !important; }
    }
    .head { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 2px; }
    .entity { font-weight: 700; font-size: 15px; }
    .kind { font-size: 12px; }
    .muted { color: #6b7280; }
    .chip { display: inline-block; color: #fff; border-radius: 999px; padding: 1px 8px; font-size: 11px; font-weight: 600; }
    .group { font-size: 14px; font-weight: 700; margin: 8px 0 2px; }
    .owner { margin: 0 0 6px; }
    h4 { margin: 10px 0 3px; font-size: 11px; text-transform: uppercase; letter-spacing: .04em; color: #6b7280; }
    ul { margin: 0; padding-left: 18px; }
    li { margin: 2px 0; }
    p { margin: 0 0 4px; }
    .warn { background: #fef3c7; color: #78350f; border-radius: 8px; padding: 6px 8px; margin: 8px 0; font-size: 12px; }
    .foot { margin-top: 10px; font-size: 11px; }
    a { color: #1d4ed8; }
  `;

  function el(tag, props, children) {
    const n = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach((k) => {
        if (k === "text") n.textContent = props[k];
        else if (k === "style") n.setAttribute("style", props[k]);
        else n.setAttribute(k, props[k]);
      });
    }
    (children || []).forEach((c) => c && n.appendChild(c));
    return n;
  }

  function list(items) {
    return el("ul", null, (items || []).map((t) => el("li", { text: t })));
  }

  function renderCard(match) {
    const { entity, group, approx } = match;
    const color = TYPE_COLORS[group.type] || "#374151";
    const card = el("div", { class: "card", role: "dialog", "aria-label": "Propriété du média" });

    card.appendChild(
      el("div", { class: "head" }, [
        el("span", { class: "entity", text: entity.name }),
        el("span", { class: "kind muted", text: entity.kind || "" }),
      ])
    );
    card.appendChild(
      el("div", { class: "group" }, [
        el("span", { text: group.name + " " }),
        el("span", { class: "chip", style: "background:" + color, text: TYPE_LABELS[group.type] || group.type }),
      ])
    );
    card.appendChild(el("p", { class: "owner muted", text: "Contrôle : " + group.owner }));
    card.appendChild(el("p", { text: group.summary }));

    if (approx) {
      card.appendChild(el("div", { class: "warn", text: "Correspondance approximative (par nom). Vérifiez que cette chaîne est bien la chaîne officielle." }));
    }
    if (group.confidence === "a-verifier") {
      card.appendChild(el("div", { class: "warn", text: "Actionnariat susceptible d'avoir évolué : informations à vérifier auprès des sources." }));
    }

    card.appendChild(el("h4", { text: "Intérêts économiques" }));
    card.appendChild(list(group.economic));
    card.appendChild(el("h4", { text: "Intérêts sociaux & positionnement" }));
    card.appendChild(list(group.social));

    const foot = el("div", { class: "foot muted" });
    foot.appendChild(el("div", { text: "Données au " + group.asOf + " – indicatives, croisez toujours plusieurs sources." }));
    const links = el("div");
    (group.sources || []).forEach((s, i) => {
      if (i) links.appendChild(document.createTextNode(" · "));
      links.appendChild(el("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", text: s.label }));
    });
    foot.appendChild(links);
    card.appendChild(foot);
    return card;
  }

  const Card = { TYPE_LABELS, TYPE_COLORS, CARD_CSS, renderCard, el };
  if (typeof module !== "undefined" && module.exports) module.exports = Card;
  else root.MOM_CARD = Card;
})(typeof globalThis !== "undefined" ? globalThis : this);
