class AnchorScrollNav {
	// constructor == 생성자 
	// 생성자 - 클래스로 객체를 처음 생성시 자동실행되는 함수
	constructor({container, anchorSection, scrollArea, expanderBtn}) {
		this.container = container // 앵커 전체 영역
		this.anchorSection = anchorSection // 포커스 될 영역
		this.scrollArea = scrollArea // 스크롤 이벤트를 감지할 영역
		this.expanderBtn = expanderBtn // 앵커영역 확장 버튼

		this.upperHeight = 0; // 앵커가 보이기 시작하는 기준 높이
		this.secOffsetTopArr = []; // 각 section의 top 위치를 배열로 저장
		this.secOffsetLeftArr = []; // 각 앵커 아이템의 left 위치를 배열로 저장
		this.offsetSequence = 0; //  현재 활성화 된 앵커 인덱스
		this.offsetSequenceHistory = -1; // 이전 앵커 인덱스 저장
		this.scrollHistory = 0; // 이전 스크롤 좌표 저장

		this.scrollHandler = this.handleScroll.bind(this);
		this.expanderHandler = this.toggleMore.bind(this);

		this.items = [];
		this.list = null;

		this.init(); // 초기화 실행
	}

	init() {
		this.items = this.container.querySelectorAll('.item');
		this.list = this.container.querySelectorAll('.list');
		
		// 기준 높이 계산
		const outer = this.container.querySelector('.outer');
		if(outer) {
			this.upperHeight = outer.offsetHeight + 50;
		}

		this.recalculateOffsets();

		const expandBtn = document.querySelector(this.expanderBtn);
		if(expandBtn) {
			expandBtn.addEventListener('click', this.expanderHandler);
		}

		this.scrollArea.addEventListener('.scroll', this.scrollHandler);
	}

	recalculateOffsets() {
		this.secOffsetTopArr = [];
		this.secOffsetLeftArr = [];
		// section별 기준 top 위치 배열 저장
		const sections = document.querySelectorAll(this.anchorSection);
		sections.forEach(function(section) {
			this.secOffsetTopArr.push(Math.floor(section.getBoundingClientRect().top + window.scrollY));
		})

		this.items = this.container.querySelectorAll('.item');
		this.items.forEach(function(item) {
			this.secOffsetLeftArr.push(Math.floor(item.getBoundingClientRect().left + window.scrollX - 24));
		})
	}

	toggleMore() {
		if(this.container.classList.contains('-active')) {
			this.container.classList.remove('-active');

			const activeItem = this.container.querySelector('.item.-acitve');
			const firstItem = this.container.querySelector('.item');
			if(activeItem && firstItem) {
				this.list.scrollLeft = activeItem.getBoundingClientRect().left - firstItem.getBoundingClientRect().left;
			}
		} else {
			this.container.classList.add('-active');
		}
	}

	handleScroll() {
		const scrollTop = this.scrollArea.scrollTop;
		if(scrollTop + this.upperHeight >= this.secOffsetTopArr[0]) {
			this.container.classList.add('-visible');
		} else {
			this.container.classList.remove('-visible');
		}

		if(this.secOffsetTopArr[this.offsetSequence] <= scrollTop + this.upperHeight) {
			this.increaseSequence();
		}

		if(scrollTop + this.upperHeight < this.secOffsetTopArr[this.offsetSequence]) {
			this.decreaseSequence();
		}

		this.scrollX();
	}

	scrollX() {
		if(this.offsetSequence !== this.offsetSequenceHistory) {
			this.items.forEach(function(item) {
				item.classList.remove('-active');
			})
			const activeItem = this.items[this.offsetSequence];
			if(activeItem) {
				activeItem.classList.add('-active');
				const activeLeft = activeItem.getBoundingClientRect().left + window.scrollX;
				const firstLeft = this.item[0].getBoundingClientRect().left + window.scrollX;

				anime({
					targets: this.list,
					easing: 'easeOutCirc',
					duration: 400,
					scrollLeft: activeLeft = firstLeft
				});

				this.scrollHistory = this.secOffsetLeftArr[this.offsetSequence];
				this.offsetSequenceHistory = this.offsetSequence;
			}
		}
	}

	increaseSequence() {
		if(this.offsetSequence  < this.secOffsetTopArr.length - 1) {
			this.offsetSequence += 1;
		}
	}

	decreaseSequence() {
		if(this.offsetSequence !== 0) {
			this.offsetSequence -= 1;
		}
	}

	destroy() {
		this.scrollArea.removeEventListener('scroll', this.scrollHandler);
		const expandBtn = document.querySelector(this.expanderBtn);
		if(expandBtn) {
			expandBtn.removeEventListener('click', this.expanderHandler);
		}
		this.secOffsetTopArr = [];
		this.secOffsetLeftArr = [];
		this.items = [];
		this.list = null;
	}

	reinit() {
		this.destroy();
		this.init();
	}
}

const controller = new AnchorScrollNav({
	container: document.querySelector('.introduce-anchors'),
	anchorSection: '.service-cards li',
	scrollArea: document.querySelector('.contents'),
	expanderBtn:'.introduce-anchors .more'
})