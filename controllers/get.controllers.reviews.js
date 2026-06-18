/**
 * ============================================================================
 *  controllers/get.controllers.reviews.js — Liste des avis (GET /avis)
 * ============================================================================
 *
 *  Ce contrôleur renvoie TOUS les avis stockés en base de données.
 *  Il est protégé par le middleware get.middleware.reviews.js (JWT requis).
 *
 *  Documentation officielle :
 *   - Prisma findMany : https://www.prisma.io/docs/orm/reference/prisma-client-reference#findmany
 *   - res.json()      : https://expressjs.com/fr/api.html#res.json
 * ============================================================================
 */

const prisma = require("../lib/prisma")

module.exports = async (req, res) => {
  try {
    // `findMany()` sans argument récupère toutes les lignes de la table "review".
    const reviews = await prisma.review.findMany()

    // res.json() envoie le tableau d'avis au format JSON (code 200 par défaut).
    return res.json(reviews)
  } catch (error) {
    // En cas de problème (base injoignable...), on renvoie une erreur 500.
    console.error("Erreur GET /avis :", error)
    return res.status(500).json({ error: "Erreur serveur" })
  }
}
