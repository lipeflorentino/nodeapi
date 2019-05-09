// Require packages and set the port
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const cors = require('cors');
const app = express();
const helmet = require('helmet');

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(helmet());
app.disable('x-powered-by');

// Set up a whitelist and check against it:
const whitelist = ['https://bigempreendimentos.com.br', 'https://www.bigempreendimentos.com.br', 'http://bigempreendimentos.com.br', 'http://www.bigempreendimentos.com.br'];

// Then pass them to cors:
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(whitelist.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

routes(app);

module.exports = app;