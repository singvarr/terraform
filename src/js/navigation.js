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
		$('#goUp').hide():
		$('#goUp').show();
		
    });

    //Go up button
    $('#goUp').on('click', function() {
        $('body').animate({
            scrollTop: 0
        }, 2000)
    });
});