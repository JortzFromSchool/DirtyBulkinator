//grabbing DOM elements to calculate Calories, Protein and Fats

const goalsForm = document.querySelector('.goals-form');
const sexInput = document.querySelector('input[name="sex"]');
const goalInput = document.querySelector('input[name="goal"]');
const activityInput = document.querySelector('input[name="activity-level"]');
const weightInput = document.querySelector('input[name="weight"]');
const heightInput = document.querySelector('input[name="height"]');
const ageInput = document.querySelector('input[name="age"]');

function handleSubmit(e) {
    e.preventDefault();
    calculateMacros(sexInput.value, goalInput.value, activityInput.value, weightInput.value, heightInput.value, ageInput.value);
};

function calculateMacros(sex, goal, activity, weight, height, age) {
//needs to manipulate the values already on the page. Make them inputs?
 console.log(sex);
 console.log(goal);
 console.log(activity);
 console.log(weight);
 console.log(height);
 console.log(age);
};

goalsForm.addEventListener('submit', handleSubmit);