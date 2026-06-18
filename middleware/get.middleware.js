/**
 * ============================================================================
 *  middleware/get.middleware.js — Exemple de middleware (démonstration)
 * ============================================================================
 *
 *  Petit middleware d'exemple, utile pour comprendre le fonctionnement :
 *    - il affiche un message dans la console à chaque requête ;
 *    - il bloque l'accès (403 Interdit) si l'URL contient `?toto=true`
 *      (paramètre de requête, accessible via `req.query`).
 *
 *  `req.query` contient les paramètres présents après le `?` dans l'URL.
 *  Exemple : pour l'URL  /?toto=true  →  req.query.toto vaut "true".
 *
 *  Documentation officielle :
 *   - req.query           : https://expressjs.com/fr/api.html#req.query
 *   - Code HTTP 403       : https://developer.mozilla.org/fr/docs/Web/HTTP/Status/403
 * ============================================================================
 */

module.exports = (req, res, next) => {
    console.log('Middleware exécuté avant le contrôleur')

    // Si l'URL contient ?toto=true, on refuse l'accès.
    if (req.query.toto === 'true') {
        return res.status(403).json({ message: 'Accès interdit' })
    }

    // Sinon, on continue vers le contrôleur.
    next()
}
