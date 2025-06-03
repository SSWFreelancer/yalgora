document.addEventListener('DOMContentLoaded', function(){
	let scrolPos = 0;
	function handleScroll() {
		window.requestAnimationFrame(function() {
			var scroll = document.documentElement.scrollTop;
			var header = document.querySelector('.header');
			if(scroll > 1){
				header.classList.add('show');
			}
			else{
				header.classList.remove('show');
			}
			if (scroll > scrolPos && scroll > 150) {
				header.classList.add('hide');
			} else {
				header.classList.remove('hide');
			}
			scrolPos = scroll;
		})
	}
	handleScroll();
	window.addEventListener('scroll', handleScroll);
	
	let headerSearch = document.querySelector('.header__search');
	let search = document.querySelector('.search');
	if(headerSearch){
		headerSearch.addEventListener("click", function () {
			headerSearch.classList.toggle('active');
			search.classList.toggle('active');
		});		
	}

	document.addEventListener('click', function(e) {
		let target = e.target;
		if (!target.closest('.search') && !target.closest('.header__search')) {
			search.classList.remove('active');
			headerSearch.classList.remove('active');
		}
	});

	let headerBurger = document.querySelector('.header__burger');
	let menu = document.querySelector('.menu');
	let menuLink = document.querySelectorAll('.menu__list ul a');
	let body = document.body;
	
	if(headerBurger){
		headerBurger.addEventListener("click", function () {
			headerBurger.classList.toggle('active');
			menu.classList.toggle('open');
			body.classList.toggle('lock');
		});		
	}

	if(menuLink){
		menuLink.forEach(function(menuLink) {
			menuLink.addEventListener('click', function() {
				headerBurger.classList.remove('active');
				menu.classList.remove('open');
				body.classList.remove('lock');
			});
		});
	}

	var tabsItems = document.querySelectorAll('[data-tab]');
	if(tabsItems){
		tabsItems.forEach(function(tabsItem) {
			tabsItem.addEventListener('click', function(event) {
				event.preventDefault();
				var tabParent = this.closest('.tabs');
				var tabActive = tabParent.querySelector('[data-tab].active');
				var contentActive = tabParent.querySelectorAll('[data-content].target');
				if (tabActive) {
					tabActive.classList.remove('active');
				}
				contentActive.forEach(function(contentActive){
					if (contentActive) {
						contentActive.classList.remove('target');
					}	  
				});
				this.classList.add('active');
				const tabContent = this.getAttribute("data-tab");
				const tabId = tabParent.querySelectorAll(`[data-content="${tabContent}"]`);
				tabId.forEach(function(tabId){
					if (tabId) {
						tabId.classList.add('target');
					}	  
				});
			});
		});
	}

	let menuLinkWithSub = document.querySelectorAll('span.menu__link');
	if(menuLinkWithSub){
		menuLinkWithSub.forEach(function(menuLinkWithSub) {
			menuLinkWithSub.addEventListener('click', function(e) {
				e.preventDefault();
				menuLinkWithSub.parentNode.classList.toggle('active');
			});
		})
	}

	let menuSubLinkItem = document.querySelectorAll('.submenu__list > a');
	if(menuSubLinkItem){
		menuSubLinkItem.forEach(function(menuSubLinkItem) {
			menuSubLinkItem.addEventListener('click', function(e) {
				e.preventDefault();
				menuSubLinkItem.parentNode.classList.toggle('active');
			});
		})
	}

	if (document.querySelector('.main')) {
		new Swiper('.main', {
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			speed: 600,
			pagination: {
				el: '.main__pagination',
				clickable: true,
			},
		});
	}
	let abodeContainers = document.querySelectorAll('.abode__container');
	if(abodeContainers){
		abodeContainers.forEach(container => {
			let title = container.querySelector('.title');
			let sliderEl = container.querySelector('.abode__slider');
			if (!sliderEl) return;
			function setHeight() {
				let height = title.offsetHeight;
				let activeSlideText = sliderEl.querySelector('.swiper-slide-active > span');
				let activeSlideTextHeight = activeSlideText ? activeSlideText.offsetHeight : 0;
				container.style.setProperty('--abodeHeight', `${height + activeSlideTextHeight}px`);
			}
			let swiper = new Swiper(sliderEl, {
				slidesPerView: 1,
				spaceBetween: 0,
				loop: false,
				effect: 'fade',
				speed: 600,
				autoHeight: true,
				pagination: {
					el: container.querySelector('.abode__fraction'),
					type: 'fraction',
				},
				navigation: {
					nextEl: container.querySelector('.abode__next'),
					prevEl: container.querySelector('.abode__prev'),
				},
				on: {
					init: function () {
						setHeight();
					},
					update: function () {
						setHeight();
					},
					transitionEnd: function () {
						setHeight();
					},
				},
			});
		});
	}

	let abodeGalleries = document.querySelectorAll('.abode__gallery');
	if(abodeGalleries){
		abodeGalleries.forEach(function(abodeGallery) {
			let abodeGalleriesPrev = abodeGallery.querySelector('.abode__gallery-prev');
			let abodeGalleriesNext = abodeGallery.querySelector('.abode__gallery-next');
			new Swiper(abodeGallery, {
				slidesPerView: 1,
				spaceBetween: 12,
				loop: true,
				speed: 600,
				nested: true,
				navigation: {
					nextEl: abodeGalleriesNext,
					prevEl: abodeGalleriesPrev,
				},
			});
		});
	}

	let sliders = document.querySelectorAll('.slider-block__slider');
	if(sliders){
		sliders.forEach(function(slider) {
			let parent = slider.parentNode;
			let fraction = parent.querySelector('.slider-block__fraction');
			let prev = parent.querySelector('.slider-block__prev');
			let next = parent.querySelector('.slider-block__next');
			new Swiper(slider, {
				slidesPerView: 3,
				spaceBetween: 40,
				loop: false,
				speed: 600,
				pagination: {
					el: fraction,
					type: 'fraction',
				},
				navigation: {
					nextEl: next,
					prevEl: prev,
				},
				breakpoints: {
					0: {
						slidesPerView: 1,
						spaceBetween: 12,
					},
					651: {
						slidesPerView: 2,
						spaceBetween: 25,
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 25,
					},
					1160: {
						slidesPerView: 3,
						spaceBetween: 40,
					},
				}
			});
		});
	}

	let fullsliders = document.querySelectorAll('.slider-block__fullslider');
	if(fullsliders){
		fullsliders.forEach(function(slider) {
			let parent = slider.parentNode;
			let fraction = parent.querySelector('.slider-block__fraction');
			let prev = parent.querySelector('.slider-block__prev');
			let next = parent.querySelector('.slider-block__next');
			new Swiper(slider, {
				slidesPerView: 1,
				spaceBetween: 40,
				loop: false,
				speed: 600,
				pagination: {
					el: fraction,
					type: 'fraction',
				},
				navigation: {
					nextEl: next,
					prevEl: prev,
				},
				breakpoints: {
					0: {
						spaceBetween: 12,
					},
					651: {
						spaceBetween: 25,
					},
					1024: {
						spaceBetween: 25,
					},
					1160: {
						spaceBetween: 40,
					},
				}
			});
		});
	}

	let reviews = document.querySelector('.reviews__slider');
	if(reviews){
		new Swiper(reviews, {
			slidesPerView: 3,
			spaceBetween: 40,
			loop: false,
			speed: 600,
			pagination: {
				el: '.reviews__fraction',
				type: 'fraction',
			},
			navigation: {
				nextEl: '.reviews__next',
				prevEl: '.reviews__prev',
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 12,
				},
				651: {
					slidesPerView: 1.3,
					spaceBetween: 20,
				},
				801: {
					slidesPerView: 2,
					spaceBetween: 25,
				},
				1160: {
					slidesPerView: 3,
					spaceBetween: 25,
				},
				1240: {
					slidesPerView: 3,
					spaceBetween: 40,
				},
			}
		});
	}

	let sliderBlocks = document.querySelectorAll('.slider-block');
	if(sliderBlocks){
		sliderBlocks.forEach(function(sliderBlock) {
			let sliderBlockTexts = sliderBlock.querySelectorAll('.slider-block__texts b');
			if(sliderBlockTexts){
				let minHeightText = 0;
				sliderBlockTexts.forEach(function(sliderBlockText) {
					let height = sliderBlockText.offsetHeight;
					if (height > minHeightText) {
						minHeightText = height;
					}
				});
				sliderBlockTexts.forEach(function(sliderBlockText) {
					sliderBlockText.style.minHeight = `${minHeightText}px`;
				});
			}		
		});
	}

});