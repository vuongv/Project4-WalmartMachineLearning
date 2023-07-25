
$("#page").load("../../App/templates/visualization1.html")

// NAVIGATION BUTTONS

$("#nav1").on("click", function() {
    $("#nav1").addClass("active");
    $("#nav2").removeClass("active");
    $("#nav3").removeClass("active");

    $("#page").empty()
    $("#page").load("../../App/templates/visualization1.html")

});

$("#nav2").on("click", function() {
    $("#nav1").removeClass("active");
    $("#nav2").addClass("active");
    $("#nav3").removeClass("active");

    $("#page").empty()
    $("#page").load("../../App/templates/visualization2.html")

});

$("#nav3").on("click", function() {
    $("#nav1").removeClass("active");
    $("#nav2").removeClass("active");
    $("#nav3").addClass("active");

    $("#page").empty()
    $("#page").load("../../App/templates/visualization3.html")

});