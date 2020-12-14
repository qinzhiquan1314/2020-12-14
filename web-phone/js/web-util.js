
/**********这里写手机端 需要的公用js**********/



/************旧************/
// 存储 对外 订单列表   (查询到订单数据时，返回了json数据，需要将这个json数据存到全局变量中，等跳转至订单页面时，能直接从全局变量中获取)
function setOrderList(data) {
	data = JSON.stringify(data)
	sessionStorage.setItem("orderListData",data);
}

// 获取  对外 订单列表
function getOrderList() {
	var str = sessionStorage.getItem("orderListData");
	var arr = JSON.parse(str);
	return arr;
}


/************新************/
//存储 对外 订单列表   (查询条件)
function setOrderQueryStr(query) {
	sessionStorage.setItem("orderListQueryStr",query);
}

// 获取  对外 订单列表  (查询条件)
function getOrderQueryStr() {
	var str = sessionStorage.getItem("orderListQueryStr");
	return str;
}

/*************广告位************/
var intervalNum = 5000;//轮播间隔
var swiperImgdata = {
	imgUri: getRootPath_web()+"/web-phone/images/banner",//图片路径
	imgArr: [// 展示图片
	    "1.jpg",
	    "5.jpg",
	    "3.jpg"
	  ]
}

function bodyLoad() {
	//监听点击事件  这个不可行,当点击事件触发页面内容还未加载完，则bodyH还是上次的高度，所以需要在各页面增加
	//document.addEventListener("click", advertPosition);
	
	//所有页面窗口变化时需要做的事情:广告定位/字体重新计算
	bodyFun();
	
	//解决安卓系统手机输入内容时页面错乱
	window.onresize = bodyFun;
}
//window resize方法
function bodyFun(titleHeight) {
	
	//字体动态计算
	autoAdapt();
	
	//广告高度设置 暂不需要手动设置，直接height:auto
	//setAdvertHeight();
	
	//轮播区初始化
	initSwiperImage(swiperImgdata);
	
	//等页面事件都执行完，再广告浮动
	setTimeout(function(){
		//广告位置是否浮动
		advertPosition();
	},100);
	
}

//初始化轮播信息
function initSwiperImage(data){
	
	$("#swiper-wrapperA,.swiper-paginationA").html("");
	
	var divStr = '';
	var imgUri = data.imgUri; 
	var imgArr = data.imgArr;
	$.each(imgArr, function(index,value) {
		var imgSrc = imgUri + "/" + value;
        divStr = divStr + '<div class="swiper-slide" id="'+index+'"><img src="'+imgSrc+'"/></div>';
	});
	
	$("#swiper-wrapperA").html(divStr);

	//点击广告图片跳转链接
    $(document).on("click touchstart","#swiper-wrapperA #0",function(){
        var exCode= getUrlParam("exCode");
        if(exCode=="kbxcx") {
            ;
        }else{
            window.location.href="https://m.10010.com/subjectpage/61100000355533.html";
        }
    });
    $(document).on("click touchstart","#swiper-wrapperA #1",function(){
        var exCode= getUrlParam("exCode");
        if(exCode=="kbxcx") {
            ;
        }else{
            window.location.href="https://m.10010.com/queen/broadband/broadband-fusion-new.html?activeId=6519061472551795";
        }
    });
    $(document).on("click touchstart","#swiper-wrapperA #2",function(){
        var exCode= getUrlParam("exCode");
        if(exCode=="kbxcx") {
            ;
        }else{
            window.location.href="https://bjunicom.xdoes.cn/newbroadband";
        }
    });


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
	}
	$(".advert-bottom").removeClass("opacity-0");
	//$(".advert-bottom").removeClass("dp-none");
	
	/*
	//【关闭】
	$(".advert-bottom i").click(function(){
		$(".advert-bottom").removeClass("position-fiexd");
		$(".advert-bottom i").hide();
	});*/
}

//底部广告位 重新设置height
function setAdvertHeight(){
	
	var screenWidth = document.documentElement.clientWidth;

	/* 720px*220px*/
	$(".advert-bottom .swiper-containerA").css('height',(220*screenWidth/720)+"px");
	
}


/*************广告位************/
