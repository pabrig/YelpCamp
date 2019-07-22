 var express    = require ('express'),
     app        = express(),
     bodyParser = require('body-parser'),
     moongose   = require('mongoose'),
     Campground = require('./models/campgrounds'),
     seedDB     = require('./seeds')

//==================Settings===========================

moongose.connect("mongodb://localhost/yelp_camp_v3")
app.set('port', process.env.PORT || 3000);
app.set("view engine", "ejs");
seedDB();.PORT || 3000);

//================Middleware===========================

app.use(bodyParser.urlencoded({extended: true}));

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
        res.render("index.ejs",{campgrounds: allCampgrounds})

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
            res.redirect('campgrounds')
        }
    });  
});

//==========New - show form to create new campgrounds======================

app.get('/campgrounds/new', function(req, res){
    res.render('new');
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
                 res.render("shows", {campground: foundCampground});
           }
       });
});

//============================Start the server=============================

app.listen(app.get('port'), () => {
     console.log('The Server YelpCamp on Port 3000')
})
