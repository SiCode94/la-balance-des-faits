import { config } from '../config.js';

const JOUR = 24 * 60 * 60 * 1000;

/** Vrai si la carte a été publiée il y a moins de `config.dureeBadges` jours. */
export function estRecente(fait, maintenant = new Date()) {
  if (!fait.publieLe) return false;
  const publication = new Date(`${fait.publieLe}T00:00:00`); // minuit, heure locale
  return maintenant - publication < config.dureeBadges * JOUR;
}

/** Badges à afficher sur une carte récente : « Nouveau » et, s'il y a lieu, « Question d'un lecteur ». */
export function badges(fait, maintenant = new Date()) {
  if (!estRecente(fait, maintenant)) return [];
  return [
    { label: 'Nouveau', classes: 'bg-brass-500 text-ink-900' },
    ...(fait.questionLecteur ? [{ label: 'Question d\'un lecteur', classes: 'border border-brass-500 text-brass-300' }] : []),
  ];
}
