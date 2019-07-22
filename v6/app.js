 var express               = require ('express'),
     app                   = express(),
     bodyParser            = require('body-parser'),
     moongose              = require('mongoose'),
     passport              = require('passport'),
     LocalStrategy         = require('passport-local'),
     Campground            = require('./models/campgrounds'),
     Comment               = require('./models/comment'),
     User                  = require('./models/user');
     seedDB                = require('./seeds'),
    
//=========================================================================
//==========================Settings=======================================
//=========================================================================
moongose.connect("mongodb://localhost/yelp_camp_v6")
app.set('port', process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
seedDB();
//=========================================================================
//============================Passport Configuration=========================
//=========================================================================

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


//=========================================================================
//========================Middleware=======================================
//=========================================================================

app.use(bodyParser.urlencoded({extended: false}));
//=========================================================================
//==========================Routes=========================================
//=========================================================================

app.get('/', function (req, res) {
    res.render("landing");
});
//================Index - all campgrounds from DB====================

app.get('/campgrounds', function (req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
      if(err){
          console,log(err)
      } else {
        res.render("campgrounds/index",{campgrounds: allCampgrounds, currentUser: req.user})

      }
    });
});

//==============Create a new campgrounds=============================

app.post('/campgrounds', function(req, res){
    res.send('you hit the post route')
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image =  req.body.image;
    var desc= req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    //campgrounds.push(newCampground);
    //create a new Campgorund and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if (err){
            console.log(err);
        }else {
             //rederict back to campgrounds page
            res.redirect('/campgorunds')
        }
    });  
});

//==========New - show form to create new campgrounds======================

app.get('/campgrounds/new', function(req, res){
    res.render('campgrounds/new');
});

//=======Show - shows more info about one campgrounds==========

app.get('/campgrounds/:id', function (req, res){
       //find the campground with provided ID
       Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
           if(err){
               console.log(err);
           } else {
               console.log(foundCampground);
                //render show template with that campground
                 res.render("campgrounds/shows", {campground: foundCampground});
           }
       });
});

//============================Comments Routes==============================

app.get('/campgrounds/:id/comments/new', isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err)
        } else {
            res.render('comments/new', {campground: campground});
        }
    })
  });

app.post('/campgrounds/:id/comments', isLoggedIn, function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);

                }
            });
        }
    });
})

//============================Auth routes==================================

   //show register form
app.get('/register', function(req, res){
    res.render('register')
});
  //habdling sign up Logic
app.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user){
        if(err){
            console.log(err);
            return res.send('register')
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/campgrounds');
        })
    })
});
  //show login form
  app.get('/login', function(req, res){
      res.render('login')
  });
  //handling login Logic
  app.post('/login', passport.authenticate('local',{
      successRedirect: '/campgrounds',
      failureRedirect: '/login'
  }), function(req, res){
     
  });
  //logic route
  app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/campgrounds');
  });

  function isLoggedIn(req, res, next){
      if(req.isAuthenticated()){
      return next();
      }
      res.redirect('/login');
  }
//=========================================================================
//====================================Start the server=============================
//=========================================================================
app.listen(app.get('port'), () => {
     console.log('server connect')
})
