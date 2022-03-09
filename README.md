**Background**

This project serves to help users calculate personal macronutrient levels for various fitness goals in order to assemble a meal plan entirely of Wendy's items. Initially envisioned to solve the problem of bulking from a fast food menu, the calculator serves to visually demonstrate why this is so difficult when restricted to fast food meals.

[Live Link to the Dirty Bulkinator](https://jortzfromschool.github.io/DirtyBulkinator/)

**In the Wendy's Dirty Bulkinator, users can:**
- select fast food menu items sorted by different macronutrient levels
- build a meal plan from assorted Wendy's menu items
- specify macronutrient levels for their desired plan
- suggest macronutrient levels for a diet or a bulk
- a visualization of macronutrient levels for selected menu items


**Technologies, Libraries, APIs**
- d3 ris used for data visualization
- EDAMAM Nutrition Analysis API(https://developer.edamam.com/edamam-docs-nutrition-api) is the source for the nutrition facts of the Wendy's items.
- webpack is used to bundle files for the browser.
- Javascript is used for everything else.

Menu Items are parsed through an API request and then added to an array of objects:
```
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
          })
          .then(() => {this.addItems(this.foodsObjects);
    };
    
    addItems(foods) {
        const mealUl = document.querySelector('ul.meal-list');
        for(let i = 0; i < 13; i++){
            if(i === 8) {continue;} //skip iced tea
            const newLi = document.createElement('li');
            const newButton = document.createElement('button');

            newButton.innerText = foods[i]['food']['label'];
            newButton.addEventListener("click", this.handleClick);
            newButton.setAttribute('class','meal-plan-item');
            
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
    
  ```
  BMR is calculated using the Harris-Benedict Formula:
  
  ![image](https://user-images.githubusercontent.com/8568443/157524392-f4beefbd-50ff-40cc-b81c-d07cc7648b11.png)
  
  and the activity multiplier is calculated thusly:
  
  ![image](https://user-images.githubusercontent.com/8568443/157524455-8e39a089-7f70-4673-859c-b84e381fe8d9.png)
  
  Both equations were derived from [this research paper.](https://www.k-state.edu/paccats/Contents/PA/PDF/Physical%20Activity%20and%20Controlling%20Weight.pdf)
