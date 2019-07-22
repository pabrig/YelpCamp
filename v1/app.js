const express = require ('express');
const app = express();
const bodyParser = require('body-parser');

//==================Settings===========================

app.set('port', process.env.PORT || 3000);
app.set("view engine", "ejs");
const campgrounds = [
    {name: "Salmon Creek", image:"https://farm4.staticflickr.com/3911/14707566622_af236f9b65.jpg"},
    {name: "Granite Hill", image:"https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
    {name: "Mountain Goat,s Rest", image:"https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg"},
    {name: "Mountain Nigth", image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
];

//================Middleware===========================

app.use(bodyParser.urlencoded({extended: true}));

//==================Routes=============================

app.get('/', function (req, res) {
    res.render("landing");
});

app.get('/campgrounds', function (req, res) {
      res.render("campgrounds",{campgrounds: campgrounds})
});

app.post('/campgrounds', function(req, res){
    res.send('you hit the post route')
    //get data from form and add to campgrounds array
    const name = req.body.name;
    const image =  req.body.image;
    const newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    //rederict back to campgrounds page
    res.redirect('/campgrounds');
})

app.get('/campgrounds/new', function(req, res){
    res.render('new.ejs');
});
//============================Start the server=============================

app.listen(app.get('port'), () => {
     console.log('The Server YelpCamp on Port 3000')
});
