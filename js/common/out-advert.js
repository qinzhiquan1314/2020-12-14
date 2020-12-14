
/*************PC 对外 广告位************/

var intervalNum = 5000;//轮播间隔
var swiperImgdata = {
	imgUri: getRootPath_web()+"/images/banner",//图片路径
	imgArr: [// 展示图片
	    "1.jpg",
	    "4.jpg",
	    "3.jpg"
	  ]
}

//body onload
function bodyLoad(titleHeight) {
	//监听点击事件  这个不可行,当点击事件触发页面内容还未加载完，则bodyH还是上次的高度，所以需要在各页面增加
	//document.addEventListener("click", advertPosition);
	
	//所有页面窗口变化时需要做的事情:广告定位/字体重新计算/面板宽高设置
	bodyFun();
	
	//解决安卓系统手机输入内容时页面错乱
	window.onresize = bodyFun;
}
//window resize方法
function bodyFun(titleHeight) {
	
	//广告位置swiper需要
	document.documentElement.style.fontSize=document.documentElement.clientWidth*20/1349+'px';
	
	//panel_2面板监听
	setScreenHeight(".panel_2",titleHeight);
	//panel_2面板监听
	setWidthMargin_panel2();
	
	//等页面事件都执行完，再加载广告图片
	setTimeout(function(){
		//轮播区初始化
		initSwiperImage(swiperImgdata);
		//广告位置是否浮动
		advertPosition();
	},100);
	
}
//广告位置根据内容来决定位置
function advertPosition() {
	//初始化删除浮动，使广告跟在页面尾部算入bodyH高度里
	$(".advert-bottom").removeClass("position-fiexd");
	//$(".advert-bottom").addClass("dp-none");//初始化时增加这个会使bodyH不包含广告高度
	
	var screenW = document.documentElement.clientWidth;
	var screenH = document.documentElement.clientHeight;
	var bodyH = document.body.clientHeight;//不包含display:none元素高度
	//console.log("screenH:"+screenH+" bodyH:"+bodyH);
	
	//重新加样式
	if (screenH > bodyH) {// 内容少时广告浮动
		$(".advert-bottom").addClass("position-fiexd");
		if(screenW<1039){
			$(".advert-bottom").css('width',"98%");
		}else{
			$(".advert-bottom").css('width',"1039px");
		}
	}
	$(".advert-bottom").removeClass("opacity-0");
	//$(".advert-bottom").removeClass("dp-none");
	
}

/**
 * panel_2重新设置width margin
 */
function  setWidthMargin_panel2(){
	//var version = IEVersion();// 浏览器版本
	var screenWidth = document.documentElement.clientWidth;
	
	//318px*1039px 图片元素宽高
	
	if(screenWidth<1039){
		$(".title_2,.panel_2").css({margin:"0 1%"});
		$(".title_2,.panel_2").css('width',"98%");
		$(".advert-bottom").css('width',"100%");
		/*当屏幕小于1039 */
		$(".advert-bottom").css('height',(318*screenWidth/1039)+"px");
	}else{
		$(".title_2,.panel_2").css({margin:"0 auto"});
		$(".title_2,.panel_2").css({padding:"0"});
		$(".title_2,.panel_2,.advert-bottom").css('width',"1039px");
		$(".advert-bottom").css('height',"318px");
	}
}


//初始化轮播信息
function initSwiperImage(data){
	
	$("#swiper-wrapperA,.swiper-paginationA").html("");
	
	var divStr = '';
	var imgUri = data.imgUri; 
	var imgArr = data.imgArr;
	$.each(imgArr, function(index,value) {
		var imgSrc = imgUri + "/" + value;
        divStr = divStr + '<div class="swiper-slide"  id="'+index+'"><img src="'+imgSrc+'"/></div>';
	});
	//点击广告图片跳转链接
	$(document).on("click","#0",function(){
		window.open("https://m.10010.com/subjectpage/61100000355533.html",'_blank');
	});
	$(document).on("click","#1",function(){
		window.open("https://m.10010.com/queen/broadband/broadband-fusion-new.html?activeId=6519061472551795",'_blank');
	});
	$("#swiper-wrapperA").html(divStr);
	
	// 轮播插件（注意放在initSwiper方法之后）
    var mySwiper = new Swiper ('.swiper-containerA', {
        direction: 'horizontal',//vertical
        loop: true,//true
        autoplay:intervalNum,//自动切换
		autoplayDisableOnInteraction : false,//用户操作swiper之后，是否禁止autoplay。默认为true：停止。
        pagination : '.swiper-paginationA'
    }); 
    
    if (imgArr.length < 2) {
    	mySwiper.stopAutoplay();
    }
}