/**
 * 按分公司统计表（属地）、按分公司统计表（发展）
 */
//获取加密用户信息
var locHref = window.location.href.substr(window.location.href.indexOf("&")+1);
//报表标识
var reportKey;
//受理开始时间
var startDate; 
//受理结束时间
var endDate; 
//时间戳
var reportId;
//是否是历史数据,为空时普通查询，不为空时历史查询
var fileName = getUrlParam("fileName");

//判断统计表类型、初始化参数并调取查询
$(function () {
	//获取前台参数
    reportKey=getUrlParam("typeTable");
    if(reportKey=="BranchCompanyStatisticInArea"){
    	$("title").html("按分公司统计表（属地）");
        $("li.Lcheck").html("按分公司统计表（属地）");
    }else if(reportKey=="BranchCompanyStatisticInDevelop"){
    	$("title").html("按分公司统计表（发展）");
        $("li.Lcheck").html("按分公司统计表（发展）");
        $("#th1").html("归属销售线");
        $("#th1").attr("data-field","develop_sale_area_name");
    }
    
    if(fileName==null||fileName==""){
    	console.log("普通查询……");
    	var date = new Date();
    	//设置天数 (今天)
    	date.setDate(date.getDate()); 
    	var reportDate = date.format("yyyy-MM-dd");
    	$("#startDate").val(reportDate);
    	$("#endDate").val(reportDate);
    	
    	startDate = $("#startDate").val(); //受理开始时间
    	endDate = $("#endDate").val(); //受理结束时间
    	
    	$("#branchExport").addClass("disabled");
    	$(".totalDiv").css('display','none');
    	//查询
        //datedate(startDate,endDate,reportKey);
    }else{
    	console.log("历史查询……");
    	reportId = getUrlParam("reportId"); 
    	createDate = getUrlParam("createDate"); 
    	//报表展示
    	dateTabelHis(reportKey,reportId,getUrlParam("fileName"));
    }	
});

function datedate(startDate,endDate,reportKey){
	//存储传入参数到配置表
	$.ajax({
		type : 'post', //测试get，正式post
		cache : false,
		dataType: 'json',
		url:getOutUrl(getRootPath_web(), "/reportdetail/finddetail?userParam="+getUrlParam("userParam")+"&startDate="+startDate+"&endDate="+endDate+"&reportKey="+reportKey),
		data :  {  "startDate":startDate,
				   "endDate":endDate,
				   "reportKey":reportKey,
				   "userParam":getUrlParam("userParam")
				 },
		error : function(){
					console.error("出现异常");
				},
		success : function(data){
					reportId=data.rows[0].report_id;
					console.log(data.rows[0].flag);
					if(data.rows[0].flag=='0'){
						$("#fakeLoader").fakeLoader({
							  timeToHide: 600000,
							  zIndex:"999",//
							  spinner:"spinner7",//可选值 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7' 对应有7种效果
							  bgColor:"#000000"
							});
						getReportState(startDate,endDate,reportKey,reportId);
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

function getReportState(startDate,endDate,reportKey,reportId){
	$.ajax({
		type : 'post', //测试get，正式post
		cache : false,
		dataType: 'json',
		url:getOutUrl(getRootPath_web(), "/reportdetail/find?userParam="+getUrlParam("userParam")+"&reportId="+reportId),
		data :  { 
				   "reportId":reportId,
				   "userParam":getUrlParam("userParam")
				 },
		error : function(){
					console.error("出现异常");
				},
		success : function(data){
					console.log(data);
					if(data.state=="1" && data.rows[0].flag=='2'){
						//去除弹窗层
						$("#fakeLoader").remove();
						//前台表格显示数据
						dateTabel(startDate,endDate,reportKey,reportId);
					}else{
						//继续调用定时任务
						setTimeout("getReportState(startDate,endDate,reportKey,reportId)",2000);
					}
				 }
	});
}


//点击按钮查询
$("#branchQuery").click(function(){
	var cateval=$("#flag").val();
	 //前台查询参数
    var startDate = $("#startDate").val(); //受理开始时间
	var endDate = $("#endDate").val(); //受理结束时间
	var fakeLoader = "<div id='fakeLoader' style='opacity: 0.3;'></div>"; 
	$("#Lnav").after(fakeLoader); 
	//查询
    datedate(startDate,endDate,reportKey);
})

//查询方法
function dateTabel(startDate,endDate,reportKey,reportId){
	console.log("获取startDate值是"+startDate);
	console.log("获取endDate值是"+endDate);
	console.log("获取reportKey值是"+reportKey);
	$("#table_me").bootstrapTable('destroy'); //销毁报表
	$('#table_me').bootstrapTable({
		    	//url: "areaBranch.json"
		    	url:getOutUrl(getRootPath_web(), "/reportdetail/finddate?userParam="+getUrlParam("userParam")+"&startDate="+startDate+"&endDate="+endDate+"&reportKey="+reportKey+"&reportId="+reportId)
		    	,method: "post"  //测试get,正式post
		    	,toggle: "table"
		    	,dataType:'json'
		        ,height: 400
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
		        	$("#branchExport").removeClass("disabled");
		        	/*if(obj.total=0){
		        		$("#branchExport").removeClass("disabled");
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
	
	var strs = new Array();
	strs=fileName.split("_");
	
	//显示查询条件
	$("#startDate").val(strs[1]);
	$("#endDate").val(strs[2]);
	
	$("#table_me").bootstrapTable('destroy'); //销毁报表	
	$('#table_me').bootstrapTable({
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
$("#branchExport").click(function(){
	startDate = $("#startDate").val(); //受理开始时间
	endDate = $("#endDate").val(); //受理结束时间	
	/*调用后台导出的方法*/
	$.download(getOutUrl(getRootPath_web(), "/reportdetail/export?userParam="+getUrlParam("userParam")+"&reportKey="+reportKey+"&reportId="+reportId), 'post');
})
