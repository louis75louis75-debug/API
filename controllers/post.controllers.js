/**
 * ============================================================================
 *  controllers/post.controllers.js — Ajouter un avis (POST /add/avis)
 * ============================================================================
 *
 *  ⚠️ Ébauche (à compléter en TP) : pour l'instant, ce contrôleur se contente
 *     de répondre "/add/avis" sans enregistrer l'avis en base de données.
 *
 *  Données attendues dans le corps de la requête (req.body) :
 *   - author      : identité de l'auteur de l'avis
 *   - date        : date de création
 *   - description : le texte de l'avis
 *   - rating      : la note attribuée
 *
 *  Piste pour compléter : valider ces champs, puis appeler
 *  `prisma.review.create({ data: { ... } })` pour enregistrer l'avis.
 *
 *  Documentation officielle :
 *   - req.body      : https://expressjs.com/fr/api.html#req.body
 *   - Prisma create : https://www.prisma.io/docs/orm/reference/prisma-client-reference#create
 * ============================================================================
 */

module.exports = (req, res) => {
  // On extrait les champs envoyés par le client (non encore utilisés ici).
  const { author, date, description, rating } = req.body

  // TODO : valider les données puis enregistrer l'avis avec Prisma.

  // Réponse temporaire (l'avis n'est pas encore enregistré).
  res.send('/add/avis')
}
