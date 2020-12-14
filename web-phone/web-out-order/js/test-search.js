
/*************  对外 手机 订单查询+获取验证码  ************/


$(document).ready(function(){ 
	showDiv("id1");
});


//切换div
function showDiv(objId) {
	var objDiv = document.getElementById(objId);
	var objDiv1 = document.getElementById("id1");
	var objDiv2 = document.getElementById("id2");

	objDiv1.style.display = "none";
	objDiv2.style.display = "none";

	objDiv.style.display = "";
	
	var str = '<img src="../../images/order/web-li.png"/>';
	/*显示隐藏清空图标*/
   if(objId == "id2"){
	   //小人显示
	   var imgObj = $("#serialSearch>a>img").length;
	   if(!imgObj) {
		   $("#serialSearch>a").prepend(str);
	   }
	   $("#phoneSearch>a>img").remove();
   }else{
	   //小人显示
	   var imgObj = $("#phoneSearch>a>img").length;
	   if(!imgObj) {
		   $("#phoneSearch>a").prepend(str);
	   }
	   $("#serialSearch>a>img").remove();
   };
   
   //单页面特殊处理广告位重新加载
   advertPosition();
}


/*业务号输入框获得焦点*/
$("#serialNumber").focus(function(){
	$("#jobIm").show();
	$("#jobIm4").hide();
	$("#jobIm5").hide();
	
	$(this).css('backgroundColor','#fff');
	$("#accNum").css('backgroundColor','#ccc');
	$("#teleNum").css('backgroundColor','#ccc');
	
	$("#accNum").val('');
	$("#teleNum").val('');
});
/*宽带号码输入框获得焦点*/
$("#accNum").focus(function(){
	$("#jobIm4").show();
	$("#jobIm").hide();
	$("#jobIm5").hide();
	$(this).css('backgroundColor','#fff');
	$("#serialNumber").css('backgroundColor','#ccc');
	$("#teleNum").css('backgroundColor','#ccc');
	
	$("#serialNumber").val('');
	$("#teleNum").val('');
});
/*固定电话号输入框获得焦点*/
$("#teleNum").focus(function(){
	$("#jobIm5").show();
	$("#jobIm4").hide();
	$("#jobIm").hide();
	$(this).css('backgroundColor','#fff');	
	$("#serialNumber").css('backgroundColor','#ccc');
	$("#accNum").css('backgroundColor','#ccc');
	
	$("#accNum").val('');
	$("#serialNumber").val('');
})
/*身份证号输入框获得焦点*/
$("#IDNum").focus(function(){
	$("#jobIm2").show();
});
/*手机号输入框获得焦点*/
$("#phoneNum").focus(function(){
	$("#jobIm1").show();
});
$(".nav-tabs li").click(function() {
	$(".nav-tabs li").removeClass("active");
	$(this).addClass("active");
});
/*点击删除图标清空数据*/
function dele(a,b){
	$("#"+b).val("");
	setTimeout(function(){
		$("#"+a).hide();
	},500);
}
