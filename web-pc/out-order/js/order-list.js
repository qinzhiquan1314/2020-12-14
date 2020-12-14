	
/************************对外-PC-订单查询-改版***************************/
$(function(){
	//设置面板高度
	setScreenHeight(".panel_2","104");
	inputInit();
	//订单列表【返回】到当前页,href刷新页面，从本地存储获取查询条件回显
	getOrderListLocalData();

});
/*解决IE兼容输入框提示语：当版本小于9时，要再一次显示提示信息*/
function inputInit(){
	if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<10){
		placeholder("#phoneNumber");//手机号
		placeholder("#credentialCode");//身份证号
		placeholder("#serialNumber");//手机号码
		placeholder("#accNum");//宽带号码
		placeholder("#teleNum");//固定电话号
		placeholder("#codeNumber");//验证码
		placeholder("#exTradeId");//请输入订单号

	  };
}
//存      自定义一个函数将用户查询记录存入本地web存储
function setOrderListLocalData(type,phone,idcode,serviceNum,accNum,teleNum,exTradeId) {
	//公共方法--存 取 localStorage,将查询记录放入json对象中存取
	var obj = getLocalData("web-out-pc/order-list");//获取对象
	if (obj == null) {
		obj = {type:"",phone:"",idcode:"",serviceNum:"",accNum:"",teleNum:"",exTradeId:""};
	}
	
	obj.type = type;
	//注意：排斥的查询需要把该清空的清空
	if (type == 1) {      //查询方式type:1-身份证查询；2-业务查询，根据用户的查询记录存入，方便下次取出
		obj.phone = phone;  //手机
		obj.idcode = idcode; //身份证
	}

	else if(type == 2){
		obj.serviceNum = serviceNum;//手机号
		obj.accNum = accNum;//宽带号
		obj.teleNum=teleNum;//固话号
	}
	else if(type == 3){
		obj.exTradeId = exTradeId;//手机号

	}
	setLocalData("web-out-pc/order-list",obj);//将赋值后的对象存入本地web中
}

//取 (并给页面input赋值)---自定义一个函数将用户查询记录从本地web存储取出
function getOrderListLocalData() {
	var obj = getLocalData("web-out-pc/order-list");//取出对象
	//console.log(obj)
	if (obj != null) {  //取出对象的值
		var type = obj.type;// 1:手机  2：业务号码   3 订单号码
		var phone = obj.phone;
		var idcode = obj.idcode;
		var serviceNum = obj.serviceNum;
		var accNum = obj.accNum;
		var teleNum = obj.teleNum;
		var teleNum = obj.teleNum;
		var exTradeId = obj.exTradeId;
		//将对象的值赋给页面中输入框
		if(idcode){  //身份证
			$("#credentialCode").val(idcode);
			place('#credentialCode');
		}
		if(phone){ //身份证查询方式中的手机
			$("#phoneNumber").val(phone);
			place('#phoneNumber');
		}
	  	if(serviceNum){  //业务查询中的手机
	  		$("#serialNumber").val(serviceNum);
	  		place('#serialNumber');
	  		
	  	}
	   if(accNum){
		 	$("#accNum").val(accNum);
		 	place('#accNum');
	   }
	   if(teleNum){
		 	$("#teleNum").val(teleNum);
		 	place('#teleNum');
	   }
		if(exTradeId){
			$("#exTradeId").val(exTradeId);
			place('#exTradeId');
		}
	   
		if(type == 1) {
			$(".nav-tabs>li:eq(0)").addClass("active");
			$(".nav-tabs>li:eq(1)").removeClass("active");
			$(".nav-tabs>li:eq(2)").removeClass("active");
		  	$(".row1").show();
		  	$(".row2").hide();
			$(".row3").hide();
		}

		else if(type == 2){
			$(".nav-tabs>li:eq(0)").removeClass("active");
			$(".nav-tabs>li:eq(1)").addClass("active");
			$(".nav-tabs>li:eq(2)").removeClass("active");
			$(".row2").show();
			$(".row1").hide();
			$(".row3").hide();
		}
		else if(type == 3){
			$(".nav-tabs>li:eq(0)").removeClass("active");
			$(".nav-tabs>li:eq(1)").removeClass("active");
			$(".nav-tabs>li:eq(2)").addClass("active");
			$(".row1").hide();
			$(".row2").hide();
			$(".row3").show();
		}
	}
}

var orderListObj = {
		orderUrlSearch: getOutUrl(getRootPath_web(),"/trade/queryOrder?flag=out") //  "/js/data/table.json"
		,sendMessageUrl: getOutUrl(getRootPath_web(),"/trade/sendMessage?")
		,phoneSearch:function(){ //手机号码和身份证号输入校验
			var phoneNumber=$("#phoneNumber").val();
			// var credentialCode=$("#credentialCode").val();
			if((phoneNumber=="" || phoneNumber =='请输入办理业务所留手机号码' ) /*&& (credentialCode=="" || credentialCode=='请输入办理业务的身份证号码')*/){
				layer.msg('请输入您的查询信息', {
					time: 2000 //2s后自动关闭
				});
				return;
			}
			/*if((credentialCode =="" || credentialCode=='请输入办理业务的身份证号码') && phoneNumber!=="") {
				layer.msg('请输入办理业务的身份证号码', {
					time: 2000 //2s后自动关闭
				});
				return;
			}*/
			if((phoneNumber=="" || phoneNumber =='请输入办理业务所留手机号码' ) /*&& credentialCode!==""*/){
				layer.msg('请输入办理业务所留手机号码', {
					time: 2000 //2s后自动关闭
				});
				return;
			}
			if(/*credentialCode!==""&&*/phoneNumber!==""){
				
				var boo1=checkPhoneNum(phoneNumber);
				// var boo2=checkID(credentialCode);
				
				if(boo1==false){
					layer.msg('您的手机号码有误，请重填', {
						time: 2000 //2s后自动关闭
					});
					return;
				}/*else if(boo2==false){
					layer.msg('您的身份证号有误，请重填', {
						time: 2000 //2s后自动关闭
					});
					return;
				}*/else if((boo1=true)/*&&(boo2=true)*/){
					return true;
					
				}		   	
			  }
		}
	,getMessData:function(phoneNumber,credentialCode){ //第一次发送短信验证码
		$.ajax({
			type : 'POST',// 测试  GET , 生成 POST
			async: false,
			url:orderListObj.sendMessageUrl+"&phoneNumber="+phoneNumber/*+"&credentialCode="+credentialCode*/,//发送验证码请求
			dataType: "json",
            success: function (resData) {
                if (resData.state == 1) { // 如已成功发送验证码，跳转到输入短信验证码页面
                    if (resData.message != "1") {
                        layer.msg(resData.message, {
                            time: 2000 //2s后自动关闭
                        });
                    }
                    countdown();//验证码倒计时
                } else if (resData.state == 0 || resData.state == 2 || resData.state == 3) {
                    layer.msg(resData.message, {
                        time: 2000 //2s后自动关闭0
                    });
                }
            },
			error: function () {	// 未成功发送，提醒发送不成功
				layer.msg('系统原因', {
					time: 2000 //2s后自动关闭
				});
			}	    
		}); 
	}
	,serialNumSearch:function(){ //业务号码校验：不能为空
		var serialNumber = $("#serialNumber").val();
		var accNum = $("#accNum").val();
		var teleNum = $("#teleNum").val();
		if(serialNumber =="请输入所查业务中的手机号"){
			serialNumber="";
		};
		if(accNum =="请输入宽带/快线/专线号码"){
			accNum="";
		};
		if(teleNum =="请输入固话号码（请加010）"){
			teleNum="";
		};
		var booSerial = checkPhoneNum(serialNumber);
		//20190618 姬祥   新增政企专线有汉字
		// var booAcc = checkAccAndTele(accNum);
		var booAcc = checkAcc(accNum);
		var booTele = checkAccAndTele(teleNum);
		//console.log(serialNumber);			
		if((serialNumber == "" || serialNumber== '请输入所查业务中的手机号') && (accNum == "" ||  accNum == '请输入宽带/快线/专线号码') && (teleNum == "" || teleNum== '请输入固话号码（请加010）')){
			 layer.msg('请输入您的查询信息', {
					time: 2000 //2s后自动关闭
				});		
			return;
		 } 
		if(booSerial==false){
			layer.msg('您的手机号码有误，请重填', {
				time: 2000 //2s后自动关闭
			});		
			return;
		}
		if(booAcc==false){
			layer.msg('您的宽带号码有误，请重填', {
				time: 2000 //2s后自动关闭
			});		
			return;
		}
		if(booTele==false){
			layer.msg('您的固话号码有误，请重填', {
				time: 2000 //2s后自动关闭
			});		
			return;
		}
		
		//存
		setOrderListLocalData(2,"","",serialNumber,accNum,teleNum);
		orderListObj.getOrderData(serialNumber,accNum,teleNum);
	}
	,getOrderData:function(serialNumber,accNum,teleNum){ //业务编号查询
		$.ajax({
			type : 'POST',// 测试  GET , 生成 POST
		    async : true,
		    url:orderListObj.orderUrlSearch+"&serialNumber="+serialNumber+"&accNum="+encodeURIComponent(accNum)+"&teleNum="+teleNum,
		    //url:getRootPath_web()+"/js/data/order-list.json",
		    dataType : 'json',	      
		    success : function(resData) {
		    	if(resData.state==1){ //如果验证成功，则进行查询并显示订单列表
		    		setPcOrderQueryStr("&serialNumber="+serialNumber+"&accNum="+encodeURIComponent(accNum)+"&teleNum="+teleNum);
			    	window.location.href=getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-list-table.html");
		    	}else{
		    		//清空表格
		    		/*$('#table').bootstrapTable("destroy");
		    	    $('#table').bootstrapTable();*/
		    		layer.msg('查不到数据', {
		    			time: 2000 //2s后自动关闭
		    		});
		    	}
		    },
		    error: function (e) {
		    	layer.msg('系统原因', {
		    		time: 2000 //2s后自动关闭		    
		    	});
		    }		    
		});
	}
	,searchExTradeId :function(){ //校验订单号
		var exTradeId = $("#exTradeId").val();
		if(exTradeId =="请输入订单号"){
			exTradeId="";
		};
		if(exTradeId ==""){
			layer.msg('请输入您的订单号', {
				time: 2000 //2s后自动关闭
			});
			return;
		}
		//存
		setOrderListLocalData(3,"","",'','','',exTradeId);
		orderListObj.getOrderDataExTradeId(exTradeId);
	}
	,getOrderDataExTradeId:function(exTradeId){ //订单查询
	$.ajax({
		type : 'POST',// 测试  GET , 生成 POST
		async : true,
		url:orderListObj.orderUrlSearch+"&orderNum="+exTradeId,
		//url:getRootPath_web()+"/js/data/order-list.json",
		dataType : 'json',
		success : function(resData) {
			if(resData.state==1){ //
				setPcOrderQueryStr("&orderNum="+exTradeId);
				window.location.href=getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-list-table.html");
			}else{
				//清空表格
				layer.msg('查不到数据', {
					time: 2000 //2s后自动关闭
				});
			}
		},
		error: function (e) {
			layer.msg('系统原因', {
				time: 2000 //2s后自动关闭
			});
		}
	});
},
}	

/*验证码发送倒计时start*/
function countdown(){
	
    var obj = $("#messageBtn");
    messageCodeMinute=60;
    settime(obj);
    
}
function settime(obj) { //发送验证码倒计时
    if ((messageCodeMinute == 0)||(messageCodeMinute==61)) { 
        obj.attr('disabled',false); 
        //obj.removeattr("disabled"); 
        $("#messageBtn").css('backgroundColor','#f7b135'); 
        obj.val("重新获取验证码");
        return;
    } else { 
        obj.attr('disabled',true);
        $("#messageBtn").css('backgroundColor','#ccc');
        obj.val("还剩" + messageCodeMinute + "秒");
        messageCodeMinute--; 
    } 
	setTimeout(function() { 
		settime(obj) }
	    ,1000) 
}
/*验证码发送倒计时end*/


/*触发验证码倒计时*/
$(".searchPhoneBtn").click(function(){
	var validate = orderListObj.phoneSearch();
	//如果手机号和身份证号不为空且校验通过，发送短信验证码，进行短信校验
	//debugger;
	if (validate){
		var phoneNumber=$("#phoneNumber").val();
		var credentialCode=$("#credentialCode").val();
		orderListObj.getMessData(phoneNumber,credentialCode);				
		//存
		setOrderListLocalData(1,phoneNumber,credentialCode,"","","");
	}
	
	
});

//下一步：填写验证码后将验证码传参，验证是否正确
$(".searchCredentialCodeBtn").click(function(){
	var codeNumber = $("#codeNumber").val();
	var validate = orderListObj.phoneSearch();
	
	if(validate){
		if(codeNumber==""){
			layer.msg('请输入您收到的短信验证码', {
				time: 2000 //2s后自动关闭
			});
			return;
			
		}else if(codeNumber!==""){
			var codeValidate=checkcodeNumber(codeNumber);
			if(codeValidate==true){
				checkData(codeNumber);	
			}else{
				layer.msg('您的验证码有误，请重填', {
					time: 2000 //2s后自动关闭
				});
				return;
			}
		}
	}

});


//按业务号码查询
$(".searchSerialNumberBtn").click(function(){
	//orderListObj.changeDiv(1);
	orderListObj.serialNumSearch();	
});

//按订单号码查询
$(".searchExTradeIdlCodeBtn").click(function(){
	orderListObj.searchExTradeId();
});
//一个输入框中输入信息，另外两个输入框置灰
$("#serialNumber").focus(function(){
	$("input[name='serialNumber']").removeClass("colorchange");
	$("input[name='accNum']").addClass("colorchange");
	$("input[name='teleNum']").addClass("colorchange");
	$("#accNum").val('');
	$("#teleNum").val('');
	inputInit();
	
});
	
$("#accNum").focus(function(){
	$("input[name='accNum']").removeClass("colorchange");
	$("input[name='serialNumber']").addClass("colorchange");
	$("input[name='teleNum']").addClass("colorchange");
	
	$("#serialNumber").val('');
	$("#teleNum").val('');
	inputInit();
});

$("#teleNum").focus(function(){
	$("input[name='teleNum']").removeClass("colorchange");
	$("input[name='serialNumber']").addClass("colorchange");
	$("input[name='accNum']").addClass("colorchange");
	
	$("#accNum").val('');
	$("#serialNumber").val('');
	inputInit();
	
});

function cleanData() {
    $("#codeNumber").html('');//PC
   
}
function searchMethod(value) {//切换查询方式
	/*切换时加载一遍placeholder兼容IE方法*/
	inputInit();
    var obj = getLocalData("web-out-pc/order-list");
	//console.log(obj)
	if (obj !=null) {
		var type = obj.type;// 1:手机  2：业务号码
		var phone = obj.phone;
		var idcode = obj.idcode;
		var serviceNum = obj.serviceNum;
		var accNum = obj.accNum;
		var teleNum = obj.teleNum;
		var exTradeId = obj.exTradeId;
	  	}
	//orderListObj.changeDiv(0); 
	//处理tab
	if (value == 1) {
		$(".nav-tabs>li:eq(0)").addClass("active");//方式选中时变色
		$(".nav-tabs>li:eq(1)").removeClass("active");
		$(".nav-tabs>li:eq(2)").removeClass("active");
		$(".row1").show();
		$(".row2").hide();
		$(".row3").hide();
		if(idcode){
			$("#credentialCode").val(idcode);
		  	$("#phoneNumber").val(phone);
		  	place("#credentialCode");
		  	place("#phoneNumber");
		}
		
	
	  
	} else if(value == 2){
		$(".nav-tabs>li:eq(0)").removeClass("active");
		$(".nav-tabs>li:eq(1)").addClass("active");
		$(".nav-tabs>li:eq(2)").removeClass("active");
		/*切换时加载一遍placeholder兼容IE方法*/
		//inputInit();
		$(".row1").hide();
		$(".row2").show();
		$(".row3").hide();
		if(serviceNum){
			$("#serialNumber").val(serviceNum);
		}
		if(accNum){
			$("#accNum").val(accNum);
		}
		if(teleNum){
			$("#teleNum").val(teleNum);
		}
			place("#serialNumber");
			place("#accNum");
			place("#teleNum");
	
		
	}
	else if(value == 3){
		$(".nav-tabs>li:eq(0)").removeClass("active");
		$(".nav-tabs>li:eq(1)").removeClass("active");
		$(".nav-tabs>li:eq(2)").addClass("active");
		/*切换时加载一遍placeholder兼容IE方法*/
		//inputInit();
		$(".row1").hide();
		$(".row2").hide();
		$(".row3").show();
		if(exTradeId){
			$("#exTradeId").val(exTradeId);
		}
		place("#exTradeId");



	}
}

/*宽带修障进度查询跳转*/
$(document).on("click","#kd_Search",function(){
    window.open("http://iservice.10010.com/e4/query/others/mobile_broadband-iframe.html?menuCode=000400200001",'_blank');
})
$(document).on("click","#zq_Search",function(){
    window.location.href=getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-zqza-list.html");
})

/********************************6位验证码输入后调用 单独写checkData(pwd)方法**************************/
function checkData(pwd){ //短信验证码正确性验证
    
	var phoneNumber=$("#phoneNumber").val();
	var credentialCode=$("#credentialCode").val();

	$.ajax({
		   type : 'POST',// 测试  GET , 生成 POST
		   async : true,
	       url: getOutUrl(getRootPath_web(),"/trade/queryOrderNew?&phoneNumber="+phoneNumber+"&code="+pwd+"&credentialCode="+credentialCode),
	       dataType : 'json',
	       beforeSend: function () {         
	    	   layer.load(2);
		   },
		   complete:function(){       
			   layer.closeAll('loading');
		   },
	       success : function(resData) {
	    	   if(resData.state==1){
	    	   		//如果验证成功，则进行查询并显示订单列表
	    		   // setPcOrderQueryStr("&phoneNumber="+phoneNumber+"&credentialCode="+credentialCode);
				   var data = JSON.stringify(resData.rows)
				   sessionStorage.setItem("orderListData",data);
	    		   window.location.href=getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-list-table.html");
	    	   }
	    	   if(resData.state==2){
	    		   layer.msg('验证码有误', {
	    			   time: 2000 //2s后自动关闭
	    		   });
	    		   cleanData();//清除验证码
	    	   }
	    	   if(resData.state==0){
	    		   layer.msg('此手机号/身份证号未办理业务', {
	    			   time: 2000 //2s后自动关闭
	    		   });
	    		 
	    	   }else{
	    	   }	    	  
	       },
		   error: function () {
			   layer.msg('系统原因', {
				   time: 2000 //2s后自动关闭
			   });
		   }
	       
	});
}



