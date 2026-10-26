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
 *  quiz          { question, choix, reponse } : question à choix multiples sur le chiffre clé ;
 *                `reponse` est la position de la bonne réponse dans `choix` (0 pour la première)
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
    quiz: {
      question: 'Quelle part de la population vivant en France est de nationalité étrangère (2025) ?',
      choix: ['3 %', '9 %', '18 %', '25 %'],
      reponse: 1,
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
    quiz: {
      question: 'Quel rang occupe la France dans l\'UE pour la dette publique rapportée au PIB (2025) ?',
      choix: ['1er', '2e', '3e', '10e'],
      reponse: 2,
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'homicides',
    theme: 'securite',
    ideeRecue: 'Les homicides explosent en France.',
    verdict: 'faux',
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
    quiz: {
      question: 'Combien de victimes d\'homicide ont été enregistrées en France en 2025 ?',
      choix: ['Environ 300', 'Environ 1 000', 'Environ 5 000', 'Environ 10 000'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'pays-le-plus-taxe',
    theme: 'fiscalite',
    ideeRecue: 'La France est le pays le plus taxé d\'Europe.',
    verdict: 'faux',
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
      'Selon Eurostat, la France n\'est pas première : en 2024, elle se situe juste derrière le Danemark et devant la Belgique. Les écarts entre ces trois pays sont faibles, et la France reste environ 5 points au-dessus de la moyenne de l\'UE. L\'Insee publie un taux plus bas pour la France (43,6 % en 2025, provisoire), car sa méthode exclut les cotisations sociales dites « imputées ».',
    source: {
      nom: 'Insee, d\'après Eurostat (prélèvements obligatoires dans l\'UE)',
      url: 'https://www.insee.fr/fr/statistiques/2381410',
    },
    quiz: {
      question: 'Quel rang occupe la France dans l\'UE pour les prélèvements obligatoires (2024) ?',
      choix: ['1er', '2e', '6e', '12e'],
      reponse: 1,
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
    quiz: {
      question: 'Entre 2011 et 2016, combien de foyers soumis à l\'ISF partaient chaque année à l\'étranger, en moyenne ?',
      choix: ['Environ 50', 'Environ 200', 'Environ 950', 'Environ 20 000'],
      reponse: 2,
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
    quiz: {
      question: 'Quel était le taux de chômage en France au 2e trimestre 2026 ?',
      choix: ['5,1 %', '8,3 %', '11,9 %', '14,5 %'],
      reponse: 1,
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
    quiz: {
      question: 'À quel âge, en moyenne, les hommes quittent-ils le marché du travail en France (2024) ?',
      choix: ['59,1 ans', '61,9 ans', '64,7 ans', '66,3 ans'],
      reponse: 1,
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
    quiz: {
      question: 'Combien y a-t-il de détenus pour 100 places en prison en France (août 2026) ?',
      choix: ['Environ 95', 'Environ 110', 'Environ 142', 'Environ 200'],
      reponse: 2,
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
    quiz: {
      question: 'Quelle part des émissions mondiales de gaz à effet de serre est émise sur le territoire français ?',
      choix: ['Environ 0,7 %', 'Environ 3 %', 'Environ 7 %', 'Environ 12 %'],
      reponse: 0,
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
    quiz: {
      question: 'Quelle part de l\'électricité produite en France vient du gaz, du fioul et du charbon (2025) ?',
      choix: ['3,4 %', '15 %', '40 %', '60 %'],
      reponse: 0,
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
    quiz: {
      question: 'Quel a été l\'excédent commercial agroalimentaire de la France en 2025 ?',
      choix: ['181 millions d\'euros', '4,9 milliards d\'euros', '10 milliards d\'euros', '25 milliards d\'euros'],
      reponse: 0,
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
    quiz: {
      question: 'Quelle part de son PIB la France consacre-t-elle à la santé (2024) ?',
      choix: ['4,5 %', '7,8 %', '11,4 %', '17,2 %'],
      reponse: 2,
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
    quiz: {
      question: 'Quel score ont obtenu les élèves français de 4e en maths (TIMSS 2023), face à une moyenne UE et OCDE de 507 points ?',
      choix: ['479', '507', '532', '561'],
      reponse: 0,
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
    quiz: {
      question: 'Combien de logements vacants compte la France au 1er janvier 2026 ?',
      choix: ['300 000', '900 000', '2,9 millions', '8 millions'],
      reponse: 2,
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
    quiz: {
      question: 'Quelle part des émissions de gaz à effet de serre des transports vient des voitures particulières ?',
      choix: ['13 %', '28 %', '53 %', '81 %'],
      reponse: 2,
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
    quiz: {
      question: 'Quelle part de l\'empreinte carbone de la France vient du numérique ?',
      choix: ['0,1 %', '4,4 %', '15 %', '30 %'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'cinema-deserte',
    theme: 'culture',
    ideeRecue: 'Les Français ont déserté les salles de cinéma.',
    verdict: 'faux',
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
      'Avec 156 millions d\'entrées, on est loin d\'un abandon : la France reste de loin le premier marché du cinéma en Europe. La fréquentation a pourtant nettement baissé en 2025, faute de grand succès français comme en 2024, et revient au niveau du début des années 2000. La part des films français est tombée à 37,9 %, contre 44,7 % en 2024.',
    source: {
      nom: 'CNC, Bilan 2025',
      url: 'https://www.cnc.fr/professionnels/etudes-et-rapports/bilans/bilan-2025-du-cnc_2589800',
    },
    quiz: {
      question: 'Combien d\'entrées les cinémas français ont-ils vendues en 2025 ?',
      choix: ['16 millions', '56 millions', '156 millions', '356 millions'],
      reponse: 2,
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
    quiz: {
      question: 'Quelle part des 15 ans ou plus pratique une activité sportive régulière en 2025 ?',
      choix: ['21 %', '41 %', '61 %', '81 %'],
      reponse: 2,
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'participation-elections',
    theme: 'institutions',
    ideeRecue: 'Les Français votent de moins en moins, élection après élection.',
    verdict: 'faux',
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
    quiz: {
      question: 'Quelle a été la participation au 1er tour des municipales de mars 2026 ?',
      choix: ['38,4 %', '57,2 %', '71,9 %', '83,5 %'],
      reponse: 1,
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
    quiz: {
      question: 'Quelle part de son PIB la France a-t-elle consacrée à la défense en 2025, selon l\'OTAN ?',
      choix: ['0,9 %', '1,4 %', '2,05 %', '3,5 %'],
      reponse: 2,
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
    quiz: {
      question: 'Quelle part de son revenu national brut la France a-t-elle consacrée à l\'aide au développement en 2025 ?',
      choix: ['0,42 %', '1,9 %', '4,2 %', '7 %'],
      reponse: 0,
    },
    verifieLe: '2026-10-26',
  },
  {
    id: 'nombre-fonctionnaires',
    theme: 'economie',
    ideeRecue: 'Il y a beaucoup plus de fonctionnaires en France qu\'ailleurs.',
    verdict: 'nuance',
    chiffre: {
      valeur: '21,1 %',
      legende: 'des emplois en France relèvent des administrations publiques (2021), contre 18,6 % en moyenne dans l\'OCDE.',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      items: [
        { label: 'Norvège (2023)', valeur: 30.1 },
        { label: 'Danemark (2023)', valeur: 27.3 },
        { label: 'France (2021)', valeur: 21.1, accent: true },
        { label: 'Moyenne OCDE (2021)', valeur: 18.6 },
      ],
    },
    explication:
      'La part de l\'emploi public est plus élevée en France que dans la moyenne des pays de l\'OCDE, mais bien plus basse que dans les pays nordiques, où elle dépasse 25 %. Entre 2019 et 2023, cette part a même reculé de 0,9 point en France, l\'une des plus fortes baisses de l\'OCDE, car l\'emploi total a progressé plus vite que l\'emploi public. Les comparaisons dépendent aussi de ce que chaque pays confie à l\'État ou au privé (hôpitaux, écoles…).',
    source: {
      nom: 'OCDE, Panorama des administrations publiques 2025 (emploi dans les administrations publiques)',
      url: 'https://www.oecd.org/fr/publications/panorama-des-administrations-publiques-2025_758a7905-fr/full-report/employment-in-general-government_dafcfac5',
    },
    quiz: {
      question: 'Quelle part des emplois relève des administrations publiques en France (2021) ?',
      choix: ['9 %', '21 %', '35 %', '48 %'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
  {
    id: 'demandes-asile',
    theme: 'immigration',
    ideeRecue: 'La France est le pays d\'Europe qui reçoit le plus de demandes d\'asile.',
    verdict: 'faux',
    chiffre: {
      valeur: '3e',
      legende: 'rang de la France dans l\'UE en 2025, avec 116 370 premières demandes d\'asile, derrière l\'Espagne et l\'Italie.',
    },
    visualisation: {
      type: 'barres',
      unite: ' demandes',
      items: [
        { label: 'Espagne', valeur: 141035 },
        { label: 'Italie', valeur: 126635 },
        { label: 'France', valeur: 116370, accent: true },
        { label: 'Allemagne', valeur: 113170 },
      ],
    },
    explication:
      'En 2025, l\'Union européenne a enregistré 669 400 premières demandes d\'asile, 27 % de moins qu\'en 2024. L\'Espagne est passée en tête, devant l\'Italie, la France et l\'Allemagne, dont les demandes ont baissé de moitié. Les quatre premiers pays sont proches : la France reçoit environ 17 % des demandes de l\'UE. Une demande d\'asile n\'est pas une admission : une partie des demandes est rejetée.',
    source: {
      nom: 'Toute l\'Europe, d\'après Eurostat (premières demandes d\'asile en 2025)',
      url: 'https://www.touteleurope.eu/l-ue-dans-le-monde/le-nombre-de-demandeurs-d-asile-dans-l-union-europeenne/',
    },
    quiz: {
      question: 'Quel rang occupe la France dans l\'UE pour le nombre de premières demandes d\'asile en 2025 ?',
      choix: ['1er', '3e', '7e', '12e'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
  {
    id: 'natalite',
    theme: 'societe',
    ideeRecue: 'Les Français font de moins en moins d\'enfants.',
    verdict: 'vrai',
    chiffre: {
      valeur: '1,56',
      legende: 'enfant par femme en 2025 : le niveau le plus bas depuis la fin de la Première Guerre mondiale.',
    },
    visualisation: {
      type: 'barres',
      unite: ' enfant par femme',
      items: [
        { label: '2024', valeur: 1.61 },
        { label: '2025', valeur: 1.56, accent: true },
      ],
    },
    explication:
      'Les naissances ont baissé de 24 % depuis 2010. En 2025, pour la première fois depuis la fin de la Seconde Guerre mondiale, la France a compté plus de décès (651 000) que de naissances (645 000). La population continue pourtant d\'augmenter légèrement (69,1 millions d\'habitants au 1er janvier 2026), grâce au solde migratoire.',
    source: {
      nom: 'Insee Première n° 2087, bilan démographique 2025',
      url: 'https://www.insee.fr/fr/statistiques/8719824',
    },
    quiz: {
      question: 'Combien d\'enfants par femme en moyenne en France en 2025 ?',
      choix: ['1,12', '1,56', '1,98', '2,31'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
  {
    id: 'eoliennes',
    theme: 'energie',
    ideeRecue: 'Les éoliennes produisent une part négligeable de l\'électricité française.',
    verdict: 'faux',
    chiffre: {
      valeur: '9,1 %',
      legende: 'de l\'électricité produite en France en 2025 vient de l\'éolien, soit 49,6 TWh.',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      max: 100,
      items: [
        { label: 'Nucléaire', valeur: 68.1 },
        { label: 'Hydraulique', valeur: 11.4 },
        { label: 'Éolien (terre et mer)', valeur: 9.1, accent: true },
        { label: 'Solaire', valeur: 6 },
      ],
    },
    explication:
      'L\'éolien est la troisième source d\'électricité du pays, derrière le nucléaire et l\'hydraulique. Il produit plus que l\'ensemble des centrales au gaz, au fioul et au charbon (3,4 %). L\'éolien en mer progresse vite (5,7 TWh en 2025, +43 % en un an), mais reste une petite part du total. La production éolienne varie selon le vent, ce qui oblige à la compléter par d\'autres sources.',
    source: {
      nom: 'EDF, d\'après le Bilan électrique 2025 de RTE',
      url: 'https://www.edf.fr/groupe-edf/espaces-dedies/jeunes-enseignants/pour-les-jeunes/lenergie-de-a-a-z/produire-de-lelectricite/leolien-en-chiffres',
    },
    quiz: {
      question: 'Quelle part de l\'électricité produite en France vient de l\'éolien (2025) ?',
      choix: ['0,5 %', '2 %', '9 %', '25 %'],
      reponse: 2,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
  {
    id: 'proprietaires',
    theme: 'logement',
    ideeRecue: 'La majorité des Français sont propriétaires de leur logement.',
    verdict: 'vrai',
    chiffre: {
      valeur: '57 %',
      legende: 'des ménages sont propriétaires de leur résidence principale (début 2024).',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      max: 100,
      items: [
        { label: 'Propriétaires sans emprunt', valeur: 37 },
        { label: 'Propriétaires avec un emprunt', valeur: 20 },
        { label: 'Locataires du privé', valeur: 23 },
        { label: 'Locataires du parc social', valeur: 17 },
      ],
    },
    explication:
      'Un peu plus d\'un ménage sur deux est propriétaire, dont près des deux tiers n\'ont plus de crédit à rembourser. Cette part a progressé jusqu\'au milieu des années 2010, puis recule légèrement. Les locataires représentent 40 % des ménages, une part stable depuis plus de quarante ans. Devenir propriétaire est plus difficile pour les jeunes et les ménages modestes.',
    source: {
      nom: 'Insee Première n° 2090 (janvier 2026)',
      url: 'https://www.insee.fr/fr/statistiques/8727513',
    },
    quiz: {
      question: 'Quelle part des ménages est propriétaire de sa résidence principale en France (2024) ?',
      choix: ['32 %', '45 %', '57 %', '78 %'],
      reponse: 2,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
  {
    id: 'temps-de-travail',
    theme: 'emploi',
    ideeRecue: 'Les Français travaillent moins que les autres Européens.',
    verdict: 'nuance',
    chiffre: {
      valeur: '1 661 h',
      legende: 'de travail effectif par an pour un salarié à temps complet en France en 2024.',
    },
    visualisation: {
      type: 'barres',
      unite: ' h par an',
      items: [
        { label: 'Allemagne', valeur: 1785 },
        { label: 'Moyenne de l\'UE', valeur: 1784 },
        { label: 'France', valeur: 1661, accent: true },
      ],
    },
    explication:
      'À temps complet, un salarié français travaille environ 120 heures de moins par an que la moyenne européenne. Mais la comparaison s\'inverse en partie si l\'on compte tous les salariés : le temps partiel, plus répandu en Allemagne, y fait baisser la moyenne. Le volume total de travail dépend aussi du taux d\'emploi, plus faible en France chez les jeunes et les seniors.',
    source: {
      nom: 'Insee, durée du travail (France), et DG Trésor, étude comparative internationale (Allemagne, UE)',
      url: 'https://www.insee.fr/fr/statistiques/8733071',
    },
    quiz: {
      question: 'Combien d\'heures par an travaille en moyenne un salarié à temps complet en France (2024) ?',
      choix: ['1 207 h', '1 661 h', '2 015 h', '2 340 h'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
  {
    id: 'detenus-etrangers',
    theme: 'justice',
    ideeRecue: 'La plupart des détenus en France sont étrangers.',
    verdict: 'faux',
    chiffre: {
      valeur: '24,2 %',
      legende: 'des personnes détenues sont de nationalité étrangère au 1er avril 2026, soit 21 329 sur 88 419.',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      max: 100,
      items: [
        { label: 'Détenus de nationalité française', valeur: 75.8 },
        { label: 'Détenus de nationalité étrangère', valeur: 24.2, accent: true },
      ],
    },
    explication:
      'Environ un détenu sur quatre est étranger : c\'est loin d\'une majorité. Les étrangers sont toutefois surreprésentés en prison, puisqu\'ils forment environ 9 % de la population. Cette part est passée de 21 % en 2016 à près de 25 % ces dernières années.',
    source: {
      nom: 'Ministère de la Justice, réponse à la question écrite n° 12283 (Assemblée nationale, mai 2026)',
      url: 'https://www.assemblee-nationale.fr/dyn/17/questions/QANR5L17QE12283',
    },
    quiz: {
      question: 'Quelle part des personnes détenues en France est de nationalité étrangère (avril 2026) ?',
      choix: ['8 %', '24 %', '51 %', '67 %'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
  {
    id: 'impot-sur-le-revenu',
    theme: 'fiscalite',
    ideeRecue: 'Plus de la moitié des foyers ne paient pas d\'impôt sur le revenu.',
    verdict: 'vrai',
    chiffre: {
      valeur: '54 %',
      legende: 'des foyers fiscaux n\'ont pas payé d\'impôt sur le revenu en 2025.',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      max: 100,
      items: [
        { label: 'Foyers imposés', valeur: 45.7 },
        { label: 'Impôt nul', valeur: 43.3, accent: true },
        { label: 'Remboursés (crédits d\'impôt)', valeur: 11, accent: true },
      ],
    },
    explication:
      'Sur 41,6 millions de foyers, 45,7 % ont payé l\'impôt sur le revenu en 2025. Les autres n\'en ont pas payé, et 11 % ont même reçu un remboursement grâce aux crédits d\'impôt (emploi à domicile, garde d\'enfants…). Mais tout le monde paie d\'autres impôts : la TVA sur ses achats et la CSG sur ses revenus rapportent bien plus à l\'État que l\'impôt sur le revenu. La part des foyers imposés augmente depuis quelques années.',
    source: {
      nom: 'DGFiP, rapport d\'activité 2025 (chiffres repris par MoneyVox)',
      url: 'https://www.moneyvox.fr/impot/actualites/108717/46-des-francais-paient-un-impot-sur-le-revenu-919-425-foyers-de-plus-en-un-an',
    },
    quiz: {
      question: 'Quelle part des foyers fiscaux a payé l\'impôt sur le revenu en 2025 ?',
      choix: ['12 %', '28 %', '46 %', '83 %'],
      reponse: 2,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
  {
    id: 'pays-le-plus-visite',
    theme: 'international',
    ideeRecue: 'La France est le pays le plus visité au monde.',
    verdict: 'vrai',
    chiffre: {
      valeur: '102 millions',
      legende: 'de touristes internationaux accueillis en France en 2025, un record.',
    },
    visualisation: {
      type: 'barres',
      unite: ' millions',
      items: [
        { label: 'France', valeur: 102, accent: true },
        { label: 'Espagne', valeur: 97 },
      ],
    },
    explication:
      'La France reste la première destination touristique mondiale, mais l\'Espagne se rapproche. Et la France n\'est pas la première en recettes : les touristes y ont dépensé 77,5 milliards d\'euros en 2025, contre environ 105 milliards en Espagne. Le chiffre espagnol de 97 millions est une première estimation du gouvernement espagnol.',
    source: {
      nom: 'Ministère de l\'Économie, bilan touristique de l\'année 2025',
      url: 'https://presse.economie.gouv.fr/bilan-touristique-de-lannee-2025-avec-102-millions-de-visiteurs-la-france-pays-le-plus-visite-du-monde-enregistre-une-nouvelle-hausse-massive-de-ses-recettes-touristiques-9/',
    },
    quiz: {
      question: 'Combien de touristes internationaux la France a-t-elle accueillis en 2025 ?',
      choix: ['32 millions', '58 millions', '102 millions', '230 millions'],
      reponse: 2,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
  {
    id: 'lecture',
    theme: 'culture',
    ideeRecue: 'Les Français lisent de moins en moins.',
    verdict: 'vrai',
    chiffre: {
      valeur: '18 livres',
      legende: 'lus par an en moyenne en 2025, tous formats confondus, contre 22 en 2023.',
    },
    visualisation: {
      type: 'barres',
      unite: ' livres par an',
      items: [
        { label: '2023', valeur: 22 },
        { label: '2025', valeur: 18, accent: true },
      ],
    },
    explication:
      'Le recul est net en deux ans : 63 % des Français déclarent avoir lu au moins cinq livres dans l\'année, six points de moins qu\'en 2023, et la lecture quotidienne est au plus bas depuis dix ans. Ces chiffres viennent d\'un sondage déclaratif auprès de 1 000 personnes de 15 ans et plus.',
    source: {
      nom: 'Centre national du livre, baromètre « Les Français et la lecture » 2025 (Ipsos)',
      url: 'https://centrenationaldulivre.fr/sites/default/files/2025-04/CP%20CNL%20-%20Barom%C3%A8tre%202025%20Les%20Fran%C3%A7ais%20et%20la%20lecture_2.pdf',
    },
    quiz: {
      question: 'Combien de livres les Français lisent-ils en moyenne par an (2025) ?',
      choix: ['4', '18', '41', '63'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
];
