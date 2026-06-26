

const { PrismaClient } = require("@prisma/client")

module.exports = async (req, res) => {

  try {
      
      const prisma = new PrismaClient()

      
      const deletedReview = await prisma.review.delete({
        where: {
          id: parseInt(req.params.id) 
        }
      })

      
      return res.json({ message: "Avis supprimé avec succès", review: deletedReview })
  } catch (error) {
   
    console.error("Erreur DELETE /avis/:id :", error)
    return res.status(500).json({ error: "Erreur serveur" })
  }
}
