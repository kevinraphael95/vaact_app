// ══════════════════════════════
// nav.js — Gestion de la navigation par onglets
// Pour ajouter une page : ajouter un nav-item dans index.html
//   et créer le div.page correspondant
// ══════════════════════════════

export function initNav() {
  // Active le premier nav-item au démarrage
  const firstItem = document.querySelector('.nav-item');
  if (firstItem) firstItem.classList.add('active');
}

export function nav(pageId, el) {
  // Cache toutes les pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Désactive tous les nav items
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  // Affiche la page cible
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');
  // Active le nav item cliqué
  if (el) el.classList.add('active');
}

// Expose globalement pour les onclick inline dans le HTML
window.nav = nav;
