$(document).ready(function() {

    // Array of topics
    var dogs = [
        "german shepard", "lab", "bulldog", "poodle", "beagle", "golden retriever", "pug",
        "yorkie", "pit bull", "husky", "boxer", "maltese", "dalmation", "greyhound", "great dane", "dog"
    ];

    // Function to append buttons to the page
    function addBtns() {
        $("#dogBtns").empty();
        for (i = 0; i < dogs.length; i++) {
            var b = $("<button>");
            b.addClass("dog_button");
            b.attr("data-type", dogs[i]);
            b.text(dogs[i]);
            $("#dogBtns").append(b);
        }
    };

    addBtns();

    // Click function for when the buttons are clicked
    $(document).on("click", ".dog_button", function() {
        // console.log("click");
        $("#content").empty();

        var type = $(this).attr("data-type");
        console.log(type);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=Jc8x3FG3DsOZ23iJ5hvcgLxcwHLbcG51&limit=10";
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response.data);
            var results = response.data;

            for (i = 0; i < results.length; i++){
                var newGiphDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var animated = results[i].images.downsized_medium.url;
                var still = results[i].images.downsized_still.url;
                var dogImg = $("<img src=" + animated + " >");

                newGiphDiv.append(p);
                newGiphDiv.append(dogImg);

                $("#content").append(newGiphDiv);

                // $("#content").append(results.embed_url[i]);
            }
        })
    });
    
    $(".addDog").on("click", function(event) {
        event.preventDefault();
        var newDog = $("input").val().trim();
        dogs.push(newDog);
        addBtns();
    });
});