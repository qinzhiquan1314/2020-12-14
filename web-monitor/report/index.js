//定义查询条件存放数组
var queryCons = new Array();
var currentReportId = "";

//初始化查询条件
$(function () {
	
	$(document).attr("title", reportTitle);
    $("#Lnav_text").text(reportTitle);

    if(reportTitle.length >18){
        $("#Lnav .Lnav li").css("width","361px");
       var obj = document.getElementById("Lnav_text")
        obj.setAttribute("class","Lcheck_M");
    }

	$('.close_table').click(function () {
		$('.historyCommentTable').modal('hide')
	});
    
	$.each(queryCons ,function(index,queryCon){
	  	queryCon.init();
	});

	if(reportColumnsStr!=""){
	    $("#detailTable").bootstrapTable({
	        columns: columnsDisplay(JSON.parse(reportColumnsStr), reportKey)
	    })
	}

    $("#detailTable").find("tbody").hide(); 

	if(historyReportParamStr!=""){
		var historyReportParam = JSON.parse(historyReportParamStr);
		$.each(queryCons ,function(index,queryCon){
			if(queryCon.initValue){
			  	queryCon.initValue(historyReportParam);
			}
		});
	}

	if(historyReportId!=""){
		dateTabel(historyReportId);
	}
	
	$(window).resize(function() {
		initTableHeight();
	});
	
});
		
String.prototype.endWith = function(s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substring(this.length - s.length) == s)
        return true;
    else
        return false;
    return true;
}

function stringToDate(dateStr){
    var dateArr = dateStr.split("-");
    var year = parseInt(dateArr[0]);
    var month = (dateArr[1].indexOf("0") == 0)? parseInt(dateArr[1].substring(1)): parseInt(dateArr[1]);
    var day = parseInt(dateArr[2]);
    var date = new Date(year,month-1,day);
    return date;
}

function getLastDate(dateStr){
	var lastDate = stringToDate(dateStr);
	lastDate.setDate(lastDate.getDate()-1);//设置天数 -1 天
	return lastDate.format("yyyy-MM-dd");
}

function addLiClickListener(obj){
	obj.click(function (){
		$(this).siblings('li').removeClass('searched');  
		$(this).addClass('searched');   
	});
}

function columnsDisplay(columns, reportName) {
    for (var i = 0; i < columns.length; i++) {   //展现查询条件
    	if(columns[i] instanceof  Array){
    		columnsDisplay(columns[i], reportName);
    	}else{
    	    if(columns[i].visibleReport && columns[i].visibleReport.indexOf(',') > -1) {
                if (columns[i].visibleReport == undefined || columns[i].visibleReport.indexOf(reportName) > -1) {
                    columns[i].visible = true;
                } else {
                    columns[i].visible = false;
                }
            }else{
                if (columns[i].visibleReport == undefined || columns[i].visibleReport == reportName) {
                    columns[i].visible = true;
                } else {
                    columns[i].visible = false;
                }
            }

    	}
    }
    return columns;
}

function doQuery(){
	//校验
	var isOk = true;
	$.each(queryCons ,function(index,queryCon){
	  	isOk = isOk && queryCon.check();
	});
	if(!isOk){
		return;
	}
	
	//生成查询条件
	var params = {"userParam":userParam,"reportKey":reportKey};
	$.each(queryCons ,function(index,queryCon){
		$.extend( params, queryCon.makeQeryObj() );
	});

    $.each(params, function(key, value) {
        params["reportKey"] = reportKey;

        //订单全流程监控总表（包含）
        if (reportKey=="flowMonitorTotal1"&&key=="areaCode"&&value!="") {
            params["reportKey"] = "flowMonitorTotal1ByGrid";
        }else if (reportKey=="flowMonitorTotal1ByGrid"&&key=="areaCode"&&value=="") {
            params["reportKey"] = "flowMonitorTotal1";
        }

        //订单全流程监控总表（整体）
        if (reportKey=="flowMonitorTotal2"&&key=="areaCode"&&value!="") {
            params["reportKey"] = "flowMonitorTotal2ByGrid";
        }else if (reportKey=="flowMonitorTotal2ByGrid"&&key=="areaCode"&&value=="") {
            params["reportKey"] = "flowMonitorTotal2";
        }

        //订单转化监控表
        if (reportKey=="OrderConvertByArea"&&key=="areaCode"&&value!="") {
            params["reportKey"] = "OrderConvertByGrid";
        }else if (reportKey=="OrderConvertByGrid"&&key=="areaCode"&&value=="") {
            params["reportKey"] = "OrderConvertByArea";
        }

        //在途工单监控表
        if (reportKey=="OrderOnProcessByArea"&&key=="areaCode"&&value!="") {
            params["reportKey"] = "OrderOnProcessByGrid";
        }else if (reportKey=="OrderOnProcessByGrid"&&key=="areaCode"&&value=="") {
            params["reportKey"] = "OrderOnProcessByArea";
        }

        //超时工单监控表
        if (reportKey=="overCountMonitor"&&key=="areaCode"&&value!="") {
            params["reportKey"] = "overCountMonitorByGrid";
        }else if (reportKey=="overCountMonitorByGrid"&&key=="areaCode"&&value=="") {
            params["reportKey"] = "overCountMonitor";
        }

        //竣工量监控表
        if (reportKey=="OrderFinishByArea"&&key=="areaCode"&&value!="") {
            params["reportKey"] = "OrderFinishByGrid";
        }else if (reportKey=="OrderFinishByGrid"&&key=="areaCode"&&value=="") {
            params["reportKey"] = "OrderFinishByArea";
        }

        //撤单量监控表
        if (reportKey=="OrderBackByArea"&&key=="areaCode"&&value!="") {
            params["reportKey"] = "OrderBackByGrid";
        }else if (reportKey=="OrderBackByGrid"&&key=="areaCode"&&value=="") {
            params["reportKey"] = "OrderBackByArea";
        }
    });

    //前台没有销售线的，去掉销售线传参
    if (reportKey=="flowMonitorTotalDev1"||
        reportKey=="flowMonitorTotalDev2"||
        reportKey=="OrderConvertByDevelop"||
        reportKey=="OrderOnProcessByDevelop"||
        reportKey=="overCountMonitorDev"||
        reportKey=="OrderFinishByDevelop"||
        reportKey=="OrderBackByDevelop") {
        delete params.areaCode ;
    }


    reportKey=params["reportKey"];
    /*console.log("params[\"reportKey\"]"+params["reportKey"]);
    if (params.hasOwnProperty('areaCode')){
        console.log("params[\"areaCode\"]"+params["areaCode"]);
    }*/

	//生成查询字符串
	var paramsStr = "";
	$.each(params, function(key, value) {
		paramsStr += "&" + key + "=" + encodeURIComponent(value);
	});
	console.log(paramsStr);
	
	firstReresh(params, paramsStr);
}

function doDownload(){
    console.log("导出currentReportId"+currentReportId);
	$.download(getOutUrl(getRootPath_web(), "/reportdetail/export?reportId="+currentReportId+"&userParam="+userParam), 'post');
}

function doHistory(){
	$(".historyCommentTable").modal('show');
	historyTable ($(".historyTable"), reportKey, currentReportId);
}

//历史查看--查看
function findHistory(fileName, createDate, type, reportId, condition) {
	window.open(getOutUrl(getRootPath_web(), "/report/index?reportKey=" + type + "&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition + "&rand=" + new Date().getTime()));
}

/*首次进入时页面交互 实时表*/
function firstReresh(params, paramsStr) {
    $.ajax({
        type: 'post',
        cache: false,
        dataType: 'json',
        url: getOutUrl(getRootPath_web(), "/reportdetail/finddetail?reportKey=" + reportKey + "&userParam=" + userParam),
        data: params,
        error: function () {
            console.error("出现异常");
        },
        success: function (data) {
            console.log(data)
            reportId = data.rows[0].report_id;
            if (data.rows[0].flag == '0' || data.rows[0].flag == '1') {
                $("#fakeLoader").fakeLoader({
                    timeToHide: 600000,
                    zIndex: "999",//
                    spinner: "spinner7",
                    bgColor: "#000000",
                });
                getReportState(reportId,params);
            } else if (data.rows[0].flag == '2') {
                dateTabel(reportId);
            } else if (data.rows[0].flag == '4') {
                layer.msg('请查看历史数据！', {
                    time: 2000 //2s后自动关闭
                });
            } else if (data.rows[0].flag == '3') {
                layer.msg(data.rows[0].exception, {
                    time: 2000 //2s后自动关闭
                });
            } else {
                console.log("出现异常1");
            }
        }
    });
}

/*调用第二个接口，每隔两秒判断返回状态*/
function getReportState(reportId) {
    $.ajax({
        type: 'post',
        cache: false,
        dataType: 'json',
        url: getOutUrl(getRootPath_web(), "/reportdetail/find?reportKey=" + reportKey + "&reportId=" + reportId + "&userParam=" + userParam),
        data: {},
        error: function () {
            console.error("出现异常");
        },
        success: function (data) {
            if (data.state == "1" && data.rows[0].flag == '2') {
                $("#fakeLoader").remove();	//去除弹窗层
            	$("#Lnav").after("<div id='fakeLoader' style='opacity: 0.3;'></div>"); //重新生成div
                dateTabel(reportId);		//前台表格显示数据
            }else if (data.state == "1" && data.rows[0].flag == '3') {
                $("#fakeLoader").remove();	//去除弹窗层
            	$("#Lnav").after("<div id='fakeLoader' style='opacity: 0.3;'></div>"); //重新生成div
				layer.msg("数据生成异常", {time: 2000});
                $("#detailTable").find("tbody").hide(); 
            } else {
                setTimeout("getReportState(reportId)", 2000);	//继续调用定时任务
            }
        }
    });
}

function dateTabel(reportId) {
	currentReportId = reportId;
	$.each(queryCons ,function(index,queryCon){
		if(queryCon.callBack != undefined){
			queryCon.callBack();
		}
	});
	
    $("#detailTable").bootstrapTable('destroy');
    var tableColumns = columnsDisplay(JSON.parse(reportColumnsStr), reportKey);
    $('#detailTable').bootstrapTable({
        url: getOutUrl(getRootPath_web(), "/reportdetail/finddate?reportKey=" + reportKey+ "&reportId=" + reportId + "&userParam=" + userParam)
        //url:"backcount.json"
        , toggle: "table"
        , height: tableHight
        , columns: tableColumns
        , method: 'post'  //测试get 正式用post
        , contentType: "application/x-www-form-urlencoded"
        , queryParams: "queryParams"
        , pagination: false
        , sidePagination: "server"
        , pageNumber: "1"
        , pageSize: "10"
        /*,pageList: "[5, 10, 20, 50 ]"*/
        , showRefresh: false
        , showToggle: false
        , showPaginationSwitch: false
        , showColumns: false
        , search: false
        , searchAlign: "left"
        , sortName: "menuid"
        , sortOrder: "asc"
        , queryParams: function (params) {
            return params;
        }
        , onLoadSuccess: function () {  //加载成功时执行
            //columns:tableColumns;
        }
        , onLoadError: function () {  //加载失败时执行
            //columns:tableColumns
        }
        , responseHandler: function (res) {//获取数据解析,	根据数据的返回格式解析这里可能需要修改
            var obj = {total: 0, rows: []};//table表格需要
            obj.total = res.total;
            $(".totalDiv").css('display', 'block');
            $("#totalDate").html(obj.total);
            obj.rows = res.rows;
            /*for (var i = 0; i < res.rows.length; i++) {
                if (res.rows[i].back_type == undefined) {
                    res.rows[i].back_type = "";
                }
            }*/
            return obj;
        }
        ,onPostBody: function(){
            initTableHeight();
        }
    });
}

function initTableHeight(){
    var windowHeight = $(document).height();
    var tableTop = $('.fixed-table-container').offset().top;
    var tableHeight = $('#detailTable').height();
    var h1 = windowHeight - tableTop - 30;
    if(h1>tableHight){
        //alert( windowHeight + " - " + tableTop + " - " + tableHeight + " - " + h1);
        $('#detailTable').bootstrapTable('resetView', {
            height: h1
        })
    }
}

function changeLineFormatter(value, row, index) {
    if(value!=undefined && value.length && value.length>7){
    	var length = Math.ceil(value.length/2);
    	return value.substr(0,length) + "<br/>" + value.substr(length);
    }
    return value;
}
function nullFormatter(value, row, index) {
    return value==undefined || value==null? "": value;
}
function singleLineFormatter(value, row, index) {
    return value==undefined || value==null? "": "<span style='white-space:nowrap;'>"+value+"</span>";
}

function twoLineFormatter(value, row, index) {
    return value==undefined || value==null? "": "<span style='white-space:nowrap;'>"+changeLineFormatter(value, row, index)+"</span>";
}
