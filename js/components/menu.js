import { el } from '../utils/dom.js';

/**
 * Menu latéral (élément <dialog>, ouvert par le bouton ☰) qui rassemble tout le site.
 * `rubriques` : [{ titre, entrees: [{ icone, libelle, detail?, action | href }] }].
 * `entete()` renvoie le bloc du haut (série de flammes), redessiné à chaque ouverture.
 */
export function createMenu(dialog, { entete, rubriques }) {
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); }); // clic hors du panneau

  const fermer = el('button', { type: 'button', class: 'text-sm font-medium text-stone-300 underline underline-offset-4' }, 'Fermer');
  fermer.addEventListener('click', () => dialog.close());

  function entree({ icone, libelle, detail, action, href }) {
    const contenu = [
      el('span', { class: 'w-6 shrink-0 text-center text-lg', 'aria-hidden': 'true' }, icone),
      el('span', { class: 'flex flex-col' }, [
        el('span', { class: 'font-medium text-stone-100' }, libelle),
        ...(detail ? [el('span', { class: 'text-xs text-stone-400' }, detail)] : []),
      ]),
    ];
    const classe = 'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm hover:bg-ink-700';
    if (href) return el('a', { href, class: classe }, contenu);
    const b = el('button', { type: 'button', class: classe }, contenu);
    // On ferme le menu avant d'ouvrir autre chose (quiz, carte, boîte à questions…).
    b.addEventListener('click', () => { dialog.close(); action(); });
    return b;
  }

  function dessiner() {
    dialog.replaceChildren(el('nav', { class: 'flex min-h-full flex-col gap-5 p-6', 'aria-labelledby': 'menu-titre' }, [
      el('div', { class: 'flex items-center justify-between gap-3' }, [
        el('h2', { id: 'menu-titre', class: 'font-display text-xl font-bold text-stone-50' }, 'Menu'),
        fermer,
      ]),
      entete(),
      ...rubriques.map(({ titre, entrees }) => el('section', { class: 'flex flex-col gap-1' }, [
        el('h3', { class: 'px-3 text-xs font-semibold uppercase tracking-wide text-stone-500' }, titre),
        ...entrees.filter(Boolean).map(entree),
      ])),
    ]));
  }

  return {
    ouvrir() {
      dessiner(); // à jour : flamme, carte du jour
      if (!dialog.open) dialog.showModal();
    },
  };
}
