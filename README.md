# VAACT App — Structure modulaire

## 📁 Arborescence

```
vaact/
├── index.html          ← Structure HTML uniquement (pages + nav)
├── css/
│   ├── base.css        ← Variables CSS et reset global
│   ├── layout.css      ← Header, pages, bottom nav
│   ├── components.css  ← Cards, badges, boutons, formulaires (réutilisables)
│   └── pages.css       ← Styles spécifiques à chaque page
└── js/
    ├── app.js          ← Point d'entrée — initialise tout
    ├── nav.js          ← Gestion de la navigation par onglets
    ├── profile.js      ← Profil joueur (localStorage)
    ├── decks.js        ← Liste des decks (données + rendu)
    ├── deckViewer.js   ← Chargement et affichage des .ydk
    └── updates.js      ← Annonces et news
```

---

## ➕ Ajouter une annonce (Updates)

Ouvrir `js/updates.js` et ajouter un objet dans `UPDATES` :

```js
{
  month: 'Mars 2026',       // Titre de section
  title: '🏆 Tournoi #4',   // Titre de la card
  body:  'Le prochain tournoi aura lieu le 14 mars !',
  date:  'Mars 2026',
  color: 'r',               // 'r' rouge | 'g' gold | 'b' bleu
  badge: { text: 'Tournoi', class: 'b-red' }, // ou null
},
```

---

## ➕ Ajouter un deck

Ouvrir `js/decks.js` et ajouter dans `DECKS_S1` (ou `DECKS_S2`) :

```js
{ name: 'Yugi Muto', file: '[VAAACT S1] 17 Yugi Muto.ydk', emoji: '🎴', sub: '' },
```

---

## ➕ Ajouter une page / onglet

1. Dans `index.html`, ajouter le `div.page` :
```html
<div class="page" id="page-classement">
  <!-- contenu -->
</div>
```

2. Ajouter le nav item dans la `<nav class="bottom-nav">` :
```html
<div class="nav-item" onclick="nav('classement', this)">
  <span class="ni">🥇</span><span class="nl">Classement</span>
</div>
```

3. Créer `js/classement.js` avec une fonction `initClassement()` et l'importer dans `app.js`.

---

## ➕ Ajouter un champ au profil

1. Ajouter l'input dans `index.html` (section profil-edit)
2. Dans `js/profile.js` :
   - Ajouter le champ dans `getDefaultProfile()`
   - Lire + sauvegarder dans `saveProfile()`
   - Afficher dans `renderProfile()`

---

## 🎨 Modifier les couleurs

Tout est dans les variables CSS de `css/base.css` :

```css
--red:        #8b0000;   /* Rouge principal */
--gold:       #c9a84c;   /* Or */
--gold-light: #f0d080;   /* Or clair (titres) */
--dark:       #0d0d0d;   /* Fond principal */
```
