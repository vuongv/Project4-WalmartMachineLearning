// NAVIGATION BUTTONS

$("#nav1").on("click", function() {
    $("#nav1").addClass("active");
    $("#nav2").removeClass("active");
    $("#nav3").removeClass("active");

    $("#page1").removeClass("d-none");
    $("#page2").addClass("d-none");
    $("#page3").addClass("d-none");
});

$("#nav2").on("click", function() {
    $("#nav1").removeClass("active");
    $("#nav2").addClass("active");
    $("#nav3").removeClass("active");

    $("#page1").addClass("d-none");
    $("#page2").removeClass("d-none");
    $("#page3").addClass("d-none");
});

$("#nav3").on("click", function() {
    $("#nav1").removeClass("active");
    $("#nav2").removeClass("active");
    $("#nav3").addClass("active");

    $("#page1").addClass("d-none");
    $("#page2").addClass("d-none");
    $("#page3").removeClass("d-none");
});


// STORE TRENDS DATA

const dropdown = document.getElementById('store-dropdown');
const option = document.createElement('option');

// "C://Users//khoav//Project4-WalmartMachineLearning//Data//all_store_trend_seasonal.json"
// "/../../../Data/all_store_trend_seasonal.json"
// FIRST DATASET
d3.json("/../../../Data/all_store_trend_seasonal.json").then(function (data) {
    
    for (let i = 1; i < 46; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Store ${i}`;
        dropdown.appendChild(option);
    }

    // DETECT STORE CHANGE
    dropdown.addEventListener('change', StoreChange);
    function StoreChange(event) {
        const storeNumber = event.target.value;
        console.log(storeNumber);

        // LINE CHART
        var trace1 = [{
            x: data["Store_"+storeNumber+"_Trend"]["Date"],
            y: data["Store_"+storeNumber+"_Trend"]["Trend"],
            line: {width:3},
        }]
        var layout1 = {
            title: "Store "+storeNumber,
            font: {color: "#ffffff"},
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
        };
        Plotly.newPlot("trend-chart", trace1, layout1)
        
        var trace2 = [{
            x: data["Store_"+storeNumber+"_Trend"]["Date"],
            y: data["Store_"+storeNumber+"_Seasonal"]["Seasonal"],
            line: {width:3},
        }]
        var layout2 = {
            title: "Store "+storeNumber,
            font: {color: "#ffffff"},
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
        };
        Plotly.newPlot("seasonality-chart", trace2, layout2)
    }
    // SECOND DATASET
    d3.json("/../../../Data/pca_results.json").then(function (data_2) {


        // LOAD DROPDOWN WITH STORES
        // for (let i = 1; i < 46; i++) {
        //     const option = document.createElement('option');
        //     option.value = i;
        //     option.textContent = `Store ${i}`;
        //     dropdown.appendChild(option);
        // }

        // DETECT STORE CHANGE
        dropdown.addEventListener('change', StoreChange);
        function StoreChange(event) {
            const storeNumber = event.target.value;
            console.log(storeNumber);

            //PCA results
            PCA_weekly_sales_array = []
            for (let i = 0; i < data_2["Store_"+storeNumber].length; i++){
                PCA_weekly_sales_array.push((data_2["Store_"+storeNumber][i]["Weekly_Sales"]/10000).toFixed(5))
            }
            PCA_holiday_flag_array = []
            for (let i = 0; i < data_2["Store_"+storeNumber].length; i++){
                PCA_holiday_flag_array.push(data_2["Store_"+storeNumber][i]["Holiday_Flag"]*100)
            }
            PCA_temperature_array = []
            for (let i = 0; i < data_2["Store_"+storeNumber].length; i++){
                PCA_temperature_array.push(data_2["Store_"+storeNumber][i]["Temperature"])
            }
            PCA_fuel_price_array = []
            for (let i = 0; i < data_2["Store_"+storeNumber].length; i++){
                PCA_fuel_price_array.push(data_2["Store_"+storeNumber][i]["Fuel_Price"]*10)
            }
            PCA_cpi_array = []
            for (let i = 0; i < data_2["Store_"+storeNumber].length; i++){
                PCA_cpi_array.push(data_2["Store_"+storeNumber][i]["CPI"])
            }
            PCA_unemployment_array = []
            for (let i = 0; i < data_2["Store_"+storeNumber].length; i++){
                PCA_unemployment_array.push(data_2["Store_"+storeNumber][i]["Unemployment"])
            }
            var PCA_layout = {
                title: "Store "+storeNumber,
                font: {color: "#ffffff"},
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                showlegend: true,
                legend :{
                    x: 1,
                    y: 1,
                },
                height: 800,
                width: 1200,
                autorange: true,
                range: [
                    1433481696661.8,
                    1465979903338.2
                ]
            };

            var PCA_weekly_sales_plot = [{
                x: data_2["Store_"+storeNumber].length,
                y: PCA_weekly_sales_array,
                name: "Weekly Sales (x $10,000)",
                line: {
                    color: 'rgb (252, 186, 3)',
                    width:2
                }
            }];
            var PCA_holiday_flag_plot = [{
                x: data_2["Store_"+storeNumber].length,
                y: PCA_holiday_flag_array,
                name: "Holiday Flag",
                line: {
                    color: 'rgb (64, 173, 52)',
                    width:2
                }
            }];
            var PCA_temperature_plot = [{
                x: data_2["Store_"+storeNumber].length,
                y: PCA_temperature_array,
                name: "Temperature (Fahrenheit)",
                line: {
                    color: 'rgb (26, 55, 171)',
                    width:2
                }
            }];
            var PCA_fuel_price_plot = [{
                x: data_2["Store_"+storeNumber].length,
                y: PCA_fuel_price_array,
                name: "Fuel Price per 10 Gallon",
                line: {
                    color: 'rgb (108, 178, 186)',
                    width:2
                }
            }];
            var PCA_cpi_plot = [{
                x: data_2["Store_"+storeNumber].length,
                y: PCA_cpi_array,
                name: "CPI",
                line: {
                    color: 'rgb (131, 34, 163)',
                    width:2
                }
            }];
            var PCA_unemployment_plot = [{
                x: data_2["Store_"+storeNumber].length,
                y: PCA_unemployment_array,
                name: "Unemployment rate",
                line: {
                    color: 'rgb (227, 9, 34)',
                    width:2
                }
            }];
            var data = [PCA_weekly_sales_plot,
                        PCA_holiday_flag_plot, 
                        PCA_temperature_plot,
                        PCA_fuel_price_plot,
                        PCA_cpi_plot,
                        PCA_unemployment_plot
            ];

            Plotly.newPlot("pca-chart",PCA_weekly_sales_plot, PCA_layout)
            Plotly.addTraces("pca-chart",PCA_temperature_plot)
            Plotly.addTraces("pca-chart",PCA_holiday_flag_plot)
            Plotly.addTraces("pca-chart",PCA_unemployment_plot)
            Plotly.addTraces("pca-chart",PCA_fuel_price_plot)
            Plotly.addTraces("pca-chart",PCA_cpi_plot)
           
        }; // EVENT CHANGE
        // D3 Third Data call here!
        
    }); // DATA 2
}); // DATA 1

   
// NOTE FOR MIKE: 
// I move the Visualization 1 Event Listener to first d3 curly brackets. 
// I add the identical Event Listener to second d3 nested curlet brackets.
// I sync the Vis 1 and Vis 2 together
// I marked the third dataset at line 216
//






    // DATE DATA
    // data["Store_"+storeNumber+"_Trend"]["Date"]

    // TREND DATA
    // data["Store_"+storeNumber+"_Trend"]["Trend"]

    // SEASONAL DATA
    // data["Store_"+storeNumber+"_Seasonal"]["Seasonal"]

  










