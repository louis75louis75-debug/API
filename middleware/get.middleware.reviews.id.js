const MiddlewareReviewId = (req, res, next) => {
  const { id } = req.params

  
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({
      error: true,
      message: "L'identifiant de l'avis doit être un nombre valide."
    })
  }

  
  next()
}

module.exports = MiddlewareReviewId