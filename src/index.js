import Calculator from './scripts/calculator';
import Chart from './scripts/chart';
import Foods from './scripts/foods';

document.addEventListener('DOMContentLoaded', () => {
    const goalsForm = document.querySelector('.goals-form');
    // console.log("DOM Content Loaded");
    // console.log(goalsForm);
    const calculator = new Calculator(goalsForm);
    const foods = new Foods();
    const chart = new Chart(foods, calculator);
    foods.loadChart(chart);
});



// const apiRequest = (query = 'curry') => {
//     fetch(`/api/food-database/v2/parser?searchTerm=${encodeURIComponent(query)}`)
//       .then(res => res.json())
//       .then(data => {
//         console.log(data);
//       })
//   }