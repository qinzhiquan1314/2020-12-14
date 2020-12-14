
/*************对外 手机 验证码*********/


//在一加载完此页时，就执行显示手机号和倒计时
$(document).ready(function(){
	//初始获取焦点  PC没问题  手机不支持？？？
	$("#dv").trigger("click").focus();
	//进入页面清空验证码框
	$("#mima").val("");
	/*var obj = $("#btn");
	settime(obj);*/

});



 
//【重新获取验证码】
function sendemail(){
    
	getMessData();
      
}

 
//重新获取验证码
function getMessData(){
	var phoneNum = $("#phoneNum").val().trim();	
	//  cleanData();
	  
	  $.ajax({
          type:  'POST',
          async: false,
          url:getOutUrl(getRootPath_web(),"/trade/sendMessage?phoneNumber="+phoneNum),
          dataType: "json",
          success: function (resData) {
        	  if(resData.state==1){
        		  layer.open({
    				  content: resData.message
    				  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
    				  ,time: 3
        		  });
        		  setTimeout(settime,3000); 
        		  //return;
	        	// 如已成功发送验证码，跳转到输入短信验证码页面  	  	  
        	  }else if (resData.state == 0){
        		  layer.open({
				  content: resData.message
				  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
				  ,time: 3
        		  });
        		  messageCodeMinute == 0;
        	  }
        	  
          },	          
  		  error: function () {// 未成功发送，提醒发送不成功
				   layer.open({
		  				  content: '系统原因'
		  				  ,style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
		  				  ,time: 3
	  			   });
  		  }
      			   
	  });
 
}

//【倒计时】
function settime() { //发送验证码倒计时
		var obj = $("#btn");
  	    if (messageCodeMinute == 0) { 
  	        obj.attr('disabled',false);
  	        obj.addClass("text-color");
  	        //obj.removeattr("disabled"); 
  	        obj.val("重新获取验证码");
  	        
  	      messageCodeMinute = 60; 
  	        return;
  	    } else { 
  	        obj.attr('disabled',true);
  	        obj.removeClass("text-color");
  	        obj.val("还剩" + messageCodeMinute + "秒");
  	      messageCodeMinute--; 
  	    } 
  		setTimeout(function() { 
  	    	settime(obj) 
  		},1000)
}


//获取输入验证码code，并和传入的手机号、身份证号一同访问url，判断验证码正确性，当正确（返回为1）跳转订单页
function checkData(phoneNum,idNum,pwd){
//  	var codeTmp=document.getElementById('pwd-input').value;
//  	code+=codeTmp;    credentialCode 是身份证号;
 
  	$.ajax({
  		   type : 'GET',// 测试  GET , 生成 POST
	       async : true,
	     //  url:getOutUrl(getRootPath_web(),"/trade/queryOrder?flag=out&phoneNumber="+phoneNum+"&code="+pwd+"&credentialCode="+idNum),      
  	       url: getOutUrl(getRootPath_web(),"/js/data/order-list.json?flag=out"),
	       dataType : 'json',	
	       beforeSend: function () {         
				showLoader();
		   },
		   complete:function(){       
			    hideLoader();
		   },
  	       success : function(resData) {
  	    	   //debugger;
  	    	   if(resData.state==1){
  		    	   //本地存储 赋值
  		    	   //setOrderList(resData.rows);//orderListData=resData.data;
  		    	   setOrderQueryStr("&phoneNumber="+phoneNum+"&credentialCode="+idNum); 
  		    	   //跳转到订单列表页面  order-list
  		    	  // window.location.href=getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-list.html");
  		    	 window.location.href="test1.html";
  	    	  } else if(resData.state==3 || resData.state==2){
  	    		layer.open({
	  				  content: resData.message,
	  				  style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
	  				  ,time: 3
	  			   });
  	    	//   cleanData();//清除验证码
  	    	  }
  	    	  
  	       },
  		   error: function () {
  			   layer.open({
 				  content: '系统原因'
 				  ,style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
 				  ,time: 3
 			   });
  		   }
  	       
  	});
}
 
