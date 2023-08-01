
// NAVIGATION BUTTONS

$("#nav1").on("click", function() {
    $("#nav1").addClass("active");
    $("#nav2").removeClass("active");
    $("#nav3").removeClass("active");
    $("#nav4").removeClass("active");
    $("#nav5").removeClass("active");

    $("#page1").removeClass("d-none");
    $("#page2").addClass("d-none");
    $("#page3").addClass("d-none");
    $("#page4").addClass("d-none");
    $("#page5").addClass("d-none");
    
    $("#dropdown-row").removeClass("d-none");
});

$("#nav2").on("click", function() {
    $("#nav1").removeClass("active");
    $("#nav2").addClass("active");
    $("#nav3").removeClass("active");
    $("#nav4").removeClass("active");
    $("#nav5").removeClass("active");

    $("#page1").addClass("d-none");
    $("#page2").removeClass("d-none");
    $("#page3").addClass("d-none");
    $("#page4").addClass("d-none");
    $("#page5").addClass("d-none");

    $("#dropdown-row").removeClass("d-none");
});

$("#nav3").on("click", function() {
    $("#nav1").removeClass("active");
    $("#nav2").removeClass("active");
    $("#nav3").addClass("active");
    $("#nav4").removeClass("active");
    $("#nav5").removeClass("active");

    $("#page1").addClass("d-none");
    $("#page2").addClass("d-none");
    $("#page3").removeClass("d-none");
    $("#page4").addClass("d-none");
    $("#page5").addClass("d-none");

    $("#dropdown-row").removeClass("d-none");
});

$("#nav4").on("click", function() {
    $("#nav1").removeClass("active");
    $("#nav2").removeClass("active");
    $("#nav3").removeClass("active");
    $("#nav4").addClass("active");
    $("#nav5").removeClass("active");
    
    $("#page1").addClass("d-none");
    $("#page2").addClass("d-none");
    $("#page3").addClass("d-none");
    $("#page4").removeClass("d-none");
    $("#page5").addClass("d-none");

    $("#dropdown-row").addClass("d-none");
});

$("#nav5").on("click", function() {
    $("#nav1").removeClass("active");
    $("#nav2").removeClass("active");
    $("#nav3").removeClass("active");
    $("#nav4").removeClass("active");
    $("#nav5").addClass("active");
    
    $("#page1").addClass("d-none");
    $("#page2").addClass("d-none");
    $("#page3").addClass("d-none");
    $("#page4").addClass("d-none");
    $("#page5").removeClass("d-none");
    
    $("#dropdown-row").addClass("d-none");
});


// STORE TRENDS DATA
const dropdown = document.getElementById('store-dropdown');
const option = document.createElement('option');

// PLOTLY CONFIG
const plotConfig = {displayModeBar: false, responsive: true}

// TRENDING & SEASONAL DATA
d3.json("/../../../Data/all_store_trend_seasonal.json").then(function (data) {

    // SECOND DATASET
    d3.json("/../../../Data/pca_results.json").then(function (data_2) {

        // PROPHET 45 PREDICTIONS
        d3.json("/../../../Data/Prophet 45.json").then(function (data_3) {

            // STORE CLUSTERING
            d3.json("/../../../Data/store_sales_clusters.json").then(function (data_4) {

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

                    // TREND & SEASONAL VALUES
                    var Dates = data["Store_"+Number+"_Trend"]["Date"];
                    var Trend = data["Store_"+Number+"_Trend"]["Trend"];
                    var Seasonal = data["Store_"+Number+"_Seasonal"]["Seasonal"];
                    var HoverText = "Sales: %{y:,.2f}<extra></extra>"

                    // TREND CHART
                    var chart1Data = [{
                        x: Dates,
                        y: Trend,
                        hovertemplate: HoverText,
                    }];
                    var layout1 = {
                        title: "Store " + Number + " — Trending",
                        font: {color: "#ffffff"},
                        paper_bgcolor: 'rgba(0,0,0,0.05)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                    };
                    TrendChart = Plotly.newPlot("trend-chart", chart1Data, layout1, plotConfig)

                    // SEASONALITY CHART
                    var chart2Data = [{
                        x: Dates,
                        y: Seasonal,
                        hovertemplate: HoverText,
                    }];
                    var layout2 = {
                        title: "Store " + Number + " — Seasonality",
                        font: {color: "#ffffff"},
                        paper_bgcolor: 'rgba(0,0,0,0.05)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                    };
                    SeasonalityChart = Plotly.newPlot("seasonality-chart", chart2Data, layout2, plotConfig)


                    // PREDICTIONS CHART
                    var predDates = data_3[Number - 1]["Forecast"]["Dates"]
                    var predUpper = data_3[Number - 1]["Forecast"]["Upper_Bound"]
                    var predLower = data_3[Number - 1]["Forecast"]["Lower_Bound"]
                    var predSales = data_3[Number - 1]["Forecast"]["Weekly_Sales"]


                    var chart3_trace1 = {
                        x: predDates,
                        y: predSales,
                        showlegend: false,
                        line: {width:1},
                        hovertemplate: 'Sales: %{y:,.2f}<extra></extra>',
                    };
                    
                    var chart3_trace2 = {
                        x: predDates.concat([...predDates].reverse()),
                        y: predUpper.concat([...predLower].reverse()),
                        fill: "tozerox", 
                        fillcolor: "rgba(0,176,246,0.2)", 
                        line: {color: "transparent"}, 
                        type: "scatter",
                        showlegend: false,
                        hoverinfo: "skip",
                    };

                    var chart3_trace3 = {
                        x: predDates,
                        y: predUpper,
                        hovertemplate: 'Upper Range: %{y:,.2f}<extra></extra>',
                        line: {color: "transparent"},
                        showlegend: false,
                    }

                    var chart3_trace4 = {
                        x: predDates,
                        y: predLower,
                        hovertemplate: 'Lower Range: %{y:,.2f}<extra></extra>',
                        line: {color: "transparent"},
                        showlegend: false,
                    }

                    var layout3 = {
                        title: "Store " + Number + " — Predictions",
                        font: {color: "#ffffff"},
                        paper_bgcolor: 'rgba(0,0,0,0.05)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        xaxis: {range: ["2012-10-26", "2013-10-26"]},
                        autosize: true,
                    };

                    var chart3_data = [chart3_trace1, chart3_trace2, chart3_trace3, chart3_trace4];

                    PredictionsChart = Plotly.newPlot("predictions-chart", chart3_data, layout3, plotConfig);


                    // PCA CHART
                    PCA_weekly_sales_array = []
                    for (let i = 0; i < data_2["Store_"+Number].length; i++){
                        PCA_weekly_sales_array.push((data_2["Store_"+Number][i]["Weekly_Sales"]/10000).toFixed(5))
                    }
                    PCA_holiday_flag_array = []
                    for (let i = 0; i < data_2["Store_"+Number].length; i++){
                        PCA_holiday_flag_array.push(data_2["Store_"+Number][i]["Holiday_Flag"]*100)
                    }
                    PCA_temperature_array = []
                    for (let i = 0; i < data_2["Store_"+Number].length; i++){
                        PCA_temperature_array.push(data_2["Store_"+Number][i]["Temperature"])
                    }
                    PCA_fuel_price_array = []
                    for (let i = 0; i < data_2["Store_"+Number].length; i++){
                        PCA_fuel_price_array.push(data_2["Store_"+Number][i]["Fuel_Price"]*10)
                    }
                    PCA_cpi_array = []
                    for (let i = 0; i < data_2["Store_"+Number].length; i++){
                        PCA_cpi_array.push(data_2["Store_"+Number][i]["CPI"])
                    }
                    PCA_unemployment_array = []
                    for (let i = 0; i < data_2["Store_"+Number].length; i++){
                        PCA_unemployment_array.push(data_2["Store_"+Number][i]["Unemployment"])
                    }

                    var PCA_layout = {
                        title: "Store " + Number + " — PCA",
                        font: {color: "#ffffff"},
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        showlegend: true,
                        legend :{"orientation": "h"},
                        // height: 800,
                        // width: 1200,
                        autorange: true,
                        range: [1433481696661.8, 1465979903338.2],
                    };
                    var PCA_weekly_sales_plot = [{
                        x: data_2["Store_"+Number].length,
                        y: PCA_weekly_sales_array,
                        name: "Weekly Sales (x $10,000)",
                        line: {
                            color: 'rgb (252, 186, 3)',
                            width:2
                        }
                    }];
                    var PCA_holiday_flag_plot = [{
                        x: data_2["Store_"+Number].length,
                        y: PCA_holiday_flag_array,
                        name: "Holiday Flag",
                        line: {
                            color: 'rgb (64, 173, 52)',
                            width:2
                        }
                    }];
                    var PCA_temperature_plot = [{
                        x: data_2["Store_"+Number].length,
                        y: PCA_temperature_array,
                        name: "Temperature (Fahrenheit)",
                        line: {
                            color: 'rgb (26, 55, 171)',
                            width:2
                        }
                    }];
                    var PCA_fuel_price_plot = [{
                        x: data_2["Store_"+Number].length,
                        y: PCA_fuel_price_array,
                        name: "Fuel Price per 10 Gallon",
                        line: {
                            color: 'rgb (108, 178, 186)',
                            width:2
                        }
                    }];
                    var PCA_cpi_plot = [{
                        x: data_2["Store_"+Number].length,
                        y: PCA_cpi_array,
                        name: "CPI",
                        line: {
                            color: 'rgb (131, 34, 163)',
                            width:2
                        }
                    }];
                    var PCA_unemployment_plot = [{
                        x: data_2["Store_"+Number].length,
                        y: PCA_unemployment_array,
                        name: "Unemployment rate",
                        line: {
                            color: 'rgb (227, 9, 34)',
                            width:2
                        }
                    }];

                    Plotly.newPlot("pca-chart",PCA_weekly_sales_plot, PCA_layout, plotConfig)
                    Plotly.addTraces("pca-chart",PCA_temperature_plot)
                    Plotly.addTraces("pca-chart",PCA_holiday_flag_plot)
                    Plotly.addTraces("pca-chart",PCA_unemployment_plot)
                    Plotly.addTraces("pca-chart",PCA_fuel_price_plot)
                    Plotly.addTraces("pca-chart",PCA_cpi_plot)

                }; // EVENT CHANGE
       
                // AUTOMATICALLY LOAD STORE 1
                ChangeCharts(1);

                // SOLVE PROBLEM OF CHARTS NOT RE-SIZING OFF SCREEN
                $("#nav1").on("click", function() {
                    ChangeCharts(dropdown.value)
                });
                $("#nav2").on("click", function() {
                    ChangeCharts(dropdown.value)
                });
                $("#nav3").on("click", function() {
                    ChangeCharts(dropdown.value)
                });

            });// DATA 4
        }); // DATA 3
    }); // DATA 2
}); // DATA 1





// MODEL RESULTS
// IF YOU'RE READING THIS, WE MANUALLY GENERATED THE CHARTS BECAUSE ALL THE DATAPOINTS WERE 1.

var modelData = [{
    x: Array(45).fill().map((element, index) => index + 1),
    y: Array(45).fill(1),
    type: "bar",
    hovertemplate: "Store %{x}<br>Score: %{y:,.2f}<extra></extra>",
}];

var modelLayout1 = {
    title: "Accuracy for each store",
    font: {color: "#ffffff"},
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    xaxis: {title:"Store Number"},
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


model_chart_1 = Plotly.newPlot("model_chart1", modelData, modelLayout1, plotConfig)
model_chart_2 = Plotly.newPlot("model_chart2", modelData, modelLayout2, plotConfig)
model_chart_3 = Plotly.newPlot("model_chart3", modelData, modelLayout3, plotConfig)
model_chart_4 = Plotly.newPlot("model_chart4", modelData, modelLayout4, plotConfig)








