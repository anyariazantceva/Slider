$(function () {
	var slider = $(".slider");
	var list = slider.find("ul");
	var slides = slider.find("li");
	var nextBtn = $(".slider__next");
	var prevBtn = $(".slider__prev");
	var nav = slider.find(".slider__navigation");

	var currentSlide = 0;
	var autoScrollDir = "next";

	slides.css("width", slider.width() + "px");
	// событие возникает при изменении размеров области просмотра
	$(window).resize(function () {
		// т.к при изменении размеров окна могла измениться ширина слайдера ( потому что есть размеры в процентах)
		slides.css("width", slider.width() + "px");
		// пересчитываем координату left для слайдера
		var l = -currentSlide * slider.width() + "px";
		// без анимации просто меняем свойство
		list.css("left", l);
	});

	// переменная для формирования html кода навигационных точек
	var navigationHtml = "";

	for (var i=0; i<slides.length; i++) {
		navigationHtml += `<a href="#" class="slider__dot"><i class="far fa-circle"></i></a>`;
	}



	nav.html(navigationHtml);

	var dots = nav.find("span");

	dots.click(function () {
		var number = $(this).attr("data-num");
		changeSlide(number);

	});

	// функция для обновления состояния навигационных кнопок
	var updateNavigation = function () {
		if (currentSlide == 0) {
			prevBtn.hide();
		} else {
			prevBtn.show();
		}

		if (currentSlide == slides.length - 1) {
			nextBtn.hide();
		} else {
			nextBtn.show();
		}

		dots.removeClass("active");
		dots.filter("[data-num='"+ currentSlide + "']")
			.addClass("active")
	};

	updateNavigation();

	// функция для смены слайда, при вызове ей нужно указать направление: вперед или назад
	var changeSlide = function (dir) {
		if (dir == "next") {
			if (currentSlide < slides.length - 1) {
				currentSlide++;
			} else {
				// если дошли до конца, то меняем направление
				autoScrollDir = "prev";
				return;
			}
		} else if (dir == "prev") {
					if (currentSlide > 0) {
					currentSlide--;
				} else {
					// если дошли до начала, то автокрутка идет вперед
					autoScrollDir = "next";
					// останавливаем выполнение функции, чтобы 
					return;
			}
			
		} else {
			// если там не next, и не prev, то считаем, что dir равна номеру слайда, который надо показать
			currentSlide = dir;
		}

		var l = -currentSlide * slider.width() + "px";
		list.animate({left: l}, 700);
		updateNavigation();
	};

	nextBtn.click( function () {
		changeSlide("next");
	});

	prevBtn.click( function () {
		changeSlide("prev");
	});

	var timer = null;

	var startAutoScroll = function () {
		timer = setInterval(function () {
			changeSlide(autoScrollDir);
		}, 2000);
	};

	startAutoScroll();

	// событие возникает при наведении указателя мыши
	slider.mouseenter(function() {
		clearInterval(timer);
	});

	slider.mouseleave(function () {
		startAutoScroll();
	});
});