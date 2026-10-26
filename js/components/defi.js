import { el } from '../utils/dom.js';
import { config } from '../config.js';
import { compter } from '../statistiques.js';
import { partagerTexte } from '../utils/partage.js';
import { avantOuverture, decalerJour, formatDuree, formatJour } from '../utils/calendrier.js';
import { enregistrerReponse, record, reponsesDuJour, serieAffichee } from '../utils/progression.js';
import { boutonPrincipal } from './quiz.js';

export const NB_DEFI = 3;

/**
 * Questions du défi : les mêmes pour tout le monde ce jour-là (tirage déterminé par la date).
 * La première porte sur la carte du jour quand elle a une question.
 */
export function questionsDuDefi(jour, publiees, carteDuJour) {
  const avecQuiz = publiees.filter((f) => f.quiz);
  const premiere = carteDuJour?.quiz && carteDuJour.publieLe === jour ? [carteDuJour] : [];
  const autres = melangerAvecGraine(avecQuiz.filter((f) => !premiere.includes(f)), jour);
  return [...premiere, ...autres].slice(0, NB_DEFI);
}

/** Partie de défi pour le moteur de quiz. `onMaj()` est appelé après chaque réponse (flamme, accueil). */
export function partieDefi(jour, questions, onMaj) {
  return {
    cle: `defi-${jour}`,
    titre: 'Défi du jour',
    questions,
    reponses: reponsesDuJour(jour, questions.length),
    surReponse(index, juste) {
      enregistrerReponse(jour, index, juste, questions.length);
      if (!reponsesDuJour(jour, questions.length).includes(null)) {
        compter('defi-termine', `Défi terminé : ${reponsesDuJour(jour, questions.length).filter(Boolean).length}/${questions.length}`, true);
      }
      onMaj();
    },
    resultat(reponses, { fermer }) {
      const score = reponses.filter(Boolean).length;
      const serie = serieAffichee(jour);
      const partager = el('button', { type: 'button', autofocus: true, class: boutonPrincipal }, 'Partager mon résultat');
      partager.addEventListener('click', () => partagerResultat(jour, reponses, serie, partager));
      const fermerB = el('button', { type: 'button', class: 'text-sm font-medium text-stone-300 underline underline-offset-4' }, 'Retour aux cartes');
      fermerB.addEventListener('click', fermer);

      return [
        el('p', { class: 'text-sm font-medium text-stone-400' }, `Défi du ${formatJour(jour)}`),
        el('p', { class: 'text-3xl tracking-widest', 'aria-label': `${score} bonnes réponses sur ${reponses.length}` }, emojis(reponses)),
        el('p', { class: 'font-display text-5xl font-bold tracking-tight text-brass-400' }, `${score}/${reponses.length}`),
        el('p', { class: 'font-display text-xl font-bold text-stone-100' }, `🔥 ${serie} jour${serie > 1 ? 's' : ''} d'affilée`),
        el('p', { class: 'text-sm text-stone-400' }, `Votre record : ${record()} jour${record() > 1 ? 's' : ''}. Prochain défi demain à 9 h (dans ${formatDuree(avantOuverture())}).`),
        el('div', { class: 'flex flex-wrap gap-3 pt-2' }, [partager]),
        fermerB,
      ];
    },
  };
}

function emojis(reponses) {
  return reponses.map((r) => (r ? '✅' : r === false ? '❌' : '⬜')).join(' ');
}

function partagerResultat(jour, reponses, serie, bouton) {
  compter('partage/defi', 'Partage du défi du jour', true);
  const score = reponses.filter(Boolean).length;
  partagerTexte(
    `La Balance des Faits · défi du ${formatJour(jour)}\n${emojis(reponses)}  ${score}/${reponses.length}\n🔥 ${serie} jour${serie > 1 ? 's' : ''} d'affilée`,
    `${config.site}#defi`, bouton);
}

/**
 * Bloc « Aujourd'hui » de l'accueil, compact pour le téléphone : une ligne pour le défi (et le quiz libre),
 * puis la carte du jour et celle de demain (floutée) côte à côte.
 * `maj()` le redessine (après une réponse au défi, ou chaque minute pour les comptes à rebours).
 */
export function createQuotidien(conteneur, { jour, questions, carteDuJour, prochaine, themes, ouvrirDefi, ouvrirCarte, ouvrirQuizLibre }) {
  const nomTheme = (f) => themes.find((t) => t.id === f.theme)?.nom ?? '';
  const tuile = 'flex min-w-0 flex-col gap-1.5 rounded-xl border bg-ink-800 p-3 text-left';

  function ligneDefi() {
    const reponses = reponsesDuJour(jour, questions.length);
    const fini = !reponses.includes(null);
    const commence = reponses.some((r) => r !== null);
    const serie = serieAffichee(jour);
    const action = el('button', { type: 'button', class: `shrink-0 ${boutonPrincipal}` },
      fini ? 'Résultat' : commence ? 'Continuer' : 'Jouer');
    action.addEventListener('click', ouvrirDefi);
    const libre = el('button', { type: 'button', class: 'text-brass-400 underline underline-offset-4' }, 'quiz libre');
    libre.addEventListener('click', ouvrirQuizLibre);
    return el('section', { class: 'col-span-2 flex items-center gap-3 rounded-xl border border-brass-500/60 bg-ink-800 p-3' }, [
      el('span', { class: 'shrink-0 text-2xl', 'aria-hidden': 'true' }, '🔥'),
      el('div', { class: 'min-w-0 flex-1' }, [
        el('h2', { class: 'font-display text-base font-bold leading-tight text-stone-50' }, `Défi du jour · ${serie} jour${serie > 1 ? 's' : ''}`),
        el('p', { class: 'text-xs text-stone-400' }, fini
          ? [`${emojis(reponses)} · prochain dans ${formatDuree(avantOuverture())} · `, libre]
          : [`${questions.length} questions, les mêmes pour tous · ou `, libre]),
      ]),
      action,
    ]);
  }

  function tuileCarteDuJour() {
    if (!carteDuJour) return null;
    const duJour = carteDuJour.publieLe === jour;
    const b = el('button', { type: 'button', class: `${tuile} border-ink-600 hover:border-brass-500` }, [
      el('span', { class: 'text-[11px] font-semibold uppercase tracking-wide text-brass-300' }, duJour ? 'Carte du jour' : 'Dernière carte'),
      el('span', { class: 'line-clamp-3 font-display text-sm font-bold leading-snug text-stone-100' }, carteDuJour.ideeRecue),
      el('span', { class: 'mt-auto text-xs text-stone-400' }, nomTheme(carteDuJour)),
    ]);
    b.addEventListener('click', () => ouvrirCarte(carteDuJour));
    return b;
  }

  function tuileDemain() {
    if (!prochaine) return null;
    const demain = prochaine.publieLe === decalerJour(jour, 1);
    // Le texte flouté est un leurre : l'idée reçue de demain n'est pas dans la page.
    return el('div', { class: `${tuile} border-dashed border-ink-600`, 'aria-label': 'Prochaine carte' }, [
      el('span', { class: 'text-[11px] font-semibold uppercase tracking-wide text-stone-400' }, demain ? 'Demain à 9 h' : `Le ${formatJour(prochaine.publieLe)}`),
      el('span', { class: 'select-none font-display text-sm font-bold leading-snug text-stone-100 blur-sm', 'aria-hidden': 'true' },
        'Une nouvelle idée reçue au crible.'),
      el('span', { class: 'mt-auto text-xs text-stone-400' },
        `${nomTheme(prochaine)} · ${demain ? `dans ${formatDuree(avantOuverture())}` : 'bientôt'}`),
    ]);
  }

  function maj() {
    conteneur.replaceChildren(...[ligneDefi(), tuileCarteDuJour(), tuileDemain()].filter(Boolean));
  }
  maj();
  return { maj };
}

/** Mélange déterminé par une graine (la date) : même ordre pour tout le monde le même jour. */
function melangerAvecGraine(liste, graine) {
  let h = 2166136261;
  for (const c of graine) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const aleatoire = () => { // mulberry32
    h = (h + 0x6D2B79F5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i -= 1) {
    const j = Math.floor(aleatoire() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}
