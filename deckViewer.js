// ══════════════════════════════
// deckViewer.js — Chargement et affichage des fichiers .ydk
// ══════════════════════════════

import { PICS_BASE, YDK_BASE } from './decks.js';

// ── Ouvre la page viewer pour un deck donné ──
export async function openDeck(deck) {
  // Naviguer vers la page viewer
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-deck-view').classList.add('active');

  document.getElementById('dv-title').textContent = deck.name;
  document.getElementById('dv-count').textContent = 'Chargement...';
  document.getElementById('dv-main').innerHTML  = '<div class="dv-empty">Chargement...</div>';
  document.getElementById('dv-extra').innerHTML = '';
  document.getElementById('dv-side').innerHTML  = '';

  try {
    const url = YDK_BASE + encodeURIComponent(deck.file);
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Fichier introuvable');
    const text = await resp.text();
    parseAndRenderYdk(text, deck.name);
  } catch(e) {
    document.getElementById('dv-main').innerHTML =
      `<div class="dv-empty" style="color:#ff6060;">❌ Impossible de charger le deck.<br>Vérifie ta connexion.</div>`;
    document.getElementById('dv-count').textContent = 'Erreur';
  }
}

// ── Parse un fichier .ydk et affiche les sections ──
function parseAndRenderYdk(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim());
  let section = 'main';
  const main = [], extra = [], side = [];

  for (const line of lines) {
    if (line === '#main')  { section = 'main';  continue; }
    if (line === '#extra') { section = 'extra'; continue; }
    if (line === '!side')  { section = 'side';  continue; }
    if (!line || line.startsWith('#') || line.startsWith('!')) continue;
    const id = parseInt(line);
    if (!isNaN(id)) {
      if      (section === 'main')  main.push(id);
      else if (section === 'extra') extra.push(id);
      else if (section === 'side')  side.push(id);
    }
  }

  document.getElementById('dv-count').textContent =
    `${main.length} main · ${extra.length} extra · ${side.length} side`;

  renderCardGrid('dv-main',  groupCards(main));
  renderCardGrid('dv-extra', groupCards(extra));
  renderCardGrid('dv-side',  groupCards(side));
}

// ── Regroupe les IDs dupliqués (ex: 3x même carte) ──
function groupCards(ids) {
  const map = {};
  ids.forEach(id => { map[id] = (map[id] || 0) + 1; });
  return Object.entries(map).map(([id, qty]) => ({ id: parseInt(id), qty }));
}

// ── Affiche la grille de cartes avec images ──
function renderCardGrid(containerId, cards) {
  const el = document.getElementById(containerId);
  if (!cards.length) { el.innerHTML = '<div class="dv-empty">—</div>'; return; }
  el.innerHTML = '';

  cards.forEach(({ id, qty }) => {
    const thumb = document.createElement('div');
    thumb.className = 'card-thumb';
    thumb.title = `ID: ${id}`;

    const img = document.createElement('img');
    img.src = PICS_BASE + id + '.jpg';
    img.alt = String(id);
    img.loading = 'lazy'; // Chargement différé pour perf
    img.onerror = function() {
      // Fallback si l'image est introuvable
      thumb.innerHTML = `<div class="card-fallback">${id}</div>`;
      if (qty > 1) thumb.innerHTML += `<div class="card-qty">x${qty}</div>`;
    };
    thumb.appendChild(img);

    if (qty > 1) {
      const qtyEl = document.createElement('div');
      qtyEl.className = 'card-qty';
      qtyEl.textContent = 'x' + qty;
      thumb.appendChild(qtyEl);
    }

    el.appendChild(thumb);
  });
}

// ── Retour vers la liste des decks ──
export function backToDecks() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-decks').classList.add('active');
}

// Exposer globalement pour onclick inline
window.backToDecks = backToDecks;
