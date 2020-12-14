
/************手机 test**********/

$("#btn1").click(function(){
	var v = $("#text1").val();
	$("#div1").css({"height":v+"px"});
	
	//单页面特殊处理广告位重新加载
    advertPosition();
});
