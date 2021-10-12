import Calculator from './scripts/calculator';
import Foods from './scripts/foods';
//const Calculator = require("./scripts/calculator");
// const apiRequest = (query = 'taco') => {
//     const urlStart = 'https://api.edamam.com/api/food-database/v2/parser';
//     const app_key = ; // from .env (dev) or Heroku
//     const app_id = ; // from .env (dev) or Heroku
//     const ingr = query; // from query string
//     const url = `${urlStart}?app_id=${app_id}&app_key=${app_key}&ingr=${ingr}`;
//     fetch(url)
//       .then(res => res.json())
//       .then(data => {
//         console.log(data);
//       });
// };

document.addEventListener('DOMContentLoaded', () => {
    const goalsForm = document.querySelector('.goals-form');
    // console.log("DOM Content Loaded");
    // console.log(goalsForm);
    new Calculator(goalsForm);
    const foods = new Foods();
    console.log(foods.meals);
});



// const apiRequest = (query = 'curry') => {
//     fetch(`/api/food-database/v2/parser?searchTerm=${encodeURIComponent(query)}`)
//       .then(res => res.json())
//       .then(data => {
//         console.log(data);
//       })
//   }