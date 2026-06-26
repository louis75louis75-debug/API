

const MiddlewareRegister = (req, res, next) => {

    
    if (!req.body) {
        return res.status(400).json({
            error: true,
            message: "[M810] Email et mot de passe sont obligatoires"
        })
    }

    
    const { name, email, password, confirmPassword } = req.body

    
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
            error: true,
            message: "[M802] Tous les champs sont obligatoires"
        })
    }

    
    if (password !== confirmPassword) {
        return res.status(409).json({
            error: true,
            message: "[M801] Les mots de passe ne correspondent pas"
        })
    }

    
    if (password.length < 8) {
        return res.status(400).json({
            error: true,
            message: "[M803] Le mot de passe doit contenir au moins 8 caractères"
        })
    }

    
    next()
}

module.exports = MiddlewareRegister
