var d3 = require("d3");

class Chart {
    constructor(foods, calculator){
        this.handleClick = this.handleClick.bind(this);
        setTimeout(() => {
            this.foodsObject = foods;
            this.calculator = calculator;
            this.createChart();
        }, 500);
    };

    createChart() {
        var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;
        //console.log(svg);
        


        var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
            yScale = d3.scaleLinear().range ([height, 0]);

        var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");
        g.attr("class", "graph");
            
        var data = this.createDataFromFoods();
        var macros = this.calculator.macros();
        //var yScaleBound = d3.max(macros, function(d) {return d;});
        console.log(macros);
        // need data for these lines
        xScale.domain(data.map(function(d) { return d.name; }));
        //yScale.domain([0, d3.max(data, function(d) { return d.value; })]);
        yScale.domain([0, d3.max(macros, function(d) { return d; })]);
        //yScale.domain([0, yScaleBound]);
    
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));
    
        g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function(d){
                return  d + "g";
            }).ticks(10))
            .append("text")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("value");

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.name); })
         .attr("y", function(d) { return yScale(d.value); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height - yScale(d.value); });

        const el = document.querySelector('.bar-chart');
        el.addEventListener("click", this.handleClick);
        el.append(g);
    };

    handleClick(e){
        const el = document.querySelector('.graph');
        el.remove();
        this.createChart();
    };

    update(){
        const el = document.querySelector('.graph');
        el.remove();
        this.createChart();
    };
    
    createDataFromFoods() {
        let result = [];
        let arr = this.foodsObject.meals;
        let protein = {name: 'protein', value: 0};
        let fat = {name: 'fat', value: 0};
        let calories = {name: 'carbohydrates', value: 0};
        for(let i = 0; i < arr.length; i++){
            protein['value'] += (arr[i]['protein'] * arr[i]['quantity']);
            fat['value'] += (arr[i]['fat'] * arr[i]['quantity']);
            calories['value'] += (arr[i]['carbohydrates'] * arr[i]['quantity']);
        };
        result.push(protein);
        result.push(fat);
        result.push(calories);
        return result;
    };

    
}

module.exports = Chart;