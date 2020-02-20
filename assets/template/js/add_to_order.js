'use strict';

function AddToOrder() {
  $('.js_slick_add_to_order').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 800,
    prevArrow:"<div class='slick-prev slick-arrow'></div>",
    nextArrow:"<div class='slick-next slick-arrow'></div>",

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }).on('breakpoint', function(event, slick, currentSlide, nextSlide){
    fast_buy('.fast_buy_button');
  });
}


$(document).ready(function() {

  getModule(
    'Snippet',
    'msProducts',
    'parents => 447, tpl => CatalogItem, limit => 12, where => {"template": "8"}',
    function (data) {
      $('.js_slick_add_to_order').slick('unslick');
      $('.js_add_to_order_target').html(data);
      AddToOrder();
      fast_buy('.fast_buy_button');
    });

  $('.js_add_to_order_menu a').click( function(e) {
    console.log('asd');
    e.preventDefault();
    let id = $(this).data('id');
    getModule(
      'Snippet',
      'msProducts',
      'parents => '+ id +', tpl => CatalogItem, limit => 12, where => {"template": "8"}, sortby => {"Data.popular":"DESC"}',
      function (data) {
        $('.js_slick_add_to_order').slick('unslick');
        $('.js_add_to_order_target').html(data);
        AddToOrder();
        fast_buy('.fast_buy_button');
      });
  });
});