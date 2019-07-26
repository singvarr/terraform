const $ = require("jquery");

$(document).ready(function() {
    //CAROUSELS
    $('.slider ul').slick({
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    lazyLoad: 'ondemand',
  });

	//reviews-list
    $('#reviews-list').slick({
  		arrows: true,
        lazyLoad: 'ondemand'
    });

	//Lightbox
	$('.gallery').lightGallery({
		autoplayControls: true,
		download: false,
		share: false,
		actualSize: false
	});
});



