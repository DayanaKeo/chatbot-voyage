# TravelBot – Chatbot de Voyage

### TravelBot est un assistant de voyage synthétique et structuré, basé sur l’API OpenAI (GPT-4o), capable de :

Générer des itinéraires jour par jour

Fournir des informations clés sur une destination (lieux, transport, météo, culture)

Garder le contexte de la conversation pour des interactions naturelles

## 📂 Structure du projet

chatbot-voyage/
├── backend/
│   ├── index.js           # Serveur Express et intégration OpenAI
│   ├── package.json       # Dépendances back-end
│   └── .env.example       # Exemple de variables d’environnement
└── frontend/
    ├── index.html         # Interface utilisateur HTML
    ├── style.css          # Styles CSS modernes
    └── script.js          # Logique front-end et gestion du chat

## ⚙️ Prérequis

Node.js ≥ 16

Compte OpenAI avec une clé API valide

Git & GitHub pour le versionnement

(Optionnel) nodemon pour rechargement automatique

## 🔧 Installation

#### Cloner le dépôt

git clone https://github.com/DayanaKeo/chatbot-voyage.git
cd chatbot-voyage

#### Configurer le backend

cd backend
cp .env.example .env
npm install

Ouvre backend/.env et renseigne ta clé :

OPENAI_API_KEY=sk-...

Configurer le frontend

cd ../frontend
# Pas de dépendances, fichiers statiques

## 🚀 Lancement en local

#### 1. Démarrer le backend

Dans chatbot-voyage/backend/ :

# Manuel
node index.js

# Avec nodemon (si installé globalement)
nodemon index.js

Le serveur écoute sur : http://localhost:3000

#### 2. Démarrer le frontend

Dans chatbot-voyage/frontend/ :

Ouvre index.html via un serveur local :

VS Code : clic droit → Open with Live Server

#### Serve :

npm install -g serve
serve .

Le front tourne sur un port (ex. 5500 ou 5000) et communique avec l’API.

## 🔄 Versioning Git

Initialiser et pousser sur GitHub :

git init
git add .
git commit -m "Initial commit – TravelBot"
git branch -M main
git remote add origin https://github.com/ton-utilisateur/chatbot-voyage.git
git push -u origin main

À chaque modification :

git add .
git commit -m "💡 Ajout / correction"
git push

Astuce : Pense à ajouter .env à ton .gitignore pour ne pas exposer ta clé API.

##🌐 Déploiement

Backend : Render, Heroku, Railway

Frontend : Vercel, Netlify, GitHub Pages

Note : Adapte l’URL d’API (fetch) si le back est déployé sur un domaine distant.

## ✨ Améliorations possibles

Authentification utilisateur et historique stocké en base

Ajout d’avatars et bulles personnalisées

Intégration de cartes interactives (Google Maps)

Lecture vocale (Text-to-Speech)

Filtres par thème : culture, nature, gastronomie
