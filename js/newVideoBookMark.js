
$(document).ready(function () {

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
        $("#videoPlayer").attr("src", `https://www.youtube.com/embed/${youtubeId}enablejsapi=1`);
    });

    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


    // var player;
    // function onYouTubeIframeAPIReady() {
    //     player = new YT.Player('player', {
    //         height: '390',
    //         width: '640',
    //         videoId: `https://www.youtube.com/embed/${youtubeId}enablejsapi=1`,
    //         playerVars: {
    //             'playsinline': 1
    //         },
    //         events: {
    //             'onReady': onPlayerReady,
    //             'onStateChange': onPlayerStateChange
    //         }
    //     });
    // }
    var player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('videoPlayer', {
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
            //    looking at more API info
        });
    }
    // onYouTubeIframeAPIReady()
    // function init() {
    //     gapi.client.setApiKey(APIv3Key);
    //     gapi.client.load("youtube", "v3", function (){
    //         //yt api is ready not sure what to use in this api yet
    //     });
    // }

});
