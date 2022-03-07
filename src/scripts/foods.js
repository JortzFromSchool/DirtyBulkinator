class Foods {
    constructor () {
        this.handleReset = this.handleReset.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.baconatorObject = this.baconatorRequest();
        this.foodsObject = this.apiRequest("Wendy's");
        setTimeout(() => {
            this.addBaconator(this.baconatorObject);
        }, 500);
        setTimeout(() => {
            this.addItems(this.foodsObject);
            this.addReset();
        }, 500);
        this.meals = [];
    }

    apiRequest(query) {
        const urlStart = 'https://api.edamam.com/api/food-database/v2/parser';
        const app_key = '1420390596fb9a1e4254465c9d22ac3c';
        const app_id = '0ba1ed84';
        const ingr = query;
        const url = `${urlStart}?app_id=${app_id}&app_key=${app_key}&ingr=${ingr}`;
        fetch(url)
          .then(res => res.json())
          .then(data => {
            this.foodsObject = data["hints"];
          });
    };

    baconatorRequest(query = 'baconator') {
        const urlStart = 'https://api.edamam.com/api/food-database/v2/parser';
        const app_key = '1420390596fb9a1e4254465c9d22ac3c';
        const app_id = '0ba1ed84';
        const ingr = query;
        const url = `${urlStart}?app_id=${app_id}&app_key=${app_key}&ingr=${ingr}`;
        fetch(url)
          .then(res => res.json())
          .then(data => {
            let baconator = {};
            baconator['name'] = 'BACONATOR';
            baconator['carbohydrates'] = Math.floor(data['hints'][0]['food']['nutrients']['CHOCDF']);
            baconator['fat'] = Math.floor(data['hints'][0]['food']['nutrients']['FAT']);
            baconator['protein'] = Math.floor(data['hints'][0]['food']['nutrients']['PROCNT']);
            baconator['quantity'] = 0;

            this.baconatorObject = baconator;
          });
    };

    addItems(foods) {
        const mealUl = document.querySelector('ul.meal-list');
        for(let i = 0; i < 13; i++){
            if(i === 8) {continue;} //skip iced tea
            const newLi = document.createElement('li');
            const newButton = document.createElement('button');

            newButton.innerText = foods[i]['food']['label'];
            newButton.addEventListener("click", this.handleClick);
            
            newLi.append(newButton);
            mealUl.append(newLi);

            //build object for instance variable
            let food = {};
            food['name'] = foods[i]['food']['label'];
            food['carbohydrates'] = Math.floor(foods[i]['food']['nutrients']['CHOCDF']);
            food['fat'] = Math.floor(foods[i]['food']['nutrients']['FAT']);
            food['protein'] = Math.floor(foods[i]['food']['nutrients']['PROCNT']);
            food['quantity'] = 0;
            this.meals.push(food);

        };
    };

    addReset() {
        const mealUl = document.querySelector('ul.meal-list');
        const newLi = document.createElement('li');
        const newButton = document.createElement('button');
        newButton.innerText = "Reset";
        newButton.addEventListener("click", this.handleReset);
        newLi.append(newButton);
        mealUl.append(newLi);
    }

    addBaconator(baconator) {
        const mealUl = document.querySelector('ul.meal-list');
        const newLi = document.createElement('li');
        const newButton = document.createElement('button');
        
        newButton.innerText = baconator['name'];
        newButton.addEventListener("click", this.handleClick);
        
        mealUl.append(newLi);
        newLi.append(newButton);
        this.meals.push(baconator);
    };

    handleClick(e){
        const el = e.target;
        for (let i = 0; i < this.meals.length; i++){
            if (this.meals[i]['name'] === el.innerText){
                this.meals[i]['quantity'] += 1;
            };
        };
        if (this.chart) {
            this.chart.update();
        };
        this.addMealPlan();
        this.addTotalMacros();
    };

    addTotalMacros(){
        const mealMacrosUl = document.querySelector('ul.meal-plan-macros-list');
        const proteinLi = document.createElement('li');
        const fatLi = document.createElement('li');
        const carbsLi = document.createElement('li');

        let proteing = 0;
        let fatg = 0;
        let carbsg = 0;

        for(let i = 0; i< this.meals.length; i++){
            if(this.meals[i]['quantity'] > 0){
                proteing += this.meals[i]['protein'] * this.meals[i]['quantity'];
                fatg += this.meals[i]['fat'] * this.meals[i]['quantity'];
                carbsg += this.meals[i]['carbohydrates'] * this.meals[i]['quantity'];
            }
        }

        proteinLi.innerText = `${proteing} grams`;
        fatLi.innerText = `${fatg} grams`;
        carbsLi.innerText = `${carbsg} grams`;

        mealMacrosUl.append(proteinLi);
        mealMacrosUl.append(fatLi);
        mealMacrosUl.append(carbsLi);
    }

    addMealPlan(){
        //wipe previous meal plan
        const mealPlanUl = document.querySelector('ul.meal-plan-list');
        mealPlanUl.remove();

        //create new meal plan list
        const newUl = document.createElement('ul');
        newUl.setAttribute('class','meal-plan-list');
        for(let i = 0; i < this.meals.length; i++) {
            if (this.meals[i]['quantity'] > 0) {
                const newLi = document.createElement('li');
                newLi.innerText = this.meals[i]["name"] + " x " + this.meals[i]['quantity'].toString();
                newUl.append(newLi);
            };
        };

        //append to html section
        const mealPlanSection = document.querySelector('.meal-plan');
        mealPlanSection.append(newUl);
    };

    handleReset(e){
        for(let i = 0; i < this.meals.length; i++){
            this.meals[i]['quantity'] = 0;
        };
        if (this.chart) {
            this.chart.update();
        };
        this.addMealPlan();
    }

    loadChart(chart) {
        this.chart = chart;
    }

}

module.exports = Foods;