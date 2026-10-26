import { el, formatDate } from '../utils/dom.js';
import { renderVisualisation } from './visualisation.js';
import { config } from '../config.js';

export const VERDICTS = {
  faux:   { label: 'Faux',      classes: 'bg-rose-950 text-rose-200' },
  nuance: { label: 'À nuancer', classes: 'bg-amber-950 text-amber-200' },
  vrai:   { label: 'Vrai',      classes: 'bg-emerald-950 text-emerald-200' },
};

/** Gère la fiche détaillée (élément <dialog>) : `ouvrir(fait, theme)`. */
export function createDetail(dialog) {
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); }); // clic hors de la fiche

  return {
    ouvrir(fait, theme) {
      const verdict = VERDICTS[fait.verdict] ?? VERDICTS.nuance;
      const fermer = el('button', { type: 'button', class: 'text-sm font-medium text-stone-300 underline underline-offset-4' }, 'Fermer');
      fermer.addEventListener('click', () => dialog.close());
      const partager = el('button', {
        type: 'button', class: 'rounded-full border border-brass-500 px-4 py-1.5 text-sm font-semibold text-brass-300 hover:bg-brass-500 hover:text-ink-900',
      }, 'Partager');
      partager.addEventListener('click', () => partagerCarte(fait, partager));

      dialog.replaceChildren(el('div', { class: 'flex flex-col gap-5 p-6' }, [
        el('div', { class: 'flex items-center justify-between gap-3' }, [
          el('span', { class: `rounded-full px-3 py-1 text-sm font-semibold ${verdict.classes}` }, verdict.label),
          el('span', { class: 'text-sm text-stone-400' }, theme?.nom ?? ''),
        ]),
        el('h3', { id: 'detail-titre', tabindex: '-1', autofocus: true, class: 'focus:outline-none font-display text-xl font-bold leading-snug text-stone-100' }, `« ${fait.ideeRecue} »`),
        el('div', {}, [
          el('p', { class: 'font-display text-5xl font-bold tracking-tight text-brass-400' }, fait.chiffre.valeur),
          el('p', { class: 'mt-1 text-sm leading-snug text-stone-400' }, fait.chiffre.legende),
        ]),
        renderVisualisation(fait.visualisation),
        el('p', { class: 'text-sm leading-relaxed text-stone-300' }, fait.explication),
        el('div', { class: 'flex flex-col gap-3 border-t border-ink-600 pt-4 text-sm' }, [
          el('a', { href: fait.source.url, target: '_blank', rel: 'noopener noreferrer',
            class: 'font-medium text-brass-400 underline underline-offset-4' }, `Source : ${fait.source.nom}`),
          el('span', { class: 'text-stone-500' }, `Vérifié le ${formatDate(fait.verifieLe)}`),
          el('div', { class: 'flex items-center justify-between gap-3' }, [partager, fermer]),
        ]),
      ]));
      dialog.showModal();
    },
  };
}

/**
 * Partage la page de la carte (cartes/<id>.html, générée par npm run cartes) : c'est elle qui donne
 * l'aperçu dans les messageries. Menu de partage du téléphone, sinon copie dans le presse-papiers.
 */
export async function partagerCarte(fait, bouton) {
  const url = `${config.site}cartes/${fait.id}.html`;
  const verdict = VERDICTS[fait.verdict] ?? VERDICTS.nuance;
  const texte = `« ${fait.ideeRecue} » ${verdict.label} : ${fait.chiffre.valeur} ${fait.chiffre.legende}`;
  if (navigator.share) {
    try { await navigator.share({ title: 'La Balance des Faits', text: texte, url }); } catch { /* partage annulé */ }
    return;
  }
  try {
    await navigator.clipboard.writeText(url);
    bouton.textContent = 'Lien copié';
  } catch {
    bouton.textContent = 'Copie impossible';
  }
  setTimeout(() => { bouton.textContent = 'Partager'; }, 2000);
}
