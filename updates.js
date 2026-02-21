// ══════════════════════════════
// updates.js — Annonces et news
//
// COMMENT AJOUTER UNE ANNONCE :
//   1. Ajouter un objet dans UPDATES (les plus récents en premier)
//   2. Champs :
//      - title  : titre affiché
//      - body   : contenu texte
//      - date   : date affichée ('Mars 2026', etc.)
//      - color  : 'r' (rouge), 'g' (gold), 'b' (bleu)
//      - badge  : { text, class } ou null (ex: { text:'Nouveau', class:'b-gold' })
//      - month  : clé de section ('Février 2026', 'Mars 2026'...)
// ══════════════════════════════

// Palette couleurs dispo pour `color` : 'r', 'g', 'b'
// Palette classes badge : 'b-red', 'b-gold', 'b-blue', 'b-green', 'b-grey'

export const UPDATES = [
  {
    month: 'Février 2026',
    title: '🚀 Test VAACT App',
    body:  'Test ! Vaact App.',
    date:  'Fév 2026',
    color: 'g',
    badge: { text: 'Nouveau', class: 'b-gold' },
  },
  // ← Ajouter les prochaines annonces ici ↑
];

// ── Render toutes les updates groupées par mois ──
export function renderUpdates(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  // Grouper par mois
  const groups = {};
  UPDATES.forEach(u => {
    if (!groups[u.month]) groups[u.month] = [];
    groups[u.month].push(u);
  });

  for (const [month, items] of Object.entries(groups)) {
    // Titre de section
    const sTitle = document.createElement('div');
    sTitle.className = 'stitle';
    sTitle.textContent = month;
    container.appendChild(sTitle);

    // Cards
    items.forEach(u => {
      const card = document.createElement('div');
      card.className = `ucard ${u.color}`;
      const badgeHtml = u.badge
        ? `<span class="badge ${u.badge.class}">${u.badge.text}</span>`
        : '';
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div class="ucard-title">${u.title}</div>
          ${badgeHtml}
        </div>
        <div class="ucard-body">${u.body}</div>
        <div class="ucard-date">${u.date}</div>`;
      container.appendChild(card);
    });
  }
}

export function initUpdates() {
  renderUpdates('updates-container');
}
