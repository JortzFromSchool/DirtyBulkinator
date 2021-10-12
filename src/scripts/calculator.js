//grabbing DOM elements to calculate Calories, Protein and Fats

class Calculator {
    constructor(goalsForm){
        this.goalsForm = goalsForm;
        this.gain = 0;
        this.maintenance = 0;
        this.loss = 0;
        this.protein = 0; //grams
        this.fat = 0; //grams
        this.carbsGain = 0; //grams
        this.carbsMaintenance = 0; //grams
        this.carbsLoss = 0; //grams
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.generateCalories = this.generateCalories.bind(this);
        this.generateMacros = this.generateMacros.bind(this);
        this.bindEvents();
    }

    handleSubmit(e) {
        e.preventDefault();
        const sexInput = document.querySelector('input[name="sex"]');
        // const goalInput = document.querySelector('input[name="goal"]');
        const activityInput = document.querySelector('input[name="activity-level"]');
        const weightInput = document.querySelector('input[name="weight"]');
        const heightInput = document.querySelector('input[name="height"]');
        const ageInput = document.querySelector('input[name="age"]');    
        const bmr = this.calculateBMR(sexInput.value, activityInput.value, weightInput.value, heightInput.value, ageInput.value);
        //console.log(bmr);
        this.generateCalories(bmr);
        this.generateMacros(weightInput.value);
    }

    handleClick(e) {
        const el = e.target;
        //console.log(`el=${el}`);
        if (el.type === "radio") {
            let input = document.querySelector(`input[name="${el.name}"]`);
            input.value = el.value;
            //console.log(`el.value=${el.value}`);
            //console.log(`input.value=${input.value}`);
        };
    }

    calculateBMR(sex, activity, weight, height, age) {
    //needs to manipulate the values already on the page. Make them inputs?
        let bmr = 0;
        // console.log(`sex=${sex}`);
        // console.log(`activity=${activity}`);
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

    generateCalories(bmr){
        const gainLi = document.querySelector('.TDEEgain');
        const maintLi = document.querySelector('.TDEEmaintenance');
        const lossLi = document.querySelector('.TDEEloss');

        this.gain = Math.floor(bmr * 1.15);
        this.maintenance = Math.floor(bmr);
        this.loss = Math.floor(bmr * 0.85);
        
        gainLi.innerText = `Weight Gain: ${this.gain} calories/day`
        maintLi.innerText = `Maintenance: ${this.maintenance} calories/day`
        lossLi.innerText = `Fat Loss: ${this.loss} calories/day`
    }

    generateMacros(weight, bmr) {
        const proteinLi = document.querySelector('.protein');
        const fatLi = document.querySelector('.fat');
        const carbsGainLi = document.querySelector('.carbs-gain');
        const carbsMaintenanceLi = document.querySelector('.carbs-maintenance');
        const carbsLossLi = document.querySelector('.carbs-loss');

        this.protein = Math.floor((weight * 2.2) * 0.9);
        this.fat = Math.floor((weight * 2.2) * 0.3);

        const proteinCals = this.protein * 4; //conversion grams to calories
        const fatCals = this.fat * 9; //conversion grams to calories
        //carb calories from remaining calories after subtracting fat and protein
        const carbsGainCals = (this.gain - proteinCals) - fatCals; 
        const carbsMaintenanceCals = (this.maintenance - proteinCals) - fatCals;
        const carbsLossCals = (this.loss - proteinCals) - fatCals;

        // conversion to grams
        this.carbsGain = Math.floor(carbsGainCals/4);
        this.carbsMaintenance = Math.floor(carbsMaintenanceCals/4);
        this.carbsLoss = Math.floor(carbsLossCals/4);

        proteinLi.innerText = `Protein: ${this.protein} grams/day`;
        fatLi.innerText = `Fat: ${this.fat} grams/day`;
        carbsGainLi.innerText = `Carbohydrates (gain): ${this.carbsGain} grams/day`;
        carbsMaintenanceLi.innerText = `Carbohydrates (maintenance): ${this.carbsMaintenance} grams/day`;
        carbsLossLi.innerText = `Carbohydrates (loss): ${this.carbsLoss} grams/day`;
    }
    
    bindEvents() {
        this.goalsForm.addEventListener('submit', this.handleSubmit);
        this.goalsForm.addEventListener('click', this.handleClick);
    }
}

module.exports = Calculator;