import { el } from '../utils/dom.js';

const CLE = 'bandeau-installation-ferme';

/**
 * Bandeau « Ajoutez le site à votre écran d'accueil ».
 * Affiché sur mobile uniquement, jamais dans l'appli installée, et plus du tout une fois fermé.
 */
export function createBandeauInstallation(bandeau) {
  const installe = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  if (installe || !matchMedia('(pointer: coarse)').matches || dejaFerme()) return;

  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const texte = el('p', { class: 'flex-1' }, ios
    ? 'Ajoutez le site à votre écran d\'accueil : touchez Partager, puis « Sur l\'écran d\'accueil ».'
    : 'Ajoutez le site à votre écran d\'accueil depuis le menu de votre navigateur.');

  const fermer = el('button', { type: 'button', class: 'shrink-0 px-2 text-lg leading-none text-stone-400 hover:text-stone-100', 'aria-label': 'Fermer' }, '×');
  fermer.addEventListener('click', () => {
    bandeau.hidden = true;
    try { localStorage.setItem(CLE, '1'); } catch { /* stockage indisponible : le bandeau reviendra */ }
  });

  bandeau.replaceChildren(el('div', { class: 'mx-auto flex max-w-5xl items-center gap-3 px-5 py-2.5 text-sm text-stone-200' }, [texte, fermer]));
  bandeau.hidden = false;

  // Android (Chrome, Edge, Samsung) : le navigateur propose l'installation en un geste.
  addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    const ajouter = el('button', { type: 'button', class: 'shrink-0 rounded-full bg-brass-500 px-3 py-1 font-semibold text-ink-900' }, 'Ajouter');
    ajouter.addEventListener('click', async () => {
      e.prompt();
      if ((await e.userChoice).outcome === 'accepted') bandeau.hidden = true;
    });
    texte.textContent = 'Ajoutez le site à votre écran d\'accueil pour le retrouver en un geste.';
    fermer.before(ajouter);
  });
  addEventListener('appinstalled', () => { bandeau.hidden = true; });
}

function dejaFerme() {
  try { return localStorage.getItem(CLE) === '1'; } catch { return false; }
}
