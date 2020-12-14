/*
 * 退单原因数量统计
*/
//获取加密用户信息
//校验标识
var locHref = getUrlParam("userParam");
//报表标识
var  reportKey = "orderBackDetail";
//是否是历史数据,为空时普通查询，不为空时历史查询
var fileName = getUrlParam("fileName");
//创建时间
var createDate = getUrlParam("createDate");  
//表格要加载的url
var globalUrl;
//时间戳
var reportId;  //
/*根据接口请求数据并展示*/
/*每个方法的调用不同，当有数据的时候数据的展示和数据的格式需要根据传入的进行调整*/
function dateTabel(globalUrl,reportId,reportKey,locHref){
	$("#table").bootstrapTable('destroy')
	$('#table').bootstrapTable({
		    url : globalUrl
			//url:"backcount.json"
			,toggle: "table"
			,height: 400
			,method: 'post'  //测试get 正式用post
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
			,sortName: "menuid"
			,sortOrder: "asc"
			,queryParams: function (params) { 
				return {
					userParam:locHref,
					type:"9A"
				}
			}
			,onLoadSuccess: function(){  //加载成功时执行
				console.info("加载成功");
				//$(".fixed-table-body").css('height','400');
			}
			,onLoadError: function(){  //加载失败时执行
				console.info("加载数据失败");
			}
			,responseHandler: function(res){//获取数据解析
				//根据数据的返回格式解析这里可能需要修改
				var obj = {total:0,rows:[]};//table表格需要
                console.log(res)
				obj.total = res.total;
                $(".totalDiv").css('display','block');
				$("#totalDate").html(obj.total);
				/*if(obj.total<=17){
					$('#table').after("<span style='float:left;margin-top:10px'>总共<span>"+res.total+"</span>条记录</span>");
					$(".totalDiv").css('display','none');
				}else{
					$(".totalDiv").css('display','block');
					$("#totalDate").html(obj.total);
				}*/
				obj.rows = res.rows;
				console.info("responseHandler:"+obj);
				//$("#searchDate").val("-----");//查看历史时赋值
				return obj;
			}
	});
}
/*界面点击进来的展示*/
$(function () {
	if (fileName==null||fileName=="") {
		//普通查询
		var date = new Date();
		var defaultDate = date.format("yyyy-MM-dd");
		//受理开始日期
		$("#startDate").val(defaultDate);
		//受理结束日期
	    $("#endDate").val(defaultDate);
	    $("#exportBtn").attr('disabled',true);//导出按钮不可用
     	$(".totalDiv").css('display','none');//总共记录不显示
		/*var fakeLoader = "<div id='fakeLoader' style='opacity: 0.3;'></div>"; 
		$("#Lnav").after(fakeLoader);*/
	}else{
		//历史查询
		var date = fileName.split('_');
		//受理开始日期
		$("#startDate").val(date[1]);
		//受理结束日期
	    $("#endDate").val(date[2]);
		$("#exportBtn").attr('disabled',false);
		reportId = getUrlParam("reportId");
		globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/historicaldetail?reportKey="+reportKey+"&reportId="+reportId);
		dateTabel(globalUrl,reportId,reportKey,locHref);
	}
});

/*查询按钮点击方法*/
$("#searchBtn").click(function(){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	var fakeLoader = "<div id='fakeLoader' style='opacity: 0.3;'></div>"; 
	$("#Lnav").after(fakeLoader); 
	/*$("#exportBtn").attr('disabled',true);*/
	firstReresh(startDate,endDate,reportKey,locHref);
})
/*导出按钮点击方法*/
$("#exportBtn").click(function(){
	$.download(getOutUrl(getRootPath_web(), "/reportdetail/export?reportId="+reportId+"&userParam="+locHref), 'post');
})

/*首次进入时页面交互 实时表*/
function firstReresh(startDate,endDate,reportKey,locHref) {
	//存储传入参数到配置表
	$.ajax({
		type : 'post', //测试get，正式post
		cache : false,
		dataType: 'json',
		url : getOutUrl(getRootPath_web(), "/reportdetail/finddetail?startDate="+startDate+"&endDate="+endDate+"&reportKey="+reportKey+"&userParam="+locHref),
    	//url : "../staticReport/result.json",
		data :  { 
				    "startDate":startDate,
				   "endDate":endDate,
				   "reportKey":reportKey,
				   "userParam":locHref
				 },
		error : function(){
					console.error("出现异常");
				},
		success : function(data){
					reportId = data.rows[0].report_id;
					if(data.rows[0].flag=='0'||data.rows[0].flag=='1'){
						//console.log("第一次"+Date.parse(new Date()));
						$("#fakeLoader").fakeLoader({
							  timeToHide: 600000,
							  zIndex:"999",//
							  spinner:"spinner7",//可选值 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7' 对应有7种效果
							  bgColor:"#000000",
         					});
						//console.log("第二次"+Date.parse(new Date()));
						getReportState(reportKey,reportId);
						//前台表格显示数据
						console.log('定时任务执行成功');
					}else if (data.rows[0].flag=='2') {
						globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/finddate?reportKey="+reportKey+"&userParam="+locHref+"&reportId="+reportId)
						dateTabel(globalUrl,searchDate,reportKey,locHref);
						$("#exportBtn").attr('disabled',false);
					}else if(data.rows[0].flag=='4'){
						 layer.msg('请查看历史数据！', {
				     			time: 2000 //2s后自动关闭
				     	  });
					}else if(data.rows[0].flag=='3'){
						 layer.msg(data.rows[0].exception, {
				     			time: 2000 //2s后自动关闭
				     	  });
					}else {
						console.log("出现异常1");
					}
				 }
	});
}
/*调用第二个接口，每隔两秒判断返回状态*/
function getReportState(reportKey,reportId){
	//console.log("第三次"+Date.parse(new Date()));
	$.ajax({
		type : 'post', //测试get，正式post
		cache : false,
		dataType: 'json',
		url : getOutUrl(getRootPath_web(), "/reportdetail/find?reportId="+reportId+"&reportKey="+reportKey+"&userParam="+locHref),
		//url : "../staticReport/result2.json",
		data :  { 
				   "reportKey":reportKey,
				   "reportId":reportId,
				   "userParam":locHref
				 },
		error : function(){
					console.error("出现异常");
				},
		success : function(data){
					if(data.state=="1" && data.rows[0].flag=='2'){
						//去除弹窗层
						$("#fakeLoader").remove();
						//前台表格显示数据
						globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/finddate?reportKey="+reportKey+"&userParam="+locHref+"&reportId="+reportId);
						dateTabel(globalUrl,reportKey,locHref,reportId);
						$("#exportBtn").attr('disabled',false);
					}else{
						//继续调用定时任务
						setTimeout("getReportState(reportKey,reportId)",2000);
					}
				 }
	});
}
/*历史查询*/
//打开历史查询表格
$(".historySearch").click(function(){
	$(".historyCommentTable").modal('show');
	var urlAddress = "../table.json";
	var table = $(".historyTable");
	historyTable (table,reportKey,reportId);
})

//关闭历史查询表格
$('.close_table').click(function(){
	$('.historyCommentTable').modal('hide')
})