

const MiddlewareLogin = (req, res, next) => {

    
    if (!req.body) {
        return res.status(400).json({
            error: true,
            message: "[M810] Email et mot de passe sont obligatoires"
        })
    }

    
    const { email, password } = req.body

    
    if (!email || !password) {
        return res.status(400).json({
            error: true,
            message: "[M810] Email et mot de passe sont obligatoires"
        })
    }

    
    next()
}

module.exports = MiddlewareLogin
