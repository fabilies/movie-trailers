(function () {
    $(init);

    function init() {
        $("#searchMovie").click(searchMovie);
        var movieTitle = $("#search");
        var imdbContainer = $("#imdb-container");

        function searchMovie() {
            var title = movieTitle.val();

            $.ajax({
                url: "http://www.omdbapi.com/?apikey=e16bfe14&s=" + title + "&type=movie",
                success: renderMovies
            })
        }

        function renderMovies(movies)
        {
            imdbContainer.empty();
            //console.log(movies);

            count = 0;

            for (var m in movies['Search']) {
                var movie    = movies[m];
                var title    = movies['Search'][count]['Title'];
                var poster   = movies['Search'][count]['Poster'];
                var imdbID   = movies['Search'][count]['imdbID'];
                var outerDiv = $("<div id='imdb-video' class='gallery_product col-lg-4 col-md-4 col-sm-6 col-xs-12'>");
                var innerDiv = $("<div class='card-result'>");

                var titleTd  = $("<h4 class='film-title'>").append(title);

                if (poster != 'N/A') {
                    var img = $("<img class='thumbnailSize'>").attr("src", poster);
                }
                else
                {
                    //var img = $("<p>").append("No image available!");
                    var img = $("<img class='thumbnailSize'>").attr("src", "/Content/Img/no-image.png");
                }

                var link = "https://www.imdb.com/title/" + imdbID;

                var posterTd = $("<div>").append(img);
                var imdbIDTd = $("<div class='mxw'>").append("<a target='_BLANK' class='btn btn-warning watchTrailer' href='" + link + "'>Go to IMDB trailer</a>");

                outerDiv.append(innerDiv);

                innerDiv.append(titleTd);
                innerDiv.append(posterTd);
                innerDiv.append(imdbIDTd);

                //$('#testdiv').load('https://www.imdb.com/title/tt0499549/ .slate');

                imdbContainer.append(outerDiv);
                count++;
            }
        }
    }
})();