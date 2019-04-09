//importando o model
const User = require('../models/user.js');

console.log('criei o controller!');

exports.listarUsers = function(req, res) {
    User.getAllUsers(function(err, user) {
        if (err)
          return res.send(err);
          console.log('resultado: ', user);
        res.send(user);
    });
};
exports.inserirUser = function(req, res){
    User.insertUser(req.body, function(err, user){
        if(err)
            return res.send(err);
            console.log('resultado: ' + user);
        res.send(user);    
    });    
};
exports.deletarUser = function(req, res){
    User.deleteUser(req, function(err, result){
        if(err)
            return res.send(err);
            console.log('resultado: ' + res);
        res.send(result);    
    });    
};

