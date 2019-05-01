//importando o model
const User = require('../models/user.js');
require('dotenv').config();
const nodemailer = require("nodemailer");

console.log('criei o controller!');

exports.enviarEmail = function(request, res){
    console.log('Inserindo usuario...');
    inserirUser(request);
    console.log('Preparando envio de email...');
    const req = request.body;
    const $usuario = process.env.MY_USER;
    const $senha = process.env.PASSWORD;
    const $subject = req.assunto;
    const $email = req.email;
    const $nome = req.nome;
    const $text = req.mensagem;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        auth: {
            user: $usuario,
            pass: $senha
        }
    });
    const $destinatario = 'bigsolucoesdigitais@gmail.com';
    const mailOptions = {
        from: request.body.email,
        to: $destinatario,
        subject: 'Assunto: ' + $subject,
        text: 'Enviado por: ' + $nome + '\n' + 'Mensagem: ' + $text
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
function inserirUser(req, res){
    User.insertUser(req.body, function(err, user){
        if(err) 
            return console.log('erro: ' + err);
        else 
            res.send(user);
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

