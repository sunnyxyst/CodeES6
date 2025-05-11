function AnchorScrollNav(options) {
	this.anchorContainer = options.anchorContainer || document.querySelector('.anchor-nav');
	this.anchorSection = options.anchorSection;
	this.scrollArea = options.scrollArea;
	this.expanderBtn = options.expanderBtn;

	this.upperHeight = 0; // anchor shows
	this.secOffsetTopArr = []; // sections top positions
	this.secOffsetLeftArr = []; // anchor items left positions
	this.offsetIndex = 0; // active anchor Index
	this.offsetIndexHistory = -1; // prev anchor Index
	this.scrollPos = 0; // scroll Position

	this.scrollHandler = this.handleScroll.bind(this);
	this.moreBtnHandler = this.toggleMore.bind(this);

	this.items = this.anchorContainer.querySelectorAll('.anchor-item');
	this.list = this.anchorContainer.querySelector('.anchor-list');

	this.init();
}

AnchorScrollNav.prototype.init = function() {
	const expandBtn = document.querySelector(this.expanderBtn);
	if(expandBtn) {
		expandBtn.addEventListener('click', this.expanderHandler);
	}
	this.recalcOffsets();
	this.scrollArea.addEventListener('scroll', this.scrollHandler);
}

AnchorScrollNav.prototype.recalcOffsets = function() {
	this.secOffsetTopArr = [];
	this.secOffsetLeftArr = [];
	// offsetTopArray 
	var anchorSecs = document.querySelectorAll(this.anchorSection);
	for(var i=0; i < anchorSecs.length; i ++) {
		this.secOffsetTopArr.push(Math.floor(anchorSecs[i].getBoundingClientRect().top + window.scrollY))
	}

	// offsetLeftArray
	for(var j=0; j < this.items.length; j++) {
		this.secOffsetLeftArr.push(Math.floor(this.items[j].getBoundingClientRect().left + window.scrollX - 24))
	}
	
	// init top position
	this.upperHeight = this.secOffsetTopArr[0];
}

AnchorScrollNav.prototype.handleScroll = function() {
	var scrollTop = this.scrollArea.scrollTop;
	var firstSectionTop = this.secOffsetTopArr[0];
	// screen Top + anchorWrap top >= first anchor section top
	if(scrollTop >= firstSectionTop) {
		this.anchorContainer.classList.add('on')
	} else {
		this.anchorContainer.classList.remove('on');
	}
	// current Index of top Pos Array <= screen top + anchorWrap top
	if(this.secOffsetTopArr[this.offsetIndex] <= scrollTop + this.upperHeight) {
		this.increaseIndex();
	} 

	if(scrollTop + this.upperHeight < this.secOffsetTopArr[this.offsetIndex]) {
		this.decreaseIndex();
	}
	console.log(this.secOffsetTopArr[this.offsetIndex])
	this.scrollX();
}

AnchorScrollNav.prototype.scrollX = function() {
	if(this.offsetIndex !== this.offsetIndexHistory) {
		this.items.forEach(function(item) {
			item.classList.remove('active');
		})
		const activeItem = this.items[this.offsetIndex];
		if(activeItem) {
			activeItem.classList.add('active');
			const activeLeft = activeItem.getBoundingClientRect().left + window.scrollX;
			const firstLeft = this.items[0].getBoundingClientRect().left + window.scrollX;
			this.list.scrollLeft = activeLeft - firstLeft;
			this.scrollPos = this.secOffsetLeftArr[this.offsetIndex];
			this.offsetIndexHistory = this.offsetIndex;
		} 	
	}
}

AnchorScrollNav.prototype.toggleMore = function() {
	if(this.container.classList.contains('active')) {
		this.container.classList.remove('active');

		const activeItem = this.container.querySelector('.item.acitve');
		const firstItem = this.container.querySelector('.item');
		if(activeItem && firstItem) {
			this.list.scrollLeft = activeItem.getBoundingClientRect().left - firstItem.getBoundingClientRect().left;
		}
	} else {
		this.container.classList.add('active');
	}
}

AnchorScrollNav.prototype.scrollY = function() {

}

AnchorScrollNav.prototype.increaseIndex = function() {
	if(this.offsetIndex < this.secOffsetTopArr.length - 1) {
		this.offsetIndex += 1;
	}
}

AnchorScrollNav.prototype.decreaseIndex = function() {
	if(this.offsetIndex !== 0) {
		this.offsetIndex -= 1;
	}
}