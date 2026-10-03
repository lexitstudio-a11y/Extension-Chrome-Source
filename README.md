# Qui possède quoi ? – extension Chrome

Affiche, à côté d'une **chaîne YouTube**, d'un **compte X** ou d'un **site de média**, le **groupe** auquel il appartient, ainsi que les **intérêts économiques et sociaux** de ce groupe (propriétaire, activités, positionnement éditorial débattu, sources).

- **YouTube** : badge coloré à côté du nom de la chaîne (page chaîne, page vidéo, listes).
- **X / Twitter** : badge à côté du nom des comptes (profils et posts).
- **Sites médias** (≈ 65 domaines) : pastille flottante en bas à gauche.
- **Popup** : fiche de la page courante, recherche par média ou groupe, réglages par plateforme.

Couleurs : orange = groupe privé · bleu = service public · vert = indépendant · violet = fondation/association · rouge = média d'État étranger.

## Installation (mode développeur)

1. `chrome://extensions` → activer le **mode développeur**.
2. **Charger l'extension non empaquetée** → sélectionner ce dossier.

Aucune donnée n'est envoyée : la base est embarquée (`data/data.js`) et tout se passe localement.

## Mettre à jour la base

Éditez `data/data.js` (groupes + entités : handles YouTube/X, domaines, alias), puis :

```sh
node scripts/sync-manifest.cjs   # régénère manifest.json (domaines)
node scripts/check.cjs           # valide données, matcher, manifest
```

Chaque groupe porte `asOf` (date) et `confidence` (`etabli` / `a-verifier`) ; ajoutez toujours des `sources`.

## Limites et neutralité

- La propriété des médias change vite (rachats, cessions) : les données sont **indicatives** et datées ; certaines fiches sont marquées « à vérifier ».
- Les rubriques « intérêts sociaux & positionnement » rapportent des classements **débattus publiquement**, sans les endosser ; croisez les sources.
- Un média à actionnaire privé n'est pas pour autant faux, ni un média indépendant neutre : l'outil informe sur la structure, il ne juge pas le contenu.
- Les sélecteurs YouTube/X dépendent de leur HTML, qui change : un badge peut disparaître après une mise à jour de ces sites.
