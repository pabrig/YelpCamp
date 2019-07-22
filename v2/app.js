 var express    = require ('express'),
     app        = express(),
     bodyParser = require('body-parser'),
     moongose   = require('mongoose'),
     ejs        = require ('ejs')

//==================Settings===========================

moongose.connect("mongodb://localhost/yelp_camp")
app.set('port', process.env.PORT || 3000);
app.set("view engine", "ejs");


//=================Schema Setup=======================
var campgroundSchema = new moongose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = moongose.model("Campground", campgroundSchema);

// Campground.create (
//     {         name: "Granite Hill", 
//               image:"https://farm1.staticflickr.com/82/225912054_690e32830d.jpg",
//               description:"This is a huge granite hill, no bathrooms, no water, Beatiful granite"

// }, function (err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Newly created campground:  ");
//         console.log(campground);
//     }
// });





//     var campgrounds = [
//          {name: "Salmon Creek", image:"https://farm4.staticflickr.com/3911/14707566622_af236f9b65.jpg"},
//          {name: "Granite Hill", image:"https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
//          {name: "Mountain Goat,s Rest", image:"https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg"},
//          {name: "Mountain Nigth", image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
// ];

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
            res.redirect('/campgrounds')
        }
    });  
});
//==========New - show form to create new campgrounds======================
app.get('/campgrounds/new', function(req, res){
    res.render('new.ejs');
});
//=======Show - shows more info about one campgrounds==========
app.get('/campgrounds/:id', function (req, res){
       //find the campground with provided ID
       Campground.findById(req.params.id, function(err, foundCampgorund){
           if(err){
               console.log(err);
           } else {
                //render show template with that campground
                 res.render("shows.ejs", {campground: foundCampgorund});
           }
       });
});

//============================Start the server=============================

app.listen(app.get('port'), () => {
     console.log('The Server YelpCamp on Port 3000')
})
