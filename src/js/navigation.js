const $ = require("jquery");

$(document).ready(function() {
    //Anchor navigation
	$(window).on("scroll", function onScroll() {	
		$("nav a[href^='#']").on('click', function (e) {
			e.preventDefault();
			$(document).off("scroll");

			var target = this.hash;
			$target = $(target);
			
			$('body').stop().animate({
				'scrollTop': $target.offset().top
			}, 500, 'swing', function () {
				window.location.hash = target;
				$(window).on("scroll", onScroll);
			});
		});

		$(document).scrollTop() < 600 ?
		$('#go-up').hide():
		$('#go-up').show();
		
    });

    //Go up button
    $('#go-up').on('click', function() {
        $('body').animate({
            scrollTop: 0
        }, 2000)
    });
});