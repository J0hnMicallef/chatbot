# HaikuBot

Chatbot React propulsé par Claude Haiku (Anthropic).

---

## Structure du projet

```
haikubot/
├── .github/
│   └── workflows/
│       └── deploy.yml        ← GitHub Actions (déploiement auto)
├── src/
│   ├── api/
│   │   └── claudeApi.js      ← Communication avec l'API Claude Haiku
│   ├── components/
│   │   ├── ChatWindow.jsx    ← Fenêtre principale du chat
│   │   ├── InputBar.jsx      ← Barre de saisie + bouton
│   │   ├── Message.jsx       ← Bulle de message (user/bot)
│   │   └── TypingIndicator.jsx ← Animation "..." pendant le chargement
│   ├── styles/
│   │   └── chat.css          ← Tous les styles CSS
│   ├── App.jsx               ← Composant racine
│   └── main.jsx              ← Point d'entrée React
├── index.html
├── package.json
├── vite.config.js            
└── .gitignore
```

---

## 🚀 Déploiement sur GitHub Pages — étape par étape

### 1. Crée ton dépôt GitHub

Va sur [github.com/new](https://github.com/new) et crée un dépôt public.  
Exemple : `haikubot`

### 2. Modifie `vite.config.js`

Remplace `"/haikubot/"` par le **nom exact de ton dépôt** :

```js
base: "/ton-nom-de-repo/",
```

### 3. Initialise Git et pousse le code

```bash
cd haikubot
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/TON_USER/TON_REPO.git
git push -u origin main
```

### 4. Active GitHub Pages

Dans ton dépôt GitHub :
- Va dans **Settings → Pages**
- Source : **GitHub Actions**
- Sauvegarde

### 5. C'est tout ! 🎉

À chaque `git push` sur `main`, GitHub Actions va :
1. Installer les dépendances (`npm ci`)
2. Builder le projet (`npm run build`)
3. Déployer le dossier `dist/` sur GitHub Pages

Ton app sera disponible à :
```
https://TON_USER.github.io/TON_REPO/
```

---

## ⚠️ Note de sécurité sur la clé API

L'API Anthropic est appelée **côté client** (dans le navigateur).  
C'est acceptable pour un projet personnel ou une démo.

Pour une app publique/production, tu devrais créer un **backend** (Express, FastAPI…)
qui garde la clé secrète et sert de proxy entre le navigateur et l'API Anthropic.

---

## 💻 Développement local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:5173](http://localhost:5173)
