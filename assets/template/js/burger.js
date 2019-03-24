$(document).ready(function(){

	$('.burger__button').click(function() {
	  $(this).addClass('burger__button_open').removeClass('burger__button_close');
	  $('.menu_burger').addClass('active');
	});
	
	$('.menu_burger').click(function() {
	  $('.burger__button').addClass('burger__button_open').removeClass('burger__button_close');
	  $('.menu_burger').removeClass('active');

	});
});