/* ----------------------------------------------------------------------- */
// basket // chunk/basket.html */
/* ----------------------------------------------------------------------- */


function basket_init() {
    $('button.count_product').unbind('click');
    $('button.count_product').on('click', function() {
        var key = $(this).data('id');
        var input = $('input[data-id=' + key + ']');
        console.log(input);
        var inputVal = parseInt(input.val());
        var allPrice = $('.product_price[data-id=' + key + ']');
        var productPrice = allPrice.data('price');
        if ($(this).hasClass('plus')) {
            input.val(inputVal + 1);
            input.parent().find('p').html(inputVal + 1);
        }
        else {
            input.val(inputVal - 1);
            input.parent().find('p').html(inputVal - 1);
        }
        inputVal = parseInt(input.val());
        allPrice.html(productPrice * inputVal);
    });


    $('.msCartMini .minicart_button.open').click(function(){
        $(this).parents('.msCartMini').addClass('active');
    });
    $('.msCartMini .minicart_button.close').click(function(){
        $(this).parents('.msCartMini').removeClass('active');
    });

    $('input[name=delivery]').change(function() {
        $('input[name=delivery]').parents('.checkbox').removeClass('tooltip_target');
        $(this).parents('.checkbox').addClass('tooltip_target');
        if ($(this).val() === '2') {
            $('.order_total .subtitle').show();
        }
        else {
            $('.order_total .subtitle').hide();
        }
    });

}