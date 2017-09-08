$(document).ready(function() {
	function animation(dest, reverse, target, handler) {
		var positions = {
			start: {},
			end: {}
		};
		positions.dest = dest;
		var side = Object.keys(positions.dest)[0];
		
		positions.start[side] = -$(target).height();
		
		$(target).css(positions.start);

		$(handler).on('click', function() {
			$(target).show().animate(positions.dest, 700, 'swing');
		});

		$(target + ' .close').on('click', function() {
			if(reverse) {
				positions.end[side] = '100%';
				$(target).animate(positions.end, 700, 'swing', 
					function() {
						$(this).css(positions.start).hide();
					}
				);
			} else {
				$(target).animate(positions.start, 700, 'swing', 
					function() {
						$(this).hide();
					}
				)
			}
		});
	}

	animation({top: 0}, false, '#mobileMenu', '#sandwich');
	animation({top: 0}, true, '#map', '#showMap');
	animation({bottom: 20}, false, '#callbackForm', '#callbackBtn');
	animation({top: 0}, true, '#reviewForm', '#addReview');
	animation({top: 0}, true, '#serviceDetails', '.service');

	$('#btnDive').on('click', function() {
		$('.whale').animate({
			top: '+=200',
			left: '+=50%',
			opacity: '0'
		}, 800, 'swing', function() {
			$(this)
				.hide()
				.css('left', '-=100%')
		});
		
		$(this).css('opacity','0');
		$('.dive-form')
			.show()
			.animate({
				top: '20',
			}, 500, 'swing')
	});
	
	$('.whale-rise').on('click', function() {
		$('.dive-form')
			.animate({top: '100%'}, 500, 'swing', 
			function() {
				$(this).hide();
		});
		$('#btnDive').css('opacity', '1');
	
		$('.whale')
			.show()
			.animate({
				opacity: '1',
				top: '-=200',
				left: '+=50%'
			}, 800, 'swing')
	});
});

