const $ = require("jquery");

const GO_UP_BUTTON_TOP_MARGIN = 600;

$(document).ready(() => {
    $(window).on("scroll", function onScroll() {
        $("nav a[href^='#']").on("click", function(e) {
            e.preventDefault();
            $(document).off("scroll");

            const target = this.hash;
            const $target = $(target);

            $("body")
                .stop()
                .animate(
                    {
                        scrollTop: $target.offset().top
                    },
                    500,
                    "swing",
                    () => {
                        window.location.hash = target;
                        $(window).on("scroll", onScroll);
                    }
                );
        });

        $(document).scrollTop() < GO_UP_BUTTON_TOP_MARGIN
            ? $("#go-up").hide()
            : $("#go-up").show();
    });

    $("#go-up").on("click", () => {
        $("body").animate(
            {
                scrollTop: 0
            },
            2000
        );
    });
});
