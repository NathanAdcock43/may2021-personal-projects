
//Watch-face current time
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




//Roll Calendar

    let days = [
        'SUN',
        'MON',
        'TUE',
        'WED',
        'THU',
        'FRI',
        'SAT'
    ];

    let date = new Date();
    let day = date.getDay();

    $('#dayOfWeek').text(days[day]);

    let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let month = months[date.getMonth()];

    $('#Month').text(month);
    $('#dayOfMonth1').text(date.getDate().toString().charAt(0));
    $('#dayOfMonth2').text(date.getDate().toString().charAt(1));


    //Change text on hover for the links

    $("#about").hover(
        function () {
            $('#about').text('about me');
        },
        function () {
            $('#about').text('front page');
        }
    );
    $("#work").hover(
        function () {
            $('#work').text('work history');
        },
        function () {
            $('#work').text('classifieds');
        }
    );
    $("#projects").hover(
        function () {
            $('#projects').text('my projects');
        },
        function () {
            $('#projects').text('technology');
        }
    );
    $("#weather").hover(
        function () {
            $('#weather').text('API Demo');
        },
        function () {
            $('#weather').text('Weather');
        }
    );
    $("#contact").hover(
        function () {
            $('#contact').text('Contact Me');
        },
        function () {
            $('#contact').text('Editorials');
        }
    );

});





//Magnify feature for the Magazine

(function($) {
    $.fn.magnify = function(oOptions) {
        // Default options
        oOptions = $.extend({
            'src': '',
            'speed': 100,
            'timeout': -1,
            'touchBottomOffset': 0,
            'finalWidth': null,
            'finalHeight': null,
            'magnifiedWidth': null,
            'magnifiedHeight': null,
            'limitBounds': false,
            'mobileCloseEvent': 'touchstart',
            'afterLoad': function(){}
        }, oOptions);

        var $that = this, // Preserve scope
            $html = $('html'),

            // Initiate
            init = function(el) {
                var $image = $(el),
                    $anchor = $image.closest('a'),
                    oDataAttr = {};

                // Get data attributes
                for (var i in oOptions) {
                    oDataAttr[i] = $image.attr('data-magnify-' + i.toLowerCase());
                }

                // Disable zooming if no valid large image source
                var sZoomSrc = oDataAttr['src'] || oOptions['src'] || $anchor.attr('href') || '';
                if (!sZoomSrc) return;

                var $container,
                    $lens,
                    nImageWidth,
                    nImageHeight,
                    nMagnifiedWidth,
                    nMagnifiedHeight,
                    nLensWidth,
                    nLensHeight,
                    nBoundX = 0,
                    nBoundY = 0,
                    nPosX, nPosY,     // Absolute cursor position
                    nX, nY,           // Relative cursor position
                    oContainerOffset, // Relative to document
                    oImageOffset,     // Relative to container
                    // Get true offsets
                    getOffset = function() {
                        var o = $container.offset();
                        // Store offsets from container border to image inside
                        // NOTE: .offset() does NOT take into consideration image border and padding.
                        oImageOffset = {
                            'top': ($image.offset().top-o.top) + parseInt($image.css('border-top-width')) + parseInt($image.css('padding-top')),
                            'left': ($image.offset().left-o.left) + parseInt($image.css('border-left-width')) + parseInt($image.css('padding-left'))
                        };
                        o.top += oImageOffset['top'];
                        o.left += oImageOffset['left'];
                        return o;
                    },
                    // Hide the lens
                    hideLens = function() {
                        if ($lens.is(':visible')) $lens.fadeOut(oOptions['speed'], function() {
                            // $html.removeClass('magnifying').trigger('magnifyend'); // Reset overflow-x
                        });
                    },
                    moveLens = function(e) {
                        // Reinitialize if image initially hidden
                        if (!nImageHeight) {
                            refresh();
                            return;
                        }
                        if (e) {
                            e.preventDefault();
                            // Save last coordinates in case we need to call this function directly (required when
                            // updating magnifiedWidth/magnifiedHeight while the lens is visible).
                            nPosX = e.pageX || e.originalEvent.touches[0].pageX;
                            nPosY = e.pageY || e.originalEvent.touches[0].pageY;
                            $image.data('lastPos', {
                                'x': nPosX,
                                'y': nPosY
                            });
                        } else {
                            nPosX = $image.data('lastPos').x;
                            nPosY = $image.data('lastPos').y;
                        }
                        // x/y coordinates of the mouse pointer or touch point. This is the position of
                        // .magnify relative to the document.
                        //
                        // We deduct the positions of .magnify from the mouse or touch positions relative to
                        // the document to get the mouse or touch positions relative to the container.
                        nX = nPosX - oContainerOffset['left'],
                            nY = (nPosY - oContainerOffset['top']) - oOptions['touchBottomOffset'];
                        // Toggle magnifying lens
                        if (!$lens.is(':animated')) {
                            if (nX>nBoundX && nX<nImageWidth-nBoundX && nY>nBoundY && nY<nImageHeight-nBoundY) {
                                if ($lens.is(':hidden')) {
                                    $html.addClass('magnifying').trigger('magnifystart'); // Hide overflow-x while zooming
                                    $lens.fadeIn(oOptions['speed']);
                                }
                            } else {
                                hideLens();
                            }
                        }
                        if ($lens.is(':visible')) {
                            // Move the magnifying lens with the mouse
                            var sBgPos = '';
                            if (nMagnifiedWidth && nMagnifiedHeight) {
                                // Change the background position of .magnify-lens according to the position of
                                // the mouse over the .magnify-image image. This allows us to get the ratio of
                                // the pixel under the mouse pointer with respect to the image and use that to
                                // position the large image inside the magnifying lens.
                                var nRatioX = -Math.round(nX/nImageWidth*nMagnifiedWidth-nLensWidth/2),
                                    nRatioY = -Math.round(nY/nImageHeight*nMagnifiedHeight-nLensHeight/2);
                                if (oOptions['limitBounds']) {
                                    // Enforce bounds to ensure only image is visible in lens
                                    var nBoundRight = -Math.round((nImageWidth-nBoundX)/nImageWidth*nMagnifiedWidth-nLensWidth/2),
                                        nBoundBottom = -Math.round((nImageHeight-nBoundY)/nImageHeight*nMagnifiedHeight-nLensHeight/2);
                                    // Left and right edges
                                    if (nRatioX>0) nRatioX = 0;
                                    else if (nRatioX<nBoundRight) nRatioX = nBoundRight;
                                    // Top and bottom edges
                                    if (nRatioY>0) nRatioY = 0;
                                    else if (nRatioY<nBoundBottom) nRatioY = nBoundBottom;
                                }
                                sBgPos = nRatioX + 'px ' + nRatioY + 'px';
                            }
                            // Now the lens moves with the mouse. The logic is to deduct half of the lens's
                            // width and height from the mouse coordinates to place it with its center at the
                            // mouse coordinates. If you hover on the image now, you should see the magnifying
                            // lens in action.
                            $lens.css({
                                'top': Math.round(nY-nLensHeight/2) + oImageOffset['top'] + 'px',
                                'left': Math.round(nX-nLensWidth/2) + oImageOffset['left'] + 'px',
                                'background-position': sBgPos
                            });
                        }
                    };

                // Data attributes have precedence over options object
                if (!isNaN(+oDataAttr['speed'])) oOptions['speed'] = +oDataAttr['speed'];
                if (!isNaN(+oDataAttr['timeout'])) oOptions['timeout'] = +oDataAttr['timeout'];
                if (!isNaN(+oDataAttr['finalWidth'])) oOptions['finalWidth'] = +oDataAttr['finalWidth'];
                if (!isNaN(+oDataAttr['finalHeight'])) oOptions['finalHeight'] = +oDataAttr['finalHeight'];
                if (!isNaN(+oDataAttr['magnifiedWidth'])) oOptions['magnifiedWidth'] = +oDataAttr['magnifiedWidth'];
                if (!isNaN(+oDataAttr['magnifiedHeight'])) oOptions['magnifiedHeight'] = +oDataAttr['magnifiedHeight'];
                if (oDataAttr['limitBounds']==='true') oOptions['limitBounds'] = true;
                if (typeof window[oDataAttr['afterLoad']]==='function') oOptions.afterLoad = window[oDataAttr['afterLoad']];

                // Implement touch point bottom offset only on mobile devices
                if (/\b(Android|BlackBerry|IEMobile|iPad|iPhone|Mobile|Opera Mini)\b/.test(navigator.userAgent)) {
                    if (!isNaN(+oDataAttr['touchBottomOffset'])) oOptions['touchBottomOffset'] = +oDataAttr['touchBottomOffset'];
                } else {
                    oOptions['touchBottomOffset'] = 0;
                }

                // Save any inline styles for resetting
                $image.data('originalStyle', $image.attr('style'));

                // Activate magnification:
                // 1. Try to get large image dimensions
                // 2. Proceed only if able to get large image dimensions OK

                // [1] Calculate the native (magnified) image dimensions. The zoomed version is only shown
                // after the native dimensions are available. To get the actual dimensions we have to create
                // this image object.
                var elZoomImage = new Image();
                $(elZoomImage).on({
                    'load': function() {
                        // [2] Got image dimensions OK.

                        // Fix overlap bug at the edges during magnification
                        $image.css('display', 'block');
                        // Create container div if necessary
                        if (!$image.parent('.magnify').length) {
                            // $('#starting-lens').hide();
                            $image.wrap('<div class="magnify"></div>');
                        }
                        $container = $image.parent('.magnify');
                        // Create the magnifying lens div if necessary
                        if ($image.prev('.magnify-lens').length) {
                            $container.children('.magnify-lens').css('background-image', 'url(\'' + sZoomSrc + '\')');
                        } else {
                            $image.before('<div class="magnify-lens loading paper-weight glass" style="background:url(\'' + sZoomSrc + '\') 0 0 no-repeat"></div>');
                        }
                        $lens = $container.children('.magnify-lens');
                        // Remove the "Loading..." text
                        $lens.removeClass('loading');
                        // Cache dimensions and offsets for improved performance
                        // NOTE: This code is inside the load() function, which is important. The width and
                        // height of the object would return 0 if accessed before the image is fully loaded.
                        nImageWidth = oOptions['finalWidth'] || $image.width();
                        nImageHeight = oOptions['finalHeight'] || $image.height();
                        nMagnifiedWidth = oOptions['magnifiedWidth'] || elZoomImage.width;
                        nMagnifiedHeight = oOptions['magnifiedHeight'] || elZoomImage.height;
                        nLensWidth = $lens.width();
                        nLensHeight = $lens.height();
                        oContainerOffset = getOffset(); // Required by refresh()
                        // Set zoom boundaries
                        if (oOptions['limitBounds']) {
                            nBoundX = (nLensWidth/2) / (nMagnifiedWidth/nImageWidth);
                            nBoundY = (nLensHeight/2) / (nMagnifiedHeight/nImageHeight);
                        }
                        // Enforce non-native large image size?
                        if (nMagnifiedWidth!==elZoomImage.width || nMagnifiedHeight!==elZoomImage.height) {
                            $lens.css('background-size', nMagnifiedWidth + 'px ' + nMagnifiedHeight + 'px');
                        }
                        // Store zoom dimensions for mobile plugin
                        $image.data('zoomSize', {
                            'width': nMagnifiedWidth,
                            'height': nMagnifiedHeight
                        });
                        // Store mobile close event for mobile plugin
                        $container.data('mobileCloseEvent', oDataAttr['mobileCloseEvent'] || oOptions['mobileCloseEvent']);
                        // Clean up
                        elZoomImage = null;
                        // Execute callback
                        oOptions.afterLoad();
                        // Simulate a lens move to update positioning if magnifiedWidth/magnifiedHeight is
                        // updated while the lens is visible
                        if ($lens.is(':visible')) moveLens();
                        // Handle mouse movements
                        $container.off().on({
                            'mousemove touchmove': moveLens,
                            'mouseenter': function() {
                                // Need to update offsets here to support accordions
                                oContainerOffset = getOffset();
                            },
                            'mouseleave': hideLens
                        });

                        // Prevent magnifying lens from getting "stuck"
                        if (oOptions['timeout']>=0) {
                            $container.on('touchend', function() {
                                setTimeout(hideLens, oOptions['timeout']);
                            });
                        }
                        // Ensure lens is closed when tapping outside of it
                        $('body').not($container).on('touchstart', hideLens);

                        // Support image map click-throughs while zooming
                        var sUsemap = $image.attr('usemap');
                        if (sUsemap) {
                            var $map = $('map[name=' + sUsemap.slice(1) + ']');
                            // Image map needs to be on the same DOM level as image source
                            $image.after($map);
                            $container.click(function(e) {
                                // Trigger click on image below lens at current cursor position
                                if (e.clientX || e.clientY) {
                                    $lens.hide();
                                    var elPoint = document.elementFromPoint(
                                        e.clientX || e.originalEvent.touches[0].clientX,
                                        e.clientY || e.originalEvent.touches[0].clientY
                                    );
                                    if (elPoint.nodeName==='AREA') {
                                        elPoint.click();
                                    } else {
                                        // Workaround for buggy implementation of elementFromPoint()
                                        // See https://bugzilla.mozilla.org/show_bug.cgi?id=1227469
                                        $('area', $map).each(function() {
                                            var a = $(this).attr('coords').split(',');
                                            if (nX>=a[0] && nX<=a[2] && nY>=a[1] && nY<=a[3]) {
                                                this.click();
                                                return false;
                                            }
                                        });
                                    }
                                }
                            });
                        }

                        if ($anchor.length) {
                            // Make parent anchor inline-block to have correct dimensions
                            $anchor.css('display', 'inline-block');
                            // Disable parent anchor if it's sourcing the large image
                            if ($anchor.attr('href') && !(oDataAttr['src'] || oOptions['src'])) {
                                $anchor.click(function(e) {
                                    e.preventDefault();
                                });
                            }
                        }

                    },
                    'error': function() {
                        // Clean up
                        elZoomImage = null;
                    }
                });

                elZoomImage.src = sZoomSrc;
            }, // END init()

            // Simple debounce
            nTimer = 0,
            refresh = function() {
                clearTimeout(nTimer);
                nTimer = setTimeout(function() {
                    $that.destroy();
                    $that.magnify(oOptions);
                }, 100);
            };

        /**
         * Public Methods
         */

        // Turn off zoom and reset to original state
        this.destroy = function() {
            this.each(function() {
                var $this = $(this),
                    $lens = $this.prev('div.magnify-lens'),
                    sStyle = $this.data('originalStyle');
                if ($this.parent('div.magnify').length && $lens.length) {
                    if (sStyle) $this.attr('style', sStyle);
                    else $this.removeAttr('style');
                    $this.unwrap();
                    $lens.remove();
                }
            });
            // Unregister event handler
            $(window).off('resize', refresh);
            return $that;
        }

        // Handle window resizing
        $(window).resize(refresh);

        return this.each(function() {
            // Initiate magnification powers
            init(this);
        });

    };
}(jQuery));

// (function($) {
//     // Ensure this is loaded after jquery.magnify.js
//     if (!$.fn.magnify) return;
//     // Add required CSS
//     $('<style>' +
//         '.lens-mobile {' +
//         'position:fixed;' +
//         'top:0;' +
//         'left:0;' +
//         'width:100%;' +
//         'height:100%;' +
//         'background:#ccc;' +
//         'display:none;' +
//         'overflow:scroll;' +
//         '-webkit-overflow-scrolling:touch;' +
//         'z-index:9999;' +
//         '}' +
//         '.magnify-mobile>.close {' +
//         'position:fixed;' +
//         'top:10px;' +
//         'right:10px;' +
//         'width:32px;' +
//         'height:32px;' +
//         'background:#333;' +
//         'border-radius:16px;' +
//         'color:#fff;' +
//         'display:inline-block;' +
//         'font:normal bold 20px/32px sans-serif;' +
//         'letter-spacing:0;' +
//         'opacity:0.8;' +
//         'text-align:center;' +
//         'text-shadow:none;' +
//         'z-index:9999;' +
//         '}' +
//         '@media only screen and (min-device-width:320px) and (max-device-width:773px) {' +
//         '/* Assume QHD (1440 x 2560) is highest mobile resolution */' +
//         '.lens-mobile { display:block; }' +
//         '}' +
//         '</style>').appendTo('head');
//     // Ensure .magnify is rendered
//     $(window).on('load', function() {
//         $('body').append('<div class="magnify-mobile"><div class="lens-mobile"></div></div>');
//         var $lensMobile = $('.lens-mobile');
//         // Only enable mobile zoom on smartphones
//         if ($lensMobile.is(':visible') && !!('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch) || navigator.msMaxTouchPoints)) {
//             var $magnify = $('.magnify'),
//                 $magnifyMobile = $('.magnify-mobile');
//             // Disable desktop magnifying lens
//             $magnify.off();
//             // Initiate mobile zoom
//             // NOTE: Fixed elements inside a scrolling div have issues in iOS, so we need to insert the
//             // close icon at the same level as the lens.
//             $magnifyMobile.hide().append('<i class="close">&times;</i>');
//             // Hook up event handlers
//             $magnifyMobile.children('.close').on($magnify.data('mobileCloseEvent'), function() {
//                 $magnifyMobile.toggle();
//             });
//             $magnify.children('img').on({
//                 'touchend': function() {
//                     // Only execute on tap
//                     if ($(this).data('drag')) return;
//                     var oScrollOffset = $(this).data('scrollOffset');
//                     $magnifyMobile.toggle();
//                     // Zoom into touch point
//                     $lensMobile.scrollLeft(oScrollOffset.x);
//                     $lensMobile.scrollTop(oScrollOffset.y);
//                 },
//                 'touchmove': function() {
//                     // Set drag state
//                     $(this).data('drag', true);
//                 },
//                 'touchstart': function(e) {
//                     // Render zoom image
//                     // NOTE: In iOS background-image is url(...), not url("...").
//                     $lensMobile.html('<img src="' + $(this).prev('.magnify-lens').css('background-image').replace(/url\(["']?|["']?\)/g, '') + '" alt="">');
//                     // Determine zoom position
//                     var $magnifyImage = $(this),
//                         oZoomSize = $magnifyImage.data('zoomSize'),
//                         nX = e.originalEvent.touches[0].pageX - $magnifyImage.offset().left,
//                         nXPct = nX / $magnifyImage.width(),
//                         nY = e.originalEvent.touches[0].pageY - $magnifyImage.offset().top,
//                         nYPct = nY / $magnifyImage.height();
//                     // Store scroll offsets
//                     $magnifyImage.data('scrollOffset', {
//                         'x': (oZoomSize.width*nXPct)-(window.innerWidth/2),
//                         'y': (oZoomSize.height*nYPct)-(window.innerHeight/2)
//                     });
//                     // Reset drag state
//                     $(this).data('drag', false);
//                 }
//             });
//         }
//     });
// }(jQuery));