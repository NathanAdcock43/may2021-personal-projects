"use strict";

$(document).ready(function () {

    const getYoutubeVideoID = (youtubeURL) => {
        youtubeURL = youtubeURL.replace("?v=","?fakeparam=100&video=");
        let urlParam = new URLSearchParams(youtubeURL);
        let videoID = urlParam.get('video');
        return videoID;
    }

    $("#userURLSubmit").click(function (e) {
        e.preventDefault()
        let searchVid = $('#userInputtedUrl').val();
        let youtubeId = getYoutubeVideoID(searchVid)
        $("#videoPlayer").attr("src", `https://www.youtube.com/embed/${youtubeId}`);
    });

    var tag = document.createElement('script');
    tag.id = 'iframe-demo';
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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
    onYouTubeIframeAPIReady()
function init() {
        gapi.client.setApiKey(APIv3Key);
        gapi.client.load("youtube", "v3", function (){
            //yt api is ready not sure what to use in this api yet
        });
}

});



//
//     var iframe = document.querySelector('iframe.embedly-embed');
//
//     var player = new playerjs.Player(iframe);

//     function formatTime(time){
//         time = Math.round(time);
//
//         let minutes = Math.floor(time / 60),
//             seconds = time - minutes * 60;
//
//         seconds = seconds < 10 ? '0' + seconds : seconds;
//
//         return minutes + ":" + seconds;
//     }
//     updateTimerDisplay()
//
//     function onPlayerReady(event) {
//     event.target.playVideo();
// }
//
//     var tag = document.createElement('script');
//
//     tag.src = "https://www.youtube.com/iframe_api";
//     var firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//
//     // $(iframe).ready(function () {
//     let youtubeId = getYoutubeVideoID($('#userInputtedUrl').val());
//
//     let videoPlayer = document.getElementById("videoPlayer");
//
//     function updateTimerDisplay(){
//     $('#current-time').text(formatTime( videoPlayer.getCurrentTime() ));
//     // $('#duration').text(formatTime( videoPlayer.getDuration() ));
// }