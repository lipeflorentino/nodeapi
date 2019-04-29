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
        from: 'Contato@bigsolucoes.com.br',
        to: $destinatario,
        subject: $subject,
        text: $text
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return res.json({message: "Ocorreu um erro, tente mais tarde"});
        } else {
            console.log('Email enviado: ' + info.response);
            return res.json({message: "E-mail enviado com sucesso!"});
        }
    });    
};
function inserirUser(req, res){
    User.insertUser(req.body, function(err, user){
        if(err) 
            return res.json({message: "Ocorreu um erro, tente mais tarde"});
        else 
            return res.json({message: "usuario criado com sucesso!"});
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

