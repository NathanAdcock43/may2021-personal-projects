
//handheld game inside desk

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

            $(this).css({left: '207px'});


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

            $(this).css({left: '180px'});

        }
        $(this).data('clicks', !click);
    })

});
