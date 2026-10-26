import { themes } from './data/themes.js';
import { faits } from './data/faits.js';
import { createTabs } from './components/tabs.js';
import { createTile } from './components/tile.js';
import { createDetail } from './components/detail.js';
import { createQuestions } from './components/questions.js';
import { createBandeauInstallation } from './components/installation.js';

const parId = Object.fromEntries(themes.map((t) => [t.id, t]));
const grille = document.getElementById('grille');
const titre = document.getElementById('titre-theme');
const vide = document.getElementById('vide');
const dialogDetail = document.getElementById('detail');
const detail = createDetail(dialogDetail);
const questions = createQuestions(document.getElementById('questions'), themes);
document.getElementById('ouvrir-questions').addEventListener('click', questions.ouvrir);
createBandeauInstallation(document.getElementById('bandeau-installation'));

const comptes = { tous: faits.length };
for (const f of faits) {
  if (!parId[f.theme]) console.warn(`Thème inconnu pour « ${f.id} » : ${f.theme}`);
  comptes[f.theme] = (comptes[f.theme] ?? 0) + 1;
}

const onglets = createTabs(document.getElementById('onglets'), themes, comptes, afficher);

function afficher(id) {
  const liste = id === 'tous' ? faits : faits.filter((f) => f.theme === id);
  titre.textContent = id === 'tous' ? 'Toutes les idées reçues' : parId[id].nom;
  grille.replaceChildren(...liste.map((f) => createTile(f, parId[f.theme], ouvrirCarte)));
  vide.hidden = liste.length > 0;
  onglets.setActive(id);
  themeActif = id;
  history.replaceState(null, '', id === 'tous' ? location.pathname : `#${id}`); // lien partageable par thème
}

// Une carte ouverte a son propre lien (#id-de-la-carte) ; à la fermeture, on revient au lien du thème.
let themeActif = 'tous';
function ouvrirCarte(fait) {
  detail.ouvrir(fait, parId[fait.theme]);
  history.replaceState(null, '', `#${fait.id}`);
}
dialogDetail.addEventListener('close', () => {
  history.replaceState(null, '', themeActif === 'tous' ? location.pathname : `#${themeActif}`);
});

/** Suit l'ancre de l'adresse : un thème, une carte partagée (#id-de-la-carte) ou #question. */
function suivreAncre() {
  const ancre = decodeURIComponent(location.hash.slice(1));
  const carte = faits.find((f) => f.id === ancre);
  if (dialogDetail.open) dialogDetail.close();
  afficher(parId[ancre] ? ancre : 'tous');
  if (carte) ouvrirCarte(carte);
  if (ancre === 'question') questions.ouvrir(); // lien depuis la page Méthode
}
suivreAncre();
addEventListener('hashchange', suivreAncre); // lien cliqué alors que le site est déjà ouvert

if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');
