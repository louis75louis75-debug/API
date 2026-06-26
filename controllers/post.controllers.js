

const prisma = require('../lib/prisma')

module.exports = async (req, res) => {
  try {
    const { name, date, description, rating } = req.body

    const newReview = await prisma.review.create({
      data: {
        name,
        // Si la date est valide, on l'utilise, sinon on met la date du jour
        date: date && !isNaN(Date.parse(date)) ? new Date(date) : new Date(),
        description,
        // Force la conversion en entier au cas où un texte "5" est envoyé
        rating: parseInt(rating)
      }
    })

    return res.status(201).json({ message: "Avis créé avec succès", review: newReview })
  } catch (error) {
    console.error("Erreur POST /avis : ", error)
    return res.status(500).json({ error: "Erreur serveur lors de la création" })
  }
}
