const express = require('express');
const app = express();
const parser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');

app.use(express.json());
app.use(parser.json());
const port = process.env.port || 3000;

//Setting up DB

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () => console.log('connected'));

//Set '/' route

app.get('/' , (req, res) => {
    res.send('Hello');
})

//Import routes

const productRoute = require('./routes/product');
app.use('/products', productRoute);

const userRoute = require('./routes/users');
app.use('/users', userRoute);


app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
})

