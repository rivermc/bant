$(document).ready(function(){

  /* ----------------------------------------------------------------------- */
  /* SendForm */
  /* ----------------------------------------------------------------------- */

  function sendForm(idForm) {
    var msg=$('#' + idForm).serialize();
    $.ajax({
      type:'POST',
      url:"/assets/template/php/sendForm.php",
      data:msg,
      cache:false,
      beforeSend: function() {
        $('#' + idForm + ' button').prop('disabled', true);
        callback('true', idForm);
      },
      success:function(data) {
        callback(data, idForm);
        $('#' + idForm + ' button').prop('disabled', false);
      }
    });
  }


  function callback(check, idForm) {

    if (check == 'true') {
      $('#' + idForm).fadeOut(500).delay(8000).queue(function(next) {
        $('#' + idForm).fadeIn(500);
        $('.form__callback_error').empty();
        next();
      });
      setTimeout(function(){
        $('.form__callback_error').html('<p>Спасибо! Ваша заявка отправлена!</p><p>Наш менеджер свяжется с Вами в ближайшее время</p>');        
      },500);
    }
  }


  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  function isPhone(phone) {
    var regex = /^\+?([\d]{1})\)?[- ]*[( ]*?([\d]{3})?[) ]*[- ]?([\d]{3})[- ]?([\d]{2})[- ]?([\d]{2})$/;
    return regex.test(phone);
  }
  
  /* ----------------------------------------------------------------------- */
  /* Events */
  /* ----------------------------------------------------------------------- */

  $('.callback button, .callback_b2b button').click(function(e){
    e.preventDefault();
    var FormId = $(this).parents('form').attr('id');
    var inputs = $(this).parents('form').find('input');
    var test = true;
    var send_check = [];
    
    $(inputs).each(function(index, item) {
      var inputName = $(item).attr('name');
      if ( inputName == 'email') {
        var valueInputEmail = $(item).val();
        test = isEmail(valueInputEmail);
        send_check.push(test);
      }
      else if (inputName == 'phone') {
        var valueInputPhone = $(item).val();
        test = isPhone(valueInputPhone);
        send_check.push(test);
      }
      if (test == false) {
        $('.callback__form' + ' .callback__form_input_' + $(item).attr('name')).addClass('shake').delay(800).queue(function(next){ $('.callback__form .callback__form_input_' + $(item).attr('name')).removeClass('shake');  next(); });
      }
    });
    send_check.forEach(function(item){
      if (item == false) {
        test = false;
      }
    });
    if (test == true) {
      sendForm(FormId);
    }
  });

  $('.callback__form_input').focus(function(){
    var callback_group = $(this).parent();
    callback_group.addClass('focused');
  });

  $('.form__group_label').click(function(){
    var callback_group = $(this).parent();
    callback_group.addClass('focused');
    callback_group.find('input').focus();
  });

  $('.callback__form_input').blur(function(){
    var inputValue = $(this).val();
    if (inputValue == "") {
      $(this).removeClass('filled');
      $(this).parent().removeClass('focused');
    } else {
      $(this).addClass('filled');
    }
  });


});