function tplawesome(e, t) { res = e; for (var n = 0; n < t.length; n++) { res = res.replace(/\{\{(.*?)\}\}/g, function (e, r) { return t[n][r] }) } return res }


if ($('#results').is(':empty')) {
    $("#results").append("<p class='warn-message'>U heeft nog geen zoekopdracht ingevoerd!</p>");
    $("#results").append("<img class='placeHolder' src='/Content/Img/TamTam.jpg' />");
}

$(function () {
    $("form").on("submit", function (e) {
        e.preventDefault(); // Btn no new page
        $(".placeHolder").hide();

        var req = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val() + ' official trailer').replace(/%20/g, "+"),
            maxResults: 6,
            order: "viewCount",
            videoDefinition: "high",
            videoDuration: "short"
        });

        // Send request
        req.execute(function (response) {
            var results = response.result;
            $("#results").html("");
            $.each(results.items, function (index, item) {
                //console.log(item);
                $.get("/Home/Video", function (data) {
                    $("#results").append(tplawesome(data, [{ "title": item.snippet.title, "videoid": item.id.videoId }]));
                });
            });
        });
    });
});

function init() {
    gapi.client.setApiKey("AIzaSyCdtJNudBq7HJ1i9W2RW09zfcwM1JrOULE");
    gapi.client.load("youtube", "v3", function () {
    });
}

// Lightbox YouTube
$(document).ready(function () {
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
});
