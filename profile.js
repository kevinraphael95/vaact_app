// ══════════════════════════════
// profile.js — Gestion du profil joueur
// Stockage : localStorage (clé DB_KEY)
// Pour ajouter un champ : 1) l'ajouter dans getProfile() defaults
//   2) ajouter l'input dans index.html  3) l'intégrer dans saveProfile()
// ══════════════════════════════

const DB_KEY = 'vaact_profile';

// Valeurs par défaut du profil
function getDefaultProfile() {
  return {
    name: 'Duelliste',
    deck: 'Non défini',
    wins: 0,
    losses: 0,
    seasons: 0,
    // ← Ajouter de nouveaux champs ici
  };
}

export function getProfile() {
  const raw = localStorage.getItem(DB_KEY);
  return raw ? { ...getDefaultProfile(), ...JSON.parse(raw) } : getDefaultProfile();
}

export function saveProfile() {
  const p = {
    name:    document.getElementById('edit-name').value.trim()    || 'Duelliste',
    deck:    document.getElementById('edit-deck').value.trim()    || 'Non défini',
    wins:    parseInt(document.getElementById('edit-wins').value)    || 0,
    losses:  parseInt(document.getElementById('edit-losses').value)  || 0,
    seasons: parseInt(document.getElementById('edit-seasons').value) || 0,
    // ← Ajouter ici les nouveaux champs à sauvegarder
  };
  localStorage.setItem(DB_KEY, JSON.stringify(p));
  renderProfile(p);
  toggleEdit();
}

export function renderProfile(p) {
  document.getElementById('display-name').textContent  = p.name;
  document.getElementById('display-deck').textContent  = p.deck;
  document.getElementById('stat-wins').textContent     = p.wins;
  document.getElementById('stat-losses').textContent   = p.losses;
  document.getElementById('stat-seasons').textContent  = p.seasons;

  const total = p.wins + p.losses;
  document.getElementById('stat-winrate').textContent =
    total > 0 ? Math.round(p.wins / total * 100) + '%' : '—';

  // Calcul du rang automatique selon les stats
  // ← Modifier ici pour changer les seuils de rang
  const wr = total > 0 ? p.wins / total : 0;
  let rang = 'Apprenti Duelliste';
  if      (p.wins >= 20 && wr >= 0.7) rang = 'Maître Duelliste';
  else if (p.wins >= 10 && wr >= 0.6) rang = 'Duelliste Expert';
  else if (p.wins >= 5)               rang = 'Duelliste Confirmé';

  document.getElementById('display-title').textContent = rang;
  document.getElementById('display-badge').textContent = `${p.wins}V - ${p.losses}D`;
}

export function toggleEdit() {
  const view = document.getElementById('profile-view');
  const edit = document.getElementById('profile-edit');
  const p = getProfile();
  const isEditing = edit.style.display !== 'none';

  if (!isEditing) {
    // Pré-remplir les inputs
    document.getElementById('edit-name').value    = p.name;
    document.getElementById('edit-deck').value    = p.deck;
    document.getElementById('edit-wins').value    = p.wins;
    document.getElementById('edit-losses').value  = p.losses;
    document.getElementById('edit-seasons').value = p.seasons;
    view.style.display = 'none';
    edit.style.display = 'block';
  } else {
    view.style.display = 'block';
    edit.style.display = 'none';
  }
}

export function resetProfile() {
  if (confirm('Réinitialiser le profil ?')) {
    localStorage.removeItem(DB_KEY);
    renderProfile(getDefaultProfile());
  }
}

export function initProfile() {
  renderProfile(getProfile());
}

// Exposer globalement pour les onclick inline
window.toggleEdit   = toggleEdit;
window.saveProfile  = saveProfile;
window.resetProfile = resetProfile;
