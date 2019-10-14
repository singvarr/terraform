const $ = require("jquery");
const stats = require("../fixtures");

$(document).ready(() => {
    $(window).scroll(() => {
        if (
            $(".counters").length &&
            $(window).scrollTop() >
                $(".counters").offset().top - $(window).height()
        ) {
            stats.forEach(stat => {
                const { id, quantity } = stat;
                $(`$${id}`).html(quantity);
            });
        }
    });
});
