/**
 * ============================================================================
 *  middleware/post.middleware.register.js — Validation des données d'inscription
 * ============================================================================
 *
 *  Ce middleware s'exécute AVANT le contrôleur d'inscription (register).
 *  Il enchaîne plusieurs vérifications sur les données envoyées par le client :
 *    1. Tous les champs sont présents (name, email, password, confirmPassword).
 *    2. Le mot de passe et sa confirmation sont identiques.
 *    3. Le mot de passe fait au moins 8 caractères.
 *
 *  Dès qu'une règle n'est pas respectée, on renvoie une erreur et on s'arrête
 *  (return) : le contrôleur ne sera jamais atteint.
 *
 *  Rappel des codes HTTP utilisés :
 *    - 400 Bad Request  : la requête est mal formée (champ manquant, trop court).
 *    - 409 Conflict     : conflit logique (les mots de passe ne correspondent pas).
 *
 *  Documentation officielle :
 *   - Middlewares Express : https://expressjs.com/fr/guide/using-middleware.html
 *   - Codes HTTP          : https://developer.mozilla.org/fr/docs/Web/HTTP/Status
 * ============================================================================
 */

const MiddlewareRegister = (req, res, next) => {

    // 0. Le corps de la requête est-il présent ?
    if (!req.body) {
        return res.status(400).json({
            error: true,
            message: "[M810] Email et mot de passe sont obligatoires"
        })
    }

    // On extrait les quatre champs attendus du formulaire d'inscription.
    const { name, email, password, confirmPassword } = req.body

    // 1. Tous les champs sont-ils renseignés ?
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
            error: true,
            message: "[M802] Tous les champs sont obligatoires"
        })
    }

    // 2. Le mot de passe et sa confirmation sont-ils identiques ?
    if (password !== confirmPassword) {
        return res.status(409).json({
            error: true,
            message: "[M801] Les mots de passe ne correspondent pas"
        })
    }

    // 3. Le mot de passe est-il assez long (sécurité minimale) ?
    if (password.length < 8) {
        return res.status(400).json({
            error: true,
            message: "[M803] Le mot de passe doit contenir au moins 8 caractères"
        })
    }

    // Toutes les validations sont passées : on continue vers le contrôleur.
    next()
}

module.exports = MiddlewareRegister
