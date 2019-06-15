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

                getModule('Chunk', 'FastBuy', 'id => ' + productID + ', pagetitle => ' + productPagetitle, function (data) {
                    $('.fast_buy_modal').html(data);
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

                    $('input[name=phone], input[name=phoneShipping]').usPhoneFormat({format: 'x-xxx-xxx-xxxx'});



                    $('input[name=delivery]').change(function(e) {
                        var input_checked = ($('input[name=delivery]:checked'));
                        var input_checked_index = input_checked.data('index');
                        $('.change_block').fadeOut(400);
                        setTimeout(function(){
                            $('.delivery_block_' + input_checked_index).fadeIn(400);
                        }, 400);
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
                                    if(data.order){
                                        window.location.href = "/cart?msorder=" + data.order;
                                    }
                                }
                                else{
                                    miniShop2.Message.error(data.message);
                                    if (data.fields) {
                                        var errors = data.fields;
                                        console.log(errors);
                                        errors.forEach(function(item) {
                                            console.log(item);
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
