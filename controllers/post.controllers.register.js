/**
 * ============================================================================
 *  controllers/post.controllers.register.js — Inscription (POST /register)
 * ============================================================================
 *
 *  Étapes de l'inscription :
 *    1. Hacher le mot de passe (on ne stocke jamais le mot de passe en clair).
 *    2. Créer l'utilisateur en base de données avec Prisma.
 *    3. Envoyer un e-mail de bienvenue (sans bloquer l'inscription si ça échoue).
 *
 *  Les données ont déjà été validées en amont par le middleware
 *  post.middleware.register.js (champs présents, mots de passe identiques...).
 *
 *  Documentation officielle :
 *   - Prisma create   : https://www.prisma.io/docs/orm/reference/prisma-client-reference#create
 *   - Codes d'erreur Prisma (P2002...) :
 *     https://www.prisma.io/docs/orm/reference/error-reference#error-codes
 *   - Code HTTP 201   : https://developer.mozilla.org/fr/docs/Web/HTTP/Status/201
 *   - Code HTTP 409   : https://developer.mozilla.org/fr/docs/Web/HTTP/Status/409
 * ============================================================================
 */

const sendEmail = require('../lib/nodemailer')
const argon2 = require('../lib/argon2')
const prisma = require('../lib/prisma')

module.exports = async (req, res) => {
  // On récupère les champs envoyés par le client.
  const { name, email, password } = req.body

  // Déclarée ici (hors du try) pour rester accessible après le bloc try/catch.
  let user
  try {
    // 1. On hache le mot de passe avant de le stocker.
    const hash = await argon2.hashPassword(password)

    // 2. On crée l'utilisateur en base. On stocke le hash, jamais le mot de passe.
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash
      }
    })
  } catch (error) {
    // Contrainte unique Prisma : l'email est déjà utilisé.
    // Le code "P2002" signifie "violation de contrainte unique".
    if (error.code === 'P2002') {
      return res.status(409).json({
        error: true,
        message: "[C801] Cet email est déjà utilisé"
      })
    }
    // Toute autre erreur → 500 (erreur serveur).
    console.error("Erreur lors de la création de l'utilisateur :", error)
    return res.status(500).json({
      error: true,
      message: "[C802] Erreur lors de la création de l'utilisateur"
    })
  }

  // 3. Envoi de l'e-mail de bienvenue.
  // Cet envoi ne doit pas faire échouer l'inscription : on l'entoure de son
  // propre try/catch et on se contente de logguer l'erreur si elle survient.
  const to = email
  const subject = 'Bienvenue sur notre site !'
  const text = `Bonjour ${name},\n\nMerci de vous être inscrit sur notre site. Votre compte a été créé avec succès.\n\nCordialement,\nL'équipe de notre site.`
  try {
    await sendEmail(to, subject, text)
  } catch (error) {
    console.error('Error sending email:', error)
  }

  // Inscription réussie → code 201 (Created).
  return res.status(201).json({
    error: false,
    message: "Utilisateur créé avec succès"
  })
}
