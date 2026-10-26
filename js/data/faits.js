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
 *  publieLe      (facultatif) date ISO de mise en ligne : la carte affiche « Nouveau » pendant
 *                quelques jours (config.dureeBadges) et passe en tête de liste
 *  questionLecteur (facultatif) true si la carte répond à une question reçue par la boîte à questions
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
  {
    id: 'pays-le-plus-taxe',
    theme: 'fiscalite',
    ideeRecue: 'La France est le pays le plus taxé d\'Europe.',
    verdict: 'nuance',
    chiffre: {
      valeur: '45,3 %',
      legende: 'du PIB en prélèvements obligatoires en 2024 : 2e rang de l\'UE, juste derrière le Danemark.',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      items: [
        { label: 'Danemark', valeur: 45.8 },
        { label: 'France', valeur: 45.3, accent: true },
        { label: 'Belgique', valeur: 45.1 },
        { label: 'Union européenne (27)', valeur: 40.4 },
      ],
    },
    explication:
      'Selon Eurostat, la France se situe en 2024 juste derrière le Danemark et devant la Belgique, environ 5 points au-dessus de la moyenne de l\'UE. Les écarts entre les trois premiers pays sont faibles. L\'Insee publie un taux plus bas pour la France (43,6 % en 2025, provisoire), car sa méthode exclut les cotisations sociales dites « imputées ».',
    source: {
      nom: 'Insee, d\'après Eurostat (prélèvements obligatoires dans l\'UE)',
      url: 'https://www.insee.fr/fr/statistiques/2381410',
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'exil-fiscal',
    theme: 'fiscalite',
    ideeRecue: 'Si on taxe les riches, ils vont quitter le pays.',
    verdict: 'nuance',
    chiffre: {
      valeur: '950',
      legende: 'départs à l\'étranger par an de foyers soumis à l\'ISF entre 2011 et 2016, pour 370 retours.',
    },
    visualisation: {
      type: 'barres',
      unite: ' foyers par an',
      items: [
        { label: 'Départs, ISF (2011-2016)', valeur: 950, accent: true },
        { label: 'Retours, ISF (2011-2016)', valeur: 370 },
        { label: 'Départs, IFI (2018-2021)', valeur: 260 },
        { label: 'Retours, IFI (2018-2021)', valeur: 380 },
      ],
    },
    explication:
      'Les départs de contribuables aisés existent et réagissent à la fiscalité : depuis le remplacement de l\'ISF par l\'impôt sur la fortune immobilière (IFI) en 2018, ils ont nettement baissé et les retours sont devenus plus nombreux. Mais il s\'agit de quelques centaines de foyers par an, à comparer à environ 150 000 redevables de l\'IFI. Le comité d\'évaluation ne peut pas affirmer que la réforme en est la seule cause, et les deux impôts ne visent pas exactement les mêmes personnes. Le Conseil d\'analyse économique estime qu\'un point d\'impôt de plus sur les très hauts patrimoines ferait partir à long terme 0,02 % à 0,23 % d\'entre eux, soit 90 à 900 foyers : un effet réel, mais modeste.',
    source: {
      nom: 'France Stratégie, Comité d\'évaluation des réformes de la fiscalité du capital, 4e rapport (2023)',
      url: 'https://www.strategie-plan.gouv.fr/files/files/Publications/Rapport/fs-2023-rapport-isf-quatrieme_rapport_complet_17octobre_2.pdf',
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
    questionLecteur: true,
  },
  {
    id: 'chomage-record',
    theme: 'emploi',
    ideeRecue: 'Le chômage n\'a jamais été aussi élevé en France.',
    verdict: 'faux',
    chiffre: {
      valeur: '8,3 %',
      legende: 'de la population active au chômage (au sens du BIT) au 2e trimestre 2026.',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      items: [
        { label: 'Pic de mi-2015', valeur: 10.5 },
        { label: '2e trimestre 2025', valeur: 7.6 },
        { label: '2e trimestre 2026', valeur: 8.3, accent: true },
      ],
    },
    explication:
      'Le taux de chômage remonte : +0,7 point en un an, soit son plus haut niveau depuis 2020. Il reste toutefois 2,2 points sous le pic de mi-2015. Depuis cette publication, l\'Insee inclut Mayotte dans sa série principale.',
    source: {
      nom: 'Insee, Informations rapides, chômage au 2e trimestre 2026',
      url: 'https://www.insee.fr/fr/statistiques/9032359',
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'age-sortie-travail',
    theme: 'retraites',
    ideeRecue: 'Les Français arrêtent de travailler plus tôt que dans la plupart des pays riches.',
    verdict: 'vrai',
    chiffre: {
      valeur: '61,9 ans',
      legende: 'âge effectif moyen de sortie du marché du travail des hommes en France en 2024, contre 64,7 ans dans l\'OCDE.',
    },
    visualisation: {
      type: 'barres',
      unite: ' ans',
      items: [
        { label: 'Hommes, moyenne OCDE', valeur: 64.7 },
        { label: 'Hommes, France', valeur: 61.9, accent: true },
        { label: 'Femmes, moyenne OCDE', valeur: 63.6 },
        { label: 'Femmes, France', valeur: 62.4, accent: true },
      ],
    },
    explication:
      'L\'âge effectif de sortie du marché du travail mesure le moment où les gens cessent réellement de travailler, ce qui ne correspond pas toujours à l\'âge légal de la retraite. En France, il est inférieur d\'environ 3 ans à la moyenne de l\'OCDE pour les hommes et d\'environ 1 an pour les femmes. Les hommes peuvent y espérer vivre plus de 22 ans après leur sortie du marché du travail, l\'une des durées les plus longues de l\'OCDE.',
    source: {
      nom: 'OCDE, Panorama des pensions 2025 (âge effectif de sortie du marché du travail)',
      url: 'https://www.oecd.org/fr/publications/panorama-des-pensions-2025_58bd74b1-fr/full-report/effective-age-of-labour-market-exit_fd1212b7.html',
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'surpopulation-carcerale',
    theme: 'justice',
    ideeRecue: 'Les prisons françaises sont surpeuplées.',
    verdict: 'vrai',
    chiffre: {
      valeur: '141,6 %',
      legende: 'de densité carcérale au 1er août 2026 : environ 142 détenus pour 100 places opérationnelles.',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      items: [
        { label: 'Maisons d\'arrêt', valeur: 175 },
        { label: 'Ensemble des prisons', valeur: 141.6, accent: true },
        { label: 'Capacité (100 %)', valeur: 100 },
      ],
    },
    explication:
      'La surpopulation se concentre dans les maisons d\'arrêt, qui accueillent les prévenus et les courtes peines. Leur densité atteint 175 %, tandis que les établissements pour peines sont proches de leur capacité. Le nombre de détenus a augmenté de 7 % en un an, pour atteindre environ 90 900 au 1er octobre 2026, alors que le nombre de places progresse beaucoup plus lentement.',
    source: {
      nom: 'Ministère de la Justice, statistique mensuelle de la population détenue',
      url: 'https://www.justice.gouv.fr/sites/default/files/2026-08/mesure_mensuelle_01082026.pdf',
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'poids-emissions-mondiales',
    theme: 'ecologie',
    ideeRecue: 'La France pèse trop peu dans les émissions mondiales pour que ses efforts comptent.',
    verdict: 'nuance',
    chiffre: {
      valeur: '≈ 0,7 %',
      legende: 'des émissions mondiales de gaz à effet de serre sont émises sur le territoire français.',
    },
    visualisation: {
      type: 'barres',
      unite: ' t CO₂e par habitant',
      items: [
        { label: 'Émissions sur le territoire (2024)', valeur: 5.4 },
        { label: 'Empreinte carbone (2024)', valeur: 8.2, accent: true },
      ],
    },
    explication:
      'La France a émis 369 millions de tonnes d\'équivalent CO₂ sur son territoire en 2024, contre environ 53 milliards dans le monde en 2023, soit à peu près 0,7 %. Mais son empreinte carbone, qui compte aussi les émissions liées aux biens importés, atteint 8,2 tonnes par habitant, dont environ la moitié est émise à l\'étranger. Elle dépasse ainsi la moyenne mondiale, d\'environ 6,6 tonnes par habitant.',
    source: {
      nom: 'SDES, émissions de gaz à effet de serre et empreinte carbone de la France en 2024',
      url: 'https://www.statistiques.developpement-durable.gouv.fr/emissions-de-gaz-effet-de-serre-et-empreinte-carbone-de-la-france-en-2024-une-baisse-plus-faible',
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'electricite-fossile',
    theme: 'energie',
    ideeRecue: 'L\'électricité française est produite surtout à partir de gaz et de charbon.',
    verdict: 'faux',
    chiffre: {
      valeur: '3,4 %',
      legende: 'seulement de la production d\'électricité française vient de centrales fossiles en 2025.',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      max: 100,
      items: [
        { label: 'Nucléaire', valeur: 68.1 },
        { label: 'Renouvelables et autres', valeur: 28.5 },
        { label: 'Fossile (gaz, fioul, charbon)', valeur: 3.4, accent: true },
      ],
    },
    explication:
      'Sur 547,5 TWh produits en 2025, le nucléaire en fournit 373 et les centrales fossiles 18,7, soit 41 % de moins qu\'en 2023. Plus de 95 % de l\'électricité produite est bas carbone. Il ne faut pas confondre électricité et énergie : les carburants et le chauffage restent largement dépendants du pétrole et du gaz.',
    source: {
      nom: 'EDF, d\'après le Bilan électrique 2025 de RTE',
      url: 'https://www.edf.fr/groupe-edf/comprendre/production/thermique/thermique-a-flamme-en-chiffres',
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'excedent-agroalimentaire',
    theme: 'agriculture',
    ideeRecue: 'L\'agroalimentaire rapporte toujours un large excédent commercial à la France.',
    verdict: 'faux',
    chiffre: {
      valeur: '181 M€',
      legende: 'd\'excédent agroalimentaire en 2025 : le plus faible depuis la fin des années 1970.',
    },
    visualisation: {
      type: 'barres',
      unite: ' M€',
      items: [
        { label: '2022', valeur: 10300 },
        { label: '2023', valeur: 6500 },
        { label: '2024', valeur: 4900 },
        { label: '2025', valeur: 181, accent: true },
      ],
    },
    explication:
      'L\'excédent a fondu de 4,8 milliards d\'euros en un an : les importations ont augmenté de 8 %, alors que les exportations ont stagné, pénalisées par le recul des vins et spiritueux. Avec les autres pays de l\'UE, la France est même en déficit (−3,4 milliards d\'euros), et les échanges de produits agricoles bruts sont déficitaires pour la première fois depuis 2017.',
    source: {
      nom: 'Agreste (ministère de l\'Agriculture), commerce extérieur agroalimentaire 2025',
      url: 'https://agreste.agriculture.gouv.fr/agreste-web/download/publication/publie/IraCex2617/2026_17inforapcommerceext.pdf',
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'depenses-sante',
    theme: 'sante',
    ideeRecue: 'La France dépense peu pour sa santé par rapport à ses voisins.',
    verdict: 'faux',
    chiffre: {
      valeur: '11,4 %',
      legende: 'du PIB consacré à la santé en 2024, soit 333 milliards d\'euros.',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      items: [
        { label: 'États-Unis', valeur: 17.2 },
        { label: 'Allemagne', valeur: 12.3 },
        { label: 'Autriche', valeur: 11.8 },
        { label: 'France', valeur: 11.4, accent: true },
      ],
    },
    explication:
      'Rapportée au PIB, la dépense de santé française se situe dans le haut du classement européen, derrière l\'Allemagne et l\'Autriche. Les États-Unis restent loin devant tous les pays de l\'OCDE. Dépenser beaucoup ne dit rien, en soi, de l\'accès aux soins ni de leur qualité.',
    source: {
      nom: 'DREES, Les dépenses de santé en 2024 (édition 2025)',
      url: 'https://drees.solidarites-sante.gouv.fr/publications-communique-de-presse-infographie-documents-de-reference/250930-Panorama-d%C3%A9penses-de-sant%C3%A9',
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'niveau-maths',
    theme: 'education',
    ideeRecue: 'Les élèves français sont dans la moyenne européenne en mathématiques.',
    verdict: 'faux',
    chiffre: {
      valeur: '479',
      legende: 'points pour les élèves de 4e en mathématiques (TIMSS 2023), contre 507 en moyenne dans l\'UE et l\'OCDE.',
    },
    visualisation: {
      type: 'barres',
      unite: ' points',
      items: [
        { label: 'Moyenne UE et OCDE', valeur: 507 },
        { label: 'France', valeur: 479, accent: true },
      ],
    },
    explication:
      'L\'écart de 28 points est nettement significatif, et le score français est stable depuis 2019. Seuls 3 % des élèves français atteignent le niveau avancé, contre 11 % en moyenne. Les résultats en CM1 (484 points) restent aussi sous les moyennes européenne et internationale.',
    source: {
      nom: 'DEPP, Note d\'information n° 24.48 (TIMSS 2023 en 4e)',
      url: 'https://www.education.gouv.fr/depp/timss-2023-en-quatrieme-pour-les-mathematiques-des-resultats-stables-en-france-et-un-accroissement-452619',
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'logements-vacants',
    theme: 'logement',
    ideeRecue: 'Il suffirait d\'occuper les logements vacants pour régler la crise du logement.',
    verdict: 'nuance',
    chiffre: {
      valeur: '2,9 millions',
      legende: 'de logements vacants au 1er janvier 2026, soit 7,6 % du parc.',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      items: [
        { label: '2019', valeur: 8.1 },
        { label: '2025', valeur: 7.7 },
        { label: '2026', valeur: 7.6, accent: true },
      ],
    },
    explication:
      'Le nombre est élevé, mais la part des logements vacants baisse depuis 2019. Une partie de la vacance est temporaire (entre deux locataires, pendant une vente ou des travaux), et elle est plus forte dans les petites communes et en outre-mer, souvent loin des zones où la demande est la plus forte. Remettre ces logements sur le marché aide, sans suffire à combler la pénurie dans les grandes villes.',
    source: {
      nom: 'Insee Focus, le parc de logements au 1er janvier 2026',
      url: 'https://www.insee.fr/fr/statistiques/9055697',
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'voitures-emissions',
    theme: 'transports',
    ideeRecue: 'Les voitures pèsent peu dans les émissions de gaz à effet de serre en France.',
    verdict: 'faux',
    chiffre: {
      valeur: '53 %',
      legende: 'des émissions des transports viennent des voitures particulières, et les transports sont le premier secteur émetteur.',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      max: 100,
      items: [
        { label: 'Voitures particulières', valeur: 53, accent: true },
        { label: 'Poids lourds', valeur: 22 },
        { label: 'Véhicules utilitaires légers', valeur: 15 },
        { label: 'Autres (deux-roues, bus, avion intérieur, rail…)', valeur: 10 },
      ],
    },
    explication:
      'Les transports émettent 34 % des gaz à effet de serre du pays en 2024, hors vols et navigation internationaux. Les voitures en représentent un peu plus de la moitié, soit environ 18 % des émissions nationales. La route compte pour 94 % des émissions du secteur, et ses émissions ont à peine baissé depuis 1990.',
    source: {
      nom: 'SDES, Chiffres clés des transports (édition 2026)',
      url: 'https://www.statistiques.developpement-durable.gouv.fr/chiffres-cles-des-transports-edition-2026',
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'numerique-immateriel',
    theme: 'numerique',
    ideeRecue: 'Le numérique est immatériel, il ne pollue presque pas.',
    verdict: 'faux',
    chiffre: {
      valeur: '4,4 %',
      legende: 'de l\'empreinte carbone de la France vient du numérique, soit 29,5 millions de tonnes d\'équivalent CO₂ (2022).',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      max: 100,
      items: [
        { label: 'Terminaux (écrans, téléphones, ordinateurs…)', valeur: 50, accent: true },
        { label: 'Centres de données', valeur: 46 },
        { label: 'Réseaux', valeur: 4 },
      ],
    },
    explication:
      'L\'essentiel de l\'impact vient de la fabrication des équipements, qui représente environ 60 % de l\'empreinte carbone du numérique. L\'étude actualisée intègre désormais les centres de données situés à l\'étranger qui servent les usages français, ce qui explique en partie la hausse par rapport à l\'estimation précédente (2,5 %). Sans changement, l\'empreinte pourrait augmenter d\'environ 45 % d\'ici 2030.',
    source: {
      nom: 'ADEME et Arcep, impacts environnementaux du numérique en France',
      url: 'https://ecoresponsable.numerique.gouv.fr/docs/2024/etude-ademe-impacts-environnementaux-numerique.pdf',
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'cinema-deserte',
    theme: 'culture',
    ideeRecue: 'Les Français ont déserté les salles de cinéma.',
    verdict: 'nuance',
    chiffre: {
      valeur: '156,2 millions',
      legende: 'd\'entrées en salles en 2025, en recul de 14 % sur un an.',
    },
    visualisation: {
      type: 'barres',
      unite: ' M',
      items: [
        { label: '2019', valeur: 213.3 },
        { label: '2024', valeur: 181.5 },
        { label: '2025', valeur: 156.2, accent: true },
      ],
    },
    explication:
      'La fréquentation a nettement baissé en 2025, faute de grand succès français comme en 2024, et revient au niveau du début des années 2000. La France reste cependant de loin le premier marché du cinéma en Europe. La part des films français est tombée à 37,9 %, contre 44,7 % en 2024.',
    source: {
      nom: 'CNC, Bilan 2025',
      url: 'https://www.cnc.fr/professionnels/etudes-et-rapports/bilans/bilan-2025-du-cnc_2589800',
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'pratique-sportive',
    theme: 'sport',
    ideeRecue: 'La plupart des Français ne font pas de sport.',
    verdict: 'faux',
    chiffre: {
      valeur: '61 %',
      legende: 'des 15 ans ou plus pratiquent une activité sportive régulière en 2025.',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      max: 100,
      items: [
        { label: '2018', valeur: 54 },
        { label: '2024', valeur: 58 },
        { label: '2025', valeur: 61, accent: true },
      ],
    },
    explication:
      'La pratique régulière a gagné 7 points depuis 2018, avec une accélération après les Jeux de Paris 2024. En comptant les pratiquants occasionnels, 72 % des 15 ans ou plus ont fait du sport au moins une fois dans l\'année. La marche et la course sont les activités les plus répandues. Ces chiffres sont déclaratifs.',
    source: {
      nom: 'INJEP, Baromètre national des pratiques sportives 2025',
      url: 'https://www.sports.gouv.fr/sport-en-france-une-progression-continue-depuis-2018-boostee-par-les-jeux-de-paris-2024-10055',
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'participation-elections',
    theme: 'institutions',
    ideeRecue: 'Les Français votent de moins en moins, élection après élection.',
    verdict: 'nuance',
    chiffre: {
      valeur: '57,2 %',
      legende: 'de participation au 1er tour des municipales de mars 2026, contre 63,6 % en 2014.',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      max: 100,
      items: [
        { label: 'Municipales 2014', valeur: 63.6 },
        { label: 'Municipales 2020 (Covid)', valeur: 44.7 },
        { label: 'Municipales 2026', valeur: 57.2, accent: true },
      ],
    },
    explication:
      'Sur le long terme, la participation recule : celle des municipales de 2026 est la plus basse de la Ve République, si l\'on excepte 2020 et la crise sanitaire. Mais elle ne baisse pas à chaque scrutin. Au 1er tour des législatives de 2024, elle a bondi à environ 67 %, contre 47,5 % en 2022. La mobilisation dépend fortement de l\'enjeu perçu.',
    source: {
      nom: 'Ministère de l\'Intérieur, municipales 2026 : bilan chiffré des deux tours',
      url: 'https://www.interieur.gouv.fr/actualites/communiques-de-presse/elections-municipales-et-communautaires-2026-bilan-chiffre-du-premier-et-du-second-tour',
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'objectif-otan',
    theme: 'defense',
    ideeRecue: 'La France ne respecte pas l\'objectif de l\'OTAN de 2 % du PIB pour la défense.',
    verdict: 'faux',
    chiffre: {
      valeur: '2,05 %',
      legende: 'du PIB consacré à la défense en 2025 selon l\'OTAN, soit 61,8 milliards d\'euros.',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      items: [
        { label: '2014', valeur: 1.82 },
        { label: '2025', valeur: 2.05, accent: true },
        { label: 'Nouvel objectif 2035 (défense de base)', valeur: 3.5 },
      ],
    },
    explication:
      'La France dépasse le seuil de 2 % fixé en 2014, comme tous les membres de l\'Alliance en 2025. Mais la barre a été relevée : au sommet de La Haye de 2025, les Alliés se sont engagés à atteindre 5 % du PIB d\'ici 2035, dont 3,5 % pour la défense proprement dite. La France en est encore loin.',
    source: {
      nom: 'OTAN, rapport annuel 2025 du Secrétaire général',
      url: 'https://nato.int/content/dam/nato/webready/documents/publications-and-reports/annual-reports/sgar25-fr.pdf',
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'aide-developpement',
    theme: 'international',
    ideeRecue: 'La France consacre une part énorme de sa richesse à l\'aide au développement.',
    verdict: 'faux',
    chiffre: {
      valeur: '0,42 %',
      legende: 'du revenu national brut consacré à l\'aide publique au développement en 2025 (données préliminaires).',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      items: [
        { label: 'Objectif fixé par l\'ONU', valeur: 0.7 },
        { label: 'France, 2024', valeur: 0.48 },
        { label: 'France, 2025', valeur: 0.42, accent: true },
      ],
    },
    explication:
      'En montant, la France reste l\'un des cinq premiers donateurs du monde, avec 14,5 milliards de dollars en 2025. Rapportée à sa richesse, son aide est en baisse et reste loin de l\'objectif de 0,7 % fixé par l\'ONU. Elle avait atteint 0,55 % en 2022. L\'aide mondiale a chuté de 23 % en 2025.',
    source: {
      nom: 'OCDE, profil de coopération au développement de la France',
      url: 'https://www.oecd.org/fr/publications/2025/06/development-co-operation-profiles_02ffa45c/france_c200dc7f.html',
    },
    verifieLe: '2026-10-26',
  },
];
