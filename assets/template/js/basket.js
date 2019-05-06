/* ----------------------------------------------------------------------- */
// basket // chunk/basket.html */
/* ----------------------------------------------------------------------- */


function basket_init() {
    $('button.count_product').unbind('click');
    $('button.count_product').on('click', function() {
        var key = $(this).data('id');
        var input = $('input[data-id=' + key + ']');
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


    $('.msCardMini .minicart_button.open').click(function(){
        $(this).parents('.msCardMini').addClass('active').css('right', '0');
    });
    $('.msCardMini .minicart_button.close').click(function(){
        $(this).parents('.msCardMini').removeClass('active').css('right', '-100%');
    });
}