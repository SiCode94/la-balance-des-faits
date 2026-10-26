/**
 * Cartes à proposer après une carte : d'abord celles du même thème, puis les plus récentes des autres thèmes.
 * L'ordre est stable, pour que l'appli et les pages de cartes proposent les mêmes.
 */
export function cartesLiees(fait, faits, nombre = 3) {
  const autres = faits.filter((f) => f.id !== fait.id);
  const memeTheme = autres.filter((f) => f.theme === fait.theme);
  const ailleurs = autres.filter((f) => f.theme !== fait.theme).reverse(); // les dernières ajoutées d'abord
  return [...memeTheme, ...ailleurs].slice(0, nombre);
}
