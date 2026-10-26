import { el } from '../utils/dom.js';
import { config } from '../config.js';
import { compter } from '../statistiques.js';

const champ = 'w-full rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:border-brass-500 focus:outline-none';

const TEXTES = {
  question: {
    titre: 'Une idée reçue à vérifier ?',
    intro: 'Proposez une affirmation entendue au café, à la télé ou sur les réseaux. Les questions ne sont pas publiées telles quelles : les plus demandées deviennent des cartes, vérifiées avec une source officielle.',
    champ: 'L\'idée reçue ou la question',
    exemple: 'Ex. : « Les fonctionnaires sont plus nombreux en France qu\'ailleurs. »',
    email: 'Pour être prévenu quand la carte est publiée',
  },
  erreur: {
    titre: 'Signaler une erreur',
    intro: 'Un chiffre faux, dépassé ou mal interprété ? Dites-nous ce qui vous semble inexact, avec votre source si possible. Chaque signalement est vérifié, et les corrections sont publiées sur la page « Corrections ».',
    champ: 'Ce qui vous semble inexact',
    exemple: 'Ex. : « Le chiffre de 2025 a été révisé par l\'Insee : voici le lien… »',
    email: 'Pour être prévenu de la correction',
  },
};

/**
 * Panneau latéral (élément <dialog>) : `ouvrir()` pour poser une question,
 * `ouvrir(fait)` pour signaler une erreur sur cette carte.
 */
export function createQuestions(dialog, themes) {
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); }); // clic hors du panneau

  const fermer = el('button', { type: 'button', class: 'text-sm font-medium text-stone-300 underline underline-offset-4' }, 'Fermer');
  fermer.addEventListener('click', () => dialog.close());

  const etat = el('p', { class: 'text-sm', role: 'status' });
  const envoyer = el('button', {
    type: 'submit',
    class: 'rounded-full bg-brass-500 px-5 py-2 text-sm font-semibold text-ink-900 hover:bg-brass-400 disabled:opacity-50',
  }, 'Envoyer');

  const libelle = el('span', {});
  const texte = el('textarea', { name: 'question', required: true, rows: 4, maxlength: 600, class: champ });
  const theme = el('select', { name: 'theme', class: champ }, [
    el('option', { value: '' }, 'Je ne sais pas'),
    ...themes.map((t) => el('option', { value: t.nom }, t.nom)),
  ]);
  const email = el('input', { type: 'email', name: 'email', autocomplete: 'email', class: champ });
  const type = el('input', { type: 'hidden', name: 'type' });
  const carte = el('input', { type: 'hidden', name: 'carte' });
  const rappelCarte = el('p', { class: 'rounded-lg border border-ink-600 bg-ink-900 p-3 text-sm font-semibold text-stone-100' });

  const formulaire = el('form', { class: 'flex flex-col gap-4' }, [
    rappelCarte,
    el('label', { class: 'flex flex-col gap-1.5 text-sm font-medium text-stone-200' }, [libelle, texte]),
    el('label', { class: 'flex flex-col gap-1.5 text-sm font-medium text-stone-200' }, ['Thème (facultatif)', theme]),
    el('label', { class: 'flex flex-col gap-1.5 text-sm font-medium text-stone-200' }, ['Votre e-mail (facultatif)', email]),
    type, carte,
    // Champ piège invisible : les robots le remplissent, Formspree rejette alors l'envoi.
    el('input', { type: 'text', name: '_gotcha', tabindex: '-1', autocomplete: 'off', class: 'hidden', 'aria-hidden': 'true' }),
    el('div', { class: 'flex items-center gap-4' }, [envoyer, etat]),
  ]);

  formulaire.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!navigator.onLine) {
      afficherEtat('Vous êtes hors connexion. Votre texte est conservé : réessayez une fois connecté.', 'text-amber-200');
      return;
    }
    envoyer.disabled = true;
    afficherEtat('Envoi…', 'text-stone-400');
    try {
      const r = await fetch(config.formulaire, {
        method: 'POST', body: new FormData(formulaire), headers: { Accept: 'application/json' },
      });
      if (!r.ok) throw new Error(r.status);
      const signalement = Boolean(carte.value);
      formulaire.reset();
      preparer(signalement ? carteSignalee : null); // reset() vide aussi les champs cachés
      compter(signalement ? 'erreur-signalee' : 'question-envoyee', signalement ? 'Erreur signalée' : 'Question envoyée', true);
      afficherEtat(signalement ? 'Merci, votre signalement est bien arrivé.' : 'Merci, votre question est bien arrivée.', 'text-emerald-300');
    } catch {
      afficherEtat('L\'envoi a échoué. Réessayez dans un instant.', 'text-rose-300');
    } finally {
      envoyer.disabled = false;
    }
  });

  function afficherEtat(texte, couleur) {
    etat.textContent = texte;
    etat.className = `text-sm ${couleur}`;
  }

  const indisponible = el('p', { class: 'rounded-lg border border-ink-600 bg-ink-900 p-4 text-sm text-stone-400' },
    'La boîte à questions ouvre bientôt. Revenez dans quelques jours !');

  const titre = el('h2', { id: 'questions-titre', class: 'font-display text-xl font-bold text-stone-50' });
  const intro = el('p', { class: 'text-sm leading-relaxed text-stone-400' });

  dialog.replaceChildren(el('div', { class: 'flex min-h-full flex-col gap-5 p-6' }, [
    el('div', { class: 'flex items-center justify-between gap-3' }, [titre, fermer]),
    intro,
    config.formulaire ? formulaire : indisponible,
    el('div', { class: 'mt-auto flex flex-col gap-2 text-sm' }, [
      el('a', { href: 'methode.html', class: 'font-medium text-brass-400 underline underline-offset-4' }, 'Comment les cartes sont vérifiées'),
      el('a', { href: 'corrections.html', class: 'text-stone-400 underline underline-offset-4' }, 'Les corrections publiées'),
    ]),
  ]));

  // Adapte le panneau : question libre, ou signalement d'erreur sur une carte précise.
  let carteSignalee = null;
  function preparer(fait) {
    carteSignalee = fait;
    const t = TEXTES[fait ? 'erreur' : 'question'];
    titre.textContent = t.titre;
    intro.textContent = t.intro;
    libelle.textContent = t.champ;
    texte.placeholder = t.exemple;
    email.placeholder = t.email;
    type.value = fait ? 'Signalement d\'erreur' : 'Question';
    carte.value = fait ? `${fait.id} : « ${fait.ideeRecue} »` : '';
    rappelCarte.hidden = !fait;
    rappelCarte.textContent = fait ? `Carte : « ${fait.ideeRecue} »` : '';
    if (fait) theme.value = themes.find((th) => th.id === fait.theme)?.nom ?? '';
  }

  preparer(null);

  return {
    ouvrir(fait = null) {
      if (fait !== carteSignalee) { preparer(fait); afficherEtat('', 'text-stone-400'); }
      if (!dialog.open) dialog.showModal();
    },
  };
}
