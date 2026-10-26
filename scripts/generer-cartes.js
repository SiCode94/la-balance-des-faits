/**
 * Génère, à partir de js/data/faits.js :
 *  - cartes/<id>.html        une page par carte (lien à partager, aperçu dans les messageries, balisage ClaimReview)
 *  - cartes/images/<id>.png  l'image d'aperçu de chaque carte (1200 × 630)
 *  - images/apercu.png       l'image d'aperçu de l'accueil
 *  - corrections.html        le journal des corrections, à partir de js/data/corrections.js
 *
 * Usage : npm run cartes   (à relancer après chaque ajout ou modification de carte)
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { faits } from '../js/data/faits.js';
import { themes } from '../js/data/themes.js';
import { config } from '../js/config.js';
import { VERDICTS } from '../js/components/detail.js';
import { lignesVisualisation } from '../js/components/visualisation.js';
import { formatDate } from '../js/utils/dom.js';
import { corrections } from '../js/data/corrections.js';
import { cartesAReverifier } from './a-reverifier.js';
import { cartesLiees } from '../js/utils/liees.js';

const parId = Object.fromEntries(themes.map((t) => [t.id, t]));
const police = (graisse) => readFile(`node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-${graisse}-normal.woff`);
const polices = [
  { name: 'Bricolage', data: await police(500), weight: 500 },
  { name: 'Bricolage', data: await police(700), weight: 700 },
];

// Couleurs des verdicts dans les images (mêmes teintes que les classes Tailwind de VERDICTS).
const COULEURS = {
  faux:   { fond: '#4c0519', texte: '#fecdd3' },
  nuance: { fond: '#451a03', texte: '#fde68a' },
  vrai:   { fond: '#022c22', texte: '#a7f3d0' },
};

// ---------- Images ----------

/** Petit utilitaire : un élément pour satori (équivalent d'une balise HTML avec style en ligne). */
function h(type, style, ...children) {
  return { type, props: { style: { display: 'flex', ...style }, children: children.length > 1 ? children : children[0] } };
}

async function image(arbre) {
  const svg = await satori(arbre, { width: 1200, height: 630, fonts: polices });
  return new Resvg(svg).render().asPng();
}

function cadre(...enfants) {
  // Dimensions explicites : satori ajoute les marges intérieures à la taille au lieu de les y inclure.
  return h('div', { width: 1200, height: 630, backgroundColor: '#14161A', color: '#F5F5F4', fontFamily: 'Bricolage' },
    h('div', { width: 16, height: 630, backgroundColor: '#C9A227' }),
    h('div', { width: 1056, height: 518, margin: '56px 64px', flexDirection: 'column', justifyContent: 'space-between' }, ...enfants),
  );
}

function imageCarte(fait) {
  const verdict = VERDICTS[fait.verdict] ?? VERDICTS.nuance;
  const couleur = COULEURS[fait.verdict] ?? COULEURS.nuance;
  const taille = fait.ideeRecue.length > 90 ? 52 : 60;
  return cadre(
    h('div', { justifyContent: 'space-between', fontSize: 28, fontWeight: 500 },
      h('div', { color: '#D9B44A' }, 'La Balance des Faits'),
      h('div', { color: '#A8A29E' }, parId[fait.theme]?.nom ?? ''),
    ),
    h('div', { fontSize: taille, fontWeight: 700, lineHeight: 1.15 }, `« ${fait.ideeRecue} »`),
    h('div', { alignItems: 'center', gap: 32 },
      h('div', { backgroundColor: couleur.fond, color: couleur.texte, fontSize: 40, fontWeight: 700, padding: '10px 32px', borderRadius: 999 }, verdict.label),
      h('div', { color: '#D6D3D1', fontSize: 36, fontWeight: 500 }, 'Voir les chiffres officiels'),
    ),
  );
}

function imageAccueil() {
  return cadre(
    h('div', { color: '#D9B44A', fontSize: 32, fontWeight: 500 }, 'Fact-checking, chiffres officiels'),
    h('div', { fontSize: 96, fontWeight: 700, lineHeight: 1.05 }, 'La Balance des Faits'),
    h('div', { color: '#D6D3D1', fontSize: 36, fontWeight: 500, lineHeight: 1.3 },
      'Une idée reçue d\'un côté, les chiffres officiels de l\'autre, avec la source à portée de clic.'),
  );
}

// ---------- Pages ----------

const echapper = (texte) => String(texte)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function pageCarte(fait) {
  const theme = parId[fait.theme];
  const verdict = VERDICTS[fait.verdict] ?? VERDICTS.nuance;
  const url = `${config.site}cartes/${fait.id}.html`;
  const imageUrl = `${config.site}cartes/images/${fait.id}.png`;
  const resume = `${verdict.label} : ${fait.chiffre.valeur} ${fait.chiffre.legende}`;
  const viz = fait.visualisation;
  const lignes = lignesVisualisation(viz);

  const claimReview = {
    '@context': 'https://schema.org',
    '@type': 'ClaimReview',
    url,
    claimReviewed: fait.ideeRecue,
    datePublished: fait.verifieLe,
    author: { '@type': 'Organization', name: 'La Balance des Faits', url: config.site },
    reviewRating: {
      '@type': 'Rating', ratingValue: { faux: 1, nuance: 2, vrai: 3 }[fait.verdict] ?? 2,
      worstRating: 1, bestRating: 3, alternateName: verdict.label,
    },
    itemReviewed: { '@type': 'Claim', name: fait.ideeRecue },
  };

  const barres = lignes.length ? `
      <ul class="space-y-3" role="list">${lignes.map(({ label, texte, accent, debut, largeur }) => `
        <li>
          <div class="mb-1 flex justify-between gap-3 text-sm">
            <span class="${accent ? 'font-semibold text-stone-100' : 'text-stone-400'}">${echapper(label)}</span>
            <span class="tabular-nums font-medium text-stone-100">${echapper(texte)}</span>
          </div>
          <div class="relative h-2.5 overflow-hidden rounded-full bg-ink-600"><div class="bar-fill h-full rounded-full ${accent ? 'bg-brass-500' : 'bg-stone-500'}" style="--w:${largeur}%;margin-left:${debut}%"></div>${viz.type === 'evolution' ? '<div class="absolute inset-y-0 left-1/2 w-px bg-stone-300"></div>' : ''}</div>
        </li>`).join('')}
      </ul>` : '';

  return `<!DOCTYPE html>
<!-- Page générée par scripts/generer-cartes.js : ne pas modifier à la main, modifier js/data/faits.js puis lancer npm run cartes. -->
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${echapper(fait.ideeRecue)} ${echapper(verdict.label)} · La Balance des Faits</title>
  <meta name="description" content="${echapper(resume)}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="La Balance des Faits">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:title" content="« ${echapper(fait.ideeRecue)} » ${echapper(verdict.label)}">
  <meta property="og:description" content="${echapper(resume)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="« ${echapper(fait.ideeRecue)} » Verdict : ${echapper(verdict.label)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#14161A">
  <link rel="manifest" href="../manifest.webmanifest">
  <link rel="icon" href="../icons/logo.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="../icons/apple-touch-icon.png">
  <link rel="preload" href="../fonts/bricolage-grotesque-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="../css/tailwind.css">
  <link rel="stylesheet" href="../css/styles.css">
  <script type="application/ld+json">${JSON.stringify(claimReview).replace(/</g, '\\u003c')}</script>
</head>
<body class="bg-ink-900 text-stone-200 antialiased">

  <header class="mx-auto flex max-w-lg items-center gap-3 px-5 pb-2 pt-8">
    <a href="../" class="shrink-0" aria-label="Retour à l'accueil">
      <img src="../icons/logo.svg" alt="" width="48" height="48" class="h-12 w-12 rounded-xl">
    </a>
    <a href="../" class="font-display text-lg font-bold text-stone-50">La Balance des Faits</a>
  </header>

  <main class="mx-auto max-w-lg px-4 py-6">
    <article class="flex flex-col gap-5 rounded-2xl border border-brass-500/60 bg-ink-800 p-6">
      <div class="flex items-center justify-between gap-3">
        <span class="rounded-full px-3 py-1 text-sm font-semibold ${verdict.classes}">${echapper(verdict.label)}</span>
        <a href="../#${fait.theme}" class="text-sm text-stone-400 underline-offset-4 hover:underline">${echapper(theme?.nom ?? '')}</a>
      </div>
      <h1 class="font-display text-xl font-bold leading-snug text-stone-100">« ${echapper(fait.ideeRecue)} »</h1>
      <div>
        <p class="font-display text-5xl font-bold tracking-tight text-brass-400">${echapper(fait.chiffre.valeur)}</p>
        <p class="mt-1 text-sm leading-snug text-stone-400">${echapper(fait.chiffre.legende)}</p>
      </div>${barres}
      <p class="text-sm leading-relaxed text-stone-300">${echapper(fait.explication)}</p>
      <div class="flex flex-col gap-3 border-t border-ink-600 pt-4 text-sm">
        <a href="${echapper(fait.source.url)}" target="_blank" rel="noopener noreferrer" class="font-medium text-brass-400 underline underline-offset-4">Source : ${echapper(fait.source.nom)}</a>
        <span class="text-stone-500">Vérifié le ${echapper(formatDate(fait.verifieLe))}</span>
        <button id="partager" type="button" class="self-start rounded-full border border-brass-500 px-4 py-1.5 text-sm font-semibold text-brass-300 hover:bg-brass-500 hover:text-ink-900">Partager</button>
      </div>
    </article>

    <section class="mt-6 flex flex-col gap-2" aria-labelledby="lire-aussi">
      <h2 id="lire-aussi" class="text-sm font-semibold text-stone-300">À lire aussi</h2>${cartesLiees(fait, faits).map((f) => {
        const v = VERDICTS[f.verdict] ?? VERDICTS.nuance;
        return `
      <a href="${f.id}.html" class="flex items-start justify-between gap-3 rounded-xl border border-ink-600 bg-ink-800 p-3 text-sm text-stone-200 hover:border-brass-500">
        <span class="font-medium leading-snug">${echapper(f.ideeRecue)}</span>
        <span class="shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${v.classes}">${echapper(v.label)}</span>
      </a>`;
      }).join('')}
    </section>

    <nav class="mt-6 flex flex-col gap-3 text-sm">
      <a href="../" class="self-start rounded-full bg-brass-500 px-5 py-2 font-semibold text-ink-900 hover:bg-brass-400">Voir toutes les idées reçues</a>
      <a href="../#question" class="font-medium text-brass-400 underline underline-offset-4">Proposer une idée reçue à vérifier</a>
      <a href="../#signaler-${fait.id}" class="text-stone-400 underline underline-offset-4">Signaler une erreur sur cette carte</a>
      <a href="../methode.html" class="text-stone-400 underline underline-offset-4">Notre méthode</a>
      <a href="../corrections.html" class="text-stone-400 underline underline-offset-4">Les corrections publiées</a>
    </nav>
  </main>

  <script type="module">
    import '../js/statistiques.js';
    import { partagerCarte } from '../js/components/detail.js';
    import { faits } from '../js/data/faits.js';
    const bouton = document.getElementById('partager');
    bouton.addEventListener('click', () => partagerCarte(faits.find((f) => f.id === ${JSON.stringify(fait.id)}), bouton));
  </script>
</body>
</html>
`;
}

// ---------- Page Corrections ----------

function pageCorrections() {
  const ids = new Set(faits.map((f) => f.id));
  const entrees = corrections.map((c) => `
      <li class="flex flex-col gap-3 rounded-2xl border border-ink-600 bg-ink-800 p-5">
        <p class="text-sm text-stone-400">${echapper(formatDate(c.date))}</p>
        <p class="font-display text-lg font-bold leading-snug text-stone-100">${
          c.id && ids.has(c.id)
            ? `<a href="cartes/${c.id}.html" class="underline-offset-4 hover:underline">« ${echapper(c.carte)} »</a>`
            : `« ${echapper(c.carte)} »`}</p>
        <dl class="grid gap-2 text-sm leading-relaxed">
          <div><dt class="font-semibold text-stone-300">Avant</dt><dd class="text-stone-400">${echapper(c.avant)}</dd></div>
          <div><dt class="font-semibold text-stone-300">Désormais</dt><dd class="text-stone-200">${echapper(c.apres)}</dd></div>
          <div><dt class="font-semibold text-stone-300">Pourquoi</dt><dd class="text-stone-400">${echapper(c.raison)}</dd></div>
        </dl>
      </li>`).join('');

  return `<!DOCTYPE html>
<!-- Page générée par scripts/generer-cartes.js : ne pas modifier à la main, modifier js/data/corrections.js puis lancer npm run cartes. -->
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Corrections · La Balance des Faits</title>
  <meta name="description" content="Toutes les corrections apportées aux cartes de La Balance des Faits : ce qui a changé, quand et pourquoi.">
  <link rel="canonical" href="${config.site}corrections.html">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="La Balance des Faits">
  <meta property="og:title" content="Corrections · La Balance des Faits">
  <meta property="og:image" content="${config.site}images/apercu.png">
  <meta name="theme-color" content="#14161A">
  <link rel="manifest" href="manifest.webmanifest">
  <link rel="icon" href="icons/logo.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
  <link rel="preload" href="fonts/bricolage-grotesque-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="css/tailwind.css">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body class="bg-ink-900 text-stone-200 antialiased">

  <header class="mx-auto flex max-w-3xl items-center gap-4 px-5 pb-6 pt-8">
    <a href="./" class="shrink-0" aria-label="Retour à l'accueil">
      <img src="icons/logo.svg" alt="" width="64" height="64" class="h-14 w-14 rounded-xl sm:h-16 sm:w-16">
    </a>
    <div>
      <p class="text-sm"><a href="./" class="text-brass-400 underline underline-offset-4">La Balance des Faits</a></p>
      <h1 class="font-display text-2xl font-bold tracking-tight text-stone-50 sm:text-4xl">Corrections</h1>
    </div>
  </header>

  <main class="mx-auto flex max-w-3xl flex-col gap-6 px-5 pb-12 pt-2">
    <p class="text-[15px] leading-relaxed text-stone-300">
      Quand une carte publiée change (un chiffre, un verdict, une source) ou est retirée, nous l'indiquons ici,
      avec la raison. Vous pensez avoir repéré une erreur ? Utilisez le lien « Signaler une erreur » présent sur chaque carte.
    </p>
    <ul class="flex flex-col gap-4" role="list">${entrees}
    </ul>
  </main>

  <footer class="mx-auto flex max-w-3xl flex-wrap gap-x-6 gap-y-2 px-5 pb-12 text-sm">
    <a href="./" class="font-medium text-brass-400 underline underline-offset-4">← Retour aux cartes</a>
    <a href="methode.html" class="text-stone-400 underline underline-offset-4">Notre méthode</a>
  </footer>
  <script type="module" src="js/statistiques.js"></script>
</body>
</html>
`;
}

// ---------- Génération ----------

// Une question de quiz mal formée bloquerait le jeu : on s'arrête avant de publier.
for (const { id, quiz } of faits) {
  if (quiz && !(Array.isArray(quiz.choix) && quiz.choix.length >= 2 && quiz.choix[quiz.reponse] !== undefined && quiz.question)) {
    throw new Error(`Carte « ${id} » : le champ quiz doit avoir une question, au moins 2 choix et une réponse valide (position dans choix, 0 pour la première).`);
  }
}

await rm('cartes', { recursive: true, force: true });
await mkdir('cartes/images', { recursive: true });
await mkdir('images', { recursive: true });

for (const fait of faits) {
  await writeFile(`cartes/images/${fait.id}.png`, await image(imageCarte(fait)));
  await writeFile(`cartes/${fait.id}.html`, pageCarte(fait));
}
await writeFile('images/apercu.png', await image(imageAccueil()));
await writeFile('corrections.html', pageCorrections());
console.log(`${faits.length} pages de cartes, ${faits.length + 1} images et la page Corrections (${corrections.length} entrées) générées.`);

const aRevoir = cartesAReverifier(faits);
if (aRevoir.length) console.log(`Attention : ${aRevoir.length} carte(s) vérifiée(s) il y a plus de 6 mois. Voir npm run reverifier.`);
