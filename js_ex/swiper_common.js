function commonSwiper() {
	const swiperWrapper = document.querySelectorAll('[class*="swiper-wrapper"]');
	for(const swiperSection of swiperWrapper) {
		var swiper = swiperSection.querySelector('.swiper');
		var swiperPagination = swiperSection.querySelector('.swiper-pagination');
		var paginationWrap = swiperSection.querySelector('.pagination-wrap');
		var swiperPrev = swiperSection.querySelector('.swiper-button-prev');
		var swiperNext = swiperSection.querySelector('.swiper-button-next');
		var controller = swiperSection.querySelectorAll('.controller');
		var slides = swiperSection.querySelectorAll('.swiper-slide');
		var dataView = swiperSection.getAttribute('data-view');
		var dataGutter = swiperSection.getAttribute('data-gutter');
		var dataValign = swiperSection.getAttribute('data-valign');
		var slidesPerView, parallaxInter, paginationOpt, autoplayOpt, loopOpt, centeredSlide, gutter, noOverflow;

		loopOpt = swiperSection.classList.contains('loop') ? true : false;
		autoplayOpt = swiperSection.classList.contains('autoplay') ? true : false;
		centeredSlide = swiperSection.classList.contains('centeted') ? true : false;
		parallaxInter = swiperSection.classList.contains('parallax') ? true : false;
		paginationOpt = swiperSection.classList.contains('fraction') ? 'fraction' : 'bullets';
		noOverflow  = swiperSection.classList.contains('noOverflow') ? false : true;

		function props() {
			slides.forEach(function(e) {
				var clickTargets = e.querySelectorAll('a, button');
				for(const clickTarget of clickTargets) {
					clickTarget.addEventListener('click', function(ele) {
						ele.stopPropagation();
					});
				}
			})
		}
	}
}