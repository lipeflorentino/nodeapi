// Load the MySQL pool connection
const pool = require('../data/config');

//construtor do objeto news
const User = function(user){
    this.nome = user.nome;
    this.email = user.email;
    this.assunto = user.assunto;
    this.mensagem = user.mensagem;
    this.data_envio = user.data_envio;
};

console.log('criei o model!');

User.getAllUsers = function getAllUsers(result) {
    pool.query('SELECT * FROM Users', (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);    
        }
        else {
            console.log('MODEL RESULTS : ', res);  
            result(null, res);
        }
    });
};

User.insertUser = function insertUser(request, result){
    pool.query("INSERT INTO Users (nome, email, assunto, mensagem, data_envio) VALUES (?)", [request.body], function(error, res){
        if (error){ 
            console.log("error: ", error);
            result(null, error);
        }
        else{
            console.log('result: ', res);  
            result('usuario adcionado: ' + res);
        }
    });    
};

User.deleteUser = function deleteUser(request, result){
    const id = request.params.id;
    pool.query('DELETE FROM Users WHERE id = ?', id, (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);    
        }
        else {
            console.log('result: ', res);  
            result(null, res);
        }    
    });    
};

module.exports = User;