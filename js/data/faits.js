/**
 * Jeu de données. Pour ajouter un sujet : copier un objet ci-dessous, adapter, et c'est tout.
 *
 * Champs :
 *  id            identifiant unique (slug)
 *  theme         id d'un thème de js/data/themes.js
 *  ideeRecue     l'affirmation à vérifier (recto)
 *  verdict       'faux' | 'nuance' | 'vrai'
 *  chiffre       { valeur, legende } : le chiffre clé et son contexte
 *  visualisation { type: 'barres', unite, max?, items: [{ label, valeur, accent? }] }
 *  explication   2 à 4 phrases, factuelles
 *  source        { nom, url } : source officielle
 *  verifieLe     date ISO de la dernière vérification
 */
export const faits = [
  {
    id: 'part-etrangers',
    theme: 'immigration',
    ideeRecue: 'Les étrangers représentent une part considérable de la population française.',
    verdict: 'nuance',
    chiffre: {
      valeur: '9,1 %',
      legende: 'de la population vivant en France est de nationalité étrangère en 2025 (données provisoires).',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      max: 100,
      items: [
        { label: 'Immigrés (nés étrangers à l\'étranger)', valeur: 11.6 },
        { label: 'Étrangers (nationalité étrangère)', valeur: 9.1, accent: true },
        { label: 'Immigrés devenus français', valeur: 3.8 },
      ],
    },
    explication:
      'L\'Insee distingue les étrangers (9,1 % de la population, y compris ceux nés en France) des immigrés (11,6 %), dont une partie a acquis la nationalité française. La part des immigrés a progressé depuis la fin des années 1990, mais l\'Insee précise que les données antérieures à 2024 ne sont pas directement comparables à celles de 2024 et 2025, à cause d\'un changement de protocole du recensement.',
    source: {
      nom: 'Insee, population selon le lieu de naissance et la nationalité',
      url: 'https://www.insee.fr/fr/statistiques/2865118',
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'dette-publique',
    theme: 'economie',
    ideeRecue: 'La France est le pays le plus endetté d\'Europe.',
    verdict: 'faux',
    chiffre: {
      valeur: '115,6 %',
      legende: 'de dette publique en part du PIB en 2025 : 3e rang de l\'UE, derrière la Grèce et l\'Italie.',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      items: [
        { label: 'Grèce', valeur: 146.1 },
        { label: 'Italie', valeur: 137.1 },
        { label: 'France', valeur: 115.6, accent: true },
        { label: 'Union européenne (27)', valeur: 81.7 },
      ],
    },
    explication:
      'Rapportée au PIB, la dette française se place au troisième rang de l\'Union européenne et au-dessus de la moyenne de l\'UE. Le constat n\'a rien de rassurant pour autant : le ratio est passé de 109,5 % en 2023 à 115,6 % en 2025, et le déficit public a atteint 5,1 % du PIB en 2025.',
    source: {
      nom: 'Insee, d\'après Eurostat (dette publique dans l\'UE)',
      url: 'https://www.insee.fr/fr/statistiques/2830286',
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'homicides',
    theme: 'securite',
    ideeRecue: 'Les homicides explosent en France.',
    verdict: 'nuance',
    chiffre: {
      valeur: '975',
      legende: 'victimes d\'homicide enregistrées en 2025, un nombre stable par rapport à 2024.',
    },
    visualisation: {
      type: 'barres',
      unite: ' victimes',
      items: [
        { label: '2024', valeur: 976 },
        { label: '2025', valeur: 975, accent: true },
      ],
    },
    explication:
      'Selon le service statistique du ministère de l\'Intérieur, le nombre de victimes d\'homicide est stable en 2025, ce qui met fin à la hausse observée entre 2020 et 2023. Ce sont des victimes enregistrées par la police et la gendarmerie, et un total national ne dit rien des écarts entre territoires ni de l\'évolution des autres violences.',
    source: {
      nom: 'SSMSI, Insécurité et délinquance en 2025',
      url: 'https://www.interieur.gouv.fr/Interstats/Actualites/Insecurite-et-delinquance-en-2025-bilan-statistique-et-atlas-departemental',
    },
    verifieLe: '2026-10-26',
  },
];
