import { themes } from './data/themes.js';
import { faits } from './data/faits.js';
import { createTabs } from './components/tabs.js';
import { createTile } from './components/tile.js';
import { createDetail } from './components/detail.js';

const parId = Object.fromEntries(themes.map((t) => [t.id, t]));
const grille = document.getElementById('grille');
const titre = document.getElementById('titre-theme');
const vide = document.getElementById('vide');
const detail = createDetail(document.getElementById('detail'));

const comptes = { tous: faits.length };
for (const f of faits) {
  if (!parId[f.theme]) console.warn(`Thème inconnu pour « ${f.id} » : ${f.theme}`);
  comptes[f.theme] = (comptes[f.theme] ?? 0) + 1;
}

const onglets = createTabs(document.getElementById('onglets'), themes, comptes, afficher);

function afficher(id) {
  const liste = id === 'tous' ? faits : faits.filter((f) => f.theme === id);
  titre.textContent = id === 'tous' ? 'Toutes les idées reçues' : parId[id].nom;
  grille.replaceChildren(...liste.map((f) => createTile(f, parId[f.theme], (x) => detail.ouvrir(x, parId[x.theme]))));
  vide.hidden = liste.length > 0;
  onglets.setActive(id);
  history.replaceState(null, '', id === 'tous' ? location.pathname : `#${id}`); // lien partageable par thème
}

afficher(parId[location.hash.slice(1)] ? location.hash.slice(1) : 'tous');

if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');
