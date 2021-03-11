
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const adminRo = require('./routes/admin');
const orderRo = require('./routes/orders');
const prodRo = require('./routes/prods');
const cartRo = require('./routes/cart');
const pool =  require('./utils/database');


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname,'public')));


app.use('/admin',adminRo);
app.use('/orders',orderRo);
app.use('/prods',prodRo);
app.use('/cart',cartRo);


app.listen(3000);