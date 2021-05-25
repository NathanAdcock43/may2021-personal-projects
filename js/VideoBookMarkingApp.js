
$(document).ready(function () {

    console.info(`loadVideo called`);

    (function loadYoutubeIFrameApiScript() {

    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    tag.onload = setupPlayer;
})();
    var player = null;

    function setupPlayer() {
    window.YT.ready(function(){
        player = new YT.Player('videoPlayer', {
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }

        });
    });
    }

    const getYoutubeVideoID = (youtubeURL) => {
        youtubeURL = youtubeURL.replace("?v=","?fakeparam=100&video=");
        let urlParam = new URLSearchParams(youtubeURL);
        let videoID = urlParam.get('video');
        return videoID;
    }


        let youtubeId ="";
    $("#userURLSubmit").click(function (e) {
        e.preventDefault()
        let searchVid = $('#userInputtedUrl').val();
        youtubeId = getYoutubeVideoID(searchVid)
        $("#videoPlayer").attr("src", `https://www.youtube.com/embed/${youtubeId}?enablejsapi=1`);
    });


});
