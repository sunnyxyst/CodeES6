var offsetTopArray = [];
var offsetLeftArray = [];
var offsetSequence = 0;
var anchorHeight = $('.introduce-anchors .outer').outerHeight();
var upperHeight = anchorHeight + 50;
var scrollHistory = 0;
var offsetSequenceHistory = 0;

$('.service-cards li').each(function(i) {
  offsetTopArray.push(Math.floor($(this).offset().top));
});

$('.introduce-anchors .item').each(function() {
  offsetLeftArray.push(Math.floor($(this).offset().left - 24));
});

$(document).on('click', '.introduce-anchors .more', function(e) {
  if($('introduce-anchors').hasClass('-active')) {
    $('.introduce-anchors').removeClass('-active')
    $('.introduce-anchors').find('.list').scrollLeft($(".introduce-anchors .item.-active").offset().left - $('.introduce-anchors .item').offset().left);
  } else {
    $('.introduce-anchors').addClass('-active');
  }
});
$('.popup .contents').on('scroll', function(e) {
  var target = $(e.target);
  if(target.scrollTop() + upperHeight >= offsetTopArray[0]) {    $('.introduce-anchors').addClass('-visible')
  } else {
    $('.introduce-anchors').removeClass('-visible')
  }
  if(offsetTopArray[offsetSequence] <= target.scrollTop() + upperHeight) {
    increaseSequence();
  }
  if(target.scrollTop() + upperheight < offsetTopArray[offsetSequence]) {
    decreaseSequence();
  };
  scrollX();
});
function scrollX() {
  if(offsetSequence != offsetSequenceHistory) {
    $('.introduce-anchors .item').removeClass('-active');
    $('.introduce-anchors .item').eq(offsetSequence).addClass('-active');
    anime({
      targets: '.introduce-anchors .list',
      easing: 'easeOutCirc',
      duration: 400,
      scrollLeft: $('.introduce-anchors .item.-active').offset().left - $('.introduce-anchors .item').offset().left
    })
    scrollhistory = offsetLeftArray[offsetSequence];
    offsetSequenceHistory = offsetSequence;
  }
}
function increaseSequence() {
  if(offsetSequence < offsetTopArray.length - 1) {
    offsetSequence += 1;
  }
}
function decreaseSequence() {
  if(offsetSequence != 0) {
    offsetSequence -= 1;
  }
}