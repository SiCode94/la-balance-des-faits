# La Balance des Faits

Lancer en local (les modules ES exigent un serveur) : `python3 -m http.server 8000`, puis http://localhost:8000

Styles : Tailwind est compilé dans `css/tailwind.css` (fichier versionné, pas d'étape de build sur GitHub Pages). Après avoir ajouté des classes dans le HTML ou le JS : `npm install` (une fois), puis `npm run css`.

- Ajouter un thème : une ligne dans `js/data/themes.js`.
- Ajouter une carte : un objet dans `js/data/faits.js` (le champ `theme` est l'id d'un thème), puis `npm run cartes`.
- Ajouter une visualisation : l'enregistrer dans `RENDERERS` (`js/components/visualisation.js`).
- Logo et icône d'application : `icons/logo.svg` (les PNG en sont tirés).
- Boîte à questions : coller l'adresse du formulaire Formspree dans `js/config.js` (vide = panneau « bientôt »).
- Page Méthode : `methode.html`. Le thème Tailwind (couleurs) est dans `tailwind.config.js`.
- Hors connexion : `sw.js` télécharge tout le site à la première visite. Ajouter tout nouveau fichier à la liste `FICHIERS`, et changer `CACHE` (balance-v3…) à chaque modification de cette liste.
- Partage : `npm run cartes` génère une page par carte (`cartes/<id>.html`, avec aperçu pour les messageries et balisage ClaimReview) et son image (`cartes/images/<id>.png`). C'est cette page que partage le bouton « Partager ». Ne pas modifier ces fichiers à la main. Dans l'appli, `…/#id-de-la-carte` ouvre aussi la carte.
- Adresse publique du site : `site` dans `js/config.js` (sert aux aperçus).
