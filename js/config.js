/**
 * Réglages du site.
 *
 * formulaire  adresse qui reçoit les questions des lecteurs (POST, réponse JSON).
 *             Compatible Formspree : créer un formulaire sur https://formspree.io,
 *             puis coller ici son adresse, du type 'https://formspree.io/f/abcdwxyz'.
 *             Laisser vide tant qu'il n'y en a pas : le panneau l'indique au visiteur.
 * site        adresse publique du site, avec la barre finale. Sert aux aperçus de liens
 *             (messageries, réseaux) et au balisage ClaimReview des pages de cartes.
 * statistiques  code du compte GoatCounter (statistiques de visite sans cookies) : pour
 *             https://balance.goatcounter.com, écrire 'balance'. Vide = pas de statistiques.
 * dureeBadges nombre de jours pendant lesquels une carte affiche « Nouveau » et
 *             « Question d'un lecteur », à compter de sa date de publication (publieLe).
 */
export const config = {
  site: 'https://sicode94.github.io/la-balance-des-faits/',
  formulaire: 'https://formspree.io/f/xzeeevyr',
  statistiques: '',
  dureeBadges: 5,
};
