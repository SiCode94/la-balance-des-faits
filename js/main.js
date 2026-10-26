import { faits } from './data/faits.js';
import { createCard } from './components/card.js';

const grille = document.getElementById('grille');
grille.append(...faits.map(createCard));
