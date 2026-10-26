import { el } from '../utils/dom.js';

/** Petite carte de la grille : l'idée reçue uniquement. Le clic ouvre le détail. */
export function createTile(fait, theme, onOpen) {
  const tuile = el('button', {
    type: 'button',
    class: 'flex min-h-[9.5rem] flex-col justify-between rounded-xl border border-ink-600 bg-ink-800 p-4 text-left transition hover:-translate-y-0.5 hover:border-brass-500',
  }, [
    el('span', { class: 'text-xs text-stone-400' }, theme?.nom ?? ''),
    el('span', { class: 'font-display my-3 block text-base font-bold leading-snug text-stone-100' }, fait.ideeRecue),
    el('span', { class: 'text-xs font-medium text-brass-400' }, 'Voir les faits'),
  ]);
  tuile.addEventListener('click', () => onOpen(fait));
  return tuile;
}
