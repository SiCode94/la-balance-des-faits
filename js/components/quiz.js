import { el } from '../utils/dom.js';
import { VERDICTS } from './detail.js';
import { config } from '../config.js';
import { compter } from '../statistiques.js';

const NB_QUESTIONS = 10;
const CLE_RECORD = 'quiz-record';
const CHOIX = ['vrai', 'nuance', 'faux'];

const boutonPrincipal = 'rounded-full bg-brass-500 px-5 py-2 text-sm font-semibold text-ink-900 hover:bg-brass-400';
const boutonSecondaire = 'rounded-full border border-brass-500 px-5 py-2 text-sm font-semibold text-brass-300 hover:bg-brass-500 hover:text-ink-900';

/**
 * Quiz « Vrai, À nuancer ou Faux ? » (élément <dialog>) : `ouvrir()`.
 * `onVoirCarte(fait)` ouvre la fiche complète d'une carte depuis la correction.
 */
export function createQuiz(dialog, faits, themes, onVoirCarte) {
  const parId = Object.fromEntries(themes.map((t) => [t.id, t]));
  let questions = [];
  let rang = 0;
  let score = 0;

  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

  function demarrer() {
    questions = melanger(faits).slice(0, NB_QUESTIONS);
    rang = 0;
    score = 0;
    afficherQuestion();
    if (!dialog.open) dialog.showModal();
  }

  function entete() {
    const fermer = el('button', { type: 'button', class: 'text-sm font-medium text-stone-300 underline underline-offset-4' }, 'Fermer');
    fermer.addEventListener('click', () => dialog.close());
    return el('div', { class: 'flex items-center justify-between gap-3' }, [
      el('span', { class: 'text-sm font-medium text-stone-400' }, `Question ${rang + 1} sur ${questions.length} · Score : ${score}`),
      fermer,
    ]);
  }

  function progression() {
    return el('div', { class: 'h-1.5 overflow-hidden rounded-full bg-ink-600' },
      el('div', { class: 'h-full rounded-full bg-brass-500 transition-all', style: `width:${(rang / questions.length) * 100}%` }));
  }

  function afficherQuestion() {
    const fait = questions[rang];
    const boutons = CHOIX.map((choix) => {
      const b = el('button', {
        type: 'button',
        class: 'rounded-xl border border-ink-600 bg-ink-900 px-4 py-3 text-base font-semibold text-stone-100 hover:border-brass-500',
      }, VERDICTS[choix].label);
      b.addEventListener('click', () => corriger(fait, choix));
      return b;
    });

    afficher([
      entete(),
      progression(),
      el('span', { class: 'text-sm text-stone-400' }, parId[fait.theme]?.nom ?? ''),
      el('h3', { id: 'quiz-titre', tabindex: '-1', autofocus: true, class: 'focus:outline-none font-display text-2xl font-bold leading-snug text-stone-100' }, `« ${fait.ideeRecue} »`),
      el('p', { class: 'text-sm text-stone-400' }, 'Selon vous, c\'est…'),
      el('div', { class: 'grid gap-2' }, boutons),
    ]);
  }

  function corriger(fait, choix) {
    const juste = choix === fait.verdict;
    if (juste) score += 1;
    const verdict = VERDICTS[fait.verdict] ?? VERDICTS.nuance;
    const derniere = rang === questions.length - 1;

    const suivante = el('button', { type: 'button', autofocus: true, class: boutonPrincipal }, derniere ? 'Voir mon score' : 'Question suivante');
    suivante.addEventListener('click', () => {
      rang += 1;
      if (derniere) afficherResultat(); else afficherQuestion();
    });
    const voir = el('button', { type: 'button', class: 'text-sm font-medium text-brass-400 underline underline-offset-4' }, 'Voir la carte complète');
    voir.addEventListener('click', () => { dialog.close(); onVoirCarte(fait); });

    afficher([
      entete(),
      progression(),
      el('p', { class: `font-display text-2xl font-bold ${juste ? 'text-emerald-300' : 'text-rose-300'}`, role: 'status' },
        juste ? 'Bonne réponse !' : 'Raté !'),
      el('h3', { class: 'font-display text-lg font-bold leading-snug text-stone-100' }, `« ${fait.ideeRecue} »`),
      el('div', { class: 'flex flex-wrap items-center gap-2 text-sm text-stone-400' }, [
        'Verdict :',
        el('span', { class: `rounded-full px-3 py-1 text-sm font-semibold ${verdict.classes}` }, verdict.label),
      ]),
      el('div', {}, [
        el('p', { class: 'font-display text-4xl font-bold tracking-tight text-brass-400' }, fait.chiffre.valeur),
        el('p', { class: 'mt-1 text-sm leading-snug text-stone-300' }, fait.chiffre.legende),
      ]),
      el('div', { class: 'flex flex-wrap items-center justify-between gap-3 pt-2' }, [voir, suivante]),
    ]);
  }

  function afficherResultat() {
    const total = questions.length;
    const record = Math.max(score, lireRecord());
    ecrireRecord(record);
    compter('quiz-termine', `Quiz terminé : ${score}/${total}`, true);

    const rejouer = el('button', { type: 'button', class: boutonSecondaire }, 'Rejouer');
    rejouer.addEventListener('click', demarrer);
    const partager = el('button', { type: 'button', autofocus: true, class: boutonPrincipal }, 'Partager mon score');
    partager.addEventListener('click', () => partagerScore(score, total, partager));
    const fermer = el('button', { type: 'button', class: 'text-sm font-medium text-stone-300 underline underline-offset-4' }, 'Retour aux cartes');
    fermer.addEventListener('click', () => dialog.close());

    afficher([
      el('p', { class: 'text-sm font-medium text-stone-400' }, 'Quiz terminé'),
      el('p', { class: 'font-display text-6xl font-bold tracking-tight text-brass-400' }, `${score}/${total}`),
      el('p', { class: 'font-display text-xl font-bold text-stone-100' }, appreciation(score / total)),
      el('p', { class: 'text-sm text-stone-400' }, `Votre record : ${record}/${total}`),
      el('div', { class: 'flex flex-wrap gap-3 pt-2' }, [partager, rejouer]),
      fermer,
    ]);
  }

  function afficher(enfants) {
    dialog.replaceChildren(el('div', { class: 'flex flex-col gap-5 p-6' }, enfants));
    dialog.querySelector('[autofocus]')?.focus();
  }

  return { ouvrir: demarrer };
}

function appreciation(part) {
  if (part === 1) return 'Sans faute ! Les chiffres n\'ont pas de secret pour vous.';
  if (part >= 0.7) return 'Très bien ! Vous ne vous laissez pas avoir par les idées reçues.';
  if (part >= 0.4) return 'Pas mal, mais certaines idées reçues ont la vie dure.';
  return 'Les idées reçues vous ont eu… Les cartes sont là pour ça !';
}

async function partagerScore(score, total, bouton) {
  const url = `${config.site}#quiz`;
  const texte = `J'ai eu ${score}/${total} au quiz de La Balance des Faits : vrai, faux ou à nuancer ? Et vous ?`;
  compter('partage/quiz', 'Partage du score du quiz', true);
  if (navigator.share) {
    try { await navigator.share({ title: 'La Balance des Faits', text: texte, url }); } catch { /* partage annulé */ }
    return;
  }
  try {
    await navigator.clipboard.writeText(`${texte} ${url}`);
    bouton.textContent = 'Texte copié';
  } catch {
    bouton.textContent = 'Copie impossible';
  }
  setTimeout(() => { bouton.textContent = 'Partager mon score'; }, 2000);
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
