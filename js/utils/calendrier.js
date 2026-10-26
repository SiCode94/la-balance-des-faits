/**
 * Calendrier du site, toujours à l'heure de Paris (quel que soit le fuseau du téléphone).
 * Le « jour de jeu » commence à 9 h : la carte datée du 27 et le défi du 27 s'ouvrent le 27 à 9 h.
 */
export const HEURE_OUVERTURE = 9;

const format = new Intl.DateTimeFormat('fr-FR', {
  timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
});

/** Date et heure de Paris : { date: 'AAAA-MM-JJ', secondes } (secondes écoulées depuis minuit). */
function paris(maintenant) {
  const p = Object.fromEntries(format.formatToParts(maintenant).map(({ type, value }) => [type, value]));
  return { date: `${p.year}-${p.month}-${p.day}`, secondes: Number(p.hour) * 3600 + Number(p.minute) * 60 + Number(p.second) };
}

/** Ajoute (ou retire) des jours à une date 'AAAA-MM-JJ'. */
export function decalerJour(date, jours) {
  const [a, m, j] = date.split('-').map(Number);
  return new Date(Date.UTC(a, m - 1, j + jours)).toISOString().slice(0, 10);
}

/** Jour de jeu en cours : avant 9 h, c'est encore celui de la veille. */
export function jourDeJeu(maintenant = new Date()) {
  const { date, secondes } = paris(maintenant);
  return secondes < HEURE_OUVERTURE * 3600 ? decalerJour(date, -1) : date;
}

/** Une carte sans date de publication est visible ; sinon, à partir de 9 h le jour de sa date. */
export function estPubliee(fait, maintenant = new Date()) {
  return !fait.publieLe || fait.publieLe <= jourDeJeu(maintenant);
}

/** Millisecondes avant la prochaine ouverture (9 h à Paris). Approximation d'une heure les jours de changement d'heure. */
export function avantOuverture(maintenant = new Date()) {
  const { secondes } = paris(maintenant);
  let reste = HEURE_OUVERTURE * 3600 - secondes;
  if (reste <= 0) reste += 24 * 3600;
  return reste * 1000;
}

/** « 14 h 32 », « 8 min »… */
export function formatDuree(ms) {
  const minutes = Math.max(1, Math.ceil(ms / 60000));
  const h = Math.floor(minutes / 60);
  return h ? `${h} h ${String(minutes % 60).padStart(2, '0')}` : `${minutes} min`;
}

/** « lundi 27 octobre » */
export function formatJour(date) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
}
