// Vérifie la cohérence des données et du matcher. Lancer : node scripts/check.cjs
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const data = require("../data/data.js");
const MOM = require("../src/matcher.js");

const TYPES = ["prive", "public", "independant", "fondation", "etat-etranger"];
const groupIds = new Set();
data.groups.forEach((g) => {
  assert(!groupIds.has(g.id), `groupe en double : ${g.id}`);
  groupIds.add(g.id);
  assert(TYPES.includes(g.type), `type invalide pour ${g.id}`);
  ["name", "owner", "summary", "asOf"].forEach((f) => assert(g[f], `${g.id}.${f} manquant`));
  assert(g.economic.length && g.social.length, `${g.id} : intérêts manquants`);
  assert(["etabli", "a-verifier"].includes(g.confidence), `${g.id}.confidence invalide`);
  assert(g.sources && g.sources.length, `${g.id} : sources manquantes`);
});

const seen = { id: new Set(), youtube: new Map(), x: new Map(), domains: new Map() };
data.entities.forEach((e) => {
  assert(!seen.id.has(e.id), `entité en double : ${e.id}`);
  seen.id.add(e.id);
  assert(groupIds.has(e.group), `${e.id} : groupe inconnu ${e.group}`);
  ["youtube", "x", "domains"].forEach((k) =>
    (e[k] || []).forEach((v) => {
      const key = v.toLowerCase();
      if (seen[k].has(key) && seen[k].get(key) !== e.group)
        assert.fail(`${k} "${v}" attribué à deux groupes différents`);
      seen[k].set(key, e.group);
    })
  );
});
data.groups.forEach((g) => assert(data.entities.some((e) => e.group === g.id), `groupe sans entité : ${g.id}`));

const idx = MOM.buildIndex(data);
const cases = [
  [MOM.lookupYouTube(idx, { handle: "@CNEWS" }), "bollore"],
  [MOM.lookupYouTube(idx, { handle: "lemonde" }), "le-monde"],
  [MOM.lookupYouTube(idx, { handle: "", name: "Mediapart" }), "independants-fr"],
  [MOM.lookupX(idx, "@FoxNews"), "murdoch"],
  [MOM.lookupDomain(idx, "www.lefigaro.fr"), "dassault"],
  [MOM.lookupDomain(idx, "amp.cnn.com"), "wbd"],
  [MOM.lookupUrl(idx, "https://www.youtube.com/@BFMTV/videos"), "altice-media"],
  [MOM.lookupUrl(idx, "https://x.com/franceinfo/status/1"), "service-public-fr"],
];
cases.forEach(([m, g], i) => assert(m && m.group.id === g, `cas ${i} : attendu ${g}`));
assert.strictEqual(MOM.lookupDomain(idx, "example.com"), null);
assert.strictEqual(MOM.lookupYouTube(idx, { handle: "CNEWSfake", name: "CNews" }), null, "pas de repli par nom si un handle existe");
assert.strictEqual(MOM.lookupUrl(idx, "https://x.com/home"), null);
assert(MOM.search(idx, "bollore").length >= 4);

// Le manifest doit couvrir tous les domaines
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "manifest.json"), "utf8"));
const matches = manifest.content_scripts.flatMap((c) => c.matches).join(" ");
data.entities.forEach((e) => (e.domains || []).forEach((d) => assert(matches.includes(`*.${d}/`), `manifest ne couvre pas ${d} (node scripts/sync-manifest.cjs)`)));
manifest.content_scripts.forEach((c) => c.js.forEach((f) => assert(fs.existsSync(path.join(__dirname, "..", f)), `fichier manquant ${f}`)));

console.log(`OK : ${data.groups.length} groupes, ${data.entities.length} entités.`);
