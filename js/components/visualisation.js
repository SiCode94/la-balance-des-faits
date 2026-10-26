import { el, formatNombre } from '../utils/dom.js';

/**
 * Visualisations des cartes. Types disponibles :
 *  - barres    valeurs positives, barres partant de la gauche (ex. parts, montants)
 *  - evolution variations positives ou négatives (ex. +8 %, −3 %), barres de part et d'autre d'un axe central
 * `lignesVisualisation` calcule le contenu ; l'appli l'affiche ici, les pages de cartes dans scripts/generer-cartes.js.
 */
const TYPES = ['barres', 'evolution'];

/** Lignes à dessiner : libellé, valeur affichée, mise en avant, début et largeur de la barre (en % de la piste). */
export function lignesVisualisation(viz) {
  if (!TYPES.includes(viz?.type)) return [];
  const { items, unite = '', max } = viz;
  const evolution = viz.type === 'evolution';
  const echelle = max ?? Math.max(...items.map((i) => Math.abs(i.valeur)));

  return items.map(({ label, valeur, accent }) => {
    const part = Math.max(0, Math.min(100, (Math.abs(valeur) / echelle) * 100));
    const signe = evolution ? (valeur > 0 ? '+' : valeur < 0 ? '−' : '') : '';
    return {
      label, accent,
      texte: `${signe}${formatNombre(evolution ? Math.abs(valeur) : valeur)}${unite}`,
      // En évolution, la piste est coupée en deux : la moitié droite pour les hausses, la gauche pour les baisses.
      debut: evolution ? (valeur < 0 ? 50 - part / 2 : 50) : 0,
      largeur: evolution ? part / 2 : part,
    };
  });
}

export function renderVisualisation(viz) {
  const lignes = lignesVisualisation(viz);
  if (!lignes.length) return el('div');
  const evolution = viz.type === 'evolution';
  const liste = el('ul', { class: 'space-y-3', role: 'list' });

  for (const { label, texte, accent, debut, largeur } of lignes) {
    const remplissage = el('div', {
      class: `bar-fill h-full rounded-full ${accent ? 'bg-brass-500' : 'bg-stone-500'}`,
      style: `--w:${largeur}%;margin-left:${debut}%`,
    });
    const piste = el('div', { class: 'relative h-2.5 overflow-hidden rounded-full bg-ink-600' }, [
      remplissage,
      ...(evolution ? [el('div', { class: 'absolute inset-y-0 left-1/2 w-px bg-stone-300' })] : []), // axe du zéro
    ]);
    liste.append(
      el('li', {}, [
        el('div', { class: 'mb-1 flex justify-between gap-3 text-sm' }, [
          el('span', { class: accent ? 'font-semibold text-stone-100' : 'text-stone-400' }, label),
          el('span', { class: 'tabular-nums font-medium text-stone-100' }, texte),
        ]),
        piste,
      ])
    );
  }
  return liste;
}
