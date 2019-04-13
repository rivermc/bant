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
        callback('true');
      },
      success:function(data) {
        callback(data);
        $('#' + idForm + ' button').prop('disabled', false);
      }
    });
  }


  function callback(check) {

    if (check == 'true') {
      $('#callback__form').fadeOut(500).delay(8000).queue(function(next) {
        $('#callback__form').fadeIn(500);
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
    
    $(inputs).each(function(index, item) {
      var inputName = $(item).attr('name');
      if ( inputName == 'email') {
        var valueInputEmail = $(item).val();
        test = isEmail(valueInputEmail);
      }
      else if (inputName == 'phone') {
        var valueInputPhone = $(item).val();
        test = isPhone(valueInputPhone);
      }
      if (test == false) {
        $('.callback__form' + ' .callback__form_input_' + $(item).attr('name')).addClass('shake').delay(800).queue(function(next){ $('.callback__form .callback__form_input_' + $(item).attr('name')).removeClass('shake');  next(); });
      }
    });
    if (test == true) {
      sendForm(FormId);
    }
  });

  $(document).on('focus', '.callback__form_input', function(){
    var callback_group = $(this).parents('.form__callback_form-group');
    callback_group.addClass('focused');
    callback_group.find('input').focus();
  });

  $(document).on('click', '.form__group_label', function(){
    var callback_group = $(this).parents('.form__callback_form-group');
    callback_group.addClass('focused');
    callback_group.find('input').focus();
  });

  $(document).on('blur', '.callback__form_input', function(){
    var inputValue = $(this).val();
    if ( (inputValue == "")) {
      $(this).removeClass('filled');
      $(this).parents('.form__callback_form-group').removeClass('focused');
    } else {
      $(this).addClass('filled');
    }
  });


});