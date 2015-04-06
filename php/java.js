var myName = "Blog 101 ";


var red = [0, 100, 63];
var orange = [40, 100, 60];
var green = [75, 100, 40];
var blue = [196, 77, 55];
var purple = [280, 50, 60];
var letterColors = [red, orange, green, blue, purple];

drawName(myName, letterColors);

if(10 < 3)
{
    bubbleShape = 'square';
}
else
{
    bubbleShape = 'circle';
}

bounceBubbles();




$('article').readmore({
  speed: 75,
  maxHeight: 500
});

$('article').readmore({
  afterToggle: function(trigger, element, expanded) {
    if(! expanded) { // The "Close" link was clicked
      $('html, body').animate( { scrollTop: element.offset().top }, {duration: 100 } );
    }
  }
});

$('article').readmore({sectionCSS: 'display: inline-block; width: 50%;'});
$('article').readmore({embedCSS: false});
$('article').readmore('destroy');













$(document).ready(function() {
  
  var $slider = $("#navSlider");
  var $menuItem = $("nav ul li");
  var $currentPage = $(".current-page");
  var $currentPagePos = $(".current-page").position();
  
  $slider
      .width("5px")
      .height($menuItem.height())
      .css("top", $currentPage.position().top)
      .data("currentPos", $slider.position().top);
  
  $menuItem.hover(function () {
    var $el = $(this);
    var $newPos = $el.position().top;
    
    $slider.stop().animate({
      "top": $newPos + "px"
    }, 200);
  }, function () {
      $slider.stop().animate({
        "top": $slider.data("currentPos")
      }, 200);
  });
});