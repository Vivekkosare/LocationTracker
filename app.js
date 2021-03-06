
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/route');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, *');
    next();
});

app.use('/tracker', routes);

app.listen(3001);