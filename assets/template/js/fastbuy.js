/* ----------------------------------------------------------------------- */
/* Fast buy */
/* ----------------------------------------------------------------------- */

function fast_buy(elem) {

    $(elem).magnificPopup({
        type: 'inline',
        preloader: false,
        removalDelay: 400,

        callbacks:  {
            beforeOpen: function() {
                var productID = $(this.st.el).data('id');
                var productPagetitle = $(this.st.el).data('title');

                getModule('Chunk', 'OneClickBuy', 'id => ' + productID + ', pagetitle => ' + productPagetitle, function (data) {
                    $('.fast_buy_modal').html(data);
                    $('.form_input').focus(function(){
                        var callback_group = $(this).parent();
                        callback_group.addClass('focused');
                    });

                    $('.form__group_label').click(function(){
                        var callback_group = $(this).parent();
                        callback_group.addClass('focused');
                        callback_group.find('input').focus();
                    });

                    $('.form_input').blur(function(){
                        var inputValue = $(this).val();
                        if (inputValue === "") {
                            $(this).removeClass('filled');
                            $(this).parent().removeClass('focused');
                        } else {
                            $(this).addClass('filled');
                        }
                    });

                    $('.ajax_form_offer').submit(function(e){
                        e.preventDefault();
                        var msg = $(this).serialize();
                        var url = '/assets/template/php/fastBuy.php';
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: msg,
                            dataType: "json",
                            success: function(data) {
                                console.log(data);
                                if(data.success){
                                    miniShop2.Message.success(data.message);
                                    if(data.data.msorder){
                                        window.location.href = "/cart?msorder="+data.data.msorder;
                                    }
                                }
                                else{
                                    miniShop2.Message.error(data.message);
                                    if (data.fields) {
                                        var errors = data.fields;
                                        errors.forEach(function(item) {
                                            $('.fast_buy_modal [name=' + item + ']').addClass('shake').delay(800).queue(function(next){ $('.fast_buy_modal [name=' + item + ']').removeClass('shake');  next(); });
                                        });
                                    }
                                }
                            }
                        });
                    });
                });

            },
            open: function() {
                $('body').css({'margin-right': '15px'});
            },
            close: function() {
                $('body').css({'margin-right': '0'});
            }
        }
    });
}
