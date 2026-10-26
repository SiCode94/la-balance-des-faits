import { el, formatDate } from '../utils/dom.js';
import { renderVisualisation } from './visualisation.js';

const VERDICTS = {
  faux:   { label: 'Faux',      classes: 'bg-rose-100 text-rose-800' },
  nuance: { label: 'À nuancer', classes: 'bg-amber-100 text-amber-900' },
  vrai:   { label: 'Vrai',      classes: 'bg-emerald-100 text-emerald-800' },
};

export function createCard(fait) {
  const verdict = VERDICTS[fait.verdict] ?? VERDICTS.nuance;

  // Recto : un bouton, pour que la carte soit utilisable au clavier.
  const recto = el('button', {
    type: 'button',
    class: 'flip-face flex flex-col justify-between rounded-2xl border border-slate-300 bg-white p-6 text-left shadow-sm hover:border-slate-500',
    'aria-expanded': 'false',
  }, [
    el('span', { class: 'text-sm font-medium text-slate-500' }, fait.theme),
    el('span', { class: 'font-display my-8 block text-2xl font-bold leading-snug text-slate-900' }, `« ${fait.ideeRecue} »`),
    el('span', { class: 'text-sm font-medium text-slate-700 underline underline-offset-4' }, 'Voir les faits'),
  ]);

  const retour = el('button', {
    type: 'button',
    class: 'text-left text-sm font-medium text-slate-700 underline underline-offset-4',
  }, 'Retourner la carte');

  // Verso
  const verso = el('div', {
    class: 'flip-face flip-back flex flex-col gap-5 rounded-2xl border border-slate-900 bg-white p-6 shadow-sm',
  }, [
    el('div', { class: 'flex items-center justify-between gap-3' }, [
      el('span', { class: `rounded-full px-3 py-1 text-sm font-semibold ${verdict.classes}` }, verdict.label),
      el('span', { class: 'text-sm text-slate-500' }, fait.theme),
    ]),
    el('div', {}, [
      el('p', { class: 'font-display text-5xl font-bold tracking-tight text-slate-900' }, fait.chiffre.valeur),
      el('p', { class: 'mt-1 text-sm leading-snug text-slate-600' }, fait.chiffre.legende),
    ]),
    renderVisualisation(fait.visualisation),
    el('p', { class: 'text-sm leading-relaxed text-slate-700' }, fait.explication),
    el('div', { class: 'mt-auto flex flex-col gap-3 border-t border-slate-200 pt-4 text-sm' }, [
      el('a', {
        href: fait.source.url, target: '_blank', rel: 'noopener noreferrer',
        class: 'font-medium text-blue-700 underline underline-offset-4',
      }, `Source : ${fait.source.nom}`),
      el('span', { class: 'text-slate-500' }, `Vérifié le ${formatDate(fait.verifieLe)}`),
      retour,
    ]),
  ]);

  const carte = el('article', { class: 'flip-card', 'data-id': fait.id },
    el('div', { class: 'flip-inner' }, [recto, verso]));

  const basculer = (ouvert) => {
    carte.classList.toggle('is-flipped', ouvert);
    recto.setAttribute('aria-expanded', String(ouvert));
    // La face cachée ne doit être ni focusable ni lue par les lecteurs d'écran.
    recto.inert = ouvert;
    verso.inert = !ouvert;
    (ouvert ? retour : recto).focus({ preventScroll: true });
  };

  verso.inert = true;
  recto.addEventListener('click', () => basculer(true));
  retour.addEventListener('click', () => basculer(false));
  carte.addEventListener('keydown', (e) => { if (e.key === 'Escape') basculer(false); });

  return carte;
}
