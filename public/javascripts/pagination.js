$(function() {

  /* initiate lazyload defining a custom event to trigger image loading  */
  $("ul li img").lazyload({
    event : "turnPage",
    effect : "fadeIn"
  });

  /* initiate plugin */
  $("div.holder").jPages({
    containerID : "itemContainer",
    animation   : "fadeInUp",
    callback    : function( pages, items ){
      /* lazy load current images */
      items.showing.find("img").trigger("turnPage");
      /* lazy load next page images */
      items.oncoming.find("img").trigger("turnPage");
    }
  });

});