
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

            $(this).css({left: '180px'});


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

            $(this).css({left: '207px'});

        }
        $(this).data('clicks', !click);
    })


//    close drawer link back to home page switch text effect and relocate to homepage

    function goToURL() {
        location.href = 'NAA-Professional-Profile.html';

    }

    $(".closeDrawer").hover(
        function () {
            $('#close').text('Back to home page');
        },
        function () {
            $('#close').text('Close Drawer');
        }
    )

    $("#closeDrawer").click(function () {
        window.location.replace("NAA-Professional-Profile.html")
    });

//    set floppy disk to load resume on click

    // $(".floppyDisk").click(function() {
    //     // hope the server sets Content-Disposition: attachment!
    //     window.location = 'NathanAdcockResume1.pdf';
    // });

});
