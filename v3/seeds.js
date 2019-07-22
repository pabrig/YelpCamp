var mongoose   = require('mongoose');
    Campground = require('./models/campgrounds');
    Comment    = require('./models/comment')

var data = [
     {
         name: 'Cloud´s rest',
         image:'https://pixabay.com/get/57e8d7444251ae14f6da8c7dda793f7f1636dfe2564c704c732e7cd69348c05b_340.jpg',
         description: ' bla bla bla bla '
     },
     {
        name: 'MOtor HOme',
        image:'https://pixabay.com/get/57e8dc414e5ba814f6da8c7dda793f7f1636dfe2564c704c732e7cd69348c05b_340.jpg',
        description: ' bla bla bla bla '
    },
    {
        name: 'Ice´s rest',
        image:'https://pixabay.com/get/55e4d5454b51ab14f6da8c7dda793f7f1636dfe2564c704c732e7cd69348c05b_340.jpg',
        description: ' bla bla bla bla '
    },
    {
        name: 'Airstream campground',
        image:'https://pixabay.com/get/57e3d04a4b51a914f6da8c7dda793f7f1636dfe2564c704c732e7cd69348c05b_340.jpg',
        description: ' bla bla bla bla '
    }
]

    

function seedDB(){
    //remove all campgrounds
  Campground.remove({}, function (err) {
     if(err){
        console.log(err);
     }
     console.log('Remove campgrounds')
    });
      //add a few campgrounds
   data.forEach(function(seed){
    Campground.create(seed, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            console.log('added a campground');
            //create a comment
            Comment.create({
                text: 'This place is great, but i wish thre was internet',
                author: 'Hommer'
            }, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campgrounds.comments.push(comment),
                    campgrounds.save(),
                    console.log('Create new comment')
                }
              
            })
        }         
    
     })      
    });
  };   
  
//  add a few comments
  
module.exports = seedDB