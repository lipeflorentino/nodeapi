// Load the MySQL pool connection
const pool = require('../data/config');
// Importa o controller
const appController = require('../controllers/appController');

console.log('cheguei na rota!');

const router = app => {
    app.get('/', function (req, res, next) {
        res.status(200).send({
            title: "Node Express API",
            version: "0.0.1"
        });
    });
    
    // Add a new user
    app.route('/users').post(appController.enviarEmail);
    // Delete a user
    app.route('/users/:id').delete(appController.deletarUser);
}


// Export the router
module.exports = router;