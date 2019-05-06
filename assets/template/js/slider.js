$(document).ready(function(){

//-------------------------------------------------------------------------//
		// Vars Slider //
//-------------------------------------------------------------------------//

	var sliderContainer = $('.slider__wrap'); // контейнер
	var slideBlock = '.slider__item'; // селектор слайда
	var activeSlide = '.slider__item.active'; // селектор активного слайда
	var containerWidth = sliderContainer.width(); // ширина контейнера
	var BlockWidth = containerWidth; // ширина блока
	var slideWidth; // ширина слайда
	var sliderTimer; // таймер слайда
	var firstSlide; // первый слайд
	var currentSlide; // номер текущего слайд
	var activeSlideData; // номер текущего слайд по data

//-------------------------------------------------------------------------//
		// Start Slider //
//-------------------------------------------------------------------------//

var widthSliderStyle = '.slider__item';


$(widthSliderStyle).width(containerWidth);
containerWidth = BlockWidth * $(slideBlock).length;
sliderContainer.css('left', '-' + $(slideBlock).width() + 'px');
$('.slider__wrap').width(containerWidth);
nextSlide();
sliderTimer = setInterval( nextSlide, 3500); // запускаем таймер



//-------------------------------------------------------------------------//
		// Function Move NextSlide //
//-------------------------------------------------------------------------//

	function nextSlide(){
	    currentSlide = parseInt($(activeSlide).index()) + 1; // порядковый номер активного слайда
		activeSlideData = parseInt($(activeSlide).data('slide')); // data номер активного слайда
		slideWidth = $('.slider__item').width(); // ширина слайда

		// перемещение слайда с псевдоанимацией
		sliderContainer.css( {'transition': 'all 0.4s','left' : parseInt(-slideWidth*2) +'px'} ).delay(500).queue(function(next){ 
			sliderContainer.css({'transition' : '0s' ,'left': parseInt(-slideWidth) +'px'});
	    		firstSlide = sliderContainer.children().first();
		    	sliderContainer.append(firstSlide.clone(true));
		    	sliderContainer.children().first().remove();
			next(); 
		});

		//переключаем активный слайд
	    $(slideBlock).removeClass('active').eq(currentSlide).addClass('active');

	    //переключаем активную кнопку
	    $('.slider__btn a').removeClass('slide__active_btn');


		$('.slider__btn a[slide = ' + (activeSlideData - 1) + ']').addClass('slide__active_btn');
	};

//-------------------------------------------------------------------------//
		// Function Move PrevSlide //
//-------------------------------------------------------------------------//

	function prevSlide(){
	    currentSlide = parseInt($(activeSlide).index()) - 1; // порядковый номер активного слайда
		activeSlideData = parseInt($(activeSlide).data('slide')); // data номер активного слайда
		slideWidth = $('.slider__item').width(); // ширина слайда

		// перемещение слайда с псевдоанимацией
		sliderContainer.css( {'transition': 'all 0.4s','left' : 0} ).delay(500).queue(function(next){ 
			sliderContainer.css({'transition' : '0s' ,'left': parseInt(-slideWidth) +'px'});
	    		lastSlide = sliderContainer.children().last();
		    	sliderContainer.prepend(lastSlide.clone(true));
		    	sliderContainer.children().last().remove();
			next(); 
		});

		//переключаем активный слайд
	    $(slideBlock).removeClass('active').eq(currentSlide).addClass('active');

	    //переключаем активную кнопку
	    $('.slider__btn a').removeClass('slide__active_btn');
		$('.slider__btn a[slide = ' + (activeSlideData - 1) + ']').addClass('slide__active_btn');
	};


//-------------------------------------------------------------------------//
		// Function Move To Slide //
//-------------------------------------------------------------------------//


	function toSlide (number) {
		clearInterval(sliderTimer); // отключаем таймер


		sliderContainer.css({'transition': 'all 0.4s','left' :  number * (-slideWidth) + 'px'} );

		//переключаем активный слайд
	    $(slideBlock).removeClass('active').eq(number).addClass('active');
	    //переключаем активную кнопку
	    $('.slider__btn a').removeClass('slide__active_btn');
		$('.slider__btn a[slide = ' + (number) + ']').addClass('slide__active_btn');
	};


//-------------------------------------------------------------------------//
		// Generate Slide Buttons //
//-------------------------------------------------------------------------//



	$(slideBlock).each(function(i,elem) {
		if ( i == 1) {
			slideBtn = '<a href="javascript:void(0);" class="nopreload slide__btn_a slide__active_btn" slide="'+ i + '"><div class="slide__btn"><div class="slide__btn_inner"></div></div></a>'; // первая кнопка с активным классом
			$('.slider__btn').append(slideBtn);
		}
		else {
			slideBtn = '<a href="javascript:void(0);" class="nopreload slide__btn_a" slide="'+ i + '"><div class="slide__btn"><div class="slide__btn_inner"></div></div></a>';
			$('.slider__btn').append(slideBtn);
		};
	});


//-------------------------------------------------------------------------//
		// Events Buttons //
//-------------------------------------------------------------------------//


	$('.slider__btn a').click(function() {
		if (!$(this).hasClass('slide__active_btn')) {
			var slidenumber = $(this).index(); // берем номер слайда
			toSlide(slidenumber);
		}
	});

/*
	$('.slider-nav svg').click(function() {
		var slidenumber = $('.slider-bl.active').index();
		clearInterval(sliderTimer); // отключаем таймер

		if ($(this).parent().hasClass('prev')) {
			if ( slidenumber == 0 ) {
				slidenumber = $(slideBlock).length - 1;
			}
			else {
				slidenumber -= 1;
			};
			prevSlide(slidenumber);
		}

		else {
			if ( slidenumber == $(slideBlock).length - 1 ) {
				slidenumber = 0;
			}
			else {
				slidenumber += 1;
			};
			nextSlide(slidenumber);
		};
			
	});
*/


//-------------------------------------------------------------------------//
		// Swioe Slider //
//-------------------------------------------------------------------------//



if (BlockWidth < 768) {

	$(sliderContainer).on( "swipeleft", swipeleftHandler );
	$(sliderContainer).on( "swiperight", swiperightHandler );

	function swipeleftHandler( event ){
		clearInterval(sliderTimer); // отключаем таймер
	    var slidenumber = $(sliderContainer).find('.review-bl.active').index();

	    	nextSlide(slidenumber + 1);

	}


	function swiperightHandler( event ){
		clearInterval(sliderTimer); // отключаем таймер
	    var slidenumber = $(sliderContainer).find('.review-bl.active').index();
	    	prevSlide(slidenumber - 1);
	}

};



});




















