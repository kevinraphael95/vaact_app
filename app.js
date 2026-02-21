// ══════════════════════════════
// app.js — Point d'entrée principal
// Importe et initialise tous les modules
// ══════════════════════════════

import { initNav }     from './nav.js';
import { initProfile } from './profile.js';
import { initDecks }   from './decks.js';
import { initUpdates } from './updates.js';

// Initialise l'app au chargement
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initProfile();
  initDecks();
  initUpdates();

  // ← Ajouter ici l'init de nouveaux modules (puzzles, classement, etc.)

  // Service Worker (PWA / mode hors ligne)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(() => console.log('[VAACT] SW ✅'))
        .catch(e => console.log('[VAACT] SW ❌', e));
    });
  }
});
