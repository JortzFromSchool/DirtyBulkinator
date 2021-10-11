//grabbing DOM elements to calculate Calories, Protein and Fats

class Calculator {
    constructor(goalsForm){
        console.log(this);
        this.goalsForm = goalsForm;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.bindEvents();
    }

    handleSubmit(e) {
        const sexInput = document.querySelector('input[name="sex"]');
        const goalInput = document.querySelector('input[name="goal"]');
        const activityInput = document.querySelector('input[name="activity-level"]');
        const weightInput = document.querySelector('input[name="weight"]');
        const heightInput = document.querySelector('input[name="height"]');
        const ageInput = document.querySelector('input[name="age"]');
        console.log(this);
        e.preventDefault();
        this.calculateMacros(sexInput.value, goalInput.value, activityInput.value, weightInput.value, heightInput.value, ageInput.value);
    }

    calculateMacros(sex, goal, activity, weight, height, age) {
    //needs to manipulate the values already on the page. Make them inputs?
    console.log(sex);
    console.log(goal);
    console.log(activity);
    console.log(weight);
    console.log(height);
    console.log(age);
    }
    
    bindEvents() {
        this.goalsForm.addEventListener('submit', this.handleSubmit);
    }
}

module.exports = Calculator;