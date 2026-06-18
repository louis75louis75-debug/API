/**
 * ============================================================================
 * middleware/post.middleware.forgot.js — Validation Forgot Password
 * ============================================================================
 *
 * Étapes de la validation :
 * 0. Vérifier que le corps de la requête existe.
 * 1. Vérifier que le champ email est bien renseigné.
 *
 * Si tout est valide, on passe au contrôleur de génération de token.
 * ============================================================================
 */

const MiddlewareForgot = (req, res, next) => {

    // 0. Le corps de la requête est-il présent ?
    if (!req.body) {
        return res.status(400).json({
            error: true,
            message: "[M910] Le corps de la requête est manquant"
        })
    }

    // On extrait le seul champ attendu pour la demande de récupération
    const { email } = req.body

    // 1. Le champ email est-il renseigné ?
    if (!email) {
        return res.status(400).json({
            error: true,
            message: "[M902] L'adresse e-mail est obligatoire"
        })
    }

    // Toutes les validations sont passées : on continue vers le contrôleur.
    next()
}

module.exports = MiddlewareForgot