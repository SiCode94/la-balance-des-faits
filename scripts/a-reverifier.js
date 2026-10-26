/**
 * Liste les cartes dont la dernière vérification (verifieLe) date de plus de N mois.
 *
 * Usage : npm run reverifier          (6 mois par défaut)
 *         npm run reverifier -- 3     (plus de 3 mois)
 */
import { pathToFileURL } from 'node:url';
import { faits } from '../js/data/faits.js';

/** Cartes vérifiées il y a plus de `mois` mois, de la plus ancienne à la plus récente. */
export function cartesAReverifier(liste, mois = 6, maintenant = new Date()) {
  const limite = new Date(maintenant);
  limite.setMonth(limite.getMonth() - mois);
  return liste
    .filter((f) => new Date(`${f.verifieLe}T00:00:00`) < limite)
    .sort((a, b) => a.verifieLe.localeCompare(b.verifieLe));
}

// Exécuté directement (et non importé par le générateur) : affiche la liste.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const mois = process.argv[2] === undefined ? 6 : Number(process.argv[2]);
  const aRevoir = cartesAReverifier(faits, mois);
  if (!aRevoir.length) {
    console.log(`Toutes les cartes ont été vérifiées il y a moins de ${mois} mois.`);
  } else {
    console.log(`${aRevoir.length} carte(s) vérifiée(s) il y a plus de ${mois} mois :\n`);
    for (const f of aRevoir) console.log(`  ${f.verifieLe}  ${f.id.padEnd(26)} « ${f.ideeRecue} »`);
    console.log('\nAprès vérification, mettre à jour verifieLe (et noter toute correction dans js/data/corrections.js).');
  }
}
