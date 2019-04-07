/* ----------------------------------------------------------------------- */
// basket // chunk/basket.html */
/* ----------------------------------------------------------------------- */

$(document).ready(function(){

    $('button .count_product').click(function(){
        var input = $(this).parent().siblings('input');
        var inputVal = parseInt(input.val());
        var key = input.data('id');
        var allPrice = $('.product_price[data-id=' + key + ']');
        var productPrice = allPrice.data('price');
        if ($(this).hasClass('plus')) {
            input.val(inputVal + 1)
        }
        else {
            input.val(inputVal - 1)
        }
        //input.trigger('change');
        inputVal = parseInt(input.val());
        allPrice.text(productPrice * inputVal);
    });
});