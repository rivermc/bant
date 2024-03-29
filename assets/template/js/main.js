
/*------------------------------------------------------------------*/
/*             Swipe Manager                                        */
/*------------------------------------------------------------------*/


(function () {
// initializes touch and scroll events
    var supportTouch = $.support.touch,
        //scrollEvent = "touchmove scroll",
        touchStartEvent = supportTouch ? "touchstart" : "mousedown",
        touchStopEvent = supportTouch ? "touchend" : "mouseup",
        touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

    // handles swipe up and swipe down
    $.event.special.swipeupdown = {
        setup: function () {
            var thisObject = this;
            var $this = $(thisObject);

            $this.bind(touchStartEvent, function (event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                    start = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ],
                        origin: $(event.target)
                    },
                    stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }

                    var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }

                $this
                    .bind(touchMoveEvent, moveHandler)
                    .one(touchStopEvent, function () {

                        $this.unbind(touchMoveEvent, moveHandler);

                        if (start && stop) {

                            if ( (stop.time - start.time < 1000) && ( (Math.abs(start.coords[1] - stop.coords[1]) ) >  ( Math.abs(start.coords[0] - stop.coords[0]) ) ) ) {
                              start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                                    //console.log('Start Y: ' + start.coords[1]);
                                    //console.log('Stop Y: ' + stop.coords[1]);

                            }

                            else if ( (stop.time - start.time < 1000) && ( (Math.abs(start.coords[0] - stop.coords[0]) ) >  ( Math.abs(start.coords[1] - stop.coords[1]) ) ) ) {
                                start.origin
                                    .trigger("swipeleftright")
                                    .trigger(start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight");
                                   //console.log('Start X: ' + start.coords[0]);
                                   //console.log('Stop X: ' + stop.coords[0]);
                            }
                        }

                        start = stop = undefined;
                    });
            });
        }
    };

//Adds the events to the jQuery events special collection
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function (event, sourceEvent) {
        $.event.special[event] = {
            setup: function () {
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });
 //Adds the events to the jQuery events special collection

})();






/* ----------------------------------------------------------------------- */
/* Scroll Disable */
/* ----------------------------------------------------------------------- */


function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}






/* ----------------------------------------------------------------------- */
/* Get Module Function */
/* ----------------------------------------------------------------------- */



function getModule(action, module, params, cb) {
    $.ajax({
        type:'POST',
        url:"/assets/template/php/getModule.php",
        data:'action=' + action + '&chunk=' + module + '&params=' + params,
        cache:false,
        success:function(data) {
            cb(data);
        }
    });
}


$(document).ready(function() {


    /* ----------------------------------------------------------------------- */
  /* Send Form */
  /* ----------------------------------------------------------------------- */

  $('.popup-btn').magnificPopup({
    type: 'inline',
    preloader: false,
    removalDelay: 350,

      callbacks: {
        beforeOpen: function() {
          $('.mfp-bg.mfp-ready').addClass('closed');

        },
        open: function() {
          $('html').css('overflow', 'auto');
        },
        close: function() {

        }
      }
  });





/* ----------------------------------------------------------------------- */
/* ScrollTop */
/* ----------------------------------------------------------------------- */


    $("a.scrolling, .catalog-scroll-link a").click(function(e) {
      e.preventDefault();
      var scroll = $(this).attr('href');
      $('body, html').animate({
            scrollTop: $(scroll).offset().top
        }, 1000);
    });

/* ----------------------------------------------------------------------- */
/* Card */
/* ----------------------------------------------------------------------- */

    $('.zoom').click(function(){
      $(this).fadeOut(400);
        $('.fotorama__stage__shaft img').unbind('mouseover');
        $('.fotorama__stage__shaft .fotorama__active img').okzoom({
            width: 300,
            height: 300,
            scaleWidth: 1000,
            round: true,
            shadow: "0 0 5px #333333",
            border: "1px solid #333333"
        });
        $('.ok-listener').click( () => {
          $(this).fadeIn(400);
          $('.fotorama__stage__shaft img').off();
          $('body').css('cursor', 'default');
          $('#ok-loupe, .ok-listener').remove();
        });
    });

    $('.shipping_text').click(function(){
        $('.shipping_btn').eq($(this).index()).trigger('click');
    });

    $('.shipping_btn').click(function(){

        if ($(this).hasClass('active')) {
            $('.shipping_text').slideUp(400).toggleClass('active');
        }
        else {
            var index = $(this).index();
            $('.shipping_btn').removeClass('active');
            $('.shipping_text').slideUp(400).removeClass('active').eq(index - 1).slideDown(400).toggleClass('active');
        }
        $(this).toggleClass('active');
    });

    $('.product__item_share').click(function(){
        $('.js-share').trigger('click');
    });

    $('.js-share').click(function(){
        if ($(this).hasClass('active')) {
            $('.product__item_share').slideUp(400).toggleClass('active');
        }
        else {
            $('.product__item_share').slideDown(400).toggleClass('active');
        }
        $(this).toggleClass('active');
    });



    /* ----------------------------------------------------------------------- */
    /* FastBuy init */
    /* ----------------------------------------------------------------------- */
    setTimeout(function(){
        fast_buy('.fast_buy_button');
    }, 1000);

    /* ----------------------------------------------------------------------- */
    /* mobile menu detect*/
    /* ----------------------------------------------------------------------- */
    function detectMobileMenu() {
        var widthWin = $(window).width() + 15;
        var m = 550;
        var mBig = 768;

        if (widthWin < m || widthWin < mBig) {
            $('.header__bottom').addClass('mobile_menu');
        }
        else {
            $('.header__bottom').removeClass('mobile_menu');
        }
    }
    detectMobileMenu();
    $(window).resize(detectMobileMenu);

    /* ----------------------------------------------------------------------- */
    /* Mobile Menu */
    /* ----------------------------------------------------------------------- */

    $('.js-mobile_menu').click(function(){
        $('.mobile_menu').toggleClass('active');
    });
    $('.header .close_button').click(function(){
        $('.mobile_menu').toggleClass('active');
    });


    /* ----------------------------------------------------------------------- */
    /* Catalog insert Callback */
    /* ----------------------------------------------------------------------- */

    $('.popup_callback_button').magnificPopup({
        type: 'inline',
        preloader: false,
        removalDelay: 400,

        callbacks:  {
            beforeOpen: function() {
            },
            open: function() {
                $('body').css({'margin-right': '15px'});
            },
            close: function() {
                $('body').css({'margin-right': '0'});
            }
        }
    });


/* ----------------------------------------------------------------------- */
/* Catalog insert Callback */
/* ----------------------------------------------------------------------- */

    var catalog_id = $('.catalog__page').data('id');

    getModule('Chunk', 'Callback', 'class => catalog_cards, type => catalog, id =>  ' + catalog_id + ', text_button => Заказать',function (data) {
        $('#mse2_results:not(.mse2_result_add_to) .item_slick_wrap').eq(16).before(data);
        new Callback();
    });

    $(document).on('mse2_load', function() {
        var catalog_id = $('.catalog__page').data('id');
        getModule('Chunk', 'Callback', 'class => catalog_cards, type => catalog, id => ' + catalog_id + ', text_button => Заказать',function (data) {
            $('#mse2_results:not(.mse2_result_add_to) .item_slick_wrap').eq(16).before(data);
            new Callback();
            fast_buy('.fast_buy_button');
        });
    });



    /* ----------------------------------------------------------------------- */
    /* MiniCart Full  */
    /* ----------------------------------------------------------------------- */



    miniShop2.Callbacks.Cart.change.response.success = function() {
        getModule('Snippet', 'msCart', 'tpl => MiniCartFull',function (data) {
            $('.msCartMini').html(data);
            basket_init();
        });
    };
    miniShop2.Callbacks.Cart.add.response.success = function() {
        getModule('Snippet', 'msCart', 'tpl => MiniCartFull',function (data) {
            $('.msCartMini').html(data);
            basket_init();
        });
    };
    miniShop2.Callbacks.Cart.remove.response.success = function() {
        getModule('Snippet', 'msCart', 'tpl => MiniCartFull',function (data) {
            $('.msCartMini').html(data);
            basket_init();
        });
    };
    miniShop2.Callbacks.Order.submit.response.error = function(response) {
        $('html, body').animate({scrollTop:$('.order_cont').offset().top}, 400, 'swing', function() {
            for (var i = 0; i < response.data.length; i++) {
                $('#msOrder .order_form input[name=' + response.data[i] + ']').addClass('shake').delay(800).queue(function(next){ $('#msOrder .order_form input').removeClass('shake');  next(); });
            }
        });
    };

    basket_init();


    $('.form_input').focus(function(){
        var callback_group = $(this).parent();
        callback_group.addClass('focused');
    }).blur(function(){
        var inputValue = $(this).val();
        if (inputValue === "") {
            $(this).removeClass('filled');
            $(this).parent().removeClass('focused');
        } else {
            $(this).addClass('filled');
        }
    });

    $('.form__group_label').click(function(){
        var callback_group = $(this).parent();
        callback_group.addClass('focused');
        callback_group.find('input').focus();
    });

    /* ----------------------------------------------------------------------- */
    /* Input Phone  */
    /* ----------------------------------------------------------------------- */

    $('input[name=phone], input[name=phoneShipping]').usPhoneFormat({format: 'x-xxx-xxx-xxxx'});


		var vazaCost = 0;
    $('input[name=vaza]').change(function() {
			vazaCost = $(this).data('value')
		});

		miniShop2.Callbacks.Order.getcost.response.success = function(data) {
			$('#ms2_order_cost').text(miniShop2.Utils.formatPrice(parseInt(data.data.cost, 10) + parseInt(vazaCost, 10)))
		};

});


