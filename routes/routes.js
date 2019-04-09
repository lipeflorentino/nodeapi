// Load the MySQL pool connection
const pool = require('../data/config');
// Importa o controller
const appController = require('../controllers/appController');

console.log('cheguei na rota!');

const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'Node.js and Express REST API'
        });
    });
    
    // Display all users
    app.route('/users').get(appController.listarUsers);
    // Add a new user
    app.route('/users').post(appController.enviarEmail);
    // Delete a user
    app.route('/users/:id').delete(appController.deletarUser);
}


// Export the router
module.exports = router;