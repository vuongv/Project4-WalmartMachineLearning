
// NAVIGATION BUTTONS

$("#page2").hide()
$("#page3").hide()


$("#nav1").on("click", function() {
    $("#nav1").addClass("active");
    $("#nav2").removeClass("active");
    $("#nav3").removeClass("active");

    $("#page1").show()
    $("#page2").hide()
    $("#page3").hide()

});

$("#nav2").on("click", function() {
    $("#nav1").removeClass("active");
    $("#nav2").addClass("active");
    $("#nav3").removeClass("active");

    $("#page1").hide()
    $("#page2").show()
    $("#page3").hide()

});

$("#nav3").on("click", function() {
    $("#nav1").removeClass("active");
    $("#nav2").removeClass("active");
    $("#nav3").addClass("active");

    $("#page1").hide()
    $("#page2").hide()
    $("#page3").show()

});