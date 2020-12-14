
/*************  对外 手机 订单查询+获取验证码  ************/


$(document).ready(function(){ 
	//ValidateObj.searchorderNum();ValidateObj.sendMessage(); ValidateObj.checkMessage();
	
	//订单列表【返回】到当前页,href刷新页面，从本地存储获取查询条件回显
	//restContent();
	getOrderListLocalData();
	
});
 
/*function restContent() {
	$(".change").click(function() {
		$('#searchForm').resetForm();
	});
}*/
//存            type：1.手机号 2.业务号                                     手机号码     宽带号码
function setOrderListLocalData(type,phone,idcode,serviceNum,bandNum,teleNum) {
	var obj = getLocalData("web-out/order-list");
	if (obj == null) {
		obj = {type:"",phone:"",idcode:"",serviceNum:"",bandNum:"",teleNum:""};
	}
	
	obj.type = type;
	//注意：排斥的查询需要把该清空的清空
	if (type == 1) {
		obj.phone = phone;
		obj.idcode = idcode;
	} else {
		obj.serviceNum = serviceNum;
		obj.bandNum = bandNum;
		obj.teleNum = teleNum;
	}
	setLocalData("web-out/order-list",obj);
}

//取 (并给页面input赋值)
function getOrderListLocalData() {
	var obj = getLocalData("web-out/order-list");
	
	if (obj != null) {
		var type = obj.type;// 1:手机  2：业务号码
		var phone = obj.phone;
		var idcode = obj.idcode;
		var serviceNum = obj.serviceNum;
		var bandNum = obj.bandNum;
		var teleNum =obj.teleNum;
		$("#IDNum").val(idcode);
	  	$("#phoneNum").val(phone);
	  	$("#serialNumber").val(serviceNum);
	  	$("#accNum").val(bandNum);
		$("#teleNum").val(teleNum);
		if(type == 1) {
			//叉号显隐
		  	$("#jobIm1").show();
		  	$("#jobIm2").show();
		  	$("#id1").show();
		  	$("#id2").hide();
		  	//业务号查询和身份证号查询切换
		  	$(".nav-tabs li").removeClass("active");
			$("#phoneSearch").addClass("active");
		  
		} else {					
			$("#id2").show();
		  	$("#id1").hide();
		  	$(".nav-tabs li").removeClass("active");
			$("#serialSearch").addClass("active");
			//如果输入框没有数据，叉号不显示
			if(serviceNum!==""){
				$("#jobIm").hide();
			}else if(bandNum!==""){
				$("#jobIm4").show();
			}else if(teleNum!==""){
				$("#jobIm5").show();
			}
			
		}
	}
}


/*	$(".nav-tabs li").removeClass("active");
	$(this).addClass("active");
	var obj = getLocalData("web-in/order-list");
	if(obj){
		localData(obj);
	}
	*/


/*// 【重置】
$("input[type=reset]").click(function(){
	$('#loginForm').resetForm();
});
// 【提交】验证
$("#loginForm").validate();*/


//var orderNum = document.getElementById('orderNum').value;

//【提交】 业务号码查询
$("#open_orderSearch").click(function(){
	 var serialNumber = $("#serialNumber").val();
	 var accNum = $("#accNum").val();
	 var teleNum = $("#teleNum").val();
	 var booSerial = checkPhoneNum(serialNumber);
	 var booAcc = checkAccAndTele(accNum);
	 var booTele = checkAccAndTele(teleNum);
	 //var idNum = $("#idNum").val();
	 if(serialNumber == "" && accNum == "" && teleNum =="") {
		 layer.open({
			 content: '请输入您的查询信息！'
			 ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
			 ,time: 3
		});
			return false;
	 };
	 if(booSerial==false){
		 layer.open({
			 content: '您的手机号码有误，请重填'
			 ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
			 ,time: 3
		});	
			return;
		}
	if(booAcc==false){
		layer.open({
			content: '您的宽带号码有误，请重填'
			,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
			,time: 3
		});	
			return;
	}
	if(booTele==false){
		layer.open({
			content: '您的固话号码有误，请重填'
			,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
			,time: 3
		});		
			return;
		}
	 //判断只能输入一个值
	   /* if(serialNumber && accNum ){
	    	 layer.open({
					content: '业务号码和宽带号码只能输入一个！',
					style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
					time: 3,
				});
	    	 return false;
	    };*/
	 //存
	 //setOrderListLocalData(2,"","",serialNumber);
	 //传业务号码到订单列表页面：order-list	    		    
	 getOrderData(serialNumber,accNum,teleNum);
}); 

//传业务号码到订单列表页面：order-list
function getOrderData(serialNumber,accNum,teleNum){
	
	$.ajax({
	       type : 'POST',// 测试  GET , 生成 POST
	       async : true,
	       url:getOutUrl(getRootPath_web(),"/trade/queryOrder?flag=out&typeTable=phoneOut&serialNumber="+serialNumber+"&accNum="+accNum+"&teleNum="+teleNum),//这里将业务号码和对内外的标志作为参数传入Ajax中的url
	       //url: getOutUrl(getRootPath_web(),"/js/data/order-list.json?flag=out"),
	       dataType : 'json',	      
	       success : function(resData) {
	    	   if (resData.state==1){
	    	   //本地存储 赋值
	    		   setOrderListLocalData(2,"","",serialNumber,accNum,teleNum);
	    	   //setOrderList(resData.rows);//orderListData=resData.data; 
	    	   setOrderQueryStr("&serialNumber="+serialNumber+"&accNum="+accNum+"&teleNum="+teleNum);  
	    	   //跳转到订单列表页面  order-list
	    	   window.location.href=getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-list.html");
	    	   }
	    	   else{
	    		   layer.open({
					  content: '此号码无数据'
					  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
					  ,time: 3
	    		   });
	    	   }
	       },
		   error: function (e) {
			   layer.open({
					  content: '系统错误，请重试'
					  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
					  ,time: 3
				});
			   
		   }
	 });
}


//【获取短信验证码】
$("#sendMessage").click(function(){ 
	var idNum = $("#IDNum").val();
  	var phoneNum = $("#phoneNum").val();		
	if(idNum==""&&phoneNum==""){
    	  layer.open({
			  content: '请输入您的查询信息'
			  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
			  ,time: 3
		  });
    }
	  if(idNum==""&&phoneNum!=="") {
		  layer.open({
			  content: '请输入您的身份证号'
			  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
			  ,time: 3
		  });
	  } 
	  if(phoneNum==""&&idNum!==""){
		  layer.open({
			  content: '请输入您的手机号码'
			  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
			  ,time: 3
		  });
	  }
	  if(idNum!==""&&phoneNum!==""){
		  		
			var boo1=checkID(idNum);
			var boo2=checkPhoneNum(phoneNum);
			//if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idNum))){
			//if(!/^\d{17}(\d|x)$/i.test(ID)
			if(boo1==false){
				layer.open({
					  content: '您的身份证号有误，请重填'
					  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
					  ,time: 3
				});
			}else if(boo2==false){ 
		    	layer.open({
					  content: '您的手机号码有误，请重填'
					  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
					  ,time: 3
				});
			}else if((boo1=true)&&(boo2=true)){
				//存
				//setOrderListLocalData(1,phoneNum,idNum,"");
				//
				getMessData(idNum,phoneNum)				
			}
		    //如果以上条件都未执行，则调用这个getMessData请求
		    	    
	  }	
});


//ajax调用发送验证码请求
function getMessData(idNum,phoneNum){
	
	  $.ajax({
		  type : 'POST',// 测试  GET , 生成 POST
          async: false,
          url:getOutUrl(getRootPath_web(),"/trade/sendMessage?phoneNumber="+phoneNum+"&credentialCode="+idNum),
          //url: getOutUrl(getRootPath_web(),"/js/data/order-search.json"),
          dataType: "json",
          success: function (resData) {
        	  if(resData.state==1){
        		  layer.open({
        			   content: resData.message
        			  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
        			  ,time: 3
        		  });
        		//存
  				setOrderListLocalData(1,phoneNum,idNum,"","","");
	        	// 如已成功发送验证码，跳转到输入短信验证码页面
        		  setTimeout(SettimeoutFun,3000);	 //发送验证码后要先提示验证次数，所以要延时跳转验证码页面 	  
        	  }else{
        		  layer.open({
        			  content: resData.message
        			  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
        			  ,time: 3
        		  });
        	  }
          },	          
  		  error: function () {// 未成功发送，提醒发送不成功
  			  layer.open({
				  content: '系统原因'
				  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
				  ,time: 3
			  });
	     }
    
	 });
 
}

function SettimeoutFun(){	//发送验证码后要先提示验证次数，所以要延时跳转验证码页面
	var idNum = $("#IDNum").val();
  	var phoneNum = $("#phoneNum").val();		
  	window.location.href =getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-search-inmess.html?phoneNumber="+phoneNum+"&credentialCode="+idNum);
}

//切换div
function showDiv(objId) {
	var objDiv = document.getElementById(objId);
	var objDiv1 = document.getElementById("id1");
	var objDiv2 = document.getElementById("id2");

	objDiv1.style.display = "none";
	objDiv2.style.display = "none";

	objDiv.style.display = "";
	/*显示隐藏清空图标*/
   if(objId == "id2"){
	   var  IDN = $("#IDNum").val();
	   var  phone = $("#phoneNum").val();
	   //alert(IDN)
	   if(IDN==""){
			$("#jobIm2").hide();
	   }
		if(phone==""){
			$("#jobIm1").hide();
		}
   }else{
	   var  ser = $("#serialNumber").val();
	   var  band = $("#accNum").val();
	   var tele = $("#teleNum").val();
		if(ser==""){
			$("#jobIm").hide();
		}
		if(band==""){
			$("#jobIm4").hide();
		}
		if(tele==""){
			$("#jobIm5").hide();
		}
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
	/*var obj = getLocalData("web-in/order-list");
	if(obj){
		localData(obj);
	}*/
	
});
/*点击删除图标清空数据*/
/*$("#jobIm").click(function(){
	//alert(1);
	$("#serialNumber").val("");
	setTimeout(function(){
		$("#jobIm").hide();
	},500);
});*/
/*点击删除图标清空数据*/
function dele(a,b){
	$("#"+b).val("");
	setTimeout(function(){
		$("#"+a).hide();
	},500);
}
