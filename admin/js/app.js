$('nav .close').on('click', function(){
	$('nav').toggleClass('show');
	$('nav .user').toggleClass('hidden');
	$('nav ul li a p,nav ul li span ').toggleClass('hidden');
	$('nav ul').toggleClass('margintop');
	$(this,'i').toggleClass('rotate');
});
$('nav ul.menu li').on('click', function(){
	$('nav ul li').removeClass('active');
	$(this).addClass('active');
});