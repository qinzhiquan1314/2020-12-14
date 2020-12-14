
/**********************/
//var jsonDate = {"total":101,"rows":[{"PMENUID":246,"CAPTION":"任务管理","ROW_ID":41,"MENUID":1462},{"PMENUID":1462,"CAPTION":"主机数据库配置","ROW_ID":42,"MENUID":1463,"URL":"http://132.80.241.211:8088/manage/host-db-config.do"},{"PMENUID":1462,"CAPTION":"参数管理","ROW_ID":43,"MENUID":1464,"URL":"http://132.80.241.211:8088/manage/parameter-manager.do"},{"PMENUID":1462,"CAPTION":"任务配置","ROW_ID":44,"MENUID":1465,"URL":"http://132.80.241.211:8088/manage/task-config-page.do"},{"PMENUID":246,"CAPTION":"流程管理","ROW_ID":45,"MENUID":1466},{"PMENUID":1466,"CAPTION":"流程定义","ROW_ID":46,"MENUID":1467,"URL":"http://132.80.241.211:8088/process/process-list.do"},{"PMENUID":246,"CAPTION":"流程监控测试","ROW_ID":47,"MENUID":1469},{"PMENUID":1469,"CAPTION":"实时测试","ROW_ID":48,"MENUID":1470,"URL":"http://132.80.241.211:8088/process/process-test.do"},{"PMENUID":1469,"CAPTION":"流程监控","ROW_ID":49,"MENUID":1471,"URL":"http://132.80.241.211:8088/support/flow-view.do"},{"PMENUID":246,"CAPTION":"事件管理","ROW_ID":50,"MENUID":1472}]};
		

var count = 1;//记录当前页数
var limit = 10;// 每页显示几个
var totalPages = 0;//总页数


$(document).ready(function(){

	getListDate(count,limit);
	scrollFilter();
});

//监听滚屏事件
function scrollFilter() {
	
	//滚动条到页面底部加载更多案例 
	$(window).scroll(function(){
		 var scrollTop = $(this).scrollTop();    //滚动条距离顶部的高度
		 var scrollHeight = $(document).height();   //当前页面的总高度
		 var clientHeight = $(this).height();    //当前可视的页面高度
		 //console.log("top:"+scrollTop+",doc:"+scrollHeight+",client:"+clientHeight);
		 
		 //距离顶部+当前高度 >=文档总高度 即代表滑动到底部 count++;         
		 if(scrollTop + clientHeight >= scrollHeight){  
		 	 //调用筛选方法，count为当前分页数
			 count++;
			 if (count > totalPages) return;
			 //console.log("页数："+count);
			 getListDate(count,limit); 
		 }else if(scrollTop<=0){ 
			 //滚动条距离顶部的高度小于等于0 
			 //alert("下拉刷新，要在这调用啥方法？");
		 }
	});
	
}


//下拉到底，加载数据
function getListDate(page,limit) {
	
	 $.ajax({
	       type : 'GET',
	       async : true,
	       url: getRootPath_web()+"/test2/list_two?page="+page+"&rows="+limit+"&order=asc&sort=menuid",
	       //url: getRootPath_web()+"/js/data/table.json",
	       dataType : 'json',
	       beforeSend: function () {         
				showLoader();
		   },
		   complete:function(){       
			    hideLoader();
		   },
	       success : function(resData) { 
	          if(resData == null) return;
	          var total = resData.total;
	          var data = resData.rows;
	          
			  totalPages = Math.ceil(total/limit) ;
	          
	     	  //$("#listPage").html('');
		      $.each(data, function(index,item) {
		      		var html = "<div class='listPageWrap'><ul><li>"+item.MENUID+"</li><li>"+item.PMENUID+"</li><li>"+item.CAPTION+"</li></ul></div>";
					$("#listPage").append(html);
		      });
	       }     
     });
}

//查询功能
/*function search(page,limit) {
	  $.ajax({
	       type : 'GET',
	       async : true,
	       //url: getRootPath_web()+"/test/list_two.do?page="+page+"&rows="+limit+"&order=asc&sort=menuid",
	       url: getRootPath_web()+"/js/data/table.json",
	       dataType : 'json',
	       success : function(resData) { 
	          if(resData == null) return;
	          var total = resData.total;
			  var totalPages = Math.ceil(total/limit) ;
		      // 初始加载数据
		      getListDate(page,limit);
	       }     
      });

	  
}*/

