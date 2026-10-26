import { el } from '../utils/dom.js';
import { VERDICTS } from './detail.js';

/**
 * Barre de recherche et filtre par verdict, au-dessus de la grille.
 * `onChange({ texte, verdict })` est appelé à chaque modification ; `effacer()` remet tout à zéro.
 */
export function createFiltres(conteneur, onChange) {
  let verdict = 'tous';

  const champ = el('input', {
    type: 'search', id: 'recherche', autocomplete: 'off', enterkeyhint: 'search',
    'aria-label': 'Rechercher une idée reçue',
    placeholder: 'Rechercher : retraites, immigration, chômage…',
    class: 'w-full rounded-full border border-ink-600 bg-ink-800 px-4 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:border-brass-500 focus:outline-none',
  });
  champ.addEventListener('input', () => onChange(etat()));

  const boutons = new Map();
  const choix = [['tous', 'Tous les verdicts'], ...Object.entries(VERDICTS).map(([id, v]) => [id, v.label])];
  const groupe = el('div', { class: 'flex flex-wrap gap-2', role: 'group', 'aria-label': 'Filtrer par verdict' },
    choix.map(([id, label]) => {
      const b = el('button', {
        type: 'button', 'aria-pressed': String(id === verdict),
        class: 'rounded-full border border-ink-600 px-3 py-1 text-xs font-medium text-stone-300 hover:border-brass-500 aria-pressed:border-brass-500 aria-pressed:bg-ink-700 aria-pressed:text-brass-300',
      }, label);
      b.addEventListener('click', () => { verdict = id; majBoutons(); onChange(etat()); });
      boutons.set(id, b);
      return b;
    }));

  function majBoutons() {
    for (const [id, b] of boutons) b.setAttribute('aria-pressed', String(id === verdict));
  }
  function etat() {
    return { texte: champ.value.trim(), verdict };
  }

  conteneur.replaceChildren(champ, groupe);
  return {
    etat,
    effacer() { champ.value = ''; verdict = 'tous'; majBoutons(); onChange(etat()); },
  };
}
