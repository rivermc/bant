/* ----------------------------------------------------------------------- */
/* product price // template/card.html */
/* ----------------------------------------------------------------------- */

$(document).ready(function(){

    class ParamItem {

        constructor(item) {
            this.item = item;
            this.input = $(this.item).find('input');
            this.parent = $(this.item).parent();
            this.text = $(this.parent).find('p').eq(1);
            this.inputVal = $(this.input).val();
            this.inputName = $(this.input).attr('nameoption');
            this.checkOption = $(this.item).data('count');
            this.originalPrice = $('#originalPrice').val().replace( /[\s\n\r]+/g, ' ' );
            this.ParamPrice = 0;
            this.priceFront = $('#price');
        }

        removeCheck() {
            $(this.parent).find('.prop_img').removeClass('active');
            $(this.parent).find('input').attr('checked', false);
        }

        addCheck() {
            $(this.item).addClass('active');
            this.input.attr('checked', true);
            this.text.html(this.inputVal);
        }

        getPriceParam() {
            var getParamPrice = $('.prop_select .param_price');
            var self = this;
            getParamPrice.each(function(index, elem){
                self.ParamPrice += parseInt($(elem).val());
            });
        }

        setPrice(price) {
            $('#price_' + this.inputName).val(price);
            this.getPriceParam();
            var allPrice = parseInt(this.originalPrice) + parseInt(this.ParamPrice);
            this.priceFront.html(allPrice);
            $('#priceItem').val(allPrice);
            //$.jGrowl('Set price success: ' + allPrice , { theme: 'message-success', life: 2500 });
            this.preloader('end', '.product__item_price', '.product__item_price .product_price_wrap');

        }

        preloader(state , selector, selector_opacity) {
            if (state === 'start') {
                $(selector).prepend('<img alt="preloader" src="/assets/template/images/elements/preloader.gif" class="preloader-small">');
                $(selector_opacity).css({'opacity': '0'});
            }
            else {
                setTimeout(function(){
                    $(selector_opacity).css({'opacity': '1'});
                    $(selector +' > img').remove();
                }, 500);
            }
        }

        checkOptionPlus() {
            var self = this;
            $.ajax({
                type:'POST',
                url:"/api/optionprice",
                data:'inputVal=' + this.inputVal + '&inputName=' + this.inputName,
                cache:false,
                success:function(data){
                    //$.jGrowl('Get price success: ' + data , { theme: 'message-success', life: 25000 });
                    self.setPrice(data);
                    self.getImageCollection();

                },
                error: function(error) {
                    //$.jGrowl('Get price error: ' + error , { theme: 'message-error', life: 25000 });
                    console.log(error);
                }
            });
        }
        
        getImageCollection() {
            var self = this;
            if (self.inputName === 'upholdery') {
                $.ajax({
                    type:'POST',
                    url:"/api/getimagecollection",
                    data:'inputVal=' + this.inputVal + '&inputName=' + this.inputName,
                    cache:false,
                    success:function(data){
                        //$.jGrowl('getImageCollection success: ' + data , { theme: 'message-error', life: 25000 });
                        data = jQuery.parseJSON(data);
                        self.eachImageCollection(data);
                    },
                    error: function(error) {
                        //$.jGrowl('getImageCollection error: ' + error , { theme: 'message-error', life: 25000 });
                        console.log(error);
                    }
                });
            }   
        }
        
        eachImageCollection(data) {
            var self = this;
            var imageCollection = '';
            $(data).each(function(index, elem){
                if ( index == 0 ) {
                    var input = '<input type="radio" id="upholdery_color-'+ index +'" name="options[upholdery_color]" value="'+ elem.split('.')[0] +'" hidden="hidden" checked="checked">';
                    var img ='<img class="active" src="/assets/template/images/properties/upholdery/'+ self.inputVal + '/' + elem +'">';                    
                }
                else {
                    var input = '<input type="radio" id="upholdery_color-'+ index +'" name="options[upholdery_color]" value="'+ elem.split('.')[0] +'" hidden="hidden" >';
                    var img ='<img src="/assets/template/images/properties/upholdery/'+ self.inputVal + '/' + elem +'">';
                }
                imageCollection += '<div class="colors">'+ input + img +'</div>';
            });
            $('#upholdery_colors').html(imageCollection);
        }

        click() {
            this.preloader('start', '.product__item_price', '.product__item_price .product_price_wrap');
            this.removeCheck();
            this.addCheck();

            if (this.checkOption === 0) {
                this.getImageCollection();
                this.setPrice(0);
            }
            else {
                this.checkOptionPlus();
            }
        }
    }

    $('.product__item .prop_img').click(function(){
        if ( !$(this).hasClass('active') && $(this).hasClass('select') ) {
            var paramsitem = new ParamItem(this);
            paramsitem.click();
        }
    });
    
    $('#upholdery_colors ').on('click', 'img' , function() {
        $('#upholdery_colors .colors img').removeClass('active');
        $('#upholdery_colors .colors input').attr('checked', false);
        $(this).addClass('active');
        var parent = $(this).parent();
        $(parent).find('input').attr('checked', true);
    });
    
    if ( $('.product__item .prop_img.select').length > 0 ) {
        $('.notification_price').css({'opacity': '1', 'height' : 'auto'});

        if ($('#upholdery_colors').length > 0 ) {
            var paramsitem = new ParamItem($('.prop_select.upholdery .prop_img.select.active')[0]);
            paramsitem.click();
        }
    }

    // Price Properties Scroll
    $('.notification_price span').click(function() {
        var offset_top = $('.product__item_properties').offset().top;
        $("html, body").animate({
            scrollTop : offset_top
        }, 500);
    });

    // Price Scroll
    var price_elem = $('.product__item_price_block');
    var price_elem_offset = price_elem.offset().top;
    var prop_elem = $('.product__item_properties');
    var product_cont = $('.product__item_wrap');
    

    if ($(window).width() < 992 && $(window).width() >= 768) {
        var product_left_block_height = $('.product__item_left').height();
        price_elem_offset = parseInt(price_elem_offset + product_left_block_height + price_elem.height());
    }
    else if ($(window).width() < 768) {
        var product_left_block_height = $('.product__item_size').height();
        price_elem_offset = parseInt(price_elem_offset + product_left_block_height - price_elem.height()); 
    }

    function  priceFixed () {
        var scroll = $(window).scrollTop();
        if (scroll >= price_elem_offset && scroll < parseInt(product_cont.offset().top + product_cont.height() - price_elem.height())) {
            prop_elem.css('margin-top', price_elem.height());
            price_elem.addClass('fixed');
            price_elem.removeClass('absolute');
        }
        else if ( scroll >= parseInt(product_cont.offset().top + product_cont.height() - price_elem.height())) {
            price_elem.removeClass('fixed');
            price_elem.addClass('absolute');
        }
        else {
            prop_elem.css('margin-top', 0);
            price_elem.removeClass('fixed');
            price_elem.removeClass('absolute');
        }
    }

    priceFixed();

    $(window).scroll(function(){
        priceFixed();
    });
});