// function to get from the landing page to results page
var yesButton = $('#yes').on('click', function () {
    console.log("yesButton");
    $(this).parent().hide();
    $('.container').show();
    resultsPage();
});

// function for displaying the results page
var resultsPage = function () {
    window.location = "../project1/results.html";

}

// function to bring user to the Wiki page if no is clicked
var noButton = $('#no').on('click', function () {
    console.log("noButton");
    $(this).parent().hide();
    $('.container').show();
    deadPage();
});

// function for displaying the dead page
var deadPage = function Redirect() {
    window.location = "https://en.wikipedia.org/wiki/Shirley_Temple_(beverage)";
}