// ══════════════════════════════
// decks.js — Données et liste des decks VAACT
//
// COMMENT AJOUTER UN DECK :
//   1. Ajouter un objet dans DECKS_S1 ou DECKS_S2 (ou créer DECKS_S3, etc.)
//   2. Format : { name, file, emoji, sub }
//      - name  : nom affiché
//      - file  : nom exact du fichier .ydk sur GitHub
//      - emoji : icône du deck
//      - sub   : tag optionnel ('Débutant', 'EX', ...) — laisser '' si aucun
//   3. Ajouter le conteneur dans index.html si nouvelle saison :
//      <div class="stitle">Saison 3</div>
//      <div id="deck-list-s3"></div>
//   4. Appeler renderDeckList(DECKS_S3, 'deck-list-s3') dans initDecks()
// ══════════════════════════════

import { openDeck } from './deckViewer.js';

// ── Config GitHub ──
// Modifier ces URLs si le repo change
export const PICS_BASE = 'https://raw.githubusercontent.com/Mazorn/VAACT-Very-Accurate-Anime-Character-Tournament-/main/pics/';
export const YDK_BASE  = 'https://raw.githubusercontent.com/Mazorn/VAACT-Very-Accurate-Anime-Character-Tournament-Deck/main/';

// ════════════════════════════
// SAISON 1 — Ajouter / retirer des decks ici
// ════════════════════════════
export const DECKS_S1 = [
  { name: 'Atem',                    file: '[VAAACT S1] 1 Atem.ydk',                     emoji: '👑', sub: '' },
  { name: 'Atem (Débutant)',          file: '[VAAACT S1] 1.5 Atem Débutant.ydk',          emoji: '👑', sub: 'Débutant' },
  { name: 'Seto Kaiba',              file: '[VAAACT S1] 2 Seto Kaiba.ydk',               emoji: '🐉', sub: '' },
  { name: 'Joey Wheeler',            file: '[VAAACT S1] 3 Joey Wheeler.ydk',             emoji: '🎲', sub: '' },
  { name: 'Joey Wheeler (Débutant)', file: '[VAAACT S1] 3.5 Joey Wheeler Débutant.ydk',  emoji: '🎲', sub: 'Débutant' },
  { name: 'Jaden Yuki',              file: '[VAAACT S1] 4 Jaden Yukis.ydk',              emoji: '🔥', sub: '' },
  { name: 'Jaden Yuki (Débutant)',   file: '[VAAACT S1] 4.5 Jaden Yuki Débutant.ydk',   emoji: '🔥', sub: 'Débutant' },
  { name: 'Chad Princeton',          file: '[VAAACT S1] 5 Chad Princeton.ydk',           emoji: '🖤', sub: '' },
  { name: 'Chad Princeton (Déb.)',   file: '[VAAACT S1] 5.5 Chad Princeton Débutant.ydk',emoji: '🖤', sub: 'Débutant' },
  { name: 'Zane Truesdale',          file: '[VAAACT S1] 6 Zane Truesdale.ydk',           emoji: '⚡', sub: '' },
  { name: 'Aster Phoenix',           file: '[VAAACT S1] 7 Aster Phoenix.ydk',            emoji: '🌟', sub: '' },
  { name: 'Aster Phoenix (Déb.)',    file: '[VAAACT S1] 7.5 Aster Phoenix Débutant.ydk', emoji: '🌟', sub: 'Débutant' },
  { name: 'Yusei Fudo',              file: '[VAAACT S1] 8 Yusei Fudo.ydk',               emoji: '🏍️', sub: '' },
  { name: 'Yusei Fudo (Débutant)',   file: '[VAAACT S1] 8.5 Yusei Fudo Débutant.ydk',   emoji: '🏍️', sub: 'Débutant' },
  { name: 'Jack Atlas',              file: '[VAAACT S1] 9 Jack Atlas.ydk',               emoji: '♠️', sub: '' },
  { name: 'Yuma Tsukumo',            file: '[VAAACT S1] 10 Yuma Tsukumo.ydk',            emoji: '🔢', sub: '' },
  { name: 'Yuma Tsukumo (Déb.)',     file: '[VAAACT S1] 10.5 Yuma Tsukumo Débutant.ydk',emoji: '🔢', sub: 'Débutant' },
  { name: 'Kite Tenjo',              file: '[VAAACT S1] 11 Kite Tenjo.ydk',              emoji: '🌌', sub: '' },
  { name: 'Shark',                   file: '[VAAACT S1] 12 Shark.ydk',                   emoji: '🦈', sub: '' },
  { name: 'Yuya Sakaki',             file: '[VAAACT S1] 13 Yuya Sakaki.ydk',             emoji: '🎪', sub: '' },
  { name: 'Reiji Akaba',             file: '[VAAACT S1] 14 Reiji Akaba.ydk',             emoji: '🃏', sub: '' },
  { name: 'Playmaker',               file: '[VAAACT S1] 15 Playmaker.ydk',               emoji: '💻', sub: '' },
  { name: 'Revolver',                file: '[VAAACT S1] 16 Revolver.ydk',                emoji: '🔫', sub: '' },
];

// ════════════════════════════
// SAISON 2 — Vide pour l'instant
// ════════════════════════════
export const DECKS_S2 = [
  // { name: 'Personnage', file: '[VAAACT S2] X Nom.ydk', emoji: '🔥', sub: '' },
];

// ── Render une liste de decks dans un conteneur ──
export function renderDeckList(decks, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  if (!decks.length) {
    container.innerHTML = '<div class="dv-empty">Aucun deck pour cette saison.</div>';
    return;
  }

  decks.forEach(deck => {
    const row = document.createElement('div');
    row.className = 'deck-row';
    row.style.cursor = 'pointer';
    const badge = deck.sub
      ? `<span class="badge b-grey" style="font-size:8px;">${deck.sub}</span>`
      : '';
    row.innerHTML = `
      <div class="deck-ico r" style="font-size:22px;">${deck.emoji}</div>
      <div style="flex:1;">
        <div class="deck-name">${deck.name}</div>
        <div class="deck-meta">${badge}</div>
      </div>
      <div class="deck-arrow">›</div>`;
    row.onclick = () => openDeck(deck);
    container.appendChild(row);
  });
}

// ── Init ──
export function initDecks() {
  renderDeckList(DECKS_S1, 'deck-list-s1');
  renderDeckList(DECKS_S2, 'deck-list-s2');
  // ← Ajouter ici si saison 3, 4...
}
