	
/**************pc test************/
//本页面对象
var testTbObj = {
	//变量
	urlSearch: getRootPath_web()+"/test2/list"
	//初始table数据
	,initTable: function(){
		var menuid = $("#menuid").val();
		
		$('#table').bootstrapTable("destroy");
	    $('#table').bootstrapTable({
	        //url: "http://localhost:8080/testSpringMvc/test/list.do"
	    	url: testTbObj.urlSearch
	    	,toggle: "table"
	        ,method: "post"
	        ,contentType: "application/x-www-form-urlencoded"
	        ,queryParams: "queryParams"
	        ,pagination: true
	        ,sidePagination: "server"
	        ,pageSize: "10"
	        ,pageList: "[5, 10, 20, 50 ]"
	        ,showRefresh: false 
	        ,showToggle: false
	        ,showPaginationSwitch: false
	        ,showColumns: false
	        ,search: false
	        ,searchAlign: "left"
	        ,sortName: "menuid"
	        ,sortOrder: "asc"
	    	
	    	,onLoadSuccess: function(){  //加载成功时执行
	            console.info("加载成功");
	        }
	        ,onLoadError: function(){  //加载失败时执行
	              console.info("加载数据失败");
	        }
	        ,responseHandler: function(res){//获取数据解析
	        	var obj = {total:0,rows:[]};//table表格需要
	        	obj.total = res.mytotal;
	        	obj.rows = res.myrows;
	        	console.info("responseHandler:"+obj);
	        	
	        	$(".title").append(res.mytitle);//其它数据展示
	        	
	        	return obj;
	        }
	    });
	}
	//表格超链接
	,actionFormatter: function(value, row, index) {
		 return '<a class="mod" >修改</a> ' + '<a class="delete">删除</a>';
	}
	//表格列value修改
	,dataFormatter: function(value, row, index) {
		 var aId = row.MENUID;
		 var bId = row.PMENUID;
		 var v = (checkNullOrEmptyStr(aId) == false) ? aId : bId;
		 return v;
	}
	//变化高度  --暂时不需要
	,changeTableHeight: function() {
		var screenHeight = document.documentElement.clientHeight;//ie不支持 window.innerHeight;//窗口大小，随着窗口大小变化大小
        var h1 = $(".title").height();//标题的高度
		var h2 = $("#searchForm").height();//查询条件的高度
		var tableHeight = screenHeight - h1 - h2 - 40;//table的高度
		//console.log(screenHeight,h1,h2,tableHeight);
		$(".fixed-table-container").css({height: tableHeight+"px"});
	}
}


//【查询】按钮
$(".submitBtn").click(function(){
	testTbObj.initTable();
});
//【重置】按钮
$(".resetBtn").click(function(){
	$('#searchForm').resetForm();
    $('#table').bootstrapTable("destroy");
    $('#table').bootstrapTable();
});

//bootstrap-table 表格操作事件
window.actionEvents = {
	 //修改操作
	'click .mod': function(e, value, row, index) {      
      var menuid = row.MENUID;
      alert(menuid);
    },
    //删除操作
	'click .delete' : function(e, value, row, index) {
      var menuid = row.MENUID;
      alert(menuid); 
   }
};

/*页面初始化
(function(){
    testTbObj.changeTableHeight();
    window.onresize=function(){
    	testTbObj.changeTableHeight();
    };
    
})();*/