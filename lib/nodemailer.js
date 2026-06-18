/**
 * ============================================================================
 *  lib/nodemailer.js — Envoi d'e-mails
 * ============================================================================
 *
 *  Nodemailer est la librairie de référence pour envoyer des e-mails depuis
 *  Node.js. Ici, on l'utilise par exemple pour envoyer un e-mail de bienvenue
 *  après une inscription.
 *
 *  La connexion au serveur d'envoi (SMTP) se fait avec des identifiants stockés
 *  dans le fichier `.env` (jamais en dur dans le code !) :
 *      EMAIL_SMTP=adresse@gmail.com
 *      EMAIL_PASSWORD=mot_de_passe_d_application
 *
 *  Documentation officielle :
 *   - Nodemailer        : https://nodemailer.com/about/
 *   - Transport SMTP    : https://nodemailer.com/smtp/
 *   - Variables d'env   : https://github.com/motdotla/dotenv
 * ============================================================================
 */

const nodemailer = require("nodemailer")

// `dotenv` charge les variables définies dans le fichier .env dans process.env.
require('dotenv').config()

/**
 * sendEmail — Envoie un e-mail simple.
 *
 * @param {string} to       Adresse du destinataire.
 * @param {string} subject  Objet (titre) de l'e-mail.
 * @param {string} text     Contenu de l'e-mail (texte brut).
 */
const sendEmail = async (to, subject, text) => {
    // Le "transporteur" représente la connexion au serveur d'envoi (ici Gmail).
    // Doc : https://nodemailer.com/smtp/
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",   // serveur SMTP de Gmail
        port: 587,                // port standard pour l'envoi avec STARTTLS
        secure: false,            // false = on chiffre via STARTTLS (pas SSL direct)
        auth: {
            user: process.env.EMAIL_SMTP,     // identifiant lu depuis .env
            pass: process.env.EMAIL_PASSWORD, // mot de passe lu depuis .env
        },
    });

    try {
        // On envoie l'e-mail. `await` attend la fin de l'envoi.
        // Doc : https://nodemailer.com/message/
        const info = await transporter.sendMail({
            from: process.env.EMAIL_SMTP, // expéditeur
            to,                           // destinataire(s)
            subject,                      // objet
            text,                         // corps en texte brut
            html: `<b>${text}</b>`,       // corps en HTML (affiché en gras ici)
        });

        console.log("Message sent: %s", info.messageId);
        // L'URL d'aperçu n'est disponible qu'avec un compte de test Ethereal.
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error("Error while sending mail:", err);
    }
}

module.exports = sendEmail
