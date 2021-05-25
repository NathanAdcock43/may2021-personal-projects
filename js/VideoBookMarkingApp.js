
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
        console.log("playerSetup")
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



    function onPlayerReady(event)
    {
        event.target.playVideo();
        time_total  = convert_to_mins_and_secs(player.getDuration(), 1);
        // authenticate().then(loadClient);
        // loadClient.ready(execute());
        generateProgressBar();
        buildCurrentTimeDisplay();

    }
    //for the durations bar (currently functioning and being called)
    function generateProgressBar()
    {
        var current_time = convert_to_mins_and_secs(player.getCurrentTime(), 0);
        document.getElementById("progress-bar").style.width = (player.getCurrentTime()/player.getDuration())*100+"%";
        console.log( current_time + " / " + time_total);
        timeout_setter = setTimeout(generateProgressBar, 1000);
    }
    //for video time display (currently functioning and being called)
    function buildCurrentTimeDisplay()
    {
        var current_time = convert_to_mins_and_secs(player.getCurrentTime(), 0);
        document.getElementById("counter").innerHTML= current_time;
        timeout_setter = setTimeout(buildCurrentTimeDisplay, 1000);
    }
    //converts seconds to minutes to be used in the progress bar and timer (currently functioning and being called)
    function convert_to_mins_and_secs(seconds, minus1)
    {
        var mins    = (seconds>=60) ?Math.round(seconds/60):0;
        var secs    = (seconds%60!=0) ?Math.round(seconds%60):0;
        var secs    = (minus1==true) ?(secs-1):secs; //Youtube always displays 1 sec less than its duration time!!! Then we have to set minus1 flag to true for converting player.getDuration()
        var time    = mins + ":" + ((secs<10)?"0"+secs:secs);
        return time;
    }
    // TODO authentication for the google api so that i can grab the caption data (not working or called)
    function authenticate() {
        return gapi.auth2.getAuthInstance() /*this seems to be the problem*/
            .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
            .then(function() { console.log("Sign-in successful"); },
                function(err) { console.error("Error signing in", err); });
    }
    authenticate()
    function loadClient() {
        gapi.client.setApiKey(APIv3Key);
        return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
            .then(function() { console.log("GAPI client loaded for API"); },
                function(err) { console.error("Error loading GAPI client for API", err); });
    }
    // Make sure the client is loaded and sign-in is complete before calling this method.
    function execute() {
        let searchVid = $('#userInputtedUrl').val();
        return gapi.client.youtube.captions.list({
            "part": [
                "snippet"
            ],
            "videoId": searchVid,
        })
            .then(function(response) {
                    // Handle the results here (response.result has the parsed body).
                    console.log("Response", response);
                },
                function(err) { console.error("Execute error", err); });
    }
    gapi.load("client:auth2", function() {
        gapi.auth2.init({client_id: "gapiClientID"});
    });



    // 5. The API calls this function when the player's state changes (works)
    function onPlayerStateChange(event)
    {
        if (event.data === YT.PlayerState.ENDED)
        {
            console.log("END!");
            clearTimeout(timeout_setter);
        }
        else
        {
            console.log(event.data);
        }
    }

});
