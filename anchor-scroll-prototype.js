function AnchorScrollNav(options) {
	this.anchorContainer = options.anchorContainer || document.querySelector('.anchor-wrap');
	this.anchorSection = options.anchorSection;
	this.scrollArea = options.scrollArea;
	this.expanderBtn = options.expanderBtn;

	this.upperHeight = 0; // anchor shows
	this.secOffsetTopArr = []; // sections top positions
	this.secOffsetLeftArr = []; // anchor items left positions
	this.offsetIndex = 0; // active anchor Index
	this.offsetIndexHistory = -1; // prev anchor Index
	this.scrollPos = 0; // scroll Position

	this.items = this.anchorContainer.querySelectorAll('.item');
	this.list = this.anchorContainer.querySelector('.list');

	this.init();
}

AnchorScrollNav.prototype.init = function() {
	var self = this;

	// init top position
	var outer = this.anchorContainer.querySelector('.outer');
	if(outer) {
		this.upperHeight = outer.offsetHeight + 50;
	}

	// offsetTopArray 
	var anchorSecs = document.querySelectorAll(this.anchorSection);
	for(var i=0; i < anchorSecs.length; i ++) {
		this.offsetTopArray.push(Math.floor(anchorSecs[i].getBoundingClientRect().top + window.scrollY))
	}

	// offsetLeftArray
	for(var j=0; j < this.items.length; j++) {
		this.offsetLeftArray.push(Math.floor(this.items[j].getBoundingClientRect().left + window.scrollX - 24))
	}
	
	var expandBtn = document.querySelector(this.expanderBtn);
	if(expandBtn) {
		expandBtn.addEventListener('click', function(e) {
			if(self.anchorContainer.classList.add('-active')) {
				self.anchorContainer.classList.remove('-acitve');
				var activeItem = self.anchorContainer.querySelector('.item.-active');
				var firstItem = self.anchorContainer.querySelector('.item');
				if(activeItem && firstItem) {
					self.list.scrollLeft = activeItem.getBoundingClientRect().left - firstItem.getBoundingClientRect().left;
				}
			} else {
				self.anchorContainer.classList.add('-active');
			}
		});
	}
	this.scrollArea.addEventListener('scroll', function(e) {
		self.handleScroll(e);
	})
}

AnchorScrollNav.prototype.handleScroll = function(e) {
	var scrollTop = this.scrollArea.scrollTop;
	// screen Top + anchorWrap top >= first anchor section top
	if(scrollTop + this.upperHeight >= this.secOffsetTopArr[0]) {
		this.anchorContainer.classList.add('-visible')
	} else {
		this.anchorContainer.classList.remove('-visible');
	}

	// current Index of top Pos Array <= screen top + anchorWrap top
	if(this.secOffsetTopArr[this.offsetIndex] <= scrollTop + this.upperHeight) {
		this.increaseIndex();
	} 

	if(scrollTop + this.upperHeight < this.secOffsetTopArr[this.offsetIndex]) {
		this.decreaseIndex();
	}

	this.scrollX();
}

AnchorScrollNav.prototype.scrollX = function() {
	if(this.offsetIndex !== this.offsetIndexHistory) {
		for(var i=0; i < this.items.length; i++) {
			this.items[i].classList.remove('-active');
		}
	}
}

var anchorContainer = document.querySelector('.introduce-anchors');
var anchorMore = anchorContainer.querySelector('.introduce-anchors .more');
var anchorItems = anchorContainer.querySelectorAll('.item');
var anchorList = anchorContainer.querySelector('.list');
var anchorSection = document.querySelectorAll('.service-cards li');

