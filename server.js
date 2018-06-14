// resource consulted: https://medium.freecodecamp.org/building-a-simple-node-js-api-in-under-30-minutes-a07ea9e390d2

const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
var options = {
    index: "OrderGenerator.html"
};

app.use('/', express.static('app', options));

const port = 5001;

app.use(bodyParser.json());

require('./app/routes')(app, {});
app.listen(port, () => {
  console.log('starting... listening on port: ' + port);
});

