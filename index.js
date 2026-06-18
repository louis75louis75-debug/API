/**
 * ============================================================================
 *  index.js — Point d'entrée de l'API
 * ============================================================================
 *
 *  Ce fichier démarre le serveur HTTP. C'est le tout premier fichier exécuté
 *  par Node.js quand on lance la commande `node index.js`.
 *
 *  On utilise le framework Express, qui simplifie énormément la création
 *  d'un serveur web en Node.js (gestion des routes, du corps des requêtes,
 *  des middlewares, etc.).
 *
 *  Documentation officielle :
 *   - Express        : https://expressjs.com/fr/
 *   - Node.js        : https://nodejs.org/docs/latest/api/
 *   - express.json() : https://expressjs.com/fr/api.html#express.json
 * ============================================================================
 */

// On importe le module Express (installé avec `npm install express`).
const express = require('express')

// On importe notre routeur (le fichier routes/index.js) qui contient
// la liste de toutes les URL (routes) de l'API.
const route = require('./routes/index')

// `express()` crée une nouvelle application Express. C'est l'objet central
// sur lequel on branche les middlewares et les routes.
const app = express()

// --- Liste des fonctionnalités prévues pour l'API (aide-mémoire) ---
// GET    Voir tous les avis
// GET    Voir un avis
// POST   Ajouter un avis
// PUT    Autoriser un avis
// DELETE Supprimer un avis
// POST   Register (créer un compte)
// POST   Login (se connecter)
// POST   Changer de mot de passe
// POST   Oublier mot de passe

// Middleware intégré à Express : il lit le corps (body) des requêtes envoyé
// au format JSON et le rend disponible dans `req.body`.
// Sans cette ligne, `req.body` serait `undefined` pour les requêtes JSON.
// Doc : https://expressjs.com/fr/api.html#express.json
app.use(express.json())

// Middleware intégré : il lit le corps des requêtes envoyé au format
// "formulaire HTML" (application/x-www-form-urlencoded).
// Doc : https://expressjs.com/fr/api.html#express.urlencoded
app.use(express.urlencoded({ extended: true }))

// On branche notre routeur sur la racine '/'. Toutes les routes définies
// dans routes/index.js deviennent ainsi accessibles.
// Doc : https://expressjs.com/fr/guide/routing.html
app.use('/', route)

// Instance de Prisma (notre ORM qui dialogue avec la base de données).
// On l'importe ici pour pouvoir fermer proprement la connexion à l'arrêt.
const prisma = require('./lib/prisma')

// Démarrage du serveur : il écoute les requêtes HTTP sur le port 3000.
// La fonction passée en second argument s'exécute une fois le serveur prêt.
// Doc : https://expressjs.com/fr/api.html#app.listen
const server = app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

// Arrêt propre (graceful shutdown) : avant que le processus ne se termine,
// on ferme la connexion Prisma à la base de données, puis le serveur HTTP.
// Cela évite de laisser des connexions ouvertes inutilement.
const shutdown = async () => {
  await prisma.$disconnect()          // ferme la connexion à la base
  server.close(() => process.exit(0)) // ferme le serveur puis quitte le processus
}

// `process.on(...)` écoute les signaux du système d'exploitation.
//  - SIGINT  : envoyé quand on fait Ctrl+C dans le terminal.
//  - SIGTERM : envoyé par le système pour demander l'arrêt du processus.
// Doc : https://nodejs.org/docs/latest/api/process.html#signal-events
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
