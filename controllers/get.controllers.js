/**
 * ============================================================================
 *  controllers/get.controllers.js — Page d'accueil de l'API (GET /)
 * ============================================================================
 *
 *  Ce contrôleur sert d'accueil : il renvoie un message de bienvenue et la
 *  liste des principaux points d'entrée (endpoints) de l'API.
 *
 *  ⚠️ Remarque pédagogique : ce fichier contient aussi du code de DÉMONSTRATION
 *     (hachage/vérification d'un mot de passe, envoi d'e-mail commenté). Dans
 *     un vrai projet, on ne mélangerait pas ces tests avec la page d'accueil.
 *
 *  Documentation officielle :
 *   - res.json() : https://expressjs.com/fr/api.html#res.json
 *   - argon2     : https://github.com/ranisalt/node-argon2
 * ============================================================================
 */

const sendEmail  = require('../lib/nodemailer')

const argon2 = require('../lib/argon2')

module.exports = async (req, res) => {

  // --- Démonstration : préparation d'un e-mail de test ---
  const to = 'a.busi@learni-group.com'
  const subject = 'Test Email'
  const text = `This is a test email with variable.`

  // --- Démonstration : hachage puis vérification d'un mot de passe ---
  const hash = await argon2.hashPassword('myPassword123')

  console.log('Hashed password:', hash)

  // On vérifie que le mot de passe d'origine correspond bien au hash → true.
  const isValid = await argon2.verifyPassword('myPassword123', hash)

  console.log('Password is valid:', isValid)

  // --- Démonstration : envoi d'e-mail (désactivé / mis en commentaire) ---
  // try {
  //   await sendEmail(to, subject, text)
  // } catch (error) {
  //   console.error('Error sending email:', error)
  // }

  // Réponse réelle de la route : message d'accueil + liste des endpoints.
  res.json({
    message: 'Bienvenue sur l\'API de gestion des avis de films !',
    endpoints: {
      get: [
        {endpoint: '/avis', description: 'Récupérer tous les avis de films'},
        {endpoint: '/avis/:id', description: 'Récupérer un avis de film par son ID'}
      ],
      post: [
        {endpoint: '/add/avis', description: 'Ajouter un nouvel avis de film'},
        {endpoint: '/register', description: 'Créer un compte utilisateur'},
      ]}
  })
}
