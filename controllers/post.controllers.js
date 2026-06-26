

const prisma = require('../lib/prisma')

module.exports = async (req, res) => {
  try {
    const { name, date, description, rating } = req.body

    const newReview = await prisma.review.create({
      data: {
        name,
        
        date: date && !isNaN(Date.parse(date)) ? new Date(date) : new Date(),
        description,
        
        rating: parseInt(rating)
      }
    })

    return res.status(201).json({ message: "Avis créé avec succès", review: newReview })
  } catch (error) {
    console.error("Erreur POST /avis : ", error)
    return res.status(500).json({ error: "Erreur serveur lors de la création" })
  }
}
