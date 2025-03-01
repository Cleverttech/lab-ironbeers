const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials')

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.hbs');
});
app.get('/beers', (req, res) => {
  punkAPI.getBeers()
   .then((beersObj)=>{
    //  console.log(beersObj)
    res.render('beers.hbs', {allBeers : beersObj});
   })
   .catch((error)=>{
    console.log(error)
   })

});
app.get('/beers/beer-:id',(req, res)=>{
  punkAPI.getBeer(req.params.id)
  .then((beersObj)=>{
    res.render('beerDetails.hbs', {beersObj} )
  })
  .catch((error)=>{
    console.log(error)
   })
  
})
app.get('/random-beers', (req, res) => {
  punkAPI.getRandom()
  .then((beersObj)=>{
   res.render('random-beers.hbs', {random: beersObj});
  })
  .catch((error)=>{
    console.log(error)
  })

});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
