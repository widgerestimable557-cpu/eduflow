# EduFlow

Application EduFlow — PWA convertie en APK via TWA (Trusted Web Activity).

## Structure

```
eduflow/
├── www/
│   ├── index.html          ← Ton app (remplace par ton HTML existant)
│   ├── manifest.json       ← Config PWA
│   ├── sw.js               ← Service Worker (offline)
│   └── .well-known/
│       └── assetlinks.json ← Vérification TWA (à compléter après signature)
├── .github/
│   └── workflows/
│       └── build-apk.yml   ← CI/CD GitHub Actions
├── package.json
└── .gitignore
```

## Comment intégrer ton app existante

1. **Remplace le contenu de `www/index.html`** par ton HTML existant
2. **Ajoute tes fichiers** CSS/JS dans `www/`
3. **Garde** les balises `<link rel="manifest">` et le bloc Service Worker en bas du `<body>`

## Build APK

Push sur `main` → GitHub Actions build automatiquement l'APK.

Télécharge l'APK : **Actions** → dernier build → **Artifacts** → `eduflow-debug`

## URL de l'app

https://script.google.com/macros/s/AKfycbwn_52M5pMF53wvo1NhL1REc7oYFaKCIjZDUNIsClqQYYasyBe9y6-S5pFoygnqtv2y/exec
