	
/************************对外-PC-订单查询***************************/

//页面加载成功后 初始化事件
$(function(){
	//设置面板高度
	setScreenHeight(".panel_2","104");//84+10+10
	
	//设置宽高放在advert.js与广告一起

});


/******************************本页面对象*******************************/

//本页面对象
var orderListObj = {
	messageCodeMinute: 0 // 记录倒计时
	,orderUrlSearch: getOutUrl(getRootPath_web(),"/trade/queryOrder?flag=out&typeTable=pcOut") //  "/js/data/table.json"
	,sendMessageUrl: getOutUrl(getRootPath_web(),"/trade/sendMessage?")
	//这里可以继续定义function	
}



/************************查询tab*************************/

function searchMethod(value) {//切换查询方式
	//处理tab
	if (value == 1) {
		$(".nav-tabs>li:eq(0)").addClass("active");//方式选中时变色
		$(".nav-tabs>li:eq(1)").removeClass("active");
		$(".row1").show();
		$(".row2").hide();
	} else if (value == 2){
		$(".nav-tabs>li:eq(0)").removeClass("active");
		$(".nav-tabs>li:eq(1)").addClass("active");
		$(".row1").hide();
		$(".row2").show();
	}
}
 


 