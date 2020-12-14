/**
 * 订单统计表（属地）、订单统计表（受理）、订单统计表（发展）
 */
//获取加密用户信息
var locHref = window.location.href.substr(window.location.href.indexOf("&")+1);
//报表标识
var reportKey;
//受理开始时间
var startDate; 
//受理结束时间
var endDate; 
//产品类型
var prodCatalog; 
//产品名称翻译
var proName; 
//时间戳
var reportId;

//是否是历史数据,为空时普通查询，不为空时历史查询
var fileName = getUrlParam("fileName");

//判断统计表类型、初始化参数并调取查询
$(function () {
	//获取前台参数
    reportKey=getUrlParam("typeTable");
    console.log(getUrlParam("typeTable"));
    if(reportKey=="OrderStatisticInArea"){
    	$("title").html("订单统计表（属地）");
        $("li.Lcheck").html("订单统计表（属地）");
        $("#th1").html("属地");
        $("#th1").attr("data-field","area_name_name");
    }else if(reportKey=="OrderStatisticInAccept"){
    	$("title").html("订单统计表（受理）");
        $("li.Lcheck").html("订单统计表（受理）");
        $("#th1").attr("data-field","accept_sale_area_name");
    }else if(reportKey=="OrderStatisticInDevelop"){
    	$("title").html("订单统计表（发展）");
        $("li.Lcheck").html("订单统计表（发展）");
        $("#th1").attr("data-field","develop_sale_area_name");
    }
    
    if(fileName==null||fileName==""){ //普通加载
    	var date = new Date();
    	//设置天数 (今天)
    	date.setDate(date.getDate()); 
    	var reportDate = date.format("yyyy-MM-dd");
    	$("#startDate").val(reportDate);
    	$("#endDate").val(reportDate);
    	$("#prodCatalog option:selected").val(); //产品类型
    	$("#prodCatalog option:selected").text();
    	
    	startDate = $("#startDate").val(); //受理开始时间
    	endDate = $("#endDate").val(); //受理结束时间
    	prodCatalog=$("#prodCatalog option:selected").val(); //产品类型
    	proName=$("#prodCatalog option:selected").text();
    	$("#exportBtn").addClass("disabled");
    	$(".totalDiv").css('display','none');
    	console.log("获取的值是"+prodCatalog);
    	//查询
        //datedate(startDate,endDate,prodCatalog,reportKey,proName);
    }else{ //历史记录 
    	console.log("历史查询……");
    	reportId = getUrlParam("reportId"); 
    	createDate = getUrlParam("createDate"); 
    	console.log("reportKey的值是"+reportKey);
    	console.log("reportId的值是"+reportId);
    	//报表展示
    	dateTabelHis(reportKey,reportId,getUrlParam("fileName"));
    }
});

function datedate(startDate,endDate,prodCatalog,reportKey,proName){
	//存储传入参数到配置表
	$.ajax({
		type : 'post', //测试get，正式post
		cache : false,
		dataType: 'json',
        url:getOutUrl(getRootPath_web(), "/reportdetail/finddetail?userParam="+getUrlParam("userParam")+"&startDate="+startDate+"&endDate="+endDate+"&prodCatalog="+prodCatalog+"&reportKey="+reportKey+"&proName="+encodeURIComponent(proName)),
		//url : "result.json",
		data :  {  "startDate":startDate,
				   "endDate":endDate,
				   "prodCatalog": prodCatalog ,
				   "reportKey":reportKey,
				   "proName":proName,
				   "userParam":getUrlParam("userParam")
				 },
		error : function(){
					console.error("出现异常");
				},
		success : function(data){
				reportId=data.rows[0].report_id;
					console.log(data);
					if(data.rows[0].flag=='0'){
						$("#fakeLoader").fakeLoader({
							  timeToHide: 600000,
							  zIndex:"999",//
							  spinner:"spinner7",
							  bgColor:"#000000"
							});
						getReportState(startDate,endDate,prodCatalog,reportKey,proName,reportId);
						//前台表格显示数据
					}else if(data.rows[0].flag=='4'){
						layer.msg('请查看历史数据！', {
			     			time: 2000 //2s后自动关闭
			     	  });
					}else if(data.rows[0].flag=='3'){
							 layer.msg(data.rows[0].exception, {
					     			time: 2000 //2s后自动关闭
					     	  });
					}else{
						console.error("出现异常");
					}
				 }
	});
}

function getReportState(startDate,endDate,prodCatalog,reportKey,proName,reportId){
	$.ajax({
		type : 'post', //测试get，正式post
		cache : false,
		dataType: 'json',
        url:getOutUrl(getRootPath_web(), "/reportdetail/find?userParam="+getUrlParam("userParam")+"&reportId="+reportId),
		//url : "result2.json",
		data :  { 
				   "reportId":reportId,
				   "userParam":getUrlParam("userParam")
				 },
		error : function(){
					console.error("出现异常");
				},
		success : function(data){
					if(data.state=="1" && data.rows[0].flag=='2'){
						//去除弹窗层
						$("#fakeLoader").remove();
						//前台表格显示数据
						dateTabel(startDate,endDate,prodCatalog,reportKey,proName,reportId);
					}else{
						//继续调用定时任务
						setTimeout("getReportState(startDate,endDate,prodCatalog,reportKey,proName,reportId)",2000);
					}
				 }
	});
}



//点击按钮查询
$("#searchBtn").click(function(){
	//前台查询参数
    startDate = $("#startDate").val(); //受理开始时间
	endDate = $("#endDate").val(); //受理结束时间
	prodCatalog=$("#prodCatalog option:selected").val(); //产品类型
	proName=$("#prodCatalog option:selected").text();
	var fakeLoader = "<div id='fakeLoader' style='opacity: 0.3;'></div>"; 
	$("#Lnav").after(fakeLoader); 
	//查询
    datedate(startDate,endDate,prodCatalog,reportKey,proName);
})

//报表数据显示
function dateTabel(startDate,endDate,prodCatalog,reportKey,proName,reportId){
	console.log("获取startDate值是"+startDate);
	console.log("获取endDate值是"+endDate);
	console.log("获取proType值是"+prodCatalog);
	console.log("获取reportKey值是"+reportKey);
	console.log("获取reportId值是"+reportId);
	console.log("获取proName值是"+proName);
	
	$("#table").bootstrapTable('destroy'); //销毁报表	
	$('#table').bootstrapTable({
		    	//url: urlAddress
		        url:getOutUrl(getRootPath_web(), "/reportdetail/finddate?userParam="+getUrlParam("userParam")+"&startDate="+startDate+"&endDate="+endDate+"&prodCatalog="+prodCatalog+"&reportKey="+reportKey+"&proName="+encodeURIComponent(proName)+"&reportId="+reportId)
		    	,toggle: "table"
		    	,dataType:'json'
		        ,height: 400
		        ,method: "post"  //测试get,正式post
		        ,contentType: "application/x-www-form-urlencoded"
		        ,queryParams: "queryParams"
		        ,pagination: false
		        ,sidePagination: "server"
		        ,pageNumber: "1"
		        ,pageSize: "10"
		        /*,pageList: "[5, 10, 20, 50 ]"*/
                ,showRefresh: false 
		        ,showToggle: false
		        ,showPaginationSwitch: false
		        ,showColumns: false
		        ,search: false
		        ,searchAlign: "left"
		        /*,sortName: "menuid"*/
		        /*,sortOrder: "asc"*/
		        ,queryParams: function (params) { 
		        	      return {
		        	    	  startDate:startDate,
		        	    	  endDate:endDate,
		        	    	  userParam:getUrlParam("userParam"),
		        	    	  prodCatalog:prodCatalog,
		        	    	  proName:proName,
		        	    	  reportId:reportId
		        	      }
		        }
				,onLoadSuccess: function(){  //加载成功时执行
					console.info("加载成功");
				}
				,onLoadError: function(){  //加载失败时执行
					console.info("加载数据失败");
				}
		        ,responseHandler: function(res){//获取数据解析
		        	console.log(res);
		        	var obj = {total:0,rows:[]};//table表格需要
		        	obj.total = res.total;
		        	$("#exportBtn").removeClass("disabled");
		        	/*if(obj.total=0){
		        		$("#exportBtn").removeClass("disabled");
		        	}*/
		        	$(".totalDiv").css('display','block');
					$("#totalDate").html(obj.total);
		        	obj.rows = res.rows;
		        	console.info("responseHandler:"+obj);
		        	return obj;
		        }
		        
		    });
}

//报表历史数据显示  
function dateTabelHis(reportKey,reportId,fileName){
	console.log("获取fileName值是"+fileName);
	console.log("获取reportKey值是"+reportKey);
	console.log("获取reportId值是"+reportId);
	
	//显示查询条件
	var strs = new Array();
	strs=fileName.split("_");
	$("#startDate").val(strs[1]);
	$("#endDate").val(strs[2]);
	var prodCataVal="40,CP";
	
	if(strs[3]=="固网业务"){
		prodCataVal="40";
	}else if(strs[3]=="融合业务"){
		prodCataVal="CP";
	}
	console.log("获取prodCataVal值是"+prodCataVal);
	
	$("#prodCatalog").val(prodCataVal);
	
	
	$("#table").bootstrapTable('destroy'); //销毁报表	
	$('#table').bootstrapTable({
		    	//url: urlAddress
		        url:getOutUrl(getRootPath_web(), "/reportdetail/historicaldetail?userParam="+getUrlParam("userParam")+"&reportKey="+reportKey+"&reportId="+reportId)
		    	,toggle: "table"
		    	,dataType:'json'
		        ,height: 400
		        ,method: "post"  //测试get,正式post
		        ,contentType: "application/x-www-form-urlencoded"
		        ,queryParams: "queryParams"
		        ,pagination: false
		        ,sidePagination: "server"
		        ,pageNumber: "1"
		        ,pageSize: "10"
		        /*,pageList: "[5, 10, 20, 50 ]"*/
                ,showRefresh: false 
		        ,showToggle: false
		        ,showPaginationSwitch: false
		        ,showColumns: false
		        ,search: false
		        ,searchAlign: "left"
		        /*,sortName: "menuid"*/
		        /*,sortOrder: "asc"*/
		        ,queryParams: function (params) { 
		        	      return {
		        	    	  reportKey:reportKey,
		        	    	  reportId:reportId,
		        	    	  userParam:getUrlParam("userParam")
		        	      }
		        }
				,onLoadSuccess: function(){  //加载成功时执行
					console.info("加载成功");
				}
				,onLoadError: function(){  //加载失败时执行
					console.info("加载数据失败");
				}
		        ,responseHandler: function(res){//获取数据解析
		        	console.log(res);
		        	
		        	
		        	var obj = {total:0,rows:[]};//table表格需要
		        	obj.total = res.total;
		        	$(".totalDiv").css('display','block');
					$("#totalDate").html(obj.total);
		        	obj.rows = res.rows;
		        	console.info("responseHandler:"+obj);
		        	return obj;
		        }
		        
		    });
}

//打开历史弹窗
$("#wideHistory").click(function(){
	$("#historyCommentTable").modal('show');
	historyTable($("#historyTable"),reportKey);
})

//关闭历史弹窗
$('#close_table').click(function(){
	$('#historyCommentTable').modal('hide')
})

/*导出按钮点击方法*/
$("#exportBtn").click(function(){
	startDate = $("#startDate").val(); //受理开始时间
	endDate = $("#endDate").val(); //受理结束时间
	prodCatalog=$("#prodCatalog option:selected").val(); //产品类型
	proName=$("#prodCatalog option:selected").text();
	console.log("reportKey的值是"+reportKey);
	console.log("reportId的值是"+reportId);
	
	/*调用后台导出的方法*/
	$.download(getOutUrl(getRootPath_web(), "/reportdetail/export?userParam="+getUrlParam("userParam")+"&reportKey="+reportKey+"&reportId="+reportId), 'post');
})