var mongoose   = require('mongoose');
    Campground = require('./models/campgrounds');
    Comment    = require('./models/comment')

var data = [
     {
         name: 'Cloud´s rest',
         image:'https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732d7fd49448c559_340.jpg',
         description: ' En 1994, la compañía 20th Century Fox y la productora Lauren Shuler Donner compraron los derechos cinematográficos de X-Men.2​ Andrew Kevin Walker fue contratado para escribir el guion3​ y James Cameron expresó su interés en dirigir la película. Sin embargo, en julio de 1996, fue contratado Bryan Singer como director y, aunque no era fan del cómic, estaba fascinado por las analogías de los prejuicios y la discriminación que ofrece.2​ Finalmente, John Logan, Joss Whedon,4​ Ed Solomon, Christopher McQuarrie y David Hayter escribieron el guion, aunque solo este último apareció en los créditos.2​ El rodaje tuvo lugar del 22 de septiembre de 1999 al 3 de marzo de 2000 en Toronto , Canadá.5​'
         
     },
     {
        name: 'MOtor HOme',
        image:'https://pixabay.com/get/57e3d04a4b51a914f6da8c7dda793f7f1636dfe2564c704c732d79d2964cc15c_340.jpg',
        description: "En julio de 2013, Jeff Wadlow fue contratado para escribir y dirigir una adaptación cinematográfica de la serie de cómics X-Force de X-Men, con Lauren Shuler Donner. Mark Millar, el consultor creativo de películas de Marvel Comics de 20th Century Fox, dijo que la película contará con cinco personajes como protagonistas. Después de la liberación de Deadpool, Ryan Reynolds dijo que Deadpool aparecería en la película. En mayo de 2016, Simon Kinberg estaba en el proceso de reescribir el guion. En febrero de 2017, Joe Carnahan había firmado como director, así como co-escritor con Reynolds. "    },
    {
        name: 'Ice´s rest',
        image:'https://pixabay.com/get/57e8d7444251ae14f6da8c7dda793f7f1636dfe2564c704c732d79d2964cc15c_340.jpg',
        description: ' Kinberg afirmó que 20th Century Fox se ha centrado en desarrollar ideas para futuros equipos basados en mutantes que podrían expandir la serie de películas. Añadió que Laura Kinney / X-23, Alpha Flight y Exiles están en desarrollo para futuros proyectos. '
    },
    {
        name: 'Airstream campground',
        image:'https://pixabay.com/get/55e9d043485baa14f6da8c7dda793f7f1636dfe2564c704c732d79d2964cc15c_340.jpg',
        description: ' En septiembre de 2015, Kinberg dijo que una secuela de Deadpool estaba en desarrollo. Después del estreno de Deadpool, Fox dio luz verde a la secuela, con Rheese y Wernick volviendo como escritores, y David Leitch siendo el nuevo director, tras la salida de Miller. En febrero de 2016 se confirmó la secuela de Deadpool. Al parecer, la secuela de Deadpool ya está siendo preparada. Ryan Reynolds declaró que ya se estaría preparando el guion.18​ '
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