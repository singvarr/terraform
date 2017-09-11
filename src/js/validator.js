$(document).ready(function() {
	$.validator.addMethod('phone', function(value, elem) {
		return /\+(\d{12})\b/.test(value);
	}, 'Введите номер телефона в коректном формате');

	$.validator.addMethod('cyrillic', function(value, elem) {
		return /^[\u0400-\u04FF]*$/.test(value);
	}, 'Только буквы');

	$.validator.setDefaults({
		errorPlacement: function (err, elem) {
			elem.attr("placeholder", err.text());
		}
	});

	$('#review-form').validate({
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
			},
		},

		messages: {
			name: {
				required: 'Укажите свое имя',
				minlength: 'Не меньше 3 символов'
			},

			comment: {
				required: 'Напишите ваш комментарий',
				minlength: 'Не меньше 10 символов',
			}
		},
		
		submitHandler: function(form) {
    		alert("Ваша форма отправлена");
  		}
	});

	var callbackRules = {
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
				required: 'Укажите свое имя',
				minlength: 'Не меньше 3 символов'
			},

			phone: {
				required: 'Вы не ввели номер'
			}
		},

		submitHandler: function(form) {
    		alert("Ваша форма отправлена");
  		}
	};

	$('#callback-form').validate(callbackRules);
	$('#dive-form').validate(callbackRules);

	$('#search').validate({
		rules: {
			query: {
				required: true,
				minlength: 5,
			}
		},
		
		messages: {
			query: {
				required: 'Введите запрос',
				minlength: 'Не меньше 5 символов'
			}
		}
	})
})