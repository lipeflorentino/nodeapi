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
exports.enviarEmail = function(request, res){
    console.log('Inserindo usuario...');
    inserirUser(request);
    console.log('Preparando envio de email...');
    const req = request.body;
    require('dotenv').config();
    const $usuario = process.env.MY_USER;
    const $senha = process.env.PASSWORD;
    const $subject = req.assunto;
    const $text = req.mensagem;
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        auth: {
            user: $usuario,
            pass: $senha
        }
    });
    const $destinatario = 'lipeflorentino2@gmail.com';
    const mailOptions = {
        from: 'Contato@bigsolucoes.com.br',
        to: $destinatario,
        subject: $subject,
        text: $text
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            console.log('Email enviado: ' + info.response);
            res.send(info);
        }
    });    
};
function inserirUser(req){
    User.insertUser(req.body, function(err, user){
        if(err) 
            return console.log('erro: ' + err);
        else 
            return console.log('resultado: ' + user);
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

