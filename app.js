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
   .then((success)=>{
    //  console.log(success)
    res.render('beers.hbs', {allBeers : success});
   })
   .catch((fail)=>{

   })

});
app.get('/random-beers', (req, res) => {
  punkAPI.getRandom()
  .then((success)=>{
   //  console.log(success)
   res.render('random-beers.hbs', {random: success});
  })
  .catch((fail)=>{

  })

 
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
