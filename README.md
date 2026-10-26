# La Balance des Faits

Lancer en local (les modules ES exigent un serveur) : `python3 -m http.server 8000`, puis http://localhost:8000

- Ajouter un thème : une ligne dans `js/data/themes.js`.
- Ajouter une carte : un objet dans `js/data/faits.js` (le champ `theme` est l'id d'un thème).
- Ajouter une visualisation : l'enregistrer dans `RENDERERS` (`js/components/visualisation.js`).
- Logo et icône d'application : `icons/logo.svg` (les PNG en sont tirés).
