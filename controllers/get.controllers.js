

const sendEmail  = require('../lib/nodemailer')

const argon2 = require('../lib/argon2')

module.exports = async (req, res) => {

  
  const to = 'test'
  const subject = 'Test Email'
  const text = `This is a test email with variable.`

  
  const hash = await argon2.hashPassword('myPassword123')

  console.log('Hashed password:', hash)

  
  const isValid = await argon2.verifyPassword('myPassword123', hash)

  console.log('Password is valid:', isValid)

  
  res.json({
    message: 'Bienvenue sur l\'API de gestion des avis de films !',
    endpoints: {
      get: [
        {endpoint: '/avis', description: 'Récupérer tous les avis de films'},
        {endpoint: '/avis/:id', description: 'Récupérer un avis de film par son ID'}
      ],
      post: [
        {endpoint: '/add/avis', description: 'Ajouter un nouvel avis de film'},
        {endpoint: '/register', description: 'Créer un compte utilisateur'},
      ]}
  })
}
