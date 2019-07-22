
var express = require('express');
    router  = express.Router();
    Campgrounds =require('../models/campgrounds')


//================Index - all campgrounds from DB====================

router.get('/campgrounds', function (req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
      if(err){
          console,log(err)
      } else {
        res.render("campgrounds/index",{campgrounds: allCampgrounds, currentUser: req.user});

      }
    });
});

//==============Create a new campgrounds=============================

router.post('/campgrounds', function(req, res){
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

router.get('/campgrounds/new', isLoggedIn, function(req, res){
    res.render('campgrounds/new');
});

//=======Show - shows more info about one campgrounds==========

router.get('/campgrounds/:id', function (req, res){
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
router.put('campgrounds/:id', function(req, res){
    //find and update the  correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
      if(err){
          res.redirect('/campgrounds');
      } else {
          res.redirect('/campgrounds/' + req.params.id);
      }
    })
})

//edit campground route
router.get('/campgrounds/:id/edit', function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.render('/campgrounds')
        }else{
            res.render('campgrounds/edit',{campground: foundCampground})

        }
    })
})
//update campgrounds route

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
}

module.exports = router