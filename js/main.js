import { themes } from './data/themes.js';
import { faits } from './data/faits.js';
import { createTabs } from './components/tabs.js';
import { createTile } from './components/tile.js';
import { createDetail } from './components/detail.js';
import { createQuestions } from './components/questions.js';
import { createQuiz, partieLibre } from './components/quiz.js';
import { createQuotidien, partieDefi, questionsDuDefi } from './components/defi.js';
import { estPubliee, jourDeJeu } from './utils/calendrier.js';
import { record, serieAffichee } from './utils/progression.js';
import { createBandeauInstallation } from './components/installation.js';
import { createFiltres } from './components/filtres.js';
import { createMenu } from './components/menu.js';
import { correspond } from './utils/recherche.js';
import { el } from './utils/dom.js';
import { estRecente } from './utils/badges.js';
import { compter } from './statistiques.js';
import { config } from './config.js';

const parId = Object.fromEntries(themes.map((t) => [t.id, t]));

// Cartes programmées : seules celles dont la date est arrivée (9 h, heure de Paris) sont visibles.
const jour = jourDeJeu();
const publiees = faits.filter((f) => estPubliee(f));
const datees = publiees.filter((f) => f.publieLe).sort((a, b) => a.publieLe.localeCompare(b.publieLe));
const carteDuJour = datees.at(-1) ?? null;
const prochaine = faits.filter((f) => !estPubliee(f)).sort((a, b) => a.publieLe.localeCompare(b.publieLe))[0] ?? null;
const grille = document.getElementById('grille');
const titre = document.getElementById('titre-theme');
const vide = document.getElementById('vide');
const nombreResultats = document.getElementById('nombre-resultats');
const dialogDetail = document.getElementById('detail');
const detail = createDetail(dialogDetail, publiees, {
  onOuvrir: (fait) => ouvrirCarte(fait, apresFermetureCarte), // carte « À lire aussi » : garde le retour au quiz
  onSignaler(fait) {
    apresFermetureCarte = null; // ne pas rouvrir le quiz par-dessus le signalement
    dialogDetail.close();
    questions.ouvrir(fait);
  },
});
const questions = createQuestions(document.getElementById('questions'), themes);
document.getElementById('ouvrir-questions').addEventListener('click', () => questions.ouvrir());
const quiz = createQuiz(document.getElementById('quiz'), themes, ouvrirCarte);
const ouvrirQuizLibre = () => quiz.ouvrir(partieLibre(publiees));
const questionsDefi = questionsDuDefi(jour, publiees, carteDuJour);
const ouvrirDefi = () => quiz.ouvrir(partieDefi(jour, questionsDefi, majQuotidien));
createBandeauInstallation(document.getElementById('bandeau-installation'));

// Défi du jour, carte du jour, carte de demain floutée, et la flamme dans l'en-tête.
const quotidien = createQuotidien(document.getElementById('quotidien'), {
  jour, questions: questionsDefi, carteDuJour, prochaine, themes, ouvrirDefi, ouvrirCarte: (f) => ouvrirCarte(f), ouvrirQuizLibre,
});
// Menu ☰ : tout le site au même endroit.
const menu = createMenu(document.getElementById('menu'), {
  entete() {
    const serie = serieAffichee(jour);
    return el('div', { class: 'flex items-center gap-3 rounded-xl border border-brass-500/60 bg-ink-900 p-3' }, [
      el('span', { class: 'text-3xl', 'aria-hidden': 'true' }, '🔥'),
      el('span', { class: 'flex flex-col text-sm' }, [
        el('span', { class: 'font-semibold text-stone-100' }, `${serie} jour${serie > 1 ? 's' : ''} d'affilée`),
        el('span', { class: 'text-stone-400' }, `Record : ${record()} jour${record() > 1 ? 's' : ''} · jouez le défi chaque jour`),
      ]),
    ]);
  },
  rubriques: [
    { titre: 'Jouer', entrees: [
      { icone: '🔥', libelle: 'Défi du jour', detail: '3 questions, les mêmes pour tout le monde', action: () => ouvrirDefi() },
      { icone: '🎯', libelle: 'Quiz libre', detail: '10 questions au hasard', action: () => ouvrirQuizLibre() },
    ] },
    { titre: 'Les cartes', entrees: [
      carteDuJour && { icone: '✨', libelle: 'Carte du jour', detail: carteDuJour.ideeRecue, action: () => ouvrirCarte(carteDuJour) },
      { icone: '🗂️', libelle: 'Toutes les cartes', detail: `${publiees.length} idées reçues vérifiées`, action: () => allerAuxCartes('tous') },
      { icone: '🔎', libelle: 'Rechercher une carte', action: () => allerAuxCartes('tous', true) },
    ] },
    { titre: 'Participer', entrees: [
      { icone: '❓', libelle: 'Poser une question', detail: 'Une idée reçue à vérifier ?', action: () => questions.ouvrir() },
    ] },
    { titre: 'À propos', entrees: [
      { icone: '⚖️', libelle: 'Notre méthode', href: 'methode.html' },
      { icone: '📝', libelle: 'Corrections', href: 'corrections.html' },
    ] },
  ],
});
document.getElementById('ouvrir-menu').addEventListener('click', () => menu.ouvrir());

/** Affiche la grille (un thème ou « tous ») et la fait défiler à l'écran ; option : place le curseur dans la recherche. */
function allerAuxCartes(id, rechercher = false) {
  afficher(id);
  const cible = rechercher ? document.getElementById('recherche') : titre;
  cible.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (rechercher) document.getElementById('recherche').focus({ preventScroll: true });
}

const flamme = document.getElementById('flamme');
flamme.addEventListener('click', ouvrirDefi);
function majQuotidien() {
  quotidien.maj();
  const serie = serieAffichee(jour);
  flamme.textContent = `🔥 ${serie}`;
  flamme.setAttribute('aria-label', `Défi du jour, série de ${serie} jour${serie > 1 ? 's' : ''}`);
}
majQuotidien();
// Chaque minute : comptes à rebours ; à 9 h, on recharge pour débloquer la nouvelle carte (sauf si une fenêtre est ouverte).
setInterval(() => {
  if (jourDeJeu() !== jour && !document.querySelector('dialog[open]')) location.reload();
  else majQuotidien();
}, 60000);

const comptes = { tous: publiees.length };
for (const f of publiees) {
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
  const parTheme = id === 'tous' ? publiees : publiees.filter((f) => f.theme === id);
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

/** Suit l'ancre de l'adresse : un thème, une carte partagée (#id-de-la-carte), #question, #quiz ou #defi. */
function suivreAncre() {
  const ancre = decodeURIComponent(location.hash.slice(1));
  const carte = publiees.find((f) => f.id === ancre);
  if (dialogDetail.open) dialogDetail.close();
  afficher(parId[ancre] ? ancre : 'tous');
  if (carte) ouvrirCarte(carte);
  if (ancre === 'question') questions.ouvrir(); // lien depuis la page Méthode
  const signalee = ancre.startsWith('signaler-') && publiees.find((f) => f.id === ancre.slice('signaler-'.length));
  if (signalee) questions.ouvrir(signalee); // lien « Signaler une erreur » des pages de cartes
  if (ancre === 'quiz') ouvrirQuizLibre(); // lien partagé avec un score
  if (ancre === 'defi') ouvrirDefi(); // lien partagé avec un résultat du défi
}
suivreAncre();
addEventListener('hashchange', suivreAncre); // lien cliqué alors que le site est déjà ouvert

if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');
