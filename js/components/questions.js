import { el } from '../utils/dom.js';
import { config } from '../config.js';
import { compter } from '../statistiques.js';

const champ = 'w-full rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:border-brass-500 focus:outline-none';

/** Panneau latéral « Poser une question » (élément <dialog>) : `ouvrir()`. */
export function createQuestions(dialog, themes) {
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); }); // clic hors du panneau

  const fermer = el('button', { type: 'button', class: 'text-sm font-medium text-stone-300 underline underline-offset-4' }, 'Fermer');
  fermer.addEventListener('click', () => dialog.close());

  const etat = el('p', { class: 'text-sm', role: 'status' });
  const envoyer = el('button', {
    type: 'submit',
    class: 'rounded-full bg-brass-500 px-5 py-2 text-sm font-semibold text-ink-900 hover:bg-brass-400 disabled:opacity-50',
  }, 'Envoyer');

  const formulaire = el('form', { class: 'flex flex-col gap-4' }, [
    el('label', { class: 'flex flex-col gap-1.5 text-sm font-medium text-stone-200' }, [
      'L\'idée reçue ou la question',
      el('textarea', { name: 'question', required: true, rows: 4, maxlength: 600, class: champ,
        placeholder: 'Ex. : « Les fonctionnaires sont plus nombreux en France qu\'ailleurs. »' }),
    ]),
    el('label', { class: 'flex flex-col gap-1.5 text-sm font-medium text-stone-200' }, [
      'Thème (facultatif)',
      el('select', { name: 'theme', class: champ }, [
        el('option', { value: '' }, 'Je ne sais pas'),
        ...themes.map((t) => el('option', { value: t.nom }, t.nom)),
      ]),
    ]),
    el('label', { class: 'flex flex-col gap-1.5 text-sm font-medium text-stone-200' }, [
      'Votre e-mail (facultatif)',
      el('input', { type: 'email', name: 'email', autocomplete: 'email', class: champ,
        placeholder: 'Pour être prévenu quand la carte est publiée' }),
    ]),
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
      formulaire.reset();
      compter('question-envoyee', 'Question envoyée', true);
      afficherEtat('Merci, votre question est bien arrivée.', 'text-emerald-300');
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

  dialog.replaceChildren(el('div', { class: 'flex min-h-full flex-col gap-5 p-6' }, [
    el('div', { class: 'flex items-center justify-between gap-3' }, [
      el('h2', { id: 'questions-titre', class: 'font-display text-xl font-bold text-stone-50' }, 'Une idée reçue à vérifier ?'),
      fermer,
    ]),
    el('p', { class: 'text-sm leading-relaxed text-stone-400' },
      'Proposez une affirmation entendue au café, à la télé ou sur les réseaux. Les questions ne sont pas publiées telles quelles : les plus demandées deviennent des cartes, vérifiées avec une source officielle.'),
    config.formulaire ? formulaire : indisponible,
    el('a', { href: 'methode.html', class: 'mt-auto text-sm font-medium text-brass-400 underline underline-offset-4' },
      'Comment les cartes sont vérifiées'),
  ]));

  return { ouvrir: () => dialog.showModal() };
}
