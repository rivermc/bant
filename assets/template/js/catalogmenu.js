$(document).ready(function(){
  /* ----------------------------------------------------------------------- */
  /* catalog menu */
  /* ----------------------------------------------------------------------- */

$( ".catalog__left > ul > li:not(active)" )
  .mouseover(function() {

    if (!$(this).hasClass('active')) {
      $( this ).find( "ul" ).stop( true, false ).slideDown(400);
    }

  })
  .mouseout(function() {

    if (!$(this).hasClass('active')) {
      $( this ).find( "ul" ).stop( true, false  ).slideUp(400);
    }
  });

 });