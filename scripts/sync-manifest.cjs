// Régénère manifest.json : les sites médias de data/data.js deviennent les
// "matches" du content script. À relancer après chaque ajout de domaine.
const fs = require("fs");
const path = require("path");
const data = require("../data/data.js");

const domains = [...new Set(data.entities.flatMap((e) => e.domains || []))].sort();
const SHARED = ["data/data.js", "src/matcher.js", "src/card.js", "src/content.js"];

const manifest = {
  manifest_version: 3,
  name: "Qui possède quoi ? – Propriété des médias",
  short_name: "Qui possède quoi ?",
  version: "0.1.0",
  description:
    "Affiche à côté d'une chaîne YouTube, d'un compte X ou d'un média le groupe auquel il appartient, ainsi que les intérêts économiques et sociaux de ce groupe.",
  default_locale: undefined,
  icons: { 16: "icons/icon16.png", 48: "icons/icon48.png", 128: "icons/icon128.png" },
  action: { default_title: "Qui possède quoi ?", default_popup: "popup/popup.html" },
  permissions: ["storage", "activeTab"],
  content_scripts: [
    {
      matches: ["*://*.youtube.com/*", "*://x.com/*", "*://*.x.com/*", "*://twitter.com/*", "*://*.twitter.com/*"],
      js: SHARED,
      run_at: "document_idle",
    },
    {
      matches: domains.map((d) => `*://*.${d}/*`),
      exclude_matches: ["*://*.youtube.com/*", "*://*.x.com/*", "*://*.twitter.com/*"],
      js: SHARED,
      run_at: "document_idle",
    },
  ],
};
delete manifest.default_locale;

fs.writeFileSync(path.join(__dirname, "..", "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`manifest.json écrit (${domains.length} domaines médias).`);
