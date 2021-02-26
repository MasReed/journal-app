
const bodyParser = require('body-parser');
const ejs = require('ejs');
const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');

const port = 3000;
const posts = [];

// Express instance with EJS templates and package utilization
app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


//Temporary data to display
const homeContent = 'This is home content to display.'


// App home route
app.get('/', function(req, res){
    res.render('home.ejs', {
        posts: posts
    });
});


// App compose route
app.get('/compose', function(req, res){
    res.render('compose.ejs');
});

// App compose post route
app.post('/compose', function(req, res){

    const post = {
        title: req.body.postTitle,
        content: req.body.postContent
    }

    posts.push(post);
    res.redirect('/');
});


// App about route
app.get('/about', function(req, res){
    res.render('about.ejs');
})


// Listen for server connection
app.listen(port, function(){
    console.log("Server is started on port " + port);
});
