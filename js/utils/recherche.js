/** Texte en minuscules et sans accents, pour comparer « économie » et « Economie ». */
export function normaliser(texte) {
  return String(texte).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/** Vrai si tous les mots recherchés apparaissent dans la carte (idée reçue, chiffre, explication ou thème). */
export function correspond(fait, recherche, nomTheme = '') {
  const mots = normaliser(recherche).split(/\s+/).filter(Boolean);
  if (!mots.length) return true;
  const contenu = normaliser([fait.ideeRecue, fait.chiffre.valeur, fait.chiffre.legende, fait.explication, nomTheme].join(' '));
  return mots.every((mot) => contenu.includes(mot));
}
