


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

