

const prisma = require("../lib/prisma")

module.exports = async (req, res) => {
  try {
    
    const reviews = await prisma.review.findUnique({
      where: {
        id: parseInt(req.params.id) 
      }
    })

    
    return res.json(reviews)
  } catch (error) {
    console.error("Erreur GET /avis :", error)
    return res.status(500).json({ error: "Erreur serveur" })
  }
}
