/**
 * Created by tanner on 3/18/17.
 */
var express = require('express');
var app = module.exports = express();

var cors = require('cors');
var bodyParser = require('body-parser');
var massive = require('massive');
var db = massive.connectSync({
    connectionString: 'postgres://postgres:tanner@localhost/'
});
app.set('db', db);

var controller = require('./controller');
app.use(bodyParser.json());

app.use(cors());

var port = 3000;
app.listen(port, () => console.log('listening on port', port));

app.post('/product', controller.createProduct);
app.get('/products', controller.readProducts);
app.get('/product', controller.readProduct);
app.put('/product', controller.updateProduct);
app.delete('/product', controller.deleteProduct);