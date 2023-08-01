// NAVIGATION BUTTONS

$("#nav1").on("click", function() {
    $("#nav1").addClass("active");
    $("#nav2").removeClass("active");
    $("#nav3").removeClass("active");
    $("#nav4").removeClass("active");

    $("#page1").removeClass("d-none");
    $("#page2").addClass("d-none");
    $("#page3").addClass("d-none");
    $("#page4").addClass("d-none");
});

$("#nav2").on("click", function() {
    $("#nav1").removeClass("active");
    $("#nav2").addClass("active");
    $("#nav3").removeClass("active");
    $("#nav4").removeClass("active");

    $("#page1").addClass("d-none");
    $("#page2").removeClass("d-none");
    $("#page3").addClass("d-none");
    $("#page4").addClass("d-none");
});

$("#nav3").on("click", function() {
    $("#nav1").removeClass("active");
    $("#nav2").removeClass("active");
    $("#nav3").addClass("active");
    $("#nav4").removeClass("active");

    $("#page1").addClass("d-none");
    $("#page2").addClass("d-none");
    $("#page3").removeClass("d-none");
    $("#page4").addClass("d-none");
});

$("#nav4").on("click", function() {
    $("#nav1").removeClass("active");
    $("#nav2").removeClass("active");
    $("#nav3").removeClass("active");
    $("#nav4").addClass("active");

    $("#page1").addClass("d-none");
    $("#page2").addClass("d-none");
    $("#page3").addClass("d-none");
    $("#page4").removeClass("d-none");
});


// STORE TRENDS DATA
const dropdown = document.getElementById('store-dropdown');
const option = document.createElement('option');

// FIRST DATASET
d3.json("/../../../Data/all_store_trend_seasonal.json").then(function (data) {

    // SECOND DATASET
    d3.json("/../../../Data/all_store_trend_seasonal.json").then(function (data_2) {

        // LOAD DROPDOWN WITH STORES
        for (let i = 1; i < 46; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Store ${i}`;
            dropdown.appendChild(option);
        };

        // DETECT STORE CHANGE
        dropdown.addEventListener('change', StoreChange);
        
        // CHANGE FUNCTION
        function StoreChange() {
            const storeNumber = dropdown.value
            ChangeCharts(storeNumber);
        };

        function ChangeCharts(Number) {

            // TREND CHART
            var trace1 = [{
                x: data["Store_"+Number+"_Trend"]["Date"],
                y: data["Store_"+Number+"_Trend"]["Trend"],
                line: {width:3},
                hovertemplate: 'Sales: %{y:,.2f}<extra></extra>',
            }]
            var layout1 = {
                title: "Store " + Number + " — Trending",
                font: {color: "#ffffff"},
                paper_bgcolor: 'rgba(0,0,0,0.05)',
                plot_bgcolor: 'rgba(0,0,0,0)',
            };
            TrendChart = Plotly.newPlot("trend-chart", trace1, layout1)

            // SEASONALITY CHART
            var trace2 = [{
                x: data["Store_"+Number+"_Trend"]["Date"],
                y: data["Store_"+Number+"_Seasonal"]["Seasonal"],
                line: {width:3},
                hovertemplate: 'Sales: %{y:,.2f}<extra></extra>',
            }]
            var layout2 = {
                title: "Store " + Number + " — Seasonality",
                font: {color: "#ffffff"},
                paper_bgcolor: 'rgba(0,0,0,0.05)',
                plot_bgcolor: 'rgba(0,0,0,0)',
            };
            SeasonalityChart = Plotly.newPlot("seasonality-chart", trace2, layout2)






        }; // EVENT CHANGE

        // AUTOMATICALLY LOAD STORE 1
        ChangeCharts(1);
    }); // DATA 2
}); // DATA 1



// MODEL RESULTS
// IF YOU'RE READING THIS, WE MANUALLY GENERATED THE CHARTS BECAUSE ALL THE DATAPOINTS WERE 1.


var modelData = [{
    x: Array(45).fill().map((element, index) => index + 1),
    y: Array(45).fill(1),
    type: "bar",
}];

var modelLayout1 = {
    title: "Accuracy for each store",
    font: {color: "#ffffff"},
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
};

var modelLayout2 = {
    title: "Precision for each store",
    font: {color: "#ffffff"},
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
};

var modelLayout3 = {
    title: "Recall for each store",
    font: {color: "#ffffff"},
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
};

var modelLayout4 = {
    title: "F1-Score for each store",
    font: {color: "#ffffff"},
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
};


model_chart_1 = Plotly.newPlot("model_chart1", modelData, modelLayout1)
model_chart_2 = Plotly.newPlot("model_chart2", modelData, modelLayout2)
model_chart_3 = Plotly.newPlot("model_chart3", modelData, modelLayout3)
model_chart_4 = Plotly.newPlot("model_chart4", modelData, modelLayout4)

console.log(Array(45).fill().map((element, index) => index + 1))










