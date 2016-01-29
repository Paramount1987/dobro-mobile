var swipeTries = 1,
	MIN_WIDTH = 609,
	widerElements = [
		'.shadowed',
		'.page',
		'.feedback-ready',
		'.feedback-ready span',
		'.feedback-ready .feedback-bird-container',
		'.feedback-ready .feedback-bird-container .feedback-bird',
		'.funds .content-info',
		'.history-submenu li',
		'.info-history.cleared.splited',
		'.content .footer.about .links',
		'.content .footer.about .socials-left',
		'.content-info .helpitems li',
		'.content-info .payment-info.first',
		'.content-info.featured',
		'.needhelp.about',
		'.needhelp:nth-child(2)',
		'.content .success li',
		'.content-info.news',
		'.block',
		'.project.history .footer',
		'.project.history .socials-left',
		'.project .people ul li',
		'.project.grey .payment-info.first',
		'.project .socials-title',
		'.project.details .business-check li',
		'.project.details .money-check li',
		'.subblock',
	];

$(document).ready(function(){
	initSlider();
	initHistorySubmenu();
	initSearchBar();
	initMenu();
	initHelpDescription();
	sliderList();
//	project page
	initProjectSlider();
//	about page
	initPlayer();
	initWiderElements();
	windowResizeListener();
	descToggle();
	checkboxesChangeListeners();
	setRequest();
//	how can i help
	helpToggleListener();
//slow scroll
 $(".scroll").click(function(event){     
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
    });	

//keyp press input profile socials-block
$( ".socials-block .form-field" ).keyup(function() {
	var value = $(this).val().length; 
  if(value > 5){
  	$(this).siblings(".detach").addClass("aviable");
  }else{
  	$(this).siblings(".detach").removeClass("aviable");
  }
});

});

function initSlider() {
	$('.itemcontainer').each(function(index, item) {
		$(item).css('margin-left', 290*index);
	});
	$('.sliderposition').css('width', 100 / $('.itemcontainer').length + '%');
}

function initHistorySubmenu() {
	$('.history-menu').click(function(){
		var me = this,
			link = $('.next-arrow', $(me));
		$('.history-submenu').slideToggle(200, function() {
			if (link.hasClass('active')) {
				link.removeClass('active');
			} else {
				link.addClass('active');
			}
		});
	})
}

function initSearchBar() {
	$('.icon.search').click(function(){
		if ($('.subblock').css('display') == 'block') {
			$(".subblock").animate({width:'toggle'},350);
		}
		$('.searchblock').slideToggle();
	})
}

function initMenu() {
	$('.icon.burger').click(function(){
		if ($('.searchblock').css('display') == 'block') {
			$('.searchblock').slideToggle();
		}
		$(".subblock").animate({width:'toggle'},350);
	});
	$('.collapsible').click(function(event){
		var parent = $(this).parent().parent(),
			target = $(this);
		$('.level-3', parent).slideToggle();

			if (target.hasClass('active')) {
				target.removeClass('active');
			} else {
				target.addClass('active');
			}
		

		return false;
	});
}

function initHelpDescription() {
	$('.hand-description').click(function(){
		var me = this,
			target = $('.arrow', $(this));
		$('.help-description', $(this).parent()).slideToggle('slow', function(){
			if (target.hasClass('active')) {
				target.removeClass('active');
			} else {
				target.addClass('active');
			}
		});
	});
}

function sliderList() {
	$('.slideimages').swipe( {
		//Generic swipe handler for all directions
		allowPageScroll: "vertical",
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == 'left') {
				swipeTries++;
				if (swipeTries <= $('.itemcontainer').length) {
					$('.itemcontainer').each(function () {
						$(this).animate({
							left: '-=290'
						}, 300);
					});
					$('.sliderposition').animate({
						left: '+=' + parseInt($('.sliderposition').css('width'))
					}, 300);
				} else {
					swipeTries = $('.itemcontainer').length;
				}
			}
			if (direction == 'right') {
				swipeTries--;
				if (swipeTries > 0) {
					$('.itemcontainer').each(function () {
						$(this).animate({
							left: '+=290'
						}, 300);
					});
					$('.sliderposition').animate({
						left: '-=' + parseInt($('.sliderposition').css('width'))
					}, 300);
				} else {
					swipeTries = 1;
				}
			}
		}
	});
	$('.images-list .items').swipe( {

		allowPageScroll: "vertical",
		//Generic swipe handler for all directions
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == 'left') {
				swipeTries++;
				if (swipeTries <= $('.image-item').length) {
					$('.image-item').each(function () {
						$(this).animate({
							left: '-=290'
						}, 300);
					});
				} else {
					swipeTries = $('.image-item').length;
				}
				$('.item', $('.counter')).removeClass('active');
				$('.item:nth-child(' + swipeTries + ')', $('.counter')).addClass('active');
			}
			if (direction == 'right') {
				swipeTries--;
				if (swipeTries > 0) {
					$('.image-item').each(function () {
						$(this).animate({
							left: '+=290'
						}, 300);
					});
				} else {
					swipeTries = 1;
				}
				$('.item', $('.counter')).removeClass('active');
				$('.item:nth-child(' + swipeTries + ')', $('.counter')).addClass('active');
			}
		}
	});
}

function initProjectSlider() {
	$('.counter').empty();
	$('.image-item').each(function(index, item) {
		$(item).css('margin-left', 290*index);
		$('.counter').append('<i class="item"></i>');
	});
	$('.counter').css('width', $('.image-item').length * 19);
	$('.item:first', $('.counter')).addClass('active');

}

function initPlayer() {
	if ($('.player')) {
		$('.player').css('height', parseInt($('.player').width() * 3 / 4));
		$(window).resize(function () {
			$('.player').css('height', parseInt($('.player').width() * 3 / 4));
		});
	}
}

function windowResizeListener() {
	$(window).resize(function(){
		initWiderElements();
	});
}

function initWiderElements() {
	var width = $(window).width();

	if (width < MIN_WIDTH) {
		$.each(widerElements, function(index, element) {
			if ($(element).hasClass('wider')) {
				$(element).removeClass('wider');
			}
		});
	} else {
		$.each(widerElements, function(index, element) {
			if (!$(element).hasClass('wider')) {
				$(element).addClass('wider');
			}
		});
	}
}

function descToggle() {
	$('.about-header').click(function(){
		var parent = $(this).parent().find(".about-desc").slideToggle();
		// if ($('.about-desc', parent).hasClass('hidden')) {
		// 	$('.about-desc', parent).removeClass('hidden');
		// } else {
		// 	$('.about-desc', parent).addClass('hidden');
		// }
	});
}

function checkboxesChangeListeners() {
	$('.money-check input:checkbox').click(function(){
		var val = $(this).val();
		$.each($('.money-check input:checkbox'), function(index, checkbox) {
			if ($(checkbox).val() !== val) {
				$(checkbox).attr('checked', false);
			}
		});
	});
	$('.sex input:checkbox').click(function(){
		var val = $(this).val();
		$.each($('.sex input:checkbox'), function(index, checkbox) {
			if ($(checkbox).val() !== val) {
				$(checkbox).attr('checked', false);
			}
		});
	});
}

function setRequest() {
	$('#setRequest').click(function(e) {
		e.preventDefault();
		$('.request').toggle();
	});
}

function helpToggleListener(){
	$('.help-about').click(function(){
		var parent = $(this).parent();
		parent.find('.help-description').slideToggle(350);
		if (parent.find('.arrow-down-big').hasClass('up')) {
			parent.find('.arrow-down-big').removeClass('up');
		} else {
			parent.find('.arrow-down-big').addClass('up');
		}
	});
}

