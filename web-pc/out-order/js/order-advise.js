	
/*************对外-PC-您的建议*********/
/*commentType 0：评价，1：建议*/


//获取路径中参数
var orderNum = getUrlParam("orderNum");
var expNo = getUrlParam("expNo");//物流单号

$(document).ready(function(){

	//兼容ie
	placeholder("#comment");
});

//本页面对象
var orderAdviseObj = {
	//变量-访问路径
	url: getOutUrl(getRootPath_web(),"/evaluation/submitAdvise?flag=out&commentType=1&orderNum="+orderNum)
	//获取数据
	,adviseSubmit: function() {
		//var params = $("#submitForm").serialize();
		var paramsArr = $("#submitForm").serializeArray();
		//PC特殊处理
		for(var i=0;i<paramsArr.length;i++) {
			var name = paramsArr[i].name;
			var value = paramsArr[i].value;
			if (name == "comment" && value != "" && value.indexOf("请留下") > -1 ) {
				paramsArr[i].value = "";
			} 
		}
		
		$.ajax({
		       type : 'POST',//测试  GET  生产POST
		       async : true,
		       url: orderAdviseObj.url,
		       data: paramsArr,//params
		       dataType : 'json',
		       success : function(resData) { 
		          if(resData == null) return;
		          if(resData.state == "1") {
					  var str = sessionStorage.getItem("orderListData");
					  if(str){
						  var arr = JSON.parse(str);
						  for(var i=0;i<arr.length;i++) {
							  if(arr[i].orderNum == orderNum){
								  arr[i].commentState = 1;
							  }
						  }
						  var data = JSON.stringify(arr)
						  sessionStorage.setItem("orderListData",data);
					  }
		        	    layer.msg('提交成功！', {
		        		  time: 2000 //2s后自动关闭
		        		  ,shadeClose: false
		        		  ,shade:0.8
		        		  ,end: function(e){
		        			  //当你在iframe页面关闭自身时
		        			  var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		        			  parent.layer.close(index); //再执行关闭 
		    			  }
		        		});
		        	  
		          } else {
		        	  layer.msg('提交失败！', {
		        			time: 2000 //2s后自动关闭
		        	  });
		          }
		       }     
	     });
	}	
	//校验数据
	,
	checkData: function() {
		
		var comment = $('#comment').val().trim();
		$('#comment').val(comment);
		
	 //    if (comment == "") {
		// 	layer.open({
		// 	  content: '请填写您的建议'
		// 	  ,style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
		// 	  ,time: 3
		// 	});
		// 	return false;
		// } 
		/*else if (comment != "" && getStringByteLength(comment) > 200) {
			layer.open({
				  content: '您可填写0~200个字符（100个字）！'
				  ,style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
				  ,time: 3
				});
			return false;
		} */
		// else {
		// 	return true;
		// }
		return true;
	}
}



//【提交】
$(".adviseSubmit").click(function(){
	if (orderAdviseObj.checkData()) {
		orderAdviseObj.adviseSubmit();
	}
});

//【取消】
/*$(".adviseReset").click(function(){
	//$("#submitForm").resetForm();
	reloadPage();
});*/
