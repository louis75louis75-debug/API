/**
 * ============================================================================
 * middleware/post.middleware.reset-password.js — Validation Reset Password
 * ============================================================================
 *
 * Étapes de la validation :
 * 0. Vérifier que le corps de la requête est présent.
 * 1. Vérifier que tous les champs (token, password, confirmPassword) sont renseignés.
 * 2. Vérifier que le mot de passe et sa confirmation sont identiques.
 * 3. Vérifier que le nouveau mot de passe respecte la longueur minimale (8 caractères).
 *
 * Si tout est valide, on passe au contrôleur de réinitialisation.
 * ============================================================================
 */

const MiddlewareResetPassword = (req, res, next) => {

    // 0. Le corps de la requête est-il présent ?
    if (!req.body) {
        return res.status(400).json({
            error: true,
            message: "[M920] Le corps de la requête est manquant"
        })
    }

    // On extrait les trois champs requis pour la réinitialisation
    const { token, password, confirmPassword } = req.body

    // 1. Tous les champs sont-ils renseignés ?
    if (!token || !password || !confirmPassword) {
        return res.status(400).json({
            error: true,
            message: "[M922] Le jeton, le mot de passe et la confirmation sont obligatoires"
        })
    }

    // 2. Le mot de passe et sa confirmation sont-ils identiques ?
    if (password !== confirmPassword) {
        return res.status(409).json({
            error: true,
            message: "[M921] Les mots de passe ne correspondent pas"
        })
    }

    // 3. Le mot de passe est-il assez long (sécurité minimale) ?
    if (password.length < 8) {
        return res.status(400).json({
            error: true,
            message: "[M923] Le nouveau mot de passe doit contenir au moins 8 caractères"
        })
    }

    // Toutes les validations sont passées : on continue vers le contrôleur.
    next()
}

module.exports = MiddlewareResetPassword