 const express             = require ('express'),
       app                 = express(),
       bodyParser          = require('body-parser'),
       moongose            = require('mongoose'),
       passport            =require ('passport'),
       LocalStrategy       =require('passport-local'),
       Campground          = require('./models/campgrounds'),
       Comment             = require('./models/comment'),
       User                = require('./models/user'),
       seedDB              = require('./seeds');
       commentRoutes       = require('./routes/comments');
       campgroundsRoutes   = require('./routes/campgrounds');
       authRoutes          = require('./routes/index');


//==================Settings===========================

moongose.connect("mongodb://localhost/yelp_camp_v8");
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
seedDB();

//=================Passport Configuration===================

app.use(require('express-session')({
    secret: 'Terra es la mejor perra del mundo',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})


//==================Routes=============================

app.use(commentRoutes);
app.use(authRoutes),
app.use(campgroundsRoutes);

//============================Start the server=============================

app.listen(app.get('port'), () => {
     console.log('server connect')
})
