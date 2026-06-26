module.exports = (req, res, next) => {
  const { name, description, rating } = req.body

  if (!name || !description || rating === undefined) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." })
  }

  const parsedRating = parseInt(rating)
  if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
    return res.status(400).json({ error: "La note doit être un nombre entre 1 et 5." })
  }

  next()
}
