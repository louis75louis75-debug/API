

const argon2 = require('../lib/argon2')
const prisma = require('../lib/prisma')
const { signJwt } = require('../lib/jwt')


module.exports = async (req, res) => {
  
  const { email, password } = req.body

  try {
    
    const user = await prisma.user.findUnique({
      where: { email }
    })

    
    if (!user) {
      return res.status(401).json({
        error: true,
        message: "[C810] Email ou mot de passe incorrect"
      })
    }

    
    const isValid = await argon2.verifyPassword(password, user.password)
    if (!isValid) {
      return res.status(401).json({
        error: true,
        message: "[C810] Email ou mot de passe incorrect"
      })
    }

    
    const token = signJwt({ email: user.email })

    
    return res.status(200).json({
      error: false,
      message: "Connexion réussie",
      jwt: token
    })
  } catch (error) {
    
    console.error('Erreur lors de la connexion :', error)
    return res.status(500).json({
      error: true,
      message: "[C811] Erreur lors de la connexion"
    })
  }
}
