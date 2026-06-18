/**
 * ============================================================================
 *  middleware/post.middleware.login.js — Validation des données de connexion
 * ============================================================================
 *
 *  Ce middleware s'exécute AVANT le contrôleur de connexion (login).
 *  Son rôle : vérifier que la requête contient bien un email ET un mot de passe.
 *  Si une donnée manque, on arrête tout de suite avec une erreur 400
 *  (Bad Request) — inutile d'aller interroger la base de données pour rien.
 *
 *  Bonne pratique : on valide TOUJOURS les données reçues du client avant
 *  de les utiliser ("Never trust user input").
 *
 *  Documentation officielle :
 *   - Middlewares Express : https://expressjs.com/fr/guide/using-middleware.html
 *   - Code HTTP 400       : https://developer.mozilla.org/fr/docs/Web/HTTP/Status/400
 * ============================================================================
 */

const MiddlewareLogin = (req, res, next) => {

    // Si le corps de la requête est totalement absent (req.body undefined),
    // on renvoie immédiatement une erreur.
    if (!req.body) {
        return res.status(400).json({
            error: true,
            message: "[M810] Email et mot de passe sont obligatoires"
        })
    }

    // Déstructuration : on extrait email et password depuis req.body.
    const { email, password } = req.body

    // `!email || !password` est vrai si l'un des deux est vide, null ou absent.
    if (!email || !password) {
        return res.status(400).json({
            error: true,
            message: "[M810] Email et mot de passe sont obligatoires"
        })
    }

    // Données présentes : on laisse la requête continuer vers le contrôleur.
    next()
}

module.exports = MiddlewareLogin
