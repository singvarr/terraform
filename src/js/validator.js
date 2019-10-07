const $ = require("jquery");

const PHONE_PATTERN = /\+(\d{12})\b/;
const CYRILLIC_LETTERS_PATTERN = /^[\u0400-\u04FF]*$/;

$(document).ready(() => {
    $.validator.addMethod(
        "phone",
        value => PHONE_PATTERN.test(value),
        "Введите номер телефона в коректном формате"
    );

    $.validator.addMethod(
        "cyrillic",
        value => CYRILLIC_LETTERS_PATTERN.test(value),
        "Только буквы"
    );

    $.validator.setDefaults({
        errorPlacement: (err, elem) => elem.attr("placeholder", err.text())
    });

    $("#review-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 3,
                cyrillic: true
            },

            comment: {
                required: true,
                minlength: 10,
                cyrillic: true
            }
        },
        messages: {
            name: {
                required: "Укажите свое имя",
                minlength: "Не меньше 3 символов"
            },

            comment: {
                required: "Напишите ваш комментарий",
                minlength: "Не меньше 10 символов"
            }
        },
        submitHandler: () => {
            alert("Ваша форма отправлена");
        }
    });

    const callbackRules = {
        rules: {
            phone: {
                required: true,
                phone: true
            },

            name: {
                required: true,
                minlength: 3,
                cyrillic: true
            }
        },

        messages: {
            name: {
                required: "Укажите свое имя",
                minlength: "Не меньше 3 символов"
            },

            phone: {
                required: "Вы не ввели номер"
            }
        },
        submitHandler: () => alert("Ваша форма отправлена")
    };

    $("#callback-form").validate(callbackRules);
    $("#dive-form").validate(callbackRules);

    $("#search").validate({
        rules: {
            query: {
                required: true,
                minlength: 5
            }
        },

        messages: {
            query: {
                required: "Введите запрос",
                minlength: "Не меньше 5 символов"
            }
        }
    });
});
