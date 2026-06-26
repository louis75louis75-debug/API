

const MiddlewareResetPassword = (req, res, next) => {

    
    if (!req.body) {
        return res.status(400).json({
            error: true,
            message: "[M920] Le corps de la requête est manquant"
        })
    }

    
    const { token, password, confirmPassword } = req.body

    
    if (!token || !password || !confirmPassword) {
        return res.status(400).json({
            error: true,
            message: "[M922] Le jeton, le mot de passe et la confirmation sont obligatoires"
        })
    }

    
    if (password !== confirmPassword) {
        return res.status(409).json({
            error: true,
            message: "[M921] Les mots de passe ne correspondent pas"
        })
    }

   
    if (password.length < 8) {
        return res.status(400).json({
            error: true,
            message: "[M923] Le nouveau mot de passe doit contenir au moins 8 caractères"
        })
    }

    
    next()
}

module.exports = MiddlewareResetPassword