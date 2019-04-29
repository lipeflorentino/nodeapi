// Require packages and set the port
const express = require('express');
const port = 8080;
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
// Set up a whitelist and check against it:
const whitelist = ['http://bigweb-lipeflorentino.c9users.io:8081/', 'http://example2.com'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback('Origin allowed by CORS', true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Then pass them to cors:
app.use(cors());

routes(app);

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server started and listening on port ${server.address().port}`);
});
