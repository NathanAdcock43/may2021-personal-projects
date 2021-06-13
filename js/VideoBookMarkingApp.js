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
        window.YT.ready(function () {
            player = new YT.Player('videoPlayer', {
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        });
    }

    const getYoutubeVideoID = (youtubeURL) => {
        youtubeURL = youtubeURL.replace("?v=", "?fakeparam=100&video=");
        let urlParam = new URLSearchParams(youtubeURL);
        let videoID = urlParam.get('video');
        return videoID;
    }


    let youtubeId = "";
    $("#userURLSubmit").click(function (e) {
        e.preventDefault()
        let searchVid = $('#userInputtedUrl').val();
        youtubeId = getYoutubeVideoID(searchVid)
        $("#videoPlayer").attr("src", `https://www.youtube.com/embed/${youtubeId}?enablejsapi=1`);
    });


    function onPlayerReady(event) {
        event.target.playVideo();
        time_total = convert_to_mins_and_secs(player.getDuration(), 1);
        // authenticate().then(loadClient);
        // loadClient.ready(execute());
        generateProgressBar();
        buildCurrentTimeDisplay();

    }

    //for the durations bar (currently functioning and being called)
    function generateProgressBar() {
        var current_time = convert_to_mins_and_secs(player.getCurrentTime(), 0);
        document.getElementById("progress-bar").style.width = (player.getCurrentTime() / player.getDuration()) * 100 + "%";
        timeout_setter = setTimeout(generateProgressBar, 1000);
    }

    //for video time display (currently functioning and being called)
    function buildCurrentTimeDisplay() {
        var current_time = convert_to_mins_and_secs(player.getCurrentTime(), 0);
        document.getElementById("counter").innerHTML = current_time;
        console.log(current_time + " / " + time_total);
        timeout_setter = setTimeout(buildCurrentTimeDisplay, 1000);
    }

    //converts seconds to minutes to be used in the progress bar and timer (currently functioning and being called)
    function convert_to_mins_and_secs(seconds, minus1) {
        var mins = (seconds >= 60) ? Math.round(seconds / 60) : 0;
        var secs = (seconds % 60 != 0) ? Math.round(seconds % 60) : 0;
        var secs = (minus1 == true) ? (secs - 1) : secs; //Youtube always displays 1 sec less than its duration time!!! Then we have to set minus1 flag to true for converting player.getDuration()
        var time = mins + ":" + ((secs < 10) ? "0" + secs : secs);
        return time;
    }

    //Runs the fetched Json Captions and converts them to CSV

    const main = async () => {
        const
            defaultId =  getYoutubeVideoID($('#userInputtedUrl').val()), /* Queen – Bohemian Rhapsody */
            json =  YouTubeCaptionUtil
                .fetchCaptions(YouTubeCaptionUtil.videoId() || defaultId),
            csv = CsvUtil.fromJson(json);
        document.getElementById("captions").innerHTML = csv;
        console.log(csv);
        //    Todo right here
    };

    //fetch Json caption data
    class YouTubeCaptionUtil {
        static async fetchCaptions(videoId, options) {
            const
                opts = {...YouTubeCaptionUtil.defaultOptions, ...options},
                response = await fetch(YouTubeCaptionUtil.__requestUrl(videoId, opts)),
                json = await response.json();
            return YouTubeCaptionUtil.__parseTranscript(json);
        }

        //prep user-inputted YT URL
        static videoId() {
            const video_id = window.location.search.split('v=')[1];
            if (video_id != null) {
                const ampersandPosition = video_id.indexOf('&');
                if (ampersandPosition != -1) {
                    return video_id.substring(0, ampersandPosition);
                }
            }
            return null;
        }


        static __requestUrl(videoId, {baseUrl, languageId}) {
            return `${baseUrl}?lang=${languageId}&v=${videoId}&fmt=json3`;
        }

        static __parseTranscript({events}) {
            return events.map(({tStartMs, dDurationMs, segs: [{utf8}]}) => ({
                start: YouTubeCaptionUtil.__formatTime(tStartMs),
                dur: YouTubeCaptionUtil.__formatTime(dDurationMs),
                text: utf8
            }));
        }

        static __formatTime(seconds) {
            const date = new Date(null);
            date.setSeconds(seconds);
            return date.toISOString().substr(11, 8);
        };
    }

    YouTubeCaptionUtil.defaultOptions = {
        baseUrl: 'https://video.google.com/timedtext',
        languageId: 'en'
    };

    class CsvUtil {
        static fromJson(json, options) {
            const
                opts = {...CsvUtil.defaultOptions, ...options},
                keys = Object.keys(json[0]).filter(key =>
                    opts.ignoreKeys.indexOf(key) === -1),
                lines = [];
            if (opts.includeHeader) lines.push(keys.join(opts.delimiter));
            return lines.concat(json
                .map(entry => keys.map(key => entry[key]).join(opts.delimiter)))
                .join('\n');
        }
    }

    CsvUtil.defaultOptions = {
        includeHeader: false,
        ignoreKeys: ['dur'],
        delimiter: '\t'
    };

    main();

    // 5. The API calls this function when the player's state changes (works)
    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            console.log("END!");
            clearTimeout(timeout_setter);
        } else {
            console.log(event.data);
        }
    }
//this is where I will need to put the code to control the captions
//Trying to make sure that this is going to work

});
