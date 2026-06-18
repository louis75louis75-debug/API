/**
 * ============================================================================
 *  controllers/put.controllers.js — Autoriser un avis (PUT /autoriser/avis/:id)
 * ============================================================================
 *
 *  ⚠️ Ébauche (à compléter en TP) : ce contrôleur devra "autoriser" (publier)
 *     un avis, par exemple en passant un champ booléen `autorise` à `true`.
 *
 *  Rappel : la méthode HTTP PUT sert à modifier une ressource existante.
 *
 *  Piste pour compléter :
 *      prisma.review.update({
 *        where: { id: parseInt(req.params.id) },
 *        data:  { autorise: true }
 *      })
 *
 *  Documentation officielle :
 *   - Méthode PUT   : https://developer.mozilla.org/fr/docs/Web/HTTP/Methods/PUT
 *   - Prisma update : https://www.prisma.io/docs/orm/reference/prisma-client-reference#update
 * ============================================================================
 */

module.exports = (req, res) => {
  // TODO : récupérer req.params.id puis mettre l'avis à jour avec Prisma.

  // Réponse temporaire.
  res.send('/autoriser/avis/:id')
}
