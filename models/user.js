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

User.insertUser = function insertUser(request){
    
    const nome = request.nome,
    email = request.email,
    assunto = request.assunto,
    mensagem = request.mensagem,
    data_envio = request.data_envio; 
    
    console.log('nome: ' + nome + '----------------');
    const sql = "INSERT INTO Users (nome, email, assunto, mensagem, data_envio) VALUES (" + "'" + nome + "'" + ',' + "'" + email + "'" + ',' + "'" + assunto + "'" + ',' + "'" + mensagem + "'" + ',' + "'" + data_envio + "'" + ")";
    pool.query(sql, function(error, res){
        if (error){ 
            return console.log("error: ", error);
        }
        else{
            return console.log('result: ', res);  
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