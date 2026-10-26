import { themes } from './data/themes.js';
import { faits } from './data/faits.js';
import { createTabs } from './components/tabs.js';
import { createTile } from './components/tile.js';
import { createDetail } from './components/detail.js';
import { createQuestions } from './components/questions.js';
import { createQuiz } from './components/quiz.js';
import { createBandeauInstallation } from './components/installation.js';
import { createFiltres } from './components/filtres.js';
import { correspond } from './utils/recherche.js';
import { el } from './utils/dom.js';
import { estRecente } from './utils/badges.js';
import { compter } from './statistiques.js';
import { config } from './config.js';

const parId = Object.fromEntries(themes.map((t) => [t.id, t]));
const grille = document.getElementById('grille');
const titre = document.getElementById('titre-theme');
const vide = document.getElementById('vide');
const nombreResultats = document.getElementById('nombre-resultats');
const dialogDetail = document.getElementById('detail');
const detail = createDetail(dialogDetail, faits, {
  onOuvrir: (fait) => ouvrirCarte(fait, apresFermetureCarte), // carte « À lire aussi » : garde le retour au quiz
  onSignaler(fait) {
    apresFermetureCarte = null; // ne pas rouvrir le quiz par-dessus le signalement
    dialogDetail.close();
    questions.ouvrir(fait);
  },
});
const questions = createQuestions(document.getElementById('questions'), themes);
document.getElementById('ouvrir-questions').addEventListener('click', () => questions.ouvrir());
const quiz = createQuiz(document.getElementById('quiz'), faits, themes, ouvrirCarte);
document.getElementById('ouvrir-quiz').addEventListener('click', quiz.ouvrir);
createBandeauInstallation(document.getElementById('bandeau-installation'));

const comptes = { tous: faits.length };
for (const f of faits) {
  if (!parId[f.theme]) console.warn(`Thème inconnu pour « ${f.id} » : ${f.theme}`);
  comptes[f.theme] = (comptes[f.theme] ?? 0) + 1;
}

const onglets = createTabs(document.getElementById('onglets'), themes, comptes, afficher);
const filtres = createFiltres(document.getElementById('filtres'), ({ texte }) => {
  // Une recherche porte sur toutes les cartes : on repasse sur « Tous » pour ne rien manquer.
  afficher(texte && themeActif !== 'tous' ? 'tous' : themeActif);
});

function afficher(id) {
  const { texte, verdict } = filtres.etat();
  const parTheme = id === 'tous' ? faits : faits.filter((f) => f.theme === id);
  const filtrees = parTheme.filter((f) => (verdict === 'tous' || f.verdict === verdict) && correspond(f, texte, parId[f.theme]?.nom));
  const liste = [...filtrees.filter((f) => estRecente(f)), ...filtrees.filter((f) => !estRecente(f))]; // nouveautés en tête
  titre.textContent = id === 'tous' ? 'Toutes les idées reçues' : parId[id].nom;
  grille.replaceChildren(...liste.map((f) => createTile(f, parId[f.theme], ouvrirCarte)));

  const filtre = Boolean(texte) || verdict !== 'tous';
  nombreResultats.textContent = filtre ? `${liste.length} carte${liste.length > 1 ? 's' : ''} sur ${parTheme.length}` : '';
  vide.hidden = liste.length > 0;
  if (!liste.length) {
    const effacer = el('button', { type: 'button', class: 'mt-2 text-sm font-medium text-brass-400 underline underline-offset-4' }, 'Effacer la recherche et les filtres');
    effacer.addEventListener('click', () => filtres.effacer());
    vide.replaceChildren(...(filtre
      ? [el('p', {}, 'Aucune carte ne correspond. Essayez un autre mot, ou proposez cette idée reçue avec le bouton « ? ».'), effacer]
      : [el('p', {}, 'Aucune carte dans ce thème pour l\'instant. Les premières arrivent bientôt.')]));
  }
  onglets.setActive(id);
  themeActif = id;
  history.replaceState(null, '', id === 'tous' ? location.pathname : `#${id}`); // lien partageable par thème
}

// Une carte ouverte a son propre lien (#id-de-la-carte) ; à la fermeture, on revient au lien du thème.
let themeActif = 'tous';
let apresFermetureCarte = null; // ex. revenir au quiz quand la carte a été ouverte depuis lui
function ouvrirCarte(fait, apresFermeture = null) {
  apresFermetureCarte = apresFermeture;
  detail.ouvrir(fait, parId[fait.theme]);
  history.replaceState(null, '', `#${fait.id}`);
  compter(new URL(`cartes/${fait.id}.html`, config.site).pathname, fait.ideeRecue); // même chemin que la page de la carte
}
dialogDetail.addEventListener('close', () => {
  history.replaceState(null, '', themeActif === 'tous' ? location.pathname : `#${themeActif}`);
  const suite = apresFermetureCarte;
  apresFermetureCarte = null;
  suite?.();
});

/** Suit l'ancre de l'adresse : un thème, une carte partagée (#id-de-la-carte) ou #question. */
function suivreAncre() {
  const ancre = decodeURIComponent(location.hash.slice(1));
  const carte = faits.find((f) => f.id === ancre);
  if (dialogDetail.open) dialogDetail.close();
  afficher(parId[ancre] ? ancre : 'tous');
  if (carte) ouvrirCarte(carte);
  if (ancre === 'question') questions.ouvrir(); // lien depuis la page Méthode
  const signalee = ancre.startsWith('signaler-') && faits.find((f) => f.id === ancre.slice('signaler-'.length));
  if (signalee) questions.ouvrir(signalee); // lien « Signaler une erreur » des pages de cartes
  if (ancre === 'quiz') quiz.ouvrir(); // lien partagé avec un score
}
suivreAncre();
addEventListener('hashchange', suivreAncre); // lien cliqué alors que le site est déjà ouvert

if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');
