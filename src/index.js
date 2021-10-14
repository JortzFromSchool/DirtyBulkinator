import Calculator from './scripts/calculator';
import Chart from './scripts/chart';
import Foods from './scripts/foods';

document.addEventListener('DOMContentLoaded', () => {
    const goalsForm = document.querySelector('.goals-form');
    const calculator = new Calculator(goalsForm);
    const foods = new Foods();
    const chart = new Chart(foods, calculator);
    foods.loadChart(chart);
});
