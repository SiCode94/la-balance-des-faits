/**
 * Journal des corrections, du plus récent au plus ancien. Publié sur corrections.html par npm run cartes.
 * Ajouter une ligne à chaque correction d'une carte déjà publiée (chiffre, verdict, source, retrait).
 *
 * Champs :
 *  date    date ISO de la correction
 *  carte   l'idée reçue concernée, telle qu'elle était affichée
 *  id      (facultatif) id de la carte si elle existe toujours, pour faire un lien
 *  avant   ce qui était publié
 *  apres   ce qui est publié désormais
 *  raison  pourquoi
 */
export const corrections = [
  {
    date: '2026-10-26',
    carte: 'Le numérique est immatériel, il ne pollue presque pas.',
    avant: 'Carte fondée sur l\'empreinte carbone du numérique en 2022 (4,4 %).',
    apres: 'Carte retirée, remplacée dans le thème Numérique par « La fibre n\'arrive pas dans les campagnes ».',
    raison: 'Aucune donnée de 2024 ou plus récente n\'existe : le chiffre clé de chaque carte doit dater de 2024 au minimum.',
  },
  {
    date: '2026-10-26',
    carte: 'Les élèves français sont dans la moyenne européenne en mathématiques.',
    id: 'niveau-maths',
    avant: 'Verdict « Faux », d\'après l\'enquête TIMSS 2023 (479 points contre 507).',
    apres: 'Carte refaite avec PISA 2025 : « Le niveau des élèves français en maths s\'effondre », verdict « À nuancer ».',
    raison: 'Chiffre clé antérieur à 2024 ; les résultats PISA 2025 ont été publiés en septembre 2026.',
  },
  {
    date: '2026-10-26',
    carte: 'Il y a beaucoup plus de fonctionnaires en France qu\'ailleurs.',
    id: 'nombre-fonctionnaires',
    avant: 'Chiffre clé : 21,1 % de l\'emploi relève des administrations publiques (2021).',
    apres: 'Chiffre clé : 5,9 millions d\'agents fin 2024 (Insee), soit environ 20 % de l\'emploi.',
    raison: 'Chiffre clé antérieur à 2024.',
  },
  {
    date: '2026-10-26',
    carte: 'Si on taxe les riches, ils vont quitter le pays.',
    id: 'exil-fiscal',
    avant: 'Chiffre clé : 950 départs par an de redevables de l\'ISF (2011-2016).',
    apres: 'Chiffre clé : 90 à 900 foyers partiraient pour chaque point d\'impôt en plus (Conseil d\'analyse économique, 2025). Les flux anciens restent en comparaison.',
    raison: 'Chiffre clé antérieur à 2024.',
  },
  {
    date: '2026-10-26',
    carte: 'La France est le pays le plus taxé d\'Europe.',
    id: 'pays-le-plus-taxe',
    avant: 'Verdict « À nuancer ».',
    apres: 'Verdict « Faux ».',
    raison: 'Le verdict juge l\'affirmation telle qu\'elle est formulée : la France est 2e de l\'UE, pas 1re. La carte « pays le plus endetté », dans le même cas, était déjà notée « Faux ».',
  },
  {
    date: '2026-10-26',
    carte: 'Les homicides explosent en France.',
    id: 'homicides',
    avant: 'Verdict « À nuancer ».',
    apres: 'Verdict « Faux ».',
    raison: 'Même règle : le nombre d\'homicides est stable en 2025.',
  },
  {
    date: '2026-10-26',
    carte: 'Les Français ont déserté les salles de cinéma.',
    id: 'cinema-deserte',
    avant: 'Verdict « À nuancer ».',
    apres: 'Verdict « Faux ».',
    raison: 'Même règle : 156 millions d\'entrées en 2025, la France reste le premier marché européen.',
  },
  {
    date: '2026-10-26',
    carte: 'Les Français votent de moins en moins, élection après élection.',
    id: 'participation-elections',
    avant: 'Verdict « À nuancer ».',
    apres: 'Verdict « Faux ».',
    raison: 'Même règle : la participation ne baisse pas à chaque scrutin (forte hausse aux législatives de 2024).',
  },
];
