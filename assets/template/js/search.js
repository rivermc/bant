

$(document).ready(function(){
	$('.search_input').focus(function(){
		$(this).addClass('active');
	});
	$('.search_input').blur(function(){
		$(this).removeClass('active');
	});
});