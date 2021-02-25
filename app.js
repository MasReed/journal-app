
const bodyParser = require('body-parser');
const ejs = require('ejs');
const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');

const port = 3000;

// Express instance with EJS templates and package utilization
app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


// App home route
app.get('/', function(req, res){
    res.render('home.ejs');
});


// Listen for server connection
app.listen(port, function(){
    console.log("Server is started on port " + port);
});
