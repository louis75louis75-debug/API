/**
 * ============================================================================
 *  controllers/delete.controllers.js — Supprimer un avis (DELETE /avis/:id)
 * ============================================================================
 *
 *  Ce contrôleur supprime l'avis identifié par son `id` dans l'URL.
 *
 *  ⚠️ Bonne pratique : il vaudrait mieux réutiliser l'instance Prisma partagée
 *     (require('../lib/prisma')) plutôt que d'en créer une nouvelle à chaque
 *     requête (new PrismaClient()), pour ne pas multiplier les connexions à la
 *     base. C'est un point d'amélioration possible.
 *
 *  Documentation officielle :
 *   - Prisma delete : https://www.prisma.io/docs/orm/reference/prisma-client-reference#delete
 *   - req.params    : https://expressjs.com/fr/api.html#req.params
 * ============================================================================
 */

const { PrismaClient } = require("@prisma/client")

module.exports = async (req, res) => {

  try {
      // Création d'une instance Prisma (voir la remarque ci-dessus).
      const prisma = new PrismaClient()

      // Suppression de l'avis dont l'id correspond au paramètre d'URL.
      const deletedReview = await prisma.review.delete({
        where: {
          id: parseInt(req.params.id) // "5" (texte) -> 5 (nombre)
        }
      })

      // On confirme la suppression et on renvoie l'avis supprimé.
      return res.json({ message: "Avis supprimé avec succès", review: deletedReview })
  } catch (error) {
    // Erreur fréquente ici : l'avis n'existe pas (id introuvable).
    console.error("Erreur DELETE /avis/:id :", error)
    return res.status(500).json({ error: "Erreur serveur" })
  }
}
