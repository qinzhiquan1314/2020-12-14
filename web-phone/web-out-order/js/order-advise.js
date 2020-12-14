
/************对外-手机-您的建议**********/

/*commentType 0：评价，1：建议*/

//获取路径中参数
var orderNum = getUrlParam("orderNum");
var expNo = getUrlParam("expNo");//物流单号
$(document).ready(function(){
	//初始化建议
	$('#comment').val("");
	
});


//本页面对象
var orderAdviseObj = {
	//变量-访问路径
	url: getOutUrl(getRootPath_web(),"/evaluation/submitAdvise?flag=out&commentType=1&orderNum="+orderNum)
	//获取数据
	,adviseSubmit: function() {
		//var params = $("#submitForm").serialize();
		var paramsArr = $("#submitForm").serializeArray();
		
		$.ajax({
		       type : 'POST',//测试  GET  生产POST
		       async : true,
		       url: orderAdviseObj.url,
		       data: paramsArr,
		       dataType : 'json',
		       /*beforeSend: function () {         
					showLoader();
			   },
			   complete:function(){       
				    hideLoader();
			   },*/
		       success : function(resData) { 
		          if(resData == null) return;
		          if(resData.state == "1") {
					  var str = sessionStorage.getItem("orderListData");
					  if(str){
						  var arr = JSON.parse(str);
						  for(var i=0;i<arr.length;i++) {
							  if(arr[i].orderNum == orderNum){
								  arr[i].commentState = 3;
							  }
						  }
						  var data = JSON.stringify(arr)
						  sessionStorage.setItem("orderListData",data);
					  }
		        	  layer.open({
		    			  content: '提交成功！'
		    			  ,style: 'background-color:#f7f7f8; width:50%;color:#fc6104; border:none;' //自定风格
		    			  ,time: 3
		    			  ,end: function(e){
							  var newPage = getUrlParam('newPage');
							  if(newPage){
								  history.back(-1);
							  }else{
								  //成功后返回上一页
								  goBackUrl(getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-list.html"));
							  }
		    			  }
    				  });
		          } else {
		        	  layer.open({
		    			  content: '提交失败！'
		    			  ,style: 'background-color:#f7f7f8; width:50%;color:#fc6104; border:none;' //自定风格
		    			  ,time: 3
    				  });
		          }
		       }     
	     });
	}	
	//校验数据
	,checkData: function() {
		
		var comment = $('#comment').val().trim();
		$('#comment').val(comment);
		
/*	    if (comment == "") {
			layer.open({
			  content: '请填写您的建议'
			  ,style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
			  ,time: 3
			});
			return false;
		} */
		if (comment != "" && getStringByteLength(comment) > 200) {
			layer.open({
				  content: '您可填写0~200个字符（100个字）！'
				  ,style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
				  ,time: 3
				});
			return false;
		} 
		else {
			return true;
		}
		
	}
	
}

//【发布】
$(".adviseSubmit").click(function(){
	if (orderAdviseObj.checkData()) {
		orderAdviseObj.adviseSubmit();
	}
});
