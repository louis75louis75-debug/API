/**
 * ============================================================================
 *  controllers/post.controllers.login.js — Connexion d'un utilisateur (POST /login)
 * ============================================================================
 *
 *  Étapes de la connexion :
 *    1. Chercher l'utilisateur en base à partir de son email.
 *    2. Vérifier que le mot de passe saisi correspond au hash stocké (argon2).
 *    3. Si tout est correct, générer un jeton JWT et le renvoyer au client.
 *
 *  Le client devra ensuite renvoyer ce jeton à chaque requête protégée
 *  (voir middleware/get.middleware.reviews.js).
 *
 *  Documentation officielle :
 *   - Prisma findUnique : https://www.prisma.io/docs/orm/reference/prisma-client-reference#findunique
 *   - argon2 verify     : https://github.com/ranisalt/node-argon2
 *   - JWT               : https://github.com/auth0/node-jsonwebtoken
 *   - Code HTTP 401     : https://developer.mozilla.org/fr/docs/Web/HTTP/Status/401
 * ============================================================================
 */

const argon2 = require('../lib/argon2')
const prisma = require('../lib/prisma')
const { signJwt } = require('../lib/jwt')

// Un contrôleur Express est une fonction (req, res). Ici elle est `async`
// car elle attend (await) des opérations sur la base et le hachage.
module.exports = async (req, res) => {
  // On récupère email et mot de passe envoyés par le client (req.body).
  const { email, password } = req.body

  try {
    // 1. On cherche l'utilisateur dont l'email correspond.
    //    `findUnique` retourne l'utilisateur, ou `null` s'il n'existe pas.
    const user = await prisma.user.findUnique({
      where: { email }
    })

    // Même message pour un email inconnu ou un mauvais mot de passe :
    // on évite ainsi de révéler si l'email existe en base (bonne pratique de sécurité).
    if (!user) {
      return res.status(401).json({
        error: true,
        message: "[C810] Email ou mot de passe incorrect"
      })
    }

    // 2. On compare le mot de passe saisi avec le hash stocké en base.
    const isValid = await argon2.verifyPassword(password, user.password)
    if (!isValid) {
      return res.status(401).json({
        error: true,
        message: "[C810] Email ou mot de passe incorrect"
      })
    }

    // 3. Identifiants corrects → on génère le jeton JWT.
    //    On y met l'email (pas le mot de passe, le payload n'est pas chiffré !).
    const token = signJwt({ email: user.email })

    // On renvoie le jeton au client (code 200 = OK).
    return res.status(200).json({
      error: false,
      message: "Connexion réussie",
      jwt: token
    })
  } catch (error) {
    // En cas d'erreur imprévue (base injoignable...), on renvoie une erreur 500.
    console.error('Erreur lors de la connexion :', error)
    return res.status(500).json({
      error: true,
      message: "[C811] Erreur lors de la connexion"
    })
  }
}
