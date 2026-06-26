

const argon2 = require('../lib/argon2')
const prisma = require('../lib/prisma')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
  
  const { password, token } = req.body

  if (!password || !token) {
    return res.status(400).json({
      error: true,
      message: "Le token et le nouveau mot de passe sont obligatoires."
    })
  }

  let decoded
  
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
    
    const hash = await argon2.hashPassword(password)

    
    await prisma.user.update({
      where: { 
        id: decoded.id 
      },
      data: {
        password: hash
      }
    })

    
    return res.status(200).json({
      error: false,
      message: "Votre mot de passe a été réinitialisé avec succès."
    })

  } catch (error) {
    
    console.error("Erreur lors de la mise à jour du mot de passe :", error)
    return res.status(500).json({
      error: true,
      message: "Une erreur interne est survenue lors de la modification du mot de passe."
    })
  }
}