/* ----------------------------------------------------------------------- */
/* carousel items */
/* ----------------------------------------------------------------------- */

$(document).ready(function(){

    class CarouselItems {

        constructor(item) {
            this.btn = $('.title_btn span');
            this.block = $('.carousel__main_wrap');
            this.blockActive = $('.carousel__main_wrap').eq(item);
            this.nav = $('.nav_btn');
            this.enabled = true;
            this.initialization();
            this.start_auto_scroll();
        }

        widthScreen() {
            var width = $(window).width();
            return width;
        }

        initialization() {
            var childrens = this.blockActive.children('.carousel__main_item');
            var countItems = childrens.length;
            var width = this.widthScreen();
            var i = 10;
            if (width < 992 && width >= 768) {
                i = 6;
            }
            else if (width < 768) {
                i = 4;
            }
            while ( i < countItems) {
                childrens.eq(i).remove();
                i++;
            }
            if (countItems % 2 != 0) {
                childrens.first().clone().appendTo( this.blockActive );
            }
            //var width = parseInt(20 * countItems);
            //width = width < 100 ? 100 : width;
            //this.blockActive.width(width + '%');
        }
        
        enabled_slide() {
            var self_this = this;
            setTimeout(function(){
                self_this.enabled = true;
                console.log(self_this.enabled);
            }, 1000);            
        }

        block_next() {
            if (this.enabled) {
                this.enabled = false;
                var slide = parseInt($(this.blockActive).attr('slide'));
                this.blockActive.css('transform', 'translateX(-50%)').attr('slide', slide + 1);
                this.enabled_slide();
                this.nav_arrow_change('next');
            }
        }

        block_prev() {
            if (this.enabled) {
                this.enabled = false;
                var slide = parseInt($(this.blockActive).attr('slide'));
                this.blockActive.css('transform', 'translateX(0)').attr('slide',  slide - 1);
                this.enabled_slide();
                this.nav_arrow_change('prev');
            }
        }
        
        nav_arrow_change(nav) {            
            if (nav == 'next') {
                this.nav.find('.next').css('opacity', '0');
                this.nav.find('.prev').css('opacity', '1');                
            }
            else {
                this.nav.find('.prev').css('opacity', '0');
                this.nav.find('.next').css('opacity', '1');                
            }
        }
        
        auto_scroll() {
            var slide = parseInt($(this.blockActive).attr('slide'));
            if (slide == 0) {
                this.block_next();
            }
            else if (slide == 1) {
                this.block_prev();
            }
        }
        
        start_auto_scroll() {
            var self_this = this;
            this.timerId = setInterval(function(){
                self_this.auto_scroll();
            }, 2300);
        }

        nav_click(btn) {
            clearInterval(this.timerId);
            if ($(btn).hasClass('next')) {
                this.block_next();
            }
            else {
                this.block_prev();
            }
        }

        btn_click(btn) {
           var index = $(btn).data('slide');
           this.change(index);
        }

        change(number) {
            clearInterval(this.timerId);
            this.btn.removeClass('active');
            this.block.removeClass('active');
            this.btn.eq(number).addClass('active');
            this.block.eq(number).addClass('active');
            this.blockActive = $('.carousel__main_wrap.active');
            this.nav_arrow_change('prev');
        }
    }
    
    var carousel =  new CarouselItems(0);
    $('.title_btn span').click(function() {
        if (!$(this).hasClass('active')) {           
            carousel.btn_click(this);            
            carousel.start_auto_scroll(this);            
        }
    });
    
    $('.nav_btn div').click(function() {
        carousel.nav_click(this);
    });
});
