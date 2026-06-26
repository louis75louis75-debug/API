const prisma = require('../lib/prisma')

module.exports = async (req, res) => {
  try {
    const { name, date, description, rating } = req.body
    
    const updatedReview = await prisma.review.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        date: date ? new Date(date) : undefined,
        description,
        rating
      }
    })
    
    return res.json({ message: "Avis modifié", review: updatedReview })
  } catch (error) {
    console.error("Erreur PUT : ", error)
    return res.status(500).json({ error: "Erreur serveur" })
  }
}
