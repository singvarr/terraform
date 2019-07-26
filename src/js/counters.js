const $ = require("jquery");

$(document).ready(function () {
    
	$(window).scroll(function () {
	    if ($('.counters').length && $(window).scrollTop() > $('.counters').offset().top - $(window).height()) {
            $('#final').html(38);
            $('#like').html(35);
            $('#client').html(12);
	    }
	});
})