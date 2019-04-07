$(document).ready(function() {

    $('.filter_toggle').click(function() {
        var filter_block = $('.catalog_filter');
        if ($(this).hasClass('active')) {
            $(this).toggleClass('active', false);
            $('#mse2_filters .filter_reset').trigger('click');
            filter_block.hide(400);
        }
        else {
            $(this).toggleClass('active', true);
            filter_block.show(400);            
        }
    });

    $('#mse2_filters .filter_reset').click(function() {
        $('.product__item_prop label').toggleClass('checked', false);
        $('.product__item_prop input').prop('checked', false);
    });
    
});