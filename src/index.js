import Calculator from './scripts/calculator';
//const Calculator = require("./scripts/calculator");
document.addEventListener('DOMContentLoaded', () => {
    const goalsForm = document.querySelector('.goals-form');
    console.log("DOM Content Loaded");
    console.log(goalsForm);
    new Calculator(goalsForm);
});

// const apiRequest = (query = 'curry') => {
//     fetch(`/api/food-database/v2/parser?searchTerm=${encodeURIComponent(query)}`)
//       .then(res => res.json())
//       .then(data => {
//         console.log(data);
//       })
//   }