/**
 * ============================================================================
 *  lib/argon2.js — Hachage et vérification des mots de passe
 * ============================================================================
 *
 *  On ne stocke JAMAIS un mot de passe en clair dans la base de données.
 *  On stocke à la place son "haché" (hash) : une transformation à sens unique.
 *
 *   - hashPassword   : transforme un mot de passe en hash (à l'inscription).
 *   - verifyPassword : compare un mot de passe saisi au hash stocké (à la connexion).
 *
 *  Argon2 est l'algorithme de hachage de mots de passe recommandé aujourd'hui
 *  (gagnant de la "Password Hashing Competition" en 2015). Il intègre
 *  automatiquement un "sel" (salt) aléatoire, ce qui rend les attaques par
 *  table précalculée (rainbow tables) inefficaces.
 *
 *  Documentation officielle :
 *   - Librairie node-argon2 : https://github.com/ranisalt/node-argon2
 *   - OWASP (stockage des mots de passe) :
 *     https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
 * ============================================================================
 */

const argon2 = require('argon2')

/**
 * hashPassword — Hache un mot de passe en clair.
 *
 * @param {string} password  Le mot de passe saisi par l'utilisateur.
 * @returns {Promise<string>} Le hash à stocker en base de données.
 *
 * `await` est nécessaire car le hachage est une opération asynchrone (longue).
 */
const hashPassword = async (password) => {
  try {
    const hash = await argon2.hash(password)
    return hash
  } catch (err) {
    console.error('Error hashing password:', err)
    // On relance l'erreur (throw) pour que la fonction appelante puisse la gérer.
    throw err
  }
}

/**
 * verifyPassword — Vérifie qu'un mot de passe correspond bien à un hash.
 *
 * @param {string} password  Le mot de passe saisi à la connexion.
 * @param {string} hash      Le hash stocké en base pour cet utilisateur.
 * @returns {Promise<boolean>} `true` si le mot de passe est correct, sinon `false`.
 *
 * ⚠️ Attention à l'ordre des arguments d'argon2.verify : (hash, motDePasse).
 */
const verifyPassword = async (password, hash) => {
  try {
    const isValid = await argon2.verify(hash, password)
    return isValid
  } catch (err) {
    console.error('Error verifying password:', err)
    throw err
  }
}

module.exports = {
  hashPassword,
  verifyPassword
}
