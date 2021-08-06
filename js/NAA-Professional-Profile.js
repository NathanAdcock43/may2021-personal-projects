setInterval(setClock, 1000)

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

function setClock() {
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds() / 60
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
    setRotation(secondHand, secondsRatio)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hoursRatio)
}

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360)
}

setClock()


$(document).ready(function() {

    $("#gametoggle").on('click', function () {
        var click = $(this).data('clicks');
        if (click) {
            console.log("clicked");
            $('#car-2').css("visibility", "visible");
            $('#obstacle-1').css("visibility", "visible");
            $('#obstacle-4').css("visibility", "visible");
            $('#lap-2').css("visibility", "visible");

            $('#obstacle-2').css("visibility", "hidden");
            $('#obstacle-3').css("visibility", "hidden");
            $('#car-1').css("visibility", "hidden");
            $('#lap-1').css("visibility", "hidden");

            $(this).css({left: '245px'});


        } else  {
            console.log("clicked");
            $('#obstacle-2').css("visibility", "visible");
            $('#obstacle-3').css("visibility", "visible");
            $('#car-1').css("visibility", "visible");
            $('#lap-1').css("visibility", "visible");


            $('#obstacle-1').css("visibility", "hidden");
            $('#obstacle-4').css("visibility", "hidden");
            $('#car-2').css("visibility", "hidden");
            $('#lap-2').css("visibility", "hidden");

            $(this).css({left: '215px'});

        }
        $(this).data('clicks', !click);
    })

//    adding notes to test something

});