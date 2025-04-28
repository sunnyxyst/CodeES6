
function commonSwiper() {
    const swiperWrapper = document.querySelectorAll('[class*="swiper-wrapper"]');
    for (const swiperSection of swiperWrapper) {
         const swiper = swiperSection.querySelector('.swiper');
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
        centeredSlide = swiperSection.classList.contains('centered') ? true : false;
        parallaxInter = swiperSection.classList.contains('parallax') ? true : false;
        swiperSection.classList.contains('fraction') ? fractionAlign() : paginationOpt = 'bullets';
        noOverflow = swiperSection.classList.contains('noOverflow') ? false : true;

        dataView ? slidesPerView = dataView : slidePerView = 1;
        gutter = dataGutter ? parseFloat(dataGutter) : 10;
    

    function props() {
        slides.forEach(function(e) {
            var clickTargets = e.querySelectorAll('a, button');
            for(const clickTarget of clickTargets) {
                clickTarget.addEventListener('click', function(ele) {
                    ele.stopPropagation();
                });
            }
        });
    }

    function paginationAlign() {
        if (paginationWrap.classList.contains('top')) {
            swiper.style.marginTop = '2.6rem';
            swiper.style.marginBottom = '0';
        }
    }

    function fractionAlign() {
        paginationWrap.classList.add('fraction');
        paginationOpt = 'fraction';
        if(navigationWrap) paginationWrap.classList.add('withNavi');
        if(dataValign || dataAlign) {
            if(dataValign == null) {
              dataValign = 'bottom';
            } else if(dataAlign == null) {
              dataAlign = 'right';
            }
            paginationWrap.classList.add(dataValign, dataAlign);
        } else {
            paginationWrap.classList.add('bottom', 'right');
        }
    }

    function slideController() {
        controller.forEach(function(e) {
            var navigator = swiperSection.querySelectorAll('[class*="swiper-button-"]');
            navigator.forEach(function(e) {
                e.addEventListener('click', function(el) {
                    el.classList.replace('stop', 'play');
                    el.firstElementChild.innerText = '슬라이드 재생시작';
                });
            });

    props();
		if(e.dataset.eventAdded) return;
		e.dataset.eventAdded = 'true';
    e.addEventListener('click', function(el) {
                var target = el.target;
                var parentSwiper = target.closest('.swiper');
                if(target.classList.contains('stop') || parentSwiper.swiper.autoplay.running === true) {
                    target.classList.replace('stop', 'play');
                    parentSwiper.swiper.autoplay.stop();
                    target.firstElementChild.innerText = '슬라이드 재생중지';
                } else {
                    target.classList.replace('play', 'stop');
                    parentSwiper.swiper.autoplay.start();
                    target.firstElementChild.innerText = '슬라이드 재생시작';
                }
            });
        });
    }

    function slideBg() {
        slides.forEach(function(e) {
            var dataColour = e.getAttribute('data-colour');
            var dataDarkColour = e.getAttribute('data-dark-colour');
            if(document.body.classList.contains('dark-mode')) {
                e.style.backgroundColor = dataDarkColour ? `#${dataDarkColour}` : 'var(--bg-root)';
            } else {
                e.style.backgroundColor = dataColour ? `#${dataColour}` : 'var(--bg-root)';
            }
        });
    }

    new Swiper(swiper, {
        loop: loopOpt,
        loopedSlides: 5,
        parallax: parallaxInter,
        slidesPerView: slidesPerView,
        watchOverflow: noOverflow,
        observer: true,
        observeParents: true,
        spaceBetween: gutter,
        centeredSlides: centeredSlide,
        slideToClickedSlide: true,
        autoHeight: true,
        pagination: {
            el: swiperPagination,
            type: paginationOpt,
            bulletElement: 'span',
            renderFraction: function(currentClass, totalClass, current) {
                return `<div class="${currentClass}">${current}</span><div class="divider">/</div><span class="${totalClass}"></div>`;
            }
        },
        navigation: {
            prevEl: swiperPrev,
            nextEl: swiperNext
        },
        a11y: {
            prevSlideMessage: '이전 슬라이드 보기',
            nextSlideMessage: '다음 슬라이드 보기',
            paginationBulletMessage: '{{index}}번째 슬라이드 보기',
            slideLabelMessage: '{{index}}번째 슬라이드 중 {{index}}번째 슬라이드'
        },
      on: {
        beforeInit: function(ele) {
            if(slides.length > 1) {
                loopOpt === true ? ele.params.loop = slides.length > 1 : undefined;
                if(autoplayOpt === true || autoplayOpt === undefined) {
                    ele.params.autoplay.enabled = true;
                }
            }
            if(slides.length === 1) {
                swiper.classList.add('-disabled');
                ele.params.slidesPerView = '1';
            }
            slideBg();
        },
        init: function(ele) {
          centeredSlide === true ? swiper.classList.add('swiper-centered') : undefined;
          if(!Number.isInteger(slidesPerView) && centeredSlide === false) {
            if(slidesPerView === 'auto' && slides.length > 1) {
              ele.params.slidesOffsetBefore = 24;
              ele.params.slidesOffsetAfter = 24;
              swiperSection.classList.add('flexed-width');
              var quickLink = ele.el.querySelector('.more');
              quickLink ? quickLink.parentElement.classList.add('quick-link') : undefined;
            }
          }
          var duplicate = ele.el.querySelectorAll('.swiper-slide-duplicate');
          duplicate.forEach(function(e) {
            e.setAttribute('aria-hidden', 'true');
          })
          props();
            if (paginationWrap) {
                paginationAlign();
                slideController();
            }
        },
        afterInit: function(ele) {
            if (slides.length < slidesPerView) {
			var slide = ele.el.querySelector('.swiper-slide');
		slides.length === 1 ? Slide.style.width = 'auto' : undefined;
		swiperSection.classList.add('centered');
                swiper.classList.add('-disabled');
                ele.destroy(true, false);
            } else {
			if(slides.length === 1) {
     	    		       swiper.classList.add('-disabled');
                		ele.destroy(true, true);
                		slideBg();
            		} else {
                		swiper.classList.remove('-disabled');
            		}
		}
        },
        touchMove: function(ele) {
            if (ele.pagination.el !== null) {
                var control = ele.pagination.el.nextElementSibling;
                if (control) {
                    control.classList.replace('stop', 'play');
                    control.firstElementChild.innerText = '슬라이드 재생시작';
                }
            }
        },
        paginationUpdate: function() {
            this.pagination.bullets.forEach(function(bullet, index) {
                if (index === this.activeIndex) {
                    bullet.setAttribute('aria-current', 'true');
                }
            });
        }
        }
    });
  }
}

commonSwiper();
