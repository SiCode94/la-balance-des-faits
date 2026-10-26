import { el } from '../utils/dom.js';
import { VERDICTS } from './detail.js';
import { config } from '../config.js';
import { compter } from '../statistiques.js';
import { partagerTexte } from '../utils/partage.js';

const NB_QUESTIONS = 10;
const CLE_RECORD = 'quiz-record';

export const boutonPrincipal = 'rounded-full bg-brass-500 px-5 py-2 text-sm font-semibold text-ink-900 hover:bg-brass-400';
export const boutonSecondaire = 'rounded-full border border-brass-500 px-5 py-2 text-sm font-semibold text-brass-300 hover:bg-brass-500 hover:text-ink-900';
const lienDiscret = 'text-sm font-medium text-stone-300 underline underline-offset-4';

/**
 * Moteur de quiz (élément <dialog>) : `ouvrir(partie)`. Une partie décrit :
 *  cle        identifiant (une partie interrompue avec la même clé reprend là où on en était)
 *  titre      affiché en tête (« Quiz des chiffres », « Défi du jour »)
 *  questions  cartes ayant un champ `quiz`
 *  reponses   (facultatif) réponses déjà données [true, false, null…] : on reprend à la première null
 *  surReponse (facultatif) (index, juste) => void, appelé à chaque réponse
 *  resultat   (reponses, { rejouer, fermer }) => contenu de l'écran final
 * `onVoirCarte(fait, reprendre)` ouvre une carte et doit appeler `reprendre()` à sa fermeture.
 */
export function createQuiz(dialog, themes, onVoirCarte) {
  const parId = Object.fromEntries(themes.map((t) => [t.id, t]));
  let partie = null;
  let reponses = [];
  let rang = 0;
  let enCours = false; // une partie commencée et pas encore terminée

  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

  const score = () => reponses.filter(Boolean).length;

  function demarrer(nouvelle) {
    partie = nouvelle;
    reponses = partie.questions.map((_, i) => partie.reponses?.[i] ?? null);
    rang = reponses.indexOf(null);
    if (rang === -1) { afficherResultat(); } else { enCours = true; afficherQuestion(); }
    if (!dialog.open) dialog.showModal();
  }

  function entete() {
    const fermer = el('button', { type: 'button', class: lienDiscret }, 'Fermer');
    fermer.addEventListener('click', () => dialog.close());
    return el('div', { class: 'flex items-center justify-between gap-3' }, [
      el('span', { class: 'text-sm font-medium text-stone-400' },
        `${partie.titre} · Question ${rang + 1} sur ${partie.questions.length} · Score : ${score()}`),
      fermer,
    ]);
  }

  function progression() {
    return el('div', { class: 'h-1.5 overflow-hidden rounded-full bg-ink-600' },
      el('div', { class: 'h-full rounded-full bg-brass-500 transition-all', style: `width:${(rang / partie.questions.length) * 100}%` }));
  }

  function afficherQuestion() {
    const fait = partie.questions[rang];
    const boutons = fait.quiz.choix.map((choix, i) => {
      const b = el('button', {
        type: 'button',
        class: 'rounded-xl border border-ink-600 bg-ink-900 px-3 py-3 text-base font-semibold text-stone-100 hover:border-brass-500',
      }, choix);
      b.addEventListener('click', () => corriger(fait, i));
      return b;
    });

    afficher([
      entete(),
      progression(),
      el('span', { class: 'text-sm text-stone-400' }, parId[fait.theme]?.nom ?? ''),
      el('h3', { id: 'quiz-titre', tabindex: '-1', autofocus: true, class: 'focus:outline-none font-display text-xl font-bold leading-snug text-stone-100' }, fait.quiz.question),
      el('div', { class: 'grid grid-cols-2 gap-2' }, boutons),
    ]);
  }

  function corriger(fait, choisi) {
    const { choix, reponse } = fait.quiz;
    const juste = choisi === reponse;
    reponses[rang] = juste;
    partie.surReponse?.(rang, juste);
    const verdict = VERDICTS[fait.verdict] ?? VERDICTS.nuance;
    const derniere = !reponses.includes(null);

    const suivante = el('button', { type: 'button', autofocus: true, class: boutonPrincipal }, derniere ? 'Voir mon score' : 'Question suivante');
    suivante.addEventListener('click', () => {
      rang = reponses.indexOf(null);
      if (rang === -1) afficherResultat(); else afficherQuestion();
    });
    const voir = el('button', { type: 'button', class: 'text-sm font-medium text-brass-400 underline underline-offset-4' }, 'Voir la carte complète');
    voir.addEventListener('click', () => { dialog.close(); onVoirCarte(fait, reprendre); });

    // Rappel des choix : la bonne réponse en vert, la mauvaise réponse choisie en rouge.
    const recap = choix.map((c, i) => el('span', {
      class: `rounded-xl border px-3 py-2 text-center text-sm font-semibold ${
        i === reponse ? 'border-emerald-400 bg-emerald-950 text-emerald-200'
          : i === choisi ? 'border-rose-400 bg-rose-950 text-rose-200 line-through'
            : 'border-ink-600 text-stone-500'}`,
    }, c));

    afficher([
      entete(),
      progression(),
      el('p', { class: `font-display text-2xl font-bold ${juste ? 'text-emerald-300' : 'text-rose-300'}`, role: 'status' },
        juste ? 'Bonne réponse !' : 'Raté !'),
      el('p', { class: 'text-sm font-medium text-stone-300' }, fait.quiz.question),
      el('div', { class: 'grid grid-cols-2 gap-2' }, recap),
      el('p', { class: 'text-sm leading-snug text-stone-300' }, [
        el('span', { class: 'font-semibold text-brass-400' }, fait.chiffre.valeur), ` ${fait.chiffre.legende}`,
      ]),
      el('div', { class: 'flex flex-col gap-2 rounded-xl border border-ink-600 p-3 text-sm' }, [
        el('span', { class: 'text-stone-400' }, 'L\'idée reçue derrière ce chiffre :'),
        el('span', { class: 'font-semibold text-stone-100' }, `« ${fait.ideeRecue} »`),
        el('span', { class: `self-start rounded-full px-3 py-0.5 text-xs font-semibold ${verdict.classes}` }, verdict.label),
      ]),
      el('div', { class: 'flex flex-wrap items-center justify-between gap-3 pt-1' }, [voir, suivante]),
    ]);
  }

  function afficherResultat() {
    enCours = false;
    afficher(partie.resultat(reponses, {
      rejouer: () => demarrer(partie.nouvelle ? partie.nouvelle() : partie),
      fermer: () => dialog.close(),
    }));
  }

  function afficher(enfants) {
    dialog.replaceChildren(el('div', { class: 'flex flex-col gap-5 p-6' }, enfants));
    dialog.querySelector('[autofocus]')?.focus();
  }

  /** Rouvre le quiz tel qu'on l'a laissé (même question, même score). */
  function reprendre() {
    if (!dialog.open) dialog.showModal();
  }

  return {
    /** Reprend la partie interrompue si c'est la même ; sinon, la démarre. */
    ouvrir(nouvelle) {
      if (enCours && partie?.cle === nouvelle.cle) reprendre(); else demarrer(nouvelle);
    },
  };
}

/** Quiz libre : 10 questions au hasard parmi les cartes publiées, autant de parties qu'on veut. */
export function partieLibre(faits) {
  const nouvelle = () => ({
    cle: 'libre',
    titre: 'Quiz des chiffres',
    questions: melanger(faits.filter((f) => f.quiz)).slice(0, NB_QUESTIONS),
    nouvelle,
    resultat(reponses, { rejouer, fermer }) {
      const total = reponses.length;
      const score = reponses.filter(Boolean).length;
      const meilleur = Math.max(score, lireRecord());
      ecrireRecord(meilleur);
      compter('quiz-termine', `Quiz terminé : ${score}/${total}`, true);

      const rejouerB = el('button', { type: 'button', class: boutonSecondaire }, 'Rejouer');
      rejouerB.addEventListener('click', rejouer);
      const partager = el('button', { type: 'button', autofocus: true, class: boutonPrincipal }, 'Partager mon score');
      partager.addEventListener('click', () => {
        compter('partage/quiz', 'Partage du score du quiz', true);
        partagerTexte(`J'ai eu ${score}/${total} au quiz des chiffres de La Balance des Faits. Et vous, vous connaissez les vrais chiffres ?`,
          `${config.site}#quiz`, partager);
      });
      const fermerB = el('button', { type: 'button', class: lienDiscret }, 'Retour aux cartes');
      fermerB.addEventListener('click', fermer);

      return [
        el('p', { class: 'text-sm font-medium text-stone-400' }, 'Quiz terminé'),
        el('p', { class: 'font-display text-6xl font-bold tracking-tight text-brass-400' }, `${score}/${total}`),
        el('p', { class: 'font-display text-xl font-bold text-stone-100' }, appreciation(score / total)),
        el('p', { class: 'text-sm text-stone-400' }, `Votre record : ${meilleur}/${total}`),
        el('div', { class: 'flex flex-wrap gap-3 pt-2' }, [partager, rejouerB]),
        fermerB,
      ];
    },
  });
  return nouvelle();
}

export function appreciation(part) {
  if (part === 1) return 'Sans faute ! Les chiffres n\'ont pas de secret pour vous.';
  if (part >= 0.7) return 'Très bien ! Vous ne vous laissez pas avoir par les idées reçues.';
  if (part >= 0.4) return 'Pas mal, mais certaines idées reçues ont la vie dure.';
  return 'Les idées reçues vous ont eu… Les cartes sont là pour ça !';
}

/** Copie mélangée (Fisher-Yates). */
function melanger(liste) {
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

function lireRecord() {
  try { return Number(localStorage.getItem(CLE_RECORD)) || 0; } catch { return 0; }
}

function ecrireRecord(valeur) {
  try { localStorage.setItem(CLE_RECORD, String(valeur)); } catch { /* stockage indisponible */ }
}
