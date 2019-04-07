$(document).ready(function(){
  /* ----------------------------------------------------------------------- */
  /* catalog menu */
  /* ----------------------------------------------------------------------- */
/*
$( ".catalog__main_item" )
  .mouseover(function() {
      $(this).find( ".main__item_invisible" ).stop( true, false ).slideDown(400);
  })
  .mouseout(function() {
      $(this).find( ".main__item_invisible" ).stop( true, false  ).slideUp(400);
  });

*/
    if ($(window).width() >= 996) {
        $(document).on("mouseover", ".catalog__main_item", function() {
            $(this).find( ".main__item_invisible" ).stop( true, false ).slideDown(400);
        });
        $(document).on("mouseout", ".catalog__main_item", function() {
            $(this).find( ".main__item_invisible" ).stop( true, false  ).slideUp(400);
        });  
    }
    
    
    
    $('.catalog__page label.prop_img input').change(function() {
        isChecked = $(this).is(':checked');
        $(this).prop('checked', isChecked);
        $(this).parent().toggleClass('checked', isChecked);
    });
 });