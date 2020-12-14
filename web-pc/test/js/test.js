	
/**************pc test************/
(function(){
	//初始化input框 兼容ie8
	inputInit();
})();


//input 提示语placeholder ie兼容初始化
function inputInit(){
	placeholder("#phoneNum");
	placeholder("#ICard");
	placeholder("#serialNumber");
}


//本页面对象
var testTbObj = {
	//变量
	urlSearch: getRootPath_web()+"/test2/list" //  "/js/data/table.json"
	//初始数据
	,initTable: function(){
		var menuid = $("#menuid").val();
		
		$('#table').bootstrapTable("destroy");
	    $('#table').bootstrapTable({
	        //url: "http://localhost:8080/testSpringMvc/test/list.do"
	    	url: testTbObj.urlSearch
	    });
	}
	//表格超链接
	,actionFormatter: function(value, row, index) {
		 return '<a class="mod" >修改</a> ' + '<a class="delete">删除</a>';
	}
}


//表格  - 操作 - 事件
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
}

/*************************按钮区**************************/

//【查询】按钮
$(".submitBtn").click(function(){
	var phoneNum = $("#phoneNum").val();
	if (phoneNum == "" || phoneNum == "请输入电话号码") {
		layer.msg('请输入电话号码！', {
			time: 2000 //2s后自动关闭
		});
		return 
	}
	testTbObj.initTable();
});
//【重置】按钮
$(".resetBtn").click(function(){
	$('#searchForm').resetForm();
    $('#table').bootstrapTable("destroy");
    $('#table').bootstrapTable();
});


//【弹出框】按钮
$(".layerBtn").click(function(){
	/*方式一
	layer.open({
		  content: '评价成功！'
		  ,style: 'background-color:#f7f7f8; width:50%;color:#fc6104; border:none;' //自定风格
		  ,end: function(e){
			  //成功后事件
			  goBackUrl("http://www.baidu.com");
			 
		  }
	});*/
	
	
	/*方式二
	layer.open({
	  content: '123',
	  btn: '我知道了',
	  shadeClose: false,
	});*/
	
	
	
	/* 提交成功后使用 */
//	layer.msg('评价成功！', {
//	  time: 2000 //2s后自动关闭
//	  ,shadeClose: false
//	  ,shade:0.8
//	  ,end: function(e){
//		  //当你在iframe页面关闭自身时
//		  /*var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
//		  parent.layer.close(index); //再执行关闭
//		   */
//	  }
//	});
	
	/* 提交失败时使用 */
	layer.msg('评价失败！', {
		time: 2000 //2s后自动关闭
	});
	
});

/************************查询tab*************************/

function searchMethod(value) {
	// 清空表单
	$('#searchForm').resetForm();
	
	// 重新设置input placehodler
	inputInit();
	
	//处理tab
	if (value == 1) {
		$(".nav-tabs>li:eq(0)").addClass("active");
		$(".nav-tabs>li:eq(1)").removeClass("active");
		
		$(".row1").show();
		$(".row2").hide();
	} else if (value == 2){
		$(".nav-tabs>li:eq(0)").removeClass("active");
		$(".nav-tabs>li:eq(1)").addClass("active");
		
		$(".row1").hide();
		$(".row2").show();
	}
}

/***********************模态框**************************/

//【模态框】按钮
$(".modelBtn").click(function(){
	$(".bg-model-wrap").show();
	$("body").css({ "overflow": "hidden" });//隐藏窗体的滚动条
});

//【模态框】-【关闭】按钮
$(".bg-model-close").click(function(){
	$(".bg-model-wrap").hide();
	$("body").css({ "overflow": "visible" });//显示窗体的滚动条
});



