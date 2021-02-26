
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


// Dynamic page route (express route parameters)
app.get('/:postName', function(req, res){

    const postRequested = _.lowerCase(req.params.postName);

    // Get all posts with same title
    const foundPosts = posts.filter(function(post){
        return _.lowerCase(post.title) === postRequested;
    });

    res.render('post.ejs', {
        foundPosts: foundPosts
    });

    // Using forEach method NOTE: only displays first post with title
    // posts.forEach(function(post){
    //     const postStored = _.lowerCase(post.title);
    //     if (postRequested === postStored){
    //         console.log("post exists");
    //         res.render('post', {
    //             title: post.title,
    //             content: post.content
    //         });
    //     }
    // });
});


// App about route
app.get('/about', function(req, res){
    res.render('about.ejs');
})


// App contact route
app.get('/contact', function(req, res){
    res.render('contact.ejs');
})


// Listen for server connection
app.listen(port, function(){
    console.log("Server is started on port " + port);
});
