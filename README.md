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
- Badges : ajouter `publieLe: 'AAAA-MM-JJ'` à une carte pour l'afficher « Nouveau » et en tête de liste pendant `dureeBadges` jours (`js/config.js`), et `questionLecteur: true` si elle répond à une question reçue.
- Quiz : `js/components/quiz.js`, 10 questions tirées au hasard parmi les cartes qui ont un champ `quiz` (question à choix multiples sur le chiffre clé). Lien direct : `…/#quiz`. Penser à écrire la question quand on ajoute une carte.
- Statistiques : coller le code du compte GoatCounter dans `statistiques` (`js/config.js`). Sont comptés : pages vues, cartes ouvertes, et les événements `partage/<id>`, `question-envoyee`, `installation`.
- Corrections : chaque correction d'une carte publiée (chiffre, verdict, source, retrait) s'ajoute dans `js/data/corrections.js` ; `npm run cartes` génère `corrections.html`.
- Signalements : chaque carte a un lien « Signaler une erreur » (boîte à questions préremplie ; lien direct `…/#signaler-<id>`). Les messages arrivent dans Formspree avec les champs `type` et `carte`.
- Revérification : `npm run reverifier` liste les cartes vérifiées il y a plus de 6 mois (`npm run reverifier -- 3` pour 3 mois).
- Recherche et filtres : `js/components/filtres.js` (recherche dans l'idée reçue, le chiffre, l'explication et le thème ; filtre par verdict). « À lire aussi » : `js/utils/liees.js`, partagé par l'appli et les pages de cartes.
- Carte du jour : une carte dont `publieLe` est dans le futur reste cachée (grille, recherche, quiz, liens) jusqu'à 9 h, heure de Paris, ce jour-là (`js/utils/calendrier.js`). La prochaine apparaît floutée sur l'accueil. Pour programmer une semaine : une carte par jour, avec des `publieLe` qui se suivent. Les pages de partage sont générées pour toutes les cartes : les réponses des cartes programmées sont donc lisibles dans le code, le flou est un jeu, pas un secret.
- Défi du jour (`js/components/defi.js`) : 3 questions identiques pour tout le monde le même jour (la première porte sur la carte du jour), résultat partageable, série de jours (« flammes ») gardée dans le téléphone (`js/utils/progression.js`). Le quiz libre réutilise le même moteur (`js/components/quiz.js`).
- Menu ☰ (`js/components/menu.js`) : panneau latéral qui rassemble le défi, le quiz libre, la carte du jour, toutes les cartes, la recherche, la boîte à questions, la méthode et les corrections. Les entrées se règlent dans `js/main.js`.
