	
/**************pc test************/
//本页面对象
var testTbObj = {
	//变量
	urlSearch: getRootPath_web()+"/test2/list_three"
	//初始数据
	,initTable: function(){
		var menuid = $("#menuid").val();
		
		$('#table').bootstrapTable("destroy");
	    $('#table').bootstrapTable({
	        //url: "http://localhost:8080/testSpringMvc/test/list.do"
	    	url: testTbObj.urlSearch
	    });
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