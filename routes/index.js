/**
 * ============================================================================
 *  routes/index.js — Table de routage de l'API
 * ============================================================================
 *
 *  Ce fichier associe chaque URL (route) + méthode HTTP à la fonction qui
 *  doit la traiter. C'est la "carte" de l'API.
 *
 *  Principe d'une route Express :
 *      router.METHODE('/chemin', [middleware...], controleur)
 *
 *   - METHODE   : le verbe HTTP (get, post, put, delete...).
 *   - /chemin   : l'URL demandée par le client.
 *   - middleware: fonction(s) exécutée(s) AVANT le contrôleur (vérifications,
 *                 authentification, validation des données...). Optionnel.
 *   - controleur: fonction qui produit la réponse finale.
 *
 *  Documentation officielle :
 *   - Routage Express   : https://expressjs.com/fr/guide/routing.html
 *   - express.Router()  : https://expressjs.com/fr/api.html#express.router
 *   - Middlewares       : https://expressjs.com/fr/guide/using-middleware.html
 *   - Méthodes HTTP     : https://developer.mozilla.org/fr/docs/Web/HTTP/Methods
 * ============================================================================
 */

const express = require('express')

// `express.Router()` crée un mini-routeur isolé. On y déclare nos routes,
// puis on l'exporte pour le brancher dans index.js avec `app.use('/', route)`.
const router = express.Router()

// --- Import des contrôleurs (la logique qui répond à chaque route) ---
const getController = require('../controllers/get.controllers')                   // page d'accueil / infos API
const getControllerAvis = require('../controllers/get.controllers.reviews')       // liste des avis
const getControllerAvisId = require('../controllers/get.controllers.reviews.id')  // un avis par son id
const postController = require('../controllers/post.controllers')                 // ajout d'un avis
const postControllerRegister = require('../controllers/post.controllers.register')// inscription
const postControllerLogin = require('../controllers/post.controllers.login')      // connexion
const postControllerForgotPassword = require('../controllers/post.controllers.forgot-password') // mot de passe oublié
const postControllerResetPassword = require('../controllers/post.controllers.reset-password')   // réinitialisation
const putController = require('../controllers/put.controllers')                   // autoriser un avis
const deleteController = require('../controllers/delete.controllers')             // supprimer un avis

// --- Import des middlewares (vérifications faites avant les contrôleurs) ---
const getMiddleware = require('../middleware/get.middleware')
const getMiddlewareReviews = require('../middleware/get.middleware.reviews')       // vérifie le token JWT
const postMiddlewareRegister = require('../middleware/post.middleware.register')   // valide les champs d'inscription
const postMiddlewareLogin = require('../middleware/post.middleware.login')         // valide email + mot de passe

// --- Déclaration des routes ---
// Lecture des données (GET)
router.get('/', getMiddleware, getController)                 // accueil de l'API
router.get('/avis', getMiddlewareReviews, getControllerAvis)  // tous les avis (protégé par JWT)
router.get('/avis/:id', getControllerAvisId)                  // un avis précis (:id = paramètre d'URL)

// Création / modification / suppression d'un avis
router.post('/add/avis', postController)                      // ajouter un avis
router.put('/autoriser/avis/:id', putController)              // autoriser (publier) un avis
router.delete('/avis/:id', deleteController)                  // supprimer un avis

// Authentification
router.post('/register', postMiddlewareRegister, postControllerRegister) // créer un compte
router.post('/login', postMiddlewareLogin, postControllerLogin)          // se connecter
router.post('/change-password', putController)                           // changer de mot de passe
router.post('/forgot-password', postControllerForgotPassword)            // demander une réinitialisation
router.post('/reset-password', postControllerResetPassword)              // réinitialiser le mot de passe

// On exporte le routeur pour qu'index.js puisse l'utiliser.
module.exports = router
