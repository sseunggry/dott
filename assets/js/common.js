let cnt = 0;
let scrollTop = 0;

$(function(){
	if($(window).width() > 960){
		setScrollTrigger();
	}

	$(window).scroll(function(){
		scrollTop = $(this).scrollTop();

		scrollMotion();
	});

	checkMobile();
});

function setScrollTrigger() {
	gsap.registerPlugin(ScrollTrigger);
	ScrollTrigger.create({
		trigger: ".scroll_con.pc_only",
		start: "top top",
		end: "+=400%",
		pin: true,
		scrub: true,
		onUpdate: onUpdateHandler
	});
}

function onUpdateHandler(e) {
	let progress = e.progress,
		direction = e.direction,
		imgList = $('.pc_only .info .img_con .phone_img img'),
		itemList = $('.pc_only .info .txt_con .item'),
		titList = $('.pc_only .sec_tit h3');

	if(progress <= 0.25) {
		cnt = 0;
	} else if(progress <= 0.5 && progress > 0.25){
		cnt = 1;
	} else if(progress <= 0.75 && progress > 0.5){
		cnt = 2;
	} else if(progress <= 1 && progress > 0.75){
		cnt = 3;
	}

	if(direction > 0) {
		imgList.eq(cnt).css('transform', 'translate(0, 0)');
	} else {
		imgList.eq(cnt + 1).css('transform', 'translate(0, 100%)')
	}

	itemList.removeClass('show');
	itemList.eq(cnt).addClass('show');
	itemList.eq(cnt + 1).css('transform', 'translate(0, 50%)');
	itemList.eq(cnt - 1).css('transform', 'translate(0, -50%)');

	titList.removeClass('show');
	titList.eq(cnt).addClass('show');
}

function scrollMotion() {
	$('.motion').each(function(){
		let objHeight = $(this).innerHeight,
			objOffsetTop = $(this).offset().top,
			windowHeight = $(window).height();

		if(scrollTop > objOffsetTop - windowHeight * 2/3) {
			$(this).addClass('onTrans');

			if(scrollTop > objOffsetTop + objHeight) {
				$(this).removeClass('onTrans');
			}
		}else{
			$(this).removeClass('onTrans');
		}
	});
}

function checkMobile(){
	let varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
	let mobileDeviceBtn = $('.sec_kv .txt_con .btn_con');

	if ( varUA.indexOf('android') > -1) {
		//안드로이드
		mobileDeviceBtn.find('.playStore').css('display', 'block');
		mobileDeviceBtn.find('.appStore').css('display', 'none');

	} else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
		//IOS
		mobileDeviceBtn.find('.playStore').css('display', 'none');
		mobileDeviceBtn.find('.appStore').css('display', 'block');
	} else {
		//아이폰, 안드로이드 외
		// mobileDeviceBtn.find('.playStore').css('display', 'block');
		// mobileDeviceBtn.find('.appStore').css('display', 'none');
	}

}