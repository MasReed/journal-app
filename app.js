
const bodyParser = require('body-parser');
const ejs = require('ejs');
const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');

const port = process.env.PORT;
if (port == null || port == ""){
    port = 3000;
}


// Database connection with mongoose
mongoose.connect(process.env.mongoDB_ATLAS_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


// Express instance with EJS templates and package utilization
app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


/////////////////////////////////////SCHEMAS////////////////////////////////////

// Journal post schema
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
});

const Post = mongoose.model('Post', postSchema);


//////////////////////////////////////PAGES/////////////////////////////////////

// App home route
app.get('/', function(req, res){

    Post.find({}, (err, posts) => {
        if (err) console.log(err);

        res.render('home.ejs', {
            posts: posts
        });
    });
});


// App compose route
app.get('/compose', function(req, res){
    res.render('compose.ejs');
});


// App compose post route
app.post('/compose', function(req, res){

    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postContent
    });

    post.save(function(err){
        if (err) return console.log(err);
    });

    res.redirect('/');
});


// Dynamic page route (express route parameters)
app.get('/:postId', function(req, res){

    const postIdRequested = req.params.postId;

    //Use unique post id as url
    Post.findOne({_id: postIdRequested}, (err, post) => {
        if (err) console.log(err);

        res.render('post.ejs', {
            post: post
        });
    });
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
