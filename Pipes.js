"use strict";

Modernizr.addTest("timedsvg", function () {
    return (Modernizr.testAllProps('animationName'));
});

$(function () {

    if (navigator.appVersion.indexOf("MSIE 10")!=-1 || (window.location.hash != !!window.MSInputMethodContext && !!document.documentMode)) {
        $('html').removeClass('timedsvg');
    }

    var isInFrame = !!!(self == parent);

    function checkSVGH() {
        var ratio = 595.28 / 879.838;
        var wrapper = (!isInFrame) ? $(window) : parent.$('.playgroundWrapper');
        var finalH = parseInt(wrapper.width() * ratio);

        var wrapperH = parseInt(wrapper.height());
        var svgH = ((finalH < (wrapperH - 1))) ? '100%' : finalH;
        $('#svgPipes').height(svgH);
    }

    $(window).bind('load resize', checkSVGH);
    

    $('body').click(function () {
        if(isInFrame) parent.expandPlayground();
    })







    var selectColours = ["#674172", "#ec6887", "#e52751", "#96c6eb", "#d73984", "#6c76b6", "#b6bbdf", "#82bc45", "#1F3A93", "#195c91", "#f5e600", "#fff6b6", "#282a60", "#f76b20", "#f4b66a", "#de95c0", "#c160a0", "#a43889", "#50bbb9", "#f39c12", "#3498db", "#8E44AD", "#D91E18", "#2ECC71", "#049372", "#1dd2af", "#E74C3C", "#F9BF3B", "#ff4a6b", "#39f0de", "#3b2f93"];

    var colouredCount = 0;

    $('#Colour path').bind('mouseenter touchstart', function () {
        var shape = $(this);

        if (shape.data('colourFixed') == 1) return;
        var colour = selectColours[Math.floor(Math.random() * selectColours.length)];

        shape.css('fill', colour);

    });

    $('#Colour path').bind('mouseleave', function () {
        var shape = $(this);
        if (shape.data('colourFixed') == 1) return;
        shape.css('fill', '#ffffff');
    });

    $('#Colour path').click(function () {
        var shape = $(this);
        var nubbin = $(".shhhh");



        if (shape.data('colourFixed') == 1) {
            var colour = selectColours[Math.floor(Math.random() * selectColours.length)];
            shape.css('fill', colour);

            if (nubbin.hasClass('out')) {
                nubbin.removeClass('out shake');
            }

            return
        }

        if (colouredCount >= 40) {
            if(!nubbin.is('.out')) nubbin.removeClass('shake').addClass('out');
            else {
                nubbin.removeClass('shake');
                nubbin.width();
                nubbin.addClass('shake');
            }
        }

        var colourSaved = shape.css('fill');
        shape.css('fill', colourSaved);
        shape.data('colourFixed', '1');

        ++colouredCount;

        //var n = $("#Colour path").length;

        //$('#Colour path').each(function () {
        //    if ($(this).css('fill') !== 'rgb(255, 255, 255)') {
        //        alert("Woo!");
        //        $(".shhhh").fadeIn('slow', function () {
        //            $(this).animate({ 'bottom': '0px' }, 'slow');
        //        });
        //    }
        //});
    });

    

});