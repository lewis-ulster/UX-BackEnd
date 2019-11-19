const express = require('express');
const app = express();
const parser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

/*app.use(function(req, res, next) {

    //to allow cross domain requests to send cookie information.
    res.header('Access-Control-Allow-Credentials', true);
    
    // origin can not be '*' when crendentials are enabled. so need to set it to the request origin
    res.header('Access-Control-Allow-Origin',  req.headers.origin);
    
    // list of methods that are supported by the server
    res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
    
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');
    
        next();
    });*/

app.use(express.json());
app.use(parser.json());
app.use(cors());

const port = process.env.port || 5000;

//Setting up DB

mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log('connected'));

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

