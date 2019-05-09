const app = require('./App')

const port = 3000;
app.listen(port, () => 
  console.log('The Server is listening on port:' + port)
)