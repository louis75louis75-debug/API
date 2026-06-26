const MiddlewareDeleteReview = (req, res, next) => {
  const { id } = req.params

  
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({
      error: true,
      message: "Un identifiant d'avis valide (nombre) est obligatoire dans l'URL."
    })
  }

  
  next()
}

module.exports = MiddlewareDeleteReview