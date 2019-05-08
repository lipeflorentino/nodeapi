// Importa o controller
const appController = require('../controllers/appController');
require('dotenv').config();
console.log('cheguei na rota!');
const $secret = process.env.SECRET;
const router = app => {
    // middleware para validar o Token
    app.use((req, res, next) => {
      // Aqui vamos verificar o header da requisição, os parametros e o corpo da requisição, procurando o token
      var token = req.body.token || req.query.token || req.headers['X-Access-Token']
    
      // Se o token existir
      if (token) {
        // Verificamos se o token está batendo com a nossa Secret
        if(token != $secret){
            return res.json({
              success: false,
              message: 'A autenticação com o token falhou.'
            })
          } else {
             next()
            // Se o token estiver válido, então salvamos ele e liberamos o acesso, fazemos o trabalho do porteiro de um prédio aqui.
            return res.json({
              success: true,
              message: 'A autenticação foi concluida com sucesso!'
            });
           
          }
      } else {
        // Se quem requisitou não informou o token, devolvemos um erro para ele.
        return res.status(403).send({
          success: false,
          message: 'Nenhum token foi informado.'
        })
      }
    })

    app.get('/', (request, response) => {
        response.send({
            message: 'Node.js and Express REST API'
        });
    });
    
    // Add a new user
    app.route('/users').post(appController.enviarEmail);
    // Delete a user
    app.route('/users/:id').delete(appController.deletarUser);
}


// Export the router
module.exports = router;