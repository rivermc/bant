$(document).ready(function(){

/* ----------------------------------------------------------------------- */
/* SendForm */
/* ----------------------------------------------------------------------- */

function sendForm(idForm) {
  var msg=$('#' + idForm).serialize();
  $.ajax({
    type:'POST',
    url:"/assets/template/php/sendForm.php",
    data:msg+"&IDForm=" + idForm,
    cache:false,
    success:function(data){
      callback(data);
    }
  });
};




function callback(check) {

  if (check == 'true') {
    $('.form__callback_error').html('<p>Спасибо! Ваша заявка отправлена!</p><p>Наш менеджер свяжется с Вами в ближайшее время</p>');
    $('#callback__form').hide().delay(8000).queue(function(next) {
      $('#callback__form').show(500);
      $('.form__callback_error').empty();
      next();
    });
  }

  else if (check == 'phone') {
    $('#callback__form' + ' .callback__form_input_phone').addClass('shake').delay(800).queue(function(next){ $('#callback__form .callback__form_input_phone').removeClass('shake');  next(); });
  }

  else if (check == 'policy') {
    $('#callback__form' + ' .policy__check').addClass('shake').delay(800).queue(function(next){ $('.policy__check').removeClass('shake');  next(); });
  }


}


$('.callback button').click(function(){
  var FormId = $(this).parent().attr('id');
  sendForm(FormId);
});


/* ----------------------------------------------------------------------- */
/* Input Label */
/* ----------------------------------------------------------------------- */



$('.callback__form_input').focus(function(){
  $(this).parents('.form__callback_form-group').addClass('focused');
});

$('.form__group_label').click(function(){
  $(this).parents('.form__callback_form-group').addClass('focused');
});

$('.callback__form_input').blur(function(){
  var inputValue = $(this).val();
  if ( (inputValue == "") || (inputValue == '+7 (___) ___-__-__') ) {
    $(this).removeClass('filled');
    $(this).parents('.form__callback_form-group').removeClass('focused');  
  } else {
    $(this).addClass('filled');
  }
});



/* ----------------------------------------------------------------------- */
/* Input Phone Template */
/* ----------------------------------------------------------------------- */

$('.callback__form_input_phone').usPhoneFormat({format: 'x-xxx-xxx-xxxx',});




});