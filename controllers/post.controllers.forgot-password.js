const prisma = require('../lib/prisma')
const sendEmail = require('../lib/nodemailer')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
  const { email } = req.body
  const msgSuccess = "Si ce compte existe, un e-mail de réinitialisation a été envoyé."

  if (!email) return res.status(400).json({ error: true, message: "L'e-mail est obligatoire." })

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(200).json({ error: false, message: msgSuccess })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' })
    const link = `http://localhost:3000/reset-password?token=${token}`
    
    await sendEmail(
      user.email, 
      "Réinitialisation de votre mot de passe", 
      `Cliquez ici pour réinitialiser (15 min) : ${link}`
    )

    return res.status(200).json({ error: false, message: msgSuccess })
  } catch (error) {
    console.error("Erreur forgot-password :", error)
    return res.status(500).json({ error: true, message: "Erreur serveur" })
  }
}