module.exports = (req, res) => {
  // TODO : générer un jeton de réinitialisation et envoyer l'e-mail.

  // Réponse temporaire.
  res.send('/forgot-password')
}
const prisma = require('../lib/prisma');
const sendEmail = require('../lib/nodemailer');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      error: true,
      message: "L'adresse e-mail est obligatoire."
    });
  }

  try {
    // 1. Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Sécurité : même si l'e-mail n'existe pas, on renvoie souvent un message de succès
    // pour éviter que des personnes malveillantes devinent quels e-mails ont un compte.
    if (!user) {
      return res.status(200).json({
        error: false,
        message: "Si ce compte existe, un e-mail de réinitialisation a été envoyé."
      });
    }

    // 2. Générer un jeton JWT unique et temporaire (expire dans 15 minutes)
    // On inclut l'ID de l'utilisateur dans le payload
    const resetToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // 3. Préparer le lien de réinitialisation (à adapter avec l'URL de ton frontend)
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    // 4. Envoyer l'e-mail via module Nodemailer
    const subject = "Réinitialisation de votre mot de passe";
    const text = `Bonjour,\n\nVous avez demandé à réinitialiser votre mot de passe. Veuillez cliquer sur le lien ci-dessous pour le modifier (valable 15 minutes) :\n\n${resetLink}\n\nSi vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet e-mail.`;

    try {
      await sendEmail(user.email, subject, text);
    } catch (emailError) {
      console.error("Erreur Nodemailer :", emailError);
      return res.status(500).json({
        error: true,
        message: "Impossible d'envoyer l'e-mail de récupération."
      });
    }

    return res.status(200).json({
      error: false,
      message: "Si ce compte existe, un e-mail de réinitialisation a été envoyé."
    });

  } catch (error) {
    console.error("Erreur lors de la demande de mot de passe oublié :", error);
    return res.status(500).json({
      error: true,
      message: "Une erreur interne est survenue."
    });
  }
};