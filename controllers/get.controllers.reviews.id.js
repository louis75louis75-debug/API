/**
 * ============================================================================
 *  controllers/get.controllers.reviews.id.js — Un avis précis (GET /avis/:id)
 * ============================================================================
 *
 *  Ce contrôleur renvoie UN seul avis, identifié par son `id` présent dans
 *  l'URL. Dans la route '/avis/:id', `:id` est un "paramètre d'URL" qu'on
 *  récupère via `req.params.id`.
 *
 *  ⚠️ `req.params.id` est toujours une chaîne de caractères ("5"). Comme l'id
 *  en base est un nombre, on le convertit avec `parseInt(...)`.
 *
 *  Documentation officielle :
 *   - Paramètres d'URL : https://expressjs.com/fr/api.html#req.params
 *   - Prisma findUnique: https://www.prisma.io/docs/orm/reference/prisma-client-reference#findunique
 *   - parseInt         : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/parseInt
 * ============================================================================
 */

const prisma = require("../lib/prisma")

module.exports = async (req, res) => {
  try {
    // On recherche l'avis dont l'id correspond au paramètre d'URL.
    const reviews = await prisma.review.findUnique({
      where: {
        id: parseInt(req.params.id) // conversion "5" (texte) -> 5 (nombre)
      }
    })

    // On renvoie l'avis trouvé (ou null si aucun avis n'a cet id).
    return res.json(reviews)
  } catch (error) {
    console.error("Erreur GET /avis :", error)
    return res.status(500).json({ error: "Erreur serveur" })
  }
}
