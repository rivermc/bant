
/* ----------------------------------------------------------------------- */
/* Preloader Disable Hook */
/* ----------------------------------------------------------------------- */

setTimeout(function() {
    if ($('.preloader').hasClass('active')) {
        $('.preloader').css('opacity', '0').delay(500).queue(function (next) {
            $('.preloader').css('display', 'none').removeClass('active');
            next();
        });
    }
} , 2000);

$(document).ready(function() {

/* ----------------------------------------------------------------------- */
/* Preloader */
/* ----------------------------------------------------------------------- */


    setTimeout(function() {

        $('.preloader').css('opacity', '0').delay(500).queue(function (next) {
            $('.preloader').css('display', 'none').removeClass('active');
            next();
        });

    }, 400);


    $('.preloader').click(function() {
        $(this).css('display', 'none').removeClass('active');
    });


    $('a').click(function() {

        if (!$(this).hasClass('nopreload')) {
            $('.preloader').css('display', 'block').delay(100).queue(function (next) {
                $('.preloader').css('opacity', '1');
                next();
            });
        }
    });
});
    

