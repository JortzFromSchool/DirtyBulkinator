class Foods {
    constructor () {
        this.foodsObject = this.apiRequest("Wendy's");
        setTimeout(() => {
            console.log(this.foodsObject);
            this.addItems(this.foodsObject);
        }, 500);
    }

    apiRequest(query) {
        const urlStart = 'https://api.edamam.com/api/food-database/v2/parser';
        
        const ingr = query; // from query string
        const url = `${urlStart}?app_id=${app_id}&app_key=${app_key}&ingr=${ingr}`;
        fetch(url)
          .then(res => res.json())
          .then(data => {
            this.foodsObject = data["hints"]
            console.log(this.foodsObject);
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
        };
    };
}

module.exports = Foods;