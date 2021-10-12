const express = require('express'); // web framework
const fetch = require('node-fetch'); // for making AJAX requests
const path = require('path');

// put environmental variables defined in .env file on process.env
require('dotenv').config(); 

const app = express();

// serve files / assets from the dist folder
app.use(express.static('dist')); 

// in response to `GET /` requests, send the file `dist/index.html`
app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/dist/index.html`);
});

// Heroku sets process.env.PORT in production; use 8000 in dev
const PORT = process.env.PORT || 8000;
// start up a server listening at PORT; on success, log a message
app.listen(PORT, () => {
  console.log(`Listening at localhost:${PORT}`);
});

app.get('/api/food', (request, response) => {
    const urlStart = 'https://api.edamam.com/api/food-database/v2/parser';
    const app_key = process.env.APP_KEY; // from .env (dev) or Heroku
    const app_id = process.env.APP_ID; // from .env (dev) or Heroku
    const ingr = request.query.searchTerm; // from query string
    const url = `${urlStart}?app_id=${app_id}&app_key=${app_key}&ingr=${ingr}`;
  
    console.log(`Fetching: ${url}`);
  
    fetch(url) // AJAX request to API
      .then(apiResponse => apiResponse.json())
      .then(data => response.send(data))
      .catch(error => response.send(error));
  });