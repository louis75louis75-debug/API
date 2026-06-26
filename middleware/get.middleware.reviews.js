

const jwt = require('../lib/jwt')

module.exports = (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1]


    if (!token) {
        return res.status(401).json({
            error: true,
            message: "[M811] Token d'authentification manquant"
        })
    }

    try {
        
        const decoded = jwt.verifyJwt(token)

        
        if (!decoded) {
            return res.status(401).json({
                error: true,
                message: "[M812] Token d'authentification invalide"
            })
        }

        
        req.user = decoded
    } catch (error) {
        
        return res.status(401).json({
            error: true,
            message: "[M812] Token d'authentification invalide"
        })
    }

    
    next()
}
