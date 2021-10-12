class Foods {
    constructor () {
        this.baconatorObject = this.baconatorRequest();
        this.foodsObject = this.apiRequest("Wendy's");
        setTimeout(() => {
            console.log(this.baconatorObject);
            this.addBaconator(this.baconatorObject);
        }, 500);
        setTimeout(() => {
            console.log(this.foodsObject);
            this.addItems(this.foodsObject);
        }, 500);
        this.meals = [];
    }

    apiRequest(query) {
        const urlStart = 'https://api.edamam.com/api/food-database/v2/parser';
        const app_key = '1420390596fb9a1e4254465c9d22ac3c'; // from .env (dev) or Heroku
        const app_id = '0ba1ed84'; // from .env (dev) or Heroku
        const ingr = query; // from query string
        const url = `${urlStart}?app_id=${app_id}&app_key=${app_key}&ingr=${ingr}`;
        fetch(url)
          .then(res => res.json())
          .then(data => {
            this.foodsObject = data["hints"]
            console.log(this.foodsObject);
          });
    };

    baconatorRequest(query = 'baconator') {
        const urlStart = 'https://api.edamam.com/api/food-database/v2/parser';
        const app_key = '1420390596fb9a1e4254465c9d22ac3c'; // from .env (dev) or Heroku
        const app_id = '0ba1ed84'; // from .env (dev) or Heroku
        const ingr = query; // from query string
        const url = `${urlStart}?app_id=${app_id}&app_key=${app_key}&ingr=${ingr}`;
        fetch(url)
          .then(res => res.json())
          .then(data => {
            let baconator = {};
            baconator['name'] = 'BACONATOR';
            baconator['calories'] = Math.floor(data['hints'][0]['food']['nutrients']['ENERC_KCAL']);
            baconator['fat'] = Math.floor(data['hints'][0]['food']['nutrients']['FAT']);
            baconator['protein'] = Math.floor(data['hints'][0]['food']['nutrients']['PROCNT']);
            console.log(baconator);
            this.baconatorObject = baconator;
          });
    };

    addItems(foods) {
        const mealUl = document.querySelector('ul.meal-list');
        console.log("in addItems");
        for(let i = 0; i < 13; i++){
            if(i === 8) {continue;} //skip iced tea
            const newLi = document.createElement('li');
            const calsLi = document.createElement('li');
            calsLi.innerText = foods[i]['food']['nutrients']['ENERC_KCAL'];
            calsLi.innerText += " calories";
            newLi.innerText = foods[i]['food']['label'];
            newLi.append(calsLi);
            mealUl.append(newLi);

            //build object for instance variable
            let food = {};
            food['name'] = foods[i]['food']['label'];
            food['calories'] = Math.floor(foods[i]['food']['nutrients']['ENERC_KCAL']);
            food['fat'] = Math.floor(foods[i]['food']['nutrients']['FAT']);
            food['protein'] = Math.floor(foods[i]['food']['nutrients']['PROCNT']);
            this.meals.push(food);

        };
    };

    addBaconator(baconator) {
        console.log("in addBaconator");
        console.log(baconator);
        const mealUl = document.querySelector('ul.meal-list');
        const newLi = document.createElement('li');
        const calsLi = document.createElement('li');
        calsLi.innerText = baconator['calories'];
        calsLi.innerText += " calories";
        newLi.innerText = baconator['name'];
        newLi.append(calsLi);
        mealUl.append(newLi);
        this.meals.push(baconator);
    };
}

module.exports = Foods;