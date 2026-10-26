import { config } from './config.js';

/**
 * Statistiques de visite avec GoatCounter (sans cookies, pas de bandeau à afficher).
 * Inactif tant que `config.statistiques` est vide, et hors connexion (le script ne se charge pas).
 */
if (config.statistiques && typeof document !== 'undefined') { // pas de page quand le générateur de cartes importe ce module
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';
  script.dataset.goatcounter = `https://${config.statistiques}.goatcounter.com/count`;
  document.head.append(script);
}

/**
 * Compte une page vue (`compter('carte/dette-publique', 'titre')`)
 * ou un événement (`compter('partage/dette-publique', 'titre', true)`).
 */
export function compter(chemin, titre = chemin, evenement = false) {
  window.goatcounter?.count?.({ path: chemin, title: titre, event: evenement });
}
