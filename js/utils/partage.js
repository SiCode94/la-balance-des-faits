/**
 * Partage un texte et un lien : menu de partage du téléphone, sinon copie dans le presse-papiers.
 * Le bouton affiche brièvement « Texte copié » (ou « Copie impossible »), puis reprend son libellé.
 */
export async function partagerTexte(texte, url, bouton) {
  if (navigator.share) {
    try { await navigator.share({ title: 'La Balance des Faits', text: texte, url }); } catch { /* partage annulé */ }
    return;
  }
  const libelle = bouton.textContent;
  try {
    await navigator.clipboard.writeText(`${texte}\n${url}`);
    bouton.textContent = 'Texte copié';
  } catch {
    bouton.textContent = 'Copie impossible';
  }
  setTimeout(() => { bouton.textContent = libelle; }, 2000);
}
