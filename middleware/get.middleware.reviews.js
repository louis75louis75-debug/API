/**
 * ============================================================================
 *  middleware/get.middleware.reviews.js — Authentification par JWT
 * ============================================================================
 *
 *  Un middleware est une fonction qui s'exécute AVANT le contrôleur. Il reçoit
 *  trois paramètres : (req, res, next).
 *   - req  : la requête entrante (en-têtes, body, paramètres...).
 *   - res  : la réponse qu'on peut renvoyer au client.
 *   - next : fonction à appeler pour "passer à la suite" (au contrôleur).
 *
 *  Ce middleware protège une route : il vérifie que la requête contient un
 *  jeton JWT valide. Sans jeton valide, on bloque l'accès (erreur 401).
 *
 *  Le jeton est attendu dans l'en-tête HTTP "Authorization", au format :
 *      Authorization: Bearer <le_jeton_jwt>
 *
 *  Documentation officielle :
 *   - Middlewares Express : https://expressjs.com/fr/guide/using-middleware.html
 *   - En-tête Authorization :
 *     https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Authorization
 *   - Code HTTP 401       : https://developer.mozilla.org/fr/docs/Web/HTTP/Status/401
 * ============================================================================
 */

const jwt = require('../lib/jwt')

module.exports = (req, res, next) => {

    // On récupère l'en-tête "Authorization", qui ressemble à "Bearer xxxxx".
    // `.split(' ')[1]` coupe la chaîne sur l'espace et garde la 2e partie (le jeton).
    // Le `?.` (optional chaining) évite une erreur si l'en-tête est absent.
    const token = req.headers.authorization?.split(' ')[1]

    // Pas de jeton fourni → accès refusé.
    if (!token) {
        return res.status(401).json({
            error: true,
            message: "[M811] Token d'authentification manquant"
        })
    }

    try {
        // On vérifie et décode le jeton. `verifyJwt` renvoie le payload si le
        // jeton est valide, ou `null` s'il est invalide/expiré.
        const decoded = jwt.verifyJwt(token)

        // Si le décodage a échoué (decoded === null), on refuse l'accès.
        // ⚠️ Ce contrôle est important : comme verifyJwt renvoie `null` au lieu
        //    de lever une erreur, le bloc `catch` ne suffirait pas à lui seul.
        if (!decoded) {
            return res.status(401).json({
                error: true,
                message: "[M812] Token d'authentification invalide"
            })
        }

        // On attache les infos de l'utilisateur à la requête : le contrôleur
        // pourra ensuite lire `req.user` pour savoir qui est connecté.
        req.user = decoded
    } catch (error) {
        // Sécurité supplémentaire si une erreur inattendue survenait.
        return res.status(401).json({
            error: true,
            message: "[M812] Token d'authentification invalide"
        })
    }

    // Tout est bon : on passe au middleware/contrôleur suivant.
    next()
}
