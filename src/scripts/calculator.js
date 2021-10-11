//grabbing DOM elements to calculate Calories, Protein and Fats

class Calculator {
    constructor(goalsForm){
        this.goalsForm = goalsForm;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.bindEvents();
    }

    handleSubmit(e) {
        e.preventDefault();
        const sexInput = document.querySelector('input[name="sex"]');
        const goalInput = document.querySelector('input[name="goal"]');
        const activityInput = document.querySelector('input[name="activity-level"]');
        const weightInput = document.querySelector('input[name="weight"]');
        const heightInput = document.querySelector('input[name="height"]');
        const ageInput = document.querySelector('input[name="age"]');    
        const bmr = this.calculateBMR(sexInput.value, goalInput.value, activityInput.value, weightInput.value, heightInput.value, ageInput.value);
        console.log(bmr);
        //this.generateMacros();
    }

    handleClick(e) {
        const el = e.target;
        console.log(`el=${el}`);
        if (el.type === "radio") {
            let input = document.querySelector(`input[name="${el.name}"]`);
            input.value = el.value;
            console.log(`el.value=${el.value}`);
            console.log(`input.value=${input.value}`);
        };
    }

    calculateBMR(sex, goal, activity, weight, height, age) {
    //needs to manipulate the values already on the page. Make them inputs?
        let bmr = 0;
        console.log(`sex=${sex}`);
        console.log(`goal=${goal}`);
        console.log(`activity=${activity}`);
        // console.log(`weight=${weight}`);
        // console.log(`height=${height}`);
        // console.log(`age=${age}`);
        if (sex === "masc"){
            bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
        } else {
            bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
        };
        console.log(bmr);
        switch(activity){
            case "sedentary":
                bmr = bmr * 1.2;
                break;
            case "light":
                bmr = bmr * 1.375;
                break;
            case "moderate":
                bmr = bmr * 1.55;
                break;
            case "very":
                bmr = bmr * 1.725;
                break;
            case "extra":
                bmr = bmr * 1.9;
                break;
            default:
                console.log("default case");
        }
        return bmr;

    }
    
    bindEvents() {
        this.goalsForm.addEventListener('submit', this.handleSubmit);
        this.goalsForm.addEventListener('click', this.handleClick);
    }
}

module.exports = Calculator;