# ChatBot

J'utilise l'API Groq

---

## Structure du projet

```
chatbot/
├── .github/
│   └── workflows/
│       └── deploy.yml        ← GitHub Actions (déploiement auto)
├── src/
│   ├── api/
│   │   └── groqApi.js      ← Communication avec l'API groq
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

## Note de sécurité sur la clé API

L'API Anthropic est appelée **côté client** (dans le navigateur).  
C'est acceptable pour un projet personnel ou une démo.

Pour une app publique/production, tu devrais créer un **backend** (Express, FastAPI…)
qui garde la clé secrète et sert de proxy entre le navigateur et l'API Anthropic.

---

## Développement local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:5173](http://localhost:5173)
