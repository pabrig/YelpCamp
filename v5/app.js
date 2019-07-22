 var express    = require ('express'),
     app        = express(),
     bodyParser = require('body-parser'),
     moongose   = require('mongoose'),
     Campground = require('./models/campgrounds'),
     Comment    = require('./models/comment')
     seedDB     = require('./seeds')

//==================Settings===========================

moongose.connect("mongodb://localhost/yelp_camp_v3")
app.set('port', process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
seedDB();

//================Middleware===========================

app.use(bodyParser.urlencoded({extended: false}));

//==================Routes=============================

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
        res.render("campgrounds/index",{campgrounds: allCampgrounds})

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

app.get('/campgrounds/:id/comments/new', function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err)
        } else {
            res.render('comments/new', {campground: campground});
        }
    })
  });

app.post('/campgrounds/:id/comments', function(req, res){
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
//============================Start the server=============================

app.listen(app.get('port'), () => {
     console.log('server connect')
})
