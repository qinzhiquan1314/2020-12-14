
/**********************/
/*******手机端订单流转轨迹***********/

$(document).ready(function(){
	$("#sysCode").val('');
	$("#jobName").val('');
	//alert(1);
	
	//初始获取orderNum，加载表格 
	testTbObj.initTable();
});

//本页面对象
var testTbObj = {
	// 变量
	//urlSearch:getRootPath_web()+"/js/data/inflow-table.json"
	//urlSearch: getRootPath_web()+"/test2/list"
	// 初始数据
	initTable: function(){
		//流程展示内容
		//订单流程名称
		var orderNum = getUrlParam("orderNum");
		var sysCode = $('#sysCode').val();
		var jobName = $('#jobName').val();
		
		var urlSearch = getOutUrl(getRootPath_web(),"/process/queryProcess?flag=int&orderNum="+orderNum+"&sysCode="+sysCode+"&jobName="+encodeURIComponent(jobName));
		//var urlSearch = getOutUrl(getRootPath_web(),"/js/data/flow-list-in.json?flag=int&orderNum="+orderNum+"&sysCode="+sysCode+"&jobName="+encodeURIComponent(jobName));
		
		$.ajax({
		       type : 'post',//get post
		       async : true,
		      // url: getRootPath_web()+"/js/data/inflow-table.json",
		       url: urlSearch,
		       dataType : 'json',
		       //显示加载图标
		       beforeSend: function () {         
					showLoader();
			   },
			   complete: function() {
					hideLoader();
				},
			   error: function(e) {
				   hideLoader();
					layer.open({
						content: '系统错误！请重试',
						style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
							,
						time: 3
					})
			   },
		      success:function(res){
		    	  if (res.state == 1) {
	    			var showContent;
	    			if(!($.isEmptyObject(res.data.jobInsts))){
	    				
	    				var productName = checkNullOrEmptyStr(res.data.productName) ? "" : res.data.productName;
			        	  
			        	var str_30 = getSerialNumberArrByType(30,res.data.member);
			        	var str_40 = getSerialNumberArrByType([40,56,67],res.data.member);
			        	var str_50 = getSerialNumberArrByType([30,40,56,67],res.data.member);
			        	  
			        	$(".productName").append(productName);
			        	$(".teleNum").append(str_30);
			            $(".accNum").append(str_40);
			            $(".phoneNum").append(str_50);
			               
	    				//遍历循环json数组
		                $.each(res.data.jobInsts,function(index, content){
		                	
		                	var createDate = content.createDate;
		            		var sysCode = content.sysCode;
		            		var jobName = content.jobName;
		            		var staffName = content.staffName;
		            		var staffTel = content.staffTel;
		            		var endDate = content.endDate;
		            		var jobState = content.jobState;
		            		var jobAction = content.jobAction;
		            		
		            		createDate = checkNullOrEmptyStr(createDate) ? "" :  createDate;
		            		sysCode = checkNullOrEmptyStr(sysCode) ? "" :  sysCode;
		            		jobNamer = checkNullOrEmptyStr(jobName) ? "" : jobName;
		            		staffName = checkNullOrEmptyStr(staffName) ? "" :  staffName;
		            		staffTel = checkNullOrEmptyStr(staffTel) ? "" :  staffTel;
	            		endDate = checkNullOrEmptyStr(endDate) ? "" : endDate;
		            		jobState = checkNullOrEmptyStr(jobState) ? "" : jobState;
		            		jobAction = checkNullOrEmptyStr(jobAction) ? "" : jobAction;
	            		
		                	//动态添加展示结果
		                	showContent = "<ul>"
		                  		 +"<li class='line'><div class=\"div1\">派单时间：</div><div class=\"div2\">"+createDate+"</div></li>"
		                  	     +"<li class='line'><div class=\"div1\">归属系统：</div><div class=\"div2\">"+sysCode+"</div></li>"
		                  	     +"<li class='line'><div class=\"div1\">环节名称：</div><div class=\"div2\">"+jobName +"</div></li>"
		                  	     +"<li class='line'><div class=\"div1\">处理人：</div><div class=\"div2\">"+staffName+"</div></li>"
		                  	     +"<li class='line'><div class=\"div1\">处理人电话：</div><div class=\"div2\">"+staffTel+"</div></li>"
		                  	     +"<li class='line'><div class=\"div1\">处理时间：</div><div class=\"div2\">"+endDate+"</div></li>"
		                  	     +"<li class='line'><div class=\"div1\">环节状态：</div><div class=\"div2\">"+jobState+"</div></li>"
		                  	     +"<li><div class=\"div1\">备注：</div><div class=\"div2\">"+jobAction+"</div></li></ul>";
		                	
		                	$(".listArea").append(showContent);
		    			 })
	    			}
	    			//未找到数据弹出提示框
	                else{
	       					layer.open({
	       						content: '未找到相匹配的数据!',
	       						style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
	       							,
	       						time: 3
	       					})
                	}
	                		
		    	  }
	         // alert(data);
		   }
		});
	 }
};


//【查询】按钮
$(".submitBtn").click(function(){
	//查询前先清空之前的查询结果
	$(".listArea").empty();
	testTbObj.initTable();
});
//【重置】按钮
$(".resetBtn").click(function(){
	$("#sysCode").val('');
	$("#jobName").val('');
	$(".listArea").empty();
	$("#loader").empty();
});

/*success:function(data){
	  //alert(1);
		var showContent;
		if(!($.isEmptyObject(data.rows))){
//遍历循环json数组
      $.each(data.rows,function(index, content){
//动态添加展示结果
    	 showContent = "<ul class=\"content\">"
	              +"<li>派单时间： "+content.createDate+"</li>"
                  +"<li>归属系统： "+content.sysCode+"</li>"
                  +"<li>环节名称： "+content.jobName +"</li>"
                  +"<li>处理人： "+content.staffName+"</li>"
                  +"<li>处理人电话： "+content.staffTel+"</li>"
                  +"<li>处理时间： "+content.endDate+"</li>"
                  +"<li>环节状态： "+content.jobState+"</li>"
                  +"<li>退单原因： "+content.jobAction+"</li></ul>";
      $("#show").append(showContent);
		 })
		}
		//未找到数据弹出提示框
      else{
					layer.open({
						content: '未找到相匹配的数据!请重新输入',
						style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
							,
						time: 3
					})
      	}
      		

// alert(data);
}*/
