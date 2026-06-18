/**
 * ============================================================================
 * controllers/post.controllers.reset-password.js — Réinitialiser le mot de passe (POST /reset-password)
 * ============================================================================
 *
 * Principe attendu :
 * 1. Récupérer le jeton de réinitialisation + le nouveau mot de passe.
 * 2. Vérifier le jeton (jwt.verify) pour retrouver l'utilisateur concerné.
 * 3. Hacher le nouveau mot de passe (argon2) et le mettre à jour en base.
 *
 * Documentation officielle :
 * - JWT verify    : https://github.com/auth0/node-jsonwebtoken
 * - argon2        : https://github.com/ranisalt/node-argon2
 * - Prisma update : https://www.prisma.io/docs/orm/reference/prisma-client-reference#update
 * ============================================================================
 */

const argon2 = require('../lib/argon2')
const prisma = require('../lib/prisma')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
  // 1. Récupérer le jeton de réinitialisation + le nouveau mot de passe.
  const { password, token } = req.body

  if (!password || !token) {
    return res.status(400).json({
      error: true,
      message: "Le token et le nouveau mot de passe sont obligatoires."
    })
  }

  let decoded
  // 2. Vérifier le jeton (jwt.verify) pour retrouver l'utilisateur concerné.
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (jwtError) {
    console.error("Erreur de validation du token :", jwtError)
    return res.status(401).json({
      error: true,
      message: "Le lien de réinitialisation est invalide ou a expiré."
    })
  }

  try {
    // 3. Hacher le nouveau mot de passe (argon2)
    const hash = await argon2.hashPassword(password)

    // Et le mettre à jour en base avec Prisma update.
    await prisma.user.update({
      where: { 
        id: decoded.id 
      },
      data: {
        password: hash
      }
    })

    // Réponse de succès
    return res.status(200).json({
      error: false,
      message: "Votre mot de passe a été réinitialisé avec succès."
    })

  } catch (error) {
    // Erreur serveur s'il y a un problème de base de données
    console.error("Erreur lors de la mise à jour du mot de passe :", error)
    return res.status(500).json({
      error: true,
      message: "Une erreur interne est survenue lors de la modification du mot de passe."
    })
  }
}