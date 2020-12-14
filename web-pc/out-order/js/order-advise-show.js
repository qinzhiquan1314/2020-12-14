	
/*************对外-PC-我的建议*********/

//获取路径中参数
var orderNum = getUrlParam("orderNum");//订单号

//本页面对象
var orderAdviseObj = {
	//变量-访问路径
	//url: getOutUrl(getRootPath_web(),"/js/data/order-assess.json?flag=out&orderNum="+orderNum)
	url: getOutUrl(getRootPath_web(),"/evaluation/queryEvaluation?flag=out&orderNum="+orderNum)
	//获取数据
	,adviseAjax: function() {
		
		$.ajax({
		       type : 'POST',//测试  GET  生产POST
		       async : true,
		       url: orderAdviseObj.url,
		       dataType : 'json',
		       success : function(resData) { 
		          if(resData == null) return;
		          if(resData.state == "1") {
		        	    if(resData.data != null || resData.data != undefined) {
		        	    	orderAdviseObj.initData(resData.data[0]);
		        	    	 
		        	    } else {
		        	    	layer.msg('获取信息失败！', {
				        		  time: 2000 //2s后自动关闭
				        		  ,shadeClose: false
				        		  ,shade:0.8
				        		});
		        	    }
		          } else {
		        	  layer.msg('获取信息失败！', {
		        			time: 2000 //2s后自动关闭
		        	  });
		          }
		       }     
	     });
	}	
	//初始化数据
	,initData: function(data) {
		var comment = data.comment;
		if(!checkNullOrEmptyStr(comment) && comment != undefined) {
			$("#comment").val(comment);
		}
	}
}


$(document).ready(function(){
	
	orderAdviseObj.adviseAjax();
});

