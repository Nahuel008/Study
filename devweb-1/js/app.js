$(document).ready(function(){
    // Menu
    $(window).ready(function() {    
        var scroll = $(window).scrollTop(); 
    if (scroll >= 50) {
        $("nav").addClass("scroll");
    } else {
        $("nav").removeClass("scroll");
    }
});
$(window).scroll(function() {    
    var scroll = $(window).scrollTop(); 
if (scroll >= 50) {
    $("nav").addClass("scroll");
} else {
    $("nav").removeClass("scroll");
}
});
$('nav .responsive').on('click',function(){
    var scroll = $(window).scrollTop();
    $('nav ul').toggleClass('show-menu');
    if (scroll >= 50) {
        $("nav").addClass("scroll");
    } else {
        $("nav").removeClass("scroll");
    }
    $('nav .responsive i').toggleClass('cruz');
});
$('nav ul li a').on('click',function(){
    $('nav ul').removeClass('show-menu');
    $('nav .responsive i').removeClass('cruz');
});

     $(function(){
    $('nav a').click(function(){
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')&& location.hostname == this.hostname){
        var $target = $(this.hash);
        $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
        if ($target.length) {
          var targetOffset = $target.offset().top;$('html,body').animate({scrollTop:targetOffset -60}, 1000);
          return false;
              }
         }
     });
  });
    // Header
$('.gif img:gt(0)').hide();
setInterval(function(){
    $('.gif :first-child').fadeOut(0).next('.img').fadeIn(200)
    .end().appendTo('.gif');
}, 4500);

$(window).scroll(function(){
    var scroll = $(window).scrollTop();
    var pos = scroll/10;
    $('.gif').css({
        'transform': 'translateX(-'+pos*5+'px)'
    });
    $('.texto').css({
        'transform': 'translateY('+pos*3+'px)'
    });
});
        // Portfolio
//Variables		
var slider = $('#items')[0];
var dw = false;
var Xini;
var scroll;
//Mouse
$(slider).mousedown(function(e) {
e.preventDefault;
dw = true;
Xini = e.pageX - slider.offsetLeft;
scroll = slider.scrollLeft;
});
$(slider).mouseleave(function() {
dw = false;
});
$(slider).mouseup(function(){
dw=false;
});
$(slider).mousemove(function(e){
if(!dw) return;
e.preventDefault();
var x = e.pageX - slider.offsetLeft;
var move = (x - Xini) * 1;
slider.scrollLeft = scroll - move;
});
//Touch
$(slider).on("touchstart",function(e){
var touchobj = e.changedTouches[0];
Xini = parseInt(touchobj.clientX);
dw = true;
scroll = slider.scrollLeft;
});
$(slider).on("touchmove",function(e){
if(!dw) return;
var x = e.touches[0].clientX - slider.offsetLeft;
var move = (x - Xini) * 1;
slider.scrollLeft =(scroll - move);
});
//Animaciones

});