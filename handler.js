//Esse arquivo será o responsável por exportar o event handler do lambda. Basicamente será a função que será executada assim que o lambda for chamado.

//para integração com o serverless framework e AWS

const app           = require('./App');
const serverless    = require('serverless-http')

module.exports.run = serverless(app);