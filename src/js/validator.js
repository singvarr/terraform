$(document).ready(function() {
	$.validator.addMethod('phone', function(value, elem) {
		return /\+(\d){10,12}\b/.test(value);
	}, 'Введите номер телефона в коректном формате');

	$.validator.addMethod('cyrillic', function(value, elem) {
		return /^[\u0400-\u04FF]*$/.test(value);
	}, 'Только буквы');

	$.validator.setDefaults({
		errorPlacement: function (err, elem) {
			err.appendTo(elem.parent().find('.error-log'));
		}
	});

	$('form').append('<div class="error-log"/>')

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
				minlength: 'Введите не меньше 3 символов'
			},

			comment: {
				required: 'Напишите ваш комментарий',
				minlength: 'Введите не меньше 10 символов',
			}
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
				minlength: 'Введите не меньше 3 символов'
			},

			phone: {
				required: 'Вы не ввели номер телефона'
			}
		}
	};

	$('#callback-form').validate(callbackRules);
	$('#dive-form').validate(callbackRules);

	$('#search').validate({
		rules: {
			query: {
				required: true,
				minlength: 5,
				cyrillic: true
			}
		},
		
		messages: {
			query: {
				required: 'Введите текст запроса',
				minlength: 'Введите не меньше 5 символов'
			}
		}
	})
})