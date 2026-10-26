import { el, formatNombre } from '../utils/dom.js';

/**
 * Registre des visualisations. Pour en ajouter une (anneau, courbe...),
 * écrire une fonction (donnees) => Node et l'enregistrer ici.
 */
const RENDERERS = { barres };

export function renderVisualisation(viz) {
  const render = RENDERERS[viz?.type];
  return render ? render(viz) : el('div');
}

function barres({ items, unite = '', max }) {
  const echelle = max ?? Math.max(...items.map((i) => i.valeur));
  const liste = el('ul', { class: 'space-y-3', role: 'list' });

  for (const { label, valeur, accent } of items) {
    const pct = Math.max(0, Math.min(100, (valeur / echelle) * 100));
    const remplissage = el('div', {
      class: `bar-fill h-full rounded-full ${accent ? 'bg-brass-500' : 'bg-stone-500'}`,
      style: `--w:${pct}%`,
    });
    liste.append(
      el('li', {}, [
        el('div', { class: 'mb-1 flex justify-between gap-3 text-sm' }, [
          el('span', { class: accent ? 'font-semibold text-stone-100' : 'text-stone-400' }, label),
          el('span', { class: 'tabular-nums font-medium text-stone-100' }, `${formatNombre(valeur)}${unite}`),
        ]),
        el('div', { class: 'h-2.5 overflow-hidden rounded-full bg-ink-600' }, remplissage),
      ])
    );
  }
  return liste;
}
