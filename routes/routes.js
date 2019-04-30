// Importa o controller
const appController = require('../controllers/appController');
const config = require('../data/config');
console.log('cheguei na rota!');



const router = app => {
    app.set('superSecret', config.secret); 
    // middleware para validar o Token
    app.use((req, res, next) => {
      // Aqui vamos verificar o header da requisição, os parametros e o corpo da requisição, procurando o token
      var token = req.body.token || req.query.token || req.headers['x-access-token']
    
      // Se o token existir
      if (token) {
        console.log('token: ' + token);
        // Verificamos se o token está batendo com a nossa Secret
        if(token !== config.secret){
            return res.json({
              success: false,
              message: 'A autenticação com o token falhou.'
            })
          } else {
            // Se o token estiver válido, então salvamos ele e liberamos o acesso, fazemos o trabalho do porteiro de um prédio aqui.
            next()
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