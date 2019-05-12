$(document).ready(function() {
/* ----------------------------------------------------------------------- */
/* Slick Catalog*/
/* ----------------------------------------------------------------------- */

    $('.slick__catalog_wrap .callback').remove();
    $('.slick__catalog_wrap, .review_wrap').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        speed: 800,
        prevArrow:"<div class='slick-prev slick-arrow'></div>",
        nextArrow:"<div class='slick-next slick-arrow'></div>",

        responsive: [
            {
                breakpoint: 998,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    }).on('breakpoint', function(event, slick, currentSlide, nextSlide){
        fast_buy('.fast_buy_button');
    });
});