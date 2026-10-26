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

/** Largeur de chaque barre, en % de la plus grande (ou de `max` s'il est fourni). Sert aussi aux pages de cartes. */
export function largeursBarres({ items, max }) {
  const echelle = max ?? Math.max(...items.map((i) => i.valeur));
  return items.map(({ valeur }) => Math.max(0, Math.min(100, (valeur / echelle) * 100)));
}

function barres(viz) {
  const { items, unite = '' } = viz;
  const largeurs = largeursBarres(viz);
  const liste = el('ul', { class: 'space-y-3', role: 'list' });

  for (const [i, { label, valeur, accent }] of items.entries()) {
    const pct = largeurs[i];
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
