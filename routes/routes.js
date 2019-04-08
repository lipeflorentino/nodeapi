// Load the MySQL pool connection
const pool = require('../data/config');

const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'Node.js and Express REST API'
        });
    });
    
    // Display all users
    app.get('/users', (request, response) => {
        pool.query('SELECT * FROM Users', (error, result) => {
            if (error) throw error;
     
            response.send(result);
        });
    });
    // Display a single user by ID
    app.get('/users/:id', (request, response) => {
        const id = request.params.id;
     
        pool.query('SELECT * FROM Users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
     
            response.send(result);
        });
    });
    // Add a new user
    app.post('/users', (request, response) => {
        console.log('request: '+request.body);
        pool.query("INSERT INTO Users (nome, email, assunto, mensagem, data_envio) VALUES (?)", request.body, (error, result) => {
            if (error) throw error;
            response.status(201).send(`User added with ID: ${result.insertId}`);
        });
    });
    // Delete a user
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;
     
        pool.query('DELETE FROM Users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
     
            response.send('User deleted.');
        });
    });
    
}


// Export the router
module.exports = router;