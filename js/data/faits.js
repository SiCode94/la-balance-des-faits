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
 *
 *  Règle : le chiffre clé de chaque carte date de 2024 ou après. Des données plus anciennes
 *  peuvent servir de comparaison (graphique, explication), jamais de chiffre principal.
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
      valeur: '90 à 900',
      legende: 'très hauts patrimoines partiraient à long terme pour chaque point d\'impôt en plus, selon le Conseil d\'analyse économique (2025).',
    },
    visualisation: {
      type: 'barres',
      unite: ' foyers par an',
      items: [
        { label: 'Départs, ISF (moyenne 2011-2016)', valeur: 950 },
        { label: 'Retours, ISF (moyenne 2011-2016)', valeur: 370 },
        { label: 'Départs, IFI (moyenne 2018-2021)', valeur: 260, accent: true },
        { label: 'Retours, IFI (moyenne 2018-2021)', valeur: 380, accent: true },
      ],
    },
    explication:
      'Le Conseil d\'analyse économique estime qu\'une hausse d\'un point d\'impôt sur les très hauts patrimoines ferait partir à long terme 0,02 % à 0,23 % d\'entre eux, soit 90 à 900 foyers : l\'exil fiscal existe, mais son effet est modeste. Les départs réagissent bien à la fiscalité : depuis le remplacement de l\'ISF par l\'impôt sur la fortune immobilière en 2018, ils ont baissé et les retours sont devenus plus nombreux. Ces flux portent sur quelques centaines de foyers par an, alors que 186 000 foyers ont payé l\'IFI en 2024.',
    source: {
      nom: 'Conseil d\'analyse économique, Focus n° 118 (juillet 2025)',
      url: 'https://cae-eco.fr/static/pdf/Communique-de-presse_f118_exil_fiscal.pdf',
    },
    quiz: {
      question: 'Selon le CAE, combien de très hauts patrimoines partiraient à long terme pour chaque point d\'impôt en plus ?',
      choix: ['9 à 90', '90 à 900', '9 000 à 90 000', 'Plus de 100 000'],
      reponse: 1,
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
    ideeRecue: 'Le niveau des élèves français en maths s\'effondre.',
    verdict: 'nuance',
    chiffre: {
      valeur: '458',
      legende: 'points en mathématiques pour les élèves français de 15 ans à PISA 2025, contre 463 en moyenne dans l\'OCDE.',
    },
    visualisation: {
      type: 'barres',
      unite: ' points',
      items: [
        { label: 'France, PISA 2022', valeur: 474 },
        { label: 'France, PISA 2025', valeur: 458, accent: true },
        { label: 'Moyenne OCDE, PISA 2025', valeur: 463 },
      ],
    },
    explication:
      'Le score français a perdu 16 points depuis 2022 et atteint son plus bas niveau depuis le début de l\'enquête, en 2000. Mais la baisse touche aussi la plupart des pays de l\'OCDE, et la France reste dans la moyenne de l\'OCDE. Le constat reste préoccupant : 36 % des élèves français de 15 ans n\'atteignent pas le niveau de base en mathématiques.',
    source: {
      nom: 'DEPP, Note d\'information n° 26.40 (PISA 2025)',
      url: 'https://www.education.gouv.fr/depp/pisa-2025-les-acquis-des-eleves-de-15-ans-en-comprehension-de-l-ecrit-et-en-culture-mathematique-en-505645',
    },
    quiz: {
      question: 'Quel score les élèves français de 15 ans ont-ils obtenu en maths à PISA 2025, face à une moyenne OCDE de 463 ?',
      choix: ['412', '458', '501', '532'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
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
    id: 'fibre-campagnes',
    theme: 'numerique',
    ideeRecue: 'La fibre n\'arrive pas dans les campagnes.',
    verdict: 'faux',
    chiffre: {
      valeur: '95 %',
      legende: 'des logements et locaux professionnels peuvent être raccordés à la fibre fin mars 2026.',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      max: 100,
      items: [
        { label: 'Ensemble du territoire', valeur: 94.9 },
        { label: 'Réseaux publics des zones peu denses', valeur: 93.3, accent: true },
      ],
    },
    explication:
      'Fin mars 2026, 42,8 millions de locaux étaient raccordables à la fibre, sur 45,1 millions. Dans les zones les moins denses, souvent rurales, où les collectivités ont construit leurs propres réseaux, la couverture atteint 93,3 %. Il reste environ 2,3 millions de locaux sans fibre, surtout à la campagne, et l\'objectif de 100 % est fixé à 2030. Être raccordable ne veut pas dire abonné : 27,7 millions d\'abonnements à la fibre étaient actifs à la même date.',
    source: {
      nom: 'Arcep, observatoire du haut et très haut débit, 1er trimestre 2026',
      url: 'https://www.arcep.fr/cartes-et-donnees/nos-publications-chiffrees/observatoire-des-abonnements-et-deploiements-du-haut-et-tres-haut-debit/observatoire-haut-et-tres-haut-debit-abonnements-et-deploiements-t1-2026.html',
    },
    quiz: {
      question: 'Quelle part des logements et locaux professionnels peut être raccordée à la fibre (mars 2026) ?',
      choix: ['35 %', '60 %', '75 %', '95 %'],
      reponse: 3,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
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
      valeur: '5,9 millions',
      legende: 'd\'agents travaillent dans la fonction publique fin 2024, soit environ un emploi sur cinq.',
    },
    visualisation: {
      type: 'barres',
      unite: ' % de l\'emploi',
      items: [
        { label: 'Norvège (2023)', valeur: 30.1 },
        { label: 'Danemark (2023)', valeur: 27.3 },
        { label: 'France (2024)', valeur: 20, accent: true },
        { label: 'Moyenne OCDE (2023)', valeur: 18.4 },
      ],
    },
    explication:
      'La fonction publique représente environ 20 % des personnes en emploi en France (calcul de FIPECO à partir des données de l\'Insee), un peu plus que la moyenne des pays de l\'OCDE (18,4 %), mais bien moins que les pays nordiques, où la part dépasse 25 %. En 2024, les effectifs ont augmenté de 0,6 %, uniquement grâce aux contractuels : le nombre de fonctionnaires est resté stable. Les comparaisons dépendent aussi de ce que chaque pays confie au public ou au privé, comme les hôpitaux ou les écoles.',
    source: {
      nom: 'Insee Première n° 2094, l\'emploi dans la fonction publique en 2024 (comparaison : OCDE, Panorama des administrations publiques 2025)',
      url: 'https://www.insee.fr/fr/statistiques/8732435',
    },
    quiz: {
      question: 'Combien d\'agents travaillent dans la fonction publique en France fin 2024 ?',
      choix: ['1,2 million', '3,1 millions', '5,9 millions', '11 millions'],
      reponse: 2,
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
  {
    id: 'fraude-sociale',
    theme: 'economie',
    ideeRecue: 'La fraude sociale, ce sont surtout des allocataires qui trichent.',
    verdict: 'faux',
    chiffre: {
      valeur: '36 %',
      legende: 'seulement de la fraude sociale estimée vient des bénéficiaires d\'aides ; plus de la moitié vient du travail dissimulé.',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      max: 100,
      items: [
        { label: 'Travail dissimulé, cotisations non payées', valeur: 52 },
        { label: 'Bénéficiaires de prestations', valeur: 36, accent: true },
        { label: 'Professionnels de santé', valeur: 12 },
      ],
    },
    explication:
      'Le Haut Conseil du financement de la protection sociale estime la fraude sociale à environ 14 milliards d\'euros par an. Plus de la moitié correspond à des cotisations que des employeurs ne versent pas, notamment par le travail non déclaré. La fraude des bénéficiaires d\'aides, environ 5 milliards d\'euros, est réelle mais minoritaire. Seule une petite partie est détectée : un peu plus de 2 milliards d\'euros en 2024. La fraude fiscale n\'a pas d\'estimation officielle récente : les chiffres avancés vont de 20 à plus de 80 milliards d\'euros.',
    source: {
      nom: 'Haut Conseil du financement de la protection sociale, note de janvier 2026 (reprise par franceinfo)',
      url: 'https://www.franceinfo.fr/economie/fraude/le-montant-des-fraudes-sociales-en-france-est-estime-a-14-milliards-d-euros-en-2025-principalement-du-au-travail-dissimule-par-des-entreprises_7740532.html',
    },
    quiz: {
      question: 'Quelle part de la fraude sociale estimée vient des bénéficiaires d\'aides ?',
      choix: ['12 %', '36 %', '71 %', '90 %'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
  {
    id: 'oqtf-executees',
    theme: 'immigration',
    ideeRecue: 'La plupart des mesures d\'expulsion ne sont pas exécutées.',
    verdict: 'vrai',
    chiffre: {
      valeur: '24 985',
      legende: 'éloignements réalisés en 2025, pour 156 180 mesures d\'éloignement prononcées la même année.',
    },
    visualisation: {
      type: 'barres',
      unite: ' mesures',
      items: [
        { label: 'Mesures d\'éloignement prononcées', valeur: 156180 },
        { label: 'Éloignements réalisés', valeur: 24985, accent: true },
      ],
    },
    explication:
      'Les obligations de quitter le territoire (OQTF) forment l\'essentiel des mesures d\'éloignement. En 2025, environ une mesure sur six a été suivie d\'un départ dans l\'année, même si les éloignements ont augmenté de 15,7 %, dont 15 569 éloignements forcés (+21 %). Le ministère de l\'Intérieur prévient que ce rapport ne donne pas un taux d\'exécution exact, notamment parce qu\'une mesure prononcée une année peut être exécutée plus tard.',
    source: {
      nom: 'Ministère de l\'Intérieur (DGEF), les éloignements en 2025',
      url: 'https://www.immigration.interieur.gouv.fr/chiffres-de-limmigration-en-france/eloignements-detrangers-en-situation-irreguliere-en-2025-dynamique-ascendante',
    },
    quiz: {
      question: 'Combien d\'éloignements d\'étrangers en situation irrégulière ont été réalisés en 2025 ?',
      choix: ['Environ 2 500', 'Environ 25 000', 'Environ 75 000', 'Environ 150 000'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
  {
    id: 'actes-antisemites',
    theme: 'societe',
    ideeRecue: 'Les actes antisémites ont explosé en France.',
    verdict: 'vrai',
    chiffre: {
      valeur: '1 320',
      legende: 'actes antisémites recensés en 2025, trois fois plus qu\'en 2022.',
    },
    visualisation: {
      type: 'barres',
      unite: ' actes',
      items: [
        { label: '2022', valeur: 436 },
        { label: '2023', valeur: 1676 },
        { label: '2024', valeur: 1570 },
        { label: '2025', valeur: 1320, accent: true },
      ],
    },
    explication:
      'Les actes antisémites ont presque quadruplé en 2023, après l\'attaque du 7 octobre et la guerre à Gaza. Ils reculent depuis (−16 % en 2025), mais restent à un niveau historiquement élevé et représentent 53 % des actes antireligieux recensés. Les actes antimusulmans ont, eux, bondi de 88 % en 2025 (326 faits), leur plus haut niveau depuis 2015. Ces chiffres ne comptent que les faits ayant donné lieu à une plainte ou à un signalement.',
    source: {
      nom: 'Ministère de l\'Intérieur, bilan des actes antireligieux 2025',
      url: 'https://www.prefectures-regions.gouv.fr/ile-de-france/irecontenu/telechargement/139847/1018971/file/Bilan_actes_anti_religieux_2025.pdf',
    },
    quiz: {
      question: 'Combien d\'actes antisémites ont été recensés en France en 2025 ?',
      choix: ['Environ 130', 'Environ 450', 'Environ 1 300', 'Environ 13 000'],
      reponse: 2,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
  {
    id: 'egalite-salariale',
    theme: 'emploi',
    ideeRecue: 'À poste égal, les femmes sont payées autant que les hommes.',
    verdict: 'faux',
    chiffre: {
      valeur: '3,6 %',
      legende: 'd\'écart de salaire entre femmes et hommes occupant le même emploi dans le même établissement (privé, 2024).',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      items: [
        { label: 'Écart de revenu salarial, tous postes', valeur: 21.8 },
        { label: 'À temps de travail égal', valeur: 14 },
        { label: 'Même emploi, même établissement', valeur: 3.6, accent: true },
      ],
    },
    explication:
      'Même à poste identique, un écart demeure : 3,6 % en 2024 dans le privé, l\'indicateur qui s\'approche le plus d\'une mesure de la discrimination salariale. L\'écart global est bien plus grand (21,8 %), car les femmes travaillent plus souvent à temps partiel et occupent moins souvent les postes les mieux payés : elles détiennent 42 % des postes salariés du privé, mais seulement 24 % du 1 % des postes les mieux rémunérés. L\'écart global se réduit lentement.',
    source: {
      nom: 'Insee Focus n° 377 (février 2026)',
      url: 'https://www.insee.fr/fr/statistiques/8743657',
    },
    quiz: {
      question: 'À emploi égal dans le même établissement, quel est l\'écart de salaire entre femmes et hommes (2024) ?',
      choix: ['0 %', '3,6 %', '14 %', '22 %'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
  {
    id: 'emplois-vacants',
    theme: 'emploi',
    ideeRecue: 'Il y a assez d\'emplois vacants pour tous les chômeurs.',
    verdict: 'faux',
    chiffre: {
      valeur: '458 000',
      legende: 'emplois vacants au 2e trimestre 2026, pour 2,7 millions de chômeurs.',
    },
    visualisation: {
      type: 'barres',
      unite: '',
      items: [
        { label: 'Chômeurs (au sens du BIT)', valeur: 2700000 },
        { label: 'Emplois vacants', valeur: 458000, accent: true },
      ],
    },
    explication:
      'On compte environ six chômeurs pour un emploi vacant. Même si tous les postes vacants étaient pourvus par des chômeurs, plus de deux millions resteraient sans emploi. Les difficultés de recrutement restent pourtant réelles dans certains métiers et territoires. Le nombre d\'emplois vacants a nettement baissé depuis son pic de fin 2022.',
    source: {
      nom: 'Unédic, « Comprendre les emplois vacants » (octobre 2026), d\'après la Dares ; chômage : Insee',
      url: 'https://www.unedic.org/publications/comprendre-les-emplois-vacants-les-offres-non-pourvues-les-tensions-octobre-2026',
    },
    quiz: {
      question: 'Combien d\'emplois étaient vacants en France au 2e trimestre 2026 ?',
      choix: ['Environ 45 000', 'Environ 460 000', 'Environ 2,7 millions', 'Environ 6 millions'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
  {
    id: 'etrangers-mis-en-cause',
    theme: 'securite',
    ideeRecue: 'Les étrangers sont surreprésentés parmi les personnes mises en cause par la police.',
    verdict: 'vrai',
    chiffre: {
      valeur: '37 %',
      legende: 'des personnes mises en cause pour cambriolage en 2024 sont étrangères, alors que les étrangers représentent 8 % des habitants.',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      max: 100,
      items: [
        { label: 'Cambriolages', valeur: 37 },
        { label: 'Trafic de stupéfiants', valeur: 22 },
        { label: 'Homicides', valeur: 18 },
        { label: 'Viols et tentatives', valeur: 14 },
        { label: 'Part des étrangers dans la population', valeur: 8, accent: true },
      ],
    },
    explication:
      'La surreprésentation est nette, mais très variable selon les infractions : forte pour les vols et cambriolages, moindre pour les violences sexuelles. Une personne « mise en cause » est soupçonnée par la police ou la gendarmerie, pas forcément condamnée. Ces comparaisons brutes ne tiennent pas compte de l\'âge et du sexe, alors que les personnes mises en cause sont en majorité des hommes jeunes. Le service statistique précise aussi que les personnes ayant plusieurs nationalités ne sont pas identifiées et que les données ne couvrent pas toutes les infractions.',
    source: {
      nom: 'Ministère de l\'Intérieur (SSMSI), réponse à la question écrite n° 9474 (Assemblée nationale)',
      url: 'https://questions.assemblee-nationale.fr/q17/17-9474QE.htm',
    },
    quiz: {
      question: 'Quelle part des personnes mises en cause pour cambriolage en 2024 étaient étrangères ?',
      choix: ['8 %', '17 %', '37 %', '64 %'],
      reponse: 2,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
  {
    id: 'niveau-de-vie-retraites',
    theme: 'retraites',
    ideeRecue: 'Les retraités vivent mieux que le reste des Français.',
    verdict: 'nuance',
    chiffre: {
      valeur: '26 830 €',
      legende: 'de niveau de vie médian par an pour les retraités en 2024, contre 26 740 € pour l\'ensemble de la population.',
    },
    visualisation: {
      type: 'barres',
      unite: ' €',
      items: [
        { label: 'Retraités', valeur: 26830, accent: true },
        { label: 'Ensemble de la population', valeur: 26740 },
      ],
    },
    explication:
      'Le niveau de vie médian des retraités est quasiment le même que celui de l\'ensemble des Français. L\'écart devient plus favorable aux retraités si l\'on tient compte du fait que beaucoup sont propriétaires de leur logement et n\'ont plus de loyer à payer. Mais cette médiane cache de fortes inégalités entre retraités. Le Conseil d\'orientation des retraites prévoit que le niveau de vie des retraités, rapporté à celui de l\'ensemble de la population, baissera dans les prochaines décennies.',
    source: {
      nom: 'Insee, niveau de vie selon le statut d\'activité (données 1996-2024)',
      url: 'https://www.insee.fr/fr/statistiques/2415628',
    },
    quiz: {
      question: 'Quel est le niveau de vie médian annuel des retraités en 2024, face à 26 740 € pour l\'ensemble de la population ?',
      choix: ['19 400 €', '26 830 €', '33 900 €', '41 200 €'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
  {
    id: 'arrets-maladie',
    theme: 'sante',
    ideeRecue: 'Les arrêts maladie explosent.',
    verdict: 'nuance',
    chiffre: {
      valeur: '11,3 Md€',
      legende: 'd\'indemnités journalières maladie en 2025, contre 6,8 milliards en 2014.',
    },
    visualisation: {
      type: 'barres',
      unite: ' Md€',
      items: [
        { label: '2014', valeur: 6.8 },
        { label: '2025', valeur: 11.3, accent: true },
      ],
    },
    explication:
      'Hors Covid et épidémies de grippe, les dépenses d\'arrêts maladie ont été multipliées par 1,7 en onze ans. Une partie s\'explique mécaniquement : les indemnités suivent les salaires, et les actifs sont plus âgés, donc plus souvent malades. Depuis avril 2025, l\'indemnisation est plafonnée plus bas, et la hausse devrait presque s\'arrêter en 2026 (+0,7 % prévu), même si les arrêts de plus de trois mois continuent d\'augmenter.',
    source: {
      nom: 'Sécurité sociale, rapports d\'évaluation des politiques (dynamique des indemnités journalières)',
      url: 'https://evaluation.securite-sociale.fr/home/maladie/2121-dynamique-des-indemnites-jo.html',
    },
    quiz: {
      question: 'Combien l\'Assurance maladie a-t-elle versé d\'indemnités journalières maladie en 2025 ?',
      choix: ['1,1 Md€', '11,3 Md€', '56 Md€', '113 Md€'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
  {
    id: 'delinquance-partout',
    theme: 'securite',
    ideeRecue: 'La délinquance augmente dans tous les domaines.',
    verdict: 'faux',
    chiffre: {
      valeur: '+8 %',
      legende: 'de violences sexuelles enregistrées en 2025, alors que les cambriolages reculent de 3 %.',
    },
    visualisation: {
      type: 'evolution',
      unite: ' %',
      items: [
        { label: 'Violences sexuelles', valeur: 8, accent: true },
        { label: 'Violences physiques', valeur: 5, accent: true },
        { label: 'Cambriolages', valeur: -3 },
        { label: 'Vols avec armes', valeur: -7 },
        { label: 'Vols de véhicules', valeur: -9 },
      ],
    },
    explication:
      'Les tendances divergent : les violences contre les personnes augmentent, alors que les vols et cambriolages reculent. Les homicides sont stables. Ces chiffres portent sur les faits enregistrés par la police et la gendarmerie : une hausse peut aussi venir du fait que les victimes portent plainte plus souvent, notamment pour les violences sexuelles et intrafamiliales.',
    source: {
      nom: 'SSMSI (ministère de l\'Intérieur), Insécurité et délinquance en 2025',
      url: 'https://www.interieur.gouv.fr/Interstats/Actualites/Insecurite-et-delinquance-en-2025-bilan-statistique-et-atlas-departemental',
    },
    quiz: {
      question: 'Comment ont évolué les cambriolages enregistrés en France en 2025 ?',
      choix: ['−30 %', '−3 %', '+15 %', '+40 %'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
  {
    id: 'feminicides',
    theme: 'justice',
    ideeRecue: 'Les féminicides conjugaux sont en hausse.',
    verdict: 'vrai',
    chiffre: {
      valeur: '111',
      legende: 'femmes tuées par leur conjoint ou ex-conjoint en 2025, contre 107 en 2024 et 96 en 2023.',
    },
    visualisation: {
      type: 'barres',
      unite: ' femmes',
      items: [
        { label: '2023', valeur: 96 },
        { label: '2024', valeur: 107 },
        { label: '2025', valeur: 111, accent: true },
      ],
    },
    explication:
      'C\'est la deuxième hausse consécutive : une femme est tuée par son conjoint ou ex-conjoint environ tous les trois jours. Les femmes représentent 82 % des 136 personnes tuées au sein du couple en 2025. Parmi les femmes tuées, 37 % avaient déjà subi des violences de leur conjoint. Les associations, qui comptent selon une autre méthode, recensent davantage de féminicides que le ministère.',
    source: {
      nom: 'Ministère de l\'Intérieur, étude nationale sur les morts violentes au sein du couple 2025 (reprise par Euronews)',
      url: 'https://fr.euronews.com/2026/10/15/violences-conjugales-en-france-111-femmes-tuees-par-leur-conjoint-ou-ex-conjoint-en-2025-e',
    },
    quiz: {
      question: 'Combien de femmes ont été tuées par leur conjoint ou ex-conjoint en France en 2025 ?',
      choix: ['Environ 30', 'Environ 110', 'Environ 400', 'Environ 1 100'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-26',
  },
  {
    id: 'mortalite-routiere',
    theme: 'transports',
    ideeRecue: 'La mortalité routière continue de baisser.',
    verdict: 'faux',
    chiffre: {
      valeur: '3 263',
      legende: 'personnes tuées sur les routes de métropole en 2025, soit 70 de plus qu\'en 2024.',
    },
    visualisation: {
      type: 'barres',
      unite: ' tués',
      items: [
        { label: '2024 (métropole)', valeur: 3193 },
        { label: '2025 (métropole)', valeur: 3263, accent: true },
      ],
    },
    explication:
      'La mortalité routière est repartie à la hausse en 2025, et revient au niveau de 2019, avant la crise sanitaire. Avec l\'outre-mer, 3 515 personnes sont mortes sur les routes. Le nombre de piétons tués augmente nettement (503, soit 47 de plus qu\'en 2024).',
    source: {
      nom: 'ONISR (Sécurité routière), bilan de l\'accidentalité 2025',
      url: 'https://www.onisr.securite-routiere.gouv.fr/sites/default/files/2026-01/20260130_Bilan%20provisoire%202025_ONISR.pdf',
    },
    quiz: {
      question: 'Combien de personnes ont été tuées sur les routes de métropole en 2025 ?',
      choix: ['Environ 800', 'Environ 3 300', 'Environ 9 000', 'Environ 16 000'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-27',
  },
  {
    id: 'nombre-medecins',
    theme: 'sante',
    ideeRecue: 'Il y a de moins en moins de médecins en France.',
    verdict: 'faux',
    chiffre: {
      valeur: '237 200',
      legende: 'médecins en activité au 1er janvier 2025, soit 9,9 % de plus qu\'en 2012.',
    },
    visualisation: {
      type: 'barres',
      unite: ' médecins',
      items: [
        { label: 'Autres spécialités', valeur: 137200 },
        { label: 'Médecins généralistes', valeur: 100000, accent: true },
      ],
    },
    explication:
      'Le nombre total de médecins augmente, avec une part croissante de diplômés à l\'étranger. Les difficultés d\'accès aux soins sont pourtant réelles : le nombre de généralistes a baissé entre 2018 et 2024 (−0,5 % par an), avant de repartir à la hausse en 2025 (+1 %). Comme la population augmente et vieillit, le nombre de généralistes par habitant a reculé, et les écarts entre territoires restent forts.',
    source: {
      nom: 'DREES, démographie des médecins au 1er janvier 2025',
      url: 'https://drees.solidarites-sante.gouv.fr/jeux-de-donnees/jeux-de-donnees/237-200-medecins-sont-en-activite-en-france-au-1er-janvier-2025',
    },
    quiz: {
      question: 'Combien de médecins étaient en activité en France au 1er janvier 2025 ?',
      choix: ['Environ 52 000', 'Environ 118 000', 'Environ 237 000', 'Environ 610 000'],
      reponse: 2,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-28',
  },
  {
    id: 'exportations-armes',
    theme: 'defense',
    ideeRecue: 'La France est le deuxième exportateur d\'armes au monde.',
    verdict: 'vrai',
    chiffre: {
      valeur: '9,8 %',
      legende: 'des exportations mondiales d\'armes majeures entre 2021 et 2025 : 2e rang, loin derrière les États-Unis.',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      max: 100,
      items: [
        { label: 'États-Unis', valeur: 42 },
        { label: 'France', valeur: 9.8, accent: true },
      ],
    },
    explication:
      'Les exportations françaises ont progressé de 21 % par rapport à 2016-2020, vers 63 pays. L\'Inde, l\'Égypte et la Grèce sont les trois premiers clients. Les États-Unis restent de très loin le premier exportateur (42 % du total), tandis que la Russie a vu ses exportations chuter de 64 %. Ces classements portent sur les livraisons d\'armes majeures (avions, navires, blindés…), mesurées sur cinq ans.',
    source: {
      nom: 'SIPRI, tendances des transferts internationaux d\'armes 2025 (mars 2026)',
      url: 'https://www.sipri.org/sites/default/files/2026-03/fs_2603_at_2025.pdf',
    },
    quiz: {
      question: 'Quelle part des exportations mondiales d\'armes majeures la France a-t-elle réalisée en 2021-2025 ?',
      choix: ['0,8 %', '3 %', '9,8 %', '25 %'],
      reponse: 2,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-29',
  },
  {
    id: 'cout-jo-paris',
    theme: 'sport',
    ideeRecue: 'Les JO de Paris ont coûté une fortune à l\'argent public.',
    verdict: 'nuance',
    chiffre: {
      valeur: '6,6 Md€',
      legende: 'de dépenses publiques pour les Jeux olympiques et paralympiques de Paris 2024, selon la Cour des comptes.',
    },
    visualisation: {
      type: 'barres',
      unite: ' Md€',
      items: [
        { label: 'Infrastructures', valeur: 3.63 },
        { label: 'Organisation (dont 1,44 pour la sécurité)', valeur: 3.02, accent: true },
      ],
    },
    explication:
      'La facture publique est importante, mais la Cour des comptes ne relève pas de dérapage budgétaire. Plus de la moitié a financé des infrastructures qui restent après les Jeux. Les recettes publiques identifiées sont faibles pour l\'instant (293 millions d\'euros), et la Cour juge l\'impact économique limité. Le comité d\'organisation avance un coût bien plus bas, car il ne compte que ses propres dépenses.',
    source: {
      nom: 'Cour des comptes, rapport sur les Jeux de Paris 2024 (repris par Brut)',
      url: 'https://www.brut.media/fr/articles/jeux-de-paris-2024-6-6-milliards-de-facture-publique-mais-pas-de-derapage-selon-la-cour-des-comptes',
    },
    quiz: {
      question: 'Combien d\'argent public les JO de Paris 2024 ont-ils coûté, selon la Cour des comptes ?',
      choix: ['660 millions d\'euros', '6,6 milliards d\'euros', '26 milliards d\'euros', '66 milliards d\'euros'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-30',
  },
  {
    id: 'reussite-bac',
    theme: 'education',
    ideeRecue: 'Le bac est donné à tout le monde.',
    verdict: 'nuance',
    chiffre: {
      valeur: '91,6 %',
      legende: 'des candidats ont obtenu le bac en 2025 (sessions de juin et de septembre).',
    },
    visualisation: {
      type: 'barres',
      unite: ' %',
      max: 100,
      items: [
        { label: 'Voie générale', valeur: 96.2 },
        { label: 'Voie technologique', valeur: 90.9 },
        { label: 'Voie professionnelle', valeur: 83.9, accent: true },
      ],
    },
    explication:
      'Le taux de réussite est très élevé, mais pas uniforme : plus d\'un candidat sur six échoue au bac professionnel. Sur 744 000 candidats en 2025, environ 62 000 ne l\'ont pas obtenu. Un taux de réussite élevé ne dit pas, à lui seul, si l\'examen est devenu plus facile.',
    source: {
      nom: 'DEPP, résultats définitifs du baccalauréat 2025',
      url: 'https://www.education.gouv.fr/depp/resultats-definitifs-du-baccalaureat-2025-moins-de-bacheliers-dans-les-voies-generale-et-469403',
    },
    quiz: {
      question: 'Quel a été le taux de réussite au bac en 2025, toutes voies confondues ?',
      choix: ['64 %', '78 %', '91,6 %', '99,2 %'],
      reponse: 2,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-10-31',
  },
  {
    id: 'rythme-climat',
    theme: 'ecologie',
    ideeRecue: 'La France réduit ses émissions assez vite pour tenir ses objectifs climat.',
    verdict: 'faux',
    chiffre: {
      valeur: '−1,5 %',
      legende: 'd\'émissions de gaz à effet de serre en 2025, alors qu\'il faudrait environ −4 à −5 % par an.',
    },
    visualisation: {
      type: 'evolution',
      unite: ' %',
      items: [
        { label: 'Baisse en 2024', valeur: -1.8 },
        { label: 'Baisse en 2025', valeur: -1.5, accent: true },
        { label: 'Baisse nécessaire chaque année', valeur: -4.6 },
      ],
    },
    explication:
      'Les émissions françaises baissent, mais environ trois fois moins vite que ce que prévoient les objectifs nationaux : la stratégie bas carbone vise une baisse moyenne de 4,6 % par an d\'ici 2030. En 2025, elles atteignent 364 millions de tonnes d\'équivalent CO₂. Les transports, premier secteur émetteur (34 %), n\'ont reculé que de 1,4 %, tandis que l\'industrie a baissé de 3,5 %.',
    source: {
      nom: 'Citepa, estimation des émissions 2025 (avril 2026, reprise par l\'AFP)',
      url: 'https://www.linfodurable.fr/france-la-baisse-des-emissions-de-gaz-effet-de-serre-insuffisante-en-2025-citepa-55813',
    },
    quiz: {
      question: 'De combien les émissions de gaz à effet de serre de la France ont-elles baissé en 2025 ?',
      choix: ['−0,2 %', '−1,5 %', '−6 %', '−12 %'],
      reponse: 1,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-11-01',
  },
  {
    id: 'loyers',
    theme: 'logement',
    ideeRecue: 'Les loyers explosent.',
    verdict: 'faux',
    chiffre: {
      valeur: '+2,4 %',
      legende: 'de hausse des loyers en un an (janvier 2025), et +1,8 % dans le parc privé.',
    },
    visualisation: {
      type: 'evolution',
      unite: ' %',
      items: [
        { label: 'Parc social', valeur: 3.7 },
        { label: 'Ensemble des loyers', valeur: 2.4, accent: true },
        { label: 'Parc privé', valeur: 1.8 },
      ],
    },
    explication:
      'En moyenne, les loyers des locataires en place augmentent modérément : l\'indice qui sert à les réviser n\'a progressé que de 0,79 % sur un an fin 2025. Cette moyenne nationale peut cacher des hausses plus fortes dans certaines villes, notamment pour les nouveaux locataires, que ces indices mesurent mal.',
    source: {
      nom: 'Insee, Informations rapides n° 65 (indices des loyers, janvier 2025)',
      url: 'https://www.insee.fr/fr/statistiques/fichier/version-html/8384757/IR65_ILH_jan25.pdf',
    },
    quiz: {
      question: 'De combien les loyers ont-ils augmenté en un an en France (janvier 2025) ?',
      choix: ['+2,4 %', '+9 %', '+15 %', '+24 %'],
      reponse: 0,
    },
    verifieLe: '2026-10-26',
    publieLe: '2026-11-02',
  },
];
