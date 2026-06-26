

const MiddlewareForgot = (req, res, next) => {

    
    if (!req.body) {
        return res.status(400).json({
            error: true,
            message: "[M910] Le corps de la requête est manquant"
        })
    }

    
    const { email } = req.body

    
    if (!email) {
        return res.status(400).json({
            error: true,
            message: "[M902] L'adresse e-mail est obligatoire"
        })
    }

    
    next()
}

module.exports = MiddlewareForgot