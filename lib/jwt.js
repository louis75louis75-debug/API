/**
 * ============================================================================
 *  lib/jwt.js — Gestion des jetons JWT (JSON Web Token)
 * ============================================================================
 *
 *  Un JWT est un "jeton" (token) signé numériquement. On le donne au client
 *  après une connexion réussie. À chaque requête suivante, le client renvoie
 *  ce jeton pour prouver son identité (au lieu de renvoyer son mot de passe).
 *
 *  Un JWT contient 3 parties séparées par des points :  header.payload.signature
 *   - payload   : les données qu'on veut transporter (ici l'email).
 *   - signature : calculée avec une clé secrète (JWT_SECRET). Elle permet de
 *                 vérifier que le jeton n'a pas été modifié.
 *
 *  ⚠️ Important : le payload n'est PAS chiffré, seulement signé. On n'y met
 *  donc jamais d'information sensible (mot de passe, etc.).
 *
 *  Documentation officielle :
 *   - Librairie jsonwebtoken : https://github.com/auth0/node-jsonwebtoken
 *   - Comprendre les JWT     : https://jwt.io/introduction
 * ============================================================================
 */

// On importe la librairie `jsonwebtoken` (installée avec `npm install jsonwebtoken`).
// NB : le nom de variable "josnwebtoken" contient une coquille, mais cela
//      n'a aucun impact : c'est juste un nom de variable choisi par le développeur.
const josnwebtoken = require("jsonwebtoken");

/**
 * signJwt — Crée (signe) un nouveau jeton JWT.
 *
 * @param {Object} payload  Les données à mettre dans le jeton (ex : { email }).
 * @returns {string}        Le jeton signé, sous forme de chaîne de caractères.
 *
 * `expiresIn: "1h"` : le jeton expire automatiquement au bout d'une heure.
 * Doc : https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
 */
const signJwt = (payload) => {
    return josnwebtoken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
}

/**
 * verifyJwt — Vérifie et décode un jeton JWT.
 *
 * @param {string} token  Le jeton reçu du client.
 * @returns {Object|null} Le contenu (payload) si le jeton est valide,
 *                        sinon `null` (jeton expiré, modifié ou invalide).
 *
 * `jwt.verify` lève une erreur si le jeton est invalide : on l'attrape avec
 * try/catch pour renvoyer `null` plutôt que de planter l'application.
 * Doc : https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
 */
const verifyJwt = (token) => {
    try {
        return josnwebtoken.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error("Erreur lors de la vérification du JWT :", error);
        return null;
    }
}

// On exporte les deux fonctions pour les utiliser ailleurs (login, middleware...).
module.exports = {
    signJwt,
    verifyJwt
}
