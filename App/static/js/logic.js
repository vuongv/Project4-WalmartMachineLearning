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
                type: 'scatter',
                line: {width:3},
            }]
            var layout = {
                title: "Store "+storeNumber,
                font: {color: "#ffffff"},
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
            };
            Plotly.newPlot("line-chart", trace1, layout)



            
        }; // EVENT CHANGE
    }); // DATA 2
}); // DATA 1

   








    // DATE DATA
    // data["Store_"+i+"_Trend"]["Date"]

    // TREND DATA
    // data["Store_"+i+"_Trend"]["Trend"]

    // SEASONAL DATA
    // data["Store_"+i+"_Seasonal"]["Seasonal"]

    // LOOP THROUGH ALL STORES
    // for (let i = 1; i < 46; i++) {
    //     console.log(data["Store_"+i+"_Trend"])
    // }












