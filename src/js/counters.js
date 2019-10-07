const $ = require("jquery");

$(document).ready(() => {
    $(window).scroll(() => {
        if (
            $(".counters").length &&
            $(window).scrollTop() >
                $(".counters").offset().top - $(window).height()
        ) {
            $("#final").html(38);
            $("#like").html(35);
            $("#client").html(12);
        }
    });
});
