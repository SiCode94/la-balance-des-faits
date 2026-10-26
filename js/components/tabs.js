import { el } from '../utils/dom.js';

/** Barre d'onglets. `onSelect(id)` est appelé au clic ; `setActive(id)` met à jour l'affichage. */
export function createTabs(conteneur, themes, comptes, onSelect) {
  const boutons = new Map();
  for (const { id, nom } of [{ id: 'tous', nom: 'Tous' }, ...themes]) {
    const n = comptes[id] ?? 0;
    const bouton = el('button', {
      type: 'button', role: 'tab',
      class: `shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium hover:border-brass-500 aria-selected:border-brass-500 aria-selected:bg-brass-500 aria-selected:text-ink-900 ${
        n ? 'border-ink-600 text-stone-300' : 'border-ink-700 text-stone-500'}`,
    }, [nom, el('span', { class: 'ml-2 text-xs opacity-70' }, String(n))]);
    bouton.addEventListener('click', () => onSelect(id));
    boutons.set(id, bouton);
    conteneur.append(bouton);
  }
  return {
    setActive(actif) {
      for (const [id, b] of boutons) b.setAttribute('aria-selected', String(id === actif));
      boutons.get(actif)?.scrollIntoView({ inline: 'center', block: 'nearest' });
    },
  };
}
