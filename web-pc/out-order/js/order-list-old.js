	
/************************对外-PC-订单查询***************************/

//页面加载成功后 初始化事件
$(function(){
	//设置面板高度
	setScreenHeight(".panelA","0");
	//清除缓存数据localStorage.clear()
	//input 提示语 placeholder ie兼容初始化
	 weig();
	window.onresize = function(){
		weig()
	};
	inputInit();
	//订单列表【返回】到当前页,href刷新页面，从本地存储获取查询条件回显
	getOrderListLocalData();

});
function  weig(){
	var weigh = document.documentElement.clientWidth;
	if(weigh<900){
		$(".panelC").css('margin',"0");
		$(".shan").show();
	}else{
		$(".panelC").css('margin',"0 140px");
		$(".shan").hide();
	}
}
/*placeholder兼容IE方法*/
function   inputInit(){
	if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<10){
		placeholder("#phoneNumber");//手机号
		placeholder("#credentialCode");//身份证号
		placeholder("#serialNumber");//业务号码
		placeholder("#accNum");//宽带号码
		placeholder("#teleNum");//固定电话号

	  };
}
//存   自定义函数setOrderListLocalData()将之前的查询记录存入本地web存储
function setOrderListLocalData(type,phone,idcode,serviceNum,accNum,teleNum) {
	var obj = getLocalData("web-out-pc/order-list");
	if (obj == null) {
		obj = {type:"",phone:"",idcode:"",serviceNum:"",accNum:"",teleNum:""};
	}
	
	obj.type = type;
	//注意：排斥的查询需要把该清空的清空
	if (type == 1) {
		obj.phone = phone;
		obj.idcode = idcode;
	} else {
		obj.serviceNum = serviceNum;
		obj.accNum = accNum;
		obj.teleNum=teleNum;
	}
	setLocalData("web-out-pc/order-list",obj);
}

//取 (并给页面input赋值)
function getOrderListLocalData() {
	var obj = getLocalData("web-out-pc/order-list");
	//console.log(obj)
	if (obj != null) {
		var type = obj.type;// 1:手机  2：业务号码
		var phone = obj.phone;
		var idcode = obj.idcode;
		var serviceNum = obj.serviceNum;
		var accNum = obj.accNum;
		var teleNum = obj.teleNum;
		if(idcode){
			$("#credentialCode").val(idcode);
			place('#credentialCode');
		}
		if(phone){
			$("#phoneNumber").val(phone);
			place('#phoneNumber');
		}
	  	if(serviceNum){
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
	 
		if(type == 1) {
			$(".nav-tabs>li:eq(0)").addClass("active");
			$(".nav-tabs>li:eq(1)").removeClass("active");
		  	$(".row1").show();
		  	$(".row2").hide();
		} else {
			$(".nav-tabs>li:eq(0)").removeClass("active");
			$(".nav-tabs>li:eq(1)").addClass("active");
			$(".row2").show();
			$(".row1").hide();
		}
	}
}

/******************************本页面对象*******************************/

//本页面对象
var orderListObj = {
	messageCodeMinute: 0 // 记录倒计时
	,orderUrlSearch: getOutUrl(getRootPath_web(),"/trade/queryOrder?flag=out&typeTable=pcOut") //  "/js/data/table.json"
	,sendMessageUrl: getOutUrl(getRootPath_web(),"/trade/sendMessage?")
	//,orderUrlSearch: getRootPath_web()+"/js/data/order-list.json"
	,phoneInitTable: function(){	//初始化table数据：手机+验证码查询
		$("#serialNumber").val("");
		$("#accNum").val("");
		$("#teleNum").val("");
	
		$('#table').bootstrapTable("destroy");
	    $('#table').bootstrapTable({
	    	url: orderListObj.orderUrlSearch,
	    	 onLoadSuccess:function(data){
		    		//console.log(data);
	    		    z_initlaced(data);
		    	  }
	    });
	  
	}
	
	,serilInitTable: function(){	//初始化table数据：业务号码查询
	    $("#phoneNumber").val(''); 
	    $("#credentialCode").val('');
	    var serialNumber = $("#serialNumber").val();
	    var accNum = $("#accNum").val();
	    var teleNum = $("#teleNum").val();
	    
	    if(serialNumber=="请输入所查业务中的手机号"){
	    	$("#serialNumber").val("");
	    }
	    if(accNum=="请输入宽带号码"){
	    	$("#accNum").val("");
	    };
	    if(teleNum=="请输入固话号码（请加010）"){
	    	$("#teleNum").val("");
	    };
	    //console.log( orderListObj.orderUrlSearch)
		$('#table').bootstrapTable("destroy");
	    $('#table').bootstrapTable({
	    	url: orderListObj.orderUrlSearch,
	    	onLoadSuccess:function(data){
	    		//console.log(data);
	    		if(data.state == -1){
	    			return;
	    		}
	    		if(data !=null && data.rows.length>0){
	    			//存
	    			setOrderListLocalData(2,"","",serialNumber,accNum,teleNum);
	    			if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<9){
	    		     	Interlaced("table");
	    		 	   }
	    		}
	    	  }
	    });
	 
	}	
	,phoneSearch:function(){ //手机号码和身份证号输入校验
		var phoneNumber=$("#phoneNumber").val();
		var credentialCode=$("#credentialCode").val();
		if((phoneNumber=="" || phoneNumber =='请输入办理业务所留手机号码' ) && (credentialCode=="" || credentialCode=='请输入办理业务的身份证号码')){
			layer.msg('请输入您的查询信息', {
				time: 2000 //2s后自动关闭
			});
			return;
		}
		if((credentialCode =="" || credentialCode=='请输入办理业务的身份证号码') && phoneNumber!=="") {
			layer.msg('请输入办理业务的身份证号码', {
				time: 2000 //2s后自动关闭
			});
			return;
		} 
		if((phoneNumber=="" || phoneNumber =='请输入办理业务所留手机号码' ) && credentialCode!==""){
			layer.msg('请输入办理业务所留手机号码', {
				time: 2000 //2s后自动关闭
			});
			return;
		}
		if(credentialCode!==""&&phoneNumber!==""){
			
			var boo1=checkPhoneNum(phoneNumber);
			var boo2=checkID(credentialCode);
			
			if(boo1==false){
				layer.msg('您的手机号码有误，请重填', {
					time: 2000 //2s后自动关闭
				});
				return;
			}else if(boo2==false){ 
				layer.msg('您的身份证号有误，请重填', {
					time: 2000 //2s后自动关闭
				});
				return;
			}else if((boo1=true)&&(boo2=true)){				
				//如果手机号和身份证号不为空且校验通过，发送短信验证码，进行短信校验
				//debugger;
				orderListObj.getMessData(phoneNumber,credentialCode);				
				//存
				 setOrderListLocalData(1,phoneNumber,credentialCode,"","");
			}		   	
		  }
	}
	,getMessData:function(phoneNumber,credentialCode){ //第一次发送短信验证码
		$.ajax({
			type : 'POST',// 测试  GET , 生成 POST
			async: false,
			url:orderListObj.sendMessageUrl+"&phoneNumber="+phoneNumber+"&credentialCode="+credentialCode,//发送验证码请求
			dataType: "json",
			success: function (resData) {  
				if(resData.state==1){ // 如已成功发送验证码，跳转到输入短信验证码页面 
					layer.msg(resData.message, {
	        			time: 2000 //2s后自动关闭
	        	    });
					setTimeout(orderListObj.message,2000);	//短信验证码框弹出		
				}else if (resData.state == 0){
					layer.msg(resData.message, {
						time: 2000 //2s后自动关闭
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
	,message:function(){ //短信验证码框弹出
		//清空表格
		$('#table').bootstrapTable("destroy");
	    $('#table').bootstrapTable();
	    
		$(".bg-model-wrap").show();//短信层弹出
		//初始获取验证码输入框焦点
		$(".pwd-input").focus();
		
		$("body").css({ "overflow": "hidden" });//隐藏窗体的滚动条
		var obj = $("#btn");
		orderListObj.messageCodeMinute = 60;
		orderListObj.setTime(obj);//验证码倒计时
	}
	,getMessage:function(phoneNumber,credentialCode){ //重新获取验证码
		
		//orderListObj.cleanData();	//清除短信验证码
		cleanData();	//清除短信验证码 
		var obj = $("#btn");
		$.ajax({
			type:  'POST',
			async: false,
			url:orderListObj.sendMessageUrl+"&phoneNumber="+phoneNumber+"&credentialCode="+credentialCode,//发送验证码请求
			//url:getRootPath_web()+"/js/data/order-list.json",
			dataType: "json",
			success: function (resData) {
				if(resData.state==1){ // 如已成功发送验证码，跳转到输入短信验证码页面 
					layer.msg(resData.message, {
	        			time: 2000 //2s后自动关闭
	        	    });
					//setTimeout(orderListObj.message,2000);	//短信验证码框弹出				
				    orderListObj.messageCodeMinute = 61; 
				    
				    orderListObj.setTime(obj); //开始倒计时
				}else if (resData.state == 0){
					layer.msg(resData.message, {
						time: 2000 //2s后自动关闭
	  				});
				}		        	  
			},	          
			error: function () {// 未成功发送，提醒发送不成功
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
		if(accNum =="请输入宽带号码"){
			accNum="";
		};
		if(teleNum =="请输入固话号码（请加010）"){
			teleNum="";
		};
		var booSerial = checkPhoneNum(serialNumber);
		var booAcc = checkAccAndTele(accNum);
		var booTele = checkAccAndTele(teleNum);
		//console.log(serialNumber);			
		if((serialNumber == "" || serialNumber== '请输入所查业务中的手机号') && (accNum == "" ||  accNum == '请输入宽带号码') && (teleNum == "" || teleNum== '请输入固话号码（请加010）')){
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
		/*if(serialNumber=="请输入所查业务中的手机号"){
	    	serialNumber="";
	    }
	    if(accNum=="请输入宽带号码"){
	    	accNum="";
	    }
	    if(teleNum=="请输入固话号码（请加010）"){
	    	teleNum="";
	    }*/
	    //判断只能输入一个值
	   /* if(serialNumber && accNum && teleNum){
	    	 layer.msg('业务号码和宽带号码只能输入一个', {
					time: 2000 //2s后自动关闭
				});		
	    	 return false;
	    }*/
		//存
		//setOrderListLocalData(2,"","",serialNumber,accNum);
		orderListObj.changeDiv(1); //如果校验成功则查询
		orderListObj.getOrderData(serialNumber,accNum,teleNum);
	}
	,getOrderData:function(serialNumber,accNum,teleNum){		//业务编号查询
		
		$.ajax({
			type : 'POST',// 测试  GET , 生成 POST
		    async : true,
		    url:orderListObj.orderUrlSearch+"&serialNumber="+serialNumber+"&accNum="+accNum+"&teleNum="+teleNum,
		    //url:getRootPath_web()+"/js/data/order-list.json",
		    dataType : 'json',	      
		    success : function(resData) {
		    	if (resData.state==1){
		    		//if(true){
		    		orderListObj.serilInitTable();
		    		z_initlaced(resData)
		    	}else{
		    		//清空表格
		    		$('#table').bootstrapTable("destroy");
		    	    $('#table').bootstrapTable();
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
	,setTime:function(obj){	//【倒计时】	
		
		if ((orderListObj.messageCodeMinute == 0)||(orderListObj.messageCodeMinute == 61)) { 
			obj.attr('disabled',false); 
			//obj.removeattr("disabled"); 
			obj.val("重新获取验证码");		  	        
			orderListObj.messageCodeMinute = 60; 
			return;
		} else { 
			obj.attr('disabled',true);
			obj.val("还剩" + orderListObj.messageCodeMinute + "秒");
			orderListObj.messageCodeMinute--;
		} 
		setTimeout(function() { 
			orderListObj.setTime(obj) 
		},1000)
	}
	
	,actionFormatter: function(value, row, index) {//表格超链接  订单状态
		if(row.statusFlag=="订单完成"){                   
			if(row.commentState==1){
				return '<p class="a-p1 finish">订单完成</p><p class="a-p1"><a class="showFlow apa1">订单详情</a><a class="showHistory apa2">查看评价</a></p>';     //订单已完成已评价
			}else{
				return '<p class="a-p1 finish">订单完成</p><p class="a-p1"><a class="showFlow apa1">订单详情</a><a class="showAssess apa2">立即评价</a></p>'; //订单已完成未评价
			}
		}
		return '<p class="a-p1">'+row.statusFlag+'</p><p class="a-p1"><a class="showFlow apa5">订单详情</a></p>';
	}
	
	//表格超链接 跳转流程查询
	,hrefFormatter: function(value, row, index) {
		var exTradeId = checkNullOrEmptyStr(row.exTradeId) ? "" :  row.exTradeId;
//		var bssSubscribeId = checkNullOrEmptyStr(row.bssSubscribeId) ? "" :  row.bssSubscribeId;
//	    if(exTradeId!==""){	//营业订单号和渠道订单号都不为空，渠道订单号优先显示；否则显示有数据的订单号，都为空则显示空
//	    	return '<p class="apa3" href="javascript:;">'+checkLen(exTradeId)+'</p>';
//		}else{
//			return '<p class="apa3"  href="javascript:;" >'+checkLen(bssSubscribeId)+'</p>';
//		}
	    
    	return '<p class="apa3" href="javascript:;">'+checkLen(exTradeId)+'</p>';

	}
	//表格区域  空与非空 切换   flag  1：查询到数据   0：数据为空    模拟输入验证码先隐藏
	,changeDiv: function(flag) {
		if (flag==1) {
			$(".a-tableDivEmpty").hide();
			$(".a-tableDiv").show();
		}else{
			$(".a-tableDivEmpty").show();
			$(".a-tableDiv").hide();
		}		
	}
	//关闭窗口
	,closeModel: function() {
		$(".bg-model-wrap").hide();//短信输入框隐藏
	    $("body").css({ "overflow": "visible" });//显示窗体的滚动条
	    cleanData();	//清除短信验证码
	    orderListObj.messageCodeMinute = 0;//倒计时停止
	}
	//弹出评价框 关闭有事件
	,showRightLayer_assess: function(layerId,layerTitle,layerUrl) {
		layer.open({
			  type: 2,
			  id: layerId, //设定一个id，防止重复弹出
			  title: layerTitle,//title: false, //不显示标题栏 
			  shadeClose: true,
			  shade: 0,//背景  shade: 0.8
			  area: ['490px', '98%'],
			  offset: 'r',
			  skin: 'a-layer', //
			  content: layerUrl //iframe的url
			  ,end: function () {
				  $('#table').bootstrapTable("destroy");
			      $('#table').bootstrapTable({
			    	  url: orderListObj.orderUrlSearch  
			      });
	          }
	    });
	    
	}
	//这里可以继续定义function	
}

/******************************按钮等事件*******************************/

//表格  - 操作 - 事件
window.actionEvents = {
	 //展示流程
	'click .showFlow': function(e, value, row, index) {      
	      var orderNum = row.orderNum;
//	      var orderNum2;
//	      var bssSubscribeId = checkNullOrEmptyStr(row.bssSubscribeId) ? "" :  row.bssSubscribeId;
		  var exTradeId = checkNullOrEmptyStr(row.exTradeId) ? "" :  row.exTradeId;
//		  if(exTradeId!==""){	//营业订单号和渠道订单号都不为空，渠道订单号优先显示；否则显示有数据的订单号，都为空则显示空
			var  orderNum2 = exTradeId;
//		  }else{
//			  orderNum2 = bssSubscribeId;
//			}
	      var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/flow-list.html?orderNum="+orderNum+"&orderNum2="+orderNum2);
	      showRightLayer("flow"+orderNum,"订单详情",htmlUrl);
    },
    //展示评价
	'click .showAssess' : function(e, value, row, index) {
		  var expNo = checkNullOrEmptyStr(row.expNo)  ? "" :  row.expNo;
	      var orderNum = row.orderNum;	   
	      var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-assess.html?orderNum="+orderNum+"&expNo="+expNo);
	      //showRightLayer("assess"+orderNum,"订单评价",htmlUrl);
	      orderListObj.showRightLayer_assess("assess"+orderNum,"订单评价",htmlUrl);//关闭弹出框后需要执行刷新表格事件，所以不能用公共方法
   },
   //展示已评价数据
    'click .showHistory' : function(e, value, row, index) {
	      var orderNum = row.orderNum;
	      var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-assess-show.html?orderNum="+orderNum);
	      showRightLayer("assess-show"+orderNum,"我的评价",htmlUrl);
    }
}

// 按手机号和身份证查询
$(".searchPhoneBtn").click(function(){
	//orderListObj.changeDiv(1);
	orderListObj.phoneSearch();
	
});

//按业务号码查询
$(".searchSerialNumberBtn").click(function(){
	//orderListObj.changeDiv(1);
	orderListObj.serialNumSearch();	
});

//【短信验证码框】-【关闭】按钮
$(".bg-model-close").click(function(){
	orderListObj.closeModel();
});

//重新发送验证码
function sendemail(){	
	
	var phoneNumber=$("#phoneNumber").val();
	var credentialCode=$("#credentialCode").val();
    orderListObj.getMessData(phoneNumber,credentialCode);//重新获取
    
    
};


/************************查询tab*************************/

function searchMethod(value) {//切换查询方式
	// 清空表单
	$('#searchForm').resetForm();
	
	/*切换时加载一遍placeholder兼容IE方法*/
	inputInit();
	/*清空table中的数据*/
	$('#table').bootstrapTable("destroy");
    $('#table').bootstrapTable();
    if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<9){
    	Interlaced("table");
    }
    
    var obj = getLocalData("web-out-pc/order-list");
	//console.log(obj)
	if (obj != null) {
		var type = obj.type;// 1:手机  2：业务号码
		var phone = obj.phone;
		var idcode = obj.idcode;
		var serviceNum = obj.serviceNum;
		var accNum = obj.accNum;
		
	  	}
	//orderListObj.changeDiv(0); 
	//处理tab
	if (value == 1) {
		$(".nav-tabs>li:eq(0)").addClass("active");//方式选中时变色
		$(".nav-tabs>li:eq(1)").removeClass("active");
		
		$(".row1").show();
		$(".row2").hide();
		if(idcode){
			$("#credentialCode").val(idcode);
		  	$("#phoneNumber").val(phone);
		  	place("#credentialCode");
		  	place("#phoneNumber");
		}
		
	
	  
	} else if (value == 2){
		$(".nav-tabs>li:eq(0)").removeClass("active");
		$(".nav-tabs>li:eq(1)").addClass("active");
		/*切换时加载一遍placeholder兼容IE方法*/
	//	inputInit();
		$(".row1").hide();
		$(".row2").show();
		if(serviceNum || accNum){
			$("#serialNumber").val(serviceNum);
			$("#accNum").val(accNum);
			place("#serialNumber");
			place("#accNum");
		}
		
	}
}
 

/********************************6位验证码输入后调用 单独写checkData(pwd)方法**************************/
function checkData(pwd){ //短信验证码正确性验证
    
	var phoneNumber=$("#phoneNumber").val();
	var credentialCode=$("#credentialCode").val();
	
	$.ajax({
		   type : 'POST',// 测试  GET , 生成 POST
		   async : true,
	       url:orderListObj.orderUrlSearch+"&phoneNumber="+phoneNumber+"&code="+pwd+"&credentialCode="+credentialCode,     
	       dataType : 'json',
	       beforeSend: function () {         
	    	   layer.load(2);
		   },
		   complete:function(){       
			   layer.closeAll('loading');
		   },
	       success : function(resData) {
	    	   if(resData.state==1){ //如果验证成功，则进行查询并显示订单列表
	    		   orderListObj.changeDiv(1);//显示列表页面
	    		   orderListObj.phoneInitTable();//查询数据显示在列表中
	    		   orderListObj.messageCodeMinute=0;
	    		  
	    		   orderListObj.closeModel();
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

//ie8兼容隔行变色
  function z_initlaced(resData){
	  if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<9){
	      var z_num  =  resData.rows.length;
	      var z_tim = 0;
	      if(z_num>20){
	    	  z_tim=500;
	      }else{
	    	  z_tim=200;
	      };
	 setTimeout(function(){
    			Interlaced('table');
    		},z_tim);
	    }
  }
  
  //一个输入框中输入信息，另外两个输入框置灰
/*$("#serialNumber").focus(function(){
	document.getElementById("serialNumber").readOnly = false;
	document.getElementById("accNum").readOnly = true;
	document.getElementById("teleNum").readOnly = true;
	
	$("#accNum").val('');
	$("#teleNum").val('');
});
	
$("#accNum").focus(function(){
	document.getElementById("accNum").readOnly = false;
	document.getElementById("serialNumber").readOnly = true;
	document.getElementById("teleNum").readOnly = true;
	
	$("#serialNumber").val('');
	$("#teleNum").val('');
});

$("#teleNum").focus(function(){
	document.getElementById("teleNum").readOnly = false;
	document.getElementById("serialNumber").readOnly = true;
	document.getElementById("accNum").readOnly = true;
	
	$("#accNum").val('');
	$("#serialNumber").val('');
});*/

//一个输入框中输入信息，另外两个输入框置灰
$("#serialNumber").focus(function(){
	/*$("#serialNumber").removeAttr("disabled");
	$("#accNum").removeAttr("disabled");
	$("#teleNum").removeAttr("disabled");*/
	//$("#serialNumber").show();
	$("input[name='serialNumber']").removeClass("colorchange");
	$("input[name='accNum']").addClass("colorchange");
	$("input[name='teleNum']").addClass("colorchange");
	
	$("#accNum").val('');
	$("#teleNum").val('');
	inputInit();
	
});
	
/*$("#serialNumber").blur(function(){
	$("#serialNumber").removeAttr("disabled");
	$("#accNum").removeAttr("disabled");
	$("#teleNum").removeAttr("disabled");
});

$("#accNum").blur(function(){
	$("#serialNumber").removeAttr("disabled");
	$("#accNum").removeAttr("disabled");
	$("#teleNum").removeAttr("disabled");
});

$("#teleNum").blur(function(){
	$("#serialNumber").removeAttr("disabled");
	$("#accNum").removeAttr("disabled");
	$("#teleNum").removeAttr("disabled");
});
*/
$("#accNum").focus(function(){
	/*$("#serialNumber").removeAttr("disabled");
	$("#accNum").removeAttr("disabled");
	$("#teleNum").removeAttr("disabled");*/
	//$("#accNum").show();
	
	$("input[name='accNum']").removeClass("colorchange");
	$("input[name='serialNumber']").addClass("colorchange");
	$("input[name='teleNum']").addClass("colorchange");
	
	$("#serialNumber").val('');
	$("#teleNum").val('');
	inputInit();
	
});

$("#teleNum").focus(function(){
	/*$("#serialNumber").removeAttr("disabled");
	$("#accNum").removeAttr("disabled");
	$("#teleNum").removeAttr("disabled");*/
	//$("#teleNum").show();
	
	$("input[name='teleNum']").removeClass("colorchange");
	$("input[name='serialNumber']").addClass("colorchange");
	$("input[name='accNum']").addClass("colorchange");
	
	$("#accNum").val('');
	$("#serialNumber").val('');
	inputInit();
	
});


 