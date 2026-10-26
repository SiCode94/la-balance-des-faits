import { decalerJour } from './calendrier.js';

/**
 * Progression du joueur, enregistrée dans le téléphone (pas de compte) :
 *  jours   { 'AAAA-MM-JJ': [true, false, null] }  réponses au défi de chaque jour (null = pas encore répondu)
 *  serie   nombre de jours de défi consécutifs, dernier  dernier jour où le défi a été terminé, record
 */
const CLE = 'progression';

function lire() {
  try {
    return { jours: {}, serie: 0, record: 0, dernier: null, ...JSON.parse(localStorage.getItem(CLE) ?? '{}') };
  } catch {
    return { jours: {}, serie: 0, record: 0, dernier: null };
  }
}

function ecrire(etat) {
  try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch { /* stockage indisponible : la progression ne sera pas gardée */ }
}

/** Réponses déjà données au défi de ce jour. */
export function reponsesDuJour(jour, nombre) {
  const r = lire().jours[jour] ?? [];
  return Array.from({ length: nombre }, (_, i) => r[i] ?? null);
}

/** Enregistre une réponse ; quand le défi est complet, met la série à jour. Renvoie la série. */
export function enregistrerReponse(jour, index, juste, nombre) {
  const etat = lire();
  const reponses = reponsesDuJour(jour, nombre);
  if (reponses[index] !== null) return serieAffichee(jour); // pas de seconde chance
  reponses[index] = juste;
  etat.jours[jour] = reponses;

  if (reponses.every((r) => r !== null) && etat.dernier !== jour) {
    etat.serie = etat.dernier === decalerJour(jour, -1) ? etat.serie + 1 : 1;
    etat.record = Math.max(etat.record, etat.serie);
    etat.dernier = jour;
  }
  // On ne garde que les 60 derniers jours.
  etat.jours = Object.fromEntries(Object.entries(etat.jours).sort().slice(-60));
  ecrire(etat);
  return serieAffichee(jour);
}

/** Série en cours : elle tient tant que le défi d'hier ou d'aujourd'hui a été joué. */
export function serieAffichee(jour) {
  const { serie, dernier } = lire();
  return dernier === jour || dernier === decalerJour(jour, -1) ? serie : 0;
}

export function record() {
  return lire().record;
}
