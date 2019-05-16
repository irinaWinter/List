$(function(){

// Создание задачи

	$('#add')
	.click(function(){

		// Получение содержимого полей ввода
		var newTask = $('input#input-name').val(); 
		var newDescription = $('textarea.input-description').val();
		var task = '<div class="list-item">' +
								   		'<div class="task-name">' +
								   			'<h3>' + newTask + '</h3>' +
								   			'<button class="delete">' + '</button>' +
								   			'<button class="slide">' + '</button>' + 
								   		'</div>' +
								   		'<div class="description">' +
								   			newDescription +
								   		'</div>' +
							   		'</div>';
		var i = 0;				   		

		if (newTask != 0 && newDescription != 0) {
			$('.empty').hide();

			// Добавление задачи
			if ( $('#todo-list-box').find('h3').length == 0 ) {
				$('#todo-list-box').append(task);
				 // Очистка формы после добавления задачи
				$('input, textarea').val('');	
			} else {
				$('h3').each(function() {
					if (newTask === $(this).text()) {
						i++;	
					};
				});
				// Проверка на наличие идентичной задачи
				if (i == 0) {
					$('#todo-list-box').append(task);
				} else {
					// Такая задача уже существует
					$('#add').prop('disabled', true);
					$('.error-repeat').css('display', 'block');	
					$('#input-name').keydown(function() {
						$('.error-repeat').css('display', 'none');
					});
					return $('#add').prop('disabled', false);
				};
			}
		} else {
			if (newTask == 0) {
				// Отсутствует название	задачи
				$('.error-name').css('display', 'block');	
				$('#add').prop('disabled', true);
				$('#input-name').keydown(function() {
					$('.error-name').css('display', 'none');
				});
				return $('#add').prop('disabled', false);
			} else if (newDescription == 0) {
				// Отсутствует описание задачи
				$('.error-description').css('display', 'block');	
				$('#add').prop('disabled', true);
				$('.input-description').keydown(function() {
					$('.error-description').css('display', 'none');
				});
				return $('#add').prop('disabled', false);
			}

		}
		 // Очистка формы после добавления задачи
		$('input, textarea').val('');	
	});

	// Удаление задачи
	$('body').delegate('button.delete', 'click', function(){
		$(this).closest('.list-item').remove(); 

		// Показ/скрытие "Список задач пуст..."
		if($('.task-name').length > 0){ 
			$('.empty').hide();	
		} else {
			$('.empty').show();
		}
	});

	// Скрытие/раскрытие описания задачи
	$('body').delegate('button.slide', 'click', function(){
		$(this).toggleClass('slide-rotate').parent().next().slideToggle();
	});

	// Перетаскивание задач
	$('#todo-list-box').sortable();
	$('#todo-list-box').disableSelection();

});
