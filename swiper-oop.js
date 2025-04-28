// function to class refactoring
class SwiperInit {
    constructor(section) {    
        this.swiperSection = section;
        this.swiper = section.querySelector('.swiper');
        this.slides = section.querySelectorAll('.swiper-slide');
        this.swiperPagination = section.querySelector('.swiper-pagination');
        this.paginationWrap = section.querySelector('.pagination-wrap');
        this.swiperPrev = section.querySelector('.swiper-button-prev');
        this.swiperNext = section.querySelector('.swiper-button-next');
        this.controller = section.querySelector('.controller');
        this.dataView = section.getAttribute('data-view');
        this.dataGutter = section.getAttribute('data-gutter');
        this.dataValign = section.getAttribute('data-valign');

    }
}
