

const sendEmail = require('../lib/nodemailer')
const argon2 = require('../lib/argon2')
const prisma = require('../lib/prisma')

module.exports = async (req, res) => {
  
  const { name, email, password } = req.body

  
  let user
  try {
    
    const hash = await argon2.hashPassword(password)

    
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash
      }
    })
  } catch (error) {
    
    if (error.code === 'P2002') {
      return res.status(409).json({
        error: true,
        message: "[C801] Cet email est déjà utilisé"
      })
    }
    
    console.error("Erreur lors de la création de l'utilisateur :", error)
    return res.status(500).json({
      error: true,
      message: "[C802] Erreur lors de la création de l'utilisateur"
    })
  }

  
  const to = email
  const subject = 'Bienvenue sur notre site !'
  const text = `Bonjour ${name},\n\nMerci de vous être inscrit sur notre site. Votre compte a été créé avec succès.\n\nCordialement,\nL'équipe de notre site.`
  try {
    await sendEmail(to, subject, text)
  } catch (error) {
    console.error('Error sending email:', error)
  }

  
  return res.status(201).json({
    error: false,
    message: "Utilisateur créé avec succès"
  })
}
