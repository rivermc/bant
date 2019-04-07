

$(document).ready(function(){
	$('.header__search p, .header__search svg').click(function(){
		$('.search_form_cont').addClass('active');
	});
	$('.search__form_close').click(function() {
		$('.search_form_cont').removeClass('active');
	});
});